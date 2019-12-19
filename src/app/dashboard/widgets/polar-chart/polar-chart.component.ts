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

  @ViewChild('polar', {static:false}) Polar: ElementRef;

  static itemCols = 12;
  static itemRows = 12;

  public title;
  public code;
  public units;
  public name;

  public index = 0;

  public points = [
    {line: 1, point: 1, x: 75, y: 30},
    {line: 2, point: 2, x: 96.5, y: 42.5},
    {line: 3, point: 3, x: 96.5, y: 67.5},
    {line: 4, point: 4, x: 75, y: 80},
    {line: 5, point: 5, x: 53.5, y: 67.5},
    {line: 6, point: 6, x: 53.5, y: 42.5}
  ]

  public pointTop = [
    {line: 1, x: 75, y: 15},
    {line: 2, x: 115, y: 32},
    {line: 3, x: 115, y: 78},
    {line: 4, x: 75, y: 96},
    {line: 5, x: 35, y: 78},
    {line: 6, x: 35, y: 32}
  ]

  public pointBottom = [
    {line: 1, x: 75, y: 46},
    {line: 2, x: 83, y: 50.5},
    {line: 3, x: 82.74, y: 59.5},
    {line: 4, x: 75, y: 64},
    {line: 5, x: 67.3, y: 59.45},
    {line: 6, x: 67, y: 50.5}
  ]

  public imageBorder  = [
    {block: 1, x: 60, y: 0},
    {block: 2, x: 100, y: 17},
    {block: 3, x: 100, y: 73},
    {block: 4, x: 60, y: 91},
    {block: 5, x: 20, y: 73},
    {block: 6, x: 20, y: 17},
  ]

  public data = [
    {
    line: 1,
    value: 180,
    improvement: 94,
    deviation: 95,
    title: 100,
    valueType: "procent"
   },
   {
    line: 2,
    value: 12,
    improvement: 94,
    deviation: 95,
    title: 100,
    valueType: "procent"
   },
   {
    line: 3,
    value: 40,
    improvement: 94,
    deviation: 95,
    title: 100,
    valueType: "procent"
   },
   {
    line: 4,
    value: 130,
    improvement: 94,
    deviation: 95,
    title: 100,
    valueType: "procent"
   },
   {
    line: 5,
    value: 100,
    improvement: 94,
    deviation: 95,
    title: 100,
    valueType: "procent"
   },
   {
    line: 6,
    value: 130,
    improvement: 94,
    deviation: 95,
    title: 100,
    valueType: "procent"
   },
  ];

  public longLine = [];
  public shortLine = [];
  public valueLine = [];

  private subscriptions: Subscription[] = [];

  constructor(
    public widgetService: NewWidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string
  ) {
    this.subscriptions.push(this.widgetService.getWidgetChannel(this.id).subscribe(data => {
    this.title = data.title;
    this.code = data.code;
    this.units = data.units;
    this.name = data.name;
  }));
 }

  ngAfterViewInit() {
    if(!this.isMock){
      this.longLines(this.pointTop, this.pointBottom);
      this.shortLines(this.points, this.pointBottom);
      this.valueLines(this.data, this.longLine, this.shortLine);
      this.drawNewLine(this.data);
      this.drawPolar(this.data, this.Polar.nativeElement);
    }
    
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public drawPolar(data, el){
    let canvas = d3.select(el).append("svg")
        .attr("min-width", "100px")
        .attr("viewBox", "0 0 150 120");

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
    
    for(let item of this.points){
      if(item.point === 6){
        this.index = 0;
        canvas.append("line")
        .attr("x1", item.x)
        .attr("y1", item.y)
        .attr("x2", this.points[this.index].x)
        .attr("y2", this.points[this.index].y)
        .attr("stroke","white")
        .attr("stroke-dasharray","0.3")
        .attr("stroke-width","0.3");
      }else{
        this.index++;
        canvas.append("line")
        .attr("x1", item.x)
        .attr("y1", item.y)
        .attr("x2", this.points[this.index].x)
        .attr("y2", this.points[this.index].y)
        .attr("stroke","white")
        .attr("stroke-dasharray","0.3")
        .attr("stroke-width","0.3");
      }
    }

    for(let itemTop of this.pointTop){
      for(let itemBottom of this.pointBottom){
        if(itemBottom.line === itemTop.line){
          if(itemBottom.line === 1 || itemBottom.line === 4){
            canvas.append("line")
            .attr("x1", itemTop.x)
            .attr("y1", itemTop.y)
            .attr("x2", itemBottom.x)
            .attr("y2", itemBottom.y)
            .attr("stroke","white")
            .attr("stroke-dasharray","0.3")
            .attr("stroke-width","0.2");
          }else{
            canvas.append("line")
            .attr("x1", itemTop.x)
            .attr("y1", itemTop.y)
            .attr("x2", itemBottom.x)
            .attr("y2", itemBottom.y)
            .attr("stroke","white")
            .attr("stroke-dasharray","0.3")
            .attr("stroke-width","0.3");
          }
       
        }
      }
    }

    for(let border of this.imageBorder){
      canvas.append("image")
        .attr("xlink:href", "./assets/pic/PolarWidget/polar_border.png")
        .attr("height", "20px")
        .attr("width", "30px")
        .attr("x", border.x)
        .attr("y", border.y);
    }


      let titleText1 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.9px")
      .attr("x", "61.2")
      .attr("y", "8")
      .attr("fill", "white")
      .text("Эксплуатационная способность");

    
      let planText1 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "64")
      .attr("y", "13")
      .attr("fill","white")
      .text("Прогноз");

      let forecastText1 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "82")
      .attr("y", "13")
      .attr("fill", "#a2e2ff")
      .text("План");


      let titleText2 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.9px")
      .attr("x", "101.2")
      .attr("y", "25")
      .attr("fill", "white")
      .text("Эксплуатационная способность");

    
      let planText2 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "104")
      .attr("y", "30")
      .attr("fill","white")
      .text("Прогноз");

      let forecastText2 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "122")
      .attr("y", "30")
      .attr("fill", "#a2e2ff")
      .text("План");


      let titleText3 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.9px")
      .attr("x", "101.2")
      .attr("y", "81")
      .attr("fill", "white")
      .text("Эксплуатационная способность");

    
      let planText3 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "104")
      .attr("y", "86")
      .attr("fill","white")
      .text("Прогноз");

      let forecastText3 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "122")
      .attr("y", "86")
      .attr("fill", "#a2e2ff")
      .text("План");

      let titleText4 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.9px")
      .attr("x", "61.2")
      .attr("y", "99")
      .attr("fill", "white")
      .text("Эксплуатационная способность");

    
      let planText4 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "64")
      .attr("y", "104")
      .attr("fill","white")
      .text("Прогноз");

      let forecastText4 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "82")
      .attr("y", "104")
      .attr("fill", "#a2e2ff")
      .text("План");

      let titleText5 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.9px")
      .attr("x", "21.2")
      .attr("y", "81")
      .attr("fill", "white")
      .text("Эксплуатационная способность");

    
      let planText5 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "24")
      .attr("y", "86")
      .attr("fill","white")
      .text("Прогноз");

      let forecastText5 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "42")
      .attr("y", "86")
      .attr("fill", "#a2e2ff")
      .text("План");

      let titleText6 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.9px")
      .attr("x", "21.2")
      .attr("y", "25")
      .attr("fill", "white")
      .text("Эксплуатационная способность");

    
      let planText6 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "24")
      .attr("y", "30")
      .attr("fill","white")
      .text("Прогноз");

      let forecastText6 = canvas.append("text")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("font-size", "1.4px")
      .attr("x", "42")
      .attr("y", "30")
      .attr("fill", "#a2e2ff")
      .text("План");
     
  } 

  public drawNewLine(data){
    let index;
    for(let item of data){
      if (item.value > 100){ 
        index = item.line - 1;  
        this.changePointsTop(this.longLine[index], this.shortLine[index], this.valueLine[index], index);
        
      }else if(item.value < 100){
        index = item.line - 1;  
        this.changePointsBottom(this.longLine[index], this.valueLine[index], index);
      }
    }
  }

  public longLines(pointTop, pointBottom){
      for(let itemTop of pointTop){
        for(let itemBottom of pointBottom){
          if(itemTop.line === itemBottom.line){
              this.longLine.push(Math.sqrt(((itemTop.x - itemBottom.x)**2) + ((itemTop.y - itemBottom.y)**2)));
          }
        }
      }
  }

  public shortLines(point, pointBottom){
    for(let itemPoint of point){
      for(let itemBottom of pointBottom){
        if(itemPoint.line === itemBottom.line){
            let line = itemPoint.line;
            this.shortLine.push(Math.sqrt(((itemPoint.x - itemBottom.x)**2) + ((itemPoint.y - itemBottom.y)**2)));
        }
      }
    }
  }

  public valueLines(data, longLine, short){
    for(let itemData of data){
      let index = 0;
      if(itemData.value <= 100){
        for(let itemLine of short){
          index++;
          if(itemData.line === index){
          this.valueLine.push((itemLine / 100)*(100-(100 - itemData.value)));
          }
        }
      }else{
        for(let itemLine of longLine){
          index++;
          if(itemData.line === index){
          this.valueLine.push((itemLine / 100)*(itemData.value - 100));
          }
        }
      }
    }
  }

  public changePointsTop(long, short, value, index){
    let line1 = long - short;
    let K = value/line1;
    this.newPoints(this.pointTop[index], this.points[index], K, index);
  }

  public changePointsBottom(long, value, index){
    let line1 = long - value;
    let K = value/line1;
    this.newPoints(this.pointTop[index], this.pointBottom[index], K, index);
  }

  public newPoints(pointTop, pointBottom, K, index){
      let x = ((pointBottom.x + K * pointTop.x) / (1 + K));
      let y = ((pointBottom.y + K * pointTop.y) / (1 + K));
      this.newLine(this.points[index], x, y);
  }

  public newLine(points, newX, newY){
        points.x = newX;
        points.y = newY;
  }

}
