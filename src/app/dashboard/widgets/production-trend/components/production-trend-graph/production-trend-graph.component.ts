import { Component, OnInit } from '@angular/core';
import { IProductionTrend } from '../../../../models/production-trends.model';

@Component({
    selector: 'evj-production-trend-graph',
    templateUrl: './production-trend-graph.component.html',
    styleUrls: ['./production-trend-graph.component.scss'],
})
export class ProductionTrendGraphComponent implements OnInit {
    public graphData: IProductionTrend[] = [];

    private data: IProductionTrend[][] = [
        [
            {
                graphType: 'fact',
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
        ],
        [
            {
                graphType: 'fact',
                graph: [
                    {
                        value: 10000,
                        timestamp: new Date(2020, 0, 1),
                    },
                    {
                        value: 60500,
                        timestamp: new Date(2020, 1, 2),
                    },
                    {
                        value: 42500,
                        timestamp: new Date(2020, 2, 3),
                    },
                    {
                        value: 94500,
                        timestamp: new Date(2020, 3, 4),
                    },
                    {
                        value: 13000,
                        timestamp: new Date(2020, 4, 5),
                    },
                    {
                        value: 58000,
                        timestamp: new Date(2020, 5, 6),
                    },
                    {
                        value: 45000,
                        timestamp: new Date(2020, 6, 7),
                    },
                    {
                        value: 10000,
                        timestamp: new Date(2020, 7, 1),
                    },
                    {
                        value: 60500,
                        timestamp: new Date(2020, 8, 2),
                    },
                    {
                        value: 42500,
                        timestamp: new Date(2020, 9, 3),
                    },
                    {
                        value: 94500,
                        timestamp: new Date(2020, 10, 4),
                    },
                    {
                        value: 13000,
                        timestamp: new Date(2020, 11, 5),
                    },
                    {
                        value: 58000,
                        timestamp: new Date(2021, 0, 6),
                    },
                    {
                        value: 45000,
                        timestamp: new Date(2021, 1, 7),
                    },
                ],
            },
            {
                graphType: 'plan',
                graph: [
                    {
                        value: 37000,
                        timestamp: new Date(2020, 0, 1),
                    },
                    {
                        value: 37000,
                        timestamp: new Date(2020, 1, 2),
                    },
                    {
                        value: 37000,
                        timestamp: new Date(2020, 2, 3),
                    },
                    {
                        value: 37000,
                        timestamp: new Date(2020, 3, 4),
                    },
                    {
                        value: 60000,
                        timestamp: new Date(2020, 4, 5),
                    },
                    {
                        value: 60000,
                        timestamp: new Date(2020, 5, 6),
                    },
                    {
                        value: 60000,
                        timestamp: new Date(2020, 6, 7),
                    },
                    {
                        value: 60000,
                        timestamp: new Date(2020, 7, 1),
                    },
                    {
                        value: 42000,
                        timestamp: new Date(2020, 8, 2),
                    },
                    {
                        value: 42000,
                        timestamp: new Date(2020, 9, 3),
                    },
                    {
                        value: 42000,
                        timestamp: new Date(2020, 10, 4),
                    },
                    {
                        value: 42000,
                        timestamp: new Date(2020, 11, 5),
                    },
                    {
                        value: 34000,
                        timestamp: new Date(2021, 0, 6),
                    },
                    {
                        value: 34000,
                        timestamp: new Date(2021, 1, 7),
                    },
                ],
            },
        ],
        [
            {
                graphType: 'fact',
                graph: [
                    {
                        value: 6000,
                        timestamp: new Date(2020, 2, 1, 0),
                    },
                    {
                        value: 4500,
                        timestamp: new Date(2020, 2, 1, 0, 30),
                    },
                    {
                        value: 900,
                        timestamp: new Date(2020, 2, 1, 1),
                    },
                    {
                        value: 1300,
                        timestamp: new Date(2020, 2, 1, 1, 30),
                    },
                    {
                        value: 5800,
                        timestamp: new Date(2020, 2, 1, 2),
                    },
                    {
                        value: 4500,
                        timestamp: new Date(2020, 2, 1, 2, 30),
                    },
                    {
                        value: 6000,
                        timestamp: new Date(2020, 2, 1, 3),
                    },
                    {
                        value: 4500,
                        timestamp: new Date(2020, 2, 1, 3, 30),
                    },
                    {
                        value: 900,
                        timestamp: new Date(2020, 2, 1, 4),
                    },
                    {
                        value: 1300,
                        timestamp: new Date(2020, 2, 1, 4, 30),
                    },
                    {
                        value: 5800,
                        timestamp: new Date(2020, 2, 1, 5),
                    },
                    {
                        value: 4500,
                        timestamp: new Date(2020, 2, 1, 5, 30),
                    },
                ],
            },
            {
                graphType: 'plan',
                graph: [
                    {
                        value: 3000,
                        timestamp: new Date(2020, 2, 1, 0),
                    },
                    {
                        value: 3500,
                        timestamp: new Date(2020, 2, 1, 0, 30),
                    },
                    {
                        value: 900,
                        timestamp: new Date(2020, 2, 1, 1),
                    },
                    {
                        value: 1000,
                        timestamp: new Date(2020, 2, 1, 1, 30),
                    },
                    {
                        value: 1200,
                        timestamp: new Date(2020, 2, 1, 2),
                    },
                    {
                        value: 3000,
                        timestamp: new Date(2020, 2, 1, 2, 30),
                    },
                    {
                        value: 5000,
                        timestamp: new Date(2020, 2, 1, 3),
                    },
                    {
                        value: 4500,
                        timestamp: new Date(2020, 2, 1, 3, 30),
                    },
                    {
                        value: 6000,
                        timestamp: new Date(2020, 2, 1, 4),
                    },
                    {
                        value: 6800,
                        timestamp: new Date(2020, 2, 1, 4, 30),
                    },
                    {
                        value: 5800,
                        timestamp: new Date(2020, 2, 1, 5),
                    },
                    {
                        value: 4000,
                        timestamp: new Date(2020, 2, 1, 5, 30),
                    },
                ],
            },
        ],
    ];

    public sbWidth: number = 20;
    public sbLeft: number = 6;

    constructor() {}

    public ngOnInit(): void {
        this.graphData = this.data[0];
    }
}
