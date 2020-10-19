import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IColumnChartStacked, IColumnChartStackedDataWS } from '../../../dashboard/models/column-chart-stacked';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';

@Component({
    selector: 'evj-column-chart-stacked',
    templateUrl: './column-chart-stacked.component.html',
    styleUrls: ['./column-chart-stacked.component.scss'],
})
export class ColumnChartStackedComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public cols: IColumnChartStacked[] = [];

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'columns';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IColumnChartStackedDataWS): void {
        this.cols = ref.items;
        this.findMax();
    }

    public findMax(): void {
        let max = 0;
        for (const col of this.cols) {
            max = col.plan > max ? col.plan : max;
        }
        this.cols.forEach((item) => (item.max = max));
    }
}
