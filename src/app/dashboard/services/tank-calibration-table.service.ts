import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './../../services/appConfigService';
import { ICalibrationTable } from '../widgets/tank-calibration-table/tank-calibration-table.component';

@Injectable({
    providedIn: 'root',
})
export class TankCalibrationTableService {

    private readonly restUrl: string;

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    async getTankAvailable(): Promise<any[]> {
        return this.http
            .get<any[]>(
                this.restUrl + `/api/graduation-table/Graduation/tanks/available`
            )
            .toPromise();
    }

    async getTanks(): Promise<ICalibrationTable[]> {
        return this.http
            .get<ICalibrationTable[]>(
                this.restUrl + `/api/graduation-table/Graduation/tanks`
            )
            .toPromise();
    }

    async getHistoryTanks(id: string): Promise<any[]> {
        return this.http
            .get<any[]>(
                this.restUrl + `/api/graduation/tanks/${id}/history`
            )
            .toPromise();
    }

    async postMemberFromBrigade(id: number, newDate: string, comment: string): Promise<any> {
        return this.http
            .post(this.restUrl + `/api/graduation/tanks/${id}/table/date`, {
                newDate,
                comment,
            })
            .toPromise();
    }

    async putTank(id: string): Promise<any> {
        try {
            return this.http
                .put(this.restUrl + `/api/graduation-table/Graduation/tanks/${id}`, null)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteTank(id: string): Promise<void> {
        return await this.http
            .delete<void>(this.restUrl + `/ api / graduation / tanks / ${id}`)
            .toPromise();
    }

}
