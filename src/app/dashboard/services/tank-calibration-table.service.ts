import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';

@Injectable({
    providedIn: 'root',
})
export class TankCalibrationTableService {

    private readonly restUrl: string;

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    async getTankCalibration(): Promise<any[]> {
        return this.http
            .get<any[]>(
                this.restUrl + `/api/graduation/tanks/available`
            )
            .toPromise();
    }

    async getTanks(): Promise<any[]> {
        return this.http
            .get<any[]>(
                this.restUrl + `/api/graduation/tanks`
            )
            .toPromise();
    }

    async getHistoryTanks(id: number): Promise<any[]> {
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

    async deleteBrigade(id: number): Promise<void> {
        return await this.http
            .delete<void>(this.restUrl + `/api/graduation/tanks/${id}`)
            .toPromise();
    }

}
