import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IMultiChartLine } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';

@Component({
    selector: 'evj-astue-onpz-conventional-fuel',
    templateUrl: './astue-onpz-conventional-fuel.component.html',
    styleUrls: ['./astue-onpz-conventional-fuel.component.scss'],
})
export class AstueOnpzConventionalFuelComponent extends WidgetPlatform
    implements OnInit, OnDestroy {
    public data: IMultiChartLine[] = [
        {
            graphType: 'plan',
            graph: [
                {
                    value: 1000,
                    timeStamp: new Date(2020, 1, 1, 0),
                },
                {
                    value: 800,
                    timeStamp: new Date(2020, 1, 1, 1),
                },
                {
                    value: 1200,
                    timeStamp: new Date(2020, 1, 1, 2),
                },
                {
                    value: 1400,
                    timeStamp: new Date(2020, 1, 1, 3),
                },
                {
                    value: 900,
                    timeStamp: new Date(2020, 1, 1, 4),
                },
                {
                    value: 1200,
                    timeStamp: new Date(2020, 1, 1, 5),
                },
                {
                    value: 1300,
                    timeStamp: new Date(2020, 1, 1, 6),
                },
                {
                    value: 600,
                    timeStamp: new Date(2020, 1, 1, 7),
                },
            ],
        },
        {
            graphType: 'fact',
            graph: [
                {
                    value: 700,
                    timeStamp: new Date(2020, 1, 1, 0),
                },
                {
                    value: 900,
                    timeStamp: new Date(2020, 1, 1, 1),
                },
                {
                    value: 1500,
                    timeStamp: new Date(2020, 1, 1, 2),
                },
                {
                    value: 1100,
                    timeStamp: new Date(2020, 1, 1, 3),
                },
                {
                    value: 1200,
                    timeStamp: new Date(2020, 1, 1, 4),
                },
                {
                    value: 800,
                    timeStamp: new Date(2020, 1, 1, 5),
                },
                {
                    value: 700,
                    timeStamp: new Date(2020, 1, 1, 6),
                },
                {
                    value: 900,
                    timeStamp: new Date(2020, 1, 1, 7),
                },
            ],
        },
        {
            graphType: 'temperature',
            units: 'oC',
            graph: [
                {
                    value: 1100,
                    timeStamp: new Date(2020, 1, 1, 0),
                },
                {
                    value: 1440,
                    timeStamp: new Date(2020, 1, 1, 1),
                },
                {
                    value: 1300,
                    timeStamp: new Date(2020, 1, 1, 2),
                },
                {
                    value: 600,
                    timeStamp: new Date(2020, 1, 1, 3),
                },
                {
                    value: 1100,
                    timeStamp: new Date(2020, 1, 1, 4),
                },
                {
                    value: 900,
                    timeStamp: new Date(2020, 1, 1, 5),
                },
                {
                    value: 800,
                    timeStamp: new Date(2020, 1, 1, 6),
                },
                {
                    value: 1300,
                    timeStamp: new Date(2020, 1, 1, 7),
                },
            ],
        },
        {
            graphType: 'heatExchanger',
            units: 'Па',
            graph: [
                {
                    value: 500,
                    timeStamp: new Date(2020, 1, 1, 0),
                },
                {
                    value: 440,
                    timeStamp: new Date(2020, 1, 1, 1),
                },
                {
                    value: 700,
                    timeStamp: new Date(2020, 1, 1, 2),
                },
                {
                    value: 600,
                    timeStamp: new Date(2020, 1, 1, 3),
                },
                {
                    value: 800,
                    timeStamp: new Date(2020, 1, 1, 4),
                },
                {
                    value: 700,
                    timeStamp: new Date(2020, 1, 1, 5),
                },
                {
                    value: 1000,
                    timeStamp: new Date(2020, 1, 1, 6),
                },
                {
                    value: 900,
                    timeStamp: new Date(2020, 1, 1, 7),
                },
            ],
        },
    ];

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {}

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}
