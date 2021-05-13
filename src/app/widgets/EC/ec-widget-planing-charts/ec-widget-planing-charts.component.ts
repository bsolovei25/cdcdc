import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IProductionTrend } from '../../../dashboard/models/LCO/production-trends.model';
import { EcWidgetService } from '../ec-widget-shared/ec-widget.service';
import { IMultiChartLine } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import {
    EcWidgetConventionalFuelService,
    IAstueOnpzConventionalFuelSelectOptions,
} from '../ec-widget-conventional-fuel/ec-widget-conventional-fuel.service';
import { combineLatest, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, map } from "rxjs/operators";
import { VirtualChannel } from "@shared/classes/virtual-channel.class";

export interface IPlanningChart {
    tag: string;
    title: string;
    unitName: string;
    units: string;
    currentFactValue: number;
    graph: IProductionTrend[];
}

@Component({
    selector: 'evj-ec-widget-planing-charts',
    templateUrl: './ec-widget-planing-charts.component.html',
    styleUrls: ['./ec-widget-planing-charts.component.scss'],
})
export class EcWidgetPlaningChartsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: IPlanningChart[] = [];
    colors: Map<string, number>;
    private virtualChannels: any[] = [];
    private predictorsId: string[] = [];
    private virtualChannelSubscription: Subscription[] = [];

    constructor(
        private conventionalFuelService: EcWidgetConventionalFuelService,
        protected widgetService: WidgetService,
        private astueOnpzService: EcWidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.astueOnpzService.setMultiLinePredictors(null);
        this.unSubscribeVirtualChannels()
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            combineLatest([this.astueOnpzService.predictorsOptions$, this.conventionalFuelService.selectedOptions$])
                .pipe(
                    filter((x) => !!x[0] && !!x[1]),
                    map((x) => {
                        return {
                            predictor: x[0],
                            select: x[1],
                        };
                    }),
                    debounceTime(700),
                    distinctUntilChanged()
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

        this.astueOnpzService.predictorsOptions$.subscribe(predictors => {
            const predictorsId = predictors?.predictors.map(predictor => predictor?.id)

            if (predictorsId?.length) {
                this.unSubscribeVirtualChannels()

                predictorsId.forEach(id => {
                    this.virtualChannels.push(
                        new VirtualChannel<any>(this.widgetService, {
                            channelId: this.widgetId,
                            subchannelId: id,
                        })
                    )
                })

                const virtualChannelsSubj = this.virtualChannels.map(item => item.data$)

                this.virtualChannelSubscription.push(
                    combineLatest(virtualChannelsSubj).subscribe((ref: any[]) => {
                        const planningCharts = ref.map(item => item.graphs[0])
                        const multiLineCharts = ref.map(item => item.multiLineChart)

                        this.data = planningCharts;
                        this.astueOnpzService.setMultiLinePredictors(multiLineCharts);
                    })
                )
            } else {
                this.unSubscribeVirtualChannels()
            }
        })
    }

    private  unSubscribeVirtualChannels(): void {
        this.virtualChannelSubscription.forEach(sub => sub.unsubscribe())
        this.virtualChannels.forEach(sub => sub?.dispose())
        this.virtualChannels = [];
        this.virtualChannelSubscription = [];
        this.data = [];
    }

    // protected dataHandler(ref: {
    //     graphs: IPlanningChart[];
    //     subscriptionOptions: any;
    //     multiLineChart: IMultiChartLine[];
    // }): void {
    //     // this.data = ref?.graphs;
    //     // this.astueOnpzService.setMultiLinePredictors(ref?.multiLineChart);
    // }

    protected dataHandler(): void {}

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
            subcategoryName: selectInfo.resource,
        });
    }
}
