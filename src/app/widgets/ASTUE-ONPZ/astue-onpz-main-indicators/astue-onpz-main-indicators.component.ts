import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { ObjectDeepEqual } from '@shared/functions/deep-equal.function';

interface IAstueOnpzMainIndicators {
    name: string;
    value: number;
}

interface IAstueOnpzMainIndicatorsRaw {
    deviationName: string;
    deviationValue: number;
    factName: string;
    factValue: number;
    nextPlanName: string;
    nextPlanValue?: number;
    planName: string;
    planValue: number;
    unitId?: number;
}

@Component({
    selector: 'evj-astue-onpz-main-indicators',
    templateUrl: './astue-onpz-main-indicators.component.html',
    styleUrls: ['./astue-onpz-main-indicators.component.scss']
})
export class AstueOnpzMainIndicatorsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

    public data: IAstueOnpzMainIndicators[] = [];
    public dataRaw: IAstueOnpzMainIndicatorsRaw;

    public unitId: number | null = null;

    // TODO: double? NextPlanValue - может быть пустым, если предсказания нет

    constructor(
        protected widgetService: WidgetService,
        private astueOnpzService: AstueOnpzService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IAstueOnpzMainIndicatorsRaw): void {
        if (this.unitId !== ref.unitId || !this.unitId) {
            this.unitId = ref.unitId;
        }
        if (ObjectDeepEqual<IAstueOnpzMainIndicatorsRaw>(this.dataRaw, ref) || !this.dataRaw) {
            this.dataRaw = ref;
            this.fillIndicators();
        }
    }

    public async onPredictClick(): Promise<void> {
        if (!!this.unitId) {
            const response = await this.astueOnpzService.predict(this.unitId);
        }
    }

    private fillIndicators(): void {
        this.data = [
            {
                name: this.dataRaw.deviationName,
                value: this.dataRaw.deviationValue,
            },
            {
                name: this.dataRaw.factName,
                value: this.dataRaw.factValue,
            },
            {
                name: this.dataRaw.planName,
                value: this.dataRaw.planValue,
            },
        ];
        if (this.dataRaw.nextPlanValue) {
            this.data.push(
                {
                    name: this.dataRaw.nextPlanName,
                    value: this.dataRaw.nextPlanValue,
                },
            );
        }
    }
}
