import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../models/@PLATFORM/widget-platform';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'evj-cd-critical',
  templateUrl: './cd-critical.component.html',
  styleUrls: ['./cd-critical.component.scss']
})
export class CdCriticalComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

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
