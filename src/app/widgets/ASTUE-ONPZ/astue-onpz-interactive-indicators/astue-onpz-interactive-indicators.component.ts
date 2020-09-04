import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

interface IAstueOnpzInteractiveIndicators {
    labels: { id: number; name: string; icon: string, colorIndex: number }[];
    indicators: { name: string; value: number }[];
    allIndicators: { id: number; name: string; icon: string, colorIndex: number }[];
}

interface IAstueOnpzIndicatorData {
    indicators: IAstueOnpzInteractiveIndicator[];
    deviationValue: number;
    factValue: number;
    planValue: number;
}

interface IAstueOnpzInteractiveIndicator {
    key: string;
    value: string;
    icon: string;
    colorIndex: number;
    isActive: boolean;
    isChoosing: boolean;
}

@Component({
    selector: 'evj-astue-onpz-interactive-indicators',
    templateUrl: './astue-onpz-interactive-indicators.component.html',
    styleUrls: ['./astue-onpz-interactive-indicators.component.scss']
})
export class AstueOnpzInteractiveIndicatorsComponent extends WidgetPlatform
    implements OnInit, OnDestroy {

    private readonly colorIndexCount: number = 6; // доступное количество color index

    public data: IAstueOnpzIndicatorData = null;

    public selectValue: string = null;

    get currentIndicators(): IAstueOnpzInteractiveIndicator[] {
        return this.data?.indicators?.filter((i) => i.isActive) ?? [];
    }

    get restIndicators(): IAstueOnpzInteractiveIndicator[] {
        return this.data?.indicators?.filter((i) => !i.isActive) ?? [];
    }

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

    protected dataHandler(ref: any): void {
        const indicators: IAstueOnpzInteractiveIndicator[] = [];
        let colorIndex = 0;
        for (const i in ref.indicators) {
            indicators.push({
                key: i,
                value: ref.indicators[i],
                icon: this.getIconByKey(i),
                colorIndex,
                isActive: !!this.currentIndicators?.find((ind) => ind.key === i),
                isChoosing: !!this.currentIndicators?.find((ind) =>
                    ind.key === i && ind.isChoosing),
            } as IAstueOnpzInteractiveIndicator);
            if (++colorIndex > this.colorIndexCount - 1) {
                colorIndex = 0;
            }
        }
        ref.indicators = indicators;
        this.data = ref;
    }

    private getIconByKey(key: string): string {
        if (key.toLowerCase().includes('press')) {
            return 'pressure';
        } else if (key.toLowerCase().includes('volume')) {
            return 'volume';
        } else if (key.toLowerCase().includes('temp')) {
            return 'temperature';
        }
        return '';
    }

    public chooseIndicator(key: string): void {
        this.selectValue = null;
        const indicator = this.data.indicators.find((i) => i.key === key);
        if (indicator) {
            indicator.isActive = true;
            indicator.isChoosing = true;
        }
    }

    public deleteLabel(event: MouseEvent, key: string): void {
        event.stopPropagation();
        const indicator = this.data.indicators.find((i) => i.key === key);
        if (indicator) {
            indicator.isActive = false;
            indicator.isChoosing = false;
        }
    }

    public toggleLabel(event: MouseEvent, key: string): void {
        event.stopPropagation();
        const indicator = this.data.indicators.find((i) => i.key === key);
        if (indicator) {
            indicator.isChoosing = !indicator.isChoosing;
        }
    }

    public getPathSvg(icon: string): string {
        if (icon) {
            return `assets/icons/widgets/ASTUE-ONPZ/interactive-indicators/${icon}.svg`;
        } else {
            return '';
        }
    }

    public getColorTag(color: number): string {
        return `var(--color-astue-tag-${color})`;
    }

    public getColorBgTag(color: number): string {
        return `var(--color-astue-onpz-bg-tag-${color})`;
    }
}
