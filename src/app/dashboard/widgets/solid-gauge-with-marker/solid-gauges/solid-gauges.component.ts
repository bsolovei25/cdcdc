import { Component, OnInit, Inject } from '@angular/core';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';
import { Subscription } from 'rxjs';
import { SolidGaugeWithMarker } from 'src/app/dashboard/models/solid-gauge-with-marker';

@Component({
  selector: 'evj-solid-gauges',
  templateUrl: './solid-gauges.component.html',
  styleUrls: ['./solid-gauges.component.scss']
})
export class SolidGaugesComponent implements OnInit {

  static itemCols = 16;
  static itemRows = 10;

  private subscription: Subscription;

  public title ="Статическое Оборудование";
  public code;
  public units ="шт.";
  public name;
  public icon: string = 'tools';

  public uniqal;
  
  /*public datas = [
    {name: "СУГ", fact: 11.5, percent: 50, value: 14.5},
    {name: "Висбрекинг", fact: 3.07, percent: 70, value: 2.67},
  ]; */

  public datas: SolidGaugeWithMarker;


  constructor(
    public widgetService: NewWidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
    ) {
      this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe(data => {
        this.title = data.title;
        this.code = data.code;
        this.name = data.name;
      });
  }

  public check; 
  ngOnInit() {
    this.showMock(this.isMock);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  private wsConnect() {
    this.widgetService.getWidgetLiveDataFromWS(this.id, 'solid-gauge-with-marker')
      .subscribe((ref) => {
          this.datas = ref.values;
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
