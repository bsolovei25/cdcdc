import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { IOzsmPlanningMainItem } from '../../../../dashboard/models/OZSM/ozsm-planning-main.model';

@Component({
    selector: 'evj-ozsm-card-line-diagram',
    templateUrl: './ozsm-card-line-diagram.component.html',
    styleUrls: ['./ozsm-card-line-diagram.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OzsmCardLineDiagramComponent implements OnInit, OnChanges {
    @Input() data: IOzsmPlanningMainItem = null;
    @Input() index: number;
    @Input() type: string;
    @Input() icon: string;
    public percentValue: number = 0;

    public get bgLineClass(): 'active' | 'deviation' | 'deviation-opacity' {
        if (this.type !== 'deviation-icon') {
            console.log(this.data?.name ?? 'def', 'active');
            return 'active';
        } else {
            return this.data?.value > this.data?.plan ? 'deviation' : 'deviation-opacity';
        }
    }

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.percentValue = (this.data?.value / this.data?.plan) * 100;
        this.percentValue = isNaN(this.percentValue) ? 100 : this.percentValue;
    }
}
