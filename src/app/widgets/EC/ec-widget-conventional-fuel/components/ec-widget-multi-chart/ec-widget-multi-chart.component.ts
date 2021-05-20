import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    HostListener,
    OnChanges,
    Renderer2,
    OnDestroy,
    OnInit,
} from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { IChartD3, IChartMini } from '@shared/interfaces/smart-scroll.model';
import {
    IMultiChartLine,
    IMultiChartData,
    IMultiChartTypes,
} from '../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import { AsyncRender } from '@shared/functions/async-render.function';
import { fillDataArrayChart } from '@shared/functions/fill-data-array.function';
import { Subscription } from 'rxjs';
import { IDatesInterval, WidgetService } from '../../../../../dashboard/services/widget.service';
import { dateFormatLocale } from '@shared/functions/universal-time-fromat.function';
import { findCursorPosition } from '@shared/functions/find-cursor-position.function';
import { EcWidgetService } from '../../../ec-widget-shared/ec-widget.service';
import { EcWidgetConventionalFuelService } from '../../ec-widget-conventional-fuel.service';
export interface IMultiChartOptions {
    colors?: Map<string, number>;
    isIconsShowing?: boolean;
}

const lineColors: { [key: string]: string } = {
    1: 'var(--data-c5-color)',
    2: 'var(--index-plan-color)',
    3: 'var(--index-blue1-color)',
    4: 'var(--data-c3-color)',
    5: 'var(--data-c7-color)',
    6: 'var(--data-c1-color)',
};

@Component({
    selector: 'evj-ec-widget-multi-chart',
    templateUrl: './ec-widget-multi-chart.component.html',
    styleUrls: ['./ec-widget-multi-chart.component.scss'],
})
export class EcWidgetMultiChartComponent implements OnInit, OnChanges, OnDestroy {
    private subscriptions: Subscription[] = [];

    @Input() private data: IMultiChartLine[] = [];
    @Input() private colors: Map<string, number>;
    @Input() private options: IMultiChartOptions;
    @Input() private scroll: { left: number; right: number } = { left: 0, right: 100 };

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
    private readonly timeOffsetLeft: number = 24;
    private readonly timeOffsetRight: number = 72;

    private coefs: { [key: string]: { min: number; max: number } } = {};
    private axisLabels: { [key: string]: number[] } = {};

    public readonly padding: { left: number; right: number; top: number; bottom: number } = {
        left: 0,
        right: 1,
        top: 55,
        bottom: 40,
    };

    private readonly axisYWidth: number = 60;
    private readonly topMargin: number = 0;

    positionMouse: number = null;

    private listeners: (() => void)[] = [];

    get currentDates(): IDatesInterval {
        return this.widgetService.currentDates$.getValue();
    }

    constructor(
        private renderer: Renderer2,
        private widgetService: WidgetService,
        private astueOnpzService: EcWidgetService,
        private astueOnpzConventionalFuelService: EcWidgetConventionalFuelService
    ) {}

    // TODO think about it
    public ngOnInit(): void {
        this.subscriptions.push(this.widgetService.currentDates$.subscribe((ref) => !!ref));
    }

    public ngOnChanges(): void {
        if (!!this.data.length) {
            this.colors?.set('avt-10-fuel-consumption-PlanValue', 2);
            this.startDrawChart();
        } else {
            this.destroySvg();
        }
    }

    public ngOnDestroy(): void {
        this.listeners.forEach((listener) => listener());
        this.subscriptions.forEach((x) => x.unsubscribe());
        if (this.eventListenerFn) {
            this.eventListenerFn();
        }
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (!!this.data.length) {
            this.startDrawChart();
        } else {
            this.destroySvg();
        }
    }

    onMouseLeave(): void {
        if (this.eventListenerFn) {
            this.positionMouse = null;
            this.changePositionPicker();
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
        this.drawAreas();
        this.drawAxisXLabels();
        this.drawAxisYLabels();
        this.drawFutureRect();
        this.changePositionPicker(this.positionMouse);
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

        this.graphMaxX = +d3Selection.select(this.chart.nativeElement).style('width').slice(0, -2);
        this.graphMaxY = +d3Selection.select(this.chart.nativeElement).style('height').slice(0, -2);

        this.svg
            .attr('width', '100%')
            .attr('height', '100%')
            .attr(
                'viewBox',
                `0 0 ${this.graphMaxX > 0 ? this.graphMaxX : 0} ${this.graphMaxY > 5 ? this.graphMaxY - 5 : 0}`
            );
    }

    // TODO add period check ++
    private normalizeData(): void {
        if (!!this.currentDates) {
            // TODO do some
        } else {
            this.data = this.data.filter((item) => item.graph?.length > 0);
            const currentDatetime = new Date();
            currentDatetime.setMinutes(0, 0, 0);
            const domainDates = [
                currentDatetime.getTime() - this.timeOffsetLeft * 1000 * 60 * 60,
                currentDatetime.getTime() + this.timeOffsetRight * 1000 * 60 * 60,
            ];
            this.data.forEach(
                (item) =>
                    (item.graph = fillDataArrayChart(
                        item.graph,
                        domainDates[0],
                        domainDates[1],
                        item.graphType === 'plan'
                    ))
            );
            const factChart = this.data?.find((x) => x.graphType === 'fact')?.graph;
            if (!!factChart?.length) {
                this.data.find((x) => x.graphType === 'fact').graph = factChart.filter(
                    (x) => x.timeStamp.getTime() < new Date().getTime()
                );
            }
        }
        const filterData = this.data.filter((x) => x?.graph?.length > 0);
        if (filterData.length !== this.data.length) {
            console.error('BACK ERROR: Timeline is not in interval!!!');
        }
        this.data = filterData;

        const fact = this.data.find((x) => x.graphType === 'fact')?.graph;
        if (!fact) {
            return;
        }

        if (this.astueOnpzService.multilineChartTransfer.getValue()?.type === 'deviation') {
            this.data.push({
                graphType: 'border',
                graph: [
                    {
                        value: 0,
                        timeStamp: fact[0].timeStamp,
                    },
                    {
                        value: 0,
                        timeStamp: fact[fact.length - 1].timeStamp,
                    },
                ],
                tagName: 'border',
            });
        }
    }

    private findMinMax(): void {
        this.charts = [];
        this.data.forEach((graph) => {
            const key: string =
                graph.graphType === 'fact' ||
                graph.graphType === 'plan' ||
                graph.graphType === 'forecast' ||
                graph.graphType === 'factModel' ||
                graph.graphType === 'border' ||
                graph.graphType === 'higherBorder' ||
                graph.graphType === 'lowerBorder'
                    ? 'main'
                    : graph.graphType;
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
        const mainChartGroup = ['fact', 'plan', 'forecast', 'factModel', 'border', 'higherBorder', 'lowerBorder'];
        const filterChartArray = this.charts.filter((x) => mainChartGroup.includes(x.graphType));
        const domainMain = [
            d3.max(filterChartArray.map((x) => x.maxValue)),
            d3.min(filterChartArray.map((x) => x.minValue)),
        ];
        filterChartArray.forEach((x) => {
            x.minValue = domainMain[1];
            x.maxValue = domainMain[0];
        });
    }

    private defineAxis(): void {
        let min: number = Infinity;
        let max: number = -Infinity;

        this.charts.forEach((chart) => {
            if (
                chart.graphType !== 'fact' &&
                chart.graphType !== 'plan' &&
                chart.graphType !== 'forecast' &&
                chart.graphType !== 'factModel' &&
                chart.graphType !== 'border' &&
                chart.graphType !== 'higherBorder' &&
                chart.graphType !== 'lowerBorder'
            ) {
                this.axisLabels[chart.graphType] = this.defineAxisYLabels(chart.minValue, chart.maxValue);
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
        this.astueOnpzConventionalFuelService.paddingLegend$.next(this.leftPadding);

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
                new Date(currentDatetime.getTime() - this.timeOffsetLeft * 1000 * 60 * 60),
                new Date(currentDatetime.getTime() + this.timeOffsetRight * 1000 * 60 * 60),
            ];
        }

        // TODO: scroll
        const deltaDomainDates = domainDates[1].getTime() - domainDates[0].getTime();
        domainDates = [
            new Date(domainDates[0].getTime() + (this.scroll.left / 100) * deltaDomainDates),
            new Date(domainDates[1].getTime() - (this.scroll.right / 100) * deltaDomainDates),
        ];

        this.scaleFuncs.x = d3.scaleTime().domain(domainDates).rangeRound(rangeX);

        const rangeY = [this.padding.top, this.graphMaxY - this.padding.bottom];
        this.charts.forEach((item) => {
            const domain = [item.maxValue, item.minValue];
            item.scaleY = d3.scaleLinear().domain(domain).range(rangeY);
            item.axisY = d3.axisLeft(item.scaleY).ticks(5).tickSize(0);
            this.scaleFuncs.y = d3.scaleLinear().domain(domain).range(rangeY);
        });

        // TODO delete time format for historical ++
        if (!!this.currentDates) {
            this.axis.axisX = d3
                .axisBottom(this.scaleFuncs.x)
                .ticks(24)
                .tickFormat(dateFormatLocale())
                .tickSizeOuter(0);
        } else {
            this.axis.axisX = d3
                .axisBottom(this.scaleFuncs.x)
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

            const flag =
                chart.graphType !== 'plan' &&
                chart.graphType !== 'fact' &&
                chart.graphType !== 'forecast' &&
                chart.graphType !== 'factModel' &&
                chart.graphType !== 'border' &&
                chart.graphType !== 'higherBorder' &&
                chart.graphType !== 'lowerBorder';
            const lineType = flag ? 'other' : chart.graphType;
            const drawnLine = this.svg
                .append('path')
                .attr('class', `graph-line-${lineType}`)
                .attr('d', line(chart.transformedGraph));
            if (flag) {
                drawnLine.style('stroke', lineColors[this.colors?.get(chart.tagName)]);
            }
            if (
                chart?.transformedGraph &&
                (chart.graphType === 'higherBorder' ||
                    chart.graphType === 'lowerBorder' ||
                    chart.graphType === 'border')
            ) {
                const areaBottom = d3
                    .area()
                    .x((item: IChartD3) => item.x)
                    .y0(this.graphMaxY - this.padding.bottom)
                    .y1((item: IChartD3) => item.y)
                    .curve(d3.curveLinear);
                const areaTop = d3
                    .area()
                    .x((item: IChartD3) => item.x)
                    .y0((item: IChartD3) => item.y)
                    .y1(this.padding.top - this.topMargin)
                    .curve(d3.curveLinear);
                const areaFn =
                    chart.graphType === 'border'
                        ? this.astueOnpzService.multilineChartTransfer.getValue()?.isEconomy
                            ? areaBottom
                            : areaTop
                        : chart.graphType === 'lowerBorder'
                        ? areaBottom
                        : areaTop;
                this.svg
                    .append('path')
                    .attr('class', `graph-area-${chart.graphType}`)
                    .attr('d', areaFn(chart.transformedGraph));
            }
        });
    }

    private drawAreas(): void {
        const transfer = this.astueOnpzService.multilineChartTransfer.getValue();
        if (!transfer) {
            return;
        }
        if (transfer.type === 'limit') {
            this.drawAreasLimit();
        } else {
            this.drawAreasDeviation();
        }
    }

    private drawAreasDeviation(): void {
        const deviationType = this.astueOnpzService.multilineChartTransfer.getValue().isEconomy ? 'normal' : 'warning';
        if (deviationType) {
            this.svg.select(`path.graph-area-border`)?.attr('class', `graph-area-border graph-area_${deviationType}`);
        }
    }

    private drawAreasLimit(): void {
        const fact = this.charts.find((item) => item.graphType === 'fact')?.graph ?? [];

        const getBorderValue = (type: 'higherBorder' | 'lowerBorder'): number => {
            try {
                return this.scaleFuncs.y?.invert(
                    findCursorPosition(
                        this.scaleFuncs.x(fact[fact.length - 1]?.timeStamp),
                        type,
                        this.svg,
                        this.padding
                    )?.y
                );
            } catch (e) {
                return null;
            }
        };

        const hbValue = getBorderValue('higherBorder');
        const lbValue = getBorderValue('lowerBorder');

        let deviationType: 'warning' | 'normal' = null;
        const eps = 0.00001;
        if (hbValue && fact[fact.length - 1].value - hbValue > eps) {
            deviationType = 'warning';
        } else if (lbValue && lbValue - fact[fact.length - 1].value > eps) {
            deviationType = 'normal';
        }

        if (deviationType) {
            const border = deviationType === 'warning' ? 'higher' : 'lower';
            this.svg
                .select(`path.graph-line-${border}Border`)
                ?.attr('class', `graph-line-${border}Border graph-line_${deviationType}`);
            this.svg
                .select(`path.graph-area-${border}Border`)
                ?.attr('class', `graph-area-${border}Border graph-area_${deviationType}`);
        }
    }

    private drawGridlines(): void {
        const grid = this.svg
            .append('g')
            .attr('class', 'grid')
            .attr('fill', 'var(--chart-axes-color)')
            .attr('transform', `translate(0,${this.graphMaxY - this.padding.bottom})`)
            .call(
                d3
                    .axisBottom(this.scaleFuncs.x)
                    .ticks(20)
                    .tickSize(-(this.graphMaxY - this.padding.bottom - this.padding.top + this.topMargin))
                    .tickFormat('')
            )
            .style('color', 'var(--border-vidget-color)');

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
        const lastG = this.svg.selectAll('g.axisX g.tick')._groups[0].length - 1;
        this.svg.selectAll('g.axisX g.tick')._groups[0].forEach((g, idx) => {
            if (idx % 2) {
                g.remove();
            }
            if (idx === 0) {
                const t = g.getElementsByTagName('text')[0];
                t.setAttribute('style', `transform: translate(${(1 / 2) * g.getBoundingClientRect().width + 5}px, 0);`);
            } else if (idx === lastG) {
                const t = g.getElementsByTagName('text')[0];
                t.setAttribute(
                    'style',
                    `transform: translate(-${(1 / 2) * g.getBoundingClientRect().width + 5}px, 0);`
                );
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
            const flag =
                chart.graphType === 'fact' ||
                chart.graphType === 'plan' ||
                chart.graphType === 'forecast' ||
                chart.graphType === 'factModel' ||
                chart.graphType === 'border' ||
                chart.graphType === 'higherBorder' ||
                chart.graphType === 'lowerBorder';
            if (flag && isMainAxisDrawn) {
                return;
            } else if (flag) {
                isMainAxisDrawn = true;
            }
            const translate: string = `translate(${left},0)`;
            left -= this.axisYWidth;
            const height: number = this.graphMaxY - this.padding.top - this.padding.bottom + this.topMargin;
            const axisY = this.svg.append('g').attr('transform', translate).attr('class', 'axisY');
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
            if (
                isMainLabelsDrawn &&
                (chart.graphType === 'plan' ||
                    chart.graphType === 'fact' ||
                    chart.graphType === 'forecast' ||
                    chart.graphType === 'factModel' ||
                    chart.graphType === 'border' ||
                    chart.graphType === 'higherBorder' ||
                    chart.graphType === 'lowerBorder')
            ) {
                return;
            }
            const currentKey: string =
                chart.graphType === 'plan' ||
                chart.graphType === 'fact' ||
                chart.graphType === 'forecast' ||
                chart.graphType === 'factModel' ||
                chart.graphType === 'border' ||
                chart.graphType === 'higherBorder' ||
                chart.graphType === 'lowerBorder'
                    ? 'main'
                    : chart.graphType;
            isMainLabelsDrawn =
                chart.graphType === 'plan' ||
                chart.graphType === 'fact' ||
                chart.graphType === 'forecast' ||
                chart.graphType === 'factModel' ||
                chart.graphType === 'border' ||
                chart.graphType === 'higherBorder' ||
                chart.graphType === 'lowerBorder';
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
            const stroke = flag ? 'var(--index-fact-color)' : lineColors[this.colors?.get(chart.tagName)];
            const padding = 5;
            const topMargin = 23;
            legend
                .append('line')
                .attr('class', 'legend-line')
                .attr('x1', -this.axisYWidth + 2 * padding)
                .attr('y1', this.padding.top - 2 * padding + 2 + topMargin)
                .attr('x2', -padding)
                .attr('y2', this.padding.top - 2 * padding + 2 + topMargin)
                .attr('stroke', stroke);

            if (flag) {
                legend
                    .append('line')
                    .attr('class', 'legend-line')
                    .attr('x1', -this.axisYWidth + 2 * padding)
                    .attr('y1', this.padding.top - 2 * padding + 2 + topMargin)
                    .attr('x2', -padding)
                    .attr('y2', this.padding.top - 2 * padding + 2 + topMargin)
                    .attr('stroke', 'var(--border-blue-color)')
                    .attr('stroke-dasharray', (this.axisYWidth - 3 * padding) / 2);
            }

            legend
                .append('text')
                .attr('class', 'label')
                .attr('text-anchor', 'end')
                .attr('x', -padding)
                .attr('y', this.padding.top - 3 * padding + topMargin)
                .text(chart.units);

            const buttons = axisY.append('g').attr('class', 'scale-buttons');
            const buttonMinus = buttons.append('g').attr('class', 'button');
            buttonMinus
                .append('circle')
                .attr('cx', -this.axisYWidth / 3)
                .attr('cy', (this.padding.top - this.topMargin) * 0.5)
                .attr('r', 6);
            buttonMinus
                .append('line')
                .attr('x1', -this.axisYWidth / 3 - 3)
                .attr('y1', (this.padding.top - this.topMargin) * 0.5)
                .attr('x2', -this.axisYWidth / 3 + 3)
                .attr('y2', (this.padding.top - this.topMargin) * 0.5);

            const buttonPlus = buttons.append('g').attr('class', 'button');
            buttonPlus
                .append('circle')
                .attr('cx', (-this.axisYWidth * 2) / 3)
                .attr('cy', (this.padding.top - this.topMargin) * 0.5)
                .attr('r', 6);
            buttonPlus
                .append('line')
                .attr('x1', (-this.axisYWidth * 2) / 3)
                .attr('y1', (this.padding.top - this.topMargin) * 0.5 - 3)
                .attr('x2', (-this.axisYWidth * 2) / 3)
                .attr('y2', (this.padding.top - this.topMargin) * 0.5 + 3);
            buttonPlus
                .append('line')
                .attr('x1', (-this.axisYWidth * 2) / 3 - 3)
                .attr('y1', (this.padding.top - this.topMargin) * 0.5)
                .attr('x2', (-this.axisYWidth * 2) / 3 + 3)
                .attr('y2', (this.padding.top - this.topMargin) * 0.5);

            const key: string =
                chart.graphType === 'fact' ||
                chart.graphType === 'plan' ||
                chart.graphType === 'forecast' ||
                chart.graphType === 'factModel' ||
                chart.graphType === 'border' ||
                chart.graphType === 'higherBorder' ||
                chart.graphType === 'lowerBorder'
                    ? 'main'
                    : chart.graphType;
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
        const filterGraphTypes: IMultiChartTypes[] = [
            'plan',
            'fact',
            'forecast',
            'factModel',
            'border',
            'higherBorder',
            'lowerBorder',
        ];
        const padding =
            this.charts.map((item) => item.graphType).filter((x) => filterGraphTypes.includes(x))?.length ?? 0;
        const cf = this.charts.length - (padding > 0 ? padding - 1 : 0);
        return this.padding.left + this.axisYWidth * cf;
    }

    private drawMouseGroup(): void {
        const height = this.graphMaxY - this.padding.top - this.padding.bottom;
        const width = this.graphMaxX - this.leftPadding - this.padding.right;
        const x = this.leftPadding;
        const y = this.padding.top;

        // группа событий мыши
        const mouseG = this.svg
            .append('g')
            .attr('class', 'mouse-over')
            .attr('transform', `translate(${x}, ${y})`)
            .attr('opacity', 0)
            .style('color', 'var(--text-accent-color)');

        // линия курсора
        const mouseLine = mouseG
            .append('line')
            .attr('class', 'mouse-line')
            .attr('y1', 0)
            .attr('x1', 0)
            .attr('y2', height)
            .attr('x2', 0)
            .style('stroke', 'currentColor')
            .style('stroke-width', '1px');

        mouseG
            .append('text')
            .attr('class', 'label-mouse')
            .attr('text-anchor', 'start')
            .attr('x', 0)
            .attr('y', height - 20)
            .text('');

        // TODO check work
        this.newDrawMouseInfoGroup();

        // область для прослушивания событий мыши
        const [[mouseListenArea]] = mouseG
            .append('svg:rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')._groups;

        if (this.eventListenerFn) {
            this.eventListenerFn();
        }
        this.eventListenerFn = this.listenMouseEvents(mouseListenArea);
    }

    private newDrawMouseInfoGroup(): void {
        const values = [];
        let plan: number;
        let fact: number;
        let factModel: number;
        let units: string = null;
        const currentDatetime: Date = new Date();
        currentDatetime.setMinutes(0, 0, 0);
        this.charts.forEach((chart) => {
            const filterChart = chart.graph.filter((item) => item.timeStamp.getTime() <= currentDatetime.getTime());
            const statValue = filterChart?.length > 0 ? filterChart[filterChart.length - 1] : chart?.graph[0] ?? null;
            if (chart.graphType === 'plan') {
                units = units ? units : chart.units;
                plan = statValue.value;
            } else if (chart.graphType === 'fact') {
                units = units ? units : chart.units;
                fact = statValue.value;
            } else if (chart.graphType === 'factModel') {
                units = units ? units : chart.units;
                factModel = statValue.value;
            } else if (chart.graphType === 'higherBorder') {
            } else if (chart.graphType === 'lowerBorder') {
            } else if (chart.graphType === 'forecast' || chart.graphType === 'border') {
                // TODO add some
            } else {
                values.push({
                    val: statValue.value,
                    color: lineColors[this.colors?.get(chart.tagName)],
                    units: chart.units ?? '',
                    iconType: chart.graphType ?? 'volume',
                });
            }
        });
        this.astueOnpzConventionalFuelService.predictorsInfo$.next({
            fact,
            plan,
            factModel,
            predictors: [...values],
            units,
        });
    }

    private listenMouseEvents(element: HTMLElement): () => void {
        const eventListeners: (() => void)[] = [];
        eventListeners.push(
            this.renderer.listen(element, 'mouseleave', () => this.onMouseLeave()),
            this.renderer.listen(element, 'mousemove', (event: MouseEvent) => {
                let x: number = 0;
                const rect: DOMRect = element.getBoundingClientRect();
                x = event.clientX - rect.left;
                this.positionMouse = x;
                this.changePositionPicker(x);
            })
        );
        return () => eventListeners?.forEach((item) => item());
    }

    changePositionPicker(x?: number): void {
        if (!x) {
            if (this.currentDates) {
                return;
            }
            const currentDatetime: Date = new Date();
            x = this.scaleFuncs.x(currentDatetime) - this.leftPadding;
        }
        const padding = { ...this.padding, left: this.leftPadding };
        let posFact = null;
        let posPlan = null;
        try {
            posFact = findCursorPosition(x, 'fact', this.svg, padding);
            posPlan = findCursorPosition(x, 'plan', this.svg, padding);
        } catch (e) {
            // console.warn(e);
        }
        // if (!posFact || !posPlan) {
        //     return;
        // }

        this.svg.select('.mouse-over').style('opacity', 1);
        let factY = this.scaleFuncs?.y?.invert(posFact?.y);
        let factX = this.scaleFuncs?.x?.invert(posFact?.x);
        const planX = this.scaleFuncs?.x?.invert(posPlan?.x);
        const planY = posPlan ? this.scaleFuncs?.y?.invert(posPlan?.y) : null;

        factY = factY ? factY : null;

        this.svg.select('.mouse-line').attr('x1', x).attr('x2', x);

        if (factX.toString() === 'Invalid Date' && planX.toString() === 'Invalid Date') {
            factX = new Date();
        }

        const formatDate = d3.timeFormat('%H:%M');
        this.svg
            .select('.label-mouse')
            .attr('x', x + 7)
            .text(formatDate(factX.toString() === 'Invalid Date' ? planX : factX));

        const values = [];
        let units: string = null;
        let plan: number = null;
        let fact: number = null;
        let factModel: number = null;
        const date: Date = factX.toString() !== 'Invalid Date' ? new Date(factX) : new Date(planX);
        date.setMinutes(0, 0, 0);
        this.charts.forEach((chart) => {
            const filterChart = chart.graph.filter((item) => item.timeStamp.getTime() <= date.getTime());
            const xGragh = chart.transformedGraph[chart.transformedGraph.length - 1]?.x >= x;
            const statValue = filterChart?.length > 0 ? filterChart[filterChart.length - 1] : null;
            if (chart.graphType === 'plan') {
                units = units ? units : chart.units;
                plan = xGragh ? statValue?.value : 0;
            } else if (chart.graphType === 'fact') {
                units = units ? units : chart.units;
                fact = xGragh ? statValue?.value : 0;
            } else if (chart.graphType === 'factModel') {
                units = units ? units : chart.units;
                factModel = xGragh ? statValue?.value : 0;
            } else if (chart.graphType === 'forecast' || chart.graphType === 'border') {
                // TODO add some
            } else {
                values.push({
                    val: xGragh ? statValue?.value : 0,
                    color: lineColors[this.colors?.get(chart.tagName)],
                    units: chart.units ?? '',
                    iconType: chart.graphType ?? 'volume',
                });
            }
        });
        setTimeout(() =>
            this.astueOnpzConventionalFuelService.predictorsInfo$.next({
                fact,
                plan,
                factModel,
                predictors: [...values],
                units,
            })
        );
    }
}
