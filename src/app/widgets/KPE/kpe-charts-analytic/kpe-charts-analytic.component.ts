import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-kpe-charts-analytic',
    templateUrl: './kpe-charts-analytic.component.html',
    styleUrls: ['./kpe-charts-analytic.component.scss'],
})
export class KpeChartsAnalyticComponent extends WidgetPlatform implements OnInit, OnDestroy {
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

    protected dataHandler(ref: unknown): void {}
}
