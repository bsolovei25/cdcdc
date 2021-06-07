import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'cmid-operational-readiness-vpr-chart',
    templateUrl: './cmid-operational-readiness-vpr-chart.component.html',
    styleUrls: ['./cmid-operational-readiness-vpr-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmidOperationalReadinessVprChartComponent implements OnInit {
    public chartWidth: string;

    @Input() public countStatistic: number;

    ngOnInit(): void {
        this.chartWidth = this.countStatistic + '%';
    }
}