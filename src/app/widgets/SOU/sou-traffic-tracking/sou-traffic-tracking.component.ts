import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';

@Component({
    selector: 'evj-sou-traffic-tracking',
    templateUrl: './sou-traffic-tracking.component.html',
    styleUrls: ['./sou-traffic-tracking.component.scss'],
})
export class SouTrafficTrackingComponent extends WidgetPlatform implements OnInit {

    public buttons: {id: number, text: string}[] = [
        {id: 1, text: '1'},
        {id: 2, text: '2'},
        {id: 3, text: '3'},
        {id: 4, text: '4'},
    ];
    public selectedButtonId: number = 1;

    constructor(
        protected widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    public selectButton(id: number): void {
        this.selectedButtonId = id;
    }

    protected dataHandler(ref: unknown): void {}
}
