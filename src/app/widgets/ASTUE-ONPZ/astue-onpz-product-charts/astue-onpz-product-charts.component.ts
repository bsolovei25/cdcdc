import { Component, OnInit, Inject, OnDestroy, Injector } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IProductionTrend } from '../../../dashboard/models/LCO/production-trends.model';
import { AstueOnpzService, IAstueOnpzMonitoringOptions } from '../astue-onpz-shared/astue-onpz.service';
import { AstueOnpzProductCardComponent } from './components/astue-onpz-product-card/astue-onpz-product-card.component';
import { AstueOnpzHeaderIcon } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-header-icon.model';
import { BehaviorSubject } from 'rxjs';

export interface IAstueProductChart {
    productName: string;
    unitName: string;
    iconType: AstueOnpzHeaderIcon;
    itemId: string;
    units: string;
    isEconomy: boolean;
    labels: {
        text: string;
        value: number;
        type: AstueProductChartType;
    }[];
    graphs: IProductionTrend[];
}

export type AstueProductChartType = 'fact' | 'plan' | 'exceed' | 'economy';

@Component({
    selector: 'evj-astue-onpz-product-charts',
    templateUrl: './astue-onpz-product-charts.component.html',
    styleUrls: ['./astue-onpz-product-charts.component.scss'],
})
export class AstueOnpzProductChartsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public data$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    public readonly chartComponent: typeof AstueOnpzProductCardComponent = AstueOnpzProductCardComponent;
    private currentOptions: IAstueOnpzMonitoringOptions = null;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private astueOnpzService: AstueOnpzService,
        private injector: Injector
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.astueOnpzService.sharedMonitoringOptions.subscribe((ref) => {
                this.currentOptions = ref;
                this.getData(ref);
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: { graphIds: string[] }): void {}

    private async getData(options: IAstueOnpzMonitoringOptions): Promise<void> {
        this.data$.next(await this.astueOnpzService.getProductChannels(this.widgetId, options));
    }

    public getInjector = (widgetId: string, channelId: string): Injector => {
        return Injector.create({
            providers: [
                { provide: 'widgetId', useValue: widgetId },
                { provide: 'channelId', useValue: channelId },
                { provide: 'isDeviation', useValue: this.currentOptions?.type === 'Deviation' },
            ],
            parent: this.injector,
        });
    };
}
