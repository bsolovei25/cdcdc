import { Injectable } from '@angular/core';
import { IAsEfUnitNew, IAsEfFlow } from '../../models/ASTUE/astue-efficiency.model';
import { BehaviorSubject } from 'rxjs';
import { SnackBarService } from '../snack-bar.service';

@Injectable({
    providedIn: 'root',
})
export class AstueEfficiencyService {
    public selection$: BehaviorSubject<void> = new BehaviorSubject<void>(null);
    private flow$: BehaviorSubject<IAsEfFlow> = new BehaviorSubject<IAsEfFlow>(null);

    get currentFlow(): IAsEfFlow {
        return this.flow$.getValue();
    }
    set currentFlow(flow: IAsEfFlow) {
        this.flow$.next(flow);
    }

    private openedUnits: { [key: string]: true } = {};
    private unitsFlowsMap: { [key: string]: string[] } = {};

    constructor(private snackbar: SnackBarService) {}

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
            const msg = `Сначала выберите установку ${unitName} для выбора потока ${flowName}`;
            this.snackbar.openSnackBar(msg, 'snackbar-red');
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
        this.selection$.next();
    }
}
