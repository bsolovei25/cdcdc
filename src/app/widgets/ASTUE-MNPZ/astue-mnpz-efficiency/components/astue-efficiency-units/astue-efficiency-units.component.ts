import { Component, Input, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IAsEfUnitNew } from '../../../../../dashboard/models/ASTUE/astue-efficiency.model';
import { AstueEfficiencyService } from '../../../../../dashboard/services/ASTUE/astue-efficiency.service';

@Component({
    selector: 'evj-astue-efficiency-units',
    templateUrl: './astue-efficiency-units.component.html',
    styleUrls: ['./astue-efficiency-units.component.scss']
})
export class AstueEfficiencyUnitsComponent implements OnChanges {
    @Input() public isInitialDataShow: boolean = true;
    @Input() public units: IAsEfUnitNew[] = [];

    public isClicked: boolean = false;
    public unitSelection: SelectionModel<IAsEfUnitNew> = new SelectionModel<IAsEfUnitNew>(true);

    constructor(private AsEfService: AstueEfficiencyService) {
    }

    public ngOnChanges(): void {
        this.unitSelection.clear();
        this.units.forEach((unit) => {
            if (!!this.AsEfService.isUnitSelected(unit)) {
                this.unitSelection.select(unit);
            }
        });
        let flows = this.AsEfService.selectionFlow$.getValue();
        this.units?.forEach((unit) => {
            unit?.flows.forEach(flow => {
                flows = flows?.map(flowsS => ((flow.id === flowsS.id) ? flow : flowsS));
            });
        });
        this.AsEfService.selectionFlow$.next(flows);
    }

    public onSelectUnit(unit: IAsEfUnitNew): void {
        this.unitSelection.toggle(unit);
        this.AsEfService.selectionUnit$.next(this.unitSelection.selected);
        this.AsEfService.toggleUnit(unit.name);
        this.AsEfService.currentUnit = unit;
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
