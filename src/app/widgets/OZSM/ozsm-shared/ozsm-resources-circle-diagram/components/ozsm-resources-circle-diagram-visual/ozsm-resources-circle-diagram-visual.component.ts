import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { AsyncRender } from '@shared/functions/async-render.function';
import * as d3 from 'd3';

@Component({
  selector: 'evj-ozsm-resources-circle-diagram-visual',
  templateUrl: './ozsm-resources-circle-diagram-visual.component.html',
  styleUrls: ['./ozsm-resources-circle-diagram-visual.component.scss']
})
export class OzsmResourcesCircleDiagramVisualComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() percentage: number;

  @ViewChild('chart') chart: ElementRef;

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.drawSvgIndicator();
  }

  @AsyncRender
  drawSvgIndicator(): void {
    const svg = d3.select(this.chart.nativeElement).append('svg')
      .attr('width', 70)
      .attr('height', 70)
      .style('position', 'absolute');

    svg.append('circle')
      .attr('cx', 35)
      .attr('cy', 35)
      .attr('r', 28)
      .style('transform-origin', 'center')
      .style('transform', 'rotate(-88deg)')
      .style('fill', 'transparent')
      .style('stroke', this.percentage > 0 ? '#FFFFFF' : 'transparent')
      .style('stroke-width', '2px')
      .style('stroke-linecap', 'round')
      .style('stroke-dasharray', '176px 176px')
      .style('stroke-dashoffset', `${(1 - this.percentage / 100) * 176 + 1}`);
  }
}