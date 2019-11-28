import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "evj-one-column",
  templateUrl: "./one-column.component.html",
  styleUrls: ["./one-column.component.scss"]
})
export class OneColumnComponent implements OnInit {
  @Input() isDiagram: boolean;
  @Input() item: any;

  constructor() {}

  ngOnInit() {}

  getGraphHeight(percent: number): string {
    return (100 - percent).toString() + "%";
  }

  getDiameter(percent: number): number {
    return 30 + ((70 - 30) / 100) * percent;
  }

  getColor(percent: number, isCritical: boolean): string {
    if (percent === 0) {
      return "point__disable";
    } else if (!isCritical) {
      return "point__normal";
    }
    return "point__critical";
  }
}
