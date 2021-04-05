import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AsyncRender } from '@shared/functions/async-render.function';
import * as d3 from 'd3';

export interface IReportLoadingFile {
    percent: number,
    fileType: 'xlsx' | 'pdf' | 'html',
    weight: number
}

@Component({
    selector: 'evj-report-loading-file',
    templateUrl: './report-loading-file.component.html',
    styleUrls: ['./report-loading-file.component.scss']
})

export class ReportLoadingFileComponent implements OnInit {
    @Input() set data(x: IReportLoadingFile) {
        this.inputData = x;
        this.percent = x.percent;
        this.drawSvg()
    };

    inputData: IReportLoadingFile;

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

        const g: any = this.svg
            .append('g')
            .attr('width', '16px')
            .attr('height', '16px')
            .style('transform', 'translate(8px, 8px)');

        g.append('path').attr('d', arc).style('fill', 'var(--border-blue-color)');
    }
    constructor() {}

    ngOnInit(): void {}
}

