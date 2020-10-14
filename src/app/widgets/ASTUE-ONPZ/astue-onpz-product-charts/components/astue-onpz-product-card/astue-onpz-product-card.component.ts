import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { IAstueProductChart } from '../../astue-onpz-product-charts.component';
import { UserSettingsService } from '../../../../../dashboard/services/user-settings.service';
import { AstueOnpzService } from '../../../astue-onpz-shared/astue-onpz.service';
import { WidgetPlatform } from '../../../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { HttpClient } from '@angular/common/http';
import { fillDataShape } from '@shared/functions/common-functions';
import { AstueOnpzHeaderIcon } from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-header-icon.model';
import { ArrayType } from '@angular/compiler';

@Component({
    selector: 'evj-astue-onpz-product-card',
    templateUrl: './astue-onpz-product-card.component.html',
    styleUrls: ['./astue-onpz-product-card.component.scss'],
})
export class AstueOnpzProductCardComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: IAstueProductChart;

    public isDeviationChart: boolean = false;

    constructor(
        private http: HttpClient,
        private userSettingsService: UserSettingsService,
        private astueOnpzService: AstueOnpzService,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.astueOnpzService.sharedMonitoringOptions.subscribe((ref) => {
                this.widgetService.setChannelLiveDataFromWsOptions(this.widgetId, ref);
            })
        );
    }

    private async getMockData(): Promise<void> {
        const ref = await this.http.get<IAstueProductChart>('assets/mock/ASTUE-ONPZ/product-charts.mock.json').toPromise();
        setTimeout(() => this.dataHandler(ref), 5000);
    }

    public switchToIndicatorScreen(): void {
        this.astueOnpzService.updateGraphId(this.data.itemId);
        this.astueOnpzService.multilineChartIndicatorTitle$.next(this.data?.productName ?? '');
        this.userSettingsService.LoadScreenByWidget('astue-onpz-interactive-indicators');
    }

    protected dataHandler(ref: IAstueProductChart): void {
        if (!ref?.itemId) {
            return;
        }
        this.isDeviationChart = (ref as any).subscriptionOptions.type === 'Deviation';
        this.data = ref;
        this.data?.graphs?.forEach((item) => {
            item?.graph?.forEach((val) => {
                val.timeStamp = new Date(val.timeStamp);
            });
        });
        this.data?.labels?.forEach((x) =>
            x.value = x?.type === 'economy' || x?.type === 'exceed'
                ? Math.abs(x?.value ?? 0) : x?.value ?? 0);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
