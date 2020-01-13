import { Component, OnInit } from "@angular/core";

@Component({
  selector: "evj-time-line-diagram",
  templateUrl: "./time-line-diagram.component.html",
  styleUrls: ["./time-line-diagram.component.scss"]
})
export class TimeLineDiagramComponent implements OnInit {
  data = {
    dropTimeNext: Date.now() + 100000,
    dropInterval: 500000
  };

  public now = 0;

  colorNormal = "#616580";
  colorNow = "#a2e2ff";

  aboutWidget = "Сброс";
  units = "час";

  isMock = false;

  constructor() {}

  ngOnInit() {
    setInterval(()=>{
      this.now = Date.now();
    },1000)
  }

  timeLine() {
    const now = Date.now();
    return (
      ((now - (this.data.dropTimeNext - this.data.dropInterval)) /
        this.data.dropInterval) *
        100 +
      "%"
    );
  }
}
