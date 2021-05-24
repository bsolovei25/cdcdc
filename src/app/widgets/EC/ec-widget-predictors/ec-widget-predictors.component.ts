import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { EcWidgetService } from '../ec-widget-shared/ec-widget.service';
import { EcWidgetConventionalFuelService } from '../ec-widget-conventional-fuel/ec-widget-conventional-fuel.service';
import { BehaviorSubject, Subscription } from "rxjs"
import { VirtualChannel } from "@shared/classes/virtual-channel.class";

export interface IPredictors {
    isHidden: boolean;
    id: string;
    name: string;
    label: string;
    colorIndex: number;
    isActive?: boolean;
    tag: string;
    unitId: number;
    unitName: string;
    isFiltered?: boolean;
}
export interface IPredictorsGroup {
    id: string;
    name: string;
    isExpanded?: boolean;
    isFiltered?: boolean;
    predictors: IPredictors[];
}

export interface IPredictorsResponse {
    predictorsGroups: IPredictorsGroup[]
    predictors: IPredictors[]
}

@Component({
    selector: 'evj-ec-widget-predictors',
    templateUrl: './ec-widget-predictors.component.html',
    styleUrls: ['./ec-widget-predictors.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcWidgetPredictorsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data$: BehaviorSubject<IPredictorsResponse> = new BehaviorSubject<IPredictorsResponse>(null);

    private virtualChannel: VirtualChannel<IPredictorsResponse>;
    private needUpdateData: boolean;
    private virtualChannelSubscription: Subscription;

    constructor(
        private conventionalFuelService: EcWidgetConventionalFuelService,
        protected widgetService: WidgetService,
        private ecWidgetService: EcWidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.ecWidgetService.clearColors();
        this.virtualChannel?.dispose();
        this.virtualChannelSubscription?.unsubscribe();
    }

    protected dataConnect(): void {
        this.subscriptions.push(
            this.ecWidgetService.selectedEnergyResource$.subscribe(energyResourceId => {
                this.data$.next(null);
                this.virtualChannel?.dispose();
                this.virtualChannelSubscription?.unsubscribe();
                this.ecWidgetService.clearColors();
                this.needUpdateData = true;

                this.virtualChannel = new VirtualChannel<IPredictorsResponse>(this.widgetService, {
                    channelId: this.widgetId,
                    subchannelId: energyResourceId
                });

                this.virtualChannelSubscription = this.virtualChannel.data$.subscribe(res => {
                    if (this.needUpdateData) {
                        this.data$.next(res);
                        this.needUpdateData = false;
                    }
                })

            })
        )
    }

    protected dataHandler(): void {}
}
