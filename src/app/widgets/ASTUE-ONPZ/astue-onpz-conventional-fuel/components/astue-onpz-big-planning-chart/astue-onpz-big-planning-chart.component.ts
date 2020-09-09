import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../../../dashboard/models/widget-platform';
import { IPlanningChart } from '../../../astue-onpz-planning-charts/astue-onpz-planning-charts.component';
import { IProductionTrend } from '../../../../../dashboard/models/production-trends.model';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { AstueOnpzService } from '../../../astue-onpz-shared/astue-onpz.service';
import { fillDataShape } from '../../../../../@shared/common-functions';
import { fillDataArray } from '../../../../../@shared/functions/fill-data-array.function';

@Component({
    selector: 'evj-astue-onpz-big-planning-chart',
    templateUrl: './astue-onpz-big-planning-chart.component.html',
    styleUrls: ['./astue-onpz-big-planning-chart.component.scss'],
})
export class AstueOnpzBigPlanningChartComponent extends WidgetPlatform
    implements OnInit, OnDestroy {
    public info: IPlanningChart;
    public data: IProductionTrend[] = [];

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private astueService: AstueOnpzService
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.astueService.sharedPlanningGraph$.subscribe((data) => {
                if (!!data) {
                    this.info = fillDataShape(data);
                    this.info.graph.forEach((item) =>
                        item.graph.forEach((val) => (val.timeStamp = new Date(val.timeStamp)))
                    );
                    this.data = this.info?.graph ?? [];
                    fillDataArray(this.data, 18, true);
                }
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}