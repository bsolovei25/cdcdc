import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfigService } from '../../../services/appConfigService';

@Injectable({
    providedIn: 'root',
})
export class SmpEventsService {
    private readonly restUrl: string;

    constructor(private http: HttpClient, private configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getStatsStatistics(statusId?: number): Promise<any> {
        const url: string = `${this.restUrl}/api/notifications/stats-smp`;
        const params: HttpParams = new HttpParams();
        if (statusId) {
            params.append('StatusId', statusId.toString());
        }
        return await this.http
            .get<any>(url, { params })
            .toPromise();
    }

    public async getEventsByFilter(statusId?: number): Promise<any> {
        const url: string = `${this.restUrl}/api/notifications/stats-smp`;
        const params: HttpParams = new HttpParams();
        if (statusId) {
            params.append('StatusId', statusId.toString());
        }
        return await this.http
            .get<any>(url, { params })
            .toPromise();
    }
}
