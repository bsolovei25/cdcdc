import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from "@angular/core";
import { timeLineItem, timeLineData } from "../../models/time-line-diagram";
import { NewWidgetService } from "../../services/new-widget.service";
import { Subscription } from "rxjs";

@Component({
  selector: "evj-time-line-diagram",
  templateUrl: "./time-line-diagram.component.html",
  styleUrls: ["./time-line-diagram.component.scss"]
})
export class TimeLineDiagramComponent implements OnInit {
  data: timeLineData = {
    values: [
      {
        dropTimeNext: 1578911767856 + 14000000,
        dropTimeLast: 1578911767856 + 3000000,
        dropTitle: "Сброс на факел"
      },
      {
        dropTimeNext: 1578911767856 + 4000000,
        dropTimeLast: 1578911767856 + 1000000,
        dropTitle: "Сточные воды"
      },
      {
        dropTimeNext: 1578911767856 + 9000000,
        dropTimeLast: 1578911767856 + 1000000,
        dropTitle: "Дымовые"
      },
      {
        dropTimeNext: 1578911767856 + 4000000,
        dropTimeLast: 1578911767856 + 1000000,
        dropTitle: "Сточные воды"
      },
      {
        dropTimeNext: 1578911767856 + 9000000,
        dropTimeLast: 1578911767856 + 1000000,
        dropTitle: "Дымовые"
      },
      {
        dropTimeNext: 1578911767856 + 4000000,
        dropTimeLast: 1578911767856 + 1000000,
        dropTitle: "Сточные воды"
      },
      {
        dropTimeNext: 1578911767856 + 9000000,
        dropTimeLast: 1578911767856 + 1000000,
        dropTitle: "Дымовые"
      }
    ]
  };

  public title = "";
  public units = "час";

  subscription: Subscription;

  constructor(
    private widgetService: NewWidgetService,
    @Inject("isMock") public isMock: boolean,
    @Inject("widgetId") public id: string,
    @Inject("uniqId") public uniqId: string
  ) {
    this.subscription = this.widgetService
      .getWidgetChannel(this.id)
      .subscribe(data => {
        this.title = data.title;
        // this.code = data.code;
        // this.units = data.units;
        // this.name = data.name;
      });
  }

  ngOnInit() {}
}
