import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IAstueOnpzConventionalFuelTransfer {
    predictors: any[];
    plan: any;
    fact: any;
    units: string;
}

@Injectable({
    providedIn: 'root',
})
export class AstueOnpzConventionalFuelService {
    public paddingLegend$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public predictorsInfo$: BehaviorSubject<
        IAstueOnpzConventionalFuelTransfer
    > = new BehaviorSubject<IAstueOnpzConventionalFuelTransfer>(null);

    constructor() {}
}
