import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Injector,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import { EcWidgetService } from '../ec-widget-shared/ec-widget.service';
import { EcWidgetConventionalFuelService } from '../ec-widget-conventional-fuel/ec-widget-conventional-fuel.service';
import { EcWidgetPredictorsItemComponent } from './components/ec-widget-predictors-item/ec-widget-predictors-item.component';
import { BehaviorSubject, Subscription } from "rxjs"
import { VirtualChannel } from "@shared/classes/virtual-channel.class";
import { IAstueOnpzFactoryAnalysisBarResponse } from "@dashboard/models/ASTUE-ONPZ/astue-onpz-factory-analysis.model";
import { astueOnpzFactoryAnalysisBarMapper } from "@widgets/EC/ec-widget-factor-analysis/functions/ec-widget-factor-analysis.function";

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

// interface IChannel {
//     name: string;
//     manufactureName: string;
//     unitName: string;
//     id: string;
// }

@Component({
    selector: 'evj-ec-widget-predictors',
    templateUrl: './ec-widget-predictors.component.html',
    styleUrls: ['./ec-widget-predictors.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EcWidgetPredictorsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public specialComponent: typeof EcWidgetPredictorsItemComponent = EcWidgetPredictorsItemComponent;
    // public subchannelId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    // public subchannelId$: BehaviorSubject<string | null>;
    // public channels$: BehaviorSubject<IChannel[]> = new BehaviorSubject<IChannel[]>([]);

    private virtualChannel: VirtualChannel<IPredictorsResponse>;
    public data$: BehaviorSubject<IPredictorsResponse> = new BehaviorSubject<IPredictorsResponse>(null);
    private needUpdateData: boolean;
    private virtualChannelSubscription: Subscription;

    constructor(
        private conventionalFuelService: EcWidgetConventionalFuelService,
        protected widgetService: WidgetService,
        private astueOnpzService: EcWidgetService,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        // private injector: Injector,
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        // this.conventionalFuelService.predictorsId$.next(this.id);
        // this.optionsHandler().then();
        // this.subchannelId$ = this.astueOnpzService.selectedEnergyResource$;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.astueOnpzService.clearColors();
        this.virtualChannel?.dispose();
        this.virtualChannelSubscription?.unsubscribe();
    }

    protected dataConnect(): void {
        // super.dataConnect();
        // this.setOptionsWs(this.id);
        //
        // this.subscriptions.push(
        //     combineLatest([this.channels$, this.conventionalFuelService.selectedOptions$]).subscribe((value) => {
        //         this.astueOnpzService.setPredictors(this.id, []);
        //         const [channels, options] = value;
        //
        //         const subChannel =
        //             channels.find(
        //                 (x) =>
        //                     x.name === options.resource &&
        //                     x.manufactureName === options.manufacture &&
        //                     x.unitName === options.unit
        //             )?.id ?? null;
        //
        //         if (!subChannel) {
        //             this.astueOnpzService.setPredictors(this.id, []);
        //         }
        //
        //         // this.subchannelId$.next(subChannel);
        //     })
        // );

        this.subscriptions.push(
            this.astueOnpzService.selectedEnergyResource$.subscribe(energyResourceId => {
                this.data$.next(null);
                this.virtualChannel?.dispose();
                this.virtualChannelSubscription?.unsubscribe();
                this.astueOnpzService.clearColors();
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

    // setOptionsWs(predictorWidgetId: string): void {
    //     this.astueOnpzService.setPredictors(predictorWidgetId, []);
    // }

    protected dataHandler(ref: { predictors: IPredictors[] }): void {}

    // private async optionsHandler(): Promise<void> {
    //     const channels = await this.widgetService.getAvailableChannels<IChannel>(this.widgetId);
    //     this.channels$.next(channels);
    // }

    // public getInjector = (widgetId: string, channelId: string): Injector => {
    //     return Injector.create({
    //         providers: [
    //             { provide: 'widgetId', useValue: widgetId },
    //             { provide: 'channelId', useValue: channelId },
    //         ],
    //         parent: this.injector,
    //     });
    // };
}
