import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';

@Component({
    selector: 'evj-facility-deviation',
    templateUrl: './facility-deviation.component.html',
    styleUrls: ['./facility-deviation.component.scss'],
})
export class FacilityDeviationComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
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

    protected dataHandler(ref: any): void {}
}
