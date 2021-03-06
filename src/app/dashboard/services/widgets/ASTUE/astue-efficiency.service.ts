import { Injectable } from '@angular/core';
import {
    IAsEfUnitNew,
    IAsEfFlow,
    IAsPlanningTableServer,
    IAsPlanningTable,
    IAsEfProduct,
} from '../../../models/ASTUE/astue-efficiency.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { SnackBarService } from '../../snack-bar.service';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { log } from 'util';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AstueEfficiencyService {
    public selection$: BehaviorSubject<void> = new BehaviorSubject<void>(null);
    private flow$: BehaviorSubject<IAsEfFlow> = new BehaviorSubject<IAsEfFlow>(null);
    private unit$: BehaviorSubject<IAsEfUnitNew> = new BehaviorSubject<IAsEfUnitNew>(null);
    public selectionFlow$: BehaviorSubject<IAsEfFlow[]> = new BehaviorSubject<IAsEfFlow[]>(null);
    public cardSelection: SelectionModel<IAsEfFlow> = new SelectionModel<IAsEfFlow>(true);
    public selectionProduct$: BehaviorSubject<IAsEfProduct[]> = new BehaviorSubject<IAsEfProduct[]>(null);

    public selectionUnit$: BehaviorSubject<IAsEfUnitNew[]> = new BehaviorSubject<IAsEfUnitNew[]>(null);
    public unitsTablePlanning$: BehaviorSubject<IAsPlanningTable[]> = new BehaviorSubject<IAsPlanningTable[]>(null);

    public data: BehaviorSubject<IAsEfProduct[]> = new BehaviorSubject<IAsEfProduct[]>(null);
    public loadedUnits$: Observable<IAsEfUnitNew[]> = this.data.pipe(
        filter((x) => !!x),
        map((x) => x.flatMap((p) => p.units).filter((u) => !!u.initialData))
    );

    public productId: string;

    private readonly restUrl: string;

    get currentUnit(): IAsEfUnitNew {
        return this.unit$.getValue();
    }

    set currentUnit(unit: IAsEfUnitNew) {
        this.unit$.next(unit);
    }

    get currentFlow(): IAsEfFlow {
        return this.flow$.getValue();
    }

    set currentFlow(flow: IAsEfFlow) {
        this.flow$.next(flow);
    }

    private openedUnits: { [key: string]: true } = {};
    private unitsFlowsMap: { [key: string]: string[] } = {};

    constructor(private snackbar: SnackBarService, public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
        this.selectionUnit$.subscribe((value) => console.log(value));
    }

    public isCardOpen(unitName: string): boolean {
        return !!this.openedUnits[unitName];
    }

    public isUnitSelected(unit: IAsEfUnitNew): string[] {
        return this.unitsFlowsMap[unit.name];
    }

    public isFlowSelected(unit: IAsEfUnitNew, flow: IAsEfFlow): boolean {
        return !!this.unitsFlowsMap[unit.name]?.includes(flow.name);
    }

    public toggleUnitCard(unitName: string): boolean {
        if (this.openedUnits[unitName]) {
            delete this.openedUnits[unitName];
            return false;
        }
        this.openedUnits[unitName] = true;
        return true;
    }

    public toggleUnit(unitName: string): void {
        if (this.unitsFlowsMap[unitName]) {
            const flow = this.flow$.getValue()?.name;
            if (flow && this.unitsFlowsMap[unitName].includes(flow)) {
                this.currentFlow = null;
            }
            delete this.unitsFlowsMap[unitName];
        } else {
            this.unitsFlowsMap[unitName] = [];
        }
        this.selection$.next();
    }

    public toggleFlow(unitName: string, flowName: string): boolean {
        if (!this.unitsFlowsMap[unitName]) {
            const msg = `?????????????? ???????????????? ?????????????????? ${unitName} ?????? ???????????? ???????????? ${flowName}`;
            this.snackbar.openSnackBar(msg, 'error');
            return false;
        }

        const index = this.unitsFlowsMap[unitName].findIndex((item) => item === flowName);
        if (index === -1) {
            this.unitsFlowsMap[unitName].push(flowName);
            return true;
        } else {
            this.unitsFlowsMap[unitName].splice(index, 1);
            return false;
        }
    }

    public clearUnits(): void {
        this.unitsFlowsMap = {};
        this.currentFlow = null;
        this.selection$.next();
        this.cardSelection.clear();
    }

    public clearOpenedUnits(): void {
        this.openedUnits = {};
        this.selection$.next();
    }

    public selectAllUnits(units: IAsEfUnitNew[]): void {
        units.forEach((unit) => {
            if (!this.unitsFlowsMap[unit.name]) {
                this.unitsFlowsMap[unit.name] = [];
            }
        });
        this.selectionUnit$.next([...units]);
        this.selection$.next();
    }

    async getPlanningUnits(values: IAsEfUnitNew[]): Promise<void> {
        const dataLoadQueue: Promise<void>[] = [];
        const arr = [];
        values.forEach((value) => {
            dataLoadQueue.push(
                this.getPlanningTable(value.id).then((data) => {
                    arr.push(...data.data.groups);
                })
            );
        });
        try {
            await Promise.all(dataLoadQueue);
            this.unitsTablePlanning$.next(arr);
        } catch {
            console.log('????????????');
        }
    }

    //#region Data
    async getPlanningTable(unitId: string): Promise<IAsPlanningTableServer> {
        return this.http
            .get<IAsPlanningTableServer>(this.restUrl + `/api/astue-service/astue/unit/${unitId}`)
            .toPromise();
    }

    async getPlanningTableFile(unitId: string): Promise<IAsPlanningTableServer> {
        return this.http
            .get<IAsPlanningTableServer>(this.restUrl + `/api/astue-service/Astue/unit/${unitId}/export`)
            .toPromise();
    }

    public fileSaver(url: string): void {
        this.http
            .get(url, { responseType: 'blob' as 'json', observe: 'response' })
            .pipe(
                map((result: HttpResponse<Blob>) => {
                    const filename = result.headers
                        .get('Content-Disposition')

                        .split(';')[1]
                        .trim()
                        .split('=')[1];
                    saveAs(result.body, filename);
                })
            )
            .subscribe();
    }

    //#endregion
}
