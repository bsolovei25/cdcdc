import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';

@Injectable({
    providedIn: 'root',
})
export class AdminShiftScheduleService {
    private readonly restUrl: string;

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    async getSchudele(): Promise<any> {
        try {
            return this.http.get<any>(this.restUrl + '/shift-schedule/month').toPromise();
        } catch (error) {
            console.error(error);
        }
    }
}
