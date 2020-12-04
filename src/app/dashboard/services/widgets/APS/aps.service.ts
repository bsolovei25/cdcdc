import { Injectable } from '@angular/core';
import { AppConfigService } from '@core/service/app-config.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IScenario } from '../../../models/APS/aps-tables.model';
import {
    IEditedData,
    ITable,
    ITableToDisplay,
} from '../../../../widgets/APS/aps-operating-modes/aps-operating-modes.component';

@Injectable({
    providedIn: 'root',
})
export class ApsService {
    private readonly restUrl: string;
    public scenarioId: number = 186;
    public tableStruct: number = 0;
    showTable$: BehaviorSubject<ITable> = new BehaviorSubject<ITable>(null);
    selectScenario$: BehaviorSubject<IScenario> = new BehaviorSubject<IScenario>(null);

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
        this.selectScenario$.subscribe((ref) => {
            if (!this.tableStruct) {
                return;
            }
            this.getReferenceBook(this.tableStruct, ref.scenarioId);
        });
    }
    async getAllScenario(): Promise<IScenario[]> {
        return this.http
            .get<IScenario[]>(this.restUrl + `/api/debugging-service-ApsService/Scenario`)
            .toPromise();
    }
    async getReferenceBook(table: number, id: number): Promise<ITable> {
        return this.http
            .get<ITable>(
                this.restUrl + `/api/debugging-service-ApsService/ReferenceBook/${id}/${table}`
            )
            .toPromise();
    }
    async getCalculate(id: number): Promise<any> {
        return this.http
            .get<any>(this.restUrl + `/api/debugging-service-ApsService/Json/unload/${id}/folder`)
            .toPromise();
    }
    async postReferenceBook(params: IEditedData[], data: ITableToDisplay[]): Promise<any> {
        return await this.http
            .post<IEditedData>(
                this.restUrl +
                    `/api/debugging-service-ApsService/ReferenceBook/${this.scenarioId}/${this.tableStruct}`,
                params
            )
            .toPromise();
    }
}
