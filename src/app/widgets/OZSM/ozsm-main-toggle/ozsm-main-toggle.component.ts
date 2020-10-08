import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-ozsm-main-toggle',
    templateUrl: './ozsm-main-toggle.component.html',
    styleUrls: ['./ozsm-main-toggle.component.scss']
})
export class OzsmMainToggleComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public getPlan: any = document.getElementsByClassName('button plan');
    public getScreen: any = document.getElementsByClassName('button plan');

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

    clicked($event: MouseEvent, type: string): void {
        console.log(`type ${type}`);
    }
}
