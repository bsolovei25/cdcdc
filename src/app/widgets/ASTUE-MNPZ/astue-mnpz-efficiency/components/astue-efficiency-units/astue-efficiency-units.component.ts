import { Component, Input, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {
    IAsEfFlow,
    IAsEfUnitNew,
} from '../../../../../dashboard/models/ASTUE/astue-efficiency.model';
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
    public unitSelection: SelectionModel<IAsEfUnitNew> = new SelectionModel<IAsEfUnitNew>(true);
    public cardSelection: SelectionModel<IAsEfFlow> = new SelectionModel<IAsEfFlow>(true);

    constructor(private AsEfService: AstueEfficiencyService) {}

    public ngOnChanges(): void {
        this.unitSelection.clear();
        this.units.forEach((unit) => {
            if (!!this.AsEfService.isUnitSelected(unit)) {
                this.unitSelection.select(unit);
            }
        });
        let flows = this.AsEfService.selectionFlow$.getValue();
        this.units?.forEach((unit) => {
            unit?.flows.forEach((flow) => {
                flows = flows?.map((flowsS) => (flow?.id === flowsS?.id ? flow : flowsS));
            });
        });
        if (flows) {
            this.AsEfService.cardSelection.clear();
            this.AsEfService.cardSelection.select(...flows);
            this.cardSelection = this.AsEfService.cardSelection;
            this.AsEfService.selectionFlow$.next(flows);
        }
    }

    onSelectUnit(unit: IAsEfUnitNew): void {
        this.unitSelection.toggle(unit);
        if (!this.unitSelection.isSelected(unit)) {
            unit.flows.forEach((flow) => {
                this.AsEfService.cardSelection.deselect(flow);
                this.cardSelection = this.AsEfService.cardSelection;
            });
            this.AsEfService.selectionFlow$.next(this.AsEfService.cardSelection.selected);
        }
        this.AsEfService.selectionUnit$.next(this.unitSelection.selected);
        this.AsEfService.toggleUnit(unit.name);
        this.AsEfService.currentUnit = unit;
    }

    onSelectUnitPlanning(unit: IAsEfUnitNew): void {
        this.unitSelection.toggle(unit);
        if (!this.unitSelection.isSelected(unit)) {
            unit.flows.forEach((flow) => {
                this.AsEfService.cardSelection.deselect(flow);
                this.cardSelection = this.AsEfService.cardSelection;
            });
            this.AsEfService.selectionFlow$.next(this.AsEfService.cardSelection.selected);
        }
        this.AsEfService.selectionUnit$.next(this.unitSelection.selected);
        this.AsEfService.toggleUnit(unit.name);
        this.AsEfService.currentUnit = unit;
        this.AsEfService.getPlanningUnits(this.unitSelection.selected);
    }

    public onClickSelectAll(): void {
        if (this.unitSelection.selected.length === this.units.length) {
            this.unitSelection.clear();
            this.AsEfService.clearUnits();
        } else {
            this.unitSelection.select(...this.units);
            this.AsEfService.selectAllUnits(this.units);
        }
    }
}
