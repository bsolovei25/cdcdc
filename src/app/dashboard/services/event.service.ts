import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/index';
import {
    EventsWidgetNotification,
    IStatus,
    ICategory,
    EventsWidgetDataPreview,
    EventsWidgetOptions,
    EventsWidgetsStats,
    EventsWidgetNotificationPreview,
} from '../models/events-widget';
import { AppConfigService } from 'src/app/services/appConfigService';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private readonly restUrl: string;
    private readonly batchSize: number = 50;

    event$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    updateEvent$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    async getBatchData(
        lastId: number,
        options: EventsWidgetOptions
    ): Promise<EventsWidgetNotificationPreview[]> {
        try {
            return this.http
                .get<EventsWidgetNotificationPreview[]>(
                    this.restUrl +
                        `/api/notifications/getbyfilter?${this.getOptionString(lastId, options)}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    public async getStats(options: EventsWidgetOptions): Promise<EventsWidgetsStats> {
        try {
            return this.http
                .get<EventsWidgetsStats>(
                    this.restUrl + `/api/notifications/stats?${this.getOptionString(0, options)}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getEvent(id: number): Promise<EventsWidgetNotification> {
        try {
            return this.http
                .get<EventsWidgetNotification>(this.restUrl + '/notifications/' + id)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async postEvent(body: EventsWidgetNotification): Promise<any> {
        try {
            return this.http.post(this.restUrl + '/notifications/', body).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async putEvent(body: EventsWidgetNotification): Promise<any> {
        try {
            return this.http.put(this.restUrl + '/notifications/' + body.id, body).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteEvent(id: number): Promise<any> {
        try {
            return this.http.delete(this.restUrl + '/notifications/' + id).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getStatus(): Promise<IStatus[]> {
        try {
            return this.http
                .get<IStatus[]>(this.restUrl + '/api/notification-reference/status')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getPriority(): Promise<any> {
        try {
            return this.http.get(this.restUrl + '/api/notification-reference/priority').toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getCategory(): Promise<ICategory[]> {
        try {
            return this.http
                .get<ICategory[]>(this.restUrl + '/api/notification-reference/category')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getEventType(): Promise<ICategory[]> {
        try {
            return this.http
                .get<ICategory[]>(this.restUrl + '/api/notification-reference/eventtype')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getPlace(): Promise<any> {
        try {
            return this.http
                .get<any>(this.restUrl + '/api/notification-reference/place')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getUser(): Promise<any> {
        try {
            return this.http.get<any>(this.restUrl + '/api/user-management/users').toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getEquipmentCategory(): Promise<any> {
        try {
            return this.http
                .get<any>(this.restUrl + '/api/notification-reference/equipmentcategory')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async editRetrievalEvents(
        eventId: number,
        retrievalEvents: EventsWidgetNotification
    ): Promise<any> {
        try {
            return this.http
                .put(
                    this.restUrl +
                        `/api/notification-retrieval/${eventId}/retrievalevents/
                        ${retrievalEvents.id}`,
                    retrievalEvents
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async addRetrievalEvents(idEvent: number, body) {
        try {
            return this.http
                .post<any>(
                    this.restUrl + `/api/notification-retrieval/${idEvent}/retrievalevents`,
                    body
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteRetrievalEvents(idEvent: number, idRetr: number): Promise<any> {
        try {
            return await this.http
                .delete<any>(
                    this.restUrl +
                        `/api/notification-retrieval/${idEvent}/retrievalevents/${idRetr}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    private getOptionString(lastId: number, options: EventsWidgetOptions): string {
        let res = `take=${this.batchSize}&lastId=${lastId}&placeNames=ГФУ-2,ГФУ-1?`;
        if (options.dates) {
            res += `fromDateTime=${options.dates?.fromDateTime.toISOString()}&
            toDateTime=${options.dates?.toDateTime.toISOString()}`;
        }
        for (const category of options.categories) {
            res += `categoryIds=${category}`;
        }
        switch (options.filter) {
            case 'all':
                res += '&statusIds=3001&statusIds=3002';
                break;
            case 'closed':
                res += '&statusIds=3003';
                break;
            case 'inWork':
                res += '&statusIds=3002';
                break;
        }
        return res;
    }
}
