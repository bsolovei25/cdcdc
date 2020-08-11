import { Component, OnInit } from '@angular/core';
import { IProductionTrend } from '../../../../../dashboard/models/production-trends.model';

@Component({
    selector: 'evj-astue-onpz-product-card',
    templateUrl: './astue-onpz-product-card.component.html',
    styleUrls: ['./astue-onpz-product-card.component.scss'],
})
export class AstueOnpzProductCardComponent implements OnInit {
    public data: IProductionTrend[] = [
        {
            graphType: 'plan',
            graphStyle: 'main',
            graph: [
                {
                    value: 1000,
                    timeStamp: new Date(2020, 1, 1),
                },
                {
                    value: 700,
                    timeStamp: new Date(2020, 1, 2),
                },
                {
                    value: 900,
                    timeStamp: new Date(2020, 1, 3),
                },
                {
                    value: 800,
                    timeStamp: new Date(2020, 1, 4),
                },
                {
                    value: 1200,
                    timeStamp: new Date(2020, 1, 5),
                },
                {
                    value: 1100,
                    timeStamp: new Date(2020, 1, 6),
                },
                {
                    value: 800,
                    timeStamp: new Date(2020, 1, 7),
                },
                {
                    value: 1000,
                    timeStamp: new Date(2020, 1, 8),
                },
            ],
        },
        {
            graphType: 'fact',
            graphStyle: 'main',
            graph: [
                {
                    value: 800,
                    timeStamp: new Date(2020, 1, 1),
                },
                {
                    value: 1000,
                    timeStamp: new Date(2020, 1, 2),
                },
                {
                    value: 200,
                    timeStamp: new Date(2020, 1, 3),
                },
                {
                    value: 900,
                    timeStamp: new Date(2020, 1, 4),
                },
                {
                    value: 800,
                    timeStamp: new Date(2020, 1, 5),
                },
                {
                    value: 900,
                    timeStamp: new Date(2020, 1, 6),
                },
                {
                    value: 1300,
                    timeStamp: new Date(2020, 1, 7),
                },
                {
                    value: 1200,
                    timeStamp: new Date(2020, 1, 8),
                },
            ],
        },
        {
            graphType: 'higherBorder',
            graphStyle: 'area',
            graph: [
                {
                    value: 1300,
                    timeStamp: new Date(2020, 1, 1),
                },
                {
                    value: 1400,
                    timeStamp: new Date(2020, 1, 2),
                },
                {
                    value: 1500,
                    timeStamp: new Date(2020, 1, 3),
                },
                {
                    value: 1100,
                    timeStamp: new Date(2020, 1, 4),
                },
                {
                    value: 1300,
                    timeStamp: new Date(2020, 1, 5),
                },
                {
                    value: 1400,
                    timeStamp: new Date(2020, 1, 6),
                },
                {
                    value: 1200,
                    timeStamp: new Date(2020, 1, 7),
                },
                {
                    value: 1500,
                    timeStamp: new Date(2020, 1, 8),
                },
                {
                    value: 1100,
                    timeStamp: new Date(2020, 1, 9),
                },
                {
                    value: 1500,
                    timeStamp: new Date(2020, 1, 10),
                },
                {
                    value: 1400,
                    timeStamp: new Date(2020, 1, 11),
                },
                {
                    value: 1200,
                    timeStamp: new Date(2020, 1, 12),
                },
                {
                    value: 1400,
                    timeStamp: new Date(2020, 1, 13),
                },
                {
                    value: 1100,
                    timeStamp: new Date(2020, 1, 14),
                },
                {
                    value: 1500,
                    timeStamp: new Date(2020, 1, 15),
                },
                {
                    value: 1400,
                    timeStamp: new Date(2020, 1, 16),
                },
            ],
        },
        {
            graphType: 'lowerBorder',
            graphStyle: 'area',
            graph: [
                {
                    value: 500,
                    timeStamp: new Date(2020, 1, 1),
                },
                {
                    value: 600,
                    timeStamp: new Date(2020, 1, 2),
                },
                {
                    value: 400,
                    timeStamp: new Date(2020, 1, 3),
                },
                {
                    value: 500,
                    timeStamp: new Date(2020, 1, 4),
                },
                {
                    value: 700,
                    timeStamp: new Date(2020, 1, 5),
                },
                {
                    value: 400,
                    timeStamp: new Date(2020, 1, 6),
                },
                {
                    value: 500,
                    timeStamp: new Date(2020, 1, 7),
                },
                {
                    value: 800,
                    timeStamp: new Date(2020, 1, 8),
                },
                {
                    value: 500,
                    timeStamp: new Date(2020, 1, 9),
                },
                {
                    value: 500,
                    timeStamp: new Date(2020, 1, 10),
                },
                {
                    value: 400,
                    timeStamp: new Date(2020, 1, 11),
                },
                {
                    value: 700,
                    timeStamp: new Date(2020, 1, 12),
                },
                {
                    value: 500,
                    timeStamp: new Date(2020, 1, 13),
                },
                {
                    value: 600,
                    timeStamp: new Date(2020, 1, 14),
                },
                {
                    value: 300,
                    timeStamp: new Date(2020, 1, 15),
                },
                {
                    value: 500,
                    timeStamp: new Date(2020, 1, 16),
                },
            ],
        },
    ];

    constructor() {}

    ngOnInit(): void {}
}
