import { ChangeDetectionStrategy, Component, Inject, Injector, OnDestroy, OnInit } from "@angular/core";

import { WidgetService } from "@dashboard/services/widget.service";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";
// import { EcWidgetConventionalFuelService } from "../ec-widget-conventional-fuel/astue-onpz-conventional-fuel.service";
// import { EcWidgetMainIndicatorsItemComponent } from "./components/ec-widget-main-indicators-item/ec-widget-main-indicators-item.component";

import { IAstueOnpzMainIndicatorsRaw, IChannel } from "./ec-widget-main-indicators.interface";

import { BehaviorSubject, combineLatest, Observable, Subject } from "rxjs";
import { VirtualChannel } from "@shared/classes/virtual-channel.class";
import { EcWidgetService } from "@widgets/EC/ec-widget-shared/ec-widget.service";
import { switchMap } from "rxjs/operators";


@Component({
    selector: 'evj-ec-widget-main-indicators',
    templateUrl: './ec-widget-main-indicators.component.html',
    styleUrls: ['./ec-widget-main-indicators.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcWidgetMainIndicatorsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    // public specialComponent: typeof EcWidgetMainIndicatorsItemComponent = EcWidgetMainIndicatorsItemComponent;
    public subchannelId$: BehaviorSubject<string | null>;
    // public subchannelId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    // private channels$: BehaviorSubject<IChannel[]> = new BehaviorSubject<IChannel[]>([]);
    private virtualChannel: VirtualChannel<IAstueOnpzMainIndicatorsRaw>;
    public data$: BehaviorSubject<IAstueOnpzMainIndicatorsRaw> = new BehaviorSubject<IAstueOnpzMainIndicatorsRaw>(null);

    constructor(
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        // private conventionalFuelService: EcWidgetConventionalFuelService,
        protected widgetService: WidgetService,
        // private injector: Injector,
        private astueOnpzService: EcWidgetService
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        // this.subscriptions.push(
        //     combineLatest([this.channels$, this.conventionalFuelService.selectedOptions$]).subscribe((value) => {
        //         const [channels, options] = value;
        //         const subChannelId =
        //             channels.find(
        //                 (x) =>
        //                     x.manufactureName === options.manufacture &&
        //                     x.unitName === options.unit &&
        //                     x.name === options.resource
        //             )?.id ?? null;
        //         this.subchannelId$.next(subChannelId);
        //     }),
        // );
        // this.getSubchannels().then();
        this.subchannelId$ = this.astueOnpzService.selectedEnergyResource$;
        // this.astueOnpzService.selectedEnergyResource$.subscribe(res => this.subchannelId$.next(res))
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.virtualChannel?.dispose()
    }

    // public getInjector = (widgetId: string, channelId: string): Injector => {
    //     return Injector.create({
    //         providers: [
    //             { provide: 'widgetId', useValue: widgetId },
    //             { provide: 'channelId', useValue: channelId },
    //         ],
    //         parent: this.injector,
    //     });
    // };

    protected dataConnect(): void {
        // if (this.widgetType !== 'ec-widget-main-indicators') {
        //     super.dataConnect();
        // } else {
            this.subscriptions.push(
                this.connectVirtualChannel().subscribe(res => {
                    this.data$.next(res)
                })
            )
        // }
    }

    protected dataHandler(ref: IAstueOnpzMainIndicatorsRaw): void {}

    // private async getSubchannels(): Promise<void> {
    //     const channels = await this.widgetService.getAvailableChannels<IChannel>(this.widgetId);
    //     this.channels$.next(channels);
    // }

    private connectVirtualChannel(): Observable<IAstueOnpzMainIndicatorsRaw> {
        return this.astueOnpzService.selectedEnergyResource$
            .pipe(
                switchMap((id: string): Subject<IAstueOnpzMainIndicatorsRaw> => {
                    if (!id) {
                        this.data$.next(null)
                    }

                    this.virtualChannel = new VirtualChannel<IAstueOnpzMainIndicatorsRaw>(this.widgetService, {
                        channelId: this.widgetId,
                        subchannelId: id
                    });
                    return this.virtualChannel.data$
                })
            )
    }

}
