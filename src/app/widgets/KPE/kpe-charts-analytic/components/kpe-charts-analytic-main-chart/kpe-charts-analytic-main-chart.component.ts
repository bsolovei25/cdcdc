import {
    Component,
    ElementRef,
    HostListener,
    Inject,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import * as d3 from 'd3';
import * as d3Selection from 'd3-selection';
import { AsyncRender } from '@shared/functions/async-render.function';
import { analyticChartData } from './kpe-charts-analytic-main-chart.mock';
import { KpeHelperService } from '../../../shared/kpe-helper.service';
import { dateFormatLocale } from '@shared/functions/universal-time-fromat.function';

export type LineType = 'fact' | 'plan';

export interface IDeviationDiagramData {
    day: number;
    planValue: number;
    factValue: number;
}
export interface IChartsAnalyticMainChart {
    graphType: string;
    graph: IChartsAnalyticMainGraph[];
}
export interface IChartsAnalyticMainGraph {
    time: Date;
    value: number;
}

@Component({
    selector: 'evj-kpe-charts-analytic-main-chart',
    templateUrl: './kpe-charts-analytic-main-chart.component.html',
    styleUrls: ['./kpe-charts-analytic-main-chart.component.scss'],
})
export class KpeChartsAnalyticMainChartComponent implements OnChanges {
    @Input()
    public data: IChartsAnalyticMainChart[] = analyticChartData;

    @Input()
    public currentMonth: Date = new Date();

    @Input()
    public bottomCalendarFull: boolean = false;

    @ViewChild('chart')
    private chart: ElementRef;

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (this.data && this.data.length && this.chart) {
            this.drawSvg();
        }
        this.initScale();
    }

    public factDataset: {
        x: Date;
        y: number;
    }[] = [];

    public planDataset: {
        x: Date;
        y: number;
    }[] = [];

    public lowerBorderDataset: {
        x: Date;
        y: number;
    }[] = [];

    public higherBorderDataset: {
        x: Date;
        y: number;
    }[] = [];

    public size: { width: number | null; height: number | null } = { width: null, height: null };

    public scales: { x: any; y: any } = { x: null, y: null };

    public sizeX: { min: Date | null; max: Date | null } = {
        min: new Date(1627776000000),
        max: new Date(1630368000000),
    };

    public sizeY: { min: number; max: number } = { min: 0, max: 0 };

    private readonly padding: { top: number; right: number; bottom: number; left: number } = {
        top: 10,
        right: 5,
        bottom: 20,
        left: 27,
    };

    private day: Date | null = new Date(1629849600000); // День с которого факт становится пунктирным
    private dayFact: {
        x: Date;
        y: number;
    } | null; // Координаты с которого факт становится пунктирным
    private dayFactBorder: {
        x: Date;
        y: number;
    } | null; // Координаты границы с которого факт становится пунктирным

    private svg: any = null;

    private readonly DELTA: number = 0.05;

    constructor(public kpeHelperService: KpeHelperService) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.data && this.data.length && this.chart) {
            this.drawSvg();
        }
    }

    private configChartArea(): void {}

    @AsyncRender
    private drawSvg(): void {
        this.prepareData();
        this.configChartArea();
        this.initScale();
        this.initSvg();
        this.drawAxises();
        this.drawGrid();
        this.drawRectLeft();
        this.drawDayThreshold();
        /*Отрисовка области границ*/
        this.drawBorder(this.lowerBorderDataset, 'lowerBorder');
        this.drawBorder(this.higherBorderDataset, 'higherBorder');
        /*Отрисовка самих границ пунктиром*/
        this.drawCurve(this.lowerBorderDataset, 'lowerBorder');
        this.drawCurve(this.higherBorderDataset, 'higherBorder');
        /*Отрисовка графиков факта и плана*/
        this.drawCurve(this.planDataset, 'plan-curve');
        this.drawCurve(this.factDataset, 'fact-curve');
        /*Поиск и отрисовка областей в которых факт выходит за пределы границы*/
        this.customizeAreas('lower');
        this.customizeAreas('higher');
    }

    private prepareData(): void {
        this.factDataset = [];
        this.planDataset = [];
        this.lowerBorderDataset = [];
        this.higherBorderDataset = [];

        this.data.forEach((item) => {
            switch (item.graphType) {
                case 'fact':
                    item.graph.forEach((coordinate) =>
                        this.factDataset.push({ x: coordinate.time, y: coordinate.value })
                    );
                    break;
                case 'plan':
                    item.graph.forEach((coordinate) =>
                        this.planDataset.push({ x: coordinate.time, y: coordinate.value })
                    );
                    break;
                case 'higherBorder':
                    item.graph.forEach((coordinate) =>
                        this.higherBorderDataset.push({ x: coordinate.time, y: coordinate.value })
                    );
                    break;
                case 'lowerBorder':
                    item.graph.forEach((coordinate) =>
                        this.lowerBorderDataset.push({ x: coordinate.time, y: coordinate.value })
                    );
                    break;
                default:
                    break;
            }
        });

        if (this.factDataset.length && this.planDataset.length) {
            [this.sizeY.min, this.sizeY.max] = d3.extent(
                [
                    ...this.lowerBorderDataset,
                    ...this.higherBorderDataset,
                    ...this.planDataset,
                    ...this.factDataset,
                ].map((item) => item.y)
            );
            this.sizeY.min -= (this.sizeY.max - this.sizeY.min) * this.DELTA;
            this.sizeY.max += (this.sizeY.max - this.sizeY.min) * this.DELTA;
        }
    }

    private drawRectLeft(): void {
        if (this.factDataset.length) {
            this.svg
                .append('rect')
                .attr('x', this.scales.x(this.day))
                .attr('y', this.scales.y(this.sizeY.max))
                .attr('width', this.scales.x(this.sizeX.max) - this.scales.x(this.day))
                .attr('height', this.scales.y(this.sizeY.min) - this.scales.y(this.sizeY.max) - 0.5)
                .attr('class', 'rect-left');
        }
    }

    private initScale(): void {
        this.size = {
            width: this.chart.nativeElement.clientWidth,
            height: this.chart.nativeElement.clientHeight,
        };

        this.scales.x = d3
            .scaleTime()
            .domain([this.sizeX.min, this.sizeX.max])
            .range([this.padding.left, this.size.width - this.padding.right]);
        this.scales.y = d3
            .scaleLinear()
            .domain([this.sizeY.min, this.sizeY.max])
            .range([this.size.height - this.padding.bottom, this.padding.top]);
    }

    private initSvg(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = undefined;
        }

        this.svg = d3.select(this.chart.nativeElement).append('svg');
        this.svg
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${this.size.width} ${this.size.height}`);
    }

    private drawAxises(): void {
        // x
        this.svg
            .append('g')
            .attr('transform', `translate(0, ${this.size.height - this.padding.bottom + 5})`) // 5 - дополнительный отступ
            .attr('class', 'x-axis')
            .call(
                d3
                    .axisBottom(this.scales.x)
                    .tickSize(0)
                    .ticks(8)
                    .tickFormat(dateFormatLocale())
            )
            .call((g) => g.select('.domain').remove());

        // y
        this.svg
            .append('g')
            .attr('transform', `translate(${this.padding.left}, 0)`)
            .attr('class', 'y-axis')
            .call(
                d3
                    .axisLeft(this.scales.y)
                    .tickSize(0)
                    .ticks(5)
            )
            .call((g) => g.select('.domain').remove());
    }

    private drawGrid(): void {
        this.svg
            .append('g')
            .attr('transform', `translate(0, ${this.size.height - this.padding.bottom})`)
            .call(
                d3
                    .axisBottom(this.scales.x)
                    .ticks(31)
                    .tickSize(1 - (this.size.height - this.padding.bottom - this.padding.top))
                    .tickFormat('')
            )
            .attr('class', 'grid');

        this.svg
            .append('g')
            .attr('transform', `translate(${this.padding.left}, 0)`)
            .call(
                d3
                    .axisLeft(this.scales.y)
                    .ticks(4)
                    .tickSize(1 - (this.size.width - this.padding.left - this.padding.right))
                    .tickFormat('')
            )
            .attr('class', 'grid');
    }

    private appendCircle(r: number, x: number, y: number, className: string): void {
        this.svg
            .append('circle')
            .attr('class', className)
            .attr('r', r)
            .attr('cx', this.scales.x(x))
            .attr('cy', this.scales.y(y));
    }

    private appendLine(x1: number, x2: number, y1: number, y2: number, className: string): void {
        this.svg
            .append('line')
            .attr('class', className)
            .attr('x1', this.scales.x(x1))
            .attr('x2', this.scales.x(x2))
            .attr('y1', this.scales.y(y1))
            .attr('y2', this.scales.y(y2));
    }

    private drawCurve(dataset: { x: Date; y: number }[], className: string): void {
        if (dataset.length > 0) {
            const line = d3
                .line()
                .x((d) => this.scales.x(d.x))
                .y((d) => this.scales.y(d.y))
                .curve(d3.curveLinear);

            if (className === 'fact-curve') {
                this.svg
                    .append('path')
                    .datum([this.dayFact, ...dataset.filter((item) => +item.x >= +this.day)])
                    .attr('class', className + '-dashed')
                    .attr('d', line);
                this.svg
                    .append('path')
                    .datum([...dataset.filter((item) => +item.x <= +this.day), this.dayFact])
                    .attr('class', className)
                    .attr('d', line);
            } else {
                this.svg
                    .append('path')
                    .datum(dataset)
                    .attr('class', className)
                    .attr('d', line);
            }
        }
    }

    private drawBorder(dataset: { x: Date; y: number }[], className: string): void {
        const graphMaxY: number = +d3Selection
            .select(this.chart.nativeElement)
            .style('height')
            .slice(0, -2);

        const areaBottom = d3
            .area()
            .x((d) => this.scales.x(d.x))
            .y1(graphMaxY - this.padding.bottom)
            .y0((d) => this.scales.y(d.y))
            .curve(d3.curveLinear);

        const areaTop = d3
            .area()
            .x((d) => this.scales.x(d.x))
            .y0((d) => this.scales.y(d.y))
            .y1(this.padding.top)
            .curve(d3.curveLinear);

        const areaFn =
            className === 'lowerBorder' || className === 'lowerColorize' ? areaBottom : areaTop;
        if (dataset.length > 0) {
            if (className.indexOf('Colorize') === -1) {
                const dayBorderIndex = dataset.findIndex((item) => +item.x > +this.day);
                if (dayBorderIndex !== 0 && dayBorderIndex !== dataset.length) {
                    const k =
                        (dataset[dayBorderIndex].y - dataset[dayBorderIndex - 1].y) /
                        (+dataset[dayBorderIndex].x - +this.factDataset[dayBorderIndex - 1].x);
                    this.dayFactBorder = {
                        x: this.day,
                        y:
                            k * +this.day +
                            dataset[dayBorderIndex].y -
                            k * +dataset[dayBorderIndex].x,
                    };
                } else {
                    this.dayFactBorder = {
                        x: this.day,
                        y: dataset[dayBorderIndex].y,
                    };
                }
                this.svg
                    .append('path')
                    .attr('class', className + '-area')
                    .attr(
                        'd',
                        areaFn([
                            ...dataset.filter((item) => +item.x <= +this.day),
                            this.dayFactBorder,
                        ])
                    );
            } else {
                this.svg
                    .append('path')
                    .attr('class', className + '-area')
                    .attr('d', areaFn(dataset));
            }
        }
    }

    private customizeAreas(borderType: string): void {
        // borderType это тип границы, чтобы узнать нижнюю рассматриваем или верхнюю
        let colorizeCoordinates: {
            x: Date;
            y: number;
        }[] = []; // Координаты кторые надо закрасить
        let coeff: number; // Принимает значения 1 или -1, это чтоб не переписывать неравенства
        let border: {
            x: Date;
            y: number;
        }[]; // Координаты границы
        let className: string;

        const fact = this.factDataset ?? [];

        if (borderType === 'lower') {
            border = this.lowerBorderDataset ?? [];
            coeff = -1;
            className = 'lowerColorize';
        } else {
            border = this.higherBorderDataset ?? [];
            coeff = 1;
            className = 'higherColorize';
        }

        fact.forEach((item, i) => {
            if (i > 0) {
                // Уравнение участка нижней границы
                const k1 = (+border[i].y - +border[i - 1].y) / (+border[i].x - +border[i - 1].x);
                const b1 = -k1 * +border[i - 1].x + +border[i - 1].y;
                // Уравнение участка фактической кривой
                const k2 = (item.y - fact[i - 1].y) / (+item.x - +fact[i - 1].x);
                const b2 = -k2 * +fact[i - 1].x + fact[i - 1].y;
                // Точка пересечения границы с кривой факта
                const x = (b2 - b1) / (k1 - k2);
                if (!!x && x <= +item.x && x >= +fact[i - 1].x) {
                    if (coeff * k1 >= k2 * coeff) {
                        colorizeCoordinates.push(
                            {
                                x: border[i - 1].x,
                                y: border[i - 1].y,
                            },
                            {
                                x: new Date(x),
                                y: k1 * x + b1,
                            }
                        );
                    } else {
                        this.drawBorder(colorizeCoordinates, className);
                        this.drawCurve(colorizeCoordinates, className);
                        colorizeCoordinates = [];

                        colorizeCoordinates.push(
                            {
                                x: new Date(x),
                                y: k1 * x + b1,
                            },
                            {
                                x: border[i].x,
                                y: border[i].y,
                            }
                        );
                    }
                } else if (coeff * item.y >= border[i].y * coeff) {
                    colorizeCoordinates.push(
                        {
                            x: border[i - 1].x,
                            y: border[i - 1].y,
                        },
                        {
                            x: border[i].x,
                            y: border[i].y,
                        }
                    );
                } else {
                    this.drawBorder(colorizeCoordinates, className);
                    this.drawCurve(colorizeCoordinates, className);
                    colorizeCoordinates = [];
                }
            }
        });

        this.drawBorder(colorizeCoordinates, className);
        this.drawCurve(colorizeCoordinates, className);
    }

    private drawDayThreshold(): void {
        const displayedMonth = new Date(this.currentMonth).getMonth();
        const currentMonth = new Date().getMonth();
        if (displayedMonth !== currentMonth) {
            return;
        }
        this.appendLine(+this.day, +this.day, this.sizeY.max, this.sizeY.min, 'day-threshold-line');

        const dayFactIndex = this.factDataset.findIndex((item) => item.x > this.day);
        if (dayFactIndex !== 0 && dayFactIndex !== this.factDataset.length) {
            const k =
                (this.factDataset[dayFactIndex].y - this.factDataset[dayFactIndex - 1].y) /
                (+this.factDataset[dayFactIndex].x - +this.factDataset[dayFactIndex - 1].x);
            this.dayFact = {
                x: this.day,
                y:
                    k * +this.day +
                    this.factDataset[dayFactIndex].y -
                    k * +this.factDataset[dayFactIndex].x,
            };
        } else {
            this.dayFact = {
                x: this.day,
                y: this.factDataset[dayFactIndex].y,
            };
        }

        this.appendCircle(16, +this.day, this.dayFact?.y, 'day-circle-1');
        this.appendCircle(8, +this.day, this.dayFact?.y, 'day-circle-2');
        this.appendCircle(4, +this.day, this.dayFact?.y, 'day-circle-3');
        this.appendCircle(2, +this.day, this.dayFact?.y, 'day-circle-4');

        const graphMaxY: number = +d3Selection
            .select(this.chart.nativeElement)
            .style('height')
            .slice(0, -2);

        this.svg
            .append('text')
            .attr('x', this.scales.x(this.day) + 30)
            .attr('y', graphMaxY - 40)
            .attr('text-anchor', 'middle')
            .attr('class', 'day-text')
            .text('14:02');
    }
}
