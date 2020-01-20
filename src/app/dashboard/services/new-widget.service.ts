import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { filter, map, tap, debounceTime, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GridsterItem } from 'angular-gridster2';
import { IWidgets } from '../models/widget.model';
import { AppConfigService } from 'src/app/services/appConfigService';
import { EventsWidgetData } from '../models/events-widget';
import { LineChartData } from '../models/line-chart';
import { Machine_MI } from '../models/manual-input.model';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/internal/observable/dom/webSocket';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class NewWidgetService {
    private readonly wsUrl: string;
    private readonly restUrl: string;
    private readonly reconnectInterval: number;

    private widgetsSocketObservable: BehaviorSubject<any> = new BehaviorSubject(null);
    private ws: WebSocketSubject<any> = null;
    private connectedWidgetsId: string[] = [];

    public draggingItem: GridsterItem;
    public isOver = false;
    public dashboard: GridsterItem[] = []; // GridsterItem with uniqid that identifies concrete widget
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
        configService: AppConfigService,
        private snackBar: MatSnackBar
    ) {
        this.restUrl = configService.restUrl;
        this.wsUrl = configService.wsUrl;
        this.reconnectInterval = configService.reconnectInterval * 1000;

        this.getRest();
        this.initWS();
    }

    public widgets$: Observable<IWidgets[]> = this._widgets$
        .asObservable()
        .pipe(filter((item) => item !== null));

    private getAvailableWidgets(): Observable<IWidgets[]> {
        return this.http.get(this.restUrl + `/api/af-service/GetAvailableWidgets`).pipe(
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
        if (widgetNames === null || widgetNames === '') {
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
        this.connectedWidgetsId.push(widgetId);
        this.wsConnect(widgetId);
        return this.widgetsSocketObservable.pipe(
            filter((ref) => ref && ref.channelId === widgetId),
            map((ref) => {
                return this.mapWidgetData(ref.data, widgetType);
            })
        );
    }

    removeWidgetConnection(widgetId: string): void {
        this.connectedWidgetsId.splice(
            this.connectedWidgetsId.indexOf(this.connectedWidgetsId.find((el) => el === widgetId)),
            1
        );
    }

    private wsConnect(widgetId: string): void {
        this.ws.next({
            ActionType: 'Subscribe',
            ChannelId: widgetId,
        });
    }

    private mapWidgetData(data, widgetType) {
        switch (widgetType) {
            case 'events':
                return this.mapEventsWidgetData(data);

            case 'line-chart':
                return this.mapLineChartData(data);

            case 'line-diagram':
                return data;

            case 'manual-input':
                return this.mapManualInput(data.items);

            case 'pie-diagram':
                return data;

            case 'truncated-diagram-counter':
                return data;

            case 'truncated-diagram-percentage':
                return data;

            case 'bar-chart':
                return data;

            case 'map-ecology':
                return data;

            case 'ring-factory-diagram':
                return data;

            case 'semicircle-energy':
                return data;

            case 'dispatcher-screen':
                return data;

            case 'point-diagram':
                return data;

            case 'circle-diagram':
                return data;

            case 'polar-chart':
                return data;

            case 'solid-gauge-with-marker':
                return data;
            case 'circle-block-diagram':
                return data;
            case 'deviation-circle-diagram':
                return data;
            case 'time-line-diagram':
                return data;
            case 'ring-energy-indicator':
                return data;
        }
        console.warn(`unknown widget type ${widgetType}`);
    }

    private mapEventsWidgetData(data: EventsWidgetData): EventsWidgetData {
        data.notifications.forEach((n) => (n.eventDateTime = new Date(n.eventDateTime)));
        return data;
    }

    private mapLineChartData(data): LineChartData {
        data.graphs.forEach((g) => {
            g.values.forEach((v) => (v.date = new Date(v.date)));
        });
        return data;
    }

    private mapManualInput(data): Machine_MI[] {
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
                console.log('error rest', err);
                this.reconnectRest();
            },
            () => {
                console.log('complete');
            }
        );
    }

    private reconnectRest(): void {
        if (this.reconnectRestTimer) {
            console.log('reconnect уже создан');
            return;
        }
        this.openSnackBar('Переподключение');
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
            this.widgetsSocketObservable.next(data);
        });
    }

    private reconnectWs() {
        if (this.reconnectTimer) {
            console.log('reconnect уже создан');
            return;
        }

        this.reconnectTimer = setInterval(() => {
            this.initWS();
            for (const connectedWidget of this.connectedWidgetsId) {
                this.wsConnect(connectedWidget);
            }
        }, this.reconnectInterval);
    }

    public searchItems(value, type) {
        this.searchType = type;
        try {
            this.searchWidget$.next(value);
        } catch (error) {
            return console.log('Поиск пуст');
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
                const filter = of(
                    point.filter(
                        (point) => point.title.toLowerCase().indexOf(record.toLowerCase()) > -1
                    )
                );
                pointFilter = filter;
                this.searchValue = record;
                return pointFilter;
            } else {
                for (let i of record) {
                    const filter = point.filter((point) => point.categories.indexOf(i) > -1);
                    arrFilter.push(filter);
                }
                //  const filter = point.filter((point) => point.categories.indexOf(record) > -1);
                //  arrFilter.push(filter);
                for (let i of arrFilter) {
                    for (let j of i) {
                        arrFilterButton.push(j);
                    }
                }
                let newFilterArray: any = [...new Set(arrFilterButton)];
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

    openSnackBar(
        msg: string = 'Операция выполнена',
        msgDuration: number = 3000,
        actionText?: string,
        actionFunction?: () => void
    ): void {
        const snackBarInstance = this.snackBar.open(msg, actionText, { duration: msgDuration });
        if (actionFunction) {
            snackBarInstance.onAction().subscribe(() => actionFunction());
        }
    }
}
