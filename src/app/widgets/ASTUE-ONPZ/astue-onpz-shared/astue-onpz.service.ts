import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    AstueOnpzConsumptionIndicatorsWidgetType,
    AstueOnpzConsumptionIndicatorType
} from '../astue-onpz-consumption-indicators/astue-onpz-consumption-indicators.component';
import { IPlanningChart } from '../astue-onpz-planning-charts/astue-onpz-planning-charts.component';
import { IMultiChartLine } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';

export interface IAstueOnpzMonitoringOptions {
    manufactureName: string | null;
    unitName: string | null;
    type: AstueOnpzConsumptionIndicatorsWidgetType | null;
    indicatorType: AstueOnpzConsumptionIndicatorType | null;
}

export interface IAstueOnpzMonitoringCarrierOptions {
    manufactureName: string;
    unitName: string;
    itemId: string;
    filterValues: string;
}

export interface IAstueOnpzPredictorsOptions {
    id: string;
    name: string;
    colorIndex: number;
}

export interface IAstueOnpzColors {
    [key: string]: number;
}

@Injectable({
    providedIn: 'root'
})
export class AstueOnpzService {
    private indicatorOptions$: BehaviorSubject<IAstueOnpzMonitoringCarrierOptions> = new BehaviorSubject({
        manufactureName: null,
        unitName: null,
        itemId: null,
        filterValues: null
    });

    private monitoringOptions$: BehaviorSubject<IAstueOnpzMonitoringOptions> = new BehaviorSubject({
        manufactureName: null,
        unitName: null,
        type: null,
        indicatorType: null
    });

    public predictorsOptions$: BehaviorSubject<IAstueOnpzPredictorsOptions[]> = new BehaviorSubject(
        []
    );

    public colors$: BehaviorSubject<Map<string, number>> = new BehaviorSubject<Map<string, number>>(new Map());
    private colors: number[] = [1, 2, 3, 4, 5, 6];

    public sharedMonitoringOptions: Observable<IAstueOnpzMonitoringOptions> = this.monitoringOptions$.asObservable();

    public sharedIndicatorOptions: Observable<IAstueOnpzMonitoringCarrierOptions> = this.indicatorOptions$.asObservable();

    public sharedPlanningGraph$: BehaviorSubject<IPlanningChart> = new BehaviorSubject(null);

    private multiLinePredictorsChart$: BehaviorSubject<IMultiChartLine[]> = new BehaviorSubject<IMultiChartLine[]>(null);

    get multiLinePredictors(): Observable<IMultiChartLine[]> {
        return this.multiLinePredictorsChart$.asObservable();
    }

    constructor() {
    }

    public setMultiLinePredictors(value: IMultiChartLine[]): void {
        const val = !!value ? value : null;
        this.multiLinePredictorsChart$.next(val);
    }

    public setMonitoringOptions(options: IAstueOnpzMonitoringOptions): void {
        this.monitoringOptions$.next(options);
    }

    public setPredictors(arr: IAstueOnpzPredictorsOptions[]): void {
        if (arr.some((x) => x.name !== this.sharedPlanningGraph$.getValue()?.title)) {
            this.setPlanningGraph(null);
        }
        this.predictorsOptions$.next(arr);
    }

    public setPlanningGraph(graph: IPlanningChart, isDemand: boolean = false): void {
        if (this.sharedPlanningGraph$.getValue()?.title === graph?.title && !isDemand) {
            this.sharedPlanningGraph$.next(null);
            return;
        }
        this.sharedPlanningGraph$.next(graph);
    }

    public updateIndicatorFilter(key: string, action: 'add' | 'delete'): void {
        const filterArray =
            this.indicatorOptions$
                .getValue()
                ?.filterValues?.split(';')
                ?.filter((f) => f !== '') ?? [];
        switch (action) {
            case 'add':
                filterArray.push(key);
                break;
            case 'delete':
                const idx = filterArray.findIndex((f) => f === key);
                if (idx !== -1) {
                    filterArray.splice(idx, 1);
                }
                break;
        }
        const filter: string = filterArray.reduce((a, b) => `${a};${b}`, '');
        this.nextMonitoringCarrierOptions<string>('filterValues', filter);
    }

    public updateGraphId(itemId: string): void {
        this.nextMonitoringCarrierOptions('itemId', itemId);
    }

    public updateManufactureName(manufactureNameParam: string): void {
        this.nextMonitoringOptions<string>('manufactureName', manufactureNameParam);
        this.nextMonitoringCarrierOptions<string>('manufactureName', manufactureNameParam);
    }

    public updateUnitName(unitNameParam: string): void {
        this.nextMonitoringOptions<string>('unitName', unitNameParam);
        this.nextMonitoringCarrierOptions<string>('unitName', unitNameParam);
    }

    public updateType(typeParam: AstueOnpzConsumptionIndicatorsWidgetType): void {
        this.nextMonitoringOptions<AstueOnpzConsumptionIndicatorsWidgetType>('type', typeParam);
    }

    public updateIndicator(
        indicatorTypeParam: AstueOnpzConsumptionIndicatorType,
        typeParam: AstueOnpzConsumptionIndicatorsWidgetType
    ): void {
        this.monitoringOptions$.next({
            ...this.monitoringOptions$.value,
            ...{
                indicatorType: indicatorTypeParam,
                type: typeParam
            }
        });
    }

    private nextMonitoringOptions<T>(key: keyof IAstueOnpzMonitoringOptions, value: T): void {
        this.monitoringOptions$.next({ ...this.monitoringOptions$.value, ...{ [key]: value } });
    }

    private nextMonitoringCarrierOptions<T>(
        key: keyof IAstueOnpzMonitoringCarrierOptions,
        value: T
    ): void {
        this.indicatorOptions$.next({ ...this.indicatorOptions$.value, ...{ [key]: value } });
    }

    public dropDataStream(): void {
        const val = this.indicatorOptions$.getValue();
        val.filterValues = null;
        this.indicatorOptions$.next(val);
    }

    public addTagToColor(tag: string): void {
        const colors = this.colors$.getValue();
        const color = this.colors[0];
        this.colors.splice(0, 1);
        colors.set(tag, color);
        this.colors$.next(colors);
    }

    public deleteTagToColor(color: number): void {
        this.colors.push(color);
    }
}
