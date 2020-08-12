import { Component, OnInit, Inject, OnDestroy, AfterViewInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { AstueOnpzConsumptionIndicatorsService } from './astue-onpz-consumption-indicators.service';

interface IAstueOnpzConsumptionIndicatorsButtons {
    id: number;
    title: string;
    value?: string;
    type: 'deviation' | 'indicators';
}

@Component({
    selector: 'evj-astue-onpz-consumption-indicators',
    templateUrl: './astue-onpz-consumption-indicators.component.html',
    styleUrls: ['./astue-onpz-consumption-indicators.component.scss'],
})
export class AstueOnpzConsumptionIndicatorsComponent extends WidgetPlatform
    implements OnInit, OnDestroy, AfterViewInit {
    public data: any;

    public type: 'deviation' | 'indicators';

    public activeButton: number;

    buttons: IAstueOnpzConsumptionIndicatorsButtons[] = [
        {
            id: 0,
            title: 'Значения в рублях',
            value: '895 000',
            type: 'deviation',
        },
        {
            id: 1,
            title: 'Значения в процентах',
            value: '85%',
            type: 'deviation',
        },
        {
            id: 2,
            title: 'Абсолютное отклонение',
            type: 'deviation',
        },
        {
            id: 3,
            title: 'Значения в рублях',
            type: 'indicators',
        },
        {
            id: 4,
            title: 'Абсолютное потребление',
            type: 'indicators',
        },
    ];

    constructor(
        public widgetService: WidgetService,
        private astueOnpzConsumptionIndicatorsService: AstueOnpzConsumptionIndicatorsService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        this.astueOnpzConsumptionIndicatorsService.sharedSelectedId.subscribe(
            (id) => (this.activeButton = id)
        );
    }

    public ngAfterViewInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {
        this.data = ref.items;
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(this.defineWidgetType());
    }

    private defineWidgetType(): any {
        this.widgetTitle.toLowerCase().includes('показатели')
            ? (this.type = 'indicators')
            : (this.type = 'deviation');
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public setButton(id: number): void {
        this.astueOnpzConsumptionIndicatorsService.setId(id);
    }
}
