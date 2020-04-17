import { Component, AfterViewInit } from '@angular/core';
import { IChartMini, IChartD3 } from '../../../models/smart-scroll.model';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';

@Component({
    selector: 'evj-line-chart-track',
    templateUrl: './line-chart-track.component.html',
    styleUrls: ['./line-chart-track.component.scss'],
})
export class LineChartTrackComponent implements AfterViewInit {
    private data: IChartMini[] = [
        { value: 7, timestamp: new Date(2020, 3, 1) },
        { value: 2, timestamp: new Date(2020, 3, 2) },
        { value: -3, timestamp: new Date(2020, 3, 3) },
        { value: 5, timestamp: new Date(2020, 3, 4) },
        { value: 1, timestamp: new Date(2020, 3, 5) },
        { value: 8, timestamp: new Date(2020, 3, 6) },
        { value: 7, timestamp: new Date(2020, 3, 7) },
        { value: 7, timestamp: new Date(2020, 3, 9) },
        { value: 2, timestamp: new Date(2020, 3, 10) },
        { value: -3, timestamp: new Date(2020, 3, 11) },
        { value: 5, timestamp: new Date(2020, 3, 12) },
        { value: 1, timestamp: new Date(2020, 3, 13) },
        { value: 8, timestamp: new Date(2020, 3, 14) },
        { value: 7, timestamp: new Date(2020, 3, 15) },
        { value: 7, timestamp: new Date(2020, 3, 16) },
        { value: 2, timestamp: new Date(2020, 3, 17) },
        { value: -3, timestamp: new Date(2020, 3, 18) },
        { value: 5, timestamp: new Date(2020, 3, 19) },
        { value: 1, timestamp: new Date(2020, 3, 20) },
        { value: 8, timestamp: new Date(2020, 3, 21) },
        { value: 7, timestamp: new Date(2020, 3, 22) },
        { value: 7, timestamp: new Date(2020, 3, 23) },
        { value: 2, timestamp: new Date(2020, 3, 24) },
        { value: -3, timestamp: new Date(2020, 3, 25) },
        { value: 5, timestamp: new Date(2020, 3, 26) },
        { value: 1, timestamp: new Date(2020, 3, 27) },
        { value: 8, timestamp: new Date(2020, 3, 28) },
        { value: 7, timestamp: new Date(2020, 3, 29) },
    ];

    private chartData: IChartD3[] = [];

    private svg = null;

    private graphMaxX: number = null;
    private graphMaxY: number = null;

    private readonly paddingX: number = 0;
    private readonly paddingY: number = 5;

    constructor() {}

    public ngAfterViewInit(): void {
        this.initGraph();
        this.transformData();
        this.drawGraph();
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
        this.svg = d3Selection.select('div.line-chart-track').append('svg');

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
            .y((item: IChartD3) => item.y);

        this.svg
            .append('path')
            .attr('d', line(this.chartData))
            .style('fill', 'none')
            .style('stroke', '#ffffff')
            .style('stroke-width', '2px');
    }
}
