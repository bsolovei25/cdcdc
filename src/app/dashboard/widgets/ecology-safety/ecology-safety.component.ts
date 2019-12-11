import { Component, OnInit } from "@angular/core";

@Component({
  selector: "evj-ecology-safety",
  templateUrl: "./ecology-safety.component.html",
  styleUrls: ["./ecology-safety.component.scss"]
})
export class EcologySafetyComponent implements OnInit {
  data = {
    plan: 100,
    curValue: 100,
    maxValue: 150,
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
