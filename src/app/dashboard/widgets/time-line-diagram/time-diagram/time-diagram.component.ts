import { Component, OnInit, Input } from "@angular/core";
import { timeLineItem } from "src/app/dashboard/models/time-line-diagram";

@Component({
  selector: "evj-time-diagram",
  templateUrl: "./time-diagram.component.html",
  styleUrls: ["./time-diagram.component.scss"]
})
export class TimeDiagramComponent implements OnInit {
  @Input() data: timeLineItem = {
    dropTimeNext: 0,
    dropTimeLast: 0,
    dropTitle: ""
  };

  public timeLeft = 0;

  colorNormal = "#616580";
  colorNow = "#a2e2ff";

  constructor() {}

  ngOnInit() {
    setInterval(() => {
      this.timeLeft = this.data.dropTimeNext - Date.now();
    }, 1000);
  }

  timeCounter(): number {
    return this.timeLeft > 0 ? this.timeLeft : 0;
  }

  timeLine(): string {
    let percent = 0;
    if (this.timeLeft > 0) {
      percent =
        100 -
        (this.timeLeft / (this.data.dropTimeNext - this.data.dropTimeLast)) *
          100;
    } else if (this.timeLeft === 0) {
      percent = 0;
    } else {
      percent = 100;
    }
    return percent + "%";
  }
}
