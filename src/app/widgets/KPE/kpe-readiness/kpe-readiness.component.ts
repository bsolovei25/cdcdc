import {
    Component,
    Inject,
    OnDestroy,
    OnInit, QueryList,
    ViewChildren,
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IProductionTrend } from '../../../dashboard/models/production-trends.model';
import { IDeviationDiagramData } from '../shared/kpe-deviation-diagram/kpe-deviation-diagram.component';
import { IKpeGaugeChartData, IKpeLineChartData } from '../shared/kpe-charts.model';
import { KpeHelperService } from '../shared/kpe-helper.service';

export interface IKpeReadinessData {
    chartCards: IKpeReadinessChartCard[] | null;
    deviationChart: IKpeLineChartData[] | null;
    deviationDiagram: IKpeGaugeChartData | null;
    gaugeCards: IKpeGaugeChartData[] | null;
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
}

@Component({
    selector: 'evj-kpe-readiness',
    templateUrl: './kpe-readiness.component.html',
    styleUrls: ['./kpe-readiness.component.scss']
})
export class KpeReadinessComponent extends WidgetPlatform implements OnInit, OnDestroy {

    @ViewChildren('gauges')
    public gaugesElements: QueryList<HTMLDivElement>;

    public lineChartData: IProductionTrend[] = [];

    public deviationChartData: IDeviationDiagramData[] = [];

    public gaugeCards: IKpeGaugeChartData[] = [];

    public chartCard: IKpeReadinessChartCard;

    public chartCards: IKpeReadinessChartCard[] | IKpeReadinessChartCard[][];

    public diagram: IKpeGaugeChartData = { plan: 100, fact: 100};

    public margin = { top: 20, right: 20, bottom: 30, left: 40 };

    constructor(protected widgetService: WidgetService,
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
        this.deviationChartData = this.kpeHelperService.prepareKpeLineChartData(ref.deviationChart);
        this.gaugeCards = ref.gaugeCards;
        this.chartCards = ref.chartCards as IKpeReadinessChartCard[];
        this.chartCard = this.chartCards.shift();
        this.chartCards = this.sortArray(this.chartCards, 2) as IKpeReadinessChartCard[][];
        this.diagram = ref.deviationDiagram;
    }

    public gaugeWidth(container: HTMLDivElement): string {
        if (!(container?.offsetHeight > 0)) {
            return;
        }
        const height = container.offsetHeight;
        return `min-width: ${height * 1.136}px`;
    }

    public prepareTrendData(data: IProductionTrend[]): IProductionTrend[] | void {
        if (!data) { return; }
        return this.kpeHelperService.prepareKpeTrendChartData(data);
    }

    public sortArray(
        arr: IKpeReadinessChartCard[],
        n: number
    ): IKpeReadinessChartCard[][] {
        let i = 0;
        let j = 0;
        const result = [];
        let temp = [];
        for (const item of arr) {
            i++;
            j++;
            temp.push(item);
            if (i === n || j === arr.length) {
                result.push(temp);
                temp = [];
                i = 0;
            }
        }
        return result;
    }

    public rowHeight(container: HTMLDivElement): string {
        if (!container) {
            return;
        }

        if (!(container?.offsetWidth > 0)) {
            return;
        }
        const width = container?.offsetWidth;
        return `min-height: ${width * 0.93}px; height: ${width * 0.93}px`;
    }
}
