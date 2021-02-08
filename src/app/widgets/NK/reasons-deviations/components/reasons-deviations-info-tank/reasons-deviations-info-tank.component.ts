import { Component, Input, OnInit } from '@angular/core';
import { IOilReasonsDeviations } from '../../reasons-deviations.component';
import { IOilTransfer } from '../../../../../dashboard/models/oil-operations';

@Component({
    selector: 'evj-reasons-deviations-info-tank',
    templateUrl: './reasons-deviations-info-tank.component.html',
    styleUrls: ['./reasons-deviations-info-tank.component.scss'],
})
export class ReasonsDeviationsInfoTankComponent implements OnInit {
    @Input()
    public data: IOilReasonsDeviations | null = null;

    @Input()
    public transfer: IOilTransfer | null = null;

    constructor() {}

    ngOnInit(): void {}
}
