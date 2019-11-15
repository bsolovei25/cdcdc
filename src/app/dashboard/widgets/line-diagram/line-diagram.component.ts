import { Component, OnInit } from "@angular/core";

@Component({
  selector: "evj-line-diagram",
  templateUrl: "./line-diagram.component.html",
  styleUrls: ["./line-diagram.component.scss"]
})
export class LineDiagramComponent implements OnInit {
  data = [
    {
      name: "Очищенный газ висбрекинга",
      count: "85",
      units: "%",
      critical: true
    },
    {
      name: "Сероводородный газ",
      count: "67",
      units: "%",
      critical: false
    },
    {
      name: "Сухой газ",
      count: "97",
      units: "%",
      critical: false
    },
    {
      name: "Пропан",
      count: "73",
      units: "%",
      critical: true
    },
    {
      name: "Изобутан",
      count: "55",
      units: "%",
      critical: false
    }
  ];
  fillGraphs = "#3FA9F5";

  constructor() {}

  ngOnInit() {}

  drawGraph(count: number): string {
    return count.toString() + "%";
  }

  fillGraph(flag: boolean): string {
    const normalFill = "#3FA9F5";
    const criticalFill = "#F4A321";
    return flag ? criticalFill : normalFill;
  }
}
