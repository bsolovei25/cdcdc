import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './../../services/appConfigService';
import { ICalibrationTable } from '../widgets/tank-calibration-table/tank-calibration-table.component';
import { stringify } from 'querystring';

@Injectable({
    providedIn: 'root',
})
export class TankCalibrationTableService {

    private readonly restUrl: string;

    private restFileUrl: string = '';

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
        this.restFileUrl = configService.fsUrl;
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
                this.restUrl + `/api/graduation-table/Graduation/tanks/${id}/history`
            )
            .toPromise();
    }

    async postNewDate(id: number, body, file: Blob): Promise<any> {
        const data: FormData = new FormData();
        data.append('file', file);
        data.append('comment', body.comment);
        data.append('startDate', body.startDate);
        data.append('endDate', body.endDate);
        return this.http
            .post(this.restUrl + `/api/graduation-table/Graduation/tanks/${id}/table/`, data)
            .toPromise();
    }

    async postDataFile(id: number, newDate: string, comment: string): Promise<any> {
        return this.http
            .post(this.restUrl + `/api/graduation-table/Graduation/tanks/${id}/table/date`, {
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

    async pushXlsFile(file: Blob): Promise<string> {
        const body: FormData = new FormData();
        body.append('uploadFile', file);
        return this.http.post<string>(this.restFileUrl, body).toPromise();
    }

    async deleteTank(id: string): Promise<void> {
        return await this.http
            .delete<void>(this.restUrl + `/ api / graduation / tanks / ${id}`)
            .toPromise();
    }

}
