import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { IDatesInterval, WidgetService } from '../../../../../dashboard/services/widget.service';
import { IChartMini } from '@shared/models/smart-scroll.model';
import { IMultiChartLine } from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import { ChannelPlatform } from '../../../../../dashboard/models/@PLATFORM/channel-platform';
import { AstueOnpzMnemonicFurnaceService } from '../../../astue-onpz-mnemonic-furnace/astue-onpz-mnemonic-furnace.service';

interface IGraph {
    name: string;
    graph: IMultiChartLine[];
    currentFact: number;
    currentPlan: number;
}

interface IGraphData {
    graph: IGraph;
    selectedPeriod?: IDatesInterval;
}

@Component({
    selector: 'evj-astue-onpz-factory-analysis-chart-page',
    templateUrl: './astue-onpz-factory-analysis-chart-page.component.html',
    styleUrls: ['./astue-onpz-factory-analysis-chart-page.component.scss'],
})
export class AstueOnpzFactoryAnalysisChartPageComponent extends ChannelPlatform<IGraphData>
    implements OnInit, OnDestroy {
    public graphData: IGraph = {
        name: '',
        graph: [],
        currentFact: 0,
        currentPlan: 0,
    };

    public sbLeft: number = 0;

    public sbWidth: number = 100;

    public scrollData: IChartMini[] = [];

    public selectedPeriod: IDatesInterval;

    constructor(
        protected widgetService: WidgetService,
        private mnemonicFurnaceService: AstueOnpzMnemonicFurnaceService,
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string
    ) {
        super(widgetId, channelId, widgetService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.subscriptions.push(
            this.widgetService.currentDates$.subscribe((ref) => {
                this.selectedPeriod = ref;
                if (!this.selectedPeriod) {
                    const now = new Date();
                    now.setMinutes(0, 0, 0);
                    this.selectedPeriod = {
                        fromDateTime: new Date(now.getTime() - 24 * 1000 * 60 * 60),
                        toDateTime: new Date(now.getTime() + 72 * 1000 * 60 * 60),
                    };
                } else {
                    this.selectedPeriod.fromDateTime = new Date(this.selectedPeriod.fromDateTime);
                    this.selectedPeriod.toDateTime = new Date(this.selectedPeriod.toDateTime);
                }
            })
        );

        this.mnemonicFurnaceService.selectedItem$.subscribe((item) => {
            this.channelId = item;
            super.disconnectWs();
            super.connectWs();
        });
    }

    protected dataHandler(ref: IGraphData): void {
        this.graphData = ref.graph;
        console.log(this.graphData, 'this.graphData');

        this.scrollData = this.graphData?.graph
            ?.find((item) => item.graphType === 'plan')
            ?.graph.map((item) => {
                return {
                    value: item.value,
                    timeStamp: new Date(item.timeStamp),
                };
            });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
