import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-astue-onpz-deviation-cards',
    templateUrl: './astue-onpz-deviation-cards.component.html',
    styleUrls: ['./astue-onpz-deviation-cards.component.scss']
})
export class AstueOnpzDeviationCardsComponent extends WidgetPlatform implements OnInit {

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {
    }

}
