import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GridsterItem, GridsterConfig, GridType } from 'angular-gridster2';
import { Widgets } from '../models/widget.model';
import { AppConfigService } from 'src/app/services/appConfigService';

@Injectable({
  providedIn: 'root'
})
export class NewWidgetService {

  private readonly wsUrl: string;
  private readonly restUrl: string;

  public draggingItem: GridsterItem;
  public isOver:boolean = false;

  constructor(public http: HttpClient, configService: AppConfigService) {
    this.restUrl = configService.restUrl;
    this.wsUrl = configService.wsUrl;
    
    this.getAvailableWidgets().subscribe(data => this._widgets$.next(data));
   }

  
  public dashboard: GridsterItem[] = [];

  public mass = [];
  
  private _widgets$: BehaviorSubject<Widgets[]> = new BehaviorSubject(null);
  
  public widgets$: Observable<Widgets[]> = this._widgets$.asObservable().pipe(
    filter(item => item !== null)
  );

 /* public panelboard: GridsterItem[] = [
    {cols: 2, rows: 1, y: 0, x: 0, data:{ widget:"pie-chart" }},
    {cols: 2, rows: 2, y: 0, x: 2, data:{ widget:"line-chart"}},
  ];
*/
   public panelboard = [
     {widget:"pie-chart"},
     {widget:"line-chart"}
   ]


  public getAvailableWidgets(): Observable<Widgets[]> {

    
    // TODO check
    return this.http.get('http://192.168.0.4:5555/af/GetAvailableWidgets').pipe(
      map(data => {
        const _data = this.mapData(data);
        this.mass = this.mapData(data);
        return _data;
      })
    )
  }
  
  mapData(data){
      return data.map((item) => {
          return {
          code: item.code,
          id: item.id,
          name: item.name,
          title: item.title,
          units: item.units,
          widgetOptions: item.widgetOptions,
          widgetType: item.widgetType,
          }
    });  
  }

  getName(idWidg){
    let widgetNames = this.mass.find( (x) => x.id === idWidg );
    if(widgetNames === null){
      widgetNames = "";
    }else{
      return widgetNames.widgetType;
    } 
  }

  getWidgetChannel(idWidg){
    return this.widgets$.pipe(map((i) => i.find((x)=> x.id === idWidg)));
  }
}


