import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

interface IAstueOnpzInteractiveIndicators {
    labels: { id: number; name: string; icon: string, colorIndex: number }[];
    indicators: { name: string; value: number }[];
    allIndicators: { id: number; name: string; icon: string, colorIndex: number }[];
}

@Component({
    selector: 'evj-astue-onpz-interactive-indicators',
    templateUrl: './astue-onpz-interactive-indicators.component.html',
    styleUrls: ['./astue-onpz-interactive-indicators.component.scss']
})
export class AstueOnpzInteractiveIndicatorsComponent extends WidgetPlatform
    implements OnInit, OnDestroy {
    @Input() data: IAstueOnpzInteractiveIndicators = {
        labels: [
            {
                id: 1,
                name: 'Плановое значение',
                icon: '',
                colorIndex: 17
            },
            {
                id: 2,
                name: 'Фактическое значение',
                icon: '',
                colorIndex: 0
            },
            {
                id: 3,
                name: 'Tемпература',
                icon: 'temperature',
                colorIndex: 15
            },
            {
                id: 4,
                name: 'Давления',
                icon: 'pressure',
                colorIndex: 4
            },
            {
                id: 5,
                name: 'Температура после теплообменника',
                icon: 'temperature-after',
                colorIndex: 2
            },
            {
                id: 6,
                name: 'Объем',
                icon: 'volume',
                colorIndex: 7
            }
        ],
        indicators: [
            {
                name: 'Плановое значение',
                value: 1100
            },
            {
                name: 'Текущее значение',
                value: 1500
            },
            {
                name: 'Текущее отклонение',
                value: 400
            }
        ],
        allIndicators: [
            {
                id: 7,
                name: 'Объем',
                icon: 'volume',
                colorIndex: 6
            }
        ]
    };

    pathSvg: string = '{{ item.icon }}.svg';

    public DisabledLabels: Map<{ id: number; name: string; icon: string }, boolean>
        = new Map<{ id: number, name: string, icon: string }, boolean>();

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public LabelClick(element: { id: number; name: string; icon: string }): void {
        const value = this.DisabledLabels?.get(element) ?? false;
        this.DisabledLabels.set(element, !value);
    }

    protected dataHandler(ref: any): void {
        console.log(ref);
    }

    deleteLabel(event: MouseEvent, id: number): void {
        event.stopPropagation();
        const idx = this.data.labels.findIndex(value => value.id === id);
        if (idx > -1) {
            this.data.labels.splice(idx, 1);
        }
    }

    getPathSvg(icon: string): string {
        if (icon) {
            return `assets/icons/widgets/ASTUE-ONPZ/interactive-indicators/${icon}.svg`;
        } else {
            return '';
        }
    }

    getColorTag(color: number): string {
        return `var(--color-astue-tag-${color})`;
    }

    getColorBgTag(color: number): string {
        return `var(--color-astue-onpz-bg-tag-${color})`;
    }

}
