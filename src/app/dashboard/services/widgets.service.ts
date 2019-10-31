import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, Subscription} from "rxjs/index";
import {LineChartData} from "../models/widget";
import {filter, map, switchMap} from "rxjs/internal/operators";
import {webSocket} from "rxjs/internal/observable/dom/webSocket";
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";
import {EventsNotification} from "../models/events-notification";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  lineChartLiveData: Observable<LineChartData>;
  newData: BehaviorSubject<true> = new BehaviorSubject<true>(true);

  private readonly wsUrl = environment.wsUrl;
  private ws: WebSocketSubject<any> = null;
  private wsSubscribtion: Subscription;

  constructor(public http: HttpClient) {

    this.initLineChartLiveData();
    this.initWS();

  }

  initLineChartLiveData() {
    this.lineChartLiveData = this.newData.pipe(
      switchMap(
        () => {
          return this.http.get<LineChartData>('./assets/mock/widget_data.json').pipe(
            map((ref: LineChartData) => {
              ref.totals.plan = ref.totals.plan + Math.random() * 10;
              ref.totals.fact = ref.totals.fact + Math.random() * 10;
              ref.totals.deviation = ref.totals.deviation + Math.random() * 10;


              ref.graphs.forEach(g => g.values.forEach(v => {
                v.date = new Date(v.date)
              }));

              ref.graphs[0].values.forEach(v => {
                v.value = v.value + Math.random() * 10;
              });
              ref.graphs[1].values.forEach(v => {
                v.value = v.value + Math.random() * 10;
              });
              return ref;
            })
          )
        }
      )
    );


    setInterval(() => {
      this.newData.next(true);
    }, 7000)

  }

  initWS() {
    this.ws = webSocket(this.wsUrl);

    this.wsSubscribtion = this.ws.asObservable()
        .subscribe((dataFromServer) => {
        // TODO remove after development complete
        console.log(dataFromServer)
      });
  }

  getWidgetLiveDataFromWS(widgetId, widgetType) {
    this.ws.next({
      "ActionType": "Subscribe",
      "ChannelId": widgetId
    });

    return this.ws.asObservable().pipe(
      filter(ref => ref.channelId === widgetId),
      map(ref => {
        return this.mapWidgetData(ref.data, widgetType);
      })
    );
  }

  getAvailableWidgets(): Observable<any> {
    return this.http.get('./assets/mock/available_widgets.json');
  }

  getWidgetLiveData(widgetId, widgetType?) {
    return this.lineChartLiveData;
  }


  getWidgetData(widgetId): Observable<LineChartData> {
    return this.http.get<LineChartData>('./assets/mock/widget_data.json').pipe(
      map((ref: LineChartData) => {
        ref.graphs.forEach(g => g.values.forEach(v => v.date = new Date(v.date)));
        return ref;
      })
    )
  }

  getUserGrid(): Observable<any> {
    return this.http.get('./assets/mock/user_grid.json');
  }

  mapWidgetData(data, widgetType) {
    switch (widgetType) {
      case 'events':
        return this.mapNotification(data);
    }
  }

  mapNotification(notification): EventsNotification {
    notification.dateTime = new Date(notification.dateTime);
    return notification;
  }


}
