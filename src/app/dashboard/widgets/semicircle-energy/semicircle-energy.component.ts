import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { NewWidgetService } from "../../services/new-widget.service";
import { Subscription } from "rxjs";

@Component({
  selector: "evj-semicircle-energy",
  templateUrl: "./semicircle-energy.component.html",
  styleUrls: ["./semicircle-energy.component.scss"]
})
export class SemicircleEnergyComponent implements OnInit, OnDestroy {
  /* Параметры для круговых диаграмм */

  energyCircleDiagram = {
    lowerLimit: 0, // нижний предел на диаграмме в %
    upperLimit: 0, // верхний предел на диаграмме в %
    production1: 0, // процентная доля Пр-во1
    production2: 0, // процентная доля Пр-во2
    production3: 0, // процентная доля Товарное
    production4: 0 // процентная доля ОЗХ
  };

  lowerLimit = 97;
  upperLimit = 103;

  public iconType;

  productionList = [
    {
      name: "Пр-во 1",
      plan: 0.0215,
      fact: 0.0214
    },
    {
      name: "Пр-во 2",
      plan: 0.1408,
      fact: 0.15
    },
    {
      name: "Товарное",
      plan: 17.4545,
      fact: 17.5091
    },
    {
      name: "ОЗХ",
      plan: 0.0761,
      fact: 0.0711
    }
  ];

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
  radPoint = "0.8";

  public diagramLogo: string;
  public diagramLogoDanger: string;
  public isWarning = false;

  public title;
  public units = "кг/м^3";
  public widgetType = "semicircle-energy";

  subscriptions: Subscription[] = [];

  static itemCols = 14;
  static itemRows = 11;

  public test;

  constructor(
    private widgetService: NewWidgetService,
    @Inject("isMock") public isMock: boolean,
    @Inject("widgetId") public id: string
  ) {
    this.subscriptions.push(
      this.widgetService.getWidgetChannel(this.id).subscribe(data => {
        this.title = data.title;
        // this.code = data.code;
        // this.units = data.units;
        // this.name = data.name;
      })
    );
  }

  ngOnInit() {
    if (!this.isMock) {
      this.subscriptions.push(
        this.widgetService
          .getWidgetLiveDataFromWS(this.id, this.widgetType)
          .subscribe(data => {
            this.iconType = data.iconType;
            this.lowerLimit = data.lowerLimit;
            this.upperLimit = data.upperLimit;
            this.productionList = data.items.slice();
            this.logoType();
            this.warningControl();
            this.drawDiagram();
          })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  drawDiagram() {
    this.energyCircleDiagram.production1 = this.productionList[0]
      ? (this.productionList[0].fact / this.productionList[0].plan) * 100
      : 0;

    this.energyCircleDiagram.production2 = this.productionList[1]
      ? (this.productionList[1].fact / this.productionList[1].plan) * 100
      : 0;
    this.energyCircleDiagram.production3 = this.productionList[2]
      ? (this.productionList[2].fact / this.productionList[2].plan) * 100
      : 0;
    this.energyCircleDiagram.production4 = this.productionList[3]
      ? (this.productionList[3].fact / this.productionList[3].plan) * 100
      : 0;
    this.energyCircleDiagram.lowerLimit = this.lowerLimit
      ? this.lowerLimit
      : 97;
    this.energyCircleDiagram.upperLimit = this.upperLimit
      ? this.upperLimit
      : 103;
  }

  logoType() {
    switch (this.iconType) {
      case 0:
        this.diagramLogo =
          "../../../../assets/icons/widgets/energetics/electro.svg";
        this.diagramLogoDanger =
          "../../../../assets/icons/widgets/energetics/electro_danger.svg";
        return;
      case 1:
        this.diagramLogo =
          "../../../../assets/icons/widgets/energetics/termo.svg";
        this.diagramLogoDanger =
          "../../../../assets/icons/widgets/energetics/termo_danger.svg";
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
        this.energyCircleDiagram.upperLimit ||
      this.energyCircleDiagram.production2 >
        this.energyCircleDiagram.upperLimit ||
      this.energyCircleDiagram.production3 >
        this.energyCircleDiagram.upperLimit ||
      this.energyCircleDiagram.production4 > this.energyCircleDiagram.upperLimit
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
      percent < this.energyCircleDiagram.upperLimit
    )
      return this.colorNormal;
    if (percent === this.energyCircleDiagram.upperLimit) return this.colorFull;
    if (percent > this.energyCircleDiagram.upperLimit)
      return this.colorDeviation;
  }

  diaEndsLine(line: number, rad: string) {
    const newLine = 100 - line + +this.radPoint; // отсчет угла от 100%
    const t = (((1.5 * Math.PI) / 2) * newLine) / 100 + (2.5 * Math.PI) / 2;
    const r = +rad;
    const centerOfTheEnd = {
      xCen: (-r * Math.cos(t) + +this.centerX).toString(),
      yCen: (r * Math.sin(t) + +this.centerY).toString()
    };
    return centerOfTheEnd;
  }
}
