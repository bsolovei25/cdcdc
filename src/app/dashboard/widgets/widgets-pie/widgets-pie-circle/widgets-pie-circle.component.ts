import { Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList, Input, AfterViewInit } from '@angular/core';
import { element } from 'protractor';

declare var d3: any;

@Component({
  selector: 'evj-widgets-pie-circle',
  templateUrl: './widgets-pie-circle.component.html',
  styleUrls: ['./widgets-pie-circle.component.scss']
})
export class WidgetsPieCircleComponent implements AfterViewInit {
  public readonly RADIUS = 51;

  code = 4;
  @Input() public name = "Отклонение в работе технологического оборудования";
  units = "шт.";

  isMock = true;

  @ViewChildren('myCircle') myCircle: QueryList<any>;

  public datas = [
    {id:1, name:"Статическое Оборудование", pos:5, neg:2},
    {id:2, name:"Динамическое оборудование", pos:2, neg:5},
    {id:3, name:"КИПиА", pos:1, neg:1},
    {id:4, name:"КИПиА", pos:1, neg:1},
    {id:4, name:"КИПиА", pos:1, neg:1},
    {id:5, name:"КИПиА", pos:1, neg:1},
    {id:6, name:"Электро - оборудование", pos:0, neg:0}
  ];

  constructor() { }

  @Input()
  set showMock(show) {
    this.isMock = show;
    if (this.showMock) {
    } else {
    }
  }
  /*

    private enableLiveData() {
      // TODO добавить получение типа графика

      this.subscribtion = this.widgetsService.getWidgetLiveDataFromWS(this.id, 'line-chart')
        .subscribe((ref) => {

            this.draw(ref);

            this.subscribtion.unsubscribe();
          }
        );
    }

    private disableLiveData() {

      if (this.subscribtion) {
        this.subscribtion.unsubscribe();
      }
      this.draw(Mock);
    }
  */

  ngAfterViewInit() {
    this.datas.forEach((item, index) => {
      this.d3Circle(item, this.myCircle.toArray()[index].nativeElement);
    });
  }

  public dataById(index, item): number {
    return item.id;
  }

  private d3Circle(data, el): void {
    const summ = data.neg + data.pos;
    const mass = [data.pos, data.neg];
    let color: any;

    if ((data.pos === 0) && (data.neg === 0)) {
      color = d3.scaleOrdinal().range(["gray"]);
    } else {
      color = d3.scaleOrdinal().range(["white", "orange"]);
    }


    const canvas = d3.select(el).append("svg")
      .attr("min-width", "150px")
      .attr("max-width", "500px")
      .attr("viewBox", "32 -2 150 200")

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
      .attr("fill", (!data.pos && !data.neg) ? 'gray' : "white")
      .attr("dominant-baseline", "middle")
      .text(summ);
  }



}
