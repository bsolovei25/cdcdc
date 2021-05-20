import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { WidgetPlatform } from "../../../dashboard/models/@PLATFORM/widget-platform";
import { WidgetService } from "../../../dashboard/services/widget.service";
import { IProductionTrend } from "../../../dashboard/models/LCO/production-trends.model";
import { EcWidgetService } from "../ec-widget-shared/ec-widget.service";
import {
    EcWidgetConventionalFuelService,
    IAstueOnpzConventionalFuelSelectOptions
} from "../ec-widget-conventional-fuel/ec-widget-conventional-fuel.service";
import { Subscription } from "rxjs";
import { VirtualChannel } from "@shared/classes/virtual-channel.class";
import { filter } from "rxjs/operators";

export interface IPlanningChartPayLoad {
    graphs: IPlanningChart[];
}

export interface IPlanningChart {
    tag: string;
    title: string;
    unitName: string;
    units: string;
    currentFactValue: number;
    graph: IProductionTrend[];
    predictorId: string;
}

@Component({
    selector: 'evj-ec-widget-planing-charts',
    templateUrl: './ec-widget-planing-charts.component.html',
    styleUrls: ['./ec-widget-planing-charts.component.scss'],
})
export class EcWidgetPlaningChartsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: IPlanningChart[] = [];
    colors: Map<string, number>;
    private virtualChannels: {predictorId: string, virtualChannel: VirtualChannel<IPlanningChartPayLoad>}[] = [];
    private virtualChannelSubscriptions: {predictorId: string, subscription: Subscription}[] = [];

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
            // combineLatest([this.astueOnpzService.predictorsOptions$, this.conventionalFuelService.selectedOptions$])
            //     .pipe(
            //         filter((x) => !!x[0] && !!x[1]),
            //         map((x) => {
            //             return {
            //                 predictor: x[0],
            //                 select: x[1],
            //             };
            //         }),
            //         debounceTime(700),
            //         distinctUntilChanged()
            //     )
            //     .subscribe((ref) => {
            //         console.warn(ref);
            //         this.setOptionsWs(
            //             ref.predictor?.predictors.map((predictor) => predictor?.id),
            //             ref.predictor?.predictorWidgetId,
            //             ref.select
            //         );
            //     }),
            this.astueOnpzService.colors$.subscribe((value) => {
                this.colors = value;
            }),
            this.astueOnpzService.selectedPredictor$
                .pipe(filter(data => Boolean(data)))
                .subscribe(predictorId => {
                    const isDeletePredictor = this.data.findIndex(ref => ref.predictorId === predictorId) !== -1;

                    if (isDeletePredictor) {
                        this.unSubscribeVirtualChannel(predictorId);
                    } else {
                        this.setData(predictorId);
                    }
                }),
            this.astueOnpzService.selectedEnergyResource$.subscribe(() => {
                this.data = [];
                this.unSubscribeVirtualChannels();
            })
        );
    }

    private setData(predictorId: string): void {
        const virtualChannel = new VirtualChannel<IPlanningChartPayLoad>(this.widgetService, {
            channelId: this.widgetId,
            subchannelId: predictorId
        });

        this.virtualChannels.push({
            predictorId,
            virtualChannel
        });

        this.virtualChannelSubscriptions.push({
            predictorId,
            subscription: virtualChannel.data$.subscribe(res => {
                const data = res.graphs[0];
                const predictorIndex = this.data.findIndex(ref => ref.predictorId === predictorId);

                data.predictorId = predictorId;

                if (predictorIndex !== -1) {
                    this.data[predictorIndex] = data;
                } else {
                    this.data = [...this.data, data];
                }
            })
        });
    }

    private unSubscribeVirtualChannel(predictorId: string): void {
        this.data = this.data.filter(ref => ref.predictorId !== predictorId);
        this.virtualChannelSubscriptions = this.virtualChannelSubscriptions.filter(ref => {
            if (ref.predictorId === predictorId) {
                ref.subscription.unsubscribe();
            }
            return ref.predictorId !== predictorId;
        });
        this.virtualChannels = this.virtualChannels.filter(ref => {
            if (ref.predictorId === predictorId) {
                ref.virtualChannel.dispose();
            }
            return ref.predictorId !== predictorId;
        });
    }

    private unSubscribeVirtualChannels(): void {
        this.virtualChannelSubscriptions.forEach(ref => ref.subscription.unsubscribe());
        this.virtualChannels.forEach(sub => sub.virtualChannel.dispose());
        this.virtualChannelSubscriptions = [];
        this.virtualChannels = [];
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
