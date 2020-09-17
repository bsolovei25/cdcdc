import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
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
    gaugeChart: IKpeGaugeChartData;
}

@Component({
    selector: 'evj-kpe-quality',
    templateUrl: './kpe-quality.component.html',
    styleUrls: ['./kpe-quality.component.scss'],
})
export class KpeQualityComponent extends WidgetPlatform implements OnInit, OnDestroy {

    public lineChartData: IProductionTrend[] = [];

    public margin = { top: 20, right: 20, bottom: 30, left: 40 };

    public deviationChartData: IDeviationDiagramData[] = [];

    public deviationDiagram: IKpeGaugeChartData = { plan: 100, fact: 100 };

    public equalizerData: IBarDiagramData[] = [];

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

        this.http
            .get('assets/mock/KPE/equalizer-chart.json')
            .toPromise()
            .then((data: IBarDiagramData[]) => {
                this.equalizerData = data;
            });
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
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
        this.cards = this.sortArray(ref.cards, 2);
    }

    public formatData(data: IKpeLineChartData[]): IBarDiagramData[] {
        return this.kpeHelperService.prepareKpeLineChartData(data);
    }

    public sortArray(
        arr: IKpeQualityCard[],
        n: number
    ): IKpeQualityCard[][] {
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
}
