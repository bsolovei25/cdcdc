import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AsyncRender } from '@shared/functions/async-render.function';
import * as d3 from 'd3';

@Component({
    selector: 'evj-kpe-execution-production-program-loading-file',
    templateUrl: './kpe-execution-production-program-loading-file.component.html',
    styleUrls: ['./kpe-execution-production-program-loading-file.component.scss'],
})
export class KpeExecutionProductionProgramLoadingFileComponent implements OnInit, OnChanges {
    @Input() data: number = 0;
    percent: number = 0;
    @ViewChild('chart') chart: ElementRef;

    public svg: any;

    @AsyncRender
    drawSvg(): void {
        const innerR = 7;
        const outerR = 8;

        if (this.svg) {
            this.svg.remove();
        }

        this.svg = d3.select(this.chart.nativeElement).append('svg').attr('width', '16px').attr('height', '16px');

        const arc = d3
            .arc()
            .innerRadius(innerR)
            .outerRadius(outerR)
            .startAngle(0)
            .endAngle((2 * Math.PI * this.percent) / 100);

        const arcBg = d3
            .arc()
            .innerRadius(innerR)
            .outerRadius(outerR)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        const g: any = this.svg
            .append('g')
            .attr('width', '16px')
            .attr('height', '16px')
            .style('transform', 'translate(8px, 8px)');

        g.append('path').attr('d', arc).style('fill', 'var(--color-kpe-gaude-active');
    }
    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.percent = this.data;
        this.drawSvg();
    }
}
