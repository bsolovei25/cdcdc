import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IAsEfInitialDataBlock } from '../../../../../dashboard/models/ASTUE/astue-efficiency.model';

@Component({
    selector: 'evj-astue-efficiency-initial-data',
    templateUrl: './astue-efficiency-initial-data.component.html',
    styleUrls: ['./astue-efficiency-initial-data.component.scss']
})
export class AstueEfficiencyInitialDataComponent implements OnInit {
    @Input() public data: IAsEfInitialDataBlock[] = [];

    public isOpen: boolean = false;

    public blockSelection: SelectionModel<IAsEfInitialDataBlock> = new SelectionModel<IAsEfInitialDataBlock>(true);

    constructor() {
    }

    public ngOnInit(): void {
    }
}
