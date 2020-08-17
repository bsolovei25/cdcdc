import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

interface IAstueOnpzInteractiveIndicators {
    labels: { name: string; icon: string }[];
    indicators: { name: string; value: number }[];
    allIndicators: { name: string; icon: string }[];
}

@Component({
    selector: 'evj-astue-onpz-interactive-indicators',
    templateUrl: './astue-onpz-interactive-indicators.component.html',
    styleUrls: ['./astue-onpz-interactive-indicators.component.scss'],
})
export class AstueOnpzInteractiveIndicatorsComponent extends WidgetPlatform
    implements OnInit, OnDestroy {
    @Input() data: IAstueOnpzInteractiveIndicators = {
        labels: [
            {
                name: 'Плановое значение',
                icon: 'dsad',
            },
            {
                name: 'Фактическое значение',
                icon: 'dsad',
            },
            {
                name: 'Температура',
                icon: 'dsad',
            },
            {
                name: 'Температура',
                icon: 'dsad',
            },
            {
                name: 'Температура',
                icon: 'dsad',
            },
        ],
        indicators: [
            {
                name: 'Плановое значение',
                value: 1100,
            },
            {
                name: 'Текущее значение',
                value: 1500,
            },
            {
                name: 'Текущее отклонение',
                value: 400,
            },
        ],
        allIndicators: [
            {
                name: 'Объем',
                icon: 'dsad',
            },
        ],
    };

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {}

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}
