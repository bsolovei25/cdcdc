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
    this.GetScreen();
   }

  private restUrl: string;
  
  public UserId = 1;
  public ScreenId = 1;
  public ScreenName;

  public dataScreen= [];

  public addCellByPosition(idWidget, nameWidget, param) {
    console.log("addcell");
    this.widgetService.dashboard.push({
        x: param.x,
        y: param.y, 
        cols: WIDGETS[nameWidget].itemCols, 
        rows: WIDGETS[nameWidget].itemRows, 
        id: idWidget, 
        widgetType: nameWidget
      });
     this.screenSave();
  }

  public updateByPosition(oldItem, newItem){
    
      for(let item of this.widgetService.dashboard){
        
          if( ( (item.x === newItem.x) && (item.y === newItem.y) ) || ( (item.rows === newItem.rows) && (item.cols === newItem.cols) ) ){
            item.x = newItem.x;
            item.y = newItem.y;
            item.rows = newItem.rows;
            item.cols = newItem.cols;
            console.log("update", item)
          }
      }
     this.screenSave();
     
  }

  public removeItem(){
    this.screenSave();
  }

  private screenSave() {
    
    console.log("save_info",this.widgetService.dashboard);
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
        };
        userSettings.userGrid.push(cellSetting);
      }else{
        
      }
    }
    console.log(userSettings);

    this.http.post(this.restUrl + '/user-management/setscreen/', userSettings)
      .subscribe(
        ans => {
          
          console.log(ans);
        },
        error => console.log(error)
      );
  }

  public GetScreen(){
    this.http.get<ScreenSettings[]>(this.restUrl + '/user-management/user/1/screens').subscribe(data => this._screens$.next(data));
  }


  public LoadScreen(id){
    this.http.get(this.restUrl + '/user-management/screen/' + id)
      .subscribe((item: ScreenSettings) => {
        console.log(item);
        this.ScreenId = item.id;
        this.ScreenName = item.screenName;
        this.getUserData();
      });
  }

public PushScreen(nameWidget){
  let userScreen: ScreenSettings = new class implements ScreenSettings {
    id;
    screenName = nameWidget;
    user;
    updateScreen;
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
      this.GetScreen();
      this.LoadScreen(1);
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
  };
  return this.http.put(this.restUrl + '/user-management/user/1/screen/' +id, userScreen ).subscribe(
    ans => {
      this.GetScreen();
      console.log(ans);
    },
    error => console.log(error)
  );

}

public getUserData(){
    this.widgetService.dashboard = [];
    this.http.get(this.restUrl + '/user-management/getscreen/1/' + this.ScreenId.toString()).subscribe((ref: NewUserSettings) => {
      console.log(ref);
 
      for(let item of ref.userGrid){
       this.widgetService.dashboard.push({
        x: item.posX,
        y: item.posY,
        cols: item.sizeX,
        rows: item.sizeY,
        id: item.widgetId, 
        widgetType: item.widgetType 
       });
      }
    });
  }
  
}
