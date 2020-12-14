import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IAstueOnpzConventionalFuelTransfer {
    predictors: any[];
    plan: any;
    fact: any;
    units: string;
}

export interface IAstueOnpzConventionalFuelSelectOptions {
    manufacture: string;
    unit: string;
    fuel: string;
}

@Injectable({
    providedIn: 'root',
})
export class AstueOnpzConventionalFuelService {
    public defaultSelectOptions: IAstueOnpzConventionalFuelSelectOptions = {
        manufacture: 'Производство №1',
        unit: 'АВТ-10',
        fuel: 'Топливо',
    };
    public readonly selectFuelReference: string[] = [
        'Топливо',
        'Потребление тепла',
        'Выработка тепла',
        'Потребление электроэнергии',
    ];
    public selectedOptions$: Observable<IAstueOnpzConventionalFuelSelectOptions>;

    public paddingLegend$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public predictorsInfo$: BehaviorSubject<
        IAstueOnpzConventionalFuelTransfer
    > = new BehaviorSubject<IAstueOnpzConventionalFuelTransfer>(null);

    constructor() {}
}
