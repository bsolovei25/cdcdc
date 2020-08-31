import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { any } from 'codelyzer/util/function';

interface IAstueOnpzInteractiveIndicators {
    labels: { id: number; name: string; icon: string }[];
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
                id: 1,
                name: 'Плановое значение',
                icon: 'dsad',
            },
            {
                id: 2,
                name: 'Фактическое значение',
                icon: 'dsad',
            },
            {
                id: 3,
                name: 'Значение температуры',
                icon: 'dsad',
            },
            {
                id: 4,
                name: 'Значение давления',
                icon: 'dsad',
            },
            {
                id: 5,
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

    public DisabledLabels: Map<{ id: number; name: string; icon: string }, boolean>
        = new Map<{id: number, name: string, icon: string}, boolean>();

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

    public LabelClick(element: { id: number; name: string; icon: string }): void {
        const value = this.DisabledLabels?.get(element) ?? false;
        this.DisabledLabels.set(element, !value);
    }

    protected dataHandler(ref: any): void {}
}
