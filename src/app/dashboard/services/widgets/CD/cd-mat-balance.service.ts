import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CdMatBalanceService {

    showDeviation: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    constructor() {
    }
}
