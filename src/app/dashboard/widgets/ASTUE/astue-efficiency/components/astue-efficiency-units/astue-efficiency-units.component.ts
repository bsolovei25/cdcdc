import { Component, Input, OnChanges } from '@angular/core';
import { IAsEfUnitNew } from '../../../../../models/ASTUE/astue-efficiency.model';
import { SelectionModel } from '@angular/cdk/collections';
import { AstueEfficiencyService } from '../../../../../services/ASTUE/astue-efficiency.service';

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

    constructor(private AsEfService: AstueEfficiencyService) {}

    public ngOnChanges(): void {
        if (this.unitSelection.hasValue()) {
            this.unitSelection.clear();
            this.units.forEach((unit) => {
                if (!!this.AsEfService.active[unit.name]) {
                    this.unitSelection.select(unit);
                }
            });
        }
    }

    public onSelectUnit(unit: IAsEfUnitNew): void {
        this.unitSelection.toggle(unit);
        this.AsEfService.toggleActiveUnit(unit.name);
    }

    public onClickSelectAll(): void {
        if (this.unitSelection.selected.length === this.units.length) {
            this.unitSelection.clear();
            this.AsEfService.clearActive();
        } else {
            this.unitSelection.select(...this.units);
            this.AsEfService.selectAllUnits(this.units);
        }
    }
}
