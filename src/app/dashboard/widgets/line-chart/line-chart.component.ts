import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {LineChartOptions} from "../../models/line-chart-options";

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Time from 'd3-time-format';
import * as d3Format from 'd3-format';
import * as d3Transition from 'd3-transition';
import {Mock} from 'src/app/dashboard/widgets/line-chart/mock';

@Component({
  selector: 'evj-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() options: LineChartOptions;
  @Input() size?: string;

  @ViewChild('chart', {static: true}) private chartContainer: ElementRef;

  data: any;
  margin = {top: 10, right: 0, bottom: 20, left: 50};

  svg;
  any;
  g: any;
  width: number;
  height: number;
  x;
  y;
  z;
  line;
  transition: any;


  constructor() {
    this.data = Mock;
    this.transition = d3Transition.transition();
  }

  ngOnInit() {

    setTimeout(() => {
      this.initChart();
      this.refreshDomains();
      this.refreshLine();
      this.drawAxis();
      this.drawGridLines();
      this.drawPath();
    }, 0);

    // setInterval(() => {
    //
    //   this.data[0].values.forEach(v => v.value = 40 + Math.random() * 40);
    //
    //   const rand = 60 + Math.random() * 20;
    //   this.data[1].values.forEach(v => v.value = rand);
    //   this.update();
    // }, 5000);


  }

  ngOnChanges() {

  }

  update() {


    this.refreshDomains();
    this.refreshLine();

    this.g.select('.y-axis')
      .transition()
      .call(d3Axis.axisLeft(this.y));

    this.g.selectAll('.trend .line')
      .transition()
      .duration(750)
      .attr('d', (d) => this.line(d.values))
      .style('fill', 'transparent')
      .style('stroke', (d) => {
        return d.color;
      });


  }

  private refreshDomains() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);

    this.x.domain(d3Array.extent(this.data.map((v) => v.values.map((v) => v.date))[0], (d: Date) => d));
    this.y.domain([
      d3Array.min(this.data, function (c) {
        return d3Array.min(c.values, function (d) {
          return d.value;
        });
      }),
      d3Array.max(this.data, function (c) {
        return d3Array.max(c.values, function (d) {
          return d.value;
        });
      })
    ]).nice();
  }

  private refreshLine() {
    this.line = d3Shape.line()
      .curve(d3Shape.curveBasis)
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));

  }

  private initChart() {

    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;


    this.svg = d3.select(element).append('svg')
      .attr('width', this.width)
      .attr('height', element.offsetHeight);


    this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

  }


  makeXGridLines() {
    return d3Axis.axisBottom(this.x)
      .ticks(5)
  }

  makeYGridLines() {
    return d3Axis.axisLeft(this.y)
      .ticks(3)
  }


  private drawAxis(): void {
    this.g.append('g')
      .attr("class", "axis x-axis")
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x).tickFormat(d3Time.timeFormat("%d")))

    this.g.append('g')
      .attr("class", "axis y-axis")
      .call(d3Axis.axisLeft(this.y)
        .ticks(7)
        .tickFormat(function (d) {
          return d3Format.format(".1f")(d);
        }))

  }

  private drawGridLines() {

    this.g.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + this.height + ")")
      .call(this.makeXGridLines()
        .tickSize(-this.height)
        .tickFormat("")
      )
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line")
        .style("stroke", "rgba(97,101,128, .5)")
        .style("stroke-width", "0.5"));


    this.g.append("g")
      .attr("class", "grid")
      .call(this.makeYGridLines()
        .tickSize(-this.width)
        .tickFormat("")
      )
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line")
        .style("stroke", "rgba(220,220,220, .25)")
        .style("stroke-width", "0.5"));

  }


  private drawPath(): void {
    let trend = this.g.selectAll('.trend')
      .data(this.data)
      .enter().append('g')
      .attr('class', 'trend');

    trend.append('path')
      .attr('class', 'line')
      .attr('d', (d) => this.line(d.values))
      .style('fill', 'transparent')
      .style('stroke', (d) => {
        return d.color;
      });

  }


}
