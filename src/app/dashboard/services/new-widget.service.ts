import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { filter, map, tap, debounceTime, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GridsterItem } from 'angular-gridster2';
import { IWidgets } from '../models/widget.model';
import { AppConfigService } from 'src/app/services/appConfigService';
import { EventsWidgetDataPreview } from '../models/events-widget';
import { LineChartData } from '../models/line-chart';
import { IMachine_MI } from '../models/manual-input.model';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/internal/observable/dom/webSocket';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../@core/service/auth.service';
import { MaterialControllerService } from './material-controller.service';
import * as moment from 'moment';

interface IDatesInterval {
    fromDateTime: Date;
    toDateTime: Date;
}

interface IWebSocket {
    actionType: string;
    channelId: string;
    selectedPeriod?: IDatesInterval;
    data?: any;
}

@Injectable({
    providedIn: 'root',
})
export class NewWidgetService {
    private readonly wsUrl: string;
    private readonly restUrl: string;
    private readonly reconnectInterval: number;

    private widgetsSocketObservable: BehaviorSubject<any> = new BehaviorSubject(null);
    private ws: WebSocketSubject<IWebSocket> = null;

    public draggingItem: GridsterItem;
    public isOver = false;
    // GridsterItem with uniqid that identifies concrete widget
    public dashboard: GridsterItem[] = [];
    public mass = [];
    private i = 0;
    private _widgets$: BehaviorSubject<IWidgets[]> = new BehaviorSubject(null);
    private _filterWidgets$: BehaviorSubject<IWidgets[]> = new BehaviorSubject(null);

    public searchWidget$ = new Subject<any>();

    private reconnectTimer: any;
    private reconnectRestTimer: any;

    private _lastSearchValue: string;

    public searchValue: string;

    public searchType;

    public offFilterWidget: any = [];

    private currentDates: IDatesInterval = null;
    public currentDatesObservable: BehaviorSubject<IDatesInterval> = new BehaviorSubject<
        IDatesInterval
    >(null);

    public searchWidgetT: Observable<any> = this.searchWidget$.pipe(
        tap((val) => {
            this._lastSearchValue = val;
        }),
        switchMap(this.Search.bind(this))
        //   filter(res => res.length > 0),
        //  switchMap(this.Search.bind(this))
    );
    constructor(
        public http: HttpClient,
        private authService: AuthService,
        configService: AppConfigService,
        private materialController: MaterialControllerService
    ) {
        this.restUrl = configService.restUrl;
        this.wsUrl = configService.wsUrl;
        this.reconnectInterval = configService.reconnectInterval * 1000;

        this.getRest();
        this.initWS();

        this.currentDatesObservable.subscribe((ref) => {
            this.wsSetParams(ref);
        });

        setInterval(() => this.reloadPage(), 1800000);
    }

    public widgets$: Observable<IWidgets[]> = this._widgets$
        .asObservable()
        .pipe(filter((item) => item !== null));

    private getAvailableWidgets(): Observable<IWidgets[]> {
        // return this.http.get(this.restUrl + `/api/af-service/GetAvailableWidgets`).pipe(
        return this.http.get('assets/GetAvailableWidgetsMock.json').pipe(
            map((data: IWidgets[]) => {
                const localeData = this.mapData(data);
                this.mass = this.mapData(data);
                return localeData;
            })
        );
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

    getName(idWidg: string): string {
        let widgetNames: IWidgets | string = this.mass.find((x) => x.id === idWidg);
        if (widgetNames === undefined || widgetNames === null || widgetNames === '') {
            widgetNames = 'Нет имени';
            return widgetNames;
        } else {
            if (widgetNames && typeof widgetNames !== 'string') {
                return widgetNames.widgetType;
            }
        }
    }

    removeItemService(uniqid: string) {
        for (const item of this.dashboard) {
            if (item.uniqid === uniqid) {
                this.dashboard.splice(this.dashboard.indexOf(item), 1);
            }
        }
    }

    getWidgetChannel(idWidg) {
        return this.widgets$.pipe(map((i) => i.find((x) => x.id === idWidg)));
    }

    getWidgetLiveDataFromWS(widgetId, widgetType): any {
        this.wsConnect(widgetId);
        return this.widgetsSocketObservable.pipe(
            filter((ref) => ref && ref.channelId === widgetId),
            map((ref) => {
                return this.mapWidgetData(ref.data, widgetType);
            })
        );
    }

    private wsConnect(widgetId: string): void {
        if (this.currentDatesObservable.getValue() !== null) {
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
            selectedPeriod: this.currentDatesObservable.getValue(),
        });
    }

    private wsDisonnect(widgetId: string): void {
        this.ws.next({
            actionType: 'unsubscribe',
            channelId: widgetId,
        });
    }

    private mapWidgetData(data: any, widgetType: any) {
        switch (widgetType) {
            case 'events':
                return this.mapEventsWidgetDataPreview(data as EventsWidgetDataPreview);

            case 'line-chart':
                return this.mapLineChartData(data as LineChartData);
            case 'manual-input':
                return this.mapManualInput(data.items);

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
                return data;
        }
        console.warn(`unknown widget type ${widgetType}`);
    }

    private mapEventsWidgetDataPreview(data: EventsWidgetDataPreview): EventsWidgetDataPreview {
        // data.notification.forEach((n) => (n.eventDateTime = new Date(n.eventDateTime)));
        data.notification.eventDateTime = new Date(data.notification.eventDateTime);
        return data;
    }

    private mapLineChartData(data: LineChartData): LineChartData {
        data.graphs.forEach((g) => {
            g.values.forEach((v) => (v.date = new Date(v.date)));
        });
        return data;
    }

    private mapManualInput(data: IMachine_MI[]): IMachine_MI[] {
        return data;
    }

    private getRest(): void {
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

    private initWS(): void {
        if (this.ws) {
            this.ws.complete();
        }
        this.ws = webSocket(this.wsUrl);
        this.ws.subscribe(
            (msg) => {
                console.log('message received: ' + msg);
                if (this.reconnectTimer) {
                    clearInterval(this.reconnectTimer);
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
            if (data.data && this.isMatchingPeriod(data.data.selectedPeriod)) {
                this.widgetsSocketObservable.next(data);
                console.log('data ws');
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

    private reconnectWs() {
        if (this.reconnectTimer) {
            console.warn('reconnect уже создан');
            return;
        }
        this.materialController.openSnackBar('Переподключение к данным реального времени');
        this.reconnectTimer = setInterval(() => {
            this.initWS();
            this.dashboard.forEach((el) => this.wsConnect(el.id));
        }, this.reconnectInterval);
    }

    public searchItems(value, type) {
        this.searchType = type;
        try {
            this.searchWidget$.next(value);
        } catch (error) {
            return console.error('Поиск пуст');
        }
    }

    public Search(record: string): Observable<IWidgets[]> {
        try {
            const point = this._widgets$.getValue();
            let pointFilter;
            let arrFilter: any = [];
            let arrFilterButton: any = [];
            let resultObject: any = [];
            if (this.searchType === 'input') {
                let undefinedFilter = point.filter((point) => point.title !== undefined);
                const filter = of(
                    undefinedFilter.filter(
                        (point) => point.title.toLowerCase().indexOf(record.toLowerCase()) > -1
                    )
                );
                pointFilter = filter;
                this.searchValue = record;
                return pointFilter;
            } else {
                for (const i of record) {
                    const filter = point.filter((point) => point.categories.indexOf(i) > -1);
                    arrFilter.push(filter);
                }
                //  const filter = point.filter((point) => point.categories.indexOf(record) > -1);
                //  arrFilter.push(filter);
                for (const i of arrFilter) {
                    for (const j of i) {
                        arrFilterButton.push(j);
                    }
                }
                const newFilterArray: any = [...new Set(arrFilterButton)];
                resultObject.push(newFilterArray);
                this.searchValue = record;
                return resultObject;
            }
        } catch (error) {
            console.log('Ошбика', error);
        }
    }

    public reEmitList(): void {
        this._widgets$.next(this._widgets$.getValue());
        this.searchValue = null;
    }

    public wsSetParams(Dates: IDatesInterval = null): void {
        console.log(Dates);
        this.dashboard.forEach((el) => this.wsDisonnect(el.id));
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
}
