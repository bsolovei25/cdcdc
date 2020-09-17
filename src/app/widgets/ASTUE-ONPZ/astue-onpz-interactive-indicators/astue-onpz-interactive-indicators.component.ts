import { Component, OnInit, OnDestroy, Inject, Input } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { AstueOnpzService } from '../astue-onpz-shared/astue-onpz.service';

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
    value: {
        name: string;
        tagName: string;
    };
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
    colors: Map<string, number>;

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
        @Inject('uniqId') public uniqId: string,
        private astueOnpzService: AstueOnpzService
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
        this.astueOnpzService.clearColors();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.astueOnpzService.sharedIndicatorOptions.subscribe((options) => {
                this.widgetService.setWidgetLiveDataFromWSOptions(this.widgetId, options);
            }),
            this.astueOnpzService.colors$.subscribe((value) => {
                this.colors = value;
            })
        );
    }

    protected dataHandler(ref: any): void {
        const isHasData: boolean = this.data?.indicators?.length > 0;
        const indicators: IAstueOnpzInteractiveIndicator[] = [];
        let colorIndex = 0;
        for (const i in ref.indicators) {
            indicators.push({
                key: i,
                value: ref.indicators[i],
                colorIndex,
                isActive: !!this.currentIndicators?.find((ind) => ind.key === i),
                isChoosing: !!this.currentIndicators?.find((ind) =>
                    ind.key === i && ind.isChoosing)
            } as IAstueOnpzInteractiveIndicator);
            if (++colorIndex > this.colorIndexCount - 1) {
                colorIndex = 0;
            }
        }
        ref.indicators = indicators;
        this.data = ref;
        if (!isHasData) {
            this.data.indicators.forEach(value => {
                if (value.key === 'FactValue' || value.key === 'PlanValue') {
                    this.chooseIndicator(value.key);
                }
            });
        }
    }

    public chooseIndicator(key: string): void {
        this.selectValue = null;
        const indicator = this.data.indicators.find((i) => i.key === key);
        if (indicator) {
            indicator.isActive = true;
            indicator.isChoosing = true;
        }
        if (!this.astueOnpzService.colors$.getValue()?.has(indicator?.value?.tagName)) {
            this.astueOnpzService.addTagToColor(indicator?.value?.tagName);
        }
        this.astueOnpzService.updateIndicatorFilter(key, 'add');
    }

    public deleteLabel(event: MouseEvent, key: string): void {
        event.stopPropagation();
        const indicator = this.data.indicators.find((i) => i.key === key);
        if (indicator) {
            indicator.isActive = false;
            indicator.isChoosing = false;
        }
        this.astueOnpzService.updateIndicatorFilter(key, 'delete');
    }

    public toggleLabel(event: MouseEvent, item: IAstueOnpzInteractiveIndicator
    ): void {
        event?.stopPropagation();
        const indicator = this.data.indicators.find((i) => i.key === item.key);
        if (indicator) {
            indicator.isChoosing = !indicator.isChoosing;
        }
        if (indicator.isChoosing) {
            this.astueOnpzService.updateIndicatorFilter(item.key, 'add');
        } else {
            this.astueOnpzService.updateIndicatorFilter(item.key, 'delete');
        }
    }

    public getPathSvg(icon: string): string {
        switch (icon) {
            case 'Температура':
                return `assets/icons/widgets/ASTUE-ONPZ/interactive-indicators/temperature.svg`;
            case 'Температура теплообменника':
                return `assets/icons/widgets/ASTUE-ONPZ/interactive-indicators/heatExchanger.svg`;
            case 'Давление':
                return `assets/icons/widgets/ASTUE-ONPZ/interactive-indicators/aim.svg`;
            case 'FactValue':
            case 'PlanValue':
                return ``;
            default:
                return `assets/icons/widgets/ASTUE-ONPZ/interactive-indicators/aim.svg`;
        }
    }
}
