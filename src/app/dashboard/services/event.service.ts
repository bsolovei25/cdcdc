import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs/index';
import { filter, map, switchMap } from 'rxjs/internal/operators';
import { webSocket } from 'rxjs/internal/observable/dom/webSocket';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import {
    EventsWidgetCategoryCode,
    EventsWidgetData, EventsWidgetFilter, EventsWidgetFilterCode,
    EventsWidgetNotification,
    EventsWidgetNotificationsCounter,
    IStatus
} from '../models/events-widget';
import { LineChartData } from '../models/line-chart';
import { Machine_MI } from '../models/manual-input.model';
import { AppConfigService } from 'src/app/services/appConfigService';

@Injectable({
    providedIn: 'root'
})


export class EventService {

    lineChartLiveData: Observable<LineChartData>;
    newData: BehaviorSubject<true> = new BehaviorSubject<true>(true);

    private readonly wsUrl: string;
    private readonly restUrl: string;

    private ws: WebSocketSubject<any> = null;
    private wsSubscribtion: Subscription;

    event$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);
    updateEvent$: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);


    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
        this.wsUrl = configService.wsUrl;
    }

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

    async getCategory(): Promise<EventsWidgetCategoryCode> {
        // TODO check
        try {
            return this.http.get<EventsWidgetCategoryCode>(this.restUrl + '/api/notification-reference/category').toPromise();
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
            return this.http.get<any>(this.restUrl + '/api/notification-reference/user').toPromise();
        } catch (error) {
            console.error(error);
        }
    }


    async deleteRetrievalEvents(idEvent: number, idRetr: number) {
        try {
            return this.http.get<any>(this.restUrl + `/api/notification-retrieval/${idEvent}/retrievalevents/${idRetr}`).toPromise();
        } catch (error) {
            console.error(error);
        }
    }





}
