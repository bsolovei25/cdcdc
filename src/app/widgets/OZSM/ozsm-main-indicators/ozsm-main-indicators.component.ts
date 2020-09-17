import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { IOZSMMainIndicator } from '../../../dashboard/models/OZSM/ozsm-main-indicator.model';
import { mockData } from './ozsm-main-indicator-mock';

@Component({
  selector: 'evj-ozsm-main-indicators',
  templateUrl: './ozsm-main-indicators.component.html',
  styleUrls: ['./ozsm-main-indicators.component.scss']
})
export class OzsmMainIndicatorsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public data: IOZSMMainIndicator[] = mockData;

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
}
