import { ChangeDetectionStrategy, Component, Inject, Injector, OnDestroy, OnInit } from "@angular/core";

import { WidgetService } from "@dashboard/services/widget.service";
import { WidgetPlatform } from "@dashboard/models/@PLATFORM/widget-platform";
import { AstueOnpzConventionalFuelService } from "../astue-onpz-conventional-fuel/astue-onpz-conventional-fuel.service";
import { AstueOnpzMainIndicatorsItemComponent } from "./components/astue-onpz-main-indicators-item/astue-onpz-main-indicators-item.component";

import { IAstueOnpzMainIndicatorsRaw, IChannel } from "./astue-onpz-main-indicators.interface";

import { BehaviorSubject, combineLatest } from "rxjs";

@Component({
    selector: 'evj-astue-onpz-main-indicators',
    templateUrl: './astue-onpz-main-indicators.component.html',
    styleUrls: ['./astue-onpz-main-indicators.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstueOnpzMainIndicatorsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public specialComponent: typeof AstueOnpzMainIndicatorsItemComponent = AstueOnpzMainIndicatorsItemComponent;
    public subchannelId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    private channels$: BehaviorSubject<IChannel[]> = new BehaviorSubject<IChannel[]>([]);

    constructor(
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private conventionalFuelService: AstueOnpzConventionalFuelService,
        protected widgetService: WidgetService,
        private injector: Injector
    ) {
        super(widgetService, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            combineLatest([this.channels$, this.conventionalFuelService.selectedOptions$]).subscribe((value) => {
                const [channels, options] = value;
                const subChannelId =
                    channels.find(
                        (x) =>
                            x.manufactureName === options.manufacture &&
                            x.unitName === options.unit &&
                            x.name === options.resource
                    )?.id ?? null;
                this.subchannelId$.next(subChannelId);
            }),
        );
        this.getSubchannels().then();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public getInjector = (widgetId: string, channelId: string): Injector => {
        return Injector.create({
            providers: [
                { provide: 'widgetId', useValue: widgetId },
                { provide: 'channelId', useValue: channelId },
            ],
            parent: this.injector,
        });
    };

    protected dataConnect(): void {
        super.dataConnect();
    }

    protected dataHandler(ref: IAstueOnpzMainIndicatorsRaw): void {}

    private async getSubchannels(): Promise<void> {
        const channels = await this.widgetService.getAvailableChannels<IChannel>(this.widgetId);
        this.channels$.next(channels);
    }

}
