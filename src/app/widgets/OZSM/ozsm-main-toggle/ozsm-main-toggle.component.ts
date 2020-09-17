import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-ozsm-main-toggle',
    templateUrl: './ozsm-main-toggle.component.html',
    styleUrls: ['./ozsm-main-toggle.component.scss']
})
export class OzsmMainToggleComponent extends WidgetPlatform implements OnInit, OnDestroy {
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
    }

    planClicked($event: MouseEvent): void {
        console.log('plan');
    }

    screenClicked($event: MouseEvent): void {
        console.log('screen');
    }
}
