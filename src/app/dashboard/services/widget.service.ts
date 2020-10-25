import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GridsterItem } from 'angular-gridster2';
import { IWidget } from '../models/widget.model';
import { AppConfigService } from '@core/service/app-config.service';
import { EventsWidgetDataPreview } from '../models/EVJ/events-widget';
import { LineChartData } from '../models/line-chart';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/internal/observable/dom/webSocket';
import { AuthService } from '@core/service/auth.service';
import * as moment from 'moment';
import { SnackBarService } from './snack-bar.service';
import { IError } from '../models/error';

export interface IDatesInterval {
    fromDateTime: Date;
    toDateTime: Date;
}

interface IWebSocket<TData, TOption> {
    actionType: 'authenticate' | 'subscribe' | 'unsubscribe' | 'appendOptions';
    channelId: string;
    subChannelId?: string;
    selectedPeriod?: IDatesInterval;
    token?: string; // Bearer token for authenticate actionType
    data?: TData;
    options?: IWebSocketOptions<TOption>;
    subscriptionOptions?: any; // return option from back
    error?: IError;
}

interface IWebSocketOptions<T> {
    timeStamp: number;
    optionValues: T;
}

@Injectable({
    providedIn: 'root'
})
export class WidgetService {
    private readonly wsUrl: string;
    private readonly restUrl: string;
    private readonly reconnectInterval: number;

    public ws: WebSocketSubject<IWebSocket<any, IWebSocketOptions<any>>> = null;
    private widgetsSocketObservable: BehaviorSubject<any> = new BehaviorSubject(null);

    public draggingItem: GridsterItem;
    public dashboard: GridsterItem[] = [];

    private widgets$: BehaviorSubject<IWidget[]> = new BehaviorSubject([]);
    public widgets: Observable<IWidget[]> = this.widgets$
        .asObservable()
        .pipe(filter((item) => item !== null));
    public widgetsPanel$: Observable<IWidget[]> = this.widgets$.asObservable().pipe(
        filter((item) => item !== null),
        map((widgets) => widgets.filter((widget) => widget.isClaim))
    );

    private reconnectWsTimer: ReturnType<typeof setTimeout>;
    private reconnectRestTimer: ReturnType<typeof setTimeout>;

    public currentDates$: BehaviorSubject<IDatesInterval> = new BehaviorSubject<IDatesInterval>(null);
    public filterWidgets$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    // открытые каналы ws на текущем экране
    private openedWsChannels: { [key: string]: { count: number, options: IWebSocketOptions<any>, parentChannelId?: string } } = {};

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
            this.dashboard.forEach((el) => {
                // tslint:disable-next-line:forin
                for (const channel in this.openedWsChannels) {
                    let widgetId = channel;
                    let channelId = null;
                    if (!!this.openedWsChannels[channel].parentChannelId) {
                        widgetId = this.openedWsChannels[channel].parentChannelId;
                        channelId = channel;
                    }
                    this.wsAppendOptions(widgetId, this.openedWsChannels[channel]?.options, channelId);
                }
            });
        });

        setInterval(() => this.reloadPage(), 1800000);
    }

    public get allWidgets(): IWidget[] {
        return this.widgets$.getValue();
    }

    private getAvailableWidgets(): Observable<IWidget[]> {
        return this.http
            .get(this.restUrl + `/api/user-management/Claim/user/GetAvailableWidgets`)
            .pipe(
                map((ans: { data: IWidget[] }) => {
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

    // TODO delete
    mapData(data: IWidget[]): IWidget[] {
        return data.map((item: IWidget) => {
            return {
                code: item.code,
                id: item.id,
                name: item.name,
                title: item.title,
                units: item.units,
                widgetOptions: item.widgetOptions,
                widgetType: item.widgetType,
                categories: item.categories,
                isClaim: item.isClaim,
                isVideoWall: item.isVideoWall,
                isHidden: item.isHidden,
                sensorId: item.sensorId,
                attributes: item.attributes
            };
        });
    }

    getName(widgetId: string): string {
        const widgetNames: IWidget = this.widgets$.getValue().find((x) => x.id === widgetId);
        if (widgetNames) {
            return widgetNames.widgetType;
        }
    }

    removeItemService(uniqId: string): void {
        const idx = this.dashboard.findIndex((item) => item.uniqid === uniqId) ?? null;
        if (idx !== -1) {
            this.dashboard.splice(idx, 1);
        }
    }

    getWidgetChannel(widgetId: string): Observable<IWidget> {
        return this.widgets.pipe(map((i) => i.find((x) => x.id === widgetId)));
    }

    // TODO delete and change to getChannelLiveDataFromWs
    getWidgetLiveDataFromWS(widgetId: string, widgetType: string): Observable<any> {
        if (!widgetId || !widgetType) {
            return;
        }
        this.wsConnect(widgetId);
        if (this.openedWsChannels[widgetId]) {
            this.openedWsChannels[widgetId].count++;
        } else {
            this.openedWsChannels[widgetId] = {
                count: 1,
                options: null
            };
        }
        return this.widgetsSocketObservable.pipe(
            filter((ref) => ref?.channelId === widgetId),
            map((ref) => {
                return this.mapWidgetData(ref.data, widgetType);
            })
        );
    }

    getChannelLiveDataFromWs<T>(channelId: string, widgetId: string): Observable<T> {
        if (!widgetId || !channelId) {
            return;
        }
        this.wsConnect(widgetId, null, channelId);
        if (this.openedWsChannels[channelId]) {
            this.openedWsChannels[channelId].count++;
        } else {
            this.openedWsChannels[channelId] = {
                count: 1,
                parentChannelId: widgetId,
                options: null
            };
        }
        return this.widgetsSocketObservable.pipe(
            filter((ref) => ref?.channelId === channelId),
            map((ref) => ref?.data ?? null),
            filter((ref) => ref !== null)
        );
    }

    setChannelLiveDataFromWsOptions<T>(widgetId: string, options: T, channelId: string = null): void {
        if (!widgetId) {
            return;
        }
        if (this.openedWsChannels[widgetId]) {
            this.openedWsChannels[widgetId].options = {
                optionValues: options,
                timeStamp: new Date().getTime()
            };
        }
        this.wsAppendOptions(widgetId, this.openedWsChannels[widgetId]?.options, channelId);
    }

    private wsConnect(widgetId: string, options: IWebSocketOptions<any> = null, channelId: string = null): void {
        this.ws.next({
            actionType: 'subscribe',
            channelId: widgetId,
            subChannelId: channelId,
            selectedPeriod: this.currentDates$.getValue(),
            options
        });
    }

    private wsAppendOptions(widgetId: string, options: any, channelId: string = null): void {
        this.ws.next({
            actionType: 'appendOptions',
            channelId: widgetId,
            subChannelId: channelId,
            selectedPeriod: this.currentDates$.getValue(),
            options
        });
    }

    public wsDisconnect(widgetId: string, channelId: string = null): void {
        this.ws.next({
            actionType: 'unsubscribe',
            channelId: widgetId,
            subChannelId: channelId
        });
    }

    // TODO delete channels by widget
    public removeWidget(widgetId: string): void {
        if (!this.openedWsChannels[widgetId]) {
            return;
        }
        if (this.openedWsChannels[widgetId].count === 1) {
            this.wsDisconnect(widgetId);
            delete this.openedWsChannels[widgetId];
        } else if (this.openedWsChannels[widgetId]) {
            this.openedWsChannels[widgetId].count--;
        }
    }

    // TODO
    public removeChannel(widgetId: string, channelId: string): void {
        if (!this.openedWsChannels[channelId]) {
            return;
        }
        if (this.openedWsChannels[channelId].count <= 1) {
            this.wsDisconnect(widgetId, channelId);
            delete this.openedWsChannels[channelId];
        } else if (this.openedWsChannels[channelId]) {
            this.openedWsChannels[channelId].count--;
        }
    }

    private mapWidgetData(data: any, widgetType: string): any {
        switch (widgetType) {
            case 'events':
                return this.mapEventsWidgetDataPreview(data as EventsWidgetDataPreview);
            case 'line-chart':
                return this.mapLineChartData(data as LineChartData);
            default:
                return data;
        }
    }

    // TODO replace to event widget
    private mapEventsWidgetDataPreview(data: EventsWidgetDataPreview): EventsWidgetDataPreview {
        data.notification.eventDateTime = new Date(data.notification.eventDateTime);
        return data;
    }

    // TODO replace to line-chart widget
    private mapLineChartData(data: LineChartData): LineChartData {
        data.graphs.forEach((g) => {
            g.values.forEach((v) => (v.date = new Date(v.date)));
        });
        return data;
    }

    public getRest(): void {
        this.getAvailableWidgets().subscribe(
            (data) => {
                this.widgets$.next(data);
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
            token: this.authService.userSessionToken
        });
        this.ws.subscribe(
            (msg) => {
                console.log('message received');
                if (msg?.error) {
                    this.materialController.openSnackBar(msg.error.message.message);
                }
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
            if (
                data?.data
                && this.isMatchingPeriod(data?.data?.selectedPeriod, data?.data?.isHistoricalSupport)
                && this.isMatchingOptions(data?.data?.subscriptionOptions?.timeStamp, data?.channelId)
            ) {
                this.widgetsSocketObservable.next(data);
            }
        });
    }

    private isMatchingPeriod(incoming: IDatesInterval, isHistoricalSupport: boolean): boolean {
        if (!isHistoricalSupport) {
            return true;
        }
        if (!incoming) {
            return this.currentDates$.getValue() === null;
        }
        return (
            new Date(incoming.fromDateTime).getTime() ===
            new Date(this.currentDates$.getValue()?.fromDateTime).getTime() &&
            new Date(incoming.toDateTime).getTime() ===
            new Date(this.currentDates$.getValue()?.toDateTime).getTime()
        );
    }

    private isMatchingOptions(incoming: number, widgetId: string): boolean {
        if (!incoming) {
            return true;
        }
        return (this.openedWsChannels[widgetId]?.options?.timeStamp === incoming);
    }

    private reconnectWs(): void {
        if (this.reconnectWsTimer) {
            console.warn('reconnect уже создан');
            return;
        }
        this.materialController.openSnackBar('Переподключение к данным реального времени');
        this.reconnectWsTimer = setInterval(() => {
            this.initWS();
            // tslint:disable-next-line:forin
            for (const channel in this.openedWsChannels) {
                let widgetId = channel;
                let channelId = null;
                if (!!this.openedWsChannels[channel].parentChannelId) {
                    widgetId = this.openedWsChannels[channel].parentChannelId;
                    channelId = channel;
                }
                this.wsConnect(widgetId, this.openedWsChannels[channel]?.options, channelId);
            }
        }, this.reconnectInterval);
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
