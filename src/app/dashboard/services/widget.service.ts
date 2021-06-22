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
import { IError } from '../models/@PLATFORM/error.model';

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

type WebSocketType = 'main' | 'additional';

@Injectable({
    providedIn: 'root',
})
export class WidgetService {
    private readonly wsUrl: string;
    private readonly wsAddUrl: string;
    private readonly restUrl: string;
    private readonly restAddUrl: string;
    private readonly reconnectInterval: number;

    public ws: WebSocketSubject<IWebSocket<any, IWebSocketOptions<any>>> = null;
    public wsAdditional: WebSocketSubject<IWebSocket<any, IWebSocketOptions<any>>> = null;
    private widgetsSocketObservable: BehaviorSubject<any> = new BehaviorSubject(null);

    public draggingItem: GridsterItem;
    public dashboard: GridsterItem[] = [];

    private widgets$: BehaviorSubject<IWidget[]> = new BehaviorSubject([]);
    public widgets: Observable<IWidget[]> = this.widgets$.asObservable().pipe(filter((item) => item !== null));
    public widgetsPanel$: Observable<IWidget[]> = this.widgets$.asObservable().pipe(
        filter((item) => item !== null),
        map((widgets) => widgets.filter((widget) => widget.isClaim))
    );

    private reconnectWsTimer: ReturnType<typeof setTimeout>;
    private reconnectRestTimer: ReturnType<typeof setTimeout>;

    public currentDates$: BehaviorSubject<IDatesInterval> = new BehaviorSubject<IDatesInterval>(null);
    public filterWidgets$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    // открытые каналы ws на текущем экране
    private openedWsChannels: {
        [key: string]: {
            count: number;
            options: IWebSocketOptions<any>;
            parentChannelId?: string;
            channelId?: string;
            source?: WebSocketType;
        };
    } = {};

    constructor(
        public http: HttpClient,
        private authService: AuthService,
        private configService: AppConfigService,
        private materialController: SnackBarService
    ) {
        this.restUrl = configService.restUrl;
        this.restAddUrl = configService.restAddUrl;
        this.wsUrl = configService.wsUrl;
        this.wsAddUrl = configService.wsUrlAdd;
        this.reconnectInterval = configService.reconnectInterval * 1000;

        this.currentDates$.subscribe((ref) => {
            this.dashboard.forEach((el) => {
                // tslint:disable-next-line:forin
                for (const channel in this.openedWsChannels) {
                    let widgetId = channel;
                    let channelId = null;
                    if (!!this.openedWsChannels[channel].parentChannelId) {
                        widgetId = this.openedWsChannels[channel].parentChannelId;
                        channelId = this.openedWsChannels[channel].channelId;
                    }
                    this.wsAppendOptions(widgetId, this.openedWsChannels[channel]?.options, channelId);
                }
            });
        });
        setInterval(() => this.reloadPage(), 1800000);
    }

    // TODO: delete
    // public get allWidgets(): IWidget[] {
    //     return this.widgets$.getValue();
    // }

    private getAvailableWidgets(): Observable<IWidget[]> {
        return this.http.get(this.restUrl + `/api/user-management/Claim/user/GetAvailableWidgets`).pipe(
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
            await this.http.get(this.restUrl + `/api/user-management/Claim/user/GetAvailableWidgets`).toPromise();
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
                attributes: item.attributes,
            };
        });
    }

    public async getAvailableChannels<T>(widgetId: string, query: string = ''): Promise<T[]> {
        const restUrl: string = this.getWidgetSource(widgetId) === 'main' ? this.restUrl : this.restAddUrl;
        try {
            return await this.http.get<T[]>(`${restUrl}/api/widget-data/${widgetId}/sub-channels${query}`).toPromise();
        } catch (e) {
            return [];
        }
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

    private getChannelId = (widgetId: string, channelId: string = ''): string => {
        return `${widgetId}${channelId}`;
    };

    private getWidgetSource(widgetId: string): WebSocketType {
        const widget = this.widgets$.getValue().find((x) => x.id === widgetId);
        return !!widget?.attributes?.SourceTypeFlag ? 'additional' : 'main';
    }

    getWidgetChannel(widgetId: string): Observable<IWidget> {
        return this.widgets.pipe(map((i) => i.find((x) => x.id === widgetId)));
    }

    getWidgetLiveDataFromWS<T = any>(widgetId: string, widgetType: string): Observable<T> {
        if (!widgetId || !widgetType) {
            return;
        }
        this.wsConnect(widgetId);
        const id = this.getChannelId(widgetId);
        if (this.openedWsChannels[id]) {
            this.openedWsChannels[id].count++;
        } else {
            this.openedWsChannels[id] = {
                count: 1,
                options: null,
                source: this.getWidgetSource(widgetId),
            };
        }
        return this.widgetsSocketObservable.pipe(
            filter((ref) => ref?.channelId === widgetId && !ref?.subChannelId),
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
        const id = this.getChannelId(widgetId, channelId);
        if (this.openedWsChannels[id]) {
            this.openedWsChannels[id].count++;
        } else {
            this.openedWsChannels[id] = {
                count: 1,
                parentChannelId: widgetId,
                channelId,
                options: null,
                source: this.getWidgetSource(widgetId),
            };
        }
        return this.widgetsSocketObservable.pipe(
            filter((ref) => ref?.channelId === widgetId && ref?.subChannelId === channelId),
            map((ref) => ref?.data ?? null),
            filter((ref) => ref !== null)
        );
    }

    // TODO: change channel
    setChannelLiveDataFromWsOptions<T>(widgetId: string, options: T, channelId: string = null): void {
        if (!widgetId) {
            return;
        }
        if (this.openedWsChannels[widgetId]) {
            this.openedWsChannels[widgetId].options = {
                optionValues: options,
                timeStamp: new Date().getTime(),
            };
        }
        this.wsAppendOptions(widgetId, this.openedWsChannels[widgetId]?.options, channelId);
    }

    private wsConnect(widgetId: string, options: IWebSocketOptions<any> = null, channelId: string = null): void {
        const ws = this.getWidgetSource(widgetId) === 'main' ? this.ws : this.wsAdditional;
        if (!ws) {
            return;
        }
        ws.next({
            actionType: 'subscribe',
            channelId: widgetId,
            subChannelId: channelId,
            selectedPeriod: this.currentDates$.getValue(),
            options,
        });
    }

    private wsAppendOptions(widgetId: string, options: any, channelId: string = null): void {
        const ws = this.getWidgetSource(widgetId) === 'main' ? this.ws : this.wsAdditional;
        if (!ws) {
            return;
        }
        ws.next({
            actionType: 'appendOptions',
            channelId: widgetId,
            subChannelId: channelId,
            selectedPeriod: this.currentDates$.getValue(),
            options,
        });
    }

    public wsDisconnect(widgetId: string, channelId: string = null): void {
        const ws = this.getWidgetSource(widgetId) === 'main' ? this.ws : this.wsAdditional;
        if (!ws) {
            return;
        }
        ws.next({
            actionType: 'unsubscribe',
            channelId: widgetId,
            subChannelId: channelId,
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
        const id = this.getChannelId(widgetId, channelId);
        if (!this.openedWsChannels[id]) {
            return;
        }
        if (this.openedWsChannels[id].count <= 1) {
            this.wsDisconnect(widgetId, channelId);
            delete this.openedWsChannels[id];
        } else if (this.openedWsChannels[id]) {
            this.openedWsChannels[id].count--;
        }
    }

    // TODO: delete
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
        if (this.configService.isErrorDisplay) {
            this.materialController.openSnackBar('Переподключение к хосту');
        }
        this.reconnectRestTimer = setInterval(() => {
            this.getRest();
        }, 5000);
    }

    public initWS(type: WebSocketType = null): void {
        const initWsSub = (ws, url, socketType) => {
            if (!url) {
                return;
            }
            if (ws) {
                ws.complete();
            }
            ws = webSocket(url);
            ws.next({
                actionType: 'authenticate',
                channelId: null,
                token: this.authService.userSessionToken,
            });
            ws.subscribe(
                (msg) => {
                    if (msg?.error && this.configService.isErrorDisplay) {
                        const errorType = msg.error.message.type;
                        if (errorType === 'message') {
                            console.warn('477', msg.error.messages);
                        } else {
                            this.materialController.openSnackBar(msg.error.message.message, errorType);
                        }
                    }
                    if (this.reconnectWsTimer) {
                        clearTimeout(this.reconnectWsTimer);
                        this.reconnectWsTimer = null;
                    }
                },
                (err) => {
                    console.log('Error ws: ' + err);
                    this.reconnectWs(socketType);
                },
                () => {
                    console.log('complete');
                    this.reconnectWs(socketType);
                }
            );
            ws.asObservable().subscribe((data) => {
                if (
                    data?.data &&
                    this.isMatchingPeriod(data?.data?.selectedPeriod, data?.data?.isHistoricalSupport) &&
                    this.isMatchingOptions(data?.data?.subscriptionOptions?.timeStamp, data?.channelId)
                ) {
                    this.widgetsSocketObservable.next(data);
                }
            });
            return ws;
        };
        if (type === 'main') {
            this.ws = initWsSub(this.ws, this.wsUrl, 'main');
        } else if (type === 'additional') {
            this.wsAdditional = initWsSub(this.wsAdditional, this.wsAddUrl, 'additional');
        } else {
            this.ws = initWsSub(this.ws, this.wsUrl, 'main');
            this.wsAdditional = initWsSub(this.wsAdditional, this.wsAddUrl, 'additional');
        }
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
            new Date(incoming.toDateTime).getTime() === new Date(this.currentDates$.getValue()?.toDateTime).getTime()
        );
    }

    private isMatchingOptions(incoming: number, widgetId: string): boolean {
        if (!incoming) {
            return true;
        }
        return this.openedWsChannels[widgetId]?.options?.timeStamp === incoming;
    }

    private reconnectWs(source: WebSocketType): void {
        if (this.configService.isErrorDisplay) {
            this.materialController.openSnackBar('Переподключение к данным реального времени');
        }
        this.reconnectWsTimer = setTimeout(() => {
            this.initWS(source);
            // tslint:disable-next-line:forin
            for (const channel in this.openedWsChannels) {
                let widgetId = channel;
                let channelId = null;
                if (!!this.openedWsChannels[channel].parentChannelId) {
                    widgetId = this.openedWsChannels[channel].parentChannelId;
                    channelId = this.openedWsChannels[channel].channelId;
                }
                this.wsConnect(widgetId, this.openedWsChannels[channel]?.options, channelId);
            }
        }, this.reconnectInterval);
    }

    public reloadPage(): void {
        const timeFormat = 'HH:mm:ss';
        const currentTime = moment().format(timeFormat);
        if (moment(currentTime, timeFormat).isBetween(moment('03:00:01', timeFormat), moment('03:29:59', timeFormat))) {
            // window.location.reload(); // TODO: testing
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
