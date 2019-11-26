import { Injectable } from '@angular/core';
import { NewWidgetService } from './new-widget.service';
import { NewUserSettings, NewUserGrid, ScreenSettings } from '../models/user-settings.model';
import {HttpClient} from '@angular/common/http';
import {WIDGETS} from '../components/new-widgets-grid/widget-map'
import { WidgetsService } from './widgets.service';
import { AppConfigService } from 'src/app/services/appConfigService';
import { GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';


@Injectable({
  providedIn: 'root'
})
export class NewUserSettingsService {

  public readonly WIDGETS = WIDGETS;

  

  constructor(
    private widgetService: NewWidgetService,
    private oldWidgetService: WidgetsService,
    private http: HttpClient,
    configService: AppConfigService
  ) {
    this.restUrl = configService.restUrl;
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
          /*
         if(item.id === oldItem.id){   
          this.widgetService.dashboard.splice(this.widgetService.dashboard.indexOf(item), 1 ,{
            x: newItem.x,
            y: newItem.y, 
            cols: newItem.cols, 
            rows: newItem.rows, 
            id: oldItem.id, 
            widgetType: oldItem.widgetType
          });
         } 
         */
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
          sizeX = cell.rows;
          sizeY = cell.cols;
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
      return this.http.get(this.restUrl + '/user-management/user/1/screens').subscribe((ref: ScreenSettings[]) => {
        console.log(ref);
    });
  }
  
  public LoadScreen(id){
    this.http.get(this.restUrl + '/user-management/user/1/screens').subscribe((ref: ScreenSettings[]) => {
      
      console.log(ref);
      for(let item of ref){
        if(id === item.id){
          this.ScreenId = item.id;
          this.ScreenName = item.screenName;
          this.getUserData();
         
          }
      }
    });
  }

  public PushScreen(nameWidget){
    let userScreen: ScreenSettings = new class implements ScreenSettings {
      user;
      id;
     screenName = nameWidget;
    };
    this.http.post(this.restUrl + '/user-management/setscreen/', userScreen)
    .subscribe(
      ans => {
     
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
        cols: item.sizeY,
        rows: item.sizeX,
        id: item.widgetId, 
        widgetType: item.widgetType 
       });
      }
    });
  }
  
}
