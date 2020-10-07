import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { IProductionPyramid } from '../../../dashboard/models/production-pyramid';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-production-pyramid',
    templateUrl: './production-pyramid.component.html',
    styleUrls: ['./production-pyramid.component.scss'],
})
export class ProductionPyramidComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
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
