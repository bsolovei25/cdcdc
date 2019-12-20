import { Component, OnInit, Inject } from "@angular/core";
import { NewWidgetService } from "../../services/new-widget.service";
import { Subscription } from "rxjs";

@Component({
  selector: "evj-semicircle-energy",
  templateUrl: "./semicircle-energy.component.html",
  styleUrls: ["./semicircle-energy.component.scss"]
})
export class SemicircleEnergyComponent implements OnInit {
  testLogo = 2;

  /* Параметры для круговых диаграмм */

  energyCircleDiagram = {
    lowerLimit: 80, // нижний предел на диаграмме в %
    higherLimit: 110, // верхний предел на диаграмме в %
    production1: 102, // процентная доля Пр-во1
    production2: 79, // процентная доля Пр-во2
    production3: 97, // процентная доля Товарное
    production4: 125 // процентная доля ОЗХ
  };

  isWarning = false;

  /* Цвета для диаграмм */

  colorMain = "#1b1e27";
  colorBg = "#0d1014";
  colorNormal = "#a2e2ff";
  colorFull = "#FFFFFF";
  colorDeviation = "#F4A321";

  /* Координаты центров окружностей */

  centerX = "25";
  centerY = "30";

  /* Радиусы диаграмм */

  radProd4 = (15.91549430918954).toString();
  radProd3 = (15.91549430918954 + 3).toString();
  radProd2 = (15.91549430918954 + 6).toString();
  radProd1 = (15.91549430918954 + 9).toString();

  public diagramLogo: string =
    "../../../../assets/icons/widgets/energetics/termo.svg";
  public diagramLogoDanger: string =
    "../../../../assets/icons/widgets/energetics/termo_danger.svg";

  public title;
  public units = "кг/м^3";

  subscription: Subscription;

  static itemCols = 14;
  static itemRows = 11;

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

  ngOnInit() {
    // setInterval(() => {
    //   this.warningControl();
    // }, 5000);
  }

  logoType(flag: number) {
    switch (flag) {
      case 0:
        this.diagramLogo =
          "../../../../assets/icons/widgets/energetics/termo.svg";
        this.diagramLogoDanger =
          "../../../../assets/icons/widgets/energetics/termo_danger.svg";
        return;
      case 1:
        this.diagramLogo =
          "../../../../assets/icons/widgets/energetics/electro.svg";
        this.diagramLogoDanger =
          "../../../../assets/icons/widgets/energetics/electro_danger.svg";
        return;
      case 2:
        this.diagramLogo =
          "../../../../assets/icons/widgets/energetics/fuel.svg";
        this.diagramLogoDanger =
          "../../../../assets/icons/widgets/energetics/fuel_danger.svg";
        return;
    }
  }

  warningControl(): void {
    if (
      this.energyCircleDiagram.production1 <
        this.energyCircleDiagram.lowerLimit ||
      this.energyCircleDiagram.production2 <
        this.energyCircleDiagram.lowerLimit ||
      this.energyCircleDiagram.production3 <
        this.energyCircleDiagram.lowerLimit ||
      this.energyCircleDiagram.production4 < this.energyCircleDiagram.lowerLimit
    ) {
      this.isWarning = true;
      return;
    }
    if (
      this.energyCircleDiagram.production1 >
        this.energyCircleDiagram.higherLimit ||
      this.energyCircleDiagram.production2 >
        this.energyCircleDiagram.higherLimit ||
      this.energyCircleDiagram.production3 >
        this.energyCircleDiagram.higherLimit ||
      this.energyCircleDiagram.production4 >
        this.energyCircleDiagram.higherLimit
    ) {
      this.isWarning = true;
      return;
    }
    this.isWarning = false;
  }

  /* Отрисовка дуговых диаграмм */

  diaCounter(r: string): string {
    const c: number = 2 * Math.PI * +r;
    return 0.5 * c + " " + 0.5 * c;
  }

  diaLine(r: string, line: number): string {
    const c: number = 2 * Math.PI * +r;
    const per_cent = line / 100;
    return ((per_cent * 3) / 8) * c + " " + (1 - (per_cent * 3) / 8) * c;
  }

  diaOffset(r: string, line: number): string {
    const c: number = 2 * Math.PI * +r;
    const per_cent = line / 100;
    return (0.5 * c).toString();
  }

  diaLimits(line: number) {
    const newLine = 100 - line; // отсчет угла от 100%
    const t = (((1.5 * Math.PI) / 2) * newLine) / 100 + (2.5 * Math.PI) / 2;
    const rMin = 13.7;
    const rMax = 27.3;
    const limitLine = {
      x1: (-rMin * Math.cos(t) + +this.centerX).toString(),
      y1: (rMin * Math.sin(t) + +this.centerY).toString(),
      x2: (-rMax * Math.cos(t) + +this.centerX).toString(),
      y2: (rMax * Math.sin(t) + +this.centerY).toString()
    };
    return limitLine;
  }

  diaFill(percent: number): string {
    if (percent < this.energyCircleDiagram.lowerLimit)
      return this.colorDeviation;
    if (
      percent >= this.energyCircleDiagram.lowerLimit &&
      percent < this.energyCircleDiagram.higherLimit
    )
      return this.colorNormal;
    if (percent === this.energyCircleDiagram.higherLimit) return this.colorFull;
    if (percent > this.energyCircleDiagram.higherLimit)
      return this.colorDeviation;
  }
}
