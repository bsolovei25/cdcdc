import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-cd-deviation-mat',
    templateUrl: './cd-deviation-mat.component.html',
    styleUrls: ['./cd-deviation-mat.component.scss']
})
export class CdDeviationMatComponent extends WidgetPlatform implements OnInit, OnDestroy {

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
    }

    protected async dataConnect(): Promise<void> {
        super.dataConnect();
    }

    protected dataHandler(
        ref: any
    ): void {
    }



}
