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
    @Input() isLineCircle: boolean = false;

    @ViewChild('chart') private chart: ElementRef;

    private chartData: {
        graphType: ProductionTrendType;
        graph: IChartD3[];
    }[] = [];

    private svg;

    private graphMaxX: number = 0;
    private graphMaxY: number = 0;
    private dataMax: number = 0;
    private dataMin: number = 0;

    public scaleFuncs: { x: any; y: any } = { x: null, y: null };
    private axis: { axisX: any; axisY: any } = { axisX: null, axisY: null };

    private readonly MAX_COEF: number = 0.1;
    private readonly MIN_COEF: number = 0.3;

    private readonly padding: { left: number; right: number; top: number; bottom: number } = {
        left: this.isLineCircle ? 25 : 15,
        right: this.isLineCircle ? 5 : 15,
        top: 0,
        bottom: 20,
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
        this.drawGridlines();
        this.drawChart();
        if (this.isLineCircle) {
            this.drawAxisYLabels();
            this.drawAxisXLabels();
            this.drawPoints();
        }
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
            .attr('viewBox', `0 0 ${this.graphMaxX} ${this.graphMaxY - 5}`);
    }

    private findMinMax(): void {
        const maxValues: number[] = [];
        const minValues: number[] = [];

        this.data.forEach((graph) => {
            maxValues.push(d3.max(graph.graph, (item: IChartMini) => item.value));
            minValues.push(d3.min(graph.graph, (item: IChartMini) => item.value));
        });

        this.dataMax = d3.max(maxValues) * (1 + this.MAX_COEF);
        this.dataMin = d3.min(minValues) * (1 - this.MIN_COEF);
    }

    private defineScale(): void {
        const plan = this.data.find((chart) => chart.graphType === 'plan');

        const domainDates = d3.extent(plan.graph, (item: IChartMini) => item.timeStamp);
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
            .ticks(10)
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
            const line = d3
                .line()
                .x((item: IChartD3) => item.x)
                .y((item: IChartD3) => item.y);

            const area = d3
                .area()
                .x((item: IChartD3) => item.x)
                .y0(this.graphMaxY - this.padding.bottom)
                .y1((item: IChartD3) => item.y);

            const lineWidth: number = 1;
            const lineColor: string =
                chart.graphType === 'fact' ? (this.isLineCircle ? '#0089FF' : 'white') : '#4B5169';
            const opacity: number = chart.graphType === 'fact' ? 1 : 0.2;

            this.svg
                .append('path')
                .attr('class', `graph-line-${chart.graphType}`)
                .attr('d', line(chart.graph))
                .style('fill', 'none')
                .style('stroke', lineColor)
                .style('stroke-width', lineWidth)
                .style('opacity', opacity);

            if (chart.graphType === 'plan') {
                this.svg
                    .append('path')
                    .attr('class', `graph-area-${chart.graphType}`)
                    .attr('d', area(chart.graph))
                    .style('fill', '#4B5169')
                    .style('opacity', opacity);
            }
        });
    }

    private drawPoints(): void {
        const pointsG = this.svg.append('g').attr('class', 'chart-points');
        const fact = this.chartData.find((chart) => chart.graphType === 'fact');
        if (!fact.graph.length) {
            return;
        }

        fact.graph.forEach((point, index, arr) => {
            const r = index < arr.length - 1 ? 3 : 4;
            pointsG
                .append('circle')
                .attr('class', 'point')
                .attr('cx', point.x)
                .attr('cy', point.y)
                .attr('r', r)
                .style('fill', '#1C1F2B')
                .style('stroke', '#0089FF')
                .style('stroke-width', 1);
        });
    }

    private drawGridlines(): void {
        const plan = this.chartData.find((chart) => chart.graphType === 'plan');
        this.svg
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0,${this.graphMaxY - this.padding.bottom})`)
            .call(
                d3
                    .axisBottom(this.scaleFuncs.x)
                    .ticks(plan.graph.length)
                    .tickSize(-this.graphMaxY - this.padding.bottom)
                    .tickFormat('')
            )
            .style('color', this.isLineCircle ? '#272A38' : '#2d2f3d');
    }

    private drawAxisXLabels(): void {
        this.svg
            .append('g')
            .attr('transform', `translate(0,${this.graphMaxY - this.padding.bottom})`)
            .attr('class', 'axisX')
            .call(this.axis.axisX)
            .selectAll('text')
            .style('font-size', '12px')
            .style('fill', '#8c99b2');

        const axisG = this.svg.select('g.axisX');
        axisG.select('path.domain').remove();
        axisG.selectAll('g.tick line').remove();

        const colors = {
            last: '#606580',
            active: '#0089FF',
            future: '#303549',
        };

        const activeIdx =
            this.chartData.find((chart) => chart.graphType === 'fact').graph.length - 1;

        const gArr = Array.from(axisG.selectAll('g.tick')._groups[0]);
        gArr.forEach((g: HTMLElement, idx: number) => {
            const fill =
                idx < activeIdx ? colors.last : idx === activeIdx ? colors.active : colors.future;
            d3Selection
                .select(g)
                .select('text')
                .style('fill', fill);
        });
    }

    private drawAxisYLabels(): void {
        this.svg
            .append('g')
            .attr('transform', `translate(${this.padding.left},0)`)
            .attr('class', 'axisY')
            .call(this.axis.axisY)
            .selectAll('text')
            .style('font-size', '12px')
            .style('fill', '#606580');

        const axisG = this.svg.select('g.axisY');
        axisG.select('path.domain').remove();
        axisG.selectAll('g.tick line').remove();
    }
}
