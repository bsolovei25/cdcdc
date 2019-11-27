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

    async postAvailableWidgets(): Promise<any> {
        // TODO check
        try {
            return this.http.post(this.restUrl + '/notifications', {
                branch: "Производство",
                category: { id: 1004, name: "equipmentStatus", code: 3 },
                comment: "Комментарий, комментарий комментарий",
                description: "Описание описание описание...",
                deviationReason: "Причина отклонения...",
                directReasons: "Прямые причины",
                establishedFacts: "Факты установлены...",
                eventDateTime: new Date,
                eventType: "Предупреждение",
                fixedBy: { id: 4002, firstName: "Петр", lastName: "Петров", email: "test@test", phone: "00123456789" },
                id: 6006,
                place: { id: 5, name: "number" },
                itemNumber: 321128,
                organization: "АО Газпромнефть",
                priority: { id: 2002, name: "warning", code: 1 },
                responsibleOperator: { id: 4001, firstName: "Иван", lastName: "Иванов", email: "1@2", phone: "00123456789" },
                retrievalEvents: [],
                severity: "Critical",
                status: { id: 3001, name: "new", code: 0 },
                iconUrl: "number",
                iconUrlStatus: "number",
                statusName: '',
            }).toPromise();
        } catch (error) {
            console.error(error);
        }
    }




}
