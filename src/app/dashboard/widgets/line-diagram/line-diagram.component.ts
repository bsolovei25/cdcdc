import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {WidgetsService} from "../../services/widgets.service";

@Component({
  selector: "evj-line-diagram",
  templateUrl: "./line-diagram.component.html",
  styleUrls: ["./line-diagram.component.scss"]
})
export class LineDiagramComponent implements OnInit {
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

  private subscription: Subscription;

  private isMock = true;

  @Input() public id: string;

  constructor(private widgetsService: WidgetsService) {}

  ngOnInit() {}

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
