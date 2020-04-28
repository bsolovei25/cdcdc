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
            deviationUp: 300,
            deviationDown: 300,
        },
    ];

    public sbWidth: number = 20;
    public sbLeft: number = 6;

    constructor() {}

    public ngOnInit(): void {}
}
