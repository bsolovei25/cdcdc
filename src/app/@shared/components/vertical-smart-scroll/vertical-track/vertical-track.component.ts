import { Component, AfterViewInit, OnChanges, HostListener, Input, ViewChild, ElementRef } from '@angular/core';
import { IChartMini, IChartD3 } from '@shared/interfaces/smart-scroll.model';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { IDatesInterval } from '@dashboard/services/widget.service';
import { setLimits } from '@shared/functions/set-limits.function';

@Component({
    selector: 'evj-vertical-track',
    templateUrl: './vertical-track.component.html',
    styleUrls: ['./vertical-track.component.scss'],
})
export class VerticalTrackComponent implements OnChanges, AfterViewInit {
    @Input() private data: IChartMini[] = [];
    @Input() private limits: IDatesInterval = null;

    @ViewChild('chart') private chart: ElementRef;

    private chartData: IChartD3[] = [];

    private svg = null;

    private graphMaxX: number = null;
    private graphMaxY: number = null;

    private readonly paddingX: number = 0;
    private readonly paddingY: number = 5;

    constructor() {}

    public ngOnChanges(): void {
        setTimeout(() => this.initData(), 0);
    }

    public ngAfterViewInit(): void {
    }

    initData(): void {
        if (this.data) {
            this.initGraph();
            this.transformData();
            this.drawGraph();
        }
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.initData();
    }

    private transformData(): void {
        this.data = setLimits(this.data, this.limits);

        let domainDates;
        if (!this.limits) {
            domainDates = d3.extent(this.data, (item: IChartMini) => item.timeStamp);
        } else {
            domainDates = [this.limits.fromDateTime, this.limits.toDateTime];
        }
        const rangeX = [this.paddingX, this.graphMaxX - this.paddingX];
        const time = d3.scaleTime().domain(domainDates).rangeRound(rangeX);

        const [dataMin, dataMax] = d3.extent(this.data, (item: IChartMini) => item.value);
        const domainValues = [dataMax, dataMin];

        const rangeY = [this.paddingY, this.graphMaxY - this.paddingY];
        const val = d3.scaleLinear().domain(domainValues).range(rangeY);

        this.chartData = [];
        this.data.forEach((item, index) => {
            this.chartData[index] = { x: time(item.timeStamp), y: val(item.value) };
        });
    }

    private initGraph(): void {
        if (this.svg) {
            this.svg.remove();
        }

        this.svg = d3Selection.select(this.chart.nativeElement).append('svg');
        // this.svg.transform('rotate(90)');

        this.graphMaxX = +d3Selection.select(this.chart.nativeElement).style('width').slice(0, -2);
        this.graphMaxY = +d3Selection.select(this.chart.nativeElement).style('height').slice(0, -2);

        this.svg
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${this.graphMaxX} ${this.graphMaxY}`);
    }

    private drawGraph(): void {
        const line = d3
            .line()
            .x((item: IChartD3) => item.x)
            .y((item: IChartD3) => item.y)
            .curve(d3.curveCatmullRom.alpha(0.5));

        this.svg
            .append('path')
            .attr('d', line(this.chartData))
            .style('fill', 'none')
            .style('stroke', '#4B5169')
            .style('stroke-width', 1);
    }
}
