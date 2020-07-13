import { Injectable } from '@angular/core';
import { IAsEfUnitNew, IAsEfFlow } from '../../models/ASTUE/astue-efficiency.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AstueEfficiencyService {
    public product$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public lastFlow$: BehaviorSubject<IAsEfFlow> = new BehaviorSubject<IAsEfFlow>(null);

    public change$: BehaviorSubject<void> = new BehaviorSubject<void>(null);

    public active: { [key: string]: string[] } = {};

    constructor() {}

    public toggleActiveUnit(unitName: string): void {
        if (this.active[unitName]) {
            delete this.active[unitName];
        } else {
            this.active[unitName] = [];
        }
        this.change$.next();
    }

    public toggleActiveFlow(unitName: string, flowName: string): boolean {
        if (!this.active[unitName]) {
            return false;
        }

        const index = this.active[unitName].findIndex((item) => item === flowName);
        if (index === -1) {
            this.active[unitName].push(flowName);
            this.change$.next();
            return true;
        } else {
            this.active[unitName].splice(index, 1);
            this.change$.next();
            return false;
        }
    }

    public clearActive(): void {
        this.active = {};
        this.change$.next();
    }

    public selectAllUnits(units: IAsEfUnitNew[]): void {
        units.forEach((unit) => {
            if (!this.active[unit.name]) {
                this.active[unit.name] = [];
            }
        });
        this.change$.next();
    }
}
