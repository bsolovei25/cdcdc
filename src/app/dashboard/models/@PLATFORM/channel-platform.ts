import { Directive, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { WidgetService } from '../../services/widget.service';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ChannelPlatform<T, O = null> implements OnInit, OnDestroy {
    public subscriptions: Subscription[] = [];
    wsSubscription: Subscription = null;

    protected constructor(
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string,
        protected widgetService: WidgetService
    ) {}

    ngOnInit(): void {
        if (!this.widgetId || !this.channelId) {
            return;
        }
        this.connectWs();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
        this.subscriptions = [];
        this.disconnectWs();
    }

    protected appendWsOptions(options: O): void {
        this.widgetService.setChannelLiveDataFromWsOptions(this.widgetId, options, this.channelId);
    }

    protected abstract dataHandler(ref: T): void;

    protected connectWs(
        channelId: string = this.channelId,
        widgetId: string = this.widgetId
    ): void {
        this.channelId = this.channelId !== channelId ? channelId : this.channelId;
        this.wsSubscription = this.widgetService
            .getChannelLiveDataFromWs(channelId, widgetId)
            .subscribe(this.dataHandler.bind(this));
    }

    protected disconnectWs(): void {
        if (!this.wsSubscription) {
            return;
        }
        this.wsSubscription.unsubscribe();
        this.widgetService.removeChannel(this.widgetId, this.channelId);
    }
}
