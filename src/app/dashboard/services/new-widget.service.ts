import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { filter, map, take, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GridsterItem, GridsterConfig, GridType } from 'angular-gridster2';
import { Widgets } from '../models/widget.model';
import { AppConfigService } from 'src/app/services/appConfigService';
import { EventsWidgetData } from '../models/events-widget';
import { LineChartData } from '../models/line-chart';
import { Machine_MI } from '../models/manual-input.model';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/internal/observable/dom/webSocket';
import {clearInterval} from 'timers';
import Timer = NodeJS.Timer;

@Injectable({
  providedIn: 'root'
})
export class NewWidgetService {

  private readonly wsUrl: string;
  private readonly restUrl: string;
  private ws: WebSocketSubject<any> = null;
  public draggingItem: GridsterItem;
  public isOver: boolean = false;
  public dashboard: GridsterItem[] = [];
  public mass = [];
  private _widgets$: BehaviorSubject<Widgets[]> = new BehaviorSubject(null);
  private reconnectTimer: Timer = null;


  constructor(public http: HttpClient, configService: AppConfigService) {
    this.restUrl = configService.restUrl;
    this.wsUrl = configService.wsUrl;
    this.getAvailableWidgets().subscribe(data => this._widgets$.next(data));
    this.initWS();
   }

  public widgets$: Observable<Widgets[]> = this._widgets$.asObservable().pipe(
    filter(item => item !== null)
  );

  public getAvailableWidgets(): Observable<Widgets[]> {
    return this.http.get(this.restUrl + '/af/GetAvailableWidgets').pipe(
      map(data => {
        const _data = this.mapData(data);
        this.mass = this.mapData(data);
        return _data;
      })
    );
  }

  mapData(data) {
      return data.map((item) => {
          return {
            code: item.code,
            id: item.id,
            name: item.name,
            title: item.title,
            units: item.units,
            widgetOptions: item.widgetOptions,
            widgetType: item.widgetType,
          };
    });
  }

  getName(idWidg) {
    let widgetNames = this.mass.find( (x) => x.id === idWidg );
    if (widgetNames === null || widgetNames === '') {
      widgetNames = 'Нет имени';
      return widgetNames.widgetType;
    } else {
      return widgetNames.widgetType;
    }
  }

  removeItemService(id) {
    for (const item of this.dashboard) {
      if (item.id === id) {
        this.dashboard.splice(this.dashboard.indexOf(item), 1);
      }
    }
   }

  getWidgetChannel(idWidg) {
    return this.widgets$.pipe(map((i) => i.find((x) => x.id === idWidg)));
  }

  getWidgetLiveDataFromWS(widgetId, widgetType): any {
    this.ws.next({
      ActionType: 'Subscribe',
      ChannelId: widgetId
    });

    return this.ws.asObservable().pipe(
      filter(ref => ref.channelId === widgetId),
      map(ref => {
        return this.mapWidgetData(ref.data, widgetType);
      })
    );
  }

  mapWidgetData(data, widgetType) {
    switch (widgetType) {
      case 'events':
        return this.mapEventsWidgetData(data);

      case 'line-chart':
        return this.mapLineChartData(data);

        case 'line-diagram':
          return data;

        case 'manual-input':
          return this.mapManualInput(data);

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
    }
  }

  mapEventsWidgetData(data: EventsWidgetData): EventsWidgetData {
    data.notifications.forEach(n => n.eventDateTime = new Date(n.eventDateTime));
    return data;
  }

  mapLineChartData(data): LineChartData {
    data.graphs.forEach(g => {
      g.values.forEach(v => v.date = new Date(v.date));
    });
    return data;
  }

  mapManualInput(data): Machine_MI[] {
    return data;
  }

  initWS() {
    this.ws = webSocket(this.wsUrl);
    this.ws.subscribe(
      (msg) => {
        console.log('message received: ' + msg);
        if (this.reconnectTimer) {
          clearInterval(this.reconnectTimer);
        }},
      (err) => {
        console.log('Error: ' + err);
        this.reconnectWs(); },
      () => {
        console.log('complete');
        this.reconnectWs(); }
    );
  }

  reconnectWs() {
    this.reconnectTimer = setInterval(() => {
      try {
        this.ws.subscribe();
      } catch (error) {
        console.log('retry connect ws failed: ' + error);
      }
    }, 5000);
  }
}


