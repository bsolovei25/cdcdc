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
    deviation: 30, // отклонение в %
    improvement: 25 // улучшение в %
  };

  isMockData = {
    deviation: 60, // отклонение в %
    improvement: 45 // улучшение в %
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

  public title;
  public units = "%";

  subscription: Subscription;

  static itemCols = 10;
  static itemRows = 8;

  constructor(
    private widgetService: NewWidgetService,
    @Inject("isMock") public isMock: boolean,
    @Inject("widgetId") public id: string
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
}
