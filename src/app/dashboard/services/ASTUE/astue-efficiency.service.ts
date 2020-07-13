import { Injectable } from '@angular/core';
import { IAsEfUnitNew, IAsEfFlow } from '../../models/ASTUE/astue-efficiency.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AstueEfficiencyService {
    public product$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public lastFlow$: BehaviorSubject<IAsEfFlow> = new BehaviorSubject<IAsEfFlow>(null);
    public active: { [key: string]: string[] } = {};

    constructor() {}

    public toggleActiveUnit(unitName: string): void {
        if (this.active[unitName]) {
            delete this.active[unitName];
        } else {
            this.active[unitName] = [];
        }
        console.log(this.active);
    }

    public toggleActiveFlow(unitName: string, flowName: string): boolean {
        if (!this.active[unitName]) {
            this.toggleActiveUnit(unitName);
        }

        const index = this.active[unitName].findIndex((item) => item === flowName);
        if (index === -1) {
            this.active[unitName].push(flowName);
            return true;
        } else {
            this.active[unitName].splice(index, 1);
            return false;
        }
        console.log(this.active);
    }

    public clearActive(): void {
        this.active = {};
        console.log(this.active);
    }

    public selectAllUnits(units: IAsEfUnitNew[]): void {
        units.forEach((unit) => {
            if (!this.active[unit.name]) {
                this.active[unit.name] = [];
            }
        });
        console.log(this.active);
    }
}
