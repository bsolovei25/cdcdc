import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { filter, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { GridsterItem } from "angular-gridster2";
import { Widgets } from "../models/widget.model";
import { AppConfigService } from "src/app/services/appConfigService";
import { EventsWidgetData } from "../models/events-widget";
import { LineChartData } from "../models/line-chart";
import { Machine_MI } from "../models/manual-input.model";
import { WebSocketSubject } from "rxjs/internal/observable/dom/WebSocketSubject";
import { webSocket } from "rxjs/internal/observable/dom/webSocket";

@Injectable({
  providedIn: "root"
})
export class NewWidgetService {
  private readonly wsUrl: string;
  private readonly restUrl: string;
  private readonly reconnectInterval: number;

  private widgetsSocketObservable: BehaviorSubject<any> = new BehaviorSubject(
    null
  );
  private ws: WebSocketSubject<any> = null;
  private connectedWidgetsId: string[] = [];

  public draggingItem: GridsterItem;
  public isOver = false;
  public dashboard: GridsterItem[] = []; // GridsterItem with uniqid that identifies concrete widget
  public mass = [];
  private _widgets$: BehaviorSubject<Widgets[]> = new BehaviorSubject(null);
  private reconnectTimer: any;

  constructor(public http: HttpClient, configService: AppConfigService) {
    this.restUrl = configService.restUrl;
    this.wsUrl = configService.wsUrl;
    this.reconnectInterval = configService.reconnectInterval * 1000;

    this.getAvailableWidgets().subscribe(data => this._widgets$.next(data));
    this.initWS();
  }

  public widgets$: Observable<Widgets[]> = this._widgets$
    .asObservable()
    .pipe(filter(item => item !== null));

  public getAvailableWidgets(): Observable<Widgets[]> {
    return this.http.get(this.restUrl + "/af/GetAvailableWidgets").pipe(
      map(data => {
        const _data = this.mapData(data);
        this.mass = this.mapData(data);
        return _data;
      })
    );
  }

  mapData(data) {
    return data.map(item => {
      return {
        code: item.code,
        id: item.id,
        name: item.name,
        title: item.title,
        units: item.units,
        widgetOptions: item.widgetOptions,
        widgetType: item.widgetType
      };
    });
  }

  getName(idWidg) {
    let widgetNames = this.mass.find(x => x.id === idWidg);
    if (widgetNames === null || widgetNames === "") {
      widgetNames = "Нет имени";
      return widgetNames.widgetType;
    } else {
      return widgetNames.widgetType;
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
    return this.widgets$.pipe(map(i => i.find(x => x.id === idWidg)));
  }

  getWidgetLiveDataFromWS(widgetId, widgetType): any {
    this.connectedWidgetsId.push(widgetId);
    this.wsConnect(widgetId);
    return this.widgetsSocketObservable.pipe(
      filter(ref => ref && ref.channelId === widgetId),
      map(ref => {
        return this.mapWidgetData(ref.data, widgetType);
      })
    );
  }

  // TODO добавить метод ко всем виджетам
  removeWidgetConnection(widgetId: string) {
    this.connectedWidgetsId.splice(
      this.connectedWidgetsId.indexOf(
        this.connectedWidgetsId.find(el => el === widgetId)
      ),
      1
    );
    // this.connectedWidgetsId = this.connectedWidgetsId.filter(el => el !== widgetId);
  }

  private wsConnect(widgetId: string) {
    this.ws.next({
      ActionType: "Subscribe",
      ChannelId: widgetId
    });
  }

  private mapWidgetData(data, widgetType) {
    switch (widgetType) {
      case "events":
        return this.mapEventsWidgetData(data);

      case "line-chart":
        return this.mapLineChartData(data);

      case "line-diagram":
        return data;

      case "manual-input":
        return this.mapManualInput(data.items);

      case "pie-diagram":
        return data;

      case "truncated-diagram-counter":
        return data;

      case "truncated-diagram-percentage":
        return data;

      case "bar-chart":
        return data;

      case "map-ecology":
        return data;

      case "ring-factory-diagram":
        return data;

      case "semicircle-energy":
        return data;

      case "dispatcher-screen":
        return data;

      case "point-diagram":
        return data;

      case "circle-diagram":
        return data;

      case "polar-chart":
        return data;

      case "solid-gauge-with-marker":
        return data;
      case "circle-block-diagram":
        return data;
      case "deviation-circle-diagram":
        return data;
      case "time-line-diagram":
        return data;
    }
    console.warn(`unknown widget type ${widgetType}`);
  }

  private mapEventsWidgetData(data: EventsWidgetData): EventsWidgetData {
    data.notifications.forEach(
      n => (n.eventDateTime = new Date(n.eventDateTime))
    );
    return data;
  }

  private mapLineChartData(data): LineChartData {
    data.graphs.forEach(g => {
      g.values.forEach(v => (v.date = new Date(v.date)));
    });
    return data;
  }

  private mapManualInput(data): Machine_MI[] {
    return data;
  }

  private initWS() {
    this.ws = webSocket(this.wsUrl);
    this.ws.subscribe(
      msg => {
        console.log("message received: " + msg);
        if (this.reconnectTimer) {
          clearInterval(this.reconnectTimer);
        }
      },
      err => {
        console.log("Error ws: " + err);
        this.reconnectWs();
      },
      () => {
        console.log("complete");
        this.reconnectWs();
      }
    );
    this.ws.asObservable().subscribe(data => {
      this.widgetsSocketObservable.next(data);
    });
  }

  private reconnectWs() {
    if (this.reconnectTimer) {
      console.log("reconnect уже создан");
      return;
    }

    this.reconnectTimer = setInterval(() => {
      this.initWS();
      for (const connectedWidget of this.connectedWidgetsId) {
        this.wsConnect(connectedWidget);
      }
    }, this.reconnectInterval);
  }
}
