import { Component, OnInit, ElementRef, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';


declare var d3: any;

@Component({
  selector: 'evj-polar-chart',
  templateUrl: './polar-chart.component.html',
  styleUrls: ['./polar-chart.component.scss']
})
export class PolarChartComponent implements AfterViewInit {

  @ViewChild('polar', { static: false }) Polar: ElementRef;

  static itemCols = 12;
  static itemRows = 12;

  public title;
  public code;
  public units;
  public name;

  public index = 0;

  public points = [
    { line: 1, point: 1, x: 75, y: 30 },
    { line: 2, point: 2, x: 96.5, y: 42.5 },
    { line: 3, point: 3, x: 96.5, y: 67.5 },
    { line: 4, point: 4, x: 75, y: 80 },
    { line: 5, point: 5, x: 53.5, y: 67.5 },
    { line: 6, point: 6, x: 53.5, y: 42.5 }
  ]

  public pointTop = [
    { line: 1, x: 75, y: 15 },
    { line: 2, x: 115, y: 32 },
    { line: 3, x: 115, y: 78 },
    { line: 4, x: 75, y: 96 },
    { line: 5, x: 35, y: 78 },
    { line: 6, x: 35, y: 32 }
  ]

  public pointBottom = [
    { line: 1, x: 75, y: 46 },
    { line: 2, x: 83, y: 50.5 },
    { line: 3, x: 82.74, y: 59.5 },
    { line: 4, x: 75, y: 64 },
    { line: 5, x: 67.3, y: 59.45 },
    { line: 6, x: 67, y: 50.5 }
  ]

  public imageBorder = [
    { block: 1, x: 58, y: -26 },
    { block: 2, x: 98, y: -9 },
    { block: 3, x: 98, y: 47.2 },
    { block: 4, x: 58, y: 65 },
    { block: 5, x: 18, y: 47.2 },
    { block: 6, x: 18, y: -9 },
  ]

  public data = [
    {
      line: 1,
      value: 100,
      forecast: 96.4,
      plan: 96.3,
      title: "Эксплуатационная готовность",
      state: "normal",
      valueType: "procent"
    },
    {
      line: 2,
      value: 100,
      forecast: 4.75,
      plan: 4.75,
      title: "Топливо",
      state: "default",
      valueType: "procent"
    },
    {
      line: 3,
      value: 100,
      forecast: 100,
      plan: 100,
      title: "Ассортимент",
      state: "default",
      valueType: "procent"
    },
    {
      line: 4,
      value: 100,
      forecast: 93.0,
      plan: 92.7,
      title: "Глубина переработки",
      state: "normal",
      valueType: "procent"
    },
    {
      line: 5,
      value: 110,
      forecast: 1.636,
      plan: 1.635,
      title: "Объем переработки",
      state: "critical",
      valueType: "mln"
    },
    {
      line: 6,
      value: 100,
      forecast: 105.6,
      plan: 105.6,
      title: "Энергоэффектиность",
      state: "default",
      valueType: "eii"
    },
  ];

  public longLine = [];
  public shortLine = [];
  public valueLine = [];

  private subscriptions: Subscription[] = [];

  constructor(
    public widgetService: NewWidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    this.subscriptions.push(this.widgetService.getWidgetChannel(this.id).subscribe(data => {
      this.title = data.title;
      this.code = data.code;
      this.units = data.units;
      this.name = data.name;
    }));
  }

  ngAfterViewInit() {
    if (!this.isMock) {
      this.longLines(this.pointTop, this.pointBottom);
      this.shortLines(this.points, this.pointBottom);
      this.valueLines(this.data, this.longLine, this.shortLine);
      this.drawNewLine(this.data);
      this.drawPolar(this.data, this.Polar.nativeElement);
    }

  }

  ngOnDestroy() {
    if (this.subscriptions) {
      for (const subscription of this.subscriptions) {
        subscription.unsubscribe();
      }
    }

  }

  public drawPolar(data, el) {
    let indexBorder = 0;
    let indexLine = 0;

    let canvas = d3.select(el).append("svg")
      .attr("min-width", "100px")
      .attr("viewBox", "10 0 150 120");

    let imageFrame = canvas.append("image")
      .attr("xlink:href", "./assets/pic/PolarWidget/polar_frame.png")
      .attr("height", "50px")
      .attr("width", "50px")
      .attr("x", "50")
      .attr("y", "30");

    let imageLogo = canvas.append("image")
      .attr("xlink:href", "./assets/pic/PolarWidget/polar_logo.png")
      .attr("height", "10px")
      .attr("width", "10px")
      .attr("x", "70")
      .attr("y", "50");

    for (let item of this.points) {
      if (item.point === 6) {
        this.index = 0;
        canvas.append("line")
          .attr("x1", item.x)
          .attr("y1", item.y)
          .attr("x2", this.points[this.index].x)
          .attr("y2", this.points[this.index].y)
          .attr("stroke", "white")
          .attr("stroke-dasharray", "0.4")
          .attr("stroke-width", "0.3");
      } else {
        this.index++;
        canvas.append("line")
          .attr("x1", item.x)
          .attr("y1", item.y)
          .attr("x2", this.points[this.index].x)
          .attr("y2", this.points[this.index].y)
          .attr("stroke", "white")
          .attr("stroke-dasharray", "0.4")
          .attr("stroke-width", "0.3");
      }
    }

    for (let itemTop of this.pointTop) {
      for (let itemBottom of this.pointBottom) {
        if (itemBottom.line === itemTop.line) {
          if (itemBottom.line === 1 || itemBottom.line === 4) {
            canvas.append("line")
              .attr("x1", itemTop.x)
              .attr("y1", itemTop.y)
              .attr("x2", itemBottom.x)
              .attr("y2", itemBottom.y)
              .attr("stroke", (data[indexLine].state === "default") ? "gray" : (data[indexLine].state === "normal") ?
                "white" : "orange")
              .attr("stroke-dasharray", "0.3")
              .attr("stroke-width", "0.2");
            indexLine++;
          } else {
            canvas.append("line")
              .attr("x1", itemTop.x)
              .attr("y1", itemTop.y)
              .attr("x2", itemBottom.x)
              .attr("y2", itemBottom.y)
              .attr("stroke", (data[indexLine].state === "default") ? "gray" : (data[indexLine].state === "normal") ?
                "white" : "orange")
              .attr("stroke-dasharray", "0.3")
              .attr("stroke-width", "0.3");
            indexLine++;
          }

        }
      }
    }


    for (let border of this.imageBorder) {
      canvas.append("svg:image")
        .attr("xlink:href", (data[indexBorder].state === "default") ? "./assets/pic/PolarWidget/polar_border2.svg" : (data[indexBorder].state === "normal") ?
          "./assets/pic/PolarWidget/polar_border1.svg" : "./assets/pic/PolarWidget/polar_border3.svg")
        .attr("height", "80px")
        .attr("width", "50px")
        .attr("x", border.x)
        .attr("y", border.y);
      indexBorder++;
    }


    let titleText1 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.9px")
      .attr("x", "75")
      .attr("y", "8")
      .attr("text-anchor", "middle")
      .attr("fill", (data[0].state === "default") ? "#a2e2ff" : "white")
      .text(data[0].title);


    let forecastText1 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "64")
      .attr("y", "13")
      .attr("fill", "white")
      .text("Прогноз");

    let planText1 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "82")
      .attr("y", "13")
      .attr("fill", "#a2e2ff")
      .text("План");

    let forecastTextData1 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "2.4px")
      .attr("x", "67")
      .attr("y", "11")
      .attr("text-anchor", "middle")
      .attr("fill", (data[0].state === "critical") ? "orange" : "white")
      .text((data[0].valueType === "procent") ? data[0].forecast + " %" : (data[0].valueType === "mln") ? data[0].forecast + " млн.т" : data[0].forecast + " EII");

    let planTextData1 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "2.4px")
      .attr("x", "84")
      .attr("y", "11")
      .attr("text-anchor", "middle")
      .attr("fill", "#a2e2ff")
      .text((data[0].valueType === "procent") ? data[0].plan + " %" : (data[0].valueType === "mln") ? data[0].plan + " млн.т" : data[0].plan + " EII");


    let titleText2 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.9px")
      .attr("x", "115")
      .attr("y", "25")
      .attr("text-anchor", "middle")
      .attr("fill", (data[1].state === "default") ? "#a2e2ff" : "white")
      .text(data[1].title);


    let forecastText2 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "104")
      .attr("y", "30")
      .attr("fill", "white")
      .text("Прогноз");

    let planText2 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "122")
      .attr("y", "30")
      .attr("fill", "#a2e2ff")
      .text("План");

    let forecastTextData2 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "2.4px")
      .attr("x", "107")
      .attr("y", "28")
      .attr("text-anchor", "middle")
      .attr("fill", (data[1].state === "critical") ? "orange" : "white")
      .text((data[1].valueType === "procent") ? data[1].forecast + " %" : (data[1].valueType === "mln") ? data[1].forecast + " млн.т" : data[1].forecast + " EII");

    let planTextData2 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "2.4px")
      .attr("x", "124")
      .attr("y", "28")
      .attr("text-anchor", "middle")
      .attr("fill", "#a2e2ff")
      .text((data[1].valueType === "procent") ? data[1].plan + " %" : (data[1].valueType === "mln") ? data[1].plan + " млн.т" : data[1].plan + " EII");


    let titleText3 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.9px")
      .attr("x", "115")
      .attr("y", "81")
      .attr("text-anchor", "middle")
      .attr("fill", (data[2].state === "default") ? "#a2e2ff" : "white")
      .text(data[2].title);


    let forecastText3 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "104")
      .attr("y", "86")
      .attr("fill", "white")
      .text("Прогноз");

    let planText3 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "122")
      .attr("y", "86")
      .attr("fill", "#a2e2ff")
      .text("План");

    let forecastTextData3 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "2.4px")
      .attr("x", "107")
      .attr("y", "84")
      .attr("text-anchor", "middle")
      .attr("fill", (data[2].state === "critical") ? "orange" : "white")
      .text((data[2].valueType === "procent") ? data[2].forecast + " %" : (data[2].valueType === "mln") ? data[2].forecast + " млн.т" : data[2].forecast + " EII");

    let planTextData3 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "2.4px")
      .attr("x", "124")
      .attr("y", "84")
      .attr("text-anchor", "middle")
      .attr("fill", "#a2e2ff")
      .text((data[2].valueType === "procent") ? data[2].plan + " %" : (data[2].valueType === "mln") ? data[2].plan + " млн.т" : data[2].plan + " EII");

    let titleText4 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.9px")
      .attr("x", "75")
      .attr("y", "99")
      .attr("text-anchor", "middle")
      .attr("fill", (data[3].state === "default") ? "#a2e2ff" : "white")
      .text(data[3].title);


    let forecastText4 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "64")
      .attr("y", "104")
      .attr("fill", "white")
      .text("Прогноз");

    let planText4 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "82")
      .attr("y", "104")
      .attr("fill", "#a2e2ff")
      .text("План");

    let forecastTextData4 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "2.4px")
      .attr("x", "67")
      .attr("y", "102")
      .attr("text-anchor", "middle")
      .attr("fill", (data[3].state === "critical") ? "orange" : "white")
      .text((data[3].valueType === "procent") ? data[3].forecast + " %" : (data[3].valueType === "mln") ? data[3].forecast + " млн.т" : data[3].forecast + " EII");

    let planTextData4 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "2.4px")
      .attr("x", "84")
      .attr("y", "102")
      .attr("text-anchor", "middle")
      .attr("fill", "#a2e2ff")
      .text((data[3].valueType === "procent") ? data[3].plan + " %" : (data[3].valueType === "mln") ? data[3].plan + " млн.т" : data[3].plan + " EII");

    let titleText5 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.9px")
      .attr("x", "35")
      .attr("y", "81")
      .attr("text-anchor", "middle")
      .attr("fill", (data[4].state === "default") ? "#a2e2ff" : "white")
      .text(data[4].title);


    let forecastText5 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "24")
      .attr("y", "86")
      .attr("fill", "white")
      .text("Прогноз");

    let planText5 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "42")
      .attr("y", "86")
      .attr("fill", "#a2e2ff")
      .text("План");

    let forecastTextData5 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "2.4px")
      .attr("x", "27")
      .attr("y", "84")
      .attr("text-anchor", "middle")
      .attr("fill", (data[4].state === "critical") ? "orange" : "white")
      .text((data[4].valueType === "procent") ? data[4].forecast + " %" : (data[4].valueType === "mln") ? data[4].forecast + " млн.т" : data[4].forecast + " EII");

    let planTextData5 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "2.4px")
      .attr("x", "43")
      .attr("y", "84")
      .attr("text-anchor", "middle")
      .attr("fill", "#a2e2ff")
      .text((data[4].valueType === "procent") ? data[4].plan + " %" : (data[4].valueType === "mln") ? data[4].plan + " млн.т" : data[4].plan + " EII");

    let titleText6 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.9px")
      .attr("x", "35")
      .attr("y", "25")

      .attr("text-anchor", "middle")
      .attr("fill", (data[5].state === "default") ? "#a2e2ff" : "white")
      .text(data[5].title);


    let forecastText6 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "24")
      .attr("y", "30")
      .attr("fill", "white")
      .text("Прогноз");

    let forecastTextData6 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "2.4px")
      .attr("x", "27")
      .attr("y", "28")
      .attr("text-anchor", "middle")
      .attr("fill", (data[5].state === "critical") ? "orange" : "white")
      .text((data[5].valueType === "procent") ? data[5].forecast + " %" : (data[5].valueType === "mln") ? data[5].forecast + " млн.т" : data[5].forecast + " EII");

    let planText6 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "42")
      .attr("y", "30")
      .attr("fill", "#a2e2ff")
      .text("План");

    let planTextData6 = canvas.append("text")
      .attr("font-family", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "2.4px")
      .attr("x", "43")
      .attr("y", "28")
      .attr("fill", "#a2e2ff")
      .attr("text-anchor", "middle")
      .text((data[5].valueType === "procent") ? data[5].plan + " %" : (data[5].valueType === "mln") ? data[5].plan + " млн.т" : data[5].plan + " EII");




  }

  public drawNewLine(data) {
    let index;
    for (let item of data) {
      if (item.value > 100) {
        index = item.line - 1;
        this.changePointsTop(this.longLine[index], this.shortLine[index], this.valueLine[index], index);

      } else if (item.value < 100) {
        index = item.line - 1;
        this.changePointsBottom(this.longLine[index], this.valueLine[index], index);
      }
    }
  }

  public longLines(pointTop, pointBottom) {
    for (let itemTop of pointTop) {
      for (let itemBottom of pointBottom) {
        if (itemTop.line === itemBottom.line) {
          this.longLine.push(Math.sqrt(((itemTop.x - itemBottom.x) ** 2) + ((itemTop.y - itemBottom.y) ** 2)));
        }
      }
    }
  }

  public shortLines(point, pointBottom) {
    for (let itemPoint of point) {
      for (let itemBottom of pointBottom) {
        if (itemPoint.line === itemBottom.line) {
          let line = itemPoint.line;
          this.shortLine.push(Math.sqrt(((itemPoint.x - itemBottom.x) ** 2) + ((itemPoint.y - itemBottom.y) ** 2)));
        }
      }
    }
  }

  public valueLines(data, longLine, short) {
    for (let itemData of data) {
      let index = 0;
      if (itemData.value <= 100) {
        for (let itemLine of short) {
          index++;
          if (itemData.line === index) {
            this.valueLine.push((itemLine / 100) * (100 - (100 - itemData.value)));
          }
        }
      } else {
        for (let itemLine of longLine) {
          index++;
          if (itemData.line === index) {
            this.valueLine.push((itemLine / 100) * (itemData.value - 100));
          }
        }
      }
    }
  }

  public changePointsTop(long, short, value, index) {
    let line1 = long - short;
    let K = value / line1;
    this.newPoints(this.pointTop[index], this.points[index], K, index);
  }

  public changePointsBottom(long, value, index) {
    let line1 = long - value;
    let K = value / line1;
    this.newPoints(this.pointTop[index], this.pointBottom[index], K, index);
  }

  public newPoints(pointTop, pointBottom, K, index) {
    let x = ((pointBottom.x + K * pointTop.x) / (1 + K));
    let y = ((pointBottom.y + K * pointTop.y) / (1 + K));
    this.newLine(this.points[index], x, y);
  }

  public newLine(points, newX, newY) {
    points.x = newX;
    points.y = newY;
  }

}
