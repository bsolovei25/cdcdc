import { Component, OnInit, Inject, OnDestroy, Injector } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IProductionTrend } from '../../../dashboard/models/LCO/production-trends.model';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';
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
    public data: string[] = [];
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
            })
        );
        this.tempRequest(this.widgetId);
    }
    // chartId: "3f8b51da-f5b9-11ea-b282-c46516bdb871"
    // id: "22648c38-b7f5-579f-3b65-f5a92ee2ac96"
    // manufactureName: "Производство №1"
    // name: "Пар водяной"
    // type: "Deviation"
    // typeValue: "Absolute"
    // unitName: "ФСБ"
    // widgetId: "51f1368d-dae0-11e
    //

    // TODO: move to service
    private async tempRequest(widgetId: string): Promise<void> {
        console.log('start req');
        const response = await this.http.get<any>(`${this.restUrl}/api/widget-data/${widgetId}`).toPromise();
        console.log(response);
        console.log(response.data.subChannels.filter(x => x.manufactureName === 'Производство №1'
            && x.type === 'Deviation' && x.typeValue === 'Absolute' && x.unitName === 'АВТ-10'));
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: { graphIds: string[] }): void {
        if (ref?.graphIds?.length > 0) {
            this.data = ref.graphIds;
        } else {
            this.data = [];
        }
    }

    public getInjector = (idWidget: string, uniqId: string): Injector => {
        return Injector.create({
            providers: [
                { provide: 'widgetId', useValue: idWidget },
                { provide: 'uniqId', useValue: uniqId },
                { provide: 'isMock', useValue: false },
            ],
            parent: this.injector,
        });
    };
}
