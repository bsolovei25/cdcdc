import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';
import { IColumnChartStacked, IColumnChartStackedDataWS } from '../../models/column-chart-stacked';
import { IWidgets } from '../../models/widget.model';

@Component({
    selector: 'evj-column-chart-stacked',
    templateUrl: './column-chart-stacked.component.html',
    styleUrls: ['./column-chart-stacked.component.scss'],
})
export class ColumnChartStackedComponent implements OnInit, OnDestroy {
    public icon: string = 'columns';

    public cols: IColumnChartStacked[] = [];

    public title: string;
    public units: string = '';
    public previewTitle: string;
    public widgetType: string = 'column-chart-stacked';

    public subscriptions: Subscription[] = [];

    static itemCols: number = 26;
    static itemRows: number = 20;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(this.id).subscribe((data: IWidgets) => {
                this.title = data.title;
                this.previewTitle = data.widgetType;
                this.units = data.units;
                // this.code = data.code;
                // this.name = data.name;
            })
        );
    }

    public ngOnInit(): void {
        if (!this.isMock) {
            this.subscriptions.push(
                this.widgetService
                    .getWidgetLiveDataFromWS(this.id, this.widgetType)
                    .subscribe((data: IColumnChartStackedDataWS) => {
                        this.cols = data.items;
                        this.findMax();
                    })
            );
        }
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    public findMax(): void {
        let max = 0;
        for (const col of this.cols) {
            max = col.plan > max ? col.plan : max;
        }
        this.cols.forEach((item) => (item.max = max));
    }
}
