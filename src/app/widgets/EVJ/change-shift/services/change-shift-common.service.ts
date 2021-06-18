import { Injectable } from '@angular/core';
import { ChangeShiftApiService } from '@widgets/EVJ/change-shift/services/change-shift-api.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ChangeShiftType, IChangeShiftModel, IChangeShiftDto } from '@widgets/EVJ/change-shift/change-shift.interfaces';

@Injectable({
    providedIn: 'root',
})
export class ChangeShiftCommonService {
    public historicalShifts$: BehaviorSubject<{
        [key: number]: { [key in ChangeShiftType]: IChangeShiftDto };
    }> = new BehaviorSubject<{ [key in ChangeShiftType]: IChangeShiftDto }>(null);
    public chosenDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);
    public isRealtimeData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public shiftsPull$: BehaviorSubject<{ [key: number]: IChangeShiftDto[] }> = new BehaviorSubject<{
        [p: number]: IChangeShiftDto[];
    }>({});

    private shiftCounter$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private listeningUnitsMap$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    private listeningUnits: { [key: number]: number } = {};

    private get shiftsPull(): { [key: number]: IChangeShiftDto[] } {
        return this.shiftsPull$.getValue();
    }
    private set shiftsPull(value: { [key: number]: IChangeShiftDto[] }) {
        this.shiftsPull$.next(value);
    }

    private get prevDate(): Date {
        const date = this.chosenDate$.getValue();
        return new Date(date.getTime() - 24 * 60 * 60 * 1000);
    }
    private get nextDate(): Date {
        const date = this.chosenDate$.getValue();
        return new Date(date.getTime() + 24 * 60 * 60 * 1000);
    }

    constructor(private changeShiftApi: ChangeShiftApiService) {
        this.addSubscribes();
    }

    public getCommonShiftId(unitId: number, shiftType: ChangeShiftType): Observable<IChangeShiftDto> {
        this.addListenUnit(unitId);
        return this.historicalShifts$.pipe(map((x) => x?.[unitId]?.[shiftType] ?? null));
    }

    public addListenUnit(id: number): void {
        if (!this.listeningUnits[id]) {
            this.listeningUnits[id] = 1;
            const items = this.listeningUnitsMap$.getValue();
            items.push(id);
            this.listeningUnitsMap$.next([...items]);
            return;
        }
        this.listeningUnits[id]++;
    }
    public deleteListenUnit(id: number): void {
        if (this.listeningUnits[id] <= 1) {
            delete this.listeningUnits[id];
            const items = this.listeningUnitsMap$.getValue();
            items.splice(items.indexOf(id), 1);
            this.listeningUnitsMap$.next([...items]);
        }
        this.listeningUnits[id]--;
    }
    public setDate(date: Date): void {
        console.log(date);
        if (date?.getTime() === this.chosenDate$.getValue()?.getTime()) {
            return;
        }
        this.isRealtimeData$.next(false);
        this.chosenDate$.next(date);
    }
    public changeShifts(type: 'next' | 'prev'): void {
        const counter = this.shiftCounter$.getValue();
        this.shiftCounter$.next(counter + (type === 'next' ? 1 : -1));
    }
    public setDefaultShifts(): void {
        this.isRealtimeData$.next(true);
        this.chosenDate$.next(new Date());
    }

    private addSubscribes(): void {
        combineLatest([this.listeningUnitsMap$, this.chosenDate$])
            .pipe(filter(([units, date]) => !!units?.length && !!date))
            .subscribe(([units, date]) => {
                this.getAllShiftsByDate(units, date).then();
            });
        this.shiftCounter$.subscribe(this.setChosenShifts.bind(this));
    }

    private async getAllShiftsByDate(unitsId: number[], date: Date): Promise<void> {
        const allShifts: { [key: number]: IChangeShiftDto[] } = {};
        const promises = unitsId.map((x) => () =>
            this.changeShiftApi.getShiftsByDate(date, x).then((shifts) => (allShifts[x] = [...shifts]))
        );
        await Promise.all(promises.map((x) => x()));
        this.shiftsPull = allShifts;
        this.shiftCounter$.next(0);
    }

    private setChosenShifts(count: number): void {
        if (!Object.keys(this.shiftsPull)?.length) {
            return;
        }
        const maxShiftLength: number = Math.max(...Object.keys(this.shiftsPull).map((u) => this.shiftsPull[u].length));
        if (count < 0) {
            this.setDate(this.prevDate);
            return;
        } else if (count !== 0 && count > maxShiftLength - 2) {
            this.setDate(this.nextDate);
            return;
        }
        const shifts: { [key: number]: { [key in ChangeShiftType]: IChangeShiftModel } } = {};
        Object.keys(this.shiftsPull).forEach((unitId) => {
            shifts[unitId] = {
                pass: this.shiftsPull[unitId][count],
                accept: this.shiftsPull[unitId][count + 1],
            };
        });
        this.historicalShifts$.next(shifts);
    }
}
