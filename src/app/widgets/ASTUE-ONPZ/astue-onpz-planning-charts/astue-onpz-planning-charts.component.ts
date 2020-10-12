import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IProductionTrend } from '../../../dashboard/models/production-trends.model';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';
import { IMultiChartLine } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';

export interface IPlanningChart {
    tag: string;
    title: string;
    unitName: string;
    units: string;
    currentFactValue: number;
    graph: IProductionTrend[];
}

@Component({
    selector: 'evj-astue-onpz-planning-charts',
    templateUrl: './astue-onpz-planning-charts.component.html',
    styleUrls: ['./astue-onpz-planning-charts.component.scss']
})
export class AstueOnpzPlanningChartsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: IPlanningChart[] = [];
    colors: Map<string, number>;

    constructor(
        protected widgetService: WidgetService,
        private astueOnpzService: AstueOnpzService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.astueOnpzService.setMultiLinePredictors(null);
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.astueOnpzService.predictorsOptions$.subscribe((value) => {
                if (value) {
                    this.setOptionsWs(value?.predictors.map((predictor) => predictor?.id),
                        value?.predictorWidgetId);
                }
            }),
            this.astueOnpzService.colors$.subscribe((value) => {
                this.colors = value;
            })
        );
    }

    protected dataHandler(ref: {
        graphs: IPlanningChart[];
        subscriptionOptions: any;
        multiLineChart: IMultiChartLine[];
    }): void {
        this.data = ref.graphs;
        this.astueOnpzService.setMultiLinePredictors(ref?.multiLineChart);
    }

    setOptionsWs(predictorIds: string[], predictorWidgetId: string): void {
        this.widgetService.setChannelLiveDataFromWsOptions(this.id, {
            predictorWidgetId,
            predictorIds
        });
    }
}
