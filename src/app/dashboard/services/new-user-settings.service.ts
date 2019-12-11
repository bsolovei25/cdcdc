import { Injectable } from '@angular/core';
import { NewWidgetService } from './new-widget.service';
import { NewUserSettings, NewUserGrid, ScreenSettings } from '../models/user-settings.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {WIDGETS} from '../components/new-widgets-grid/widget-map'
import { AppConfigService } from 'src/app/services/appConfigService';
import { GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NewUserSettingsService {

  public readonly WIDGETS = WIDGETS;


  private _screens$: BehaviorSubject<ScreenSettings[]> = new BehaviorSubject(null);

  public screens$: Observable<ScreenSettings[]> = this._screens$.asObservable().pipe(
    filter(item => item !== null)
  );

  constructor(
    private widgetService: NewWidgetService,
    private http: HttpClient,
    configService: AppConfigService
  ) {
    this.restUrl = configService.restUrl;
    localStorage.getItem('screen');
    this.GetScreen();
   }

  private restUrl: string;
  
  public UserId = 1;
  public ScreenId: number;
  public ScreenName: string;

  public dataScreen= [];

  public widgetInfo: NewUserGrid;

  
 

  
  public addCellByPosition(idWidget, nameWidget, param) {
    let uniqId = this.create_UUID(); 
    this.widgetService.dashboard.push({
        x: param.x,
        y: param.y, 
        cols: WIDGETS[nameWidget].itemCols, 
        rows: WIDGETS[nameWidget].itemRows, 
        id: idWidget, 
        uniqid: uniqId,
        widgetType: nameWidget
      });
    this.addWidgetApi(uniqId);
  }

  public create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

  public addWidgetApi(uniqId){
    this.save(uniqId);
    let updateWidget = this.widgetInfo;
    this.http.post(this.restUrl + '/user-management/widget/'+this.ScreenId, updateWidget)
      .subscribe(
        ans => {
        },
        error => console.log(error)
      );
  }

  public save(uniqId){
    for (let item of this.widgetService.dashboard) {
      if (item.uniqid == uniqId) {
        let cellSetting: NewUserGrid = new class implements NewUserGrid {
          widgetId = item.id;
          posX = item.x;
          posY = item.y;
          widgetType = item.widgetType;
          sizeX = item.cols;
          sizeY = item.rows;
          uniqueId = item.uniqid;
        };
        this.widgetInfo = cellSetting;
      }else{
      }
    }
  }

  public updateWidgetApi(uniqId){
    this.save(uniqId);
    let updateWidget = this.widgetInfo;
  
    this.http.put(this.restUrl + '/user-management/widget/'+uniqId, updateWidget)
      .subscribe(
        ans => {
        },
        error => console.log(error)
      );
  }

  public updateByPosition(oldItem,newItem){
      for(let item of this.widgetService.dashboard){
        
          if( item.uniqid == oldItem.uniqid){
            item.x = newItem.x;
            item.y = newItem.y;
            item.rows = newItem.rows;
            item.cols = newItem.cols;
            // console.log("update", item)
          }
      }   

     this.updateWidgetApi(oldItem.uniqid);

  }

  public removeItem(){
    this.screenSave();
  }

 public screenSave() {
  // console.log("save_info",this.widgetService.dashboard);
  const UserId = this.UserId;
  const ScreenId = this.ScreenId;
  let userSettings: NewUserSettings = new class implements NewUserSettings {
    userId = UserId;
    screenId = ScreenId;
    userGrid: NewUserGrid[] = [];
  };
  for (const i in this.widgetService.dashboard) {
    let cell = this.widgetService.dashboard[i];
    if (cell != null) {
      let cellSetting: NewUserGrid = new class implements NewUserGrid {
        widgetId = cell.id;
        posX = cell.x;
        posY = cell.y;
        widgetType = cell.widgetType;
        sizeX = cell.cols;
        sizeY = cell.rows;
        uniqueId = cell.uniqid;
      };
      userSettings.userGrid.push(cellSetting);
    }else{
      
    }
  }
  // console.log(userSettings);

  this.http.post(this.restUrl + '/user-management/setscreen/', userSettings)
    .subscribe(
      ans => {
        
        // console.log(ans);
      },
      error => console.log(error)
    );
}


public GetScreen(){  
    this.http.get<ScreenSettings[]>(this.restUrl + '/user-management/user/1/screens')
      .subscribe(data => {
        this._screens$.next(data);
        if (!this.ScreenId && data[0])
        {
          this.ScreenId = data[0].id;
        }
        const currentScreen = data.find(x => x.id == this.ScreenId);
        if (!currentScreen)
          return;

        this.widgetService.dashboard = currentScreen.widgets.map(item =>
          ({
            x: item.posX,
            y: item.posY,
            cols: item.sizeX,
            rows: item.sizeY,
            id: item.widgetId, 
            widgetType: item.widgetType,
            uniqid: item.uniqueId 
          }));
      });
}

public getUniqId(id){
    for(let item of this.widgetService.dashboard)
    { 
      if(id === item.id){
        return item.uniqid;
      }
    }
}

public LoadScreen(id){
    localStorage.setItem('screenid', id);
    this.http.get(this.restUrl + '/user-management/screen/' + id)
      .subscribe((item: ScreenSettings) => {
        console.log(item);
        this.ScreenId = item.id;
        this.ScreenName = item.screenName;
        this.widgetService.dashboard = item.widgets.map(x =>
          ({
            x: x.posX,
            y: x.posY,
            cols: x.sizeX,
            rows: x.sizeY,
            id: x.widgetId, 
            widgetType: x.widgetType,
            uniqid: x.uniqueId 
          }));
      });
      
}

public PushScreen(nameWidget){
  let userScreen: ScreenSettings = new class implements ScreenSettings {
    id;
    screenName = nameWidget;
    user;
    updateScreen;
    widgets;
  };
  return this.http.post(this.restUrl + '/user-management/user/1/screen', userScreen).subscribe(
       ans => {
        this.GetScreen();
         console.log(ans);
       },
       error => console.log(error)
     );
}

public deleteScreen(id: number){
  return this.http.delete(this.restUrl + '/user-management/screen/' + id)
  .subscribe(
    ans => {
      if (this.ScreenId === id)
        this.ScreenId = undefined;
      this.GetScreen();
      console.log(ans);
    },
    error => console.log(error)
  );
}

public updateScreen(id, name){
  let userScreen: ScreenSettings = new class implements ScreenSettings {
    id = id;
    screenName = name;
    user;
    updateScreen;
    widgets;
  };
  return this.http.put(this.restUrl + '/user-management/user/1/screen/' + id, userScreen ).subscribe(
    ans => {
      this.GetScreen();
      console.log(ans);
    },
    error => console.log(error)
  );

}
}
