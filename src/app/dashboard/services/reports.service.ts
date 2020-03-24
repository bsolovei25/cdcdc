import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../services/appConfigService';

@Injectable({
    providedIn: 'root',
})
export class ReportsService {

    private readonly restUrl: string;

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    async getReportsTemplate(): Promise<any> {
        try {
            return this.http
                .get<any>(this.restUrl + `/api/report-template/all`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getReportsTemplaste(id: number): Promise<any> {
        try {
            return this.http
                .get<any>(this.restUrl + `/api/report-template/all`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

}
