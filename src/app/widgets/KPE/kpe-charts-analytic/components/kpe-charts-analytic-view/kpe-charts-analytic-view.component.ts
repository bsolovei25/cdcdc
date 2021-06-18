import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {ChannelPlatform} from '@dashboard/models/@PLATFORM/channel-platform';
import {WidgetService} from '@dashboard/services/widget.service';
import { KpeChartsAnalyticDataService } from '@widgets/KPE/kpe-charts-analytic/kpe-charts-analytic.service';
import {
    IKpeChartsAnalyticDatesInterval,
    IKpeChartsAnalyticGraphData
} from '@dashboard/models/KPE/kpe-charts-analytic.model';

@Component({
    selector: 'evj-kpe-charts-analytic-view',
    templateUrl: './kpe-charts-analytic-view.component.html',
    styleUrls: ['./kpe-charts-analytic-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpeChartsAnalyticViewComponent extends ChannelPlatform<unknown> implements OnInit, OnDestroy {
    public chartData: IKpeChartsAnalyticGraphData[];
    public chartDatesInterval: { min: Date, max: Date };

    constructor(
        protected widgetService: WidgetService,
        private kpeChartsAnalyticDataService: KpeChartsAnalyticDataService,
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string,
        @Inject('viewType') public viewType: string,
        @Inject('interval') public interval: IKpeChartsAnalyticDatesInterval,
        @Inject('units') public units: string
    ) {
        super(widgetId, channelId, widgetService);
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.kpeChartsAnalyticDataService.chartData$.subscribe(chartData => {
                this.chartData = chartData;
            }))

        this.chartDatesInterval = {
            min: this.interval?.dateStart,
            max: this.interval?.dateEnd
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: unknown): void {
    }

    public filterData(graphType: string): IKpeChartsAnalyticGraphData[] {
        switch (graphType) {
            case 'bar-chart-2':
                const filteredGraphs = this.chartData.filter(graphData => graphData.graphType === 'fact' || graphData.graphType === 'plan');
                return filteredGraphs;
        }
    }
}
