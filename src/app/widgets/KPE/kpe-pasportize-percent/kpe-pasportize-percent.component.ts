import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { AsyncRender } from '@shared/functions/async-render.function';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import * as d3 from 'd3';
import { gaugeData, productData } from './mock';

export interface IKpePasportizeGauge {
  plan: number;
  planDescription: string;
  fact: number;
  factDescription: string;
  percentage: number;
}
export interface IKpePasportizeProduct {
  title: string;
  percentage: number;
  count: number;
}

@Component({
  selector: 'evj-kpe-pasportize-percent',
  templateUrl: './kpe-pasportize-percent.component.html',
  styleUrls: ['./kpe-pasportize-percent.component.scss']
})
export class KpePasportizePercentComponent extends WidgetPlatform<unknown> implements OnInit {
  @ViewChild('chart') chart: ElementRef;

  public svg: any;
  data: IKpePasportizeGauge;
  productsList: IKpePasportizeProduct[];

  @AsyncRender
  drawSvg(): void {
    const innerR = 54;
    const outerR = 60;

    if (this.svg) {
      this.svg.remove();
    }

    this.svg = d3.select(this.chart.nativeElement)
      .append('svg')
      .attr('width', '120px')
      .attr('height', '120px');

    const arc = d3.arc()
      .innerRadius(innerR)
      .outerRadius(outerR)
      .startAngle(0)
      .endAngle(2 * Math.PI * this.data.percentage / 100);

    const arcBg = d3.arc()
      .innerRadius(innerR)
      .outerRadius(outerR)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    const g: any = this.svg.append('g')
      .attr('width', '120px')
      .attr('height', '120px')
      .style('transform', 'translate(60px, 60px)');

    g.append('path')
      .attr('d', arcBg)
      .attr('class', 'diagram-inner');

    g.append('path')
      .attr('d', arc)
      .attr('class', 'diagram-value');
  }


  constructor(
    protected widgetService: WidgetService,
    @Inject('isMock') public isMock: boolean,
    @Inject('widgetId') public id: string,
    @Inject('uniqId') public uniqId: string
  ) {
    super(widgetService, isMock, id, uniqId);
  }

  public ngOnInit(): void {
    super.widgetInit();
    this.data = gaugeData;
    this.productsList = productData;
    this.drawSvg();
  }

  protected dataHandler(ref: any): void {}
}