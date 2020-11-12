import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatHint } from '@angular/material/form-field';
import * as d3 from 'd3';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-circle-diagram',
  templateUrl: './sou-mvp-mnemonic-scheme-circle-diagram.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-circle-diagram.component.scss']
})
export class SouMvpMnemonicSchemeCircleDiagramComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') chart: ElementRef;
  @Input() title: string = 'FC100';
  @Input() percentage: number = 96;
  @Input() warningStatus: boolean = false;

  public svg: any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.svg = d3.select(this.chart.nativeElement)
      .append('svg')
      .attr('width', '40px')
      .attr('height', '40px');

    const arc = d3.arc()
      .innerRadius(16)
      .outerRadius(17)
      .startAngle(0)
      .endAngle(2 * Math.PI * this.percentage / 100);

    const arcBg = d3.arc()
      .innerRadius(16)
      .outerRadius(17)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    const g: any = this.svg.append('g').style('transform', 'translate(20px, 20px)')

    g.append('path')
      .attr('d', arcBg)
      .attr('fill', this.warningStatus ? 'var(--sou-mvp-color-warning)' : 'var(--sou-mvp-color-border)');

    g.append('path')
      .attr('d', arc)
      .attr('fill', this.warningStatus ? 'var(--sou-mvp-color-warning)' : 'white');
  }
}
