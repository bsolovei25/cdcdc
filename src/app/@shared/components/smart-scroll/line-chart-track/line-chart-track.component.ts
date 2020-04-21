import {
    Component,
    AfterViewInit,
    OnChanges,
    HostListener,
    Input,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { IChartMini, IChartD3 } from '../../../models/smart-scroll.model';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';

@Component({
    selector: 'evj-line-chart-track',
    templateUrl: './line-chart-track.component.html',
    styleUrls: ['./line-chart-track.component.scss'],
})
export class LineChartTrackComponent implements OnChanges, AfterViewInit {
    @Input() private data: IChartMini[] = [];

    @ViewChild('chart') private chart: ElementRef;

    private chartData: IChartD3[] = [];

    private svg = null;

    private graphMaxX: number = null;
    private graphMaxY: number = null;

    private readonly paddingX: number = 0;
    private readonly paddingY: number = 5;

    constructor() {}

    public ngOnChanges(): void {
        if (this.svg) {
            this.initGraph();
            this.transformData();
            this.drawGraph();
        }
    }

    public ngAfterViewInit(): void {
        this.initGraph();
        this.transformData();
        this.drawGraph();
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (this.svg) {
            this.initGraph();
            this.transformData();
            this.drawGraph();
        }
    }

    private transformData(): void {
        const domainDates = d3.extent(this.data, (item: IChartMini) => item.timestamp);
        const rangeX = [this.paddingX, this.graphMaxX - this.paddingX];
        const time = d3
            .scaleTime()
            .domain(domainDates)
            .rangeRound(rangeX);

        const domainValues = d3.extent(this.data, (item: IChartMini) => item.value);
        const rangeY = [this.paddingY, this.graphMaxY - this.paddingY];
        const val = d3
            .scaleLinear()
            .domain(domainValues)
            .range(rangeY);

        this.data.forEach((item, index) => {
            this.chartData[index] = { x: time(item.timestamp), y: val(item.value) };
        });
    }

    private initGraph(): void {
        if (this.svg) {
            this.svg.remove();
        }

        this.svg = d3Selection.select(this.chart.nativeElement).append('svg');

        this.graphMaxX = +d3Selection
            .select('div.line-chart-track')
            .style('width')
            .slice(0, -2);
        this.graphMaxY = +d3Selection
            .select('div.line-chart-track')
            .style('height')
            .slice(0, -2);

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
            .style('stroke', '#ffffff')
            .style('stroke-width', 1);
    }
}
