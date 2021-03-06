import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';

interface IAstueOnpzDeviationCards {
    dropdownOne: string[];
    dropdownTwo: string[];
    dropdownThree: string[];
    title: string;
    unit: {name: string};
    text: string;
    status: {
        description: string;
        id: number;
        name: string;
        code: string;
    };
    category?: {description: string};
    eventDateTime?: string;
}

@Component({
    selector: 'evj-astue-onpz-deviation-cards',
    templateUrl: './astue-onpz-deviation-cards.component.html',
    styleUrls: ['./astue-onpz-deviation-cards.component.scss'],
})
export class AstueOnpzDeviationCardsComponent extends WidgetPlatform<unknown> implements OnInit {
    data: IAstueOnpzDeviationCards[] = [];

    constructor(
        public widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: {notification: {notifications: IAstueOnpzDeviationCards[]}}): void {
        this.data = ref.notification.notifications;
    }
}
