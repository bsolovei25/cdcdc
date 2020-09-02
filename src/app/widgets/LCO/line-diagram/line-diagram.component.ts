import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    ILineDiagramData,
    ILineDiagramDataItem
} from '../../../dashboard/models/line-diagram';
import { log } from 'util';

@Component({
    selector: 'evj-line-diagram',
    templateUrl: './line-diagram.component.html',
    styleUrls: ['./line-diagram.component.scss']
})
export class LineDiagramComponent extends WidgetPlatform implements OnInit, OnDestroy {

    percentDeviation: number;
    percentFact: number;
    percentPlan: number;

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
        this.data.forEach(value => {
            this.percentDeviation = 33.3;  // 50% суммы плана
            this.percentPlan = 66.6;
            this.percentFact = ((value.value - value.lowerLimit) /
                (value.upperLimit - value.lowerLimit) * 66);
            this.percentFact = this.percentFact > 100 ? 100 :
                this.percentFact < 0 ? 0 : this.percentFact;
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
