import { Component, Inject, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IProductionTrend } from '../../../dashboard/models/LCO/production-trends.model';
import { IDeviationDiagramData } from '../shared/kpe-deviation-diagram/kpe-deviation-diagram.component';
import { IKpeGaugeChartData, IKpeLineChartData } from '../shared/kpe-charts.model';
import { KpeHelperService } from '../shared/kpe-helper.service';
import { KpeEngUnitsComparator } from '../shared/kpe-eng-units-comparator';
import { IKpeWidgetAttributes } from "../kpe-quality/kpe-quality.component";

export interface IKpeReadinessData {
    chartCards: IKpeReadinessChartCard[] | null;
    deviationChart: IKpeLineChartData[] | null;
    deviationDiagram: IKpeGaugeChartData | null;
    gaugeCards: IKpeGaugeChartData[] | null;
    displayMode: 'tiled' | 'line';
}

export interface IKpeReadinessChartCard {
    progressChart: IKpeReadinessGauge;
    trendChart: IProductionTrend[];
}

export interface IKpeReadinessGauge {
    title: string;
    unit: string;
    deviation?: number;
    fact: number;
    plan: number;
    percentage: number;
    deviationPercentage: number;
}

@Component({
    selector: 'evj-kpe-readiness',
    templateUrl: './kpe-readiness.component.html',
    styleUrls: ['./kpe-readiness.component.scss'],
})
export class KpeReadinessComponent extends WidgetPlatform<IKpeWidgetAttributes> implements OnInit, OnDestroy {
    @ViewChildren('gauges')
    public gaugesElements: QueryList<HTMLDivElement>;

    public lineChartData: IProductionTrend[] = [];

    public deviationChartData: IDeviationDiagramData[] = [];

    public gaugeCards: IKpeGaugeChartData[] = [];

    public chartCard: IKpeReadinessChartCard;

    public chartCards: IKpeReadinessChartCard[] | IKpeReadinessChartCard[][];

    public diagram: IKpeGaugeChartData;

    public margin = { top: 20, right: 20, bottom: 30, left: 40 };

    public displayedMonth: Date;

    displayMode: 'tiled' | 'line';

    public engUnitsComparator: KpeEngUnitsComparator = new KpeEngUnitsComparator();

    public displayNewDesign: boolean;

    constructor(
        protected widgetService: WidgetService,
        private kpeHelperService: KpeHelperService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IKpeReadinessData): void {
        this.displayMode = ref.displayMode;
        if (!!ref?.deviationChart) {
            this.deviationChartData = this.kpeHelperService.prepareKpeLineChartData(ref.deviationChart);
        }
        if (this.kpeHelperService.compare<IKpeGaugeChartData>(this.gaugeCards, ref.gaugeCards)) {
            this.gaugeCards = ref.gaugeCards;
            this.gaugeCards.forEach((x) => (x.deviationPercentage = 100 - x.percentage));
        }
        this.chartCards = ref.chartCards as IKpeReadinessChartCard[];
        // TODO get from back
        this.chartCards.forEach((x) => (x.progressChart.deviationPercentage = 100 - x.progressChart.percentage));

        if (this.chartCards.length > 0) {
            if (this.displayMode === 'line') {
                this.chartCard = this.chartCards[0];
            } else {
                this.chartCard = this.chartCards.shift();
            }
        }
        this.chartCards = this.kpeHelperService.sortArray<IKpeReadinessChartCard>(
            this.chartCards,
            2
        ) as IKpeReadinessChartCard[][];
        this.diagram = ref.deviationDiagram;
        ref.deviationChart.forEach((data) => {
            if (data.graphType === 'fact') {
                this.displayedMonth = new Date(data.graph?.[0]?.timeStamp);
            }
        });
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.displayNewDesign = this.attributes.IsDesign;
    }

    public gaugeWidth(container: HTMLDivElement): string {
        if (!(container?.offsetHeight > 0)) {
            return;
        }
        const height = container.offsetHeight;
        return `min-width: ${height * 1.136}px`;
    }

    public prepareTrendData(data: IProductionTrend[]): IProductionTrend[] | void {
        if (!data) {
            return;
        }
        return this.kpeHelperService.prepareKpeTrendChartData(data);
    }

    public rowHeight(container: HTMLDivElement): string {
        if (!container) {
            return;
        }

        if (!(container?.offsetWidth > 0)) {
            return;
        }

        let width: number;
        if (this.gaugeCards.length > 0) {
            width = container?.offsetWidth / this.gaugeCards.length;
        } else {
            width = container?.offsetWidth / 4;
        }
        return `min-height: ${width * 0.93}px; height: ${width * 0.93}px`;
    }
}
