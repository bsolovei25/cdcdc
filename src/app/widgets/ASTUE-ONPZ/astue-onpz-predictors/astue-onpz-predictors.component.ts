import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    Injector,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';
import {
    AstueOnpzConventionalFuelService,
    IAstueOnpzConventionalFuelSelectOptions,
} from '../astue-onpz-conventional-fuel/astue-onpz-conventional-fuel.service';
import { AstueOnpzPredictorsItemComponent } from './components/astue-onpz-predictors-item/astue-onpz-predictors-item.component';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

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
}

@Component({
    selector: 'evj-astue-onpz-predictors',
    templateUrl: './astue-onpz-predictors.component.html',
    styleUrls: ['./astue-onpz-predictors.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AstueOnpzPredictorsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public specialComponent: typeof AstueOnpzPredictorsItemComponent = AstueOnpzPredictorsItemComponent;
    public subchannelId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public channels$: BehaviorSubject<
        {
            name: string;
            id: string;
        }[]
    > = new BehaviorSubject<{ name: string; id: string }[]>([]);

    constructor(
        private conventionalFuelService: AstueOnpzConventionalFuelService,
        protected widgetService: WidgetService,
        private astueOnpzService: AstueOnpzService,
        private cdRef: ChangeDetectorRef,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private injector: Injector
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.conventionalFuelService.predictorsId$.next(this.id);
        this.optionsHandler().then();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.astueOnpzService.clearColors();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.setOptionsWs(this.id);

        this.subscriptions.push(
            combineLatest([this.channels$, this.conventionalFuelService.selectedOptions$]).subscribe((value) => {
                this.astueOnpzService.setPredictors(this.id, []);
                const [channels, options] = value;

                const subChannel = channels.find((x) => x.name === options.resource)?.id ?? null;
                this.subchannelId$.next(subChannel);
            })
        );
    }

    setOptionsWs(predictorWidgetId: string): void {
        this.astueOnpzService.setPredictors(predictorWidgetId, []);
    }

    protected dataHandler(ref: { predictors: IPredictors[] }): void {}

    private async optionsHandler(): Promise<void> {
        const channels = await this.widgetService.getAvailableChannels<{
            name: string;
            id: string;
        }>(this.widgetId);

        this.channels$.next(channels);
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
}
