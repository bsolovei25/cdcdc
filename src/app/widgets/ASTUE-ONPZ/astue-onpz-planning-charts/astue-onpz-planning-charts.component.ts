import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IProductionTrend } from '../../../dashboard/models/production-trends.model';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';

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
export class AstueOnpzPlanningChartsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public data: IPlanningChart[] = [];

    constructor(
        protected widgetService: WidgetService,
        private astueOnpzService: AstueOnpzService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();

    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.astueOnpzService.predictorsOptions$.subscribe((value) => {
                this.setOptionsWs(value?.map(predictor => predictor?.name));
            })
        );
    }

    protected dataHandler(ref: { graphs: IPlanningChart[], subscriptionOptions: any }): void {
        this.data = ref.graphs;
    }

    setOptionsWs(predictors: string[]): void {
        this.widgetService.setWidgetLiveDataFromWSOptions(this.id, { predictors });
    }
}
