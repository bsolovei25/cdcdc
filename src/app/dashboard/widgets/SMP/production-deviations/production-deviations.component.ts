import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../models/widget-platform';
import { WidgetService } from '../../../services/widget.service';
import { IProductionDeviationsGraph } from '../../../models/SMP/production-deviations.model';

@Component({
    selector: 'evj-production-deviations',
    templateUrl: './production-deviations.component.html',
    styleUrls: ['./production-deviations.component.scss'],
})
export class ProductionDeviationsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public data: IProductionDeviationsGraph[] = [
        {
            graphType: 'baseline',
            limits: {
                upValue: 120,
                upType: 'danger',
                downValue: 60,
                downType: 'danger',
            },
            columns: [
                {
                    date: new Date(2020, 2, 1),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 2, 2),
                    maxValue: 200,
                    fact: 30,
                    plan: 80,
                },
                {
                    date: new Date(2020, 2, 3),
                    maxValue: 200,
                    fact: 50,
                    plan: 80,
                },
                {
                    date: new Date(2020, 2, 4),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 2, 5),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
            ],
        },
        {
            graphType: 'normal',
            limits: {
                upValue: 120,
                upType: 'danger',
            },
            columns: [
                {
                    date: new Date(2020, 2, 1),
                    maxValue: 200,
                    fact: 49,
                    plan: 70,
                },
                {
                    date: new Date(2020, 2, 2),
                    maxValue: 200,
                    fact: 30,
                    plan: 100,
                },
                {
                    date: new Date(2020, 2, 3),
                    maxValue: 200,
                    fact: 50,
                    plan: 40,
                },
                {
                    date: new Date(2020, 2, 4),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 2, 5),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
            ],
        },
    ];

    public static itemCols: number = 50;
    public static itemRows: number = 27;
    public static minItemCols: number = 50;
    public static minItemRows: number = 27;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}
