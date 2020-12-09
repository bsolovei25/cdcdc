import { Injectable } from '@angular/core';
import { AppConfigService } from '@core/service/app-config.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { IScenario } from '../../../models/APS/aps-tables.model';
import {
    ITable,
    ITableToDisplay,
} from '../../../../widgets/APS/aps-operating-modes/aps-operating-modes.component';
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ApsService {
    private readonly restUrl: string;
    private readonly tableChunk: number = 50;
    showTable$: BehaviorSubject<ITable> = new BehaviorSubject<ITable>(null);
    selectScenario$: BehaviorSubject<IScenario> = new BehaviorSubject<IScenario>(null);
    selectTable$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
        combineLatest([this.selectScenario$, this.selectTable$])
            .pipe(
                filter((x) => !!x[0] && !!x[1]),
                map((x) => {
                    return { scenario: x[0].scenarioId, table: x[1] };
                })
            )
            .subscribe((ref) => this.getTables(ref.table, ref.scenario));
    }

    async getAllScenario(): Promise<IScenario[]> {
        return this.http
            .get<IScenario[]>(this.restUrl + `/api/debugging-service-ApsService/Scenario`)
            .toPromise();
    }

    async getNextChunk(currentCount: number): Promise<ITable> {
        return await this.getReferenceBook(
            this.selectTable$.value,
            this.selectScenario$.value.scenarioId,
            currentCount
        );
    }

    private async getTables(table: number, scenario: number): Promise<void> {
        const data = await this.getReferenceBook(table, scenario);
        this.showTable$.next(data);
    }

    async getReferenceBook(
        table: number,
        id: number,
        skip: number = 0,
        take: number = this.tableChunk
    ): Promise<ITable> {
        return this.http
            .get<ITable>(
                this.restUrl +
                    `/api/debugging-service-ApsService/ReferenceBook/${id}/${table}?take=${take}&skip=${skip}`
            )
            .toPromise();
    }
    async getCalculate(id: number): Promise<any> {
        return this.http
            .get<any>(this.restUrl + `/api/debugging-service-ApsService/Json/unload/${id}/folder`)
            .toPromise();
    }
    async postReferenceBook(params: ITableToDisplay[], data: ITableToDisplay[]): Promise<any> {
        return await this.http
            .post<ITableToDisplay>(
                this.restUrl +
                    `/api/debugging-service-ApsService/ReferenceBook/${this.selectScenario$.value}/${this.selectTable$.value}`,
                params
            )
            .toPromise();
    }
}
