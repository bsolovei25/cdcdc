import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, QueryList, ViewChildren } from "@angular/core";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";
import { WidgetService } from "@dashboard/services/widget.service";
import { IProductionTrend } from "@dashboard/models/LCO/production-trends.model";
import { IDeviationDiagramData } from "../shared/kpe-deviation-diagram/kpe-deviation-diagram.component";
import { IKpeLineChartData } from "../shared/kpe-charts.model";
import { KpeHelperService } from "../shared/kpe-helper.service";
import { KpeEngUnitsComparator } from "../shared/kpe-eng-units-comparator";
import { IKpeWidgetAttributes } from "../kpe-quality/kpe-quality.component";
import { IKpeGaugeChartPage } from "@widgets/KPE/key-performance-indicators/components/gauge-diagram/gauge-diagram.component";
import { IKpeUniversalCardLineChart } from "@widgets/KPE/shared/kpe-universal-card/kpe-universal-card.component";
import { BehaviorSubject, Observable, Subject } from "rxjs";

export interface IKpeGaugeCard {
    chartPage: IKpeGaugeChartPage;
    linePage: IKpeUniversalCardLineChart;
}

export interface IKpeReadinessData {
    chartCards: IKpeReadinessChartCard[] | null;
    deviationChart: IKpeLineChartData[] | null;
    deviationDiagram: IKpeGaugeChartPage | null;
    gaugeCards: IKpeGaugeCard[] | null;
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
    debalancePercent?: number;
    isUnitPercent?: boolean;
}

@Component({
    selector: 'evj-kpe-readiness',
    templateUrl: './kpe-readiness.component.html',
    styleUrls: ['./kpe-readiness.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpeReadinessComponent extends WidgetPlatform<IKpeWidgetAttributes> implements OnInit, OnDestroy {
    @ViewChildren('gauge') gauge: HTMLDivElement;
    @ViewChildren('gauges')
    public gaugesElements: QueryList<HTMLDivElement>;

    public lineChartData: IProductionTrend[] = [];

    // Subjects for change data state
    private deviationChartDataSubject$: BehaviorSubject<IDeviationDiagramData[]> = new BehaviorSubject([]);
    private gaugeCardsSubject$: BehaviorSubject<IKpeGaugeCard[]> = new BehaviorSubject([]);
    private chartCardSubject$: Subject<IKpeReadinessChartCard> = new Subject();
    private chartCardsSubject$: BehaviorSubject<IKpeReadinessChartCard[] | IKpeReadinessChartCard[][]> = new BehaviorSubject(null);
    private diagramSubject$: Subject<IKpeGaugeChartPage> = new Subject();

    private displayedMonthSubject$: Subject<Date> = new Subject();
    // Observables for transfer data state to components
    public deviationChartData$: Observable<IDeviationDiagramData[]> = this.deviationChartDataSubject$.asObservable();
    public gaugeCards$: Observable<IKpeGaugeCard[]> = this.gaugeCardsSubject$.asObservable();
    public chartCard$: Observable<IKpeReadinessChartCard> = this.chartCardSubject$.asObservable();
    public chartCards$: Observable<IKpeReadinessChartCard[] | IKpeReadinessChartCard[][]> = this.chartCardsSubject$.asObservable();
    public diagram$: Observable<IKpeGaugeChartPage> = this.diagramSubject$.asObservable();
    public displayedMonth$: Observable<Date> = this.displayedMonthSubject$.asObservable();
    private displayNewDesignSubject$: Subject<boolean> = new BehaviorSubject(false);
    public displayNewDesign$: Observable<boolean> = this.displayNewDesignSubject$.asObservable();

    public margin: { top: number; right: number; bottom: number; left: number } = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40,
    };

    displayMode: 'tiled' | 'line';

    public engUnitsComparator: KpeEngUnitsComparator = new KpeEngUnitsComparator();

    public displayNewDesign: boolean;

    constructor(
        protected widgetService: WidgetService,
        private kpeHelperService: KpeHelperService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public trackByIndex(index: number): number {
        return index;
    }

    protected dataHandler(ref: IKpeReadinessData): void {
        this.displayMode = ref.displayMode;
        if (!!ref?.deviationChart) {
            this.deviationChartDataSubject$.next(this.kpeHelperService.prepareKpeLineChartData(ref.deviationChart));
        }
        this.gaugeCardsSubject$.next(this.setIsWarning(ref).gaugeCards as IKpeGaugeCard[])
        this.chartCardsSubject$.next(this.setDeviationPercentage(ref).chartCards as IKpeReadinessChartCard[]);

        if (ref.chartCards.length > 0) {
            if (this.displayMode === 'line') {
                this.chartCardSubject$.next(this.chartCardsSubject$.value[0] as IKpeReadinessChartCard);
            } else {
                this.chartCardSubject$.next(this.chartCardsSubject$.value.shift() as IKpeReadinessChartCard);
            }
        }

        this.chartCardsSubject$.next(this.kpeHelperService.sortArray<IKpeReadinessChartCard>(
            this.chartCardsSubject$.value as IKpeReadinessChartCard[],
            2
        ) as IKpeReadinessChartCard[][]);

        this.diagramSubject$.next(ref.deviationDiagram);

        ref.deviationChart.forEach((data) => {
            if (data.graphType === 'fact') {
                this.displayedMonthSubject$.next(new Date(data.graph?.[0]?.timeStamp));
            }
        });
    }

    private setIsWarning(srcArr: IKpeReadinessData): IKpeReadinessData {
        // TODO Временный костыль для работы isWarning, пока не добавят поле в обьект linePage
        return {
            ...srcArr,
            gaugeCards: srcArr.gaugeCards.map(card => ({
             ...card,
                linePage: {
                 ...card.linePage,
                    isWarning: card.chartPage.isWarning
                }
            }))
        }
    }

    private setDeviationPercentage(srcArr: IKpeReadinessData): IKpeReadinessData {
        return {
            ...srcArr,
            chartCards: srcArr.chartCards.map(x => ({
                ...x,
                progressChart: {
                    ...x.progressChart,
                    deviationPercentage: 100 - x.progressChart.percentage
                },
            }))
        };
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.displayNewDesignSubject$.next(this.attributes.IsDesign);
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
        if (this.gaugeCardsSubject$.value.length > 0) {
            width = container?.offsetWidth / this.gaugeCardsSubject$.value.length;
        } else {
            width = container?.offsetWidth / 4;
        }
        return `min-height: ${width * 0.93}px; height: ${width * 0.93}px`;
    }
}
