import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { TimeLineItemInput } from "src/app/dashboard/models/time-line-diagram";

@Component({
  selector: "evj-time-diagram",
  templateUrl: "./time-diagram.component.html",
  styleUrls: ["./time-diagram.component.scss"]
})
export class TimeDiagramComponent implements OnInit {
  @Input() data: TimeLineItemInput = {
    dropTimeNext: "0",
    dropTimeLast: "0",
    dropTitle: ""
  };

  @Input() isMock: boolean;

  public timeLeft: number = 0;

  colorNormal = "#616580";
  colorNow = "#a2e2ff";

  constructor() {}

  ngOnInit() {
    if (!this.isMock) {
      setInterval(() => {
        this.timeLeft = Date.parse(this.data.dropTimeNext) - Date.now();
      }, 100);
    }
  }

  timeCounter(): number {
    return this.timeLeft > 0 ? this.timeLeft : 0;
  }

  timeLine(): string {
    let percent: number = 0;
    if (this.timeLeft > 0 && !this.isMock) {
      percent =
        100 -
        (this.timeLeft /
          (Date.parse(this.data.dropTimeNext) -
            Date.parse(this.data.dropTimeLast))) *
          100;
    } else if (this.timeLeft === 0 && !this.isMock) {
      percent = 0;
    } else {
      percent = 100;
    }
    return percent + "%";
  }
}
