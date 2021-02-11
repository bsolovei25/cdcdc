import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { BehaviorSubject } from 'rxjs';
import { ISmpEvent, ISmpEventCard, ISmpEventStatusStatistics } from '../../../models/SMP/smp-events.model';

@Injectable({
    providedIn: 'root',
})
export class SmpEventsService {
    private readonly restUrl: string;

    public event$: BehaviorSubject<ISmpEvent> = new BehaviorSubject<ISmpEvent>(null);
    public set event(value: ISmpEvent) {
        this.event$.next(value);
    }
    public get event(): ISmpEvent {
        return this.event$.getValue();
    }

    public isEventLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public set isLoading(value: boolean) {
        this.isEventLoading$.next(value);
    }

    constructor(private http: HttpClient, private configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getStats(statusId?: number): Promise<ISmpEventStatusStatistics> {
        const url: string = `${this.restUrl}/api/notifications/stats-smp`;
        const params: HttpParams = new HttpParams();
        if (statusId) {
            params.append('StatusId', statusId.toString());
        }
        return await this.http
            .get<ISmpEventStatusStatistics>(url, { params })
            .toPromise();
    }

    public async getEventsByFilter(statusId?: number): Promise<ISmpEventCard[]> {
        const url: string = `${this.restUrl}/api/notifications/getbyfilter-smp`;
        let params: HttpParams = new HttpParams();
        if (statusId) {
            params = params.append('StatusId', statusId.toString());
        }
        return await this.http
            .get<ISmpEventCard[]>(url, { params })
            .toPromise();
    }

    public async getFullEvent(id: number): Promise<ISmpEvent> {
        const url: string = `${this.restUrl}/api/notifications/smp/${id}`;
        return this.http.get<ISmpEvent>(url).toPromise();
    }
}
