import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUnits } from '@dashboard/models/KPE/kpe-table.model';

@Injectable({
    providedIn: 'any',
})
export class KpeTableService {
    private _chosenUnits$: BehaviorSubject<IUnits> = new BehaviorSubject<IUnits>({
        averageUnit: 0,
        instantUnit: 0,
        planUnit: 0,
        valuePlanUnit: 0,
        totalUnit: 0,
        predictionUnit: 0,
        valueRecommended: 0,
        deviationUnits: 0
    });

    public chosenUnits$: Observable<IUnits> = this._chosenUnits$.asObservable();

    public changeUnits(selectorName: string, unitsId: number): void {
        const currentUnits = this._chosenUnits$.getValue();
        currentUnits[selectorName] = unitsId;
        this._chosenUnits$.next(currentUnits);
    }
}
