import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { CdMatBalanceService } from '../../../dashboard/services/widgets/CD/cd-mat-balance.service';

export interface IMatBalance {
    params: IParams;
    sensors: ISensors;
    streams: IStreams;
    title: string;
    widgetType: string;
}
export interface IParams {
    unit: { description: string; name: string };
    unitParams: IUnitParams;
}
export interface IUnitParams {
    description: string;
    deviation: number;
    deviationState: number;
    engUnits: string;
    id: number;
    max: number;
    min: number;
    modelValue: number;
    name: string;
    value: number;
}
export interface ISensors {
    id: number;
    name: string;
    value: number;
    engUnits: string;
    description: string;
    deviation: number;
    max: number;
    min: number;
    modelValue: number;
}
export interface IStreams {
    description: string;
    deviation: number;
    modelValue: number;
    name: string;
    value: number;
}
@Component({
    selector: 'evj-cd-mat-balance',
    templateUrl: './cd-mat-balance.component.html',
    styleUrls: ['./cd-mat-balance.component.scss'],
})
export class CdMatBalanceComponent extends WidgetPlatform implements OnInit, OnDestroy {
    isSelectedEl: number;
    data: IMatBalance;

    constructor(
        protected widgetService: WidgetService,
        private cdMatBalanceService: CdMatBalanceService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            this.cdMatBalanceService.showDeviation.subscribe((value) => {
                this.isSelectedEl = value;
            })
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        if (ref) {
            this.data = ref;
        }
    }
}
