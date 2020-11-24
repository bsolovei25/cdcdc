import { Injectable } from '@angular/core';
import { AppConfigService } from '@core/service/app-config.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IScenario } from '../../../models/APS/aps-tables.model';
import { ITable } from '../../../../widgets/APS/aps-operating-modes/aps-operating-modes.component';

export const scenarioId: number = 186;

@Injectable({
    providedIn: 'root'
})

export class ApsService {
    private readonly restUrl: string;
    showTable$: BehaviorSubject<ITable> = new BehaviorSubject<ITable>(null);

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }
    async getAllScenario(): Promise<IScenario[]> {
        return this.http
            .get<IScenario[]>(
                this.restUrl + `/api/debugging-service-ApsService/Scenario`
            )
            .toPromise();
    }
    async getReferenceBook(table: number): Promise<ITable> {
        return this.http
            .get<ITable>(
                this.restUrl + `/api/debugging-service-ApsService/ReferenceBook/${scenarioId}/${table}`
            )
            .toPromise();
    }
    async getCalculate(): Promise<any> {
        return this.http
            .get<any>(
                this.restUrl + `/api/debugging-service-ApsService/Json/unload/${scenarioId}/folder`
            )
            .toPromise();
    }
}
