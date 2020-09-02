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

@Injectable({
    providedIn: 'root',
})
export class AstueOnpzService {

    private monitoringOptions$: BehaviorSubject<IAstueOnpzMonitoringOptions> = new BehaviorSubject({
        manufactureName: null,
        unitName: null,
        type: null,
        indicatorType: null,
    });

    public sharedMonitoringOptions: Observable<IAstueOnpzMonitoringOptions> = this.monitoringOptions$.asObservable();

    constructor() { }

    public setMonitoringOptions(options: IAstueOnpzMonitoringOptions): void {
        this.monitoringOptions$.next(options);
    }

    public updateManufactureName(manufactureNameParam: string): void {
        this.next<string>('manufactureName', manufactureNameParam);
    }

    public updateUnitName(unitNameParam: string): void {
        this.next<string>('unitName', unitNameParam);
    }

    public updateType(typeParam: AstueOnpzConsumptionIndicatorsWidgetType): void {
        this.next<AstueOnpzConsumptionIndicatorsWidgetType>('type', typeParam);
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

    private next<T>(key: keyof IAstueOnpzMonitoringOptions, value: T): void {
        this.monitoringOptions$.next({...this.monitoringOptions$.value, ...{ [key]: value }});
        console.log(this.monitoringOptions$);
    }
}
