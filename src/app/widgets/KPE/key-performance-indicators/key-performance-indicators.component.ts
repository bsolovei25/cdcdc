import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IKpeGaugeChartPage } from './components/gauge-diagram/gauge-diagram.component';

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
export class KeyPerformanceIndicatorsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public sourceData: IKpeGaugeChartData;
    public diagramData: IKpeGaugeChartPage;

    public activeIndicatorType: KeyPerformanceIndicatorType;

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
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
        this.sourceData = ref;
        this.setActiveIndicator();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
