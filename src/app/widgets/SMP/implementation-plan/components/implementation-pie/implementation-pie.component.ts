import { IImplementationPlan } from './../../../../../dashboard/models/SMP/implementation-plan.model';
import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { SpaceNumber } from '@shared/pipes/number-space.pipe';
import * as d3 from 'd3';

@Component({
  selector: 'evj-implementation-pie',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './implementation-pie.component.html',
  styleUrls: ['./implementation-pie.component.scss']
})
export class ImplementationPieComponent implements OnInit, OnChanges {
  @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

  @Input() data: IImplementationPlan;

  public readonly RADIUS: number = 42;

  public defaultPercent: number = 100;

  public svg: any;

  constructor(
    private spacePipe: SpaceNumber,
  ) { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    if (this.svg) {
      this.svg.remove();
    }
    this.d3Circle(this.data, this.myCircle.nativeElement);
  }

  public d3Circle(data, el): void {
    const pipeValue: string = this.spacePipe.transform(data.value);
    // const summ = data.critical + data.nonCritical;
    const summ = this.defaultPercent - data.deviationPercent;
    const mass = [this.defaultPercent, data.deviationPercent];
    let color: any;

    if (summ === 0) {
      color = d3.scaleOrdinal().range(['gray']);
    } else {
      color = d3.scaleOrdinal().range(['var(--color-text-main)', 'var(--color-active)']);
    }

    this.svg = d3
      .select(el)
      .append('svg')

    let group = this.svg.append('g').attr('transform', 'translate(50 ,50)');

    const arc = d3
      .arc()
      .innerRadius(38.5)
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
      .attr('stroke', 'black')
      .attr('fill', (d) => color(d.index));

    group = group
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '13px')
      .attr('fill', 'var(--color-text-main)')
      .attr('dominant-baseline', 'middle')
      .text(pipeValue);

    const text = this.svg
      .append('text')
      .attr('fill', 'rgb(140,153,178)')
      .attr('font-size', '13px')
      .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr('y', '68')
      .attr('x', '50')
      .attr('fill', 'var(--color-standard)')
      .attr('text-anchor', 'middle')
      .text(data.deviation);
  }

}
