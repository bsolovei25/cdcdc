import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CdMatBalanceService {
    showDeviation: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    charts$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    isOpenEvent$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor() {}
}
