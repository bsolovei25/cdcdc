import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';

interface IAstueOnpzMainIndicators {
    name: string;
    value: number;
}

@Component({
    selector: 'evj-astue-onpz-main-indicators',
    templateUrl: './astue-onpz-main-indicators.component.html',
    styleUrls: ['./astue-onpz-main-indicators.component.scss']
})
export class AstueOnpzMainIndicatorsComponent extends WidgetPlatform implements OnInit, OnDestroy {

    data: IAstueOnpzMainIndicators[] = [
        {
            name: 'Факт',
            value: 1100
        },
        {
            name: 'План',
            value: 1100
        },
        {
            name: 'Факт',
            value: 1100
        },
        {
            name: 'Факт',
            value: 1100
        },
        {
            name: 'План',
            value: 1100
        },
        {
            name: 'Факт',
            value: 1100
        }
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
