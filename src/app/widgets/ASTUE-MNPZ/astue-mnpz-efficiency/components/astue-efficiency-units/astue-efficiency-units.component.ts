import { Component, Input, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IAsEfFlow, IAsEfUnitNew } from '../../../../../dashboard/models/ASTUE/astue-efficiency.model';
import { AstueEfficiencyService } from '../../../../../dashboard/services/widgets/ASTUE/astue-efficiency.service';

@Component({
    selector: 'evj-astue-efficiency-units',
    templateUrl: './astue-efficiency-units.component.html',
    styleUrls: ['./astue-efficiency-units.component.scss'],
})
export class AstueEfficiencyUnitsComponent implements OnChanges {
    @Input() public isInitialDataShow: boolean = true;
    @Input() public units: IAsEfUnitNew[] = [];

    public isClicked: boolean = false;
    public unitSelection: SelectionModel<string> = new SelectionModel<string>(true);
    public cardSelection: SelectionModel<IAsEfFlow> = new SelectionModel<IAsEfFlow>(true);

    constructor(private AsEfService: AstueEfficiencyService) {}

    public ngOnChanges(): void {
        this.unitSelection.clear();
        this.units?.forEach((unit) => {
            if (!!this.AsEfService.isUnitSelected(unit)) {
                this.unitSelection.select(unit.id);
            }
        });
        let flows = this.AsEfService.selectionFlow$.getValue();
        this.units?.forEach((unit) => {
            unit?.flows.forEach((flow) => {
                flows = flows?.map((flowsS) => (flow?.id === flowsS?.id ? flow : flowsS));
            });
        });
        let units = this.AsEfService.selectionUnit$.getValue();
        this.units?.forEach((unit) => {
            units = units?.map((unitLoc) => (unitLoc.id === unit.id ? unit : unitLoc));
        });
        if (flows) {
            this.AsEfService.cardSelection.clear();
            this.AsEfService.cardSelection.select(...flows);
            this.cardSelection = this.AsEfService.cardSelection;
            this.AsEfService.selectionFlow$.next(flows);
            // this.AsEfService.selection$.next();
        }
        if (units) {
            this.AsEfService.selectionUnit$.next(units);
        }
    }

    onSelectUnit(unit: IAsEfUnitNew): void {
        this.unitSelection.toggle(unit.id);
        if (!this.unitSelection.isSelected(unit.id)) {
            unit.flows.forEach((flow) => {
                this.AsEfService.cardSelection.deselect(flow);
                this.cardSelection = this.AsEfService.cardSelection;
            });
            this.AsEfService.selectionFlow$.next(this.AsEfService.cardSelection.selected);
        }
        let units = this.AsEfService.selectionUnit$.getValue();
        if (!units?.length) {
            units = [];
        }
        const idx = units.findIndex((value) => value.id === unit.id);
        if (idx > -1) {
            units.splice(idx, 1);
        } else {
            units.push(unit);
        }
        this.AsEfService.selectionUnit$.next(units);
        this.AsEfService.toggleUnit(unit.name);
        this.AsEfService.currentUnit = unit;
    }

    onSelectUnitPlanning(unit: IAsEfUnitNew): void {
        this.unitSelection.toggle(unit.id);
        if (!this.unitSelection.isSelected(unit.id)) {
            unit.flows.forEach((flow) => {
                this.AsEfService.cardSelection.deselect(flow);
                this.cardSelection = this.AsEfService.cardSelection;
            });
            this.AsEfService.selectionFlow$.next(this.AsEfService.cardSelection.selected);
        }
        let units = this.AsEfService.selectionUnit$.getValue();
        if (!units?.length) {
            units = [];
        }
        const idx = units.findIndex((value) => value.id === unit.id);
        if (idx > -1) {
            units.splice(idx, 1);
        } else {
            units.push(unit);
        }
        this.AsEfService.selectionUnit$.next(units);
        this.AsEfService.toggleUnit(unit.name);
        this.AsEfService.currentUnit = unit;
        this.AsEfService.getPlanningUnits(units);
    }

    public onClickSelectAll(): void {
        if (this.unitSelection.selected.length === this.units.length) {
            this.AsEfService.selectionUnit$.next(null);
            this.AsEfService.selectionFlow$.next(null);
            this.unitSelection.clear();
            this.AsEfService.clearUnits();
        } else {
            const units = this.units.map((val) => val.id);
            this.unitSelection.select(...units);
            this.AsEfService.selectAllUnits(this.units);
        }
    }

    isSelectionUnit(unit: IAsEfUnitNew): boolean {
        return !!this.unitSelection.selected.find((value) => value === unit.id);
    }
}
