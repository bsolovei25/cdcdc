import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { IOperationEfficiency } from 'src/app/dashboard/models/operation-efficiency';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';

@Component({
    selector: 'evj-operation-efficiency',
    templateUrl: './operation-efficiency.component.html',
    styleUrls: ['./operation-efficiency.component.scss'],
})
export class OperationEfficiencyComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

    /* Приблизительная структура, получаемая с бека */

    public data: IOperationEfficiency = {
        plan: 1000,
        lowerBorder: 0.5,
        higherBorder: 0.5,
        curValue: 1700,
        maxValue: 1500,
        lowerValue: 1000 * (1 - 0.5),
        higherValue: 1000 * (1 + 0.5),
    };

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetUnits = 'млн.руб.';
        this.widgetIcon = 'money';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    dataHandler(ref: any): void {
        this.data = ref;
        this.data.curValue = ref.currentValue;
        this.data.lowerBorder = Math.abs(this.data.lowerBorder - this.data.plan) / this.data.plan;
        this.data.higherBorder = (this.data.higherBorder - this.data.plan) / this.data.plan;
        this.data.lowerValue = this.data.plan * (1 - this.data.lowerBorder);
        this.data.higherValue = this.data.plan * (1 + this.data.higherBorder);
        console.log(this.data);
    }
}
