import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/index';
import {
    EventsWidgetNotification,
    IStatus,
    ICategory
} from '../models/events-widget';

@Injectable({
    providedIn: 'root'
})

export class EventService {

    private readonly restUrl: string;

    event$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    updateEvent$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

    constructor(public http: HttpClient) { }

    async getEvent(id: number): Promise<EventsWidgetNotification> {
        // TODO check
        try {
            return this.http.get<EventsWidgetNotification>(this.restUrl + '/notifications/' + id).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async postEvent(body: EventsWidgetNotification): Promise<any> {
        // TODO check
        try {
            return this.http.post(this.restUrl + '/notifications/', body).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async putEvent(body: EventsWidgetNotification): Promise<any> {
        // TODO check
        try {
            return this.http.put(this.restUrl + '/notifications/' + body.id, body).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteEvent(id: number): Promise<any> {
        // TODO check
        try {
            return this.http.delete(this.restUrl + '/notifications/' + id).toPromise();
        } catch (error) {
            console.error(error);
        }
    }


    async getStatus(): Promise<IStatus[]> {
        // TODO check
        try {
            return this.http.get<IStatus[]>(this.restUrl + '/api/notification-reference/status').toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getPriority(): Promise<any> {
        // TODO check
        try {
            return this.http.get(this.restUrl + '/api/notification-reference/priority').toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getCategory(): Promise<ICategory[]> {
        // TODO check
        try {
            return this.http.get<ICategory[]>(this.restUrl + '/api/notification-reference/category').toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getEventType(): Promise<ICategory[]> {
        // TODO check
        try {
            return this.http.get<ICategory[]>(this.restUrl + '/api/notification-reference/eventtype').toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getPlace(): Promise<any> {
        // TODO check
        try {
            return this.http.get<any>(this.restUrl + '/api/notification-reference/place').toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getUser(): Promise<any> {
        // TODO check
        try {
            return this.http.get<any>(this.restUrl + '/api/user-management/users').toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getEquipmentCategory(): Promise<any> {
        // TODO check
        try {
            return this.http.get<any>(this.restUrl + '/api/notification-reference/equipmentcategory').toPromise();
        } catch (error) {
            console.error(error);
        }
    }


    async editRetrievalEvents(eventId: number, retrievalEvents: EventsWidgetNotification): Promise<any> {
        // TODO check
        try {
            return this.http.put(this.restUrl + `/api/notification-retrieval/${eventId}/retrievalevents/${retrievalEvents.id}`, retrievalEvents).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async addRetrievalEvents(idEvent: number, body) {
        try {
            return this.http.post<any>(this.restUrl + `/api/notification-retrieval/${idEvent}/retrievalevents`, body).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteRetrievalEvents(idEvent: number, idRetr: number) {
        try {
            return this.http.delete<any>(this.restUrl + `/api/notification-retrieval/${idEvent}/retrievalevents/${idRetr}`).toPromise();
        } catch (error) {
            console.error(error);
        }
    }
}
