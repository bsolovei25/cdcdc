import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';
import { SpaceNumber } from '@shared/pipes/number-space.pipe';
import {
    IPerfProgCircle,
    IPerfProgCircleFB
} from '../../../../../dashboard/models/SMP/performance-progress-indicators.model';

@Component({
  selector: 'evj-performance-progress-circle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './performance-progress-circle.component.html',
  styleUrls: ['./performance-progress-circle.component.scss']
})
export class PerformanceProgressCircleComponent implements OnInit, OnChanges {
  @ViewChild('circle', { static: true }) circle: ElementRef;
  @Input() data: IPerfProgCircle;

  gaugemap: any = {};

  public readonly RADIUS: number = 36.5; /// PieCircle Radius
  public defaultPercent: number = 100;

  public criticalValue: number = 64; /// временные константы
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
  public piePointNumber: number;

  public svgCircle: any;

  constructor(private spacePipe: SpaceNumber) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.indicator = this.indicatorGauge(this.data.gaugePercent);
    this.draw(this.data, this.circle.nativeElement, this.gaugemap, this.indicator);
    if (this.svgCircle) {
      this.svgCircle.remove();
    }
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
      color = d3.scaleOrdinal().range(['var(--color-smp-pie-normal)', 'var(--color-oil-circle-disable)']);
    }

    this.svgCircle = d3
      .select(el)
      .append('svg')
      .attr('min-width', '100px')
      .attr('viewBox', '0 0 100 100');

    const group = this.svgCircle.append('g').attr('transform', 'translate(50 ,52)');
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

    const value = this.svgCircle
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', 'var(--color-text-main)')
      .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr('y', '57')
      .attr('x', '50')
      .text(pipeValue);

    const title = this.svgCircle
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '8px')
      .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr('y', '46')
      .attr('x', '50')
      .attr('fill', 'var(--color-text-main')
      .text(data.title);

    const icon = this.svgCircle
      .append('image')
      .attr('xlink:href', 'assets/icons/widgets/SMP/' + this.data.icon + '.svg')
      .attr('height', '13px')
      .attr('width', '13px')
      .attr('x', '43')
      .attr('y', '63');


    const scaleTop = this.svgCircle
      .append('image')
      .attr('xlink:href', 'assets/icons/widgets/SMP/scale-top.svg')
      .attr('height', '10px')
      .attr('width', '10px')
      .attr('x', '92')
      .attr('y', '35');

    const scaleMiddle = this.svgCircle
      .append('rect')
      .attr('x', '97.5')
      .attr('y', '46')
      .attr('width', '3px')
      .attr('height', '11px')
      .attr('fill', 'var(--color-smp-text-sub)');


    const scaleBottom = this.svgCircle
      .append('image')
      .attr('xlink:href', 'assets/icons/widgets/SMP/scale-bottom.svg')
      .attr('height', '10px')
      .attr('width', '10px')
      .attr('x', '92')
      .attr('y', '58');
  }

  // GAUGE RENDERING

  indicatorGauge(valuePercent: number): number {
    const percent = valuePercent > 100 ? 100 : valuePercent < 0 ? 0 : valuePercent;
    return (this.config.majorTicks * percent) / 100;
  }

  draw(data, el, gaugemap, indicator): void {
    this.config.majorTicks = 31;
    this.gauge({
      size: 295,
      clipWidth: 300,
      clipHeight: 300,
      ringWidth: 60,
      maxValue: 25,
      transitionMs: 4000,
    }, gaugemap);
    this.render(el, indicator, data);
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
    return 'translate(' + (r - 5) + ',' + r + ')';
  }

  isRendered(svg): boolean {
    return svg !== undefined;
  }

  render(container, newValue, data): void {
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

    const reverseData = [].concat(data.days).reverse();
    const pointPie = reverseData.find(e => e.state !== 'disable').day;


    this.pointId = arcs.selectAll('path')
      .data(this.tickData)
      .enter()
      .append('path')
      .attr('stroke', 'var(--color-bg-main)')
      .attr('stroke-width', '4px')
      .attr('id', (d, i) => {
        if (i === (pointPie - 1)) {
          this.piePointNumber = i;
          return 'point';
        }
      })
      .attr('fill', (d, i) => {
        const status = this.data?.days.find(e => e.day - 1 === i)?.state;
        if (status === '0') {
          return 'var(--color-active)';
        } else if (status === '1') {
          return 'var(--color-warning)';
        } else if (status === '2') {
          return 'var(--color-danger)';
        } else {
          return 'var(--color-smp-blue)';
        }
      })
      .attr('d', this.arc);

    const pointid = this.pointId?.nodes()?.find(el => el?.id === 'point');
    let pointidLength: number;
    let coordsPoint;
    if (pointid) {
      pointidLength = pointid.getTotalLength();
      coordsPoint = pointid.getPointAtLength(pointidLength);
    }

    const aroundGauge = this.svg
      .append('image')
      .attr('xlink:href', 'assets/icons/widgets/SMP/circle-back.svg')
      .attr('height', '100%')
      .attr('width', '100%')
      .attr('x', '0')
      .attr('y', '5');

    if (coordsPoint) {
      let defaultX = coordsPoint.x + 146;
      let defaultY = coordsPoint.y + 151;
      if (this.piePointNumber > 12 && this.piePointNumber < 18) {
        defaultY = defaultY - 5;
      } else if (this.piePointNumber > 17 && this.piePointNumber < 25) {
        defaultY = defaultY - 22;
        defaultX = coordsPoint.x + 131 + 5 * (8 - (25 - this.piePointNumber));
      } else if (this.piePointNumber > 24 && this.piePointNumber < 30) {
        defaultY = defaultY - 2 * (28 - this.piePointNumber);
        defaultX = defaultX + 4 * (8 - (30 - this.piePointNumber));
      }
      const point = this.svg
        .append('circle')
        .attr('cx', defaultX)
        .attr('cy', defaultY)
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
    for (let prop in configuration) {
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
