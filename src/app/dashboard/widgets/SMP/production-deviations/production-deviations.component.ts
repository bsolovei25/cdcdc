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
            graphTitle: 'Отклонения по выработке',
            graphUnits: 'тыс. т.',
            limits: {
                upValue: 120,
                upType: 'danger',
                downValue: 60,
                downType: 'danger',
            },
            columns: [
                {
                    date: new Date(2020, 4, 1),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 2),
                    maxValue: 200,
                    fact: 30,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 3),
                    maxValue: 200,
                    fact: 50,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 4),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 5),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 6),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 7),
                    maxValue: 200,
                    fact: 30,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 8),
                    maxValue: 200,
                    fact: 50,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 9),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 10),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 11),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 12),
                    maxValue: 200,
                    fact: 30,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 13),
                    maxValue: 200,
                    fact: 50,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 14),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 15),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 16),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 17),
                    maxValue: 200,
                    fact: 30,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 18),
                    maxValue: 200,
                    fact: 50,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 19),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 20),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 21),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 22),
                    maxValue: 200,
                    fact: 30,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 23),
                    maxValue: 200,
                    fact: 50,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 24),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 25),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 26),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 27),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 28),
                    maxValue: 200,
                    fact: 30,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 29),
                    maxValue: 200,
                    fact: 50,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 30),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 31),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
            ],
        },
        {
            graphType: 'normal',
            graphTitle: 'Отклонения по паспортизации',
            graphUnits: 'тыс. т.',
            limits: {
                upValue: 105,
                upType: 'warning',
            },
            columns: [
                {
                    date: new Date(2020, 4, 1),
                    maxValue: 200,
                    fact: 49,
                    plan: 70,
                },
                {
                    date: new Date(2020, 4, 2),
                    maxValue: 200,
                    fact: 30,
                    plan: 100,
                },
                {
                    date: new Date(2020, 4, 3),
                    maxValue: 200,
                    fact: 50,
                    plan: 40,
                },
                {
                    date: new Date(2020, 4, 4),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 5),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 6),
                    maxValue: 200,
                    fact: 49,
                    plan: 70,
                },
                {
                    date: new Date(2020, 4, 7),
                    maxValue: 200,
                    fact: 30,
                    plan: 100,
                },
                {
                    date: new Date(2020, 4, 8),
                    maxValue: 200,
                    fact: 50,
                    plan: 40,
                },
                {
                    date: new Date(2020, 4, 9),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 10),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 11),
                    maxValue: 200,
                    fact: 49,
                    plan: 70,
                },
                {
                    date: new Date(2020, 4, 12),
                    maxValue: 200,
                    fact: 30,
                    plan: 100,
                },
                {
                    date: new Date(2020, 4, 13),
                    maxValue: 200,
                    fact: 50,
                    plan: 40,
                },
                {
                    date: new Date(2020, 4, 14),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 15),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 16),
                    maxValue: 200,
                    fact: 49,
                    plan: 70,
                },
                {
                    date: new Date(2020, 4, 17),
                    maxValue: 200,
                    fact: 30,
                    plan: 100,
                },
                {
                    date: new Date(2020, 4, 18),
                    maxValue: 200,
                    fact: 50,
                    plan: 40,
                },
                {
                    date: new Date(2020, 4, 19),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 20),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 21),
                    maxValue: 200,
                    fact: 49,
                    plan: 70,
                },
                {
                    date: new Date(2020, 4, 22),
                    maxValue: 200,
                    fact: 30,
                    plan: 100,
                },
                {
                    date: new Date(2020, 4, 23),
                    maxValue: 200,
                    fact: 50,
                    plan: 40,
                },
                {
                    date: new Date(2020, 4, 24),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 25),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 26),
                    maxValue: 200,
                    fact: 49,
                    plan: 70,
                },
                {
                    date: new Date(2020, 4, 27),
                    maxValue: 200,
                    fact: 30,
                    plan: 100,
                },
                {
                    date: new Date(2020, 4, 28),
                    maxValue: 200,
                    fact: 50,
                    plan: 40,
                },
                {
                    date: new Date(2020, 4, 29),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 30),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 31),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
            ],
        },
        {
            graphType: 'baseline',
            graphTitle: 'Отклонения по отгрузке',
            graphUnits: 'тыс. т.',
            limits: {
                upValue: 120,
                upType: 'danger',
                downValue: 60,
                downType: 'danger',
            },
            columns: [
                {
                    date: new Date(2020, 4, 1),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 2),
                    maxValue: 200,
                    fact: 30,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 3),
                    maxValue: 200,
                    fact: 50,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 4),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 5),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 6),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 7),
                    maxValue: 200,
                    fact: 30,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 8),
                    maxValue: 200,
                    fact: 50,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 9),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 10),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 11),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 12),
                    maxValue: 200,
                    fact: 30,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 13),
                    maxValue: 200,
                    fact: 50,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 14),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 15),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 16),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 17),
                    maxValue: 200,
                    fact: 30,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 18),
                    maxValue: 200,
                    fact: 50,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 19),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 20),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 21),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 22),
                    maxValue: 200,
                    fact: 30,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 23),
                    maxValue: 200,
                    fact: 50,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 24),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 25),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 26),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 27),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 28),
                    maxValue: 200,
                    fact: 30,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 29),
                    maxValue: 200,
                    fact: 50,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 30),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 31),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
            ],
        },
        {
            graphType: 'normal',
            graphTitle: 'Состояние резервуарного парка',
            graphUnits: 'тыс. т.',
            limits: {
                upValue: 105,
                upType: 'warning',
            },
            columns: [
                {
                    date: new Date(2020, 4, 1),
                    maxValue: 200,
                    fact: 49,
                    plan: 70,
                },
                {
                    date: new Date(2020, 4, 2),
                    maxValue: 200,
                    fact: 30,
                    plan: 100,
                },
                {
                    date: new Date(2020, 4, 3),
                    maxValue: 200,
                    fact: 50,
                    plan: 40,
                },
                {
                    date: new Date(2020, 4, 4),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 5),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 6),
                    maxValue: 200,
                    fact: 49,
                    plan: 70,
                },
                {
                    date: new Date(2020, 4, 7),
                    maxValue: 200,
                    fact: 30,
                    plan: 100,
                },
                {
                    date: new Date(2020, 4, 8),
                    maxValue: 200,
                    fact: 50,
                    plan: 40,
                },
                {
                    date: new Date(2020, 4, 9),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 10),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 11),
                    maxValue: 200,
                    fact: 49,
                    plan: 70,
                },
                {
                    date: new Date(2020, 4, 12),
                    maxValue: 200,
                    fact: 30,
                    plan: 100,
                },
                {
                    date: new Date(2020, 4, 13),
                    maxValue: 200,
                    fact: 50,
                    plan: 40,
                },
                {
                    date: new Date(2020, 4, 14),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 15),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 16),
                    maxValue: 200,
                    fact: 49,
                    plan: 70,
                },
                {
                    date: new Date(2020, 4, 17),
                    maxValue: 200,
                    fact: 30,
                    plan: 100,
                },
                {
                    date: new Date(2020, 4, 18),
                    maxValue: 200,
                    fact: 50,
                    plan: 40,
                },
                {
                    date: new Date(2020, 4, 19),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 20),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 21),
                    maxValue: 200,
                    fact: 49,
                    plan: 70,
                },
                {
                    date: new Date(2020, 4, 22),
                    maxValue: 200,
                    fact: 30,
                    plan: 100,
                },
                {
                    date: new Date(2020, 4, 23),
                    maxValue: 200,
                    fact: 50,
                    plan: 40,
                },
                {
                    date: new Date(2020, 4, 24),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 25),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 26),
                    maxValue: 200,
                    fact: 49,
                    plan: 70,
                },
                {
                    date: new Date(2020, 4, 27),
                    maxValue: 200,
                    fact: 30,
                    plan: 100,
                },
                {
                    date: new Date(2020, 4, 28),
                    maxValue: 200,
                    fact: 50,
                    plan: 40,
                },
                {
                    date: new Date(2020, 4, 29),
                    maxValue: 200,
                    fact: 160,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 30),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
                {
                    date: new Date(2020, 4, 31),
                    maxValue: 200,
                    fact: 130,
                    plan: 80,
                },
            ],
        },
    ];

    public static itemCols: number = 35;
    public static itemRows: number = 27;
    public static minItemCols: number = 35;
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
