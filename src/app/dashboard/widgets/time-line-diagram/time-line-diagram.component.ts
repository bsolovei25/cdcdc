import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { TimeLineDiagram } from "../../models/time-line-diagram";

@Component({
  selector: "evj-time-line-diagram",
  templateUrl: "./time-line-diagram.component.html",
  styleUrls: ["./time-line-diagram.component.scss"]
})
export class TimeLineDiagramComponent implements OnInit {
  data: TimeLineDiagram[] = [
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
    },
  ];

  // public timeLeft = 0;

  // colorNormal = "#616580";
  // colorNow = "#a2e2ff";

  aboutWidget = "Сброс";
  units = "час";

  isMock = false;

  constructor() {}

  ngOnInit() {}
}
