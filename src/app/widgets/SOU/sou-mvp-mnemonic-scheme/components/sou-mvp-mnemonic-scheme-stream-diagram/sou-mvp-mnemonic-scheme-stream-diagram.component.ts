import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-stream-diagram',
  templateUrl: './sou-mvp-mnemonic-scheme-stream-diagram.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-stream-diagram.component.scss']
})
export class SouMvpMnemonicSchemeStreamDiagramComponent implements OnInit, AfterViewInit {

  @ViewChild('chart') chart: ElementRef;
  @Input() title: string = '';
  @Input() weight: number = 0;
  @Input() percentage: number = 95;
  @Input() status: boolean = false;

  public svg: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const innerR = 7;
    const outerR = 8;
  
    this.svg = d3.select(this.chart.nativeElement)
      .append('svg')
      .attr('width', '22px')
      .attr('height', '22px');

    const arc = d3.arc()
      .innerRadius(innerR)
      .outerRadius(outerR)
      .startAngle(0)
      .endAngle(2 * Math.PI * this.percentage / 100);

    const arcBg = d3.arc()
      .innerRadius(7)
      .outerRadius(8)
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
}
