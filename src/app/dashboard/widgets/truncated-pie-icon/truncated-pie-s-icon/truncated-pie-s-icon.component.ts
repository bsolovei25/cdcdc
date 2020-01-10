import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';

@Component({
  selector: 'evj-truncated-pie-s-icon',
  templateUrl: './truncated-pie-s-icon.component.html',
  styleUrls: ['./truncated-pie-s-icon.component.scss']
})
export class TruncatedPieSIconComponent implements OnInit {

  static itemCols = 26;
  static itemRows = 10;

  private subscription: Subscription;

  public title;
  public code;
  public units = "шт.";
  public name;
  public icon: string = 'triangle';

  
  public datas = [
    {id:1, name: "Загазованность", count: 10, critical: 0, image: "fabric"},
    {id:2, name: "Деблокировочные ключи", count: 10, critical: 0, image: "key"},
    {id:3, name: "Пожарная сигнализация", count: 10, critical: 0, image: "fire"},
    {id:4, name: "Блокировки и сигнализации", count: 10, critical: 1, image: "signal"},
    {id:5, name: "ПИД-регуляторы", count: 10, critical: 0, image: "regul"},
    {id:6, name: "Вибдродиагности", count: 10, critical: 0, image: "ring"},
    {id:7, name: "Электрообогрев", count: 10, critical: 3, image: "temp"},
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
    this.widgetService.getWidgetLiveDataFromWS(this.id, 'truncated-diagram-counter')
      .subscribe((ref) => {
        //  this.datas = ref;
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
