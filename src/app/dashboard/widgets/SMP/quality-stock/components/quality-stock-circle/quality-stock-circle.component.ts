import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';
import { IQualityStockCircle } from '../../quality-stock.component';

@Component({
  selector: 'evj-quality-stock-circle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quality-stock-circle.component.html',
  styleUrls: ['./quality-stock-circle.component.scss']
})
export class QualityStockCircleComponent implements OnInit, OnChanges {
  @ViewChild('circle', { static: true }) circle: ElementRef;

  @Input() data: IQualityStockCircle;

  public readonly RADIUS: number = 30;

  public defaultPercent: number = 100;

  public svg: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.svg) {
      this.svg.remove();
    }
    this.d3Circle(this.data, this.circle.nativeElement);
  }


  public d3Circle(data, el): void {
    const summ = this.defaultPercent - (data?.factPercent - data?.deviationPercent);
    const mass = [data?.factPercent, data?.deviationPercent, summ];
    let color: any;

    if (summ === 0) {
      color = d3.scaleOrdinal().range(['gray']);
    } else {
      color = d3.scaleOrdinal().range(['var(--color-text-main)', 'var(--color-deviation)', 'var(--color-bg-main)']);
    }

    this.svg = d3
      .select(el)
      .append('svg')
      .attr('min-width', '100px')
      .attr('viewBox', '0 0 100 100');

    let group = this.svg.append('g').attr('transform', 'translate(50 ,43)');

    const arc = d3
      .arc()
      .innerRadius(28.5)
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

    group = group
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', 'var(--color-plan)')
      .attr('dominant-baseline', 'middle')
      .text(data?.value + '%');

    const line = this.svg
      .append('rect')
      .attr('fill', 'var(--color-plan)')
      .attr('height', '6px')
      .attr('width', '1px')
      .attr('x', '50')
      .attr('y', '11');

    const background = this.svg
      .append('image')
      .attr(
        'xlink:href',
        './assets/icons/widgets/SMP/border-blue-circle.svg'
      )
      .attr('height', '70%')
      .attr('width', '100%')
      .attr('x', '0')
      .attr('y', '8');

    const title = this.svg
      .append('text')
      .attr('font-size', '8px')
      .attr('text-anchor', 'middle')
      .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr('y', '87')
      .attr('x', '48')
      .attr('fill', 'var(--color-text-main')
      .text('Отклонение');

    if (this.data?.deviationStatus) {
      const value = this.svg
        .append('text')
        .attr('font-size', '8px')
        .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
        .attr('y', '97')
        .attr('x', '32')
        .attr('fill', 'var(--color-text-main')
        .text('+ ' + this.data?.deviation);

      const arrow_up = this.svg
        .append('image')
        .attr(
          'xlink:href',
          './assets/icons/widgets/SMP/double-arrow-top.svg'
        )
        .attr('height', '7px')
        .attr('width', '7px')
        .attr('y', '90')
        .attr('x', '58');
    } else {
      const value = this.svg
        .append('text')
        .attr('font-size', '8px')
        .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
        .attr('y', '97')
        .attr('x', '32')
        .attr('fill', 'var(--color-text-main')
        .text('- ' + this.data?.deviation);

      const arrow_down = this.svg
        .append('image')
        .attr(
          'xlink:href',
          './assets/icons/widgets/SMP/double-arrow-top.svg'
        )
        .attr('style', 'transform: scale(-1)')
        .attr('height', '7px')
        .attr('width', '7px')
        .attr('y', '-98')
        .attr('x', '-68');
    }
  }

}
