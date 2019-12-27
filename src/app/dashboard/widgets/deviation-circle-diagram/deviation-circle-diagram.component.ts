import { Component, OnInit, Inject } from "@angular/core";
import { Subscription } from "rxjs";
import { NewWidgetService } from "../../services/new-widget.service";

@Component({
  selector: "evj-deviation-circle-diagram",
  templateUrl: "./deviation-circle-diagram.component.html",
  styleUrls: ["./deviation-circle-diagram.component.scss"]
})
export class DeviationCircleDiagramComponent implements OnInit {
  deviationCircleDiagram = {
    deviation: 55, // отклонение в %
    improvement: 40, // улучшение в %
    maxValue: 100
  };

  isMockData = {
    deviation: 60, // отклонение в %
    improvement: 45, // улучшение в %
    maxValue: 80
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
  radPoint = "0.8";

  public title;
  public units = "%";

  subscription: Subscription;

  static itemCols = 10;
  static itemRows = 8;

  constructor(
    private widgetService: NewWidgetService,
    @Inject("isMock") public isMock: boolean,
    @Inject("widgetId") public id: string,
    @Inject("uniqId") public uniqId: string
  ) {
    this.subscription = this.widgetService
      .getWidgetChannel(this.id)
      .subscribe(data => {
        this.title = data.title;
        // this.code = data.code;
        // this.units = data.units;
        // this.name = data.name;
      });
  }

  ngOnInit() {}

  /* Отрисовка дуговых диаграмм */

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

  diaLinePoint(line: number, isOuter: boolean) {
    const per_cent = line / 100;
    const t =
      per_cent < 1 ? 2 * Math.PI * per_cent - Math.PI / 2 : (3 / 2) * Math.PI;
    const r = isOuter ? +this.radius + 3 : +this.radius - 3;
    const centerOfPoint = {
      xCen: (r * Math.cos(t) + +this.centerX).toString(),
      yCen: (r * Math.sin(t) + +this.centerY).toString()
    };
    return centerOfPoint;
  }
}
