import { Component, OnInit, Input } from '@angular/core';
import { WidgetsService } from 'src/app/dashboard/services/widgets.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'evj-widgets-pie',
  templateUrl: './widgets-pie.component.html',
  styleUrls: ['./widgets-pie.component.scss']
})
export class WidgetsPieComponent implements OnInit {


  @Input() id: string;
  @Input() code: string;
  @Input() name: string;
  @Input() position?: string = 'default';

  private subscribtion: Subscription;

  public datas = [
    {id:1, name:"Статическое Оборудование", uncritical:5, critical:2 },
    {id:2, name:"Динамическое оборудование", uncritical:2, critical:5},
    {id:3, name:"КИПиА", uncritical:1, critical:1},
    {id:4, name:"Электро - оборудование", uncritical:0, critical:0}
  ];


  constructor(private widgetsService: WidgetsService) { }

  ngOnInit() {
    this.enableLiveData();
  }


  private enableLiveData() {
    this.subscribtion = this.widgetsService.getWidgetLiveDataFromWS(this.id, 'pie-chart')
      .subscribe((ref) => {
          this.subscribtion.unsubscribe();
        }
      );
  }

  private disableLiveData() {

    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }

}
