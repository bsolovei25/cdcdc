import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { IAstueProductChart } from '../../astue-onpz-product-charts.component';
import { UserSettingsService } from '../../../../../dashboard/services/user-settings.service';
import { AstueOnpzService } from '../../../astue-onpz-shared/astue-onpz.service';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { HttpClient } from '@angular/common/http';
import { ChannelPlatform } from '../../../../../dashboard/models/@PLATFORM/channel-platform';

@Component({
    selector: 'evj-astue-onpz-product-card',
    templateUrl: './astue-onpz-product-card.component.html',
    styleUrls: ['./astue-onpz-product-card.component.scss'],
})
export class AstueOnpzProductCardComponent extends ChannelPlatform<IAstueProductChart> implements OnInit, OnDestroy {
    public data: IAstueProductChart;

    constructor(
        private http: HttpClient,
        private userSettingsService: UserSettingsService,
        private astueOnpzService: AstueOnpzService,
        protected widgetService: WidgetService,
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string,
        @Inject('isDeviation') public isDeviationChart: string
    ) {
        super(widgetId, channelId, widgetService);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }

    // for test
    private async getMockData(): Promise<void> {
        const ref = await this.http
            .get<IAstueProductChart>('assets/mock/ASTUE-ONPZ/product-charts.mock.json')
            .toPromise();
        setTimeout(() => this.dataHandler(ref), 5000);
    }

    public switchToIndicatorScreen(): void {
        const multilineChartTransferType =
            this.astueOnpzService.monitoringOptions$.getValue().type === 'Deviation' ? 'deviation' : 'limit';
        this.astueOnpzService.multilineChartTransfer.next({
            type: multilineChartTransferType,
            isEconomy: this.data.isEconomy,
        });
        this.astueOnpzService.updateGraphId(this.data.itemId);
        this.astueOnpzService.multilineChartIndicatorTitle$.next(this.data?.productName ?? '');
        this.userSettingsService.loadScreenByWidget('astue-onpz-interactive-indicators');
    }

    protected dataHandler(ref: IAstueProductChart): void {
        if (!ref?.itemId) {
            return;
        }
        this.data = ref;
        this.data?.graphs?.forEach((item) => {
            item?.graph?.forEach((val) => {
                val.timeStamp = new Date(val.timeStamp);
            });
        });
        this.data?.labels?.forEach(
            (x) => (x.value = x?.type === 'economy' || x?.type === 'exceed' ? Math.abs(x?.value ?? 0) : x?.value ?? 0)
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
