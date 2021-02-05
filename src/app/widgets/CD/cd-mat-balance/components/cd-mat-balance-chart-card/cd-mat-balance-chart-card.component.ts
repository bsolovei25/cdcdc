import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Injector,
    Inject,
    ChangeDetectorRef,
} from '@angular/core';
import {
    ISplineDiagramData,
    ISplineDiagramSize,
} from '../../../../LCO/spline-trends-chart/components/spline-diagram/spline-diagram.component';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { CdMatBalanceService } from '../../../../../dashboard/services/widgets/CD/cd-mat-balance.service';
import { ChannelPlatform } from 'src/app/dashboard/models/@PLATFORM/channel-platform';

export interface IMatBalanceChartCard {
    id: number;
    description: string;
    deviation: number;
    engUnits: string;
    max: number;
    min: number;
    modelValue: number;
    modelValueGraphs: { value: number; date: Date }[];
    name: string;
    title: string;
    value: number;
    valueGraphs: { value: number; date: Date }[];
    widgetId: string;
    widgetType: string;
}

@Component({
    selector: 'evj-cd-mat-balance-chart-card',
    templateUrl: './cd-mat-balance-chart-card.component.html',
    styleUrls: ['./cd-mat-balance-chart-card.component.scss'],
})
export class CdMatBalanceChartCardComponent
    extends ChannelPlatform<IMatBalanceChartCard>
    implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('chart')
    public chartElement: ElementRef;

    public isLoading: boolean = true;
    public hoursCount: 8 | 24;
    public data: IMatBalanceChartCard;
    public chartData: ISplineDiagramData;
    public size: ISplineDiagramSize;

    constructor(
        protected widgetService: WidgetService,
        public injector: Injector,
        private cdMatBalanceService: CdMatBalanceService,
        private cdRef: ChangeDetectorRef,
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string
    ) {
        super(widgetId, channelId, widgetService);
    }

    public ngOnInit(): void {
        super.ngOnInit();
        this.subscriptions.push(
            this.cdMatBalanceService.hc$.subscribe((hoursCount) => {
                this.hoursCount = hoursCount;
            })
        );
    }

    public ngAfterViewInit(): void {
        this.size = {
            width: this.chartElement.nativeElement.offsetWidth,
            height: this.chartElement.nativeElement.offsetHeight,
        };
        this.cdRef.detectChanges();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IMatBalanceChartCard): void {
        this.getData(ref);
        this.isLoading = false;
    }

    private async getData(data: IMatBalanceChartCard): Promise<void> {
        const plan: { value: number; timestamp: Date }[] = data.modelValueGraphs.map((item) => {
            return {
                value: item.value ?? 0,
                timestamp: new Date(item.date),
            };
        });

        const fact: { value: number; timestamp: Date }[] = data.valueGraphs.map((item) => {
            return {
                value: item.value ?? 0,
                timestamp: new Date(item.date),
            };
        });

        this.setCurrentHour(fact); // задание текущего активного часа для отрисовки шкалы

        const newData: ISplineDiagramData = {
            deviationValue: data.deviation,
            planValue: data.modelValue,
            highBound: [],
            lowBound: [],
            fact: this.transformData(fact),
            plan: this.transformData(plan),
        };

        this.data = data;
        this.chartData = newData;
    }

    private transformData(data: { value: number; timestamp: Date }[]): { x: number; y: number }[] {
        const normArray: { value: number; timestamp: Date }[] = [];
        for (const el of data) {
            if (normArray.find((res) => res.timestamp.getTime() === el.timestamp.getTime())) {
                continue;
            }
            const filterValues = data
                .filter((res) => res.timestamp.getTime() === el.timestamp.getTime())
                .map((res) => res.value);
            const resultValue =
                filterValues.map((res) => res).reduce((prev, next) => prev + next) / filterValues.length;
            normArray.push({ timestamp: el.timestamp, value: resultValue });
        }

        const resultArray: { x: number; y: number }[] = normArray.map((el) => {
            return {
                y: el.value,
                x: (el.timestamp.getTime() - normArray[0].timestamp.getTime()) / (60 * 60 * 1000),
            };
        });
        return resultArray;
    }

    private setCurrentHour(data: { value: number; timestamp: Date }[]): void {
        const currHour = this.cdMatBalanceService.currentHour$.getValue();
        const newCurrentHour = data[data.length - 1].timestamp.getHours();
        if (currHour !== newCurrentHour) {
            this.cdMatBalanceService.currentHour$.next(newCurrentHour);
        }
    }

    upChart(): void {
        const widgets = this.cdMatBalanceService.charts$.getValue();
        const idx = widgets.findIndex((value) => value === this.data.widgetId);
        if (idx > 0) {
            [widgets[idx - 1], widgets[idx]] = [widgets[idx], widgets[idx - 1]];
        }
        this.cdMatBalanceService.charts$.next(widgets);
    }

    downChart(): void {
        const widgets = this.cdMatBalanceService.charts$.getValue();
        const idx = widgets.findIndex((value) => value === this.data.widgetId);
        if (idx < widgets.length - 1) {
            [widgets[idx + 1], widgets[idx]] = [widgets[idx], widgets[idx + 1]];
        }
        this.cdMatBalanceService.charts$.next(widgets.map((item) => item));
    }

    deleteChart(): void {
        const widgets = this.cdMatBalanceService.charts$.getValue();
        const idx = widgets.findIndex((value) => value === this.data.widgetId);
        widgets.splice(idx, 1);
        this.cdMatBalanceService.charts$.next(widgets);
    }
}
