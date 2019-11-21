import {Component, Input, OnInit, Inject} from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';
import {WidgetsService} from "../../services/widgets.service";
import { inject } from '@angular/core/testing';

@Component({
  selector: "evj-line-diagram",
  templateUrl: "./line-diagram.component.html",
  styleUrls: ["./line-diagram.component.scss"]
})
export class LineDiagramComponent implements OnInit {

  static itemCols = 15;
  static itemRows = 7;

  private subscription: Subscription;

  data = [
    {
      name: "Сухой газ",
      count: 97,
      curValue: 97,
      planValue: 100,
      units: "%",
      critical: false
    },
    {
      name: "Пропан",
      count: 73,
      curValue: 73,
      planValue: 100,
      units: "%",
      critical: true
    }
  ];
  fillGraphs = "#3FA9F5";

  name;

  constructor(
    public widgetService: NewWidgetService,
    public widgetsService: WidgetsService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string
  ) {
    this.subscription = this.widgetService.getWidgetChannel(id).subscribe(data => {
      this.name = data.name
    });
  }

  ngOnInit() {}

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  drawGraph(count: number): string {
    return count.toString() + "%";
  }

  fillGraph(flag: boolean): string {
    const normalFill = "#3FA9F5";
    const criticalFill = "#F4A321";
    return flag ? criticalFill : normalFill;
  }

  @Input()
  set showMock(show) {
    this.isMock = show;

    if (this.isMock) {
      this.wsDisconnect();
    } else {
      this.wsConnect();
    }
  }

  wsConnect() {
    console.log('start ld ws')
    this.subscription = this.widgetsService.getWidgetLiveDataFromWS(this.id, 'line-diagram')
      .subscribe((ref) => {
          this.data = [];
          for (let el in ref) {
            let newEl = {
              name: ref[el].name,
              count: ref[el].percentage,
              curValue: ref[el].value,
              planValue: ref[el].upperBound,
              units: ref[el].units,
              critical: ref[el].isCritical
            }
            this.data.push(newEl);
          }
          console.log(this.data);
        }
      );
  }

  wsDisconnect() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
