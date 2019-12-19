import { Component, OnInit, Inject } from "@angular/core";
import { Subscription } from "rxjs";
import { NewWidgetService } from "../../services/new-widget.service";

@Component({
  selector: "evj-energetics",
  templateUrl: "./energetics.component.html",
  styleUrls: ["./energetics.component.scss"]
})
export class EnergeticsComponent implements OnInit {
  aboutWidget;

  static itemCols = 18;
  static itemRows = 13;

  subscription: Subscription;

  /* Приблизительная структура, получаемая с бека */

  data = {
    plan: 1000, // план
    lowerBorder: 0.03, // нижняя граница (отклонение в процентах от плана)
    higherBorder: 0.1, // верхняя граница (отклонение в процентах от плана)
    curValue: 1070, // текущее значение
    maxValue: 1500, // максимальное значение (для отрисовки графика)

    /* Вычислить при получении данных */
    // lowerValue = this.data.plan * (1 - this.data.lowerBorder);
    // higherValue = this.data.plan * (1 + this.data.higherBorder);

    lowerValue: 1000 * (1 - 0.03),
    higherValue: 1000 * (1 + 0.1)
  };

  /* Данные с сервера для карточек */

  termoCard = {
    plan: 1000,
    curValue: 623,
    deviation1: 142.8,
    deviation2: 0.1
  };

  electroCard = {
    plan: 1500,
    curValue: 1230,
    deviation1: 17.7,
    deviation2: 49.9
  };

  fuelCard = {
    plan: 2500,
    curValue: 2690,
    deviation1: 85.3,
    deviation2: 59.9
  };

  /* Параметры для круговых диаграмм */

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

  /* Переменные цветов */

  colorMain = "#1b1e27";
  colorBg = "#0d1014";
  colorNormal = "#a2e2ff";
  colorFull = "#FFFFFF";
  colorDeviation = "#F4A321";

  constructor(
    private widgetService: NewWidgetService,
    @Inject("isMock") public isMock: boolean,
    @Inject("widgetId") public id: string
  ) {
    this.subscription = this.widgetService
      .getWidgetChannel(this.id)
      .subscribe(data => {
        this.aboutWidget = data.title;
      });
  }

  ngOnInit() {}

  /* Отрисовка линейных графиков в карточках */

  drawGraph(obj): string {
    return ((obj.curValue / obj.plan) * 100 * 0.8).toString() + "%";
  }

  fillGraph(obj): string {
    return obj.plan - obj.curValue > 0 ? this.colorNormal : this.colorDeviation;
  }

  /* Отрисовка дуговых диаграмм */

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
