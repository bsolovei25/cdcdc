import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { IOzsmPlanningMainItem } from '../../../../dashboard/models/OZSM/ozsm-planning-main.model';

@Component({
    selector: 'evj-ozsm-card-line-diagram',
    templateUrl: './ozsm-card-line-diagram.component.html',
    styleUrls: ['./ozsm-card-line-diagram.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OzsmCardLineDiagramComponent implements OnInit {
    @Input() set data(item: IOzsmPlanningMainItem) {
        if (item) {
            this.percentValue = item.percent > 0 ? (item.percent < 100 ? item.percent : 100) : 0;

            this.sourceData = item;
            this.isDisabled = !item.value && !this.percentValue;
        }
    }
    @Input() index: number;
    @Input() type: string;
    @Input() icon: string;

    public sourceData: IOzsmPlanningMainItem = null;

    public percentValue: number = 0;
    public isDisabled: boolean = true;

    public get bgLineClass(): 'active' | 'deviation' | 'deviation-opacity' {
        if (this.type !== 'deviation-icon') {
            return 'active';
        } else {
            return this.data?.value > this.data?.plan ? 'deviation' : 'deviation-opacity';
        }
    }

    constructor() {}

    ngOnInit(): void {}
}
