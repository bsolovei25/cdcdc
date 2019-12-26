import { Component, OnInit, Inject } from "@angular/core";
import { NewWidgetService } from "../../services/new-widget.service";
import { Subscription } from "rxjs";

@Component({
  selector: "evj-column-chart-stacked",
  templateUrl: "./column-chart-stacked.component.html",
  styleUrls: ["./column-chart-stacked.component.scss"]
})
export class ColumnChartStackedComponent implements OnInit {
  public title = "Динамика отклонений";
  public units = "шт";

  cols = [
    {
      plan: 7,
      fact: 4,
      max: 26
    },
    {
      plan: 15,
      fact: 13,
      max: 26
    },
    {
      plan: 25,
      fact: 12,
      max: 26
    },
    {
      plan: 4,
      fact: 2,
      max: 26
    },
    {
      plan: 26,
      fact: 23,
      max: 26
    },
    {
      plan: 18,
      fact: 18,
      max: 26
    },
    {
      plan: 0,
      fact: 0,
      max: 26
    },
];

  subscription: Subscription;

  static itemCols = 18;
  static itemRows = 14;

  constructor(
    private widgetService: NewWidgetService,
    @Inject("isMock") public isMock: boolean,
    @Inject("widgetId") public id: string
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
