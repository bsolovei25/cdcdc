import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class KpeQualityReserveTableService {
    private _chosenFilter$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    public chosenFilter$: Observable<number> = this._chosenFilter$.asObservable();
    public selectFilter(filter: number): void {
        this._chosenFilter$.next(filter);
    }
}
