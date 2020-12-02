import { Injectable } from '@angular/core';
import { AppConfigService } from '@core/service/app-config.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IScenario } from '../../../models/APS/aps-tables.model';
import { IEditedData, ITable, ITableToDisplay } from '../../../../widgets/APS/aps-operating-modes/aps-operating-modes.component';



@Injectable({
    providedIn: 'root'
})

export class ApsService {
    private readonly restUrl: string;
    public scenarioId: number = 186;
    public tableStruct: number = 0;
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
                this.restUrl + `/api/debugging-service-ApsService/ReferenceBook/${this.scenarioId}/${table}`
            )
            .toPromise();
    }

    async postReferenceBook(params: IEditedData[], data: ITableToDisplay[]): Promise<any> {
        return await this.http
            .post<IEditedData>(this.restUrl + `/api/debugging-service-ApsService/ReferenceBook/${this.scenarioId}/${this.tableStruct}`, params)
            .toPromise();
    }

    async getCalculate(): Promise<any> {
        return this.http
            .get<any>(
                this.restUrl + `/api/debugging-service-ApsService/Json/unload/${this.scenarioId}/folder`
            )
            .toPromise();
    }
}
