import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { IProductionTrend } from 'src/app/dashboard/models/production-trends.model';
import { BehaviorSubject } from 'rxjs';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';

interface IUnit {
    id: number;
    name: string;
}

@Component({
    selector: 'evj-production-trend',
    templateUrl: './production-trend.component.html',
    styleUrls: ['./production-trend.component.scss'],
})
export class ProductionTrendComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

    public readonly allUnits: IUnit[] = [
        {
            id: 0,
            name: 'Всё производство',
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

    public graphData$: BehaviorSubject<IProductionTrend[]>
        = new BehaviorSubject<IProductionTrend[]>(null);

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'graph';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.graphData$.next(ref.items);
    }

    public selectUnit(event: any): void {
        console.log(event);
    }
}
