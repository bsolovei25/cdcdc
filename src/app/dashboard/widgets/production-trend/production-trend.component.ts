import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../models/widget-platform';
import { WidgetService } from '../../services/widget.service';
import { IProductionTrend } from '../../models/production-trends.model';

interface IUnit {
    id: number;
    name: string;
}

@Component({
    selector: 'evj-production-trend',
    templateUrl: './production-trend.component.html',
    styleUrls: ['./production-trend.component.scss'],
})
export class ProductionTrendComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public static itemCols: number = 16;
    public static itemRows: number = 14;

    public static minItemCols: number = 16;
    public static minItemRows: number = 14;


    public readonly allUnits: IUnit[] = [
        {
            id: 0,
            name: 'Все производство',
        },
        {
            id: 1,
            name: 'АВТ-6',
        },
        {
            id: 2,
            name: 'ГФУ-2',
        },
    ];

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
        this.widgetIcon = 'graph';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void { }

    public selectUnit(event: any): void {
        console.log(event);
    }
}
