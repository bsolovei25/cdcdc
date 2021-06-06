import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPlanningChart } from '../ec-widget-planing-charts/ec-widget-planing-charts.component';
import {
    IMultiChartLine,
    IMultiChartTransfer,
} from '@dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import { AppConfigService } from '@core/service/app-config.service';
import { HttpClient } from "@angular/common/http";
import { lineColors } from "@widgets/EC/ec-widget-shared/constants/colors.const";

export type AstueOnpzConsumptionIndicatorsWidgetType = 'Deviation' | 'Consumption';

export type AstueOnpzConsumptionIndicatorType = 'Money' | 'Percent' | 'Absolute';

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

export interface IPredictorsLabelsData {
    predictors: IPredictorCurrentValue[];
}

export interface IPredictorCurrentValue {
    val: number;
    color: string;
    units?: string;
}

@Injectable({
    providedIn: 'root',
})
export class EcWidgetService {
    public selectedItem$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public multilineChartIndicatorTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public predictorsOptions$: BehaviorSubject<IAstueOnpzPredictorsOptions> = new BehaviorSubject(null);
    public colors$: BehaviorSubject<Map<string, number>> = new BehaviorSubject<Map<string, number>>(new Map());
    public selectedEnergyResource$: BehaviorSubject<string | null> = new BehaviorSubject<string>(null);
    public selectedPredictor$: BehaviorSubject<string | null> = new BehaviorSubject<string|null>(null);
    public sharedPlanningGraph$: BehaviorSubject<IPlanningChart> = new BehaviorSubject(null);
    public multilineChartTransfer: BehaviorSubject<IMultiChartTransfer> = new BehaviorSubject<IMultiChartTransfer>(
        null
    );
    public predictorsCurrentValue$: BehaviorSubject<IPredictorsLabelsData> = new BehaviorSubject<IPredictorsLabelsData>(null);

    private indicatorOptions$: BehaviorSubject<IAstueOnpzMonitoringCarrierOptions> = new BehaviorSubject({
        manufactureName: null,
        unitName: null,
        itemId: null,
        filterValues: null,
        type: null,
        indicatorType: null,
    });
    private restUrl: string;
    private colorsCount: number = 6;
    private currentColors: number[] = [];
    private multiLinePredictorsChart$: BehaviorSubject<IMultiChartLine[]> = new BehaviorSubject<IMultiChartLine[]>(
        null
    );

    public sharedIndicatorOptions: Observable<IAstueOnpzMonitoringCarrierOptions> = this.indicatorOptions$.asObservable();

    constructor(private http: HttpClient, private configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public setMultiLinePredictors(value: IMultiChartLine[]): void {
        const val = !!value ? value : null;
        this.multiLinePredictorsChart$.next(val);
    }

    public setSelectedEnergyResource(resourceId: string): void {
        this.selectedEnergyResource$.next(resourceId);
    }

    public setSelectedPredictor(predictorId: string): void {
        this.selectedPredictor$.next(predictorId);
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

    public dropDataStream(): void {
        const val = this.indicatorOptions$.getValue();
        val.filterValues = null;
        this.indicatorOptions$.next(val);
    }

    public addTagToColor(tag: string): void {
        const colors = this.colors$.getValue();
        const predictorsCount = 4;
        let color;

        for (let i = this.colorsCount; i > this.colorsCount - predictorsCount; i--) {
            if (this.currentColors.find(item => item === i)) {
                continue;
            }
            color = i;
            break;
        }
        this.currentColors.push(color);
        colors.set(tag, color);
        this.colors$.next(colors);
    }

    public deleteTagToColor(color: number, tag: string): void {
        const colors = this.colors$.getValue();

        this.currentColors = this.currentColors.filter(item => item !== color);
        colors.delete(tag);
        this.colors$.next(colors);
    }

    public clearColors(): void {
        this.currentColors = [];
        this.colors$.next(new Map());
    }

    public setPredictorsCurrentValue(data: IPlanningChart[]): void {
        const currentValues: IPredictorsLabelsData = {predictors: []};
        const colors = this.colors$.getValue();

        data.forEach( ({currentFactValue, tag, units}) => {
            currentValues.predictors.push({
                val: currentFactValue,
                color: lineColors[colors.get(tag)],
                units,
            })
        });

        this.predictorsCurrentValue$.next(currentValues);
    }
}
