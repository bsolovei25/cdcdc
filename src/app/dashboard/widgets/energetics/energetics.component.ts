import { Component, OnInit } from "@angular/core";

@Component({
  selector: "evj-energetics",
  templateUrl: "./energetics.component.html",
  styleUrls: ["./energetics.component.scss"]
})
export class EnergeticsComponent implements OnInit {
  data = {
    plan: 100,
    curValue: 63,
    maxValue: 150
  };

  termo = {
    cx: "50%",
    cy: "50%",
    r: (15.91549430918954 + 6).toString(),
    colMain: "#1b1e27",
    colBg: "#0d1014",
    colNormal: "#a2e2ff",
    colFull: "#ffffff",
    colDanger: "#f4a321"
  };

  electro = {
    cx: "50%",
    cy: "50%",
    r: (15.91549430918954 + 3).toString(),
    colMain: "#1b1e27",
    colBg: "#0d1014",
    colNormal: "#a2e2ff",
    colFull: "#ffffff",
    colDanger: "#f4a321"
  };

  fuel = {
    cx: "50%",
    cy: "50%",
    r: (15.91549430918954).toString(),
    colMain: "#1b1e27",
    colBg: "#0d1014",
    colNormal: "#a2e2ff",
    colFull: "#ffffff",
    colDanger: "#f4a321"
  };

  colorNormal = "#FFFFFF";
  colorDeviation = "#F4A321";

  constructor() {}

  ngOnInit() {}

  drawGraph(count: number): string {
    return count.toString() + "%";
  }

  fillGraph(flag: boolean): string {
    return flag ? this.colorNormal : this.colorDeviation;
  }

  diaCounter(r: string): string {
    const c: number = 2 * Math.PI * +r;
    return 0.75 * c + " " + 0.25 * c;
  }

  diaLine(r: string, line: number): string {
    const c: number = 2 * Math.PI * +r;
    const per_cent = line / 100;
    return per_cent * 0.5 * c + " " + (c - per_cent * 0.5 * c);
  }

  diaOffset(r: string, line: number): string {
    const c: number = 2 * Math.PI * +r;
    const per_cent = line / 100;
    return (-0.75 * c + per_cent * 0.5 * c).toString();
  }
}
