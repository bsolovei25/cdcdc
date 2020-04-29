import { Component, OnInit } from '@angular/core';
import { IProductionTrend } from '../../../../models/production-trends.model';
import { IPointTank } from '../../../../../@shared/models/smart-scroll.model';

@Component({
    selector: 'evj-reasons-deviations-line-chart',
    templateUrl: './reasons-deviations-line-chart.component.html',
    styleUrls: ['./reasons-deviations-line-chart.component.scss'],
})
export class ReasonsDeviationsLineChartComponent implements OnInit {
    public data: IProductionTrend[] = [
        {
            graphType: 'fact',
            graphStyle: 'main',
            graph: [
                {
                    value: 1000,
                    timestamp: new Date(2020, 2, 1),
                },
                {
                    value: 6000,
                    timestamp: new Date(2020, 2, 2),
                },
                {
                    value: 4500,
                    timestamp: new Date(2020, 2, 3),
                },
                {
                    value: 900,
                    timestamp: new Date(2020, 2, 4),
                },
                {
                    value: 1300,
                    timestamp: new Date(2020, 2, 5),
                },
                {
                    value: 5800,
                    timestamp: new Date(2020, 2, 6),
                },
                {
                    value: 900,
                    timestamp: new Date(2020, 2, 7),
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
                    objectType: 'tank',
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
                    objectType: 'tank',
                    title: 'ЭЛОУ-АВТ-6',
                    direction: 'Источник',
                },
            },
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
