import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfigService } from '../../../services/appConfigService';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SmpEventsService {
    private readonly restUrl: string;

    public event$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public set event(value: any) {
        this.event$.next(value);
    }
    public get event(): any {
        return this.event$.getValue();
    }

    constructor(private http: HttpClient, private configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getStats(statusId?: number): Promise<any> {
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
        const url: string = `${this.restUrl}/api/notifications/getbyfilter-smp`;
        const params: HttpParams = new HttpParams();
        if (statusId) {
            params.append('StatusId', statusId.toString());
        }
        return await this.http
            .get<any>(url, { params })
            .toPromise();
    }

    // TOFIX убрать дефолтный id
    public async getFullEvent(id: number = 2333): Promise<any> {
        const url: string = `${this.restUrl}/api/notifications/smp/${id}`;
        return this.http.get<any>(url).toPromise();
    }
}
