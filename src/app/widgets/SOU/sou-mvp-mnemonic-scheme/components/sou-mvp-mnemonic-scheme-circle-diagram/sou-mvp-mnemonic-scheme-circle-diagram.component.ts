import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatHint } from '@angular/material/form-field';
import * as d3 from 'd3';
import { AsyncRender } from '../../../../../@shared/functions/async-render.function';
import { ISOUFlowIn, ISOUFlowOut, ISOUObjects } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';
import { SouMvpMnemonicSchemeService } from '../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-circle-diagram',
  templateUrl: './sou-mvp-mnemonic-scheme-circle-diagram.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-circle-diagram.component.scss']
})
export class SouMvpMnemonicSchemeCircleDiagramComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') chart: ElementRef;
  @Input() set data(data: {
    sections: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[],
    code: number
  }) {
    if (data.sections) {
      this.flowData = this.mvpService.getElementByCode(data.sections, data.code) as ISOUFlowOut;
      this.drawSvg();
    }
  }

  flowData: ISOUFlowOut;

  public svg: any;

  constructor(
    public mvpService: SouMvpMnemonicSchemeService
  ) { }

  ngOnInit(): void {
  }

  @AsyncRender
  drawSvg(): void {
    const innerR = 16;
    const outerR = 17;

    if (this.svg) {
      this.svg.remove();
    }

    this.svg = d3.select(this.chart.nativeElement)
      .append('svg')
      .attr('width', '40px')
      .attr('height', '40px');

    const arc = d3.arc()
      .innerRadius(innerR)
      .outerRadius(outerR)
      .startAngle(0)
      .endAngle(typeof(this.flowData?.tolerance) === 'number' ? 2 * Math.PI * this.flowData?.tolerance / 100 : 0);

    const arcBg = d3.arc()
      .innerRadius(innerR)
      .outerRadius(outerR)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    const g: any = this.svg.append('g').style('transform', 'translate(20px, 20px)')

    g.append('path')
      .attr('d', arcBg)
      .attr('fill', this.flowData?.isExceedingConfInterval ? 'var(--sou-mvp-color-warning)' : 'var(--sou-mvp-color-border)');

    g.append('path')
      .attr('d', arc)
      .attr('fill', this.flowData?.isExceedingConfInterval ? 'var(--sou-mvp-color-warning)' : 'white');
  }

  ngAfterViewInit(): void {
  }
}
