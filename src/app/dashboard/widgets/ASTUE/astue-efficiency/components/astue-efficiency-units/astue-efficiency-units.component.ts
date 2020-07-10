import { Component, OnInit, Input } from '@angular/core';
import { IAsEfUnit } from '../../../../../models/ASTUE/astue-efficiency.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-astue-efficiency-units',
    templateUrl: './astue-efficiency-units.component.html',
    styleUrls: ['./astue-efficiency-units.component.scss'],
})
export class AstueEfficiencyUnitsComponent implements OnInit {
    @Input() public isInitialDataShow: boolean = true;
    @Input() public units: IAsEfUnit[] = [];

    public isClicked: boolean = false;

    public unitSelection: SelectionModel<IAsEfUnit> = new SelectionModel<IAsEfUnit>(true);

    constructor() {}

    public ngOnInit(): void {}

    public onSelectUnit(unit: IAsEfUnit): void {
        this.unitSelection.toggle(unit);
    }

    public onClickSelectAll(): void {
        if (this.unitSelection.selected.length === this.units.length) {
            this.unitSelection.clear();
        } else {
            this.unitSelection.select(...this.units);
        }
    }
}
