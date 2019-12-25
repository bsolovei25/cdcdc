import { Component, OnInit } from "@angular/core";

@Component({
  selector: "evj-column-chart-stacked",
  templateUrl: "./column-chart-stacked.component.html",
  styleUrls: ["./column-chart-stacked.component.scss"]
})
export class ColumnChartStackedComponent implements OnInit {
  isMock = false;
  public title = "Динамика отклонений";
  public units = "шт";

  constructor() {}

  ngOnInit() {}
}
