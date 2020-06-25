import { Component, OnInit, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-load-chart',
    templateUrl: './load-chart.component.html',
    styleUrls: ['./load-chart.component.scss'],
})
export class LoadChartComponent extends WidgetPlatform implements OnInit {
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

    protected dataHandler(ref: any): void {}

    public onClick(): void {
        console.log('click');
    }
}
