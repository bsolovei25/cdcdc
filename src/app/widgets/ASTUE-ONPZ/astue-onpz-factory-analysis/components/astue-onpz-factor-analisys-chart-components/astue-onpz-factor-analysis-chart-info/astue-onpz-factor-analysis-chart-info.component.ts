import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'evj-astue-onpz-factor-analysis-chart-info',
    templateUrl: './astue-onpz-factor-analysis-chart-info.component.html',
    styleUrls: ['./astue-onpz-factor-analysis-chart-info.component.scss'],
})
export class AstueOnpzFactorAnalysisChartInfoComponent implements OnInit {
    // TODO: temp to test
    @Input()
    public type: 'plan' | 'fact' | 'interval' = 'plan';

    @Input()
    public value: number = 0;

    constructor() {}

    ngOnInit(): void {}
}
