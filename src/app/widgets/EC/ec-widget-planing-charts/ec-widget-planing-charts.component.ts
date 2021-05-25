import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { WidgetPlatform } from "../../../dashboard/models/@PLATFORM/widget-platform";
import { WidgetService } from "../../../dashboard/services/widget.service";
import { IProductionTrend } from "../../../dashboard/models/LCO/production-trends.model";
import { EcWidgetService } from "../ec-widget-shared/ec-widget.service";
import {
    EcWidgetConventionalFuelService,
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
        private ecWidgetService: EcWidgetService,

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
        this.ecWidgetService.setMultiLinePredictors(null);
        this.unSubscribeVirtualChannels()
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.ecWidgetService.colors$.subscribe((value) => {
                this.colors = value;
            }),
            this.ecWidgetService.selectedPredictor$
                .pipe(filter(data => Boolean(data)))
                .subscribe(predictorId => {
                    const isDeletePredictor = this.data.findIndex(ref => ref.predictorId === predictorId) !== -1;

                    if (isDeletePredictor) {
                        this.unSubscribeVirtualChannel(predictorId);
                    } else {
                        this.setData(predictorId);
                    }
                }),
            this.ecWidgetService.selectedEnergyResource$.subscribe(() => {
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
                const halfChartsData = res.graphs[0].graph[0].graph.filter((val, index) => index % 2  === 0);
                res.graphs[0].graph[0].graph = halfChartsData;
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

    protected dataHandler(): void {}
}
