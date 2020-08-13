import { Component, Input, ViewChild, ElementRef, HostListener, OnChanges } from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { IChartD3, IChartMini } from '../../../../../@shared/models/smart-scroll.model';
import {
    IMultiChartLine,
    IMultiChartData,
} from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';

const lineColors: { [key: string]: string } = {
    temperature: '#FFB100',
    heatExchanger: '#673AB7',
    volume: '#45C5FA',
    pressure: '#0F62FE',
};

@Component({
    selector: 'evj-astue-onpz-multi-chart',
    templateUrl: './astue-onpz-multi-chart.component.html',
    styleUrls: ['./astue-onpz-multi-chart.component.scss'],
})
export class AstueOnpzMultiChartComponent implements OnChanges {
    @Input() private data: IMultiChartLine[] = [];

    @ViewChild('chart', { static: true }) private chart: ElementRef;

    private svg;

    private graphMaxX: number = 0;
    private graphMaxY: number = 0;
    private dataMax: number = 0;
    private dataMin: number = 0;

    private charts: IMultiChartData[] = [];

    public scaleFuncs: { x: any; y: any } = { x: null, y: null };
    private axis: { axisX: any; axisY: any } = { axisX: null, axisY: null };

    private readonly MAX_COEF: number = 0.1;
    private readonly MIN_COEF: number = 0.3;

    private readonly padding: { left: number; right: number; top: number; bottom: number } = {
        left: 0,
        right: 30,
        top: 120,
        bottom: 40,
    };

    private readonly axisYWidth: number = 60;
    private readonly topMargin: number = 25;

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
        this.drawAxisXLabels();
        this.drawAxisYLabels();
        this.drawFutureRect();
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
        this.charts = [];

        this.data.forEach((graph) => {
            this.charts.push({ ...(graph as IMultiChartData) });
            const currentChart = this.charts[this.charts.length - 1];
            currentChart.maxValue = Math.round(
                d3.max(graph.graph, (item: IChartMini) => item.value) * (1 + this.MAX_COEF)
            );
            currentChart.minValue = Math.round(
                d3.min(graph.graph, (item: IChartMini) => item.value) * (1 - this.MIN_COEF)
            );
        });

        const plan = this.charts.find((item) => item.graphType === 'plan');
        const fact = this.charts.find((item) => item.graphType === 'fact');
        const [min, max] = d3.extent([plan.minValue, plan.maxValue, fact.minValue, fact.maxValue]);
        plan.minValue = fact.minValue = min;
        plan.maxValue = fact.maxValue = max;
    }

    private defineScale(): void {
        const left = this.padding.left + this.axisYWidth * (this.charts.length - 1);

        const chart = this.data.find((graph) => !!graph.graph.length).graph;
        const year = chart[0].timeStamp.getFullYear();
        const month = chart[0].timeStamp.getMonth();
        const day = chart[0].timeStamp.getDate();
        const domainDates = [new Date(year, month, day), new Date(year, month, day + 1)];
        const rangeX = [left, this.graphMaxX - this.padding.right];

        this.scaleFuncs.x = d3
            .scaleTime()
            .domain(domainDates)
            .rangeRound(rangeX);

        const rangeY = [this.padding.top, this.graphMaxY - this.padding.bottom];
        this.charts.forEach((item) => {
            const domain = [item.maxValue, item.minValue];
            item.scaleY = d3
                .scaleLinear()
                .domain(domain)
                .range(rangeY);
            item.axisY = d3
                .axisLeft(item.scaleY)
                .ticks(5)
                .tickSize(0);
        });

        this.axis.axisX = d3
            .axisBottom(this.scaleFuncs.x)
            .ticks(24)
            .tickFormat(d3.timeFormat('%H'))
            .tickSizeOuter(0);
    }

    private transformData(): void {
        const transform = (item): void => {
            item.transformedGraph = [];
            item.graph.forEach((point) => {
                item.transformedGraph.push({
                    x: this.scaleFuncs.x(point.timeStamp),
                    y: item.scaleY(point.value),
                });
            });
        };
        this.charts.forEach(transform);
    }

    private drawChart(): void {
        this.charts.forEach((chart) => {
            const line = d3
                .line()
                .x((item: IChartD3) => item.x)
                .y((item: IChartD3) => item.y);

            const flag = chart.graphType !== 'plan' && chart.graphType !== 'fact';
            const lineType = flag ? 'other' : chart.graphType;
            const drawnLine = this.svg
                .append('path')
                .attr('class', `graph-line-${lineType}`)
                .attr('d', line(chart.transformedGraph));
            if (flag) {
                drawnLine.style('stroke', lineColors[chart.graphType]);
            }
        });
    }

    private drawGridlines(): void {
        const grid = this.svg
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0,${this.graphMaxY - this.padding.bottom})`)
            .call(
                d3
                    .axisBottom(this.scaleFuncs.x)
                    .ticks(20)
                    .tickSize(
                        -(this.graphMaxY - this.padding.bottom - this.padding.top + this.topMargin)
                    )
                    .tickFormat('')
            )
            .style('color', '#272A38');

        const left = this.padding.left + this.axisYWidth * (this.charts.length - 1);

        grid.append('line')
            .attr('x1', left)
            .attr('y1', -(this.graphMaxY - this.padding.top - this.padding.bottom + this.topMargin))
            .attr('x2', this.graphMaxX - this.padding.right)
            .attr('y2', -(this.graphMaxY - this.padding.top - this.padding.bottom + this.topMargin))
            .attr('stroke', 'currentColor');
    }

    private drawAxisXLabels(): void {
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
        drawLabels('axisX', translateX);
    }

    private drawAxisYLabels(): void {
        let left = this.padding.left + this.axisYWidth * (this.charts.length - 1);
        let counter = 0;
        let isMainAxisDrawn = false;
        this.charts.forEach((chart) => {
            const flag = chart.graphType === 'fact' || chart.graphType === 'plan';
            if (flag && isMainAxisDrawn) {
                return;
            } else if (flag) {
                isMainAxisDrawn = true;
            }
            const translate: string = `translate(${left},0)`;
            left -= this.axisYWidth;
            const axisY = this.svg
                .append('g')
                .attr('transform', translate)
                .attr('class', 'axisY');
            axisY
                .append('rect')
                .attr('class', `axisY-bg_${(counter % 2) + 1}`)
                .attr('x', -this.axisYWidth)
                .attr('y', this.padding.top - this.topMargin)
                .attr('width', this.axisYWidth)
                .attr(
                    'height',
                    this.graphMaxY - this.padding.top - this.padding.bottom + this.topMargin
                );
            counter++;
            axisY
                .call(chart.axisY)
                .selectAll('text')
                .attr('class', 'label');
            const legend = axisY.append('g').attr('class', 'legend');
            const stroke = flag ? '#FFFFFF' : lineColors[chart.graphType];
            const padding = 5;
            legend
                .append('line')
                .attr('class', 'legend-line')
                .attr('x1', -this.axisYWidth + padding)
                .attr('y1', this.padding.top)
                .attr('x2', -padding)
                .attr('y2', this.padding.top)
                .attr('stroke', stroke);

            if (flag) {
                legend
                    .append('line')
                    .attr('class', 'legend-line')
                    .attr('x1', -this.axisYWidth + padding)
                    .attr('y1', this.padding.top)
                    .attr('x2', -padding)
                    .attr('y2', this.padding.top)
                    .attr('stroke', '#0089ff')
                    .attr('stroke-dasharray', (this.axisYWidth - 2 * padding) / 2);
            }

            legend
                .append('text')
                .attr('class', 'legend-text')
                .attr('text-anchor', 'end')
                .attr('x', -padding)
                .attr('y', this.padding.top - 1.2 * padding)
                .text(chart.units);

            const buttons = axisY.append('g').attr('class', 'scale-buttons');
            const buttonMinus = buttons.append('g').attr('class', 'button');
            buttonMinus
                .append('circle')
                .attr('cx', -this.axisYWidth / 3)
                .attr('cy', (this.padding.top - this.topMargin) * 0.8)
                .attr('r', 7);
            buttonMinus
                .append('line')
                .attr('x1', -this.axisYWidth / 3 - 4)
                .attr('y1', (this.padding.top - this.topMargin) * 0.8)
                .attr('x2', -this.axisYWidth / 3 + 4)
                .attr('y2', (this.padding.top - this.topMargin) * 0.8);

            const buttonPlus = buttons.append('g').attr('class', 'button');
            buttonPlus
                .append('circle')
                .attr('cx', (-this.axisYWidth * 2) / 3)
                .attr('cy', (this.padding.top - this.topMargin) * 0.8)
                .attr('r', 7);
            buttonPlus
                .append('line')
                .attr('x1', (-this.axisYWidth * 2) / 3)
                .attr('y1', (this.padding.top - this.topMargin) * 0.8 - 4)
                .attr('x2', (-this.axisYWidth * 2) / 3)
                .attr('y2', (this.padding.top - this.topMargin) * 0.8 + 4);
            buttonPlus
                .append('line')
                .attr('x1', (-this.axisYWidth * 2) / 3 - 4)
                .attr('y1', (this.padding.top - this.topMargin) * 0.8)
                .attr('x2', (-this.axisYWidth * 2) / 3 + 4)
                .attr('y2', (this.padding.top - this.topMargin) * 0.8);
        });

        const axisG = this.svg.selectAll(`g.axisY`);
        axisG.select('path.domain').remove();
        axisG.selectAll('g.tick line').remove();
    }

    private drawFutureRect(): void {
        const values = [];
        let plan: IChartMini;
        let fact: IChartMini;
        let x: number;
        this.charts.forEach((chart) => {
            if (chart.graphType === 'plan') {
                plan = chart.graph[chart.graph.length - 1];
            } else if (chart.graphType === 'fact') {
                fact = chart.graph[chart.graph.length - 1];
            } else {
                values.push({
                    val: chart.graph[chart.graph.length - 1],
                    color: lineColors[chart.graphType],
                    units: chart.units ?? '',
                });
            }
            x = chart.transformedGraph[chart.transformedGraph.length - 1].x;
        });

        const y = (this.padding.top - this.topMargin) * 0.7;
        const y2 = this.graphMaxY - this.padding.bottom;
        const width = this.graphMaxX - this.padding.right - x;
        const height = this.graphMaxY - this.padding.top - this.padding.bottom + this.topMargin;
        if (width > 0) {
            const g = this.svg.append('g').attr('class', 'picker');
            g.append('rect')
                .attr('x', x)
                .attr('y', this.padding.top - this.topMargin)
                .attr('width', width)
                .attr('height', height)
                .attr('class', 'future');
            g.append('line')
                .attr('x1', x)
                .attr('y1', y)
                .attr('x2', x)
                .attr('y2', y2)
                .attr('class', 'future-line');
            g.append('line')
                .attr('x1', x - this.topMargin / 2)
                .attr('y1', y)
                .attr('x2', x + this.topMargin / 2)
                .attr('y2', y)
                .attr('class', 'future-line future-line_hor');
            g.append('rect')
                .attr('x', x - this.axisYWidth * 1.25)
                .attr('y', y - this.axisYWidth * 0.5)
                .attr('width', this.axisYWidth * 2.5)
                .attr('height', this.axisYWidth * 0.5)
                .attr('rx', 5)
                .attr('class', 'data');
            g.append('rect')
                .attr('x', x - (this.axisYWidth * 0.3) / 2)
                .attr('y', y - this.axisYWidth * 0.4)
                .attr('width', this.axisYWidth * 0.3)
                .attr('height', this.axisYWidth * 0.3)
                .attr('rx', 5)
                .attr('class', 'data-icon');
            g.append('image')
                .attr(
                    'xlink:href',
                    'assets/icons/widgets/ASTUE-ONPZ/astue-onpz-conventional-fuel/poly.svg'
                )
                .attr('x', x - (this.axisYWidth * 0.3) / 2 + 1)
                .attr('y', y - this.axisYWidth * 0.4 + 3)
                .attr('width', this.axisYWidth * 0.3 - 8)
                .attr('height', this.axisYWidth * 0.3 - 8);
            g.append('image')
                .attr(
                    'xlink:href',
                    'assets/icons/widgets/ASTUE-ONPZ/astue-onpz-conventional-fuel/poly.svg'
                )
                .attr('x', x - (this.axisYWidth * 0.3) / 2 + 2)
                .attr('y', y - this.axisYWidth * 0.4 + 2)
                .attr('width', this.axisYWidth * 0.3 - 4)
                .attr('height', this.axisYWidth * 0.3 - 4);
            g.append('text')
                .attr('text-anchor', 'end')
                .attr('x', x - this.axisYWidth * 0.3)
                .attr('y', y - this.axisYWidth * 0.15)
                .attr('class', 'data-fact')
                .text(fact.value);
            g.append('text')
                .attr('text-anchor', 'start')
                .attr('x', x + this.axisYWidth * 0.3)
                .attr('y', y - this.axisYWidth * 0.15)
                .attr('class', 'data-plan')
                .text(plan.value);

            const formatDate = d3.timeFormat('%d.%m.%Y | %H:%M:%S');
            g.append('text')
                .attr('text-anchor', 'middle')
                .attr('x', x)
                .attr('y', y - this.axisYWidth * 0.6)
                .attr('class', 'data-date')
                .text(formatDate(plan.timeStamp));

            let start = this.padding.top - this.topMargin;
            const step = 10;
            const cardWidth = this.axisYWidth * 2;
            const cardHeigh = this.axisYWidth * 0.5;

            values.forEach((val, idx) => {
                const rect = g.append('g').attr('class', 'val');
                const bg = rect
                    .append('g')
                    .attr('class', 'bg')
                    .style('opacity', 0.25);

                start += step + cardHeigh * idx;

                bg.append('rect')
                    .attr('x', x + step)
                    .attr('y', start)
                    .attr('width', cardWidth)
                    .attr('height', cardHeigh)
                    .attr('rx', 5);
                bg.append('rect')
                    .attr('x', x + step * 1.5)
                    .attr('y', start + step * 0.5)
                    .attr('width', cardHeigh - step)
                    .attr('height', cardHeigh - step)
                    .attr('rx', 5)
                    .style('fill', val.color);

                rect.append('text')
                    .attr('x', x + step * 1.5 + cardHeigh)
                    .attr('y', start + cardHeigh - step * 0.9)
                    .text(`${val.val.value} ${val.units}`);
                rect.append('image')
                    .attr(
                        'xlink:href',
                        'assets/icons/widgets/ASTUE-ONPZ/astue-onpz-conventional-fuel/pressure.svg'
                    )
                    .attr('x', x + step * 1.7)
                    .attr('y', start + step * 0.7)
                    .attr('width', cardHeigh - step * 1.4)
                    .attr('height', cardHeigh - step * 1.4);
            });
        }
    }
}