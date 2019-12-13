import { Component, OnInit, Inject } from '@angular/core';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';
import { Subscription } from 'rxjs';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { NewUserSettingsService } from 'src/app/dashboard/services/new-user-settings.service';

@Component({
  selector: 'evj-widget-pies',
  templateUrl: './widget-pies.component.html',
  styleUrls: ['./widget-pies.component.scss']
})
export class WidgetPiesComponent implements OnInit {

    
  static itemCols = 16;
  static itemRows = 10;

  private subscription: Subscription;

  public title ="Статическое Оборудование";
  public code;
  public units ="шт.";
  public name;

 public uniqal;
  
  public datas = [
    {name: "Статическое Оборудование", critical: 5, nonCritical: 2},
  ];

  constructor(
    public widgetService: NewWidgetService,
    public serice: NewUserSettingsService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string

    ) {
   
      this.uniqal = this.serice.getUniqId(this.id);
      
      this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe(data => {
        this.title = data.title;
        this.code = data.code;
      //  this.units = data.units;
        this.name = data.name;

      }); 
  }


  ngOnInit() {
    this.showMock(this.isMock);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  private wsConnect() {
    this.widgetService.getWidgetLiveDataFromWS(this.id, 'pie-diagram')
      .subscribe((ref) => {
          this.datas = ref.items;
        }
      );
  }
  private wsDisconnect() {
  }

  showMock(show) {
    if (show){
   
      this.wsDisconnect();
    } else {
   
      this.wsConnect();
    }
  }

}
