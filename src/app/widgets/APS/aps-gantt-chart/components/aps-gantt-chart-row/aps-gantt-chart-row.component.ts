import { Component, OnInit, Input } from '@angular/core';
import { IAPSGanttChart, IColumnsToDisplay } from '../../aps-gantt-chart.component';

@Component({
    selector: 'evj-aps-gantt-chart-row',
    templateUrl: './aps-gantt-chart-row.component.html',
    styleUrls: ['./aps-gantt-chart-row.component.scss'],
})
export class ApsGanttChartRowComponent implements OnInit {
    @Input() element: IAPSGanttChart;
    @Input() column: IColumnsToDisplay;

    constructor() {}

    ngOnInit(): void {}
}
