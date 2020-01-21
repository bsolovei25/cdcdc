import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/index';
import { EventsWidgetNotification, IStatus, ICategory } from '../models/events-widget';
import { AppConfigService } from 'src/app/services/appConfigService';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private readonly restUrl: string;

    event$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    updateEvent$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    async getEvent(id: number): Promise<EventsWidgetNotification> {
        // TODO check
        try {
            return this.http
                .get<EventsWidgetNotification>(this.restUrl + '/notifications/' + id, { withCredentials: true })
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async postEvent(body: EventsWidgetNotification): Promise<any> {
        // TODO check
        try {
            return this.http.post(this.restUrl + '/notifications/', body, { withCredentials: true }).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async putEvent(body: EventsWidgetNotification): Promise<any> {
        // TODO check
        try {
            return this.http.put(this.restUrl + '/notifications/' + body.id, body, { withCredentials: true }).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteEvent(id: number): Promise<any> {
        // TODO check
        try {
            return this.http.delete(this.restUrl + '/notifications/' + id, { withCredentials: true }).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getStatus(): Promise<IStatus[]> {
        // TODO check
        try {
            return this.http
                .get<IStatus[]>(this.restUrl + '/api/notification-reference/status', { withCredentials: true })
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getPriority(): Promise<any> {
        // TODO check
        try {
            return this.http.get(this.restUrl + '/api/notification-reference/priority', { withCredentials: true }).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getCategory(): Promise<ICategory[]> {
        try {
            return this.http
                .get<ICategory[]>(this.restUrl + '/api/notification-reference/category', { withCredentials: true })
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getEventType(): Promise<ICategory[]> {
        try {
            return this.http
                .get<ICategory[]>(this.restUrl + '/api/notification-reference/eventtype', { withCredentials: true })
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getPlace(): Promise<any> {
        try {
            return this.http
                .get<any>(this.restUrl + '/api/notification-reference/place', { withCredentials: true })
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getUser(): Promise<any> {
        try {
            return this.http.get<any>(this.restUrl + '/api/user-management/users', { withCredentials: true }).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getEquipmentCategory(): Promise<any> {
        try {
            return this.http
                .get<any>(this.restUrl + '/api/notification-reference/equipmentcategory', { withCredentials: true })
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
                        `/api/notification-retrieval/${eventId}/retrievalevents/${retrievalEvents.id}`,
                    retrievalEvents,
                    { withCredentials: true }
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
                    body,
                    { withCredentials: true }
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteRetrievalEvents(idEvent: number, idRetr: number) {
        try {
            return this.http
                .delete<any>(
                    this.restUrl +
                        `/api/notification-retrieval/${idEvent}/retrievalevents/${idRetr}`,
                        { withCredentials: true }
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }
}
