import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { TimeLineDiagram } from "../../models/time-line-diagram";

@Component({
  selector: "evj-time-line-diagram",
  templateUrl: "./time-line-diagram.component.html",
  styleUrls: ["./time-line-diagram.component.scss"]
})
export class TimeLineDiagramComponent implements OnInit {
  data: TimeLineDiagram = {
    dropTimeNext: 1578911767856 + 3000000,
    dropInterval: 1500000,
    dropTitle: "Сброс на факел"
  };

  public timeLeft = 0;
  public;

  colorNormal = "#616580";
  colorNow = "#a2e2ff";

  aboutWidget = "Сброс";
  units = "час";

  isMock = false;

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      this.timeLeft = this.data.dropTimeNext - Date.now();
      const date = new Date(this.timeLeft);
    }, 1000);
  }

  timeLine(): string {
    let percent = 0;
    if (this.timeLeft > 0) {
      percent = 100 - (this.timeLeft / this.data.dropInterval) * 100;
    } else {
      percent = 100;
    }
    return percent + "%";
  }
}
