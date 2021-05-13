import { ChangeDetectorRef, Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { IDatesInterval, WidgetService } from '../../../../../dashboard/services/widget.service';
import { IChartMini } from '@shared/interfaces/smart-scroll.model';
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
    selector: 'evj-ec-widget-factor-analysis-chart-page',
    templateUrl: './ec-widget-factor-analysis-chart-page.component.html',
    styleUrls: ['./ec-widget-factor-analysis-chart-page.component.scss'],
})
export class EcWidgetFactorAnalysisChartPageComponent
    extends ChannelPlatform<IGraphData>
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

    public countedValues: { fact: number; plan: number } = { fact: 0, plan: 0 };

    constructor(
        protected widgetService: WidgetService,
        private mnemonicFurnaceService: AstueOnpzMnemonicFurnaceService,
        private changeDetectorRef: ChangeDetectorRef,
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
            }),
            this.mnemonicFurnaceService.selectedItem$.subscribe((item) => {
                super.disconnectWs();
                this.channelId = item;
                this.dataHandler(null);
                super.connectWs();
            })
        );
    }

    public setPlanFactValues(values: { fact: number; plan: number }): void {
        this.countedValues = values;
        this.changeDetectorRef.detectChanges();
    }

    protected dataHandler(ref: IGraphData): void {
        this.graphData = ref?.graph;

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
