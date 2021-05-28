import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit } from "@angular/core";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";
import { WidgetService } from "@dashboard/services/widget.service";
import { HttpClient } from "@angular/common/http";
import { IDeviationDiagramData } from "../shared/kpe-deviation-diagram/kpe-deviation-diagram.component";
import { IBarDiagramData } from "../shared/kpe-equalizer-chart/kpe-equalizer-chart.component";
import { KpeHelperService } from "../shared/kpe-helper.service";
import { IKpeGaugeChartData, IKpeLineChartData } from "../shared/kpe-charts.model";
import { KpeEngUnitsComparator } from "../shared/kpe-eng-units-comparator";
import { IKpeUniversalCardLineChart } from "@widgets/KPE/shared/kpe-universal-card/kpe-universal-card.component";
import { BehaviorSubject, Observable, Subject } from "rxjs";

type DisplayModeType = 'tiled' | 'line' | 'planFeasibility';

export interface IKpeQualityData {
    cards: IKpeQualityCard[] | null;
    deviationChart: IKpeLineChartData[] | null;
    deviationDiagram: IKpeGaugeChartData | null;
    displayMode: DisplayModeType;
}

export interface IKpeQualityCard {
    description: string;
    equalizerChart: IKpeLineChartData[];
    equalizerChartConverted?: IBarDiagramData[];
    gaugeChart: IKpeGaugeChartData;
}

export interface IKpeWidgetAttributes {
    IsDesign: boolean;
}

@Component({
    selector: 'evj-kpe-quality',
    templateUrl: './kpe-quality.component.html',
    styleUrls: ['./kpe-quality.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpeQualityComponent extends WidgetPlatform<IKpeWidgetAttributes> implements OnInit, OnDestroy {
    // Subjects for change data state
    private cardsSubject$: Subject<IKpeQualityCard[][]> = new BehaviorSubject([])
    private deviationDiagramSubject$: Subject<IKpeGaugeChartData> = new Subject();
    private deviationChartDataSubject$: Subject<IDeviationDiagramData[]> = new BehaviorSubject([]);
    private displayNewDesignSubject$: Subject<boolean> = new BehaviorSubject(false);
    private displayedMonthSubject$: Subject<Date> = new Subject();
    private cards: IKpeQualityCard[][] = [];

    // Observables for transfer data state to components
    public cards$: Observable<IKpeQualityCard[][]> = this.cardsSubject$.asObservable();
    public deviationDiagram$: Observable<IKpeGaugeChartData> = this.deviationDiagramSubject$.asObservable();
    public deviationChartData$: Observable<IDeviationDiagramData[]> = this.deviationChartDataSubject$.asObservable();
    public displayNewDesign$: Observable<boolean> = this.displayNewDesignSubject$.asObservable();
    public displayedMonth$: Observable<Date> = this.displayedMonthSubject$.asObservable();

    public margin: { top: number; right: number; bottom: number; left: number } = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40,
    };
    public displayMode: DisplayModeType;
    public engUnitsComparator: KpeEngUnitsComparator = new KpeEngUnitsComparator();

    constructor(
        private hostElement: ElementRef,
        protected widgetService: WidgetService,
        private http: HttpClient,
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

    public trackByFuncMain(index: number, cards: IKpeQualityCard[]): IKpeQualityCard[] {
        return cards;
    }

    public trackByFuncCard(index: number, card: IKpeQualityCard): IKpeQualityCard {
        return card;
    }

    public gaugeWidth(container: HTMLDivElement): string {
        if (!(container?.offsetHeight > 0)) {
            return;
        }
        const height = container.offsetHeight;
        return `min-width: ${height * 1.136}px`;
    }

    public chartWidth(container: HTMLDivElement): string {
        if (!(container?.offsetHeight > 0)) {
            return;
        }
        const height = container.offsetHeight;
        return `width: ${height}px`;
    }

    protected dataHandler(ref: IKpeQualityData): void {
        // remove object mutation;
        ref = this.setDeviationPercentage(ref);
        this.displayMode = ref.displayMode;
        this.deviationDiagramSubject$.next(ref.deviationDiagram);
        this.deviationChartDataSubject$.next(this.formatData(ref.deviationChart));

        const cards = this.kpeHelperService.sortArray<IKpeQualityCard>(ref.cards, 2);

        if (!this.cards.length) {
            cards.forEach((cardsSetNew) => {
                this.cards.push(this.prepareEqualizerData(cardsSetNew));
            });
        } else {
            cards.forEach((cardsSetNew) => {
                this.cards.forEach((cardsSetExist) => {
                    if (this.kpeHelperService.compare<IKpeQualityCard>(cardsSetNew, cardsSetExist)) {
                        this.cards.push(this.prepareEqualizerData(cardsSetNew));
                    }
                });
            });
        }

        this.cardsSubject$.next(this.cards);

        ref.deviationChart?.forEach((data) => {
            if (data.graphType === 'fact') {
                this.displayedMonthSubject$.next(new Date(data.graph?.[0]?.timeStamp))
            }
        });
    }

    private setDeviationPercentage(srcArr: IKpeQualityData): IKpeQualityData {
        return {
            ...srcArr,
            cards: srcArr.cards.map(x => ({
                ...x,
                gaugeChart: {
                    ...x.gaugeChart,
                    deviationPercentage: 100 - x.gaugeChart.percentage
                }
            }))
        };
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.displayNewDesignSubject$.next(this.attributes.IsDesign);
    }

    private prepareEqualizerData(cardSet: IKpeQualityCard[]): IKpeQualityCard[] {
        cardSet.map((card) => {
            card.equalizerChartConverted = this.formatData(card.equalizerChart);
        });
        return cardSet;
    }

    private formatData(data: IKpeLineChartData[]): IBarDiagramData[] {
        if (!data?.length) {
            return [];
        }
        return this.kpeHelperService.prepareKpeLineChartData(data);
    }

    public getContentData(card: IKpeGaugeChartData, description: string): IKpeUniversalCardLineChart {
        return {
            name: card.title,
            title: description,
            percent: card.percentage,
            percentStatus: 'default',
            deviationPlanPredict: card.plan,
            deviationPlanPredictFact: card.fact,
            isWarning: card.isWarning,
            fact: card.fact,
            percentageInfluence: card.percentageInfluence,
            plan: card.plan,
            planPredict: card.plan,
            predict: card.plan,
        }
    }
}
