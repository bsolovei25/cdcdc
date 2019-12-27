import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';

@Component({
  selector: 'evj-truncated-pie-s-first',
  templateUrl: './truncated-pie-s-first.component.html',
  styleUrls: ['./truncated-pie-s-first.component.scss']
})
export class TruncatedPieSFirstComponent implements OnInit {

  static itemCols = 15;
  static itemRows = 17;

  private subscription: Subscription;

  public title;
  public code;
  public units = "%";
  public name;

  
  public datas = [
    {name: "Статическое Оборудование 1", plan: 5, value: 28},
    {name: "Статическое Оборудование 2", plan: 32, value: 5},
    {name: "Статическое Оборудование 3", plan: 100, value: 67},
    
  ];

  constructor(
    public widgetService: NewWidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
    ) {
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

  showMock(show) {
    if (show){
   
      this.wsDisconnect();
    } else {
   
      this.wsConnect();
    }
  }

  private wsConnect() {
    this.widgetService.getWidgetLiveDataFromWS(this.id, 'truncated-diagram-percentage')
      .subscribe((ref) => {
         this.datas = ref.values;
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
}
