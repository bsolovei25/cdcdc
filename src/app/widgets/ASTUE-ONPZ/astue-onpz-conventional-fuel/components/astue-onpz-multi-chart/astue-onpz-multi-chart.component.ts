import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    HostListener,
    OnChanges,
    Renderer2,
    OnDestroy,
} from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { IChartD3, IChartMini } from '@shared/models/smart-scroll.model';
import {
    IMultiChartLine,
    IMultiChartData, IMultiChartTypes
} from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import { AsyncRender } from '@shared/functions/async-render.function';
import { fillDataArrayChart } from '@shared/functions/fill-data-array.function';

export interface IMultiChartOptions {
    colors?: Map<string, number>;
    isIconsShowing?: boolean;
}

const lineColors: { [key: string]: string } = {
    1: '#9362d0',
    2: '#0ba4a4',
    3: '#8090f0',
    4: '#0f62fe',
    5: '#0089ff',
    6: '#039de0',
};

@Component({
    selector: 'evj-astue-onpz-multi-chart',
    templateUrl: './astue-onpz-multi-chart.component.html',
    styleUrls: ['./astue-onpz-multi-chart.component.scss'],
})
export class AstueOnpzMultiChartComponent implements OnChanges, OnDestroy {
    @Input() private data: IMultiChartLine[] = [];
    @Input() private colors: Map<string, number>;
    @Input() private options: IMultiChartOptions;

    @ViewChild('chart', { static: true }) private chart: ElementRef;

    private svg;

    private graphMaxX: number = 0;
    private graphMaxY: number = 0;

    private charts: IMultiChartData[] = [];

    public scaleFuncs: { x: any; y: any } = { x: null, y: null };
    private axis: { axisX: any; axisY: any } = { axisX: null, axisY: null };

    private readonly MAX_COEF: number = 0.3;
    private readonly MIN_COEF: number = 0.3;

    private coefs: { [key: string]: { min: number; max: number } } = {};
    private axisLabels: { [key: string]: number[] } = {};

    private readonly padding: { left: number; right: number; top: number; bottom: number } = {
        left: 0,
        right: 30,
        top: 120,
        bottom: 40,
    };

    private readonly axisYWidth: number = 60;
    private readonly topMargin: number = 25;

    private listeners: (() => void)[] = [];

    constructor(private renderer: Renderer2) {}

    public ngOnChanges(): void {
        if (!!this.data.length) {
            this.startDrawChart();
        } else {
            this.destroySvg();
        }
    }

    public ngOnDestroy(): void {
        this.listeners.forEach((listener) => listener());
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (!!this.data.length) {
            this.startDrawChart();
        } else {
            this.destroySvg();
        }
    }

    @AsyncRender
    private startDrawChart(): void {
        this.destroySvg();
        this.initData();
        this.normalizeData();
        this.findMinMax();
        this.defineAxis();
        this.defineScale();
        this.transformData();
        this.drawGridlines();
        this.drawChart();
        this.drawAxisXLabels();
        this.drawAxisYLabels();
        this.drawFutureRect();
    }

    private destroySvg(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = undefined;
            this.listeners.forEach((listener) => listener());
        }
    }

    private initData(): void {
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
        const currentDatetime = new Date();
        currentDatetime.setMinutes(0, 0 , 0);
        const domainDates = [
            currentDatetime.getTime() - 16 * 1000 * 60 * 60,
            currentDatetime.getTime() + 4 * 1000 * 60 * 60,
        ];
        this.data = this.data.filter((item) => item.graph?.length > 0);
        this.data.forEach((item) =>
            item.graph = fillDataArrayChart(item.graph, domainDates[0], domainDates[1],
                item.graphType === 'plan'));
        this.data = this.data.filter((x) => x?.graph?.length > 0);
    }

    private findMinMax(): void {
        this.charts = [];

        this.data.forEach((graph) => {
            const key: string =
                graph.graphType === 'fact' || graph.graphType === 'plan' || graph.graphType === 'forecast' ? 'main' : graph.graphType;
            if (!this.coefs[key]) {
                this.coefs[key] = {
                    min: this.MIN_COEF,
                    max: this.MAX_COEF,
                };
            }
            this.charts.push({ ...(graph as IMultiChartData) });
            const currentChart = this.charts[this.charts.length - 1];
            const max = d3.max(graph.graph, (item: IChartMini) => item.value);
            const min = d3.min(graph.graph, (item: IChartMini) => item.value);
            currentChart.maxValue = max + (max - min) * this.coefs[key].max;
            currentChart.minValue = min - (max - min) * this.coefs[key].min;
        });

        const plan = this.charts.find((item) => item.graphType === 'plan');
        const fact = this.charts.find((item) => item.graphType === 'fact');
        if (!!plan && !!fact) {
            const [min, max] = d3.extent([
                plan.minValue,
                plan.maxValue,
                fact.minValue,
                fact.maxValue,
            ]);
            plan.minValue = fact.minValue = min;
            plan.maxValue = fact.maxValue = max;
        }
    }

    private defineAxis(): void {
        let min: number = Infinity;
        let max: number = -Infinity;

        this.charts.forEach((chart) => {
            if (chart.graphType !== 'fact' && chart.graphType !== 'plan'
                && chart.graphType !== 'forecast'
            ) {
                this.axisLabels[chart.graphType] = this.defineAxisYLabels(
                    chart.minValue,
                    chart.maxValue
                );
            } else {
                min = chart.minValue < min ? chart.minValue : min;
                max = chart.maxValue > max ? chart.maxValue : max;
            }
        });

        this.axisLabels.main = this.defineAxisYLabels(min, max);
    }

    private defineAxisYLabels(min: number, max: number, countOfSteps: number = 10): number[] {
        const arr: number[] = [];
        const round = roundAxis(max - min);
        const step: number = +((max - min) / countOfSteps);
        for (let i = 1; i < 10; i++) {
            min += step;
            arr.push(+min.toFixed(round));
        }
        return arr;

        function roundAxis(dev: number, counter: number = 0): number {
            const eps: number = 4;
            const roundVal = 10 * 0.1 ** counter;
            if (dev > roundVal || counter > eps) {
                return counter;
            } else {
                return roundAxis(dev, ++counter);
            }
        }
    }

    private defineScale(): void {
        const left = this.setLeftPadding();
        const currentDatetime = new Date();
        currentDatetime.setMinutes(0, 0 , 0);
        const domainDates = [
            new Date(currentDatetime.getTime() - 16 * 1000 * 60 * 60),
            new Date(currentDatetime.getTime() + 4 * 1000 * 60 * 60),
        ];
        const rangeX = [left, this.graphMaxX - this.padding.right];

        this.scaleFuncs.x = d3
            .scaleTime()
            .domain(domainDates)
            .rangeRound(rangeX);

        const rangeY = [this.padding.top, this.graphMaxY - this.padding.bottom];
        const mainChartGroup = ['fact', 'plan', 'forecast'];
        const filterChartArray = this.charts.filter((x) =>
            mainChartGroup.includes(x.graphType));
        const domainMain = [d3.max(filterChartArray.map((x) => x.maxValue)),
            d3.min(filterChartArray.map((x) => x.minValue))];
        this.charts.forEach((item) => {
            if (!mainChartGroup.includes(item.graphType)) {
                const domain = [item.maxValue, item.minValue];
                item.scaleY = d3
                    .scaleLinear()
                    .domain(domain)
                    .range(rangeY);
            } else {
                item.scaleY = d3
                    .scaleLinear()
                    .domain(domainMain)
                    .range(rangeY);
            }
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

            const flag = chart.graphType !== 'plan' && chart.graphType !== 'fact' && chart.graphType !== 'forecast';
            const lineType = flag ? 'other' : chart.graphType;
            const drawnLine = this.svg
                .append('path')
                .attr('class', `graph-line-${lineType}`)
                .attr('d', line(chart.transformedGraph));
            if (flag) {
                drawnLine.style('stroke', lineColors[this.colors?.get(chart.tagName)]);
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

        const left = this.setLeftPadding();

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
        let left = this.setLeftPadding();
        let counter = 0;
        let isMainAxisDrawn = false;
        let isMainLabelsDrawn: boolean = false;

        const SCALE_STEP: number = 0.05;

        this.charts.forEach((chart) => {
            const flag = chart.graphType === 'fact' || chart.graphType === 'plan' || chart.graphType === 'forecast';
            if (flag && isMainAxisDrawn) {
                return;
            } else if (flag) {
                isMainAxisDrawn = true;
            }
            const translate: string = `translate(${left},0)`;
            left -= this.axisYWidth;
            const height: number =
                this.graphMaxY - this.padding.top - this.padding.bottom + this.topMargin;
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
                .attr('height', height);
            counter++;

            const labels = axisY.append('g').attr('class', 'labels');
            let y: number = this.padding.top - this.topMargin + height;
            const step: number = height / 10;
            if (isMainLabelsDrawn && (chart.graphType === 'plan' || chart.graphType === 'fact'
                || chart.graphType === 'forecast')
            ) {
                return;
            }
            const currentKey: string =
                chart.graphType === 'plan' || chart.graphType === 'fact' || chart.graphType === 'forecast' ? 'main' : chart.graphType;
            isMainLabelsDrawn = chart.graphType === 'plan' || chart.graphType === 'fact'
                || chart.graphType === 'forecast';
            this.axisLabels[currentKey].forEach((item) => {
                y -= step;
                labels
                    .append('text')
                    .attr('class', 'label')
                    .attr('x', -5)
                    .attr('y', y + 5)
                    .attr('text-anchor', 'end')
                    .text(item);
            });

            const legend = axisY.append('g').attr('class', 'legend');
            const stroke = flag ? '#FFFFFF' : lineColors[this.colors?.get(chart.tagName)];
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

            const key: string =
                chart.graphType === 'fact' || chart.graphType === 'plan' || chart.graphType === 'forecast' ? 'main' : chart.graphType;
            const coefs = this.coefs[key];

            this.listeners.push(
                this.renderer.listen(buttonMinus._groups[0][0], 'click', () => {
                    coefs.max += SCALE_STEP;
                    coefs.min += SCALE_STEP;
                    this.startDrawChart();
                }),
                this.renderer.listen(buttonPlus._groups[0][0], 'click', () => {
                    if (!!+coefs.max.toFixed(2)) {
                        coefs.max -= SCALE_STEP;
                        coefs.min -= SCALE_STEP;
                        this.startDrawChart();
                    }
                })
            );
        });

        const axisG = this.svg.selectAll(`g.axisY`);
        axisG.select('path.domain').remove();
        axisG.selectAll('g.tick line').remove();
    }

    private drawFutureRect(): void {
        const values = [];
        let plan: IChartMini;
        let fact: IChartMini;
        const currentDatetime: Date = new Date();
        currentDatetime.setMinutes(0, 0, 0);
        const x: number = this.scaleFuncs.x(currentDatetime);
        this.charts.forEach((chart) => {
            const filterChart = chart.graph
                .filter((item) => item.timeStamp.getTime() <= currentDatetime.getTime());
            const statValue =
                filterChart?.length > 0
                    ? filterChart[filterChart.length - 1]
                    : chart?.graph[0] ?? null;
            if (chart.graphType === 'plan') {
                plan = chart.graph[chart.graph.length - 1];
            } else if (chart.graphType === 'fact') {
                fact = chart.graph[chart.graph.length - 1];
            } else if (chart.graphType === 'forecast') {
                // TODO add some
            } else {
                values.push({
                    val: statValue,
                    color: lineColors[this.colors?.get(chart.tagName)],
                    units: chart.units ?? '',
                    iconType: chart.graphType ?? 'volume',
                });
            }
        });
        console.log('charts', values);

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
            if (fact) {
                g.append('text')
                    .attr('text-anchor', 'end')
                    .attr('x', x - this.axisYWidth * 0.3)
                    .attr('y', y - this.axisYWidth * 0.15)
                    .attr('class', 'data-fact')
                    .text(fact.value.toFixed(2));
            }
            if (plan) {
                g.append('text')
                    .attr('text-anchor', 'start')
                    .attr('x', x + this.axisYWidth * 0.3)
                    .attr('y', y - this.axisYWidth * 0.15)
                    .attr('class', 'data-plan')
                    .text(plan.value.toFixed(2));
            }

            const formatDate = d3.timeFormat('%d.%m.%Y | %H:%M:%S');
            const value = plan || fact || null;
            if (value) {
                g.append('text')
                    .attr('text-anchor', 'middle')
                    .attr('x', x)
                    .attr('y', y - this.axisYWidth * 0.6)
                    .attr('class', 'data-date')
                    .text(formatDate(currentDatetime));
            }

            let start = this.padding.top - this.topMargin;
            const step = 10;
            const cardWidth = this.axisYWidth * 2;
            const cardHeight = this.axisYWidth * 0.5;

            values.forEach((val) => {
                const rect = g.append('g').attr('class', 'val');
                const bg = rect
                    .append('g')
                    .attr('class', 'bg')
                    .style('opacity', 0.25);

                start += step + cardHeight;

                bg.append('rect')
                    .attr('x', x + step)
                    .attr('y', start)
                    .attr('width', cardWidth)
                    .attr('height', cardHeight)
                    .attr('rx', 5);
                bg.append('rect')
                    .attr('x', x + step * 1.5)
                    .attr('y', start + step * 0.5)
                    .attr('width', cardHeight - step)
                    .attr('height', cardHeight - step)
                    .attr('rx', 5)
                    .style('fill', val.color);

                rect.append('text')
                    .attr('x', x + step * 1.5 + cardHeight)
                    .attr('y', start + cardHeight - step * 0.9)
                    .text(`${val.val.value?.toFixed(2)} ${val.units}`);

                if (this.options.isIconsShowing) {
                    rect.append('image')
                        .attr(
                            'xlink:href',
                            `assets/icons/widgets/ASTUE-ONPZ/astue-onpz-conventional-fuel/` +
                            `${val.iconType}.svg`
                        )
                        .attr('x', x + step * 1.7)
                        .attr('y', start + step * 0.7)
                        .attr('width', cardHeight - step * 1.4)
                        .attr('height', cardHeight - step * 1.4);
                }
            });
        }
    }

    private setLeftPadding(): number {
        const filterGraphTypes: IMultiChartTypes[] = ['plan', 'fact', 'forecast'];
        const padding = this.charts.map((item) =>
            item.graphType).filter((x) => filterGraphTypes.includes(x))?.length ?? 0;
        const cf =  this.charts.length - (padding > 0 ? padding - 1 : 0);
        return this.padding.left + this.axisYWidth * cf;
    }
}
