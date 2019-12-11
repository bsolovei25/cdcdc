import { Component, OnInit } from "@angular/core";

@Component({
  selector: "evj-detailed-line-diagram",
  templateUrl: "./detailed-line-diagram.component.html",
  styleUrls: ["./detailed-line-diagram.component.scss"]
})
export class DetailedLineDiagramComponent implements OnInit {
  data = {
    plan: 100,
    dispersion: "3%",
    curValue: 63,
    maxValue: 150,
    deviation: 2.1,
    increase: 1.3
  };

  colorNormal = "#FFFFFF";
  colorDeviation = "#F4A321";

  constructor() {}

  ngOnInit() {}

  drawGraph(count: number): string {
    return count.toString() + "%";
  }

  fillGraph(flag: boolean): string {
    return flag ? this.colorNormal : this.colorDeviation;
  }
}
