import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'evj-ec-widget-factor-analysis-chart-info',
    templateUrl: './ec-widget-factor-analysis-chart-info.component.html',
    styleUrls: ['./ec-widget-factor-analysis-chart-info.component.scss'],
})
export class EcWidgetFactorAnalysisChartInfoComponent implements OnInit {
    // TODO: temp to test
    @Input()
    public type: 'plan' | 'fact' | 'interval' = 'plan';

    @Input()
    public value: number = 0;

    constructor() {}

    ngOnInit(): void {}
}
