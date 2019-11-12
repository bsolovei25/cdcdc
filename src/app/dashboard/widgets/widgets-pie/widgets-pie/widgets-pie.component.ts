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
    {id:1, name:"Статическое Оборудование",pos:5, neg:2},
    {id:2, name:"Динамическое оборудование", pos:2, neg:5},
    {id:3,name:"КИПиА", pos:1, neg:1},
    {id:4,name:"Электро - оборудование", pos:0, neg:0}
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
