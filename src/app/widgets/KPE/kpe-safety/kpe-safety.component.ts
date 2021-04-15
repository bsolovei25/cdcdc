import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { IDeviationDiagramData } from '../shared/kpe-deviation-diagram/kpe-deviation-diagram.component';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { IKpeGaugeChartData, IKpeLineChartData } from '../shared/kpe-charts.model';
import { KpeHelperService } from '../shared/kpe-helper.service';
import { KpeEngUnitsComparator } from '../shared/kpe-eng-units-comparator';
import { IKpeWidgetAttributes } from "../kpe-quality/kpe-quality.component";
import {IKpeGaugeChartPage} from "@widgets/KPE/key-performance-indicators/components/gauge-diagram/gauge-diagram.component";

export interface IKpeSafetyData {
    gaugeCards: IKpeSafetyCard[] | null;
    deviationChart: IKpeLineChartData[] | null;
    deviationDiagram: IKpeGaugeChartData | null;
}

export interface IKpeSafetyCard {
    title: string;
    unit: string;
    deviation?: number;
    fact: number;
    plan: number;
    percentage?: number;
    deviationPercentage?: number;
}

@Component({
    selector: 'evj-kpe-safety',
    templateUrl: './kpe-safety.component.html',
    styleUrls: ['./kpe-safety.component.scss'],
})
export class KpeSafetyComponent extends WidgetPlatform<IKpeWidgetAttributes> implements OnInit, AfterViewInit {
    @ViewChild('mainGauge') public gaugeChart: ElementRef;

    public deviationChartData: IDeviationDiagramData[] = [];

    public deviationDiagramData: IKpeGaugeChartData = { plan: 100, fact: 100 };
    public deviationData :  IKpeGaugeChartData | IKpeGaugeChartPage;

    public gaugeCards: IKpeSafetyCard[][] = [];
    public cardsList: IKpeSafetyCard[] = [];

    private isRendered: boolean = false;

    public displayedMonth: Date;

    public engUnitsComparator: KpeEngUnitsComparator = new KpeEngUnitsComparator();

    public displayNewDesign: boolean;

    // Новый дизайн
    public percentData: {
        percent: number;
        percentStatus: 'default' | 'warning';
    } = {
        percent: 2,
        percentStatus: 'warning'
    }

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

    public ngAfterViewInit(): void {
        queueMicrotask(() => (this.isRendered = true));
    }

    public gaugeWidth(container: HTMLDivElement): string {
        if (!(container?.offsetHeight > 0)) {
            return;
        }
        if (!this.isRendered) {
            return;
        }
        const height = container.offsetHeight;
        return `min-width: ${height}px`;
    }

    protected dataHandler(ref: IKpeSafetyData): void {
        this.deviationChartData = this.kpeHelperService.prepareKpeLineChartData(ref.deviationChart);
        this.gaugeCards = this.kpeHelperService.sortArray<IKpeSafetyCard>(ref.gaugeCards, 4);
        this.cardsList = [];
        this.gaugeCards.forEach((card) => {
            this.cardsList = [...this.cardsList, ...card];
        });
        this.cardsList?.forEach((x) => (x.deviationPercentage = 100 - x.percentage));

        this.deviationData = this.deviationDiagramData = ref.deviationDiagram;
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
}
