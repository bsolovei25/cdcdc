import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { HttpClient } from '@angular/common/http';
import { EcWidgetService } from '@widgets/EC/ec-widget-shared/ec-widget.service';
import { VirtualChannel } from '@shared/classes/virtual-channel.class';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { lineColors } from '@widgets/EC/ec-widget-shared/constants/colors.const';
import { IChartMini } from '@shared/interfaces/smart-scroll.model';

export interface ITrendAnalysisGraphResponse {
    trends: ITrendAnalysisGraphData[];
}

export interface ITrendAnalysisGraphData {
    currentValue: IChartMini;
    name: string;
    trendValues: IChartMini[];
    showGraph?: boolean;
    unitsOfMeasure: string;
    color?: string;
}

@Component({
    selector: 'evj-ec-widget-trend-analysis-graph',
    templateUrl: './ec-widget-trend-analysis-graph.component.html',
    styleUrls: ['./ec-widget-trend-analysis-graph.component.scss'],
})
export class EcWidgetTrendAnalysisGraphComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: ITrendAnalysisGraphData[] = [];

    private virtualChannel: VirtualChannel<ITrendAnalysisGraphResponse>;
    private virtualChannelSubscription: Subscription;

    constructor(
        public widgetService: WidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private http: HttpClient,
        private ecWidgetService: EcWidgetService,
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        this.virtualChannel?.dispose();
        this.virtualChannelSubscription?.unsubscribe();
        this.ecWidgetService.mnemonicWidgetEquipmentItemId$.next(null);
        this.ecWidgetService.mnemonicWidgetBakeItemId$.next(null);
        super.ngOnDestroy();
    }

    protected dataConnect(): void {
        this.subscriptions.push(
            this.ecWidgetService.mnemonicWidgetEquipmentItemId$
                .subscribe(id => {
                    this.data = [];
                    this.virtualChannel?.dispose();
                    this.virtualChannelSubscription?.unsubscribe();

                    this.virtualChannel = new VirtualChannel<ITrendAnalysisGraphResponse>(this.widgetService, {
                        channelId: this.widgetId,
                        subchannelId: id
                    });

                    this.virtualChannelSubscription = this.virtualChannel.data$
                        .pipe(map(data => data.trends))
                        .subscribe(res => {
                            this.data = this.normalizeData(res);
                        });
                })
        );

    }

    private normalizeData(data: ITrendAnalysisGraphData[]): ITrendAnalysisGraphData[] {
        let colorCount = 1;
        return data.map((newTrend: ITrendAnalysisGraphData) => {
            const currentTrend = this.data.find(trend => trend.name === newTrend.name);
            if (colorCount > 10) {
                colorCount = 1;
            }
            const result =  {
                ...newTrend,
                showGraph: currentTrend?.name === newTrend.name ? currentTrend.showGraph : true,
                color: lineColors[colorCount],
            };
            colorCount++;
            return result;
        });
    }

    protected dataHandler(ref: unknown): void {
    }

    public toggleChartItem(name: string): void {
        this.data = this.data.map(item => ({
            ...item,
            showGraph: item.name === name ? !item.showGraph : item.showGraph,
        }))
    }
}
