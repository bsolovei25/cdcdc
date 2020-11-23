import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { AsyncRender } from '../../../../../@shared/functions/async-render.function';
import { ISOUFlowOut } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';
import { SouMvpMnemonicSchemeService } from '../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-stream-diagram',
  templateUrl: './sou-mvp-mnemonic-scheme-stream-diagram.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-stream-diagram.component.scss']
})
export class SouMvpMnemonicSchemeStreamDiagramComponent implements OnInit, AfterViewInit {

  @ViewChild('chart') chart: ElementRef;
  @Input() set data(data: {
    sections: any[],
    code: number
  }) {
    if (data.sections) {
      this.flowData = this.mvpService.getElementByCode(data.sections, data.code) as ISOUFlowOut;
      this.drawSvg();
    }
  }

  @Input() choosenSetting: number;

  flowData: ISOUFlowOut;

  public svg: any;

  constructor(public mvpService: SouMvpMnemonicSchemeService) { }

  ngOnInit(): void {
  }

  @AsyncRender
  drawSvg(): void{
    const innerR = 7;
    const outerR = 8;

    if (this.svg) {
      this.svg.remove();
    }

    this.svg = d3.select(this.chart.nativeElement)
      .append('svg')
      .attr('width', '22px')
      .attr('height', '22px');

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

    const g: any = this.svg.append('g').style('transform', 'translate(11px, 11px)')

    g.append('path')
      .attr('d', arcBg)
      .attr('fill', 'var(--sou-mvp-color-border)');

    g.append('path')
      .attr('d', arc)
      .attr('fill', 'white');
  }

  ngAfterViewInit(): void {
  }
}
