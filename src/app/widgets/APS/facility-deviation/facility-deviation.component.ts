import { Component, Inject, OnInit } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';

@Component({
    selector: 'evj-facility-deviation',
    templateUrl: './facility-deviation.component.html',
    styleUrls: ['./facility-deviation.component.scss']
})
export class FacilityDeviationComponent
    extends WidgetPlatform
    implements OnInit {

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

    protected dataHandler(ref: any): void {
    }

}
