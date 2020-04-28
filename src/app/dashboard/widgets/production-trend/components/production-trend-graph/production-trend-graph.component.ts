import { Component, OnInit } from '@angular/core';
import { IProductionTrend } from '../../../../models/production-trends.model';

@Component({
    selector: 'evj-production-trend-graph',
    templateUrl: './production-trend-graph.component.html',
    styleUrls: ['./production-trend-graph.component.scss'],
})
export class ProductionTrendGraphComponent implements OnInit {
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
                    value: 4500,
                    timestamp: new Date(2020, 2, 7),
                },
            ],
        },
        {
            graphType: 'plan',
            graphStyle: 'common',
            graph: [
                {
                    value: 1600,
                    timestamp: new Date(2020, 2, 1),
                },
                {
                    value: 1500,
                    timestamp: new Date(2020, 2, 2),
                },
                {
                    value: 1000,
                    timestamp: new Date(2020, 2, 3),
                },
                {
                    value: 6000,
                    timestamp: new Date(2020, 2, 4),
                },
                {
                    value: 5000,
                    timestamp: new Date(2020, 2, 5),
                },
                {
                    value: 1000,
                    timestamp: new Date(2020, 2, 6),
                },
                {
                    value: 3000,
                    timestamp: new Date(2020, 2, 7),
                },
            ],
        },
        {
            graphType: 'higherBorder',
            graphStyle: 'additional',
            graph: [
                {
                    value: 1700,
                    timestamp: new Date(2020, 2, 1),
                },
                {
                    value: 1600,
                    timestamp: new Date(2020, 2, 2),
                },
                {
                    value: 1100,
                    timestamp: new Date(2020, 2, 3),
                },
                {
                    value: 6100,
                    timestamp: new Date(2020, 2, 4),
                },
                {
                    value: 5100,
                    timestamp: new Date(2020, 2, 5),
                },
                {
                    value: 1100,
                    timestamp: new Date(2020, 2, 6),
                },
                {
                    value: 3100,
                    timestamp: new Date(2020, 2, 7),
                },
            ],
        },
        {
            graphType: 'lowerBorder',
            graphStyle: 'additional',
            graph: [
                {
                    value: 1500,
                    timestamp: new Date(2020, 2, 1),
                },
                {
                    value: 1400,
                    timestamp: new Date(2020, 2, 2),
                },
                {
                    value: 900,
                    timestamp: new Date(2020, 2, 3),
                },
                {
                    value: 5900,
                    timestamp: new Date(2020, 2, 4),
                },
                {
                    value: 4900,
                    timestamp: new Date(2020, 2, 5),
                },
                {
                    value: 900,
                    timestamp: new Date(2020, 2, 6),
                },
                {
                    value: 2900,
                    timestamp: new Date(2020, 2, 7),
                },
            ],
        },
    ];

    public sbWidth: number = 20;
    public sbLeft: number = 6;

    constructor() {}

    public ngOnInit(): void {}
}
