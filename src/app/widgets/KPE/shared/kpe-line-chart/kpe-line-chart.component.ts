import {
    Component,
    ViewChild,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    AfterViewInit,
} from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import {
    IProductionTrend,
    ProductionTrendType,
} from '../../../../dashboard/models/LCO/production-trends.model';
import { IChartMini, IChartD3 } from '@shared/models/smart-scroll.model';

@Component({
    selector: 'evj-kpe-line-chart',
    templateUrl: './kpe-line-chart.component.html',
    styleUrls: ['./kpe-line-chart.component.scss'],
})
export class KpeLineChartComponent implements OnChanges, AfterViewInit {
    @Input() private data: IProductionTrend[] = [];

    @ViewChild('chart', { static: true }) private chart: ElementRef;

    private chartData: {
        graphType: ProductionTrendType;
        graph: IChartD3[];
    }[] = [];

    private svg;
    private tempSvg;

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

    private lastPointColor: string = 'point point_fact';

    constructor() {}

    public ngAfterViewInit(): void {
        setTimeout(this.OnResize.bind(this), 100);
    }

    public ngOnChanges(): void {
        if (this.data && this.data.length) {
            this.startDrawChart();
        }
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (this.data && this.data.length) {
            this.startDrawChart();
        }
    }

    private startDrawChart(): void {
        this.initData();
        this.findMinMax();
        this.defineScale();
        this.transformData();
        this.drawChart(); // Сами графики
        this.drawFutureRect(); // боковая линия
        this.drawPoints(); // Рисует последние точки
        this.customizeAreas('lower');
        this.customizeAreas('higher');
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
            const curve = d3.curveMonotoneX;
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

            let className: string;
            const fact =
                this.chartData.find((factChart) => factChart.graphType === 'fact')?.graph ?? [];

            const lastPoint: IChartD3 = fact[fact.length - 1];

            if (chart.graphType === 'higherBorder' || chart.graphType === 'lowerBorder') {
                const areaFn = chart.graphType === 'lowerBorder' ? areaBottom : areaTop;

                if (
                    (areaFn === areaBottom &&
                        chart.graph.find((item) => item.x === lastPoint.x)?.y < lastPoint.y) ||
                    (areaFn === areaTop &&
                        chart.graph.find((item) => item.x === lastPoint.x)?.y >= lastPoint.y)
                ) {
                    className = 'graph-area-border graph-area_warning';
                    this.lastPointColor = 'graph-area_warning';
                } else {
                    className = 'graph-area-border';
                }

                this.svg
                    .append('path')
                    .attr('class', className)
                    .attr('d', areaFn(chart.graph));
            }
        });
    }

    private drawPoints(): void {
        const pointsG = this.svg.append('g').attr('class', 'chart-points');
        const fact = this.chartData.find((chart) => chart.graphType === 'fact')?.graph ?? [];
        const plan = this.chartData.find((chart) => chart.graphType === 'plan')?.graph ?? [];

        const x = fact[fact.length - 1].x;
        const y = plan.find((corrdinate) => corrdinate.x === x)?.y;
        pointsG
            .append('circle')
            .attr('class', 'point point_plan')
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', 2);

        const g = pointsG.append('g').attr('class', 'fact-point');
        let r = 8;
        let opacity = 0.05;
        for (let i = 0; i < 4; i++) {
            g.append('circle')
                .attr('class', this.lastPointColor)
                .attr('cx', x)
                .attr('cy', fact[fact.length - 1].y)
                .attr('r', r)
                .style('opacity', opacity);
            r = r / 2;
            opacity = opacity * 4;
        }
    }

    private colorizeDraw(colorizeCoordinates: IChartD3[]): void {
        const curve = d3.curveMonotoneX;
        const line = d3
            .line()
            .x((value: IChartD3) => value.x)
            .y((value: IChartD3) => value.y)
            .curve(curve);

        this.svg
            .append('path')
            .attr('d', line(colorizeCoordinates))
            .style('fill', 'none')
            .style('stroke-width', 2)
            .style('stroke', 'var(--color-astue-onpz-warning)');
    }

    private customizeAreas(borderType: string): void {
        // borderType это тип границы, чтобы узнать нижнюю рассматриваем или верхнюю
        let colorizeCoordinates: IChartD3[] = []; // Координаты кторые надо закрасить
        let coeff: number; // Принимает значения 1 или -1, это чтоб не переписывать неравенства
        let border: IChartD3[]; // Координаты границы

        const fact = this.chartData.find((chart) => chart.graphType === 'fact')?.graph ?? [];

        if (borderType === 'lower') {
            border = this.chartData.find((chart) => chart.graphType === 'lowerBorder')?.graph ?? [];
            coeff = 1;
        } else {
            border =
                this.chartData.find((chart) => chart.graphType === 'higherBorder')?.graph ?? [];
            coeff = -1;
        }

        fact.forEach((item, i) => {
            if (i > 0) {
                // Уравнение участка нижней границы
                const k1 = (border[i].y - border[i - 1].y) / (border[i].x - border[i - 1].x);
                const b1 = -k1 * border[i - 1].x + border[i - 1].y;
                // Уравнение участка фактической кривой
                const k2 = (item.y - fact[i - 1].y) / (item.x - fact[i - 1].x);
                const b2 = -k2 * fact[i - 1].x + fact[i - 1].y;
                // Точка пересечения границы с кривой факта
                const x = (b2 - b1) / (k1 - k2);
                if (!!x && x <= item.x && x >= fact[i - 1].x) {
                    if (coeff * k1 >= k2 * coeff) {
                        colorizeCoordinates.push(
                            {
                                x: fact[i - 1].x,
                                y: fact[i - 1].y,
                            },
                            {
                                x,
                                y: k2 * x + b2,
                            }
                        );
                    } else {
                        this.colorizeDraw(colorizeCoordinates);
                        colorizeCoordinates = [];

                        colorizeCoordinates.push(
                            {
                                x,
                                y: k2 * x + b2,
                            },
                            {
                                x: item.x,
                                y: item.y,
                            }
                        );
                    }
                } else if (coeff * item.y >= border[i].y * coeff) {
                    colorizeCoordinates.push(
                        {
                            x: fact[i - 1].x,
                            y: fact[i - 1].y,
                        },
                        {
                            x: item.x,
                            y: item.y,
                        }
                    );
                } else {
                    this.colorizeDraw(colorizeCoordinates);
                    colorizeCoordinates = [];
                }
            }
        });

        this.colorizeDraw(colorizeCoordinates);
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
