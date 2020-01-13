import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { TimeLineDiagram } from "../../models/time-line-diagram";

@Component({
  selector: "evj-time-line-diagram",
  templateUrl: "./time-line-diagram.component.html",
  styleUrls: ["./time-line-diagram.component.scss"]
})
export class TimeLineDiagramComponent implements OnInit {
  data: TimeLineDiagram = {
    dropTimeNext: Date.now() + 100000,
    dropInterval: 500000,
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
    }, 1000);
  }

  timeLine(): string {
    const now = Date.now();
    let percent =
      ((now - (this.data.dropTimeNext - this.data.dropInterval)) /
        this.data.dropInterval) *
      100;
    percent = +percent.toFixed(2);
    if (percent > 100) percent = 100;
    return percent + "%";
  }
}
