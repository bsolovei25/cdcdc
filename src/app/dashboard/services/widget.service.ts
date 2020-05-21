import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { filter, map, tap, debounceTime, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GridsterItem } from 'angular-gridster2';
import { IWidgets } from '../models/widget.model';
import { AppConfigService } from 'src/app/services/appConfigService';
import { EventsWidgetDataPreview } from '../models/events-widget';
import { LineChartData } from '../models/line-chart';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/internal/observable/dom/webSocket';
import { AuthService } from '../../@core/service/auth.service';
import * as moment from 'moment';
import { SnackBarService } from './snack-bar.service';

export interface IDatesInterval {
    fromDateTime: Date;
    toDateTime: Date;
}

interface IWebSocket {
    actionType: 'authenticate' | 'subscribe' | 'unsubscribe' | 'getPeriodData';
    channelId: string;
    selectedPeriod?: IDatesInterval;
    token?: string; // Bearer token for authenticate actionType
    data?: any;
}

@Injectable({
    providedIn: 'root',
})
export class WidgetService {
    private readonly wsUrl: string;
    private readonly restUrl: string;
    private readonly reconnectInterval: number;

    private widgetsSocketObservable: BehaviorSubject<any> = new BehaviorSubject(null);
    public ws: WebSocketSubject<IWebSocket> = null;

    public draggingItem: GridsterItem;
    public dashboard: GridsterItem[] = [];

    private _widgets$: BehaviorSubject<IWidgets[]> = new BehaviorSubject(null);
    public widgets$: Observable<IWidgets[]> = this._widgets$
        .asObservable()
        .pipe(filter((item) => item !== null));

    private reconnectWsTimer: any;
    private reconnectRestTimer: any;

    private currentDates: IDatesInterval = null;
    public currentDates$: BehaviorSubject<IDatesInterval> = new BehaviorSubject<IDatesInterval>(
        null
    );

    filterWidgets$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    constructor(
        public http: HttpClient,
        private authService: AuthService,
        private configService: AppConfigService,
        private materialController: SnackBarService
    ) {
        this.restUrl = configService.restUrl;
        this.wsUrl = configService.wsUrl;
        this.reconnectInterval = configService.reconnectInterval * 1000;

        this.currentDates$.subscribe((ref) => {
            this.wsSetParams(ref);
        });

        setInterval(() => this.reloadPage(), 1800000);
    }

    private getAvailableWidgets(): Observable<IWidgets[]> {
        return this.http
            .get(this.restUrl + `/api/user-management/Claim/user/GetAvailableWidgets`)
            .pipe(
                map((ans: { data: IWidgets[] }) => {
                    return this.mapData(ans.data);
                })
            );
    }

    // Для тестирования скорости работы
    private async getAvailableWidgetsTest(): Promise<void> {
        const arr: number[] = [];
        for (let i = 0; i < 10; i++) {
            const start = new Date().getTime();
            await this.http.get(this.restUrl + `/api/af-service/GetAvailableWidgets`).toPromise();
            await this.http
                .get(this.restUrl + `/api/user-management/Claim/user/GetAvailableWidgets`)
                .toPromise();
            const end = new Date().getTime();
            arr.push(end - start);
        }
        let summ = 0;
        arr.forEach((el) => (summ += el));
        console.log('averageTime: ' + summ / arr.length);
        console.log('maxTime: ' + Math.max.apply(null, arr));
        console.log('minTime: ' + Math.min.apply(null, arr));
    }

    mapData(data: IWidgets[]): IWidgets[] {
        return data.map((item: IWidgets) => {
            return {
                code: item.code,
                id: item.id,
                name: item.name,
                title: item.title,
                units: item.units,
                widgetOptions: item.widgetOptions,
                widgetType: item.widgetType,
                categories: item.categories,
            };
        });
    }

    getName(widgetId: string): string {
        const widgetNames: IWidgets = this._widgets$.getValue().find((x) => x.id === widgetId);
        if (widgetNames) {
            return widgetNames.widgetType;
        }
    }

    removeItemService(uniqid: string): void {
        for (const item of this.dashboard) {
            if (item.uniqid === uniqid) {
                this.dashboard.splice(this.dashboard.indexOf(item), 1);
            }
        }
    }

    getWidgetChannel(widgetId: string): Observable<IWidgets> {
        return this.widgets$.pipe(map((i) => i.find((x) => x.id === widgetId)));
    }

    getWidgetLiveDataFromWS(widgetId: string, widgetType: string): Observable<any> {
        this.wsConnect(widgetId);
        return this.widgetsSocketObservable.pipe(
            filter((ref) => ref && ref.channelId === widgetId),
            map((ref) => {
                return this.mapWidgetData(ref.data, widgetType);
            })
        );
    }

    private wsConnect(widgetId: string): void {
        if (this.currentDates$.getValue() !== null) {
            this.wsPeriodData(widgetId);
        } else {
            this.wsRealtimeData(widgetId);
        }
    }

    private wsRealtimeData(widgetId: string): void {
        this.ws.next({
            actionType: 'subscribe',
            channelId: widgetId,
        });
    }

    private wsPeriodData(widgetId: string): void {
        this.ws.next({
            actionType: 'getPeriodData',
            channelId: widgetId,
            selectedPeriod: this.currentDates$.getValue(),
        });
    }

    public wsDisconnect(widgetId: string): void {
        this.ws.next({
            actionType: 'unsubscribe',
            channelId: widgetId,
        });
    }

    private mapWidgetData(data: any, widgetType: string): any {
        switch (widgetType) {
            case 'events':
                return this.mapEventsWidgetDataPreview(data as EventsWidgetDataPreview);

            case 'line-chart':
                return this.mapLineChartData(data as LineChartData);

            case 'manual-input':
            case 'line-diagram':
            case 'pie-diagram':
            case 'truncated-diagram-counter':
            case 'truncated-diagram-percentage':
            case 'bar-chart':
            case 'map-ecology':
            case 'ring-factory-diagram':
            case 'semicircle-energy':
            case 'dispatcher-screen':
            case 'point-diagram':
            case 'circle-diagram':
            case 'polar-chart':
            case 'solid-gauge-with-marker':
            case 'circle-block-diagram':
            case 'deviation-circle-diagram':
            case 'time-line-diagram':
            case 'ring-energy-indicator':
            case 'calendar-plan':
            case 'operation-efficiency':
            case 'ecology-safety':
            case 'energetics':
            case 'oil-control':
            case 'shift-pass':
            case 'shift-accept':
            case 'column-chart-stacked':
            case 'events-workspace':
            case 'implementation-plan':
            case 'performance-progress-indicators':
            case 'quality-stock':
            case 'product-groups':
            case 'product-groups-short':
            case 'tank-information':
            case 'table-data':
                return data;
        }
        console.warn(`unknown widget type ${widgetType}`);
    }

    private mapEventsWidgetDataPreview(data: EventsWidgetDataPreview): EventsWidgetDataPreview {
        data.notification.eventDateTime = new Date(data.notification.eventDateTime);
        return data;
    }

    private mapLineChartData(data: LineChartData): LineChartData {
        data.graphs.forEach((g) => {
            g.values.forEach((v) => (v.date = new Date(v.date)));
        });
        return data;
    }

    public getRest(): void {
        this.getAvailableWidgets().subscribe(
            (data) => {
                this._widgets$.next(data);
                if (this.reconnectRestTimer) {
                    clearInterval(this.reconnectRestTimer);
                }
            },
            (err) => {
                console.error('error rest', err);
                if (this.authService.userIsAuthenticated) {
                    this.reconnectRest();
                } else {
                    if (this.reconnectRestTimer) {
                        clearInterval(this.reconnectRestTimer);
                    }
                }
            },
            () => {
                console.log('complete');
            }
        );
    }

    private reconnectRest(): void {
        if (this.reconnectRestTimer) {
            console.warn('reconnect уже создан');
            return;
        }
        this.materialController.openSnackBar('Переподключение к хосту');
        this.reconnectRestTimer = setInterval(() => {
            this.getRest();
        }, 5000);
    }

    public initWS(): void {
        if (this.ws) {
            this.ws.complete();
        }
        this.ws = webSocket(this.wsUrl);
        this.ws.next({
            actionType: 'authenticate',
            channelId: null,
            token: this.authService.userSessionToken,
        });
        this.ws.subscribe(
            (msg) => {
                console.log('message received: ' + msg);
                if (this.reconnectWsTimer) {
                    clearInterval(this.reconnectWsTimer);
                }
            },
            (err) => {
                console.log('Error ws: ' + err);
                this.reconnectWs();
            },
            () => {
                console.log('complete');
                this.reconnectWs();
            }
        );
        this.ws.asObservable().subscribe((data) => {
            if (data?.data && this.isMatchingPeriod(data?.data?.selectedPeriod)) {
                this.widgetsSocketObservable.next(data);
                // console.log('data ws');ƒ
            }
        });
    }

    private isMatchingPeriod(incoming: IDatesInterval): boolean {
        if (!incoming) {
            return this.currentDates === null;
        }
        return (
            new Date(incoming.fromDateTime).getTime() ===
                new Date(this.currentDates.fromDateTime).getTime() &&
            new Date(incoming.toDateTime).getTime() ===
                new Date(this.currentDates.toDateTime).getTime()
        );
    }

    private reconnectWs(): void {
        if (this.reconnectWsTimer) {
            console.warn('reconnect уже создан');
            return;
        }
        this.materialController.openSnackBar('Переподключение к данным реального времени');
        this.reconnectWsTimer = setInterval(() => {
            this.initWS();
            this.dashboard.forEach((el) => this.wsConnect(el.id));
        }, this.reconnectInterval);
    }

    public wsSetParams(Dates: IDatesInterval = null): void {
        this.dashboard.forEach((el) => this.wsDisconnect(el.id));
        this.dashboard.forEach((el) => this.wsConnect(el.id));
    }

    public reloadPage(): void {
        const timeFormat = 'HH:mm:ss';
        const currentTime = moment().format(timeFormat);
        if (
            moment(currentTime, timeFormat).isBetween(
                moment('03:00:01', timeFormat),
                moment('03:29:59', timeFormat)
            )
        ) {
            window.location.reload();
        }
    }

    public closeService(): void {
        if (this.reconnectRestTimer) {
            clearInterval(this.reconnectRestTimer);
        }
        if (this.reconnectWsTimer) {
            clearInterval(this.reconnectWsTimer);
        }
        this.dashboard.forEach((el) => this.wsDisconnect(el.id));
        this.dashboard = [];
        this.ws.complete();
        this.ws.unsubscribe();
        this.ws = null;
    }
}
