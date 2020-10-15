import { Component, OnInit, Inject, OnDestroy, ElementRef } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { HttpClient } from '@angular/common/http';
import { IProductionTrend } from '../../../dashboard/models/production-trends.model';
import { IDeviationDiagramData } from '../shared/kpe-deviation-diagram/kpe-deviation-diagram.component';
import { IBarDiagramData } from '../shared/kpe-equalizer-chart/kpe-equalizer-chart.component';
import { KpeHelperService } from '../shared/kpe-helper.service';
import { IKpeGaugeChartData, IKpeLineChartData } from '../shared/kpe-charts.model';

export interface IKpeQualityData {
    cards: IKpeQualityCard[] | null;
    deviationChart: IKpeLineChartData[] | null;
    deviationDiagram: IKpeGaugeChartData | null;
}

export interface IKpeQualityCard {
    description: string;
    equalizerChart: IKpeLineChartData[];
    equalizerChartConverted?: IBarDiagramData[];
    gaugeChart: IKpeGaugeChartData;
}

@Component({
    selector: 'evj-kpe-quality',
    templateUrl: './kpe-quality.component.html',
    styleUrls: ['./kpe-quality.component.scss'],
})
export class KpeQualityComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

    public lineChartData: IProductionTrend[] = [];

    public margin = { top: 20, right: 20, bottom: 30, left: 40 };

    public deviationChartData: IDeviationDiagramData[] = [];

    public deviationDiagram: IKpeGaugeChartData = { plan: 100, fact: 100 };

    public cards: IKpeQualityCard[][] = [];

    constructor(
        private hostElement: ElementRef,
        protected widgetService: WidgetService,
        private http: HttpClient,
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

    protected dataHandler(ref: IKpeQualityData): void {
        this.deviationDiagram = ref.deviationDiagram;
        this.deviationChartData = this.formatData(ref.deviationChart);
        const cards = this.kpeHelperService.sortArray<IKpeQualityCard>(ref.cards, 2);
        if (!this.cards.length) {
            cards.forEach(cardsSetNew => {
                this.cards.push(this.prepareEqualizerData(cardsSetNew));
            });
        } else {
            cards.forEach(cardsSetNew => {
                this.cards.forEach(cardsSetExist => {
                    if (this.kpeHelperService.compare<IKpeQualityCard>(cardsSetNew, cardsSetExist)) {
                        this.cards.push(this.prepareEqualizerData(cardsSetNew));
                    }
                });
            });
        }
    }

    private prepareEqualizerData(cardSet: IKpeQualityCard[]): IKpeQualityCard[] {
        cardSet.map(card => {
            card.equalizerChartConverted = this.formatData(card.equalizerChart);
        });
        return cardSet;
    }

    private formatData(data: IKpeLineChartData[]): IBarDiagramData[] {
        return this.kpeHelperService.prepareKpeLineChartData(data);
    }
}
