import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import { IImplementationPlan } from '../../implementation-plan.component';

@Component({
  selector: 'evj-implementation-tank',
  templateUrl: './implementation-tank.component.html',
  styleUrls: ['./implementation-tank.component.scss']
})
export class ImplementationTankComponent implements OnInit, AfterViewInit {
  @ViewChild('oilBak') oilBak: ElementRef;
  @Input() public data: IImplementationPlan;

  public tankPicture: any; //d3

  public rectYHeight: number = 355;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.drawBak(this.oilBak.nativeElement);
  }

  public drawBak(el: ElementRef): void {
    this.tankPicture = d3
      .select(el)
      .append('svg')
      .attr('min-width', '100px')
      .attr('height', '100%')
      .attr('width', '100%')
      .attr('class', 'textProduct')
      .attr('viewBox', '10 40 300 380');

    const pictureContainer = this.tankPicture
      .append('image')
      .attr('xlink:href', './assets/icons/widgets/oil-control-all/tank-information/Bak.png')
      .attr('height', '450px')
      .attr('width', '300px')
      .attr('x', '0')
      .attr('class', 'textProduct')
      .attr('y', '0');

    const planLevel = this.tankPicture
      .append('rect')
      .attr('fill', 'var(--color-smp-tank-plan)')
      .attr('opacity', '0.9')
      .attr('height', this.data.planTankLevel * 2.2)
      .attr('width', '220px')
      .attr('x', '55')
      .attr('y', this.rectYHeight - this.data.planTankLevel * 2.2);

    const factLevel = this.tankPicture
      .append('rect')
      .attr('fill', 'var(--color-smp-tank-fact)')
      .attr('opacity', '0.9')
      .attr('height', this.data.factTankLevel * 2.2)
      .attr('width', '220px')
      .attr('x', '55')
      .attr('y', this.rectYHeight - this.data.factTankLevel * 2.2);

    const title = this.tankPicture
      .append('text')
      .attr('fill', 'var(--color-text-main)')
      .attr('font-size', '46px')
      .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
      .attr('text-anchor', 'middle')
      .attr('y', '110')
      .attr('x', '165')
      .text(this.data.title);

    const border = this.tankPicture
      .append('rect')
      .attr('fill', 'none')
      .attr('stroke', 'var(--color-text-sub)')
      .attr('stroke-width', 3)
      .attr('height', 181)
      .attr('rx', '8')
      .attr('ry', '8')
      .attr('width', '220px')
      .attr('x', '55')
      .attr('y', 175);
  }

}
