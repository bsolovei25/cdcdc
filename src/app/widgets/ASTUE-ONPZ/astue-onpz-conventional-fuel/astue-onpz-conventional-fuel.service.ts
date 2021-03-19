import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';

export interface IAstueOnpzConventionalFuelTransfer {
    predictors: any[];
    plan: any;
    fact: any;
    factModel: any;
    units: string;
}

export interface IAstueOnpzConventionalFuelSelectOptions {
    manufacture: string;
    unit: string;
    resource: string;
}

export interface IAstueOnpzReferences {
    manufacturies: IAstueOnpzReferenceModel[];
    units: IAstueOnpzReferenceModel[];
    energyResources: IAstueOnpzReferenceModel[];
}

export interface IAstueOnpzReferenceModel {
    id: string;
    parentId?: string;
    name: string;
}

@Injectable({
    providedIn: 'root',
})
export class AstueOnpzConventionalFuelService {
    public selectReferences$: BehaviorSubject<IAstueOnpzReferences> = new BehaviorSubject<IAstueOnpzReferences>({
        manufacturies: [],
        units: [],
        energyResources: [],
    });

    public defaultSelectOptions: IAstueOnpzConventionalFuelSelectOptions = {
        manufacture: 'Производство №1',
        unit: 'АВТ-10',
        resource: 'Топливо',
    };

    public readonly selectFuelReference: string[] = [
        'Топливо',
        'Потребление тепла',
        'Выработка тепла',
        'Потребление электроэнергии',
    ];
    public selectedOptions: Observable<IAstueOnpzConventionalFuelSelectOptions>;
    public selectedOptions$: BehaviorSubject<IAstueOnpzConventionalFuelSelectOptions> = new BehaviorSubject<IAstueOnpzConventionalFuelSelectOptions>(
        this.defaultSelectOptions
    );

    public paddingLegend$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    public predictorsInfo$: BehaviorSubject<IAstueOnpzConventionalFuelTransfer> = new BehaviorSubject<IAstueOnpzConventionalFuelTransfer>(
        null
    );

    public predictorsId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    private readonly restUrl: string;

    constructor(private http: HttpClient, appConfigService: AppConfigService) {
        this.restUrl = appConfigService.restUrl;
    }

    public changeSelectedForm(options: IAstueOnpzConventionalFuelSelectOptions): void {
        const isValid = !Object.values(options).some((x) => !x);
        if (!isValid) {
            return;
        }
        const ref = this.selectReferences$.getValue();
        options.manufacture = ref.manufacturies.find((x) => x.id === options.manufacture)?.name;
        options.unit = ref.units.find((x) => x.id === options.unit)?.name;
        options.resource = ref.energyResources.find((x) => x.id === options.resource)?.name;
        this.setSelectedOptions(options);
    }

    public setSelectedOptions(options: IAstueOnpzConventionalFuelSelectOptions): void {
        this.selectedOptions$.next({ ...options });
    }

    public async getSelectionReferences(widgetId: string): Promise<IAstueOnpzReferences> {
        try {
            const url = `${this.restUrl}/api/debugging-service-EnergyControl/ec/Metadata/get-catalog/${widgetId}`;
            return await this.http.get<IAstueOnpzReferences>(url).toPromise();
        } catch (e) {
            console.error('getSelectionReferences', e);
        }
    }
}
