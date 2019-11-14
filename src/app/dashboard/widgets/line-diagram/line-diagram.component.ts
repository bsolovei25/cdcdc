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
      critical: false
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
      critical: false
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

  drawGraph(count) {
    return (count * 150) / 100;
  }
}
