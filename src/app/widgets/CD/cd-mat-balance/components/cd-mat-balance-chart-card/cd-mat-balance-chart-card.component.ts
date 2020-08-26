import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Injector,
    Inject,
    Input
} from '@angular/core';
import { WidgetPlatform } from '../../../../../dashboard/models/widget-platform';
import {
    ISplineDiagramData,
    ISplineDiagramSize
} from '../../../../LCO/spline-trends-chart/components/spline-diagram/spline-diagram.component';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { CdMatBalanceService } from '../../../../../dashboard/services/widgets/CD/cd-mat-balance.service';

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
    styleUrls: ['./cd-mat-balance-chart-card.component.scss']
})
export class CdMatBalanceChartCardComponent extends WidgetPlatform
    implements OnInit, OnDestroy, AfterViewInit {
    // TOFIX пробросить количество часов снаружи (возможно через InjectionToken)
    @Input() public hoursCount: 8 | 24 = 8;

    @ViewChild('chart')
    public chartElement: ElementRef;

    public isLoading: boolean = true;

    public data: IMatBalanceChartCard;
    public chartData: ISplineDiagramData;
    public size: ISplineDiagramSize;

    constructor(
        protected widgetService: WidgetService,
        public injector: Injector,
        private cdMatBalanceService: CdMatBalanceService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    public ngAfterViewInit(): void {
        this.size = {
            width: this.chartElement.nativeElement.offsetWidth,
            height: this.chartElement.nativeElement.offsetHeight
        };
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IMatBalanceChartCard): void {
        if (ref) {
            this.getData(ref);
            this.isLoading = false;
            console.log(ref);
        }
    }

    private async getData(data: IMatBalanceChartCard): Promise<void> {
        const plan: { value: number; timestamp: Date }[] = data.modelValueGraphs.map((item) => {
            return {
                value: item.value ?? 0,
                timestamp: new Date(item.date)
            };
        });

        const fact: { value: number; timestamp: Date }[] = data.valueGraphs.map((item) => {
            return {
                value: item.value ?? 0,
                timestamp: new Date(item.date)
            };
        });

        const newData: ISplineDiagramData = {
            deviationValue: data.deviation,
            planValue: data.modelValue,
            highBound: [],
            lowBound: [],
            fact: this.transformData(fact),
            plan: this.transformData(plan)
        };

        console.log('newData', newData);
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
                filterValues.map((res) => res).reduce((prev, next) => prev + next) /
                filterValues.length;
            normArray.push({ timestamp: el.timestamp, value: resultValue });
        }

        const resultArray: { x: number; y: number }[] = normArray.map((el) => {
            return {
                y: el.value,
                x: (el.timestamp.getTime() - normArray[0].timestamp.getTime()) / (60 * 60 * 1000)
            };
        });
        return resultArray;
    }

    upChart(): void {
        const widgets = this.cdMatBalanceService.charts$.getValue();
        const idx = widgets.findIndex(value => value === this.data.name);
        if (idx > 0) {
            const el = widgets[idx - 1];
            widgets[idx - 1] = widgets[idx];
            widgets[idx] = el;
        }
        this.cdMatBalanceService.charts$.next(widgets);
    }

    downChart(): void {
        const widgets = this.cdMatBalanceService.charts$.getValue();
        const idx = widgets.findIndex(value => value === this.data.name);
        if (idx < widgets.length + 1) {
            const el = widgets[idx + 1];
            widgets[idx + 1] = widgets[idx];
            widgets[idx] = el;
        }
        this.cdMatBalanceService.charts$.next(widgets);
    }

    deleteChart(): void {
        const widgets = this.cdMatBalanceService.charts$.getValue();
        const idx = widgets.findIndex(value => value === this.data.name);
        widgets.splice(idx, 1);
        this.cdMatBalanceService.charts$.next(widgets);
    }
}
