import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { Subscription } from 'rxjs';
import { IProductionPyramid } from '../../models/production-pyramid';
import { WidgetPlatform } from '../../models/widget-platform';

@Component({
    selector: 'evj-production-pyramid',
    templateUrl: './production-pyramid.component.html',
    styleUrls: ['./production-pyramid.component.scss'],
})
export class ProductionPyramidComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public array: IProductionPyramid[] = [
        {
            cardTitle: 'Без пожара',
            daysCounter: 615,
        },
        {
            cardTitle: 'Без аварии',
            daysCounter: 435,
        },
        {
            cardTitle: 'Без несчастных случаев',
            daysCounter: 1234,
        },
    ];

    public static itemCols: number = 35;
    public static itemRows: number = 16;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        // this.data = ref.chartItems;
    }
}
