import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IKpeEnergyTab } from './components/kpe-energy-tab/kpe-energy-tab.component';
import { IDeviationDiagramData } from '../shared/kpe-deviation-diagram/kpe-deviation-diagram.component';
import { IKpeGaugeChartData, IKpeLineChartData } from '../shared/kpe-charts.model';
import { KpeHelperService } from '../shared/kpe-helper.service';
import { KpeEngUnitsComparator } from '../shared/kpe-eng-units-comparator';

export interface IKpeEnergy {
    tabs: IKpeEnergyTab[] | null;
    chart: IKpeLineChartData[] | null;
    diagram: IKpeGaugeChartData | null;
    displayMode: 'tiled' | 'line';
}

@Component({
    selector: 'evj-kpe-energy',
    templateUrl: './kpe-energy.component.html',
    styleUrls: ['./kpe-energy.component.scss'],
})
export class KpeEnergyComponent extends WidgetPlatform<unknown> implements OnInit {
    // static true fix expression has been checked
    @ViewChild('gauge', { static: true })
    public gaugeElement: ElementRef;

    public data: IKpeEnergy = { tabs: null, chart: null, diagram: null, displayMode: 'tiled' };

    public deviationChartData: IDeviationDiagramData[] = [];

    public displayedMonth: Date;

    public engUnitsComparator: KpeEngUnitsComparator = new KpeEngUnitsComparator();

    displayMode: 'tiled' | 'line';

    constructor(
        private http: HttpClient,
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

    get chartWidth(): string {
        if (!(this.gaugeElement?.nativeElement?.offsetHeight > 0)) {
            return;
        }
        const height = this.gaugeElement.nativeElement.offsetHeight;
        return `min-width: ${height}px`;
    }
}
