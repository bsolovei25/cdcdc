import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IPerfProgCircle } from '../performance-progress-line-circle/performance-progress-line-circle.component';
import * as d3 from 'd3';
import { SpaceNumber } from '@shared/pipes/number_space.pipe';

@Component({
  selector: 'evj-performance-progress-circle',
  templateUrl: './performance-progress-circle.component.html',
  styleUrls: ['./performance-progress-circle.component.scss']
})
export class PerformanceProgressCircleComponent implements OnInit, AfterViewInit {
  @ViewChild('circle', { static: true }) circle: ElementRef;
  @Input() data: IPerfProgCircle;

  gaugemap: any = {};

  public readonly RADIUS: number = 36.5; /// PieCircle Radius
  public defaultPercent: number = 100;

  public criticalValue: number = 64; /// временные константы
  public criticalPie: number = 18; /// временные константы
  public indicator: number;

  public svg;
  public r;
  public arc;
  public tickData;
  public pointerHeadLength;
  public pointer;
  public scale;
  public range;
  public ticks;


  /// CONFIG GAUGE(!!!)
  public config = {
    size: 190,
    clipWidth: 200,
    clipHeight: 110,
    ringInset: 20,
    ringWidth: 10,

    pointerWidth: 10,
    pointerTailLength: 5,
    pointerHeadLengthPercent: 0.9,

    minValue: 0,
    maxValue: 60,

    minAngle: 0,
    maxAngle: 360,

    transitionMs: 750,

    majorTicks: 30, /// CHANGE VALUE PIE GAUGE  (!!!! меняем значение в зависимости количества дней в месяце)
    labelFormat: d3.format('d'),
    labelInset: 10,

    arcColorFn: d3.interpolateHslLong(d3.rgb('red'), d3.rgb('blue')),
  };

  public pointId;

  constructor(private spacePipe: SpaceNumber) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.indicator = this.indicatorGauge(this.data.gaugePercent);
    this.draw(this.data, this.circle.nativeElement, this.gaugemap, this.indicator);
    this.d3Circle(this.data, this.circle.nativeElement);
  }

  // CirclePie RENDERING

  public d3Circle(data, el): void {
    const pipeValue: string = this.spacePipe.transform(data.value);
    // const summ = data.critical + data.nonCritical;
    const summ = this.defaultPercent - data.piePercent;
    const mass = [data.piePercent, summ];
    let color: any;

    if (summ === 0) {
      color = d3.scaleOrdinal().range(['var(--color-oil-circle-disable)']);
    } else if (data.isCritical) {
      color = d3.scaleOrdinal().range(['var(--color-oil-danger)', 'var(--color-oil-circle-disable)']);
    } else {
      color = d3.scaleOrdinal().range(['var(--color-text-main)', 'var(--color-oil-circle-disable)']);
    }

    const svg = d3
      .select(el)
      .append('svg')
      .attr('min-width', '100px')
      .attr('viewBox', '0 0 100 100');

    let group = svg.append('g').attr('transform', 'translate(52 ,52)');

    const arc = d3
      .arc()
      .innerRadius(35)
      .outerRadius(this.RADIUS);

    const pie = d3
      .pie()
      .value((d) => {
        return d;
      })
      .sort(() => null);

    const arcs = group
      .selectAll('.arc')
      .data(pie(mass))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.index));

    const value = svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '9px')
      .attr('fill', 'var(--color-text-main)')
      .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr('y', '57')
      .attr('x', '52')
      .text(pipeValue);

    const title = svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '7px')
      .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr('y', '46')
      .attr('x', '52')
      .attr('fill', 'var(--color-text-main')
      .text(data.title);

    const icon = svg
      .append('image')
      .attr('xlink:href', './assets/icons/widgets/SMP/' + this.data.icon + '.svg')
      .attr('height', '13px')
      .attr('width', '13px')
      .attr('x', '45')
      .attr('y', '63');
  }

  // GAUGE RENDERING

  indicatorGauge(valuePercent: number): number {
    const percent = valuePercent > 100 ? 100 : valuePercent < 0 ? 0 : valuePercent;
    return (this.config.majorTicks * percent) / 100;
  }

  draw(data, el, gaugemap, indicator): void {
    this.gauge({
      size: 295,
      clipWidth: 300,
      clipHeight: 300,
      ringWidth: 60,
      maxValue: 25,
      transitionMs: 4000,
    }, gaugemap);
    this.render(el, indicator, this.criticalPie, data);
  }

  gauge(configuration, gaugemap): void {
    gaugemap.configure = this.configure;

    gaugemap.isRendered = this.isRendered(this.svg);

    gaugemap.render = this.render;

    gaugemap.update = this.update;

    this.configure(configuration);
    return gaugemap;
  }

  deg2rad(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  centerTranslation(r: number): string {
    return 'translate(' + r + ',' + r + ')';
  }

  isRendered(svg): boolean {
    return svg !== undefined;
  }

  render(container, newValue, criticalPie, data): void {
    this.svg = d3
      .select(container)
      .append('svg:svg')
      .attr('class', 'gauge')
      .attr('viewBox', '0 0 290 290');

    const centerTx = this.centerTranslation(this.r + 2);

    const arcs = this.svg
      .append('g')
      .attr('class', 'arc')
      .attr('id', 'test')
      .attr('transform', centerTx);

    if (newValue < criticalPie) {
      arcs.selectAll('path')
        .data(this.tickData)
        .enter()
        .append('path')
        .attr('stroke', 'var(--color-bg-main)')
        .attr('stroke-width', '4px')
        .attr('fill', (d, i) => {
          if (i + 1 > criticalPie) {
            return 'var(--color-smp-blue)';
          } else if (i + 1 <= newValue + 1 && newValue !== 0) {
            return 'var(--color-active)';
          } else if (i + 1 >= newValue && i + 1 <= criticalPie) {
            return 'var(--color-smp-blue)';
          }
        })
        .attr('d', this.arc);
    } else {
      this.pointId = arcs.selectAll('path')
        .data(this.tickData)
        .enter()
        .append('path')
        .attr('stroke', 'var(--color-bg-main)')
        .attr('stroke-width', '4px')
        .attr('id', (d, i) => {
          if (i + 1 <= newValue + 1 && i + 1 > criticalPie) {
            return 'point';
          }
        })
        .attr('fill', (d, i) => {
          if (i + 1 <= newValue + 1 && i + 1 > criticalPie) {
            return 'red';
          } else if (i + 1 <= criticalPie) {
            return 'var(--color-active)';
          } else if (i + 1 >= newValue && i + 1 <= this.indicator) {
            return 'var(--color-smp-blue)';
          } else {
            return 'var(--color-smp-blue)';
          }
        })
        .attr('d', this.arc);
    }

    const pointid = this.pointId?.nodes()?.find(el => el?.id === 'point');
    let pointidLength: number;
    let coordsPoint;
    if (pointid) {
      pointidLength = pointid.getTotalLength();
      coordsPoint = pointid.getPointAtLength(pointidLength);

    }

    const aroundGauge = this.svg
      .append('image')
      .attr('xlink:href', '/assets/icons/widgets/SMP/circle-back.svg')
      .attr('height', '100%')
      .attr('width', '100%')
      .attr('x', '5')
      .attr('y', '5');

    if (coordsPoint) {
      const point = this.svg
        .append('circle')
        .attr('cx', coordsPoint.x + 130)
        .attr('cy', coordsPoint.y + 127)
        .attr('r', '5px')
        .attr('fill', 'var(--color-text-main');
    }
  }

  update(newValue, newConfiguration?): void {
    if (newConfiguration !== undefined) {
      this.configure(newConfiguration);
    }
    const ratio = this.scale(newValue);
    const newAngle = this.config.minAngle + ratio * this.range;
    this.pointer
      .transition()
      .duration(this.config.transitionMs)
      .ease(d3.easeElastic)
      .attr('transform', 'rotate(' + newAngle + ')');
  }

  configure(configuration): void {
    let prop;
    for (prop in configuration) {
      this.config[prop] = configuration[prop];
    }

    this.range = this.config.maxAngle - this.config.minAngle;
    this.r = this.config.size / 2;
    this.pointerHeadLength = Math.round(this.r * this.config.pointerHeadLengthPercent);

    // a linear scale this.gaugemap maps domain values to a percent from 0..1
    this.scale = d3
      .scaleLinear()
      .range([0, 1])
      .domain([this.config.minValue, this.config.maxValue]);

    this.ticks = this.scale.ticks(this.config.majorTicks);
    this.tickData = d3.range(this.config.majorTicks).map(() => {
      return 1 / this.config.majorTicks;
    });

    this.arc = d3
      .arc()
      .innerRadius(this.r + 50 - this.config.ringWidth - this.config.ringInset)
      .outerRadius(this.r - this.config.ringInset)
      .startAngle((d, i) => {
        const ratio = d * i;
        return this.deg2rad(this.config.minAngle + ratio * this.range);
      })
      .endAngle((d, i) => {
        const ratio = d * (i + 1);
        return this.deg2rad(this.config.minAngle + ratio * this.range);
      });
  }


}
