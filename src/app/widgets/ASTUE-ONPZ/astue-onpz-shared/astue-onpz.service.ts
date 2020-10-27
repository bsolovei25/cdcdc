import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    AstueOnpzConsumptionIndicatorsWidgetType,
    AstueOnpzConsumptionIndicatorType
} from '../astue-onpz-consumption-indicators/astue-onpz-consumption-indicators.component';
import { IPlanningChart } from '../astue-onpz-planning-charts/astue-onpz-planning-charts.component';
import { IMultiChartLine } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';

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
    type: AstueOnpzConsumptionIndicatorsWidgetType | null;
    indicatorType: AstueOnpzConsumptionIndicatorType | null;
}

export interface IAstueOnpzPredictorsOptions {
    predictors: IAstueOnpzPredictor[];
    predictorWidgetId: string;
}

export interface IAstueOnpzPredictor {
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
        filterValues: null,
        type: null,
        indicatorType: null,
    });

    private restUrl: string;

    public monitoringOptions$: BehaviorSubject<IAstueOnpzMonitoringOptions> = new BehaviorSubject({
        manufactureName: null,
        unitName: null,
        type: null,
        indicatorType: null
    });

    public multilineChartIndicatorTitle$: BehaviorSubject<string> =
        new BehaviorSubject<string>('');

    public predictorsOptions$: BehaviorSubject<IAstueOnpzPredictorsOptions> = new BehaviorSubject(null);

    public colors$: BehaviorSubject<Map<string, number>> =
        new BehaviorSubject<Map<string, number>>(new Map());
    private colors: number = 6;

    public sharedMonitoringOptions: Observable<IAstueOnpzMonitoringOptions> =
        this.monitoringOptions$.asObservable();

    public sharedIndicatorOptions: Observable<IAstueOnpzMonitoringCarrierOptions> =
        this.indicatorOptions$.asObservable();

    public sharedPlanningGraph$: BehaviorSubject<IPlanningChart> = new BehaviorSubject(null);

    private multiLinePredictorsChart$: BehaviorSubject<IMultiChartLine[]> =
        new BehaviorSubject<IMultiChartLine[]>(null);

    get multiLinePredictors(): Observable<IMultiChartLine[]> {
        return this.multiLinePredictorsChart$.asObservable();
    }

    constructor(
        private http: HttpClient,
        private configService: AppConfigService,
    ) {
        this.restUrl = configService.restUrl;
    }

    public setMultiLinePredictors(value: IMultiChartLine[]): void {
        const val = !!value ? value : null;
        this.multiLinePredictorsChart$.next(val);
    }

    public setMonitoringOptions(options: IAstueOnpzMonitoringOptions): void {
        this.monitoringOptions$.next(options);
    }

    public setPredictors(predictorWidgetId: string, predictors: IAstueOnpzPredictor[]): void {
        if (predictors.some((x) => x.name !== this.sharedPlanningGraph$.getValue()?.title)) {
            this.setPlanningGraph(null);
        }
        this.predictorsOptions$.next({ predictors, predictorWidgetId });
    }

    public setPlanningGraph(graph: IPlanningChart, isDemand: boolean = false): void {
        if (this.sharedPlanningGraph$.getValue()?.title === graph?.title && !isDemand) {
            this.sharedPlanningGraph$.next(null);
            return;
        }
        this.sharedPlanningGraph$.next(graph);
    }

    public updateIndicatorFilter(key: string, action: 'add' | 'delete'): void {
        let isChange: boolean = false;
        const filterArray =
            this.indicatorOptions$
                .getValue()
                ?.filterValues?.split(';')
                ?.filter((f) => f !== '') ?? [];
        switch (action) {
            case 'add':
                if (!filterArray.includes(key)) {
                    filterArray.push(key);
                    isChange = true;
                }
                break;
            case 'delete':
                const idx = filterArray.findIndex((f) => f === key);
                if (idx !== -1) {
                    filterArray.splice(idx, 1);
                    isChange = true;
                }
                break;
        }
        if (!isChange) {
            return;
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
        this.nextMonitoringCarrierOptions<AstueOnpzConsumptionIndicatorsWidgetType>('type', typeParam);
    }

    public updateIndicator(
        indicatorTypeParam: AstueOnpzConsumptionIndicatorType,
        typeParam: AstueOnpzConsumptionIndicatorsWidgetType
    ): void {
        const currentOptions = this.monitoringOptions$.getValue();
        if (
            currentOptions.type === typeParam &&
            currentOptions.indicatorType === indicatorTypeParam
        ) {
            indicatorTypeParam = null;
            typeParam = null;
        }
        this.monitoringOptions$.next({
            ...this.monitoringOptions$.value,
            ...{
                indicatorType: indicatorTypeParam,
                type: typeParam
            }
        });
        this.indicatorOptions$.next({
            ...this.indicatorOptions$.value,
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
        if (this.colors === 0) {
            this.colors = 6;
        }
        const color = this.colors--;
        colors.set(tag, color);
        this.colors$.next(colors);
    }

    public deleteTagToColor(color: number, tag: string): void {
        this.colors++;
        const colors = this.colors$.getValue();
        colors.delete(tag);
        this.colors$.next(colors);
    }

    public clearColors(): void {
        this.colors = 6;
        this.colors$.next(new Map());
    }

    public async predict(unitIdValue: number): Promise<void>  {
        try {
            return await this.http
                .post<void>(`${this.restUrl}/api/predictor/predict`, {
                    unitId: unitIdValue,
                })
                .toPromise();
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async getProductChannels(widgetId: string, options: IAstueOnpzMonitoringOptions): Promise<string[]> {
        const response = await this.http
            .get<{id: string}[]>(`${this.restUrl}/api/widget-data/${widgetId}/sub-channels?UnitName=${options.unitName}&ManufactureName=${options.manufactureName}&Type=${options.type}&TypeValue=${options.indicatorType}`)
            .toPromise();
        return response?.map(x => x.id) ?? [];
    }
}
