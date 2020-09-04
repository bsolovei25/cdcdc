import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
    AstueOnpzConsumptionIndicatorsWidgetType,
    AstueOnpzConsumptionIndicatorType,
} from '../astue-onpz-consumption-indicators/astue-onpz-consumption-indicators.component';

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

@Injectable({
    providedIn: 'root',
})
export class AstueOnpzService {

    private indicatorOptions$: BehaviorSubject<IAstueOnpzMonitoringCarrierOptions> =
        new BehaviorSubject({
            manufactureName: null,
            unitName: null,
            itemId: null,
            filterValues: null,
    });

    private monitoringOptions$: BehaviorSubject<IAstueOnpzMonitoringOptions> = new BehaviorSubject({
        manufactureName: null,
        unitName: null,
        type: null,
        indicatorType: null,
    });

    public sharedMonitoringOptions: Observable<IAstueOnpzMonitoringOptions> =
        this.monitoringOptions$.asObservable();

    public sharedIndicatorOptions: Observable<IAstueOnpzMonitoringCarrierOptions> =
        this.indicatorOptions$.asObservable();

    constructor() { }

    public setMonitoringOptions(options: IAstueOnpzMonitoringOptions): void {
        this.monitoringOptions$.next(options);
    }

    public updateManufactureName(manufactureNameParam: string): void {
        this.nextMonitoringOptions<string>('manufactureName', manufactureNameParam);
        this.nextMonitoringCarrierOptions<string>('manufactureName', manufactureNameParam);
    }

    public updateUnitName(unitNameParam: string): void {
        this.nextMonitoringOptions<string>('unitName', unitNameParam);
        this.nextMonitoringCarrierOptions<string>('manufactureName', unitNameParam);
    }

    public updateType(typeParam: AstueOnpzConsumptionIndicatorsWidgetType): void {
        this.nextMonitoringOptions<AstueOnpzConsumptionIndicatorsWidgetType>('type', typeParam);
    }

    public updateIndicator(
        indicatorTypeParam: AstueOnpzConsumptionIndicatorType,
        typeParam: AstueOnpzConsumptionIndicatorsWidgetType
    ): void {
        this.monitoringOptions$.next({
            ...this.monitoringOptions$.value, ...{
                indicatorType: indicatorTypeParam,
                type: typeParam
            }
        });
    }

    private nextMonitoringOptions<T>(key: keyof IAstueOnpzMonitoringOptions, value: T): void {
        this.monitoringOptions$.next({...this.monitoringOptions$.value, ...{ [key]: value }});
    }

    private nextMonitoringCarrierOptions<T>(key: keyof IAstueOnpzMonitoringCarrierOptions, value: T): void {
        this.indicatorOptions$.next({...this.indicatorOptions$.value, ...{ [key]: value }});
    }
}
