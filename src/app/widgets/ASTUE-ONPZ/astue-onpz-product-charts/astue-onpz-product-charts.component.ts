import { Component, OnInit, Inject, OnDestroy, Injector } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IProductionTrend } from '../../../dashboard/models/LCO/production-trends.model';
import {
    AstueOnpzService,
    IAstueOnpzMonitoringOptions
} from '../astue-onpz-shared/astue-onpz.service';
import { AstueOnpzProductCardComponent } from './components/astue-onpz-product-card/astue-onpz-product-card.component';
import { AstueOnpzHeaderIcon } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-header-icon.model';
import { HttpClient } from "@angular/common/http";
import { AppConfigService } from "@core/service/app-config.service";

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
export class AstueOnpzProductChartsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: any[] = [];
    public readonly chartComponent: any = AstueOnpzProductCardComponent;
    private readonly restUrl: string;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private astueOnpzService: AstueOnpzService,
        public injector: Injector,
        private http: HttpClient,
        private appConfigService: AppConfigService,
    ) {
        super(widgetService, isMock, id, uniqId);
        this.restUrl = appConfigService.restUrl;
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.astueOnpzService.sharedMonitoringOptions.subscribe((ref) => {
                this.widgetService.setChannelLiveDataFromWsOptions(this.widgetId, ref);
                this.tempRequest(this.widgetId, ref);
            })
        );
    }

    // TODO: move to service
    private async tempRequest(widgetId: string, options: IAstueOnpzMonitoringOptions): Promise<void> {
        console.log('start req');
        let response = await this.http.get<any>(`${this.restUrl}/api/widget-data/${widgetId}`).toPromise();
        response = response.data.subChannels.filter(x => x.manufactureName === options.manufactureName
            && x.type === options.type && x.typeValue === options.indicatorType && x.unitName === options.unitName);
        this.data = response;
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: { graphIds: string[] }): void {
        // if (ref?.graphIds?.length > 0) {
        //     this.data = ref.graphIds;
        // } else {
        //     this.data = [];
        // }
    }

    public getInjector = (widgetId: string, channelId: string): Injector => {
        return Injector.create({
            providers: [
                { provide: 'widgetId', useValue: widgetId },
                { provide: 'channelId', useValue: channelId },
            ],
            parent: this.injector,
        });
    }
}
