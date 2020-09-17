import { Component, OnChanges, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import {
    IProductionTrend,
    ProductionTrendType,
} from '../../../../../dashboard/models/production-trends.model';
import { IChartD3, IChartMini } from '../../../../../@shared/models/smart-scroll.model';
import { AsyncRender } from '../../../../../@shared/functions/async-render.function';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { fillDataArray } from '../../../../../@shared/functions/fill-data-array.function';
import { ItemSizeAverager } from '@angular/cdk-experimental/scrolling';

@Component({
    selector: 'evj-deviation-limits-chart',
    templateUrl: './deviation-limits-chart.component.html',
    styleUrls: ['./deviation-limits-chart.component.scss'],
})
export class DeviationLimitsChartComponent implements OnChanges {
    @Input() private data: IProductionTrend[] = [];
    @Input() private isSpline: boolean = true;
    @Input() private isWithPicker: boolean = false;
    @Input() private isLowerEconomy: boolean = true;

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

    private padding: { left: number; right: number; top: number; bottom: number } = {
        left: 50,
        right: 30,
        top: 0,
        bottom: 40,
    };

    private readonly MAX_COEF: number = 0.1;
    private readonly MIN_COEF: number = 0.3;

    private readonly topMargin: number = 25;

    constructor() {}

    public ngOnChanges(): void {
        if (!!this.data.length) {
            this.normalizeData();
            this.startDrawChart();
        } else {
            this.dropChart();
        }
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (!!this.data.length) {
            this.startDrawChart();
        } else {
            this.dropChart();
        }
    }

    @AsyncRender
    private startDrawChart(): void {
        this.dropChart();
        this.initData();
        this.findMinMax();
        this.defineScale();
        this.transformData();
        this.drawGridlines();
        this.drawChart();
        this.drawAxisLabels();
        this.drawFutureRect();
        this.drawPoints();
        this.customizeAreas();
    }

    private initData(): void {
        if (this.isWithPicker) {
            this.padding.top = 70;
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
            .attr(
                'viewBox',
                `0 0 ${this.graphMaxX > 0 ? this.graphMaxX : 0} ${
                    this.graphMaxY > 5 ? this.graphMaxY - 5 : 0
                }`
            );
    }

    private normalizeData(): void {
        fillDataArray(this.data, 8, true);
        const fact = this.data.find((item) => item.graphType === 'fact');
        const hb = this.data.find((item) => item.graphType === 'higherBorder');
        const lb = this.data.find((item) => item.graphType === 'lowerBorder');
        const newFact: IProductionTrend = {
            graphType: fact.graphType,
            graphStyle: fact.graphStyle,
            graph: [],
        };
        fact.graph.forEach((item, idx) => {
            if (item.value > hb.graph[idx].value) {
                newFact.graph.push({
                    timeStamp: item.timeStamp,
                    value: item.value - hb.graph[idx].value,
                });
                return;
            } else if (item.value < lb.graph[idx].value) {
                newFact.graph.push({
                    timeStamp: item.timeStamp,
                    value: item.value - lb.graph[idx].value,
                });
                return;
            }
            newFact.graph.push({ timeStamp: item.timeStamp, value: 0 });
        });
        const newHB: IProductionTrend = {
            graphType: hb.graphType,
            graphStyle: hb.graphStyle,
            graph: hb.graph.map((item) => {
                return {
                    value: 0,
                    timeStamp: item.timeStamp,
                };
            }),
        };
        const newLB: IProductionTrend = {
            graphType: lb.graphType,
            graphStyle: lb.graphStyle,
            graph: lb.graph.map((item) => {
                return {
                    value: 0,
                    timeStamp: item.timeStamp,
                };
            }),
        };
        this.data = [newFact, newHB, newLB];
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
        this.dataMin = d3.min(minValues) * (1 + this.MIN_COEF);
        this.dateMax = d3.max(maxDate);
        this.dateMin = d3.min(minDate);
    }

    private defineScale(): void {
        const domainDates = [this.dateMin, this.dateMax];
        const rangeX = [this.padding.left, this.graphMaxX - this.padding.right];

        this.scaleFuncs.x = d3
            .scaleTime()
            .domain(domainDates)
            .rangeRound(rangeX);

        const max = d3.max([Math.abs(this.dataMax), Math.abs(this.dataMin)]);
        const domainValues = [max, -max];
        const rangeY = [this.padding.top, this.graphMaxY - this.padding.bottom];
        this.scaleFuncs.y = d3
            .scaleLinear()
            .domain(domainValues)
            .range(rangeY);

        this.axis.axisX = d3
            .axisBottom(this.scaleFuncs.x)
            .ticks(12)
            .tickFormat(d3.timeFormat('%H'))
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
            const curve = this.isSpline ? d3.curveBasis : d3.curveLinear;
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

            const opacity: number = 1;

            if (chart.graphType !== 'higherBorder') {
                this.svg
                    .append('path')
                    .attr('class', `graph-line-${chart.graphType}`)
                    .attr('d', line(chart.graph));
            }

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
                    .attr('r', 4);
            } else {
                const g = pointsG.append('g').attr('class', 'fact-point');
                let r = 9;
                let opacity = 0.33;
                for (let i = 0; i < 3; i++) {
                    g.append('circle')
                        .attr('class', 'point point_fact')
                        .attr('cx', item.graph[item.graph.length - 1].x)
                        .attr('cy', item.graph[item.graph.length - 1].y)
                        .attr('r', r)
                        .style('opacity', opacity);
                    r -= 3;
                    opacity += 0.33;
                }
            }
        });
    }

    private drawGridlines(): void {
        this.svg
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0,${this.graphMaxY - this.padding.bottom})`)
            .call(
                d3
                    .axisBottom(this.scaleFuncs.x)
                    .ticks(20)
                    .tickSize(-(this.graphMaxY - this.padding.bottom - this.padding.top))
                    .tickFormat('')
            )
            .style('color', '#272A38');
        this.svg
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(${this.padding.left},0)`)
            .call(
                d3
                    .axisLeft(this.scaleFuncs.y)
                    .ticks(5)
                    .tickSize(-(this.graphMaxX - this.padding.left - this.padding.right))
                    .tickFormat('')
            )
            .style('color', '#272A38');
    }

    private drawAxisLabels(): void {
        const drawLabels = (axis: 'axisX' | 'axisY', translate: string): void => {
            this.svg
                .append('g')
                .attr('transform', translate)
                .attr('class', axis)
                .call(this.axis[axis])
                .selectAll('text')
                .attr('class', 'label');

            const axisG = this.svg.select(`g.${axis}`);
            axisG.select('path.domain').remove();
            axisG.selectAll('g.tick line').remove();
        };

        const translateX: string = `translate(0,${this.graphMaxY - this.padding.bottom})`;
        const translateY: string = `translate(${this.padding.left},0)`;
        drawLabels('axisX', translateX);
        drawLabels('axisY', translateY);
    }

    private customizeAreas(): void {
        const fact = this.data.find((item) => item.graphType === 'fact')?.graph ?? [];
        const lastIdx: number = fact.length - 1;

        const setBorderColor = (border: 'lowerBorder' | 'higherBorder') => {
            const val = (border === 'higherBorder') === this.isLowerEconomy ? 'warning' : 'normal';
            const colorLine: string = `graph-line_${val}`;
            const colorArea: string = `graph-area_${val}`;
            this.svg
                .select('path.graph-line-lowerBorder')
                .attr('class', `graph-line-lowerBorder ${colorLine}`);
            this.svg
                .select(`path.graph-area-${border}`)
                .attr('class', `graph-area-${border} ${colorArea}`);
        };

        if (fact[lastIdx].value > 0) {
            setBorderColor('higherBorder');
        } else if (fact[lastIdx].value < 0) {
            setBorderColor('lowerBorder');
        }
    }

    private drawFutureRect(): void {
        const fact = this.chartData.find((chart) => chart.graphType === 'fact')?.graph ?? [];
        const x = fact[fact.length - 1].x;
        const y = this.padding.top;
        const y2 = this.graphMaxY - this.padding.bottom;
        const width = this.graphMaxX - this.padding.right - x;
        const height = this.graphMaxY - this.padding.top - this.padding.bottom;
        if (!this.isWithPicker && width > 0) {
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
        } else if (width > 0) {
            const w = 60;

            const g = this.svg.append('g').attr('class', 'picker');
            g.append('rect')
                .attr('x', x)
                .attr('y', this.padding.top - this.topMargin)
                .attr('width', width)
                .attr('height', height)
                .attr('class', 'future');
            g.append('line')
                .attr('x1', x)
                .attr('y1', this.padding.top - this.topMargin)
                .attr('x2', x)
                .attr('y2', y2)
                .attr('class', 'future-with-line');
            g.append('line')
                .attr('x1', x - this.topMargin / 2)
                .attr('y1', this.padding.top - this.topMargin)
                .attr('x2', x + this.topMargin / 2)
                .attr('y2', this.padding.top - this.topMargin)
                .attr('class', 'future-with-line future-with-line_hor');
            g.append('rect')
                .attr('x', x - w)
                .attr('y', this.padding.top - this.topMargin - w * 0.5)
                .attr('width', w * 2)
                .attr('height', w * 0.5)
                .attr('rx', 5)
                .attr('class', 'data');

            const factG = this.data.find((item) => item.graphType === 'fact').graph ?? [];
            const factVal = factG.length ? factG[factG.length - 1] : null;

            g.append('text')
                .attr('text-anchor', 'middle')
                .attr('x', x)
                .attr('y', this.padding.top - this.topMargin - w * 0.17)
                .attr('class', 'data-fact')
                .text(factVal?.value.toFixed(2) ?? '');

            const formatDate = d3.timeFormat('%d.%m.%Y | %H:%M:%S');

            g.append('text')
                .attr('text-anchor', 'middle')
                .attr('x', x)
                .attr('y', this.padding.top - this.topMargin - w * 0.55)
                .attr('class', 'data-date')
                .text(formatDate(factVal?.timeStamp ?? ''));
        }
    }

    private dropChart(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = undefined;
        }
    }
}
