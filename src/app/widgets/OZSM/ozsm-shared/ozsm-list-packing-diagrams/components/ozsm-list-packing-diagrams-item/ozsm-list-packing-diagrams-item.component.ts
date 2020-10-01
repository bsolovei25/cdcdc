import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AsyncRender } from '@shared/functions/async-render.function';
import * as d3 from 'd3';

@Component({
  selector: 'evj-ozsm-list-packing-diagrams-item',
  templateUrl: './ozsm-list-packing-diagrams-item.component.html',
  styleUrls: ['./ozsm-list-packing-diagrams-item.component.scss']
})
export class OzsmListPackingDiagramsItemComponent implements OnInit {

  @Input() index: string;
  @Input() fillPercent: number = 60;
  @ViewChild('chart') chart: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.drawSvgDiagram();
  }

  @AsyncRender
  drawSvgDiagram(): void {
    const svg = d3.select(this.chart.nativeElement).append('svg')
      .attr('width', 80)
      .attr('height', 80)
      .style('position', 'absolute');

    for (let i = 0.4 * 360 + 4; i <= 360; i += 4) {
      svg.append('rect')
        .attr('x', 41)
        .attr('y', 70.5)
        .style('transform-origin', 'center center')
        .style('transform', `rotate(${217 + i}deg)`)
        .attr('width', 1)
        .attr('height', 6)
        .attr('class', 'white');
    }

    svg.append('circle')
      .attr('cx', 40)
      .attr('cy', 40)
      .attr('r', 33.5)
      .attr('class', 'transparent')
      .style('transform-origin', 'center')
      .style('transform', `rotate(${90 + this.fillPercent / 100 * 217}deg)`)
      .style('stroke-width', '8px')
      .style('stroke-dasharray', '211px 211px')
      .style('stroke-dashoffset', `${85 + this.fillPercent / 100 * 126}`);

    svg.append('rect')
      .attr('x', 40)
      .attr('y', 69.5)
      .style('transform-origin', 'center center')
      .style('transform', `rotate(${0}deg)`)
      .attr('width', 1)
      .attr('height', 8)
      .attr('class', 'packing-marker');

    svg.append('rect')
      .attr('x', 40)
      .attr('y', 69.5)
      .style('transform-origin', 'center center')
      .style('transform', `rotate(${217}deg)`)
      .attr('width', 1)
      .attr('height', 8)
      .attr('class', 'packing-marker');

    svg.append('rect')
      .attr('x', 40)
      .attr('y', 69.5)
      .style('transform-origin', 'center center')
      .style('transform', `rotate(${this.fillPercent / 100 * 217}deg)`)
      .attr('width', 1)
      .attr('height', 8)
      .attr('class', 'white');
  }

}
