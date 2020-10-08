import { Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WidgetService } from '../../services/widget.service';

export abstract class ChannelPlatform<T, O = null> implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];

    protected constructor(
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string,
        private widgetService: WidgetService,
    ) { }

    ngOnInit(): void {
        this.subscriptions.push(
            this.widgetService.getChannelLiveDataFromWs(this.channelId, this.widgetId)
                .subscribe(this.dataHandler.bind(this)),
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions = [];
        this.widgetService.removeChannel(this.widgetId, this.channelId);
    }

    protected appendWsOptions(options: O): void {
        this.widgetService.setChannelLiveDataFromWsOptions(this.widgetId, options, this.channelId);
    }

    protected abstract dataHandler(ref: T): void;
}
