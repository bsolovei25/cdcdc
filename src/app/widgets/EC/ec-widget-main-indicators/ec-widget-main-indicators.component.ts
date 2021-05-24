import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from "@angular/core";

import { WidgetService } from "@dashboard/services/widget.service";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";

import { IAstueOnpzMainIndicatorsRaw } from "./ec-widget-main-indicators.interface";

import { BehaviorSubject, Subscription } from "rxjs";
import { VirtualChannel } from "@shared/classes/virtual-channel.class";
import { EcWidgetService } from "@widgets/EC/ec-widget-shared/ec-widget.service";


@Component({
    selector: 'evj-ec-widget-main-indicators',
    templateUrl: './ec-widget-main-indicators.component.html',
    styleUrls: ['./ec-widget-main-indicators.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcWidgetMainIndicatorsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data$: BehaviorSubject<IAstueOnpzMainIndicatorsRaw> = new BehaviorSubject<IAstueOnpzMainIndicatorsRaw>(null);

    private virtualChannel: VirtualChannel<IAstueOnpzMainIndicatorsRaw>;
    private virtualChannelSubscription: Subscription;

    constructor(
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        protected widgetService: WidgetService,
        private ecWidgetService: EcWidgetService
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.virtualChannel?.dispose();
        this.virtualChannelSubscription?.unsubscribe();
    }

    protected dataConnect(): void {
        this.subscriptions.push(
            this.ecWidgetService.selectedEnergyResource$.subscribe(energyResourceId => {
                this.data$.next(null);
                this.virtualChannel?.dispose();
                this.virtualChannelSubscription?.unsubscribe();

                this.virtualChannel = new VirtualChannel<IAstueOnpzMainIndicatorsRaw>(this.widgetService, {
                    channelId: this.widgetId,
                    subchannelId: energyResourceId
                });

                this.virtualChannelSubscription = this.virtualChannel.data$.subscribe(res => {
                    this.data$.next(res)
                })

            })
        )
    }

    protected dataHandler(): void {}
}
