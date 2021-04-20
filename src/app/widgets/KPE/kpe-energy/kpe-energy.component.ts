import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { IKpeEnergyTab } from './components/kpe-energy-tab/kpe-energy-tab.component';
import { IDeviationDiagramData } from '../shared/kpe-deviation-diagram/kpe-deviation-diagram.component';
import { IKpeGaugeChartData, IKpeLineChartData } from '../shared/kpe-charts.model';
import { KpeHelperService } from '../shared/kpe-helper.service';
import { KpeEngUnitsComparator } from '../shared/kpe-eng-units-comparator';
import { IKpeWidgetAttributes } from "../kpe-quality/kpe-quality.component";
import {IKpeGaugeChartPage} from "@widgets/KPE/key-performance-indicators/components/gauge-diagram/gauge-diagram.component";
import {IKpeUniversalCardLineChart} from "@widgets/KPE/shared/kpe-universal-card/kpe-universal-card.component";

export interface IKpeEnergy {
    tabs: IKpeEnergyTab[] | null;
    chart: IKpeLineChartData[] | null;
    diagram: IKpeGaugeChartData | IKpeGaugeChartPage | null;
    displayMode: 'tiled' | 'line';
}

@Component({
    selector: 'evj-kpe-energy',
    templateUrl: './kpe-energy.component.html',
    styleUrls: ['./kpe-energy.component.scss'],
})
export class KpeEnergyComponent extends WidgetPlatform<IKpeWidgetAttributes> implements OnInit {
    // static true fix expression has been checked
    @ViewChild('gauge', { static: true })
    public gaugeElement: ElementRef;

    public data: IKpeEnergy = { tabs: null, chart: null, diagram: null, displayMode: 'tiled' };

    public deviationChartData: IDeviationDiagramData[] = [];

    public displayedMonth: Date;

    public engUnitsComparator: KpeEngUnitsComparator = new KpeEngUnitsComparator();

    displayMode: 'tiled' | 'line';

    public displayNewDesign: boolean;

    constructor(
        private http: HttpClient,
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

    protected dataHandler(ref: IKpeEnergy): void {
        this.data = ref;

        this.data.tabs.forEach((x) => (x.deviationPercentage = 100 - x.percentage));
        this.displayMode = ref.displayMode;
        if (this.kpeHelperService.compare<IKpeEnergyTab>(this.data.tabs, ref.tabs)) {
            this.data.tabs = ref.tabs;
        }
        if (this.kpeHelperService.compare<IKpeLineChartData>(this.data.chart, ref.chart)) {
            this.data.chart = ref.chart;
        }
        this.data.diagram = ref.diagram;
        this.deviationChartData = this.kpeHelperService.prepareKpeLineChartData(this.data.chart);
        ref.chart.forEach((data) => {
            if (data.graphType === 'fact') {
                this.displayedMonth = new Date(data.graph?.[0]?.timeStamp);
            }
        });
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.displayNewDesign = this.attributes.IsDesign;
    }

    get chartWidth(): string {
        if (!(this.gaugeElement?.nativeElement?.offsetHeight > 0)) {
            return;
        }
        const height = this.gaugeElement.nativeElement.offsetHeight;
        return `min-width: ${height}px`;
    }

    private getNameTab(key: string): string {
        switch (key) {
            case 'warm': {
                return 'Тепловая энергия';
            }
            case 'water': {
                return 'Обороная вода';
            }
            case 'steam': {
                return 'Производство пара';
            }
            case 'fuel': {
                return 'Топливо';
            }
            case '': {
                return 'Электроэнергия';
            }
        }
    }

    public getContentData(tab: IKpeEnergyTab): IKpeUniversalCardLineChart {
        return {
            name: this.getNameTab(tab.type),
            title: this.getNameTab(tab.type),
            percent: tab.percentage,
            percentStatus: 'default',
            deviationPlanPredict: tab.plan,
            deviationPlanPredictFact: tab.fact,
            fact: tab.fact,
            percentageInfluence: tab.percentage,
            plan: tab.plan,
            planPredict: tab.plan,
            predict: tab.plan,
        }
    }
}
