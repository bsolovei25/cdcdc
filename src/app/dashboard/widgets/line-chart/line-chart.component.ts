import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

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
import {WidgetsService} from "../../services/widgets.service";
import {Subscription} from "rxjs/index";
import {LineChartData, LineChartOptions} from "../../models/line-chart";

@Component({
  selector: 'evj-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy {

  @Input() id: string;
  @Input() code: string;
  @Input() name: string;
  @Input() units: string;
  @Input() options: LineChartOptions;
  @Input() position?: string = 'default';

  data: LineChartData;


  @ViewChild('chart', {static: true}) private chartContainer: ElementRef;

  margin = {top: 10, right: -50, bottom: 20, left: 50};

  svg;
  g: any;
  width: number;
  height: number;
  x;
  y;
  z;

  line;
  transition: any;
  lines: any;

  readonly trendsStyle: any = {
    plan: {
      point: {
        iconUrl: './assets/icons/widgets/line-chart/point-plan.svg',
        width: 6,
        height: 6,
        widthOffset: -3,
        heightOffset: -3,
        class: 'point point_plan'
      },
      trend: {
        class: 'line line_plan'
      }
    },
    fact: {
      point: {
        iconUrl: './assets/icons/widgets/line-chart/point-fact.svg',
        width: 8,
        height: 8,
        widthOffset: -4,
        heightOffset: -4,
        class: 'point point_fact'
      },
      trend: {
        class: 'line line_fact'
      }
    },
    deviation: {
      point: {
        iconUrl: './assets/icons/widgets/line-chart/point-deviation.svg',
        width: 9.2,
        height: 8,
        widthOffset: -4.6,
        heightOffset: -5,
        class: 'point point_deviation'
      }
    },
    lowerLimit: {
      point: {
        iconUrl: './assets/icons/widgets/line-chart/point-deviation.svg',
        width: 9.2,
        height: 8,
        widthOffset: -4.6,
        heightOffset: -5,
        class: 'point point_deviation'
      },
      trend: {
        class: 'line line_limit'
      }
    },
    upperLimit: {
      point: {
        iconUrl: './assets/icons/widgets/line-chart/point-deviation.svg',
        width: 9.2,
        height: 8,
        widthOffset: -4.6,
        heightOffset: -5,
        class: 'point point_deviation'
      },
      trend: {
        class: 'line line_limit'
      }
    }
  };
  deviationPoints: any;

  private _showMock = true;
  private subscribtion: Subscription;

  constructor(private widgetsService: WidgetsService) {
  }

  ngOnInit() {

    setTimeout(() => {
      this.initChart();
    }, 0);

    this.transition = d3Transition.transition();

    if (this._showMock) {
      this.disableLiveData()
    } else {
      this.enableLiveData();
    }

  }


  ngOnDestroy() {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }

  @Input()
  set showMock(show) {
    this._showMock = show;

    if (this._showMock) {
      this.disableLiveData();
    } else {
      this.enableLiveData();
    }

  }


  private enableLiveData() {
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


  private draw(data) {
    if (this.svg) {
      this.svg.remove();
    }

    this.data = data;
    this.refreshDeviations();
    this.startChart();

  }

  private startChart() {
    const plan = this.data.graphs.find(d => d.graphType === 'plan');
    const fact = this.data.graphs.find(d => d.graphType === 'fact');
    const upperLimit = this.data.graphs.find(d => d.graphType === 'upperLimit');
    const lowerLimit = this.data.graphs.find(d => d.graphType === 'lowerLimit');

    this.initChart();
    this.refreshDomains();
    this.refreshLines();
    this.drawAxis();
    this.drawGridLines();
    this.drawDeviationAreas(plan, fact);
    this.drawPath();
    this.drawLinesBtwPoints(plan, fact);
    this.drawPoints();
    this.drawLimitsAreas(upperLimit, lowerLimit);
  }


  private refreshDeviations() {
    const plan = this.data.graphs.find(d => d.graphType === 'plan').values;
    const fact = this.data.graphs.find(d => d.graphType === 'fact').values;

    this.deviationPoints = {
      graphType: 'deviation',
      values: fact.reduce((acc, d, i) => {
        // TODO find nearest if not exist
        if (plan[i] && plan[i].value < d.value) {
          acc.push(d);
        }
        return acc;
      }, [])
    };
  }

  private refreshDomains() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);

    this.x.domain(d3Array.extent(this.data.graphs.map((v) => v.values.map((v) => v.date))[0], (d: Date) => d));


    const yMin = d3Array.min(this.data.graphs, c => d3Array.min(c.values, d => d.value));
    const yMax = d3Array.max(this.data.graphs, c => d3Array.max(c.values, d => d.value));
    const offset = (yMax - yMin) * 0.15;

    this.y.domain([yMin - offset, yMax + offset]).nice();
  }

  private refreshLines() {
    this.lines = {
      plan: d3Shape.line()
        .curve(d3Shape[this.options.planLineType])
        .x((d: any) => this.x(d.date))
        .y((d: any) => this.y(d.value)),
      fact: d3Shape.line()
        .curve(d3Shape[this.options.factLineType])
        .x((d: any) => this.x(d.date))
        .y((d: any) => this.y(d.value)),
      upperLimit: d3Shape.line()
        .curve(d3Shape[this.options.lowerLimitLineType])
        .x((d: any) => this.x(d.date))
        .y((d: any) => this.y(d.value)),
      lowerLimit: d3Shape.line()
        .curve(d3Shape[this.options.upperLimitLineType])
        .x((d: any) => this.x(d.date))
        .y((d: any) => this.y(d.value))
    };


    this.line = d3Shape.line()
      .curve(d3Shape['curveMonotoneX'])
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
      .call(d3Axis.axisBottom(this.x)
        .ticks(7)
      );

    this.g.append('g')
      .attr("class", "axis y-axis")
      .call(d3Axis.axisLeft(this.y)
        .ticks(7)
        .tickFormat((d) => {
          return d3Format.format(".1f")(d);
        }))

  }

  private drawGridLines() {

    this.g.append("g").selectAll('grid')
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
      .data(this.data.graphs)
      .enter()
      .append('g')
      .attr('class', 'trend');

    trend.append('path')
      .attr('d', (d) => this.lines[d.graphType](d.values))
      .attr('class', (d) => this.trendsStyle[d.graphType].trend.class);

  }

  private drawLinesBtwPoints(planData, factData) {
    const pointsLines = planData.values.map((d, i) => {
      // TODO if not exist handling
      if (factData.values[i]) {
        return [{date: d.date, value: d.value}, {date: d.date, value: factData.values[i].value}];
      }

      return [{date: d.date, value: d.value}, {date: d.date, value: d.value}];

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

    let points = this.g.selectAll('.point')
      .data([...this.data.graphs.filter(d => d.graphType === 'fact' || d.graphType === 'plan'), this.deviationPoints])
      .enter()
      .append('g');


    points.selectAll(".point")
      .data(d => d.values.map(i => {
          i.type = d.graphType;
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
      .curve(d3Shape[this.options['factLineType']])
      .x(d => this.x(d.date))
      .y0(d => this.y(this.height))
      .y1(d => this.y(d.value));


    let clipPathSource = this.g.selectAll(".area")
      .data([planData])
      .enter()
      .append("g");


    clipPathSource.append("clipPath")
      .attr('id', 'clipPathArea-' + this.position)
      .attr('class', 'area')
      .append("path")
      .attr("d", d => {
        return clipPathArea(d.values);
      });


    const deviationArea = d3Shape.area()
      .curve(d3Shape[this.options['factLineType']])
      .x(d => this.x(d.date))
      .y0(d => {

        const v = factData.values.find(v => v.date.getTime() === d.date.getTime());
        if (v) {
          return this.y(v.value);
        }
        //TODO find nearest?
        return this.y(this.height);

      })
      .y1(d => this.y(d.value));


    const deviationSource = this.g.selectAll(".deviation-area")
      .data([planData])
      .enter()
      .append("g");


    deviationSource.append("path")
      .attr("d", d => {
        return deviationArea(d.values);
      })
      .attr('class', 'deviation-area')
      .attr("clip-path", 'url(#clipPathArea-' + this.position + ')')
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

  private drawLimitsAreas(upperLimit, lowerLimit) {
    const upperLimitArea = d3Shape.area()
      .curve(d3Shape[this.options['upperLimitLineType']])
      .x(d => this.x(d.date))
      .y0(d => 0)
      .y1(d => this.y(d.value));

    const upperLimitSource = this.g.selectAll(".limit-area")
      .data([upperLimit])
      .enter()
      .append("g");

    upperLimitSource.append("path")
      .attr("d", d => {
        return upperLimitArea(d.values);
      })
      .attr('class', 'upper-limit-area')
      .attr("fill", 'url(#upper-limit-gradient-' + this.position + ')');


    const upperLimitGradient = upperLimitSource
      .append("g")
      .append('linearGradient')
      .attr('class', 'gradient')
      .attr('id', 'upper-limit-gradient-' + this.position)
      .attr('x1', "0%")
      .attr('x2', "0%")
      .attr('y1', "0%")
      .attr('y2', "100%");

    upperLimitGradient.append('stop')
      .attr('offset', "0%")
      .attr('stop-color', "transparent");

    upperLimitGradient.append('stop')
      .attr('offset', "50%")
      .attr('stop-color', "rgba(255,255,255,0.015");


    const lowerLimitArea = d3Shape.area()
      .curve(d3Shape[this.options['lowerLimitLineType']])
      .x(d => this.x(d.date))
      .y0(d => this.height)
      .y1(d => this.y(d.value));

    const lowerLimitSource = this.g.selectAll(".limit-area")
      .data([lowerLimit])
      .enter()
      .append("g");

    lowerLimitSource.append("path")
      .attr("d", d => {
        return lowerLimitArea(d.values);
      })
      .attr('class', 'lower-limit-area')
      .attr("fill", 'url(#lower-limit-gradient-' + this.position + ')');


    const lowerLimitGradient = lowerLimitSource
      .append("g")
      .append('linearGradient')
      .attr('id', 'lower-limit-gradient-' + this.position)
      .attr('x1', "0%")
      .attr('x2', "0%")
      .attr('y1', "0%")
      .attr('y2', "100%");

    lowerLimitGradient.append('stop')
      .attr('offset', "50%")
      .attr('stop-color', "rgba(255,255,255,0.015");

    lowerLimitGradient.append('stop')
      .attr('offset', "100%")
      .attr('stop-color', "transparent");

  }

}
