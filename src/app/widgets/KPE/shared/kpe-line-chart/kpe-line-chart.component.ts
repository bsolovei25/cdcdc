import { Component, ViewChild, ElementRef, HostListener, Input, OnChanges } from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import {
    IProductionTrend,
    ProductionTrendType,
} from '../../../../dashboard/models/production-trends.model';
import { IChartMini, IChartD3 } from '../../../../@shared/models/smart-scroll.model';

@Component({
    selector: 'evj-kpe-line-chart',
    templateUrl: './kpe-line-chart.component.html',
    styleUrls: ['./kpe-line-chart.component.scss'],
})
export class KpeLineChartComponent implements OnChanges {
    @Input() private data: IProductionTrend[] = [];

    @ViewChild('chart', { static: true }) private chart: ElementRef;

    private chartData: {
        graphType: ProductionTrendType;
        graph: IChartD3[];
    }[] = [];

    private svg;

    private graphMaxX: number = 0;
    private graphMaxY: number = 0;
    private dataMax: number = 0;
    private dataMin: number = 0;
    private dateMax: Date;
    private dateMin: Date;

    public scaleFuncs: { x: any; y: any } = { x: null, y: null };
    private axis: { axisX: any; axisY: any } = { axisX: null, axisY: null };

    private readonly MAX_COEF: number = 0.1;
    private readonly MIN_COEF: number = 0.3;

    private readonly padding: { left: number; right: number; top: number; bottom: number } = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    };

    constructor() {}

    public ngOnChanges(): void {
        if (this.data.length) {
            this.startDrawChart();
        }
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (this.data.length) {
            this.startDrawChart();
        }
    }

    private startDrawChart(): void {
        this.initData();
        this.findMinMax();
        this.defineScale();
        this.transformData();
        this.drawChart();
        this.drawFutureRect();
        this.drawPoints();
        this.customizeAreas();
    }

    private initData(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = undefined;
        }

        this.svg = d3Selection.select(this.chart.nativeElement).append('svg');

        this.graphMaxX = +d3Selection
            .select(this.chart.nativeElement)
            .style('width')
            .slice(0, -2);
        this.graphMaxY = +d3Selection
            .select(this.chart.nativeElement)
            .style('height')
            .slice(0, -2);

        this.svg
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${this.graphMaxX} ${this.graphMaxY}`);
    }

    private findMinMax(): void {
        const maxValues: number[] = [];
        const minValues: number[] = [];
        const minDate: Date[] = [];
        const maxDate: Date[] = [];

        this.data.forEach((graph) => {
            maxValues.push(d3.max(graph.graph, (item: IChartMini) => item.value));
            minValues.push(d3.min(graph.graph, (item: IChartMini) => item.value));
            maxDate.push(d3.max(graph.graph, (item: IChartMini) => item.timeStamp));
            minDate.push(d3.min(graph.graph, (item: IChartMini) => item.timeStamp));
        });

        this.dataMax = d3.max(maxValues) * (1 + this.MAX_COEF);
        this.dataMin = d3.min(minValues) * (1 - this.MIN_COEF);
        this.dateMax = d3.max(maxDate);
        this.dateMin = d3.min(minDate);
    }

    private defineScale(): void {
        const plan = this.data.find((chart) => chart.graphType === 'higherBorder');

        const domainDates = [this.dateMin, this.dateMax];
        const rangeX = [this.padding.left, this.graphMaxX - this.padding.right];

        this.scaleFuncs.x = d3
            .scaleTime()
            .domain(domainDates)
            .rangeRound(rangeX);

        const domainValues = [this.dataMax, this.dataMin];
        const rangeY = [this.padding.top, this.graphMaxY - this.padding.bottom];
        this.scaleFuncs.y = d3
            .scaleLinear()
            .domain(domainValues)
            .range(rangeY);

        this.axis.axisX = d3
            .axisBottom(this.scaleFuncs.x)
            .ticks(12)
            .tickFormat(d3.timeFormat('%d'))
            .tickSizeOuter(0);
        this.axis.axisY = d3
            .axisLeft(this.scaleFuncs.y)
            .ticks(5)
            .tickSize(0);
    }

    private transformData(): void {
        this.chartData = [];
        this.data.forEach((item) => this.transformOneChartData(item));
    }

    private transformOneChartData(chart: IProductionTrend): void {
        const chartData: {
            graphType: ProductionTrendType;
            graph: IChartD3[];
        } = {
            graphType: chart.graphType,
            graph: [],
        };

        chart.graph.forEach((item) => {
            chartData.graph.push({
                x: this.scaleFuncs.x(item.timeStamp),
                y: this.scaleFuncs.y(item.value),
            });
        });

        this.chartData.push(chartData);
    }

    private drawChart(): void {
        this.chartData.forEach((chart) => {
            const curve = d3.curveBasis;
            const line = d3
                .line()
                .x((item: IChartD3) => item.x)
                .y((item: IChartD3) => item.y)
                .curve(curve);

            const areaBottom = d3
                .area()
                .x((item: IChartD3) => item.x)
                .y0(this.graphMaxY - this.padding.bottom)
                .y1((item: IChartD3) => item.y)
                .curve(curve);

            const areaTop = d3
                .area()
                .x((item: IChartD3) => item.x)
                .y0((item: IChartD3) => item.y)
                .y1(this.padding.top)
                .curve(curve);

            this.svg
                .append('path')
                .attr('class', `graph-line-${chart.graphType}`)
                .attr('d', line(chart.graph));

            if (chart.graphType === 'higherBorder' || chart.graphType === 'lowerBorder') {
                const areaFn = chart.graphType === 'lowerBorder' ? areaBottom : areaTop;
                this.svg
                    .append('path')
                    .attr('class', `graph-area-${chart.graphType}`)
                    .attr('d', areaFn(chart.graph));
            }
        });
    }

    private drawPoints(): void {
        const pointsG = this.svg.append('g').attr('class', 'chart-points');
        this.chartData.forEach((item) => {
            if (item.graphType !== 'fact' && item.graphType !== 'plan') {
                return;
            }
            if (item.graphType === 'plan') {
                pointsG
                    .append('circle')
                    .attr('class', 'point point_plan')
                    .attr('cx', item.graph[item.graph.length - 1].x)
                    .attr('cy', item.graph[item.graph.length - 1].y)
                    .attr('r', 2);
            } else {
                const g = pointsG.append('g').attr('class', 'fact-point');
                let r = 8;
                let opacity = 0.05;
                for (let i = 0; i < 4; i++) {
                    g.append('circle')
                        .attr('class', 'point point_fact')
                        .attr('cx', item.graph[item.graph.length - 1].x)
                        .attr('cy', item.graph[item.graph.length - 1].y)
                        .attr('r', r)
                        .style('opacity', opacity);
                    r = r / 2;
                    opacity = opacity * 3;
                }
            }
        });
    }

    private customizeAreas(): void {
        const fact = this.data.find((item) => item.graphType === 'fact')?.graph ?? [];
        const higher = this.data.find((item) => item.graphType === 'higherBorder')?.graph ?? [];
        const lower = this.data.find((item) => item.graphType === 'lowerBorder')?.graph ?? [];
        fact.forEach((val, idx) => {
            if (higher[idx] && higher[idx].value < val.value) {
                this.svg
                    .select('path.graph-line-higherBorder')
                    .attr('class', 'graph-line-higherBorder graph-line_warning');
                this.svg
                    .select('path.graph-area-higherBorder')
                    .attr('class', 'graph-area-higherBorder graph-area_warning');
            } else if (lower[idx] && lower[idx].value > val.value) {
                this.svg
                    .select('path.graph-line-lowerBorder')
                    .attr('class', 'graph-line-lowerBorder graph-line_normal');
                this.svg
                    .select('path.graph-area-lowerBorder')
                    .attr('class', 'graph-area-lowerBorder graph-area_normal');
            }
        });
    }

    private drawFutureRect(): void {
        const fact = this.chartData.find((chart) => chart.graphType === 'fact')?.graph ?? [];
        const x = fact[fact.length - 1].x;
        const y = this.padding.top;
        const y2 = this.graphMaxY - this.padding.bottom;
        const width = this.graphMaxX - this.padding.right - x;
        const height = this.graphMaxY - this.padding.top - this.padding.bottom;
        if (width > 0) {
            this.svg
                .append('rect')
                .attr('x', x)
                .attr('y', y)
                .attr('width', width)
                .attr('height', height)
                .attr('class', 'future');
            this.svg
                .append('line')
                .attr('x1', x)
                .attr('y1', y)
                .attr('x2', x)
                .attr('y2', y2)
                .attr('class', 'future-line');
        }

        this.svg
            .append('rect')
            .attr('x', this.padding.left)
            .attr('y', this.padding.top)
            .attr('width', this.graphMaxX - this.padding.left - this.padding.right)
            .attr('height', this.graphMaxY - this.padding.top - this.padding.bottom)
            .attr('class', 'border-rect');
    }
}
