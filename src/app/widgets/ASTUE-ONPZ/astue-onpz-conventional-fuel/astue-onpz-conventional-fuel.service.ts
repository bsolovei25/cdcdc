import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AstueOnpzConventionalFuelService {
    public paddingLegend$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public predictorsInfo$: BehaviorSubject<{
        predictors: any[];
        plan: any;
        fact: any;
    }> = new BehaviorSubject<{ predictors: any[]; plan: any; fact: any }>(null);

    constructor() {}
}
