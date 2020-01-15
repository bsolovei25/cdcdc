import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { TimeLineData } from "../../models/time-line-diagram";
import { NewWidgetService } from "../../services/new-widget.service";
import { Subscription } from "rxjs";

@Component({
  selector: "evj-time-line-diagram",
  templateUrl: "./time-line-diagram.component.html",
  styleUrls: ["./time-line-diagram.component.scss"]
})
export class TimeLineDiagramComponent implements OnInit, OnDestroy {
  data: TimeLineData = {
    values: []
  };

  public title: string = "";
  public units: string = "час";
  public widgetType: string = "time-line-diagram";

  subscriptions: Subscription[] = [];

  static itemCols = 14;
  static itemRows = 9;

  constructor(
    private widgetService: NewWidgetService,
    @Inject("isMock") public isMock: boolean,
    @Inject("widgetId") public id: string,
    @Inject("uniqId") public uniqId: string
  ) {
    this.subscriptions.push(
      this.widgetService.getWidgetChannel(this.id).subscribe(data => {
        this.title = data.title;
        // this.code = data.code;
        // this.units = data.units;
        // this.name = data.name;
      })
    );
  }

  ngOnInit() {
    this.subscriptions.push(
      this.widgetService
        .getWidgetLiveDataFromWS(this.id, this.widgetType)
        .subscribe((data: TimeLineData) => {
          this.data = data;
        })
    );
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach((subscription: Subscription) =>
        subscription.unsubscribe()
      );
    }
  }
}
