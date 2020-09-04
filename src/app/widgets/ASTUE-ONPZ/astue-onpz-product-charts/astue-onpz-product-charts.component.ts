import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IProductionTrend } from '../../../dashboard/models/production-trends.model';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';

export interface IAstueProductChart {
    productName: string;
    unitName: string;
    iconType: string;
    itemId: string;
    units: string;
    currentPlanValue: number;
    currentFactValue: number;
    graphs: IProductionTrend[];
}

@Component({
    selector: 'evj-astue-onpz-product-charts',
    templateUrl: './astue-onpz-product-charts.component.html',
    styleUrls: ['./astue-onpz-product-charts.component.scss'],
})
export class AstueOnpzProductChartsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public data: IAstueProductChart[] = [];

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private astueOnpzService: AstueOnpzService,
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
                this.widgetService.setWidgetLiveDataFromWSOptions(this.widgetId, ref);
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: {graphs: IAstueProductChart[]}): void {
        if (ref?.graphs?.length > 0) {
            this.data = ref.graphs;
        } else {
            this.data = [];
        }
    }
}
