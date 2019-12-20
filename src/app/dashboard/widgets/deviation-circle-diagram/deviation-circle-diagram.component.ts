import { Component, OnInit } from "@angular/core";

@Component({
  selector: "evj-deviation-circle-diagram",
  templateUrl: "./deviation-circle-diagram.component.html",
  styleUrls: ["./deviation-circle-diagram.component.scss"]
})
export class DeviationCircleDiagramComponent implements OnInit {
  isMock = false;

  deviationCircleDiagram = {
    deviation: 30,
    improvement: 25
  };

  /* Цвета для диаграмм */

  colorMain = "#1b1e27";
  colorBg = "#0d1014";
  colorNormal = "#a2e2ff";
  colorFull = "#FFFFFF";
  colorDeviation = "#F4A321";

  /* Координаты центров окружностей */

  centerX = "25";
  centerY = "25";

  radius = "19";

  constructor() {}

  ngOnInit() {}

  /* Отрисовка дуговых диаграмм */

  diaCounter(r: string): string {
    const c: number = 2 * Math.PI * +r;
    return 0.75 * c + " " + 0.25 * c;
  }

  diaLine(r: string, line: number): string {
    const c: number = 2 * Math.PI * +r;
    const per_cent = line / 100;
    return per_cent * c + " " + (c - per_cent * c);
  }

  diaOffset(r: string, line: number): string {
    const c: number = 2 * Math.PI * +r;
    const per_cent = line / 100;
    return (-0.75 * c).toString();
  }

  diaLimits(line: number) {
    const newLine = 100 - line; // отсчет угла от 100%
    const t = (Math.PI * newLine) / 100 + Math.PI / 2;
    const rMin = 13;
    const rMax = 25;
    const limitLine = {
      x1: (rMin * Math.cos(t) + +this.centerX).toString(),
      y1: (rMin * Math.sin(t) + +this.centerY).toString(),
      x2: (rMax * Math.cos(t) + +this.centerX).toString(),
      y2: (rMax * Math.sin(t) + +this.centerY).toString()
    };
    return limitLine;
  }

  diaLimitsLabels(line: number, isLowerLimit: boolean = false) {
    const coords = this.diaLimits(line);
    let returnedCoords;
    if (isLowerLimit) {
      returnedCoords = {
        x: (+coords.x2 - 5).toString(),
        y: (+coords.y2 + 2).toString()
      };
    } else {
      returnedCoords = {
        x: coords.x2,
        y: (+coords.y2 + 2).toString()
      };
    }
    return returnedCoords;
  }
}
