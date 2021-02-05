import { Component, Input, OnInit } from '@angular/core';
import { IOilReasonsDeviations } from '../../reasons-deviations.component';
import { IOilTransfer } from '../../../../../dashboard/models/oil-operations';

@Component({
    selector: 'evj-reasons-deviations-tank-level',
    templateUrl: './reasons-deviations-tank-level.component.html',
    styleUrls: ['./reasons-deviations-tank-level.component.scss'],
})
export class ReasonsDeviationsTankLevelComponent implements OnInit {
    @Input()
    public data: IOilReasonsDeviations | null = null;

    @Input()
    public transfer: IOilTransfer | null = null;

    public textLevel: number;

    constructor() {}

    public ngOnInit(): void {}

    public getPercent(): number {
        return this.data?.shipmentsMassPercent > 70
            ? (this.textLevel = 50)
            : this.data?.shipmentsMassPercent < 20
            ? (this.textLevel = 20)
            : (this.textLevel = this.data?.shipmentsMassPercent - 5);
    }
}
