import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    HostListener,
    OnChanges,
    Renderer2,
    OnDestroy
} from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { IChartD3, IChartMini } from '../../../../../@shared/models/smart-scroll.model';
import {
    IMultiChartLine,
    IMultiChartData
} from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import { AsyncRender } from '../../../../../@shared/functions/async-render.function';
import { IAstueOnpzColors } from '../../../astue-onpz-shared/astue-onpz.service';

const lineColors: { [key: string]: string } = {
    1: '#9362d0',
    2: '#0ba4a4',
    3: '#8090f0',
    4: '#0f62fe',
    5: '#0089ff',
    6: '#039de0'
};

@Component({
    selector: 'evj-astue-onpz-multi-chart',
    templateUrl: './astue-onpz-multi-chart.component.html',
    styleUrls: ['./astue-onpz-multi-chart.component.scss']
})
export class AstueOnpzMultiChartComponent implements OnChanges, OnDestroy {
    @Input() private data: IMultiChartLine[] = [];
    @Input() private colors: Map<string, number>;

    @ViewChild('chart', { static: true }) private chart: ElementRef;

    private svg;

    private graphMaxX: number = 0;
    private graphMaxY: number = 0;
    private dataMax: number = 0;
    private dataMin: number = 0;

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
        bottom: 40
    };

    private readonly axisYWidth: number = 60;
    private readonly topMargin: number = 25;

    private listeners: (() => void)[] = [];

    constructor(private renderer: Renderer2) {
    }

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
        this.data.forEach((item) => {
            // обнуление значений милисекунд, секунд и минут
            item.graph?.forEach((val) => {
                val.timeStamp.setMilliseconds(0);
                val.timeStamp.setSeconds(0);
                val.timeStamp.setMinutes(0);
            });
            // вычисление дат начала и конца
            const end = item.graph[item.graph.length - 1].timeStamp;
            const start = new Date(end);
            start.setHours(end.getHours() - 18);
            // фильтрация по дате начала
            item.graph = item.graph?.filter((val) => val.timeStamp.getTime() >= start.getTime());
            // зачистка повторяющихся дат
            const filteredArray: IChartMini[] = [];
            item.graph?.forEach((val, idx, array) => {
                const filtered = array.filter(
                    (el) => el.timeStamp.getTime() === val.timeStamp.getTime()
                );
                val.value = filtered.reduce((acc, elem) => acc + elem.value, 0) / filtered.length;
                if (
                    !filteredArray.length ||
                    filteredArray[filteredArray.length - 1].timeStamp.getTime() !==
                    val.timeStamp.getTime()
                ) {
                    filteredArray.push({ value: val.value, timeStamp: val.timeStamp });
                }
            });
            item.graph = filteredArray;
            // заполнение пропусков в массиве
            const arr = item.graph;
            for (let idx = 0; idx < arr.length; idx++) {
                const el = arr[idx];
                if (!!idx) {
                    const lastEl = arr[idx - 1];
                    let a =
                        (el.timeStamp.getTime() - lastEl.timeStamp.getTime()) / (1000 * 60 * 60);
                    if (a !== 1) {
                        const array: IChartMini[] = [];
                        const step = (el.value - lastEl.value) / a;
                        const timestamp = lastEl.timeStamp;
                        let hours = timestamp.getHours() + 1;
                        let val = lastEl.value;
                        while (a > 1) {
                            val += step;
                            const date = new Date(timestamp);
                            date.setHours(hours);
                            const newEl: IChartMini = {
                                value: val,
                                timeStamp: date
                            };
                            array.push(newEl);
                            hours++;
                            a--;
                        }
                        arr.splice(idx, 0, ...array);
                    }
                }
            }
        });
    }

    private findMinMax(): void {
        this.charts = [];

        this.data.forEach((graph) => {
            const key: string =
                graph.graphType === 'fact' || graph.graphType === 'plan' ? 'main' : graph.graphType;
            if (!this.coefs[key]) {
                this.coefs[key] = {
                    min: this.MIN_COEF,
                    max: this.MAX_COEF
                };
            }

            this.charts.push({ ...(graph as IMultiChartData) });
            const currentChart = this.charts[this.charts.length - 1];
            currentChart.maxValue = Math.round(
                d3.max(graph.graph, (item: IChartMini) => item.value) * (1 + this.coefs[key].max)
            );
            currentChart.minValue = Math.round(
                d3.min(graph.graph, (item: IChartMini) => item.value) * (1 - this.coefs[key].min)
            );
        });

        const plan = this.charts.find((item) => item.graphType === 'plan');
        const fact = this.charts.find((item) => item.graphType === 'fact');
        if (!!plan && !!fact) {
            const [min, max] = d3.extent([
                plan.minValue,
                plan.maxValue,
                fact.minValue,
                fact.maxValue
            ]);
            plan.minValue = fact.minValue = min;
            plan.maxValue = fact.maxValue = max;
        }
    }

    private defineAxis(): void {
        let min: number = Infinity;
        let max: number = -Infinity;

        this.charts.forEach((chart) => {
            if (chart.graphType !== 'fact' && chart.graphType !== 'plan') {
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
        const step: number = Math.round((max - min) / countOfSteps);
        for (let i = 1; i < 10; i++) {
            min += step;
            arr.push(min);
        }
        return arr;
    }

    private defineScale(): void {
        const left = this.setLeftPadding();
        const chart = this.data.find((graph) => !!graph.graph.length).graph;

        const year = chart[0].timeStamp.getFullYear();
        const month = chart[0].timeStamp.getMonth();
        const day = chart[0].timeStamp.getDate();
        const hour = chart[0].timeStamp.getHours();
        const domainDates = [
            new Date(year, month, day, hour),
            new Date(year, month, day, hour + 24)
        ];
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
                    y: item.scaleY(point.value)
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
            const flag = chart.graphType === 'fact' || chart.graphType === 'plan';
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
            if (isMainLabelsDrawn && (chart.graphType === 'plan' || chart.graphType === 'fact')) {
                return;
            }
            const currentKey: string =
                chart.graphType === 'plan' || chart.graphType === 'fact' ? 'main' : chart.graphType;
            isMainLabelsDrawn = chart.graphType === 'plan' || chart.graphType === 'fact';
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
                chart.graphType === 'fact' || chart.graphType === 'plan' ? 'main' : chart.graphType;
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
        let x: number;
        this.charts.forEach((chart) => {
            if (chart.graphType === 'plan') {
                plan = chart.graph[chart.graph.length - 1];
            } else if (chart.graphType === 'fact') {
                fact = chart.graph[chart.graph.length - 1];
            } else {
                values.push({
                    val: chart.graph[chart.graph.length - 1],
                    color: lineColors[this.colors?.get(chart.tagName)],
                    units: chart.units ?? '',
                    iconType: chart.graphType
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
            const value = !!plan ? plan : !!fact ? fact : undefined;

            if (value) {
                g.append('text')
                    .attr('text-anchor', 'middle')
                    .attr('x', x)
                    .attr('y', y - this.axisYWidth * 0.6)
                    .attr('class', 'data-date')
                    .text(formatDate(value.timeStamp));
            }

            let start = this.padding.top - this.topMargin;
            const step = 10;
            const cardWidth = this.axisYWidth * 2;
            const cardHeigh = this.axisYWidth * 0.5;

            values.forEach((val) => {
                const rect = g.append('g').attr('class', 'val');
                const bg = rect
                    .append('g')
                    .attr('class', 'bg')
                    .style('opacity', 0.25);

                start += step + cardHeigh;

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
                    .text(`${val.val.value.toFixed(2)} ${val.units}`);
                rect.append('image')
                    .attr(
                        'xlink:href',
                        `assets/icons/widgets/ASTUE-ONPZ/astue-onpz-conventional-fuel/${val.iconType}.svg`
                    )
                    .attr('x', x + step * 1.7)
                    .attr('y', start + step * 0.7)
                    .attr('width', cardHeigh - step * 1.4)
                    .attr('height', cardHeigh - step * 1.4);
            });
        }
    }

    private setLeftPadding(): number {
        const plan = this.charts.find((item) => item.graphType === 'plan');
        const fact = this.charts.find((item) => item.graphType === 'fact');
        const coef = !!plan && !!fact ? this.charts.length - 1 : this.charts.length;
        return this.padding.left + this.axisYWidth * coef;
    }
}
