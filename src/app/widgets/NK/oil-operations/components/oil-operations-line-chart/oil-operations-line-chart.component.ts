import { Component, OnInit, Output, EventEmitter, AfterViewInit, Input } from '@angular/core';
import { IProductionTrend } from '../../../../../dashboard/models/LCO/production-trends.model';
import { IPointTank } from '@shared/models/smart-scroll.model';

@Component({
    selector: 'evj-oil-operations-line-chart',
    templateUrl: './oil-operations-line-chart.component.html',
    styleUrls: ['./oil-operations-line-chart.component.scss'],
})
export class OilOperationsLineChartComponent implements OnInit, AfterViewInit {
    @Output() public closeLineChart: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    public data: IProductionTrend[] = [
        {
            graphType: 'fact',
            graphStyle: 'main',
            graph: [],
        },
    ];

    @Input()
    public points: IPointTank[] = [];

    public sbWidth: number = 20;
    public sbLeft: number = 6;

    constructor() {}

    public ngOnInit(): void {
        setTimeout(() => {
            const event = new CustomEvent('resize');
            document.dispatchEvent(event);
        }, 0);
    }

    public ngAfterViewInit(): void {}

    close(): void {
        this.closeLineChart.emit(false);
    }
}
