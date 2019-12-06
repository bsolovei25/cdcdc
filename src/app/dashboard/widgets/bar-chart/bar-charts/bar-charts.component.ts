import { Component, OnInit, Inject } from '@angular/core';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';
import { Subscription } from 'rxjs';
import { NewUserSettingsService } from 'src/app/dashboard/services/new-user-settings.service';

@Component({
  selector: 'evj-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.scss']
})
export class BarChartsComponent implements OnInit {

  static itemCols = 24;
  static itemRows = 10;

  private subscription: Subscription;

  public title ="Отклонения по качеству";
  public code;
  public units;
  public name;
  
  public datas = [];

  constructor(
    public widgetService: NewWidgetService,
    public userSettings: NewUserSettingsService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string
    ) {
      this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe(data => {
        this.title = data.title;
        this.code = data.code;
        this.units = data.units;
        this.name = data.name;
      }); 
    } 
  
  ngOnInit() {
     this.showMock(this.isMock);
  }

  showMock(show) {
    if (show){
   
      this.wsDisconnect();
    } else {
   
      this.wsConnect();
    }
  }

  private wsConnect() {
    this.widgetService.getWidgetLiveDataFromWS(this.id, 'bar-chart')
      .subscribe((ref) => {
         this.datas = ref.chartItems;
        }
      );
  }
  private wsDisconnect() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onRemoveButton(){
    this.widgetService.removeItemService(this.id);
    this.userSettings.removeItem();
  }
  
}
