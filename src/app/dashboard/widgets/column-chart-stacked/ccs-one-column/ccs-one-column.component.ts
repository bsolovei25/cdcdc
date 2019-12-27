import { Component, OnInit, Input, AfterViewInit } from "@angular/core";

@Component({
  selector: "evj-ccs-one-column",
  templateUrl: "./ccs-one-column.component.html",
  styleUrls: ["./ccs-one-column.component.scss"]
})
export class CcsOneColumnComponent implements OnInit, AfterViewInit {
  @Input() data: any;

  colorActive = "#8c99b2";
  colorDisable = "#606580";
  colorPlan = "#f4a321";
  colorFact = "#ffffff";
  colorNormal = "#A2E2FF";

  defaultIconPath = "../../../../../assets/icons/widgets/column-chart-stacked/";

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.graphIcon()
  }

  graphIcon(): string {
    if (this.data.iconId) {
      return this.defaultIconPath + this.data.iconId + ".svg";
    }
    return '';
  }

  graphValues() {
    const maxValue: number = this.data.max + 7;
    const plan = Math.round((this.data.plan / maxValue) * 100);
    let fact = this.data.plan ? Math.round((this.data.fact / this.data.plan) * 100) : 0;
    if (this.data.fact > this.data.plan) fact = plan;
    const values = {
      plan: plan + "%",
      fact: fact + "%",
      pusher: (100 - plan) + "%"
    };

    return values;
  }

  graphColor(): string {
    if (this.data.plan === this.data.fact) return this.colorNormal;
    return this.colorFact;
  }

  fontColor(isOnGraph: boolean = false): string {
    if (this.data.plan === 0) return this.colorDisable;
    if (isOnGraph && this.data.plan === this.data.fact) return this.colorNormal;
    if (isOnGraph) return this.colorFact;
    return this.colorActive;
  }

  iconColor(): string {
    if (this.data.plan === 0) return this.colorDisable;
    if (this.data.plan === this.data.fact) return this.colorNormal;
    return this.colorActive;
  }
}
