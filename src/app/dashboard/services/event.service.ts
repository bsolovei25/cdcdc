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
    EventsWidgetNotificationsCounter
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


    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
        this.wsUrl = configService.wsUrl;
    }

    async getAvailableWidgets(id: number): Promise<any> {
        // TODO check
        try {
            return this.http.get(this.restUrl + '/notifications/' + id).toPromise();
        } catch (error) {
            console.error(error);
        }
    }




}
