import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    ILineDiagramData,
    ILineDiagramDataItem
} from '../../../dashboard/models/line-diagram';

@Component({
    selector: 'evj-line-diagram',
    templateUrl: './line-diagram.component.html',
    styleUrls: ['./line-diagram.component.scss']
})
export class LineDiagramComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

    percentDeviation: number = 33.3;  // 50% суммы плана
    percentPlan: number = 66.6;

    public data: ILineDiagramDataItem[] = [];

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: ILineDiagramData): void {
        this.data = ref.items;
        this.data.map(value => {
            const k1 = value.value < value.upperBound ? 1 : 0;
            const k2 = 1 - k1;

            if (value.value > 0) {
                if (value.upperLimit > value.upperBound) {
                    value.percentFact =
                    k1 * (value.value / value.upperBound) * this.percentPlan
                    + k2 * (this.percentPlan + (value.value - value.upperBound) / (value.upperLimit - value.upperBound) * this.percentDeviation);
                } else {
                    value.percentFact = 100;
                }
                value.percentFact = value.percentFact > 100 ? 100 :
                    value.percentFact < 0 ? 0 : value.percentFact;
            } else {
                value.percentFact = 0;
            }
        });
    }

    drawGraph(count: number): string {
        return count.toString() + '%';
    }

    fillGraph(flag: boolean): string {
        const normalFill = '#3FA9F5';
        const criticalFill = '#F4A321';
        return flag ? criticalFill : normalFill;
    }
}
