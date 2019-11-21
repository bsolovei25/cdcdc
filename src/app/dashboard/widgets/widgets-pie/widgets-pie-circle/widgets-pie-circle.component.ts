import { Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList, Input, AfterViewInit, Injectable, Inject } from '@angular/core';
import { element } from 'protractor';
// import { WidgetGridsterSettings, WidgetModel } from 'src/app/dashboard/models/widget.model';
import { runInDebugContext } from 'vm';
import {WidgetsService} from "../../../services/widgets.service";

declare var d3: any;

@Injectable()

@Component({
  selector: 'evj-widgets-pie-circle',
  templateUrl: './widgets-pie-circle.component.html',
  styleUrls: ['./widgets-pie-circle.component.scss']
})
export class WidgetsPieCircleComponent implements AfterViewInit {

  @Input() public id: string;

  public readonly RADIUS = 51;

  code = 4;
  @Input() name = "Отклонение в работе технологического оборудования";
  units = "шт.";

  static itemCols = 34;
  static itemRows = 10;

  private isMock = true;

  @ViewChildren('myCircle') myCircle: QueryList<any>;

  public datas = [
    {name: "Статическое Оборудование", critical: 5, nonCritical: 2},
    {name: "Статическое Оборудование", critical: 5, nonCritical: 2},
  ];


  @Input()
  set showMock(show) {
    this.isMock = show;
    if (this.isMock) {
      this.wsDisconnect();
    } else {
      this.wsConnect();
    }
  }

  constructor(private widgetsService: WidgetsService) {
  }


  ngAfterViewInit() {
    this.showWidget();
  }

  showWidget() {
    console.log('show widget!');
    this.datas.forEach((item, index) => {
      try {
        this.d3Circle(item, this.myCircle.toArray()[index].nativeElement);
      }
      catch {
        console.log('no such element');
      }
    });
  }

  public dataById(index, item): number {
    return item.id;
  }

  private d3Circle(data, el): void {
    const summ = data.critical + data.nonCritical;
    const mass = [data.nonCritical, data.critical];
    let color: any;

    if (summ === 0) {
      color = d3.scaleOrdinal().range(["gray"]);
    } else {
      color = d3.scaleOrdinal().range(["white", "orange"]);
    }


    // d3.select(el).clear();
    console.log(d3.select(el));

    const canvas = d3.select(el).append("svg")
      .attr("min-width", "250px")
      .attr("max-width", "500px")
      .attr("viewBox", "32 -10 250 200")

    let group = canvas.append("g")
      .attr("transform", "translate(100 ,100)");

    const arc = d3.arc().innerRadius(43).outerRadius(this.RADIUS);

    const pie = d3.pie().value((d) => {
      return d;
    }).sort(() => null);

    const arcs = group.selectAll(".arc").data(pie(mass)).enter().append("g").attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .attr("stroke", "black")
      .attr("fill", (d) => color(d.index));

    group = group.append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "2em")
      .attr("fill", (!data.nonCritical && !data.critical) ? 'gray' : "white")
      .attr("dominant-baseline", "middle")
      .text(summ);

    let text = canvas.append("text")
      .attr("fill","white")
      .attr("font-size", "14px")
      .attr("x","42")
      .attr("font-family","'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr("y","9")
      .text(data.name);

    let positive = canvas.append("text")
      .attr("font-size", "16px")
      .attr("x","170")
      .attr("y","70")
      .attr("fill", (!data.nonCritical && !data.critical) ? 'gray' : "white")
      .text("Не критичные", data.nonCriticall);

    let positive_num = canvas.append("text")
      .attr("font-size", "16px")
      .attr("x","170")
      .attr("y","95")
      .attr("fill", (!data.nonCritical && !data.critical) ? 'gray' : "white")
      .text(data.nonCritical);

    let negative = canvas.append("text")
      .attr("font-size", "16px")
      .attr("x","170")
      .attr("y","120")
      .attr("fill", (!data.nonCritical && !data.critical) ? 'gray' : "orange")
      .text("Критичные", data.critical);

    let negative_num = canvas.append("text")
      .attr("font-size", "16px")
      .attr("x","170")
      .attr("y","145")
      .attr("fill", (!data.nonCritical && !data.critical) ? 'gray' : "orange")
      .text(data.critical);

    let pie_back = canvas.append("image")
      .attr("xlink:href",(!data.nonCritical && !data.critical) ? '/assets/pic/ncir.svg' : "/assets/pic/acir.svg")
      .attr("height", "200px")
      .attr("width", "200px")
      .attr("x","3")
      .attr("y","-3");

  }

  private wsConnect() {
    this.widgetsService.getWidgetLiveDataFromWS(this.id, 'pie-diagram')
      .subscribe((ref) => {
          this.datas = ref;
          this.showWidget();
        }
      );
  }
  private wsDisconnect() {
  }
}
