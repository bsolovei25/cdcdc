import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../models/widget-platform';
import { WidgetService } from '../../services/widget.service';

interface IUnit {
    id: number;
    name: string;
}

@Component({
  selector: 'evj-production-trend',
  templateUrl: './production-trend.component.html',
  styleUrls: ['./production-trend.component.scss']
})
export class ProductionTrendComponent extends WidgetPlatform implements OnInit, OnDestroy {
// export class ProductionTrendComponent {

    public static itemCols: number = 20;
    public static itemRows: number = 16;

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
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
    }

    public selectUnit(event: any): void {
        console.log(event);
    }
}
