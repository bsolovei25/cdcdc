import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { IProductionTrend } from '../../../../../dashboard/models/production-trends.model';
import { IPointTank } from '@shared/models/smart-scroll.model';

@Component({
    selector: 'evj-oil-operations-line-chart',
    templateUrl: './oil-operations-line-chart.component.html',
    styleUrls: ['./oil-operations-line-chart.component.scss'],
})
export class OilOperationsLineChartComponent implements OnInit, AfterViewInit {
    @Output() public closeLineChart: EventEmitter<boolean> = new EventEmitter<boolean>();

    public data: IProductionTrend[] = [
        {
            graphType: 'fact',
            graphStyle: 'main',
            additional: {
                tankName: 'Резервуар 503',
                maxValue: 7000,
            },
            graph: [
                {
                    value: 1000,
                    timeStamp: new Date(2020, 2, 1),
                },
                {
                    value: 6000,
                    timeStamp: new Date(2020, 2, 2),
                },
                {
                    value: 4500,
                    timeStamp: new Date(2020, 2, 3),
                },
                {
                    value: 900,
                    timeStamp: new Date(2020, 2, 4),
                },
                {
                    value: 1300,
                    timeStamp: new Date(2020, 2, 5),
                },
                {
                    value: 5800,
                    timeStamp: new Date(2020, 2, 6),
                },
                {
                    value: 900,
                    timeStamp: new Date(2020, 2, 7),
                },
            ],
        },
    ];

    public points: IPointTank[] = [
        {
            value: 6000,
            timestamp: new Date(2020, 2, 2),
            additional: {
                card: {
                    objectType: 'tank',
                    title: 'ЭЛОУ-АВТ-6',
                    direction: 'Приемник',
                },
            },
        },
        {
            value: 900,
            timestamp: new Date(2020, 2, 4),
            additional: {
                card: {
                    objectType: 'unit',
                    title: 'АВТ-6',
                    direction: 'Приемник',
                },
            },
        },
        {
            value: 5800,
            timestamp: new Date(2020, 2, 6),
            additional: {
                card: {
                    objectType: 'tank',
                    title: 'ЭЛОУ-6',
                    direction: 'Источник',
                },
            },
        },
        {
            value: 900,
            timestamp: new Date(2020, 2, 7),
            additional: {
                card: {
                    objectType: 'unit',
                    title: 'ЭЛОУ-АВТ-6',
                    direction: 'Источник',
                },
            },
        },
    ];

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
