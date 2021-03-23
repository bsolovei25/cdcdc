import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IKpeGaugeChartPage } from './components/gauge-diagram/gauge-diagram.component';
import { KpeEngUnitsComparator } from '../shared/kpe-eng-units-comparator';
import { IKpeWidgetAttributes } from "../kpe-quality/kpe-quality.component";

export type KeyPerformanceIndicatorType = 'pimsPlan' | 'normPlan' | 'operPlan';

export interface IKpeGaugeChartData {
    pimsPlan: IKpeGaugeChartPage;
    normPlan: IKpeGaugeChartPage;
    operPlan: IKpeGaugeChartPage;
}

@Component({
    selector: 'evj-kpe-key-performance-indicators',
    templateUrl: './key-performance-indicators.component.html',
    styleUrls: ['./key-performance-indicators.component.scss'],
})
export class KeyPerformanceIndicatorsComponent extends WidgetPlatform<IKpeWidgetAttributes> implements OnInit, OnDestroy {
    public sourceData: IKpeGaugeChartData;
    public diagramData: IKpeGaugeChartPage;

    public activeIndicatorType: KeyPerformanceIndicatorType;
    public engUnitsComparator: KpeEngUnitsComparator = new KpeEngUnitsComparator();
    public displayNewDesign: boolean;

    constructor(
        public widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.setActiveIndicator();
    }

    public setActiveIndicator(indicator?: KeyPerformanceIndicatorType): void {
        indicator = indicator ? indicator : this.activeIndicatorType ? this.activeIndicatorType : 'pimsPlan';
        this.activeIndicatorType = indicator;
        if (this.sourceData) {
            this.diagramData = this.sourceData[indicator];
        }
    }

    protected dataHandler(ref: any): void {
        console.log('ref', ref);
        this.sourceData = ref;
        this.setActiveIndicator();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.displayNewDesign = this.attributes.IsDesign;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
