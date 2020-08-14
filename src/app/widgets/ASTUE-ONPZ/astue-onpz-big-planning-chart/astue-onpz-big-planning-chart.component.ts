import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-astue-onpz-big-planning-chart',
    templateUrl: './astue-onpz-big-planning-chart.component.html',
    styleUrls: ['./astue-onpz-big-planning-chart.component.scss'],
})
export class AstueOnpzBigPlanningChartComponent extends WidgetPlatform
    implements OnInit, OnDestroy {
    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {}

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}
