import { Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList, Input } from '@angular/core';

declare var d3: any;

@Component({
  selector: 'evj-widgets-pie-circle',
  templateUrl: './widgets-pie-circle.component.html',
  styleUrls: ['./widgets-pie-circle.component.scss']
})
export class WidgetsPieCircleComponent implements OnInit {

  @Input() data: any;

  
  @ViewChild('myCircle', {static: true}) myCircle: ElementRef;


  public r = 51;
  public canvas;
  public group;
  public arc;
  public pie;
  public arcs;
  public summ;
  public color;


  public d3Circle() {

    this.summ = this.data.uncritical + this.data.critical;

    if ((this.data.uncritical == 0) && (this.data.critical == 0)) {
      this.color = d3.scaleOrdinal().range(["gray"]);
    }
    else {
      this.color = d3.scaleOrdinal().range(["white", "orange"]);
    }

    const mass = [this.data.uncritical, this.data.critical]; 

    this.canvas = d3.select(this.myCircle.nativeElement).append("svg")
      .attr("width", "150px")
      .attr("height", "200px")
      .attr("viewBox", "30 -5 150 200")

    this.group = this.canvas.append("g")
      .attr("transform", "translate(100 ,100)");

    this.arc = d3.arc().innerRadius(43).outerRadius(this.r);

    this.pie = d3.pie().value((d) => {
      return d;
    });
    this.pie = this.pie.sort(() => null);

    this.arcs = this.group.selectAll(".arc").data(this.pie(mass)).enter().append("g").attr("class", "arc");
  
    this.arcs.append("path")
      .attr("d", this.arc)
      .attr("stroke", "black")
      .attr("fill", (d) => {
    
        return this.color(d.index);

      });

    this.group = this.group.append("text")
      .attr("text-anchor", "middle")
      .attr("font-size", "2em")
      .attr("fill", !this.data.uncritical && !this.data.critical ? 'gray' : "white")
      .attr("dominant-baseline", "middle")
      .text(this.summ);
  }

  constructor() { }

  ngOnInit() {
    this.d3Circle();
  }

}
