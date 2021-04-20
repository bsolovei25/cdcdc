import { Component, OnInit, Inject, OnDestroy, ElementRef } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { HttpClient } from '@angular/common/http';
import { IProductionTrend } from '../../../dashboard/models/LCO/production-trends.model';
import { IDeviationDiagramData } from '../shared/kpe-deviation-diagram/kpe-deviation-diagram.component';
import { IBarDiagramData } from '../shared/kpe-equalizer-chart/kpe-equalizer-chart.component';
import { KpeHelperService } from '../shared/kpe-helper.service';
import { IKpeGaugeChartData, IKpeLineChartData } from '../shared/kpe-charts.model';
import { KpeEngUnitsComparator } from '../shared/kpe-eng-units-comparator';
import {IKpeUniversalCardLineChart} from "@widgets/KPE/shared/kpe-universal-card/kpe-universal-card.component";

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
})
export class KpeQualityComponent extends WidgetPlatform<IKpeWidgetAttributes> implements OnInit, OnDestroy {
    public lineChartData: IProductionTrend[] = [];

    public margin: { top: number; right: number; bottom: number; left: number } = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40,
    };

    public deviationChartData: IDeviationDiagramData[] = [];

    public deviationDiagram: IKpeGaugeChartData = { plan: 100, fact: 100 };

    public cards: IKpeQualityCard[][] = [];

    public displayedMonth: Date;

    public displayMode: DisplayModeType;

    public engUnitsComparator: KpeEngUnitsComparator = new KpeEngUnitsComparator();

    public displayNewDesign: boolean;

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
        ref.cards.forEach((x) => (x.gaugeChart.deviationPercentage = 100 - x.gaugeChart.percentage));
        this.displayMode = ref.displayMode;
        this.deviationDiagram = ref.deviationDiagram;
        this.deviationChartData = this.formatData(ref.deviationChart);
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
        ref.deviationChart?.forEach((data) => {
            if (data.graphType === 'fact') {
                this.displayedMonth = new Date(data.graph?.[0]?.timeStamp);
            }
        });
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.displayNewDesign = this.attributes.IsDesign;
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
            fact: card.fact,
            percentageInfluence: card.percentage,
            plan: card.plan,
            planPredict: card.plan,
            predict: card.plan,
        }
    }
}
