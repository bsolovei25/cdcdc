import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    HostListener,
    OnChanges,
    Renderer2,
    OnDestroy, OnInit
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
import { Subscription } from 'rxjs';
import { IDatesInterval, WidgetService } from '../../../../../dashboard/services/widget.service';
import { dateFormatLocale } from '@shared/functions/universal-time-fromat.function';
import { findCursorPosition } from '@shared/functions/find-cursor-position.function';
import { log } from 'util';

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
    6: '#039de0'
};

@Component({
    selector: 'evj-astue-onpz-multi-chart',
    templateUrl: './astue-onpz-multi-chart.component.html',
    styleUrls: ['./astue-onpz-multi-chart.component.scss']
})
export class AstueOnpzMultiChartComponent implements OnInit, OnChanges, OnDestroy {
    private subscriptions: Subscription[] = [];

    @Input() private data: IMultiChartLine[] = [];
    @Input() private colors: Map<string, number>;
    @Input() private options: IMultiChartOptions;
    @Input() private scroll: { left: number, right: number } = { left: 0, right: 100 };

    @ViewChild('chart', { static: true }) private chart: ElementRef;

    private eventListenerFn: () => void = null;

    private svg: d3Selection;

    private graphMaxX: number = 0;
    private graphMaxY: number = 0;

    private charts: IMultiChartData[] = [];

    public scaleFuncs: { x: d3.scaleTime; y: d3.scaleLinear } = { x: null, y: null };
    private axis: { axisX: d3.axisBottom; axisY: d3Selection } = { axisX: null, axisY: null };

    private readonly MAX_COEF: number = 0.3;
    private readonly MIN_COEF: number = 0.3;

    private coefs: { [key: string]: { min: number; max: number } } = {};
    private axisLabels: { [key: string]: number[] } = {};

    public readonly padding: { left: number; right: number; top: number; bottom: number } = {
        left: 0,
        right: 1,
        top: 120,
        bottom: 40
    };

    private readonly axisYWidth: number = 60;
    private readonly topMargin: number = 25;

    private listeners: (() => void)[] = [];

    get currentDates(): IDatesInterval {
        return this.widgetService.currentDates$.getValue();
    }

    constructor(private renderer: Renderer2, private widgetService: WidgetService) {
    }

    private tempFunction(): void {
        // TODO: change scale function -> transform data -> draw chart ->
        // this.svg
        //     .select('axisX')
        //     .attr('transform', translate)
        //     .attr('class', axis)
        //     .call(this.axis[axis])
        //     .selectAll('text')
        //     .attr('class', 'label');
    }

    // TODO think about it
    public ngOnInit(): void {
        this.subscriptions.push(
            this.widgetService.currentDates$.subscribe((ref) => !!ref)
        );
    }

    public ngOnChanges(): void {
        console.log(this.data);
        if (!!this.data.length) {
            this.startDrawChart();
        } else {
            this.destroySvg();
        }
    }

    public ngOnDestroy(): void {
        this.listeners.forEach((listener) => listener());
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (!!this.data.length) {
            this.startDrawChart();
        } else {
            this.destroySvg();
        }
    }

    @HostListener('mouseenter') onMouseEnter(): void {
        this.svg = d3Selection.select(this.chart.nativeElement).select('svg');
        if (this.svg._groups[0][0]) {
            this.drawMouseGroup();
        }
    }

    @HostListener('mouseleave') onMouseLeave(): void {
        if (this.eventListenerFn) {
            this.svg?.select('g.mouse-over')?.remove();
            this.eventListenerFn();
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

    // TODO add period check ++
    private normalizeData(): void {
        if (!!this.currentDates) {
            // TODO do some
            console.log('historical');
        } else {
            console.log('realtime');
            this.data = this.data.filter((item) => item.graph?.length > 0);
            const currentDatetime = new Date();
            currentDatetime.setMinutes(0, 0, 0);
            const domainDates = [
                currentDatetime.getTime() - 16 * 1000 * 60 * 60,
                currentDatetime.getTime() + 4 * 1000 * 60 * 60
            ];
            this.data.forEach((item) =>
                item.graph = fillDataArrayChart(item.graph, domainDates[0], domainDates[1],
                    item.graphType === 'plan'));
        }

        const filterData = this.data.filter((x) => x?.graph?.length > 0);
        if (filterData.length !== this.data.length) {
            console.error('BACK ERROR: Timeline is not in interval!!!');
        }
        this.data = filterData;
    }

    private findMinMax(): void {
        this.charts = [];
        this.data.forEach((graph) => {
            const key: string = graph.graphType === 'fact'
            || graph.graphType === 'plan'
            || graph.graphType === 'forecast'
            || graph.graphType === 'higherBorder'
            || graph.graphType === 'lowerBorder' ? 'main' : graph.graphType;
            if (!this.coefs[key]) {
                this.coefs[key] = {
                    min: this.MIN_COEF,
                    max: this.MAX_COEF
                };
            }
            this.charts.push({ ...(graph as IMultiChartData) });
            const currentChart = this.charts[this.charts.length - 1];
            const max = d3.max(graph.graph, (item: IChartMini) => item.value);
            const min = d3.min(graph.graph, (item: IChartMini) => item.value);
            currentChart.maxValue = max + (max - min) * this.coefs[key].max;
            currentChart.minValue = min - (max - min) * this.coefs[key].min;
        });
        const mainChartGroup = ['fact', 'plan', 'forecast', 'higherBorder', 'lowerBorder'];
        const filterChartArray = this.charts.filter((x) =>
            mainChartGroup.includes(x.graphType));
        const domainMain = [d3.max(filterChartArray.map((x) => x.maxValue)),
            d3.min(filterChartArray.map((x) => x.minValue))];
        filterChartArray.forEach((x) => {
            x.minValue = domainMain[1];
            x.maxValue = domainMain[0];
        });
    }

    private defineAxis(): void {
        let min: number = Infinity;
        let max: number = -Infinity;

        this.charts.forEach((chart) => {
            if (chart.graphType !== 'fact'
                && chart.graphType !== 'plan'
                && chart.graphType !== 'forecast'
                && chart.graphType !== 'higherBorder'
                && chart.graphType !== 'lowerBorder'
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
        const left = this.leftPadding;

        // TODO add historical domain dates region ++
        const rangeX = [left, this.graphMaxX - this.padding.right];
        let domainDates: Date[] = [];
        if (!!this.currentDates) {
            // for historical data set dt interval
            domainDates = [this.currentDates.fromDateTime, this.currentDates.toDateTime];
        } else {
            // for realtime data set dt interval [-16, +4]
            const currentDatetime = new Date();
            currentDatetime.setMinutes(0, 0, 0);
            domainDates = [
                new Date(currentDatetime.getTime() - 16 * 1000 * 60 * 60),
                new Date(currentDatetime.getTime() + 4 * 1000 * 60 * 60)
            ];
        }

        // TODO: scroll
        const deltaDomainDates = domainDates[1].getTime() - domainDates[0].getTime();
        domainDates = [
            new Date(domainDates[0].getTime() + this.scroll.left / 100 * deltaDomainDates),
            new Date(domainDates[1].getTime() - this.scroll.right / 100 * deltaDomainDates)
        ];

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
            this.scaleFuncs.y = d3
                .scaleLinear()
                .domain(domain)
                .range(rangeY);
        });

        // TODO delete time format for historical ++
        if (!!this.currentDates) {
            this.axis.axisX = d3.axisBottom(this.scaleFuncs.x)
                .ticks(24)
                .tickFormat(dateFormatLocale())
                .tickSizeOuter(0);
        } else {
            this.axis.axisX = d3.axisBottom(this.scaleFuncs.x)
                .ticks(24)
                .tickFormat(d3.timeFormat('%H'))
                .tickSizeOuter(0);
        }
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

            const flag = chart.graphType !== 'plan'
                && chart.graphType !== 'fact'
                && chart.graphType !== 'forecast'
                && chart.graphType !== 'higherBorder'
                && chart.graphType !== 'lowerBorder';
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

        const left = this.leftPadding;

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
        this.svg.selectAll('g.axisX g.tick')._groups[0].forEach((g, idx) => {
            if (idx % 2) {
                g.remove();
            }
        });
    }

    private drawAxisYLabels(): void {
        let left = this.leftPadding;
        let counter = 0;
        let isMainAxisDrawn = false;
        let isMainLabelsDrawn: boolean = false;

        const SCALE_STEP: number = 0.05;

        this.charts.forEach((chart) => {
            const flag = chart.graphType === 'fact'
                || chart.graphType === 'plan'
                || chart.graphType === 'forecast'
                || chart.graphType === 'higherBorder'
                || chart.graphType === 'lowerBorder';
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
            if (isMainLabelsDrawn && (
                chart.graphType === 'plan'
                || chart.graphType === 'fact'
                || chart.graphType === 'forecast'
                || chart.graphType === 'higherBorder'
                || chart.graphType === 'lowerBorder')
            ) {
                return;
            }
            const currentKey: string =
                chart.graphType === 'plan'
                || chart.graphType === 'fact'
                || chart.graphType === 'forecast'
                || chart.graphType === 'higherBorder'
                || chart.graphType === 'lowerBorder'
                    ? 'main' : chart.graphType;
            isMainLabelsDrawn = chart.graphType === 'plan'
                || chart.graphType === 'fact'
                || chart.graphType === 'forecast'
                || chart.graphType === 'higherBorder'
                || chart.graphType === 'lowerBorder';
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
                chart.graphType === 'fact'
                || chart.graphType === 'plan'
                || chart.graphType === 'forecast'
                || chart.graphType === 'higherBorder'
                || chart.graphType === 'lowerBorder' ? 'main' : chart.graphType;
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

    // TODO clear on currentDates
    private drawFutureRect(): void {
        this.drawMouseGroup();
    }

    private get leftPadding(): number {
        const filterGraphTypes: IMultiChartTypes[] = ['plan', 'fact', 'forecast', 'higherBorder', 'lowerBorder'];
        const padding = this.charts.map((item) =>
            item.graphType).filter((x) => filterGraphTypes.includes(x))?.length ?? 0;
        const cf = this.charts.length - (padding > 0 ? padding - 1 : 0);
        return this.padding.left + this.axisYWidth * cf;
    }


    private drawMouseGroup(): void {
        const height = this.graphMaxY - this.padding.top + (this.padding.top / 2) - this.padding.bottom;
        const width = this.graphMaxX - this.padding.left - this.padding.right;
        const x = this.padding.left;
        const y = this.padding.top / 2;

        // группа событий мыши
        const mouseG = this.svg
            .append('g')
            .attr('class', 'mouse-over')
            .attr('transform', `translate(${x}, ${y})`)
            .attr('opacity', 0)
            .style('color', 'white');

        // линия курсора
        mouseG
            .append('line')
            .attr('class', 'mouse-line')
            .attr('y1', 0)
            .attr('x1', 0)
            .attr('y2', height)
            .attr('x2', 0)
            .style('stroke', 'currentColor')
            .style('stroke-width', '1px');

        // точка курсора на линии плановых значений
        mouseG
            .append('circle')
            .attr('class', 'mouse-per-line')
            .attr('r', '4')
            .style('fill', 'currentColor')
            .style('stroke-width', '1px');

        // функция отвечающая за отрисовку вверхнего блока
        // this.drawMouseInfoGroup();
        this.newDrawMouseInfoGroup();

        // область для прослушивания событий мыши
        const [[mouseListenArea]] = mouseG
            .append('svg:rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            ._groups;

        this.eventListenerFn = this.listenMouseEvents(mouseListenArea);
    }


    private newDrawMouseInfoGroup(): void {
        const g = this.svg
            .select('g.mouse-over')
            .append('g')
            .attr('class', 'mouse-info');
        // Прямоугольник вверху
        g.append('rect')
            .attr('x', 0)
            .attr('y', -27)
            .attr('width', 157)
            .attr('height', 31)
            .attr('rx', 5)
            .attr('class', 'big-rect');
        // Прямоугольник вверху над большим
        g.append('rect')
            .attr('x', 0)
            .attr('y', -23)
            .attr('width', 26)
            .attr('height', 23)
            .attr('rx', 5)
            .attr('class', 'small-rect');
        // Линия
        g.append('line')
            .attr('x1', 0)
            .attr('y1', 5)
            .attr('x2', 26)
            .attr('y2', 5)
            .attr('class', 'future-line future-line_hor');
        // иконка на вверхнем блоке
        g.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/ASTUE-ONPZ/astue-onpz-conventional-fuel/poly.svg'
            )
            .attr('x', 0)
            .attr('y', -20)
            .attr('width', 20)
            .attr('height', 18)
            .attr('class', 'icon-rect');
        // иконка на вверхнем блоке
        g.append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/ASTUE-ONPZ/astue-onpz-conventional-fuel/poly.svg'
            )
            .attr('x', 0)
            .attr('y', -18)
            .attr('width', 20)
            .attr('height', 14)
            .attr('class', 'small-icon-rect');

        // Значение Факта на вверхнем блоке
        g.append('text')
            .attr('text-anchor', 'end')
            .attr('x', 0)
            .attr('y', -7)
            .attr('class', 'data-fact');

        // Значение Плана на вверхнем блоке
        g.append('text')
            .attr('text-anchor', 'start')
            .attr('x', 0)
            .attr('y', -7)
            .attr('class', 'data-plan');

        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', -31)
            .attr('class', 'data-date mouse-graph-date');


        const values = [];
        let plan: IChartMini;
        let fact: IChartMini;
        const currentDatetime: Date = new Date();
        currentDatetime.setMinutes(0, 0, 0);
        this.charts.forEach((chart) => {
            const filterChart = chart.graph
                .filter((item) => item.timeStamp.getTime() <= currentDatetime.getTime());
            const statValue = filterChart?.length > 0
                ? filterChart[filterChart.length - 1]
                : chart?.graph[0] ?? null;
            if (chart.graphType === 'plan') {
                plan = chart.graph[chart.graph.length - 1];
            } else if (chart.graphType === 'fact') {
                fact = chart.graph[chart.graph.length - 1];
            } else if (chart.graphType === 'higherBorder') {
                fact = chart.graph[chart.graph.length - 1];
            } else if (chart.graphType === 'lowerBorder') {
                fact = chart.graph[chart.graph.length - 1];
            } else if (chart.graphType === 'forecast') {
                // TODO add some
            } else {
                values.push({
                    val: statValue,
                    color: lineColors[this.colors?.get(chart.tagName)],
                    units: chart.units ?? '',
                    iconType: chart.graphType ?? 'volume'
                });
            }
        });
        // Иконки и значения возле линии
        let start = this.padding.top - this.topMargin;
        const step = 10;
        const cardWidth = this.axisYWidth * 2.5;
        const cardHeight = this.axisYWidth * 0.5;

        values.forEach((val, idx) => {
            const rect = g
                .append('g')
                .attr('class', 'val');
            const bg = rect
                .append('g')
                .attr('class', 'bg bg-rect')
                .style('opacity', 0.25);
            start += step + cardHeight;

            bg.append('rect')
                .attr('x', 0)
                .attr('y', start)
                .attr('width', cardWidth)
                .attr('height', cardHeight)
                .attr('rx', 5)
                .attr('class', `rect-val-1-${idx}`);
            bg.append('rect')
                .attr('x', 0)
                .attr('y', start + step * 0.5)
                .attr('width', cardHeight - step)
                .attr('height', cardHeight - step)
                .attr('rx', 5)
                .attr('class', `rect-val-2-${idx}`)
                .style('fill', val.color);

            bg.append('text')
                .attr('x', 0)
                .attr('y', start + cardHeight - step * 0.9)
                .attr('class', `rect-val-text-${idx}`)
                .text(`${val.val.value?.toFixed(2)} ${val.units}`);

            if (this.options.isIconsShowing) {
                rect.append('image')
                    .attr(
                        'xlink:href',
                        `assets/icons/widgets/ASTUE-ONPZ/astue-onpz-conventional-fuel/` +
                        `${val.iconType}.svg`
                    )
                    .attr('x', 0)
                    .attr('y', start + step * 0.7)
                    .attr('width', cardHeight - step * 1.4)
                    .attr('class', `rect-val-icon-${idx}`)
                    .attr('height', cardHeight - step * 1.4);
            }
        });

    }

    private drawMouseInfoGroup(): void {
        const infoG = this.svg
            .select('g.mouse-over')
            .append('g')
            .attr('class', 'mouse-info');

        // отрисовка левой части плашки
        infoG
            .append('line')
            .attr('class', 'line-left-horizontal')
            .attr('x1', 0)
            .attr('y1', -8)
            .attr('x2', 0)
            .attr('y2', -8)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-left-horizontal')
            .attr('x1', 0)
            .attr('y1', 15)
            .attr('x2', 0)
            .attr('y2', 15)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-left-vertical')
            .attr('x1', 0)
            .attr('y1', -6)
            .attr('x2', 0)
            .attr('y2', 13)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-left-incline')
            .attr('x1', 0)
            .attr('y1', 15)
            .attr('x2', 0)
            .attr('y2', 13)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-left-incline')
            .attr('x1', 0)
            .attr('y1', -8)
            .attr('x2', 0)
            .attr('y2', -6)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        // отрисовка правой части плашки
        infoG
            .append('line')
            .attr('class', 'line-right-horizontal')
            .attr('x1', 0)
            .attr('y1', -8)
            .attr('x2', 0)
            .attr('y2', -8)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-right-horizontal')
            .attr('x1', 0)
            .attr('y1', 15)
            .attr('x2', 0)
            .attr('y2', 15)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-right-vertical')
            .attr('x1', 0)
            .attr('y1', -6)
            .attr('x2', 0)
            .attr('y2', 13)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-right-incline')
            .attr('x1', 0)
            .attr('y1', 15)
            .attr('x2', 0)
            .attr('y2', 13)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-right-incline')
            .attr('x1', 0)
            .attr('y1', -8)
            .attr('x2', 0)
            .attr('y2', -6)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        // значение на кривой факт
        infoG
            .append('text')
            .attr('text-anchor', 'end')
            .attr('class', 'mouse-graph-value')
            .attr('x', 0)
            .attr('y', 8)
            .style('font-size', '13')
            .style('fill', 'white');

        // отклонение от плана
        infoG
            .append('text')
            .attr('text-anchor', 'start')
            .attr('class', 'mouse-graph-deviation')
            .attr('x', 0)
            .attr('y', 8)
            .style('font-size', '13')
            .style('fill', 'currentColor');

        // текущая дата
        infoG
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('class', 'mouse-graph-date')
            .attr('x', 0)
            .attr('y', -14)
            .style('font-size', '11')
            .style('fill', 'white');
    }

    private listenMouseEvents(element: HTMLElement): () => void {
        const eventListeners: (() => void)[] = [];

        eventListeners.push(
            this.renderer.listen(element, 'mousemove', (event: MouseEvent) => {
                const rect: DOMRect = element.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const posFact = findCursorPosition(x, 'fact', this.svg, this.padding);
                const posPlan = findCursorPosition(x, 'plan', this.svg, this.padding);
                // if (!posFact) {
                //     this.svg.select('.mouse-over').style('opacity', 0);
                //     return;
                // }
                this.svg.select('.mouse-over').style('opacity', 1);
                const factY = this.scaleFuncs?.y?.invert(posFact?.y);
                const factX = this.scaleFuncs?.x?.invert(posFact?.x);
                const planX = this.scaleFuncs?.x?.invert(posPlan?.x);
                const planY = posPlan ? this.scaleFuncs?.y?.invert(posPlan?.y) : null;
                this.svg
                    .select('.mouse-line')
                    .attr('x1', x)
                    .attr('x2', x);

                this.svg.selectAll('.mouse-line-circle').attr('cx', x);

                this.svg
                    .select('.mouse-per-line')
                    .attr('cx', x)
                    .attr('cy', posFact?.y - this.padding.top + (this.padding.top / 2));

                const infoFramePaddings = {
                    near: 20,
                    nearText: 15,
                    longerAngle: 58,
                    longer: 60
                };
                const infoBLockPaddings = {
                    bigRect: 80,
                    smallRect: 13
                };
                const formatDate = d3.timeFormat('%d.%m.%Y | %H:%M:%S');
                this.svg
                    .select('g.mouse-info .mouse-graph-date')
                    .attr('x', x)
                    .text(formatDate(factX.toString() === 'Invalid Date' ? planX : factX));
                this.svg
                    .selectAll('g.mouse-info .data-date')
                    .attr('x', x);
                // Большой многоугольник
                this.svg
                    .selectAll('g.mouse-info .big-rect')
                    .attr('x', x - infoBLockPaddings.bigRect);
                // Маленький под иконками
                this.svg
                    .selectAll('g.mouse-info .small-rect')
                    .attr('x', x - infoBLockPaddings.smallRect);
                this.svg
                    .selectAll('g.mouse-info .future-line')
                    .attr('x1', x - 13)
                    .attr('x2', x + 13);
                this.svg
                    .selectAll('g.mouse-info .icon-rect')
                    .attr('x', x - 10);
                this.svg
                    .selectAll('g.mouse-info .small-icon-rect')
                    .attr('x', x - 14);

                const values = [];
                let plan: IChartMini;
                let fact: IChartMini;
                const currentDatetime: Date = factX.toString() !== 'Invalid Date' ? new Date(factX) : new Date(planX);
                currentDatetime.setMinutes(0, 0, 0);
                this.charts.forEach((chart) => {
                    const filterChart = chart.graph
                        .filter((item) => item.timeStamp.getTime() <= currentDatetime.getTime());
                    const statValue = filterChart?.length > 0
                        ? filterChart[filterChart.length - 1]
                        : chart?.graph[0] ?? null;
                    if (chart.graphType === 'plan') {
                        plan = chart.graph[chart.graph.length - 1];
                    } else if (chart.graphType === 'fact'
                        || chart.graphType === 'higherBorder'
                        || chart.graphType === 'lowerBorder') {
                        fact = chart.graph[chart.graph.length - 1];
                    } else if (chart.graphType === 'forecast') {
                        // TODO add some
                    } else {
                        values.push({
                            val: statValue,
                            color: lineColors[this.colors?.get(chart.tagName)],
                            units: chart.units ?? '',
                            iconType: chart.graphType ?? 'volume'
                        });
                    }
                });

                values.forEach((val, idx) => {
                    const step = 10;
                    this.svg
                        .selectAll(`g.mouse-info .val`)
                        .attr('x', x + step);
                    this.svg
                        .selectAll(`g.mouse-info .rect-val-1-${idx}`)
                        .attr('x', x + step);
                    this.svg
                        .selectAll(`g.mouse-info .rect-val-2-${idx}`)
                        .attr('x', x + step * 1.5);

                    const cardHeight = this.axisYWidth * 0.5;
                    this.svg
                        .selectAll(`g.mouse-info .rect-val-text-${idx}`)
                        .attr('x', x + step * 1.5 + cardHeight)
                        .text(`${val.val.value?.toFixed(2)} ${val.units}`);

                    if (this.options.isIconsShowing) {
                        this.svg
                            .selectAll(`g.mouse-info .rect-val-icon-${idx}`)
                            .attr('x', x + step * 1.7)
                            .text(`${val.val.value?.toFixed(2)} ${val.units}`);
                    }
                });

                this.svg
                    .selectAll('g.mouse-info .line-left-horizontal')
                    .attr('x1', x - infoFramePaddings.longerAngle)
                    .attr('x2', x - infoFramePaddings.near);

                this.svg
                    .select('g.mouse-info .mouse-graph-value')
                    .attr('x', x - infoFramePaddings.nearText)
                    .text(factY?.toFixed(0));

                if (planY && factY) {
                    console.log();
                    this.svg
                        .select('g.mouse-info .mouse-graph-deviation')
                        .attr('x', x + infoFramePaddings.nearText)
                        .text((factY - planY)?.toFixed(0));
                }
                if (factY) {
                    this.svg
                        .selectAll('g.mouse-info .data-fact')
                        .attr('x', x - 18)
                        .text(factY?.toFixed((2)));
                }
                this.svg
                    .selectAll('g.mouse-info .data-plan')
                    .attr('x', x + 23)
                    .text(planY?.toFixed((2)));

                this.svg.select('g.mouse-over').style('color', 'white');
            })
        );

        return () => eventListeners.forEach((item) => item());
    }

}
