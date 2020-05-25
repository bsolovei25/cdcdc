import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';
import { IQualityStockCircle } from '../../quality-stock.component';
import { IEnergeticsCircleDiagram, IEnergeticsLimits, IEnergeticsCoordinates, IEnergeticsEndsLine } from 'src/app/dashboard/models/energetics';

@Component({
  selector: 'evj-quality-stock-circle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quality-stock-circle.component.html',
  styleUrls: ['./quality-stock-circle.component.scss']
})
export class QualityStockCircleComponent implements OnInit, OnChanges {
  @ViewChild('circle', { static: true }) circle: ElementRef;

  @Input() data: IQualityStockCircle;

  public energyCircleDiagram: IEnergeticsCircleDiagram = {
    lowerLimit: 80, // нижний предел на диаграмме в %
    upperLimit: 90, // верхний предел на диаграмме в %
    termo: 102, // процентная доля тепловой энергии
    electro: 87, // процентная доля электро энергии
    fuel: 125, // процентная доля топлива
  };

  /* Координаты центров окружностей */

  public centerX: string = '25';
  public centerY: string = '25';

  /* Цвета для диаграмм */

  public colorMain: string = 'var(--color-bg-header-table)';
  public colorBg: string = 'rgba(91, 96, 125, 0.6)';
  public colorNormal: string = 'var(--color-text-main)';
  public colorFull: string = 'var(--color-standard)';
  public colorDeviation: string = 'var(--color-standard)';

  /* Радиусы диаграмм */

  public fuelRadius: string = (15.91549430918954).toString();
  public electroRadius: string = (15.91549430918954 + 3).toString();
  public termoRadius: string = (15.91549430918954 + 6).toString();
  public radPoint: string = '0.8';

  public dataN = {
    circleDiagram: { lowerLimit: 80, upperLimit: 90, termo: 102, electro: 0, fuel: 0 },
    curValue: 10000,
    currentValue: 10000,
    electroCard: {
      cardType: "electro",
      curValue: 3000,
      currentValue: 3000,
      deviation1: 142.1,
      deviation2: 0.1,
      plan: 1000,
    },
    fuelCard: {
      cardType: "fuel",
      curValue: 620,
      currentValue: 620,
      deviation1: 142.1,
      deviation2: 0.1,
      plan: 1000,
    },
    higherBorder: 0.1,
    higherValue: 1100,
    lowerBorder: 0.2,
    lowerValue: 800,
    maxValue: 1500,
    plan: 1000,
    termoCard: {
      cardType: "termo",
      curValue: 1900,
      currentValue: 1900,
      deviation1: 142.1,
      deviation2: 0.1,
      plan: 1000
    },
    title: "Энергетика",
    unitsOfMeasure: "индекс",
    widgetType: "energetics",
  }


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.dataN.lowerBorder =
      Math.abs(this.dataN.lowerBorder - this.dataN.plan) / this.dataN.plan;
    this.dataN.higherBorder =
      Math.abs(this.dataN.higherBorder - this.dataN.plan) / this.dataN.plan;
    this.dataN.lowerValue = this.dataN.plan * (1 - this.dataN.lowerBorder);
    this.dataN.higherValue = this.dataN.plan * (1 + this.dataN.higherBorder);
    this.energyCircleDiagram = this.dataN.circleDiagram;
  }

  /* Отрисовка дуговых диаграмм */

  diaCounter(r: string): string {
    const c: number = 2 * Math.PI * +r;
    return 0.75 * c + ' ' + 0.25 * c;
  }

  diaLine(r: string, line: number): string {
    const c: number = 2 * Math.PI * +r;
    const percent: number = line / 100;
    let lineLength: number = percent * 0.5 * c;
    if (lineLength > 0.75 * c) {
      lineLength = 0.75 * c;
    }
    return lineLength + ' ' + (c - lineLength);
  }

  diaOffset(r: string, line: number): string {
    const c: number = 2 * Math.PI * +r;
    const percent: number = line / 100;
    let lineLength: number = percent * 0.5 * c;
    if (lineLength > 0.75 * c) {
      lineLength = 0.75 * c;
    }
    return (-0.75 * c + lineLength).toString();
  }

  diaLimits(line: number): IEnergeticsLimits {
    const newLine = 100 - line; // отсчет угла от 100%
    const t = (Math.PI * newLine) / 100 + Math.PI / 2;
    const rMin = 13;
    const rMax = 25;
    const limitLine: IEnergeticsLimits = {
      x1: (rMin * Math.cos(t) + +this.centerX).toString(),
      y1: (rMin * Math.sin(t) + +this.centerY).toString(),
      x2: (rMax * Math.cos(t) + +this.centerX).toString(),
      y2: (rMax * Math.sin(t) + +this.centerY).toString(),
    };
    return limitLine;
  }

  diaLimitsLabels(line: number, isLowerLimit: boolean = false): IEnergeticsCoordinates {
    const coords = this.diaLimits(line);
    let returnedCoords: IEnergeticsCoordinates;
    if (isLowerLimit) {
      returnedCoords = {
        x: (+coords.x2 - 5).toString(),
        y: (+coords.y2 + 3).toString(),
      };
    } else {
      returnedCoords = {
        x: coords.x2,
        y: (+coords.y2 + 3).toString(),
      };
    }
    return returnedCoords;
  }

  diaFill(percent: number): string {
    if (percent < this.energyCircleDiagram.lowerLimit) {
      return this.colorDeviation;
    }
    if (
      percent >= this.energyCircleDiagram.lowerLimit &&
      percent < this.energyCircleDiagram.upperLimit
    ) {
      return this.colorNormal;
    }
    if (percent === this.energyCircleDiagram.upperLimit) {
      return this.colorFull;
    }
    if (percent > this.energyCircleDiagram.upperLimit) {
      return this.colorDeviation;
    }
  }

  diaEndsLine(line: number, rad: string): IEnergeticsEndsLine {
    let newLine = 100 - line + +this.radPoint; // отсчет угла от 100%
    if (newLine < -50) {
      newLine = -50 + +this.radPoint * 2;
    }
    const t = (Math.PI * newLine) / 100 + Math.PI / 2;
    const r = +rad;
    const limitLine: IEnergeticsEndsLine = {
      xCen: (r * Math.cos(t) + +this.centerX).toString(),
      yCen: (r * Math.sin(t) + +this.centerY).toString(),
    };
    return limitLine;
  }

}
