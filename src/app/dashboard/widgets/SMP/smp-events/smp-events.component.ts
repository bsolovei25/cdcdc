import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';
import { WidgetPlatform } from '../../../models/widget-platform';

@Component({
  selector: 'evj-smp-events',
  templateUrl: './smp-events.component.html',
  styleUrls: ['./smp-events.component.scss']
})
export class SmpEventsComponent extends WidgetPlatform implements OnInit, OnDestroy {

    static itemCols = 14;
    static itemRows = 20;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
    }
}