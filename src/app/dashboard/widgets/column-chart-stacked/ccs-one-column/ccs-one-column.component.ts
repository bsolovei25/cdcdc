import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "evj-ccs-one-column",
  templateUrl: "./ccs-one-column.component.html",
  styleUrls: ["./ccs-one-column.component.scss"]
})
export class CcsOneColumnComponent implements OnInit {
  @Input() data: any;

  colorActive = "#8c99b2";
  colorDisable = "#606580";
  colorPlan = "#f4a321";
  colorFact = "#ffffff";
  colorNormal = "#A2E2FF";

  pusherHeight = "100%";

  constructor() {}

  ngOnInit() {}

  graphValues() {
    const maxValue: number = this.data.max + 7;
    const plan = (this.data.plan / maxValue) * 100;
    const fact = this.data.plan ? (this.data.fact / this.data.plan) * 100 : 0;
    const values = {
      plan: plan + "%",
      fact: fact + "%"
    };
    this.pusherHeight = 100 - plan + "%";

    return values;
  }

  graphColor(): string {
    if (this.data.plan === this.data.fact) return this.colorNormal;
    return this.colorFact;
  }

  fontColor(isOnGraph: boolean = false): string {
    if (this.data.plan === 0) return this.colorDisable;
    if (isOnGraph) return this.colorFact;
    return this.colorActive;
  }
}
