import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs/index";
import {LineChartData} from "../models/widget";
import {map, switchMap} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {
  lineChartLiveData: Observable<LineChartData>;
  newData: BehaviorSubject<true> = new BehaviorSubject<true>(true);

  constructor(public http: HttpClient) {

    this.initLineChartLiveData();

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

  getAvailableWidgets(): Observable<any> {
    return this.http.get('./assets/mock/available_widgets.json');
  }

  getWidgetLiveData(widgetId) {
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


}
