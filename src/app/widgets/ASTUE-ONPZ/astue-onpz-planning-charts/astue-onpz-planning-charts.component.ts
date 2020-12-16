import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IProductionTrend } from '../../../dashboard/models/LCO/production-trends.model';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';
import { IMultiChartLine } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import {
    AstueOnpzConventionalFuelService,
    IAstueOnpzConventionalFuelSelectOptions,
} from '../astue-onpz-conventional-fuel/astue-onpz-conventional-fuel.service';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
    styleUrls: ['./astue-onpz-planning-charts.component.scss'],
})
export class AstueOnpzPlanningChartsComponent extends WidgetPlatform<unknown>
    implements OnInit, OnDestroy {
    public data: IPlanningChart[] = [];
    colors: Map<string, number>;

    constructor(
        private conventionalFuelService: AstueOnpzConventionalFuelService,
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
            combineLatest([
                this.astueOnpzService.predictorsOptions$,
                this.conventionalFuelService.selectedOptions$,
            ])
                .pipe(
                    filter((x) => !!x[0] && !!x[1]),
                    map((x) => {
                        return {
                            predictor: x[0],
                            select: x[1],
                        };
                    })
                )
                .subscribe((ref) => {
                    console.warn(ref);
                    this.setOptionsWs(
                        ref.predictor?.predictors.map((predictor) => predictor?.id),
                        ref.predictor?.predictorWidgetId,
                        ref.select
                    );
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

    setOptionsWs(
        predictorIds: string[],
        predictorWidgetId: string,
        selectInfo: IAstueOnpzConventionalFuelSelectOptions
    ): void {
        this.widgetService.setChannelLiveDataFromWsOptions(this.id, {
            predictorWidgetId,
            predictorIds,
            manufactureName: selectInfo.manufacture,
            unitName: selectInfo.unit,
            subcategoryName: selectInfo.fuel,
        });
    }
}
