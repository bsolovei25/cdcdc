import { Component, OnInit, Inject } from '@angular/core';
import { WidgetsService } from 'src/app/dashboard/services/widgets.service';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'evj-widget-pies',
  templateUrl: './widget-pies.component.html',
  styleUrls: ['./widget-pies.component.scss']
})
export class WidgetPiesComponent implements OnInit {

  private subscription: Subscription;

  public title = "ttt";
  public code = "434";
  public units = "434";

  public id = "4ae3a671-0792-11ea-98c7-380025fb9022";
  public isMock = false;
  
  public datas = [
    {title: "Статическое Оборудование", critical: 5, nonCritical: 2},
    {title: "Статическое Оборудование", critical: 5, nonCritical: 2},
  ];

  constructor(
    private widgetsService: WidgetsService,
    public widgetService: NewWidgetService,
    //@Inject('isMock') public isMock: boolean,
   // @Inject('widgetId') public id: string

    ) {
/*
      this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe(data => {
        this.title = data.title;
        this.code = data.code;
        this.units = data.units;
      }); */
  }


  ngOnInit() {
    debugger
    this.showMock(this.isMock);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  private wsConnect() {
    this.widgetsService.getWidgetLiveDataFromWS(this.id, 'pie-diagram')
      .subscribe((ref) => {
          this.datas = ref;
          debugger
        }
      );
  }
  private wsDisconnect() {
  }

  showMock(show) {
   
    if (show){
      debugger
      this.wsDisconnect();
    } else {
      debugger
      this.wsConnect();
    }
}

}
