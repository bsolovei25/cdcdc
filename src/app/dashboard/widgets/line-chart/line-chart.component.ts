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


  readonly trendsStyle: any = {
    plan: {
      point: {
        iconUrl: './assets/icons/widgets/line-chart/point-plan.svg',
        width: 6,
        height: 6,
        widthOffset: -3,
        heightOffset: -3,
        class: 'point_plan'
      }
    },
    fact: {
      point: {
        iconUrl: './assets/icons/widgets/line-chart/point-fact.svg',
        width: 8,
        height: 8,
        widthOffset: -4,
        heightOffset: -4,
        class: 'point_fact'
      }
    },
    deviation: {
      point: {
        iconUrl: './assets/icons/widgets/line-chart/point-deviation.svg',
        width: 9.2,
        height: 8,
        widthOffset: -4.6,
        heightOffset: -5,
        class: 'point_deviation'
      }
    }
  };
  deviationPoints: any;

  constructor() {
    this.data = Mock;

    const plan = this.data.find(d => d.id === 'plan').values;
    const fact = this.data.find(d => d.id === 'fact').values;

    this.deviationPoints = {
      id: 'deviation',
      values: fact.reduce((acc, d, i) => {
        if (plan[i].value < d.value) {
          acc.push(d);
        }
        return acc;
      }, [])
    };

    this.transition = d3Transition.transition();
  }

  ngOnInit() {

    setTimeout(() => {
      this.initChart();
      this.refreshDomains();
      this.refreshLine();
      this.drawAxis();
      this.drawGridLines();
      this.drawDeviationAreas(this.data.find(d => d.id === 'plan'), this.data.find(d => d.id === 'fact'));
      this.drawPath();
      this.drawLinesBtwPoints(this.data.find(d => d.id === 'plan'), this.data.find(d => d.id === 'fact'));
      this.drawPoints();
    }, 0);

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
      .curve(d3Shape.curveMonotoneX)
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


  private makeXGridLines() {
    return d3Axis.axisBottom(this.x)
      .ticks(5)
  }

  private makeYGridLines() {
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

  private drawPath() {
    let trend = this.g.selectAll('.trend')
      .data(this.data)
      .enter()
      .append('g')
      .attr('class', 'trend');

    trend.append('path')
      .attr('class', 'line')
      .attr('d', (d) => this.line(d.values))
      .style('fill', 'transparent')
      .style('stroke', (d) => {
        return d.color;
      });

  }

  private drawLinesBtwPoints(planData, factData) {
    const pointsLines = planData.values.map((d, i) => {
      return [
        {
          date: d.date,
          value: d.value
        },
        {
          date: d.date,
          value: factData.values[i].value
        }
      ]
    });


    const line = d3Shape.line()
      .curve(d3Shape.curveMonotoneX)
      .x((d: any) => this.x(d.date))
      .y((d: any) => this.y(d.value));


    let lines = this.g.selectAll('.line-btw-point')
      .data(pointsLines)
      .enter()
      .append('g')
      .attr('class', 'trend');

    lines.append('path')
      .attr('class', 'line-btw-point')
      .attr('d', (d) => line(d))

  }

  private drawPoints() {

    let points = this.g.selectAll('.points')
      .data([...this.data, this.deviationPoints])
      .enter()
      .append('g')
      .attr('class', 'trend');


    points.selectAll(".point")
      .data(d => d.values.map(i => {
          i.type = d.id;
          return i
        })
      )
      .enter()
      .append("svg:image")
      .attr('width', d => this.trendsStyle[d.type].point.width)
      .attr('height', d => this.trendsStyle[d.type].point.height)
      .attr("x", d => this.x(d.date) + this.trendsStyle[d.type].point.widthOffset)
      .attr("y", d => this.y(d.value) + this.trendsStyle[d.type].point.heightOffset)
      .attr("xlink:href", d => this.trendsStyle[d.type].point.iconUrl)
      .attr('class', 'point')
      .attr("class", d => this.trendsStyle[d.type].point.class)

  }

  private drawDeviationAreas(planData, factData) {
    let clipPathArea = d3Shape.area()
      .curve(d3Shape.curveMonotoneX)
      .x(d => this.x(d.date))
      .y0(d => this.y(this.height))
      .y1(d => this.y(d.value));


    let clipPathSource = this.g.selectAll(".area")
      .data([planData])
      .enter()
      .append("g");


    clipPathSource.append("clipPath")
      .attr('id', 'clipPathArea')
      .append("path")
      .attr("d", function (d) {
        return clipPathArea(d.values);
      });


    let deviationArea = d3Shape.area()
      .curve(d3Shape.curveMonotoneX)
      .x(d => this.x(d.date))
      .y0(d => this.y(factData.values.find(v => v.date.toJSON() === d.date.toJSON()).value))
      .y1(d => this.y(d.value));


    let deviationSource = this.g.selectAll(".deviationArea")
      .data([planData])
      .enter()
      .append("g");


    deviationSource.append("path")
      .attr("d", function (d) {
        return deviationArea(d.values);
      })
      .attr('class', 'deviation-area')
      .attr("clip-path", 'url(#clipPathArea)')
      .attr("fill", 'url(#deviation-gradient)');


    const gradient = deviationSource
      .append("g")
      .append('linearGradient')
      .attr('id', 'deviation-gradient')
      .attr('x1', "0%")
      .attr('x2', "0%")
      .attr('y1', "0%")
      .attr('y2', "100%");

    gradient.append('stop')
      .attr('offset', "0")
      .attr('stop-color', "rgba(244, 163, 33, 0.2)");

    gradient.append('stop')
      .attr('offset', "50%")
      .attr('stop-color', "transparent");


  }


}
