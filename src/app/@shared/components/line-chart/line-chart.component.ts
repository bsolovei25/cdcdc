import {
    Component,
    ViewChild,
    ElementRef,
    OnChanges,
    HostListener,
    Input,
    OnInit,
} from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import {
    IProductionTrend,
    ProductionTrendType,
} from '../../../dashboard/models/production-trends.model';
import { IChartD3, IChartMini } from '../../models/smart-scroll.model';

@Component({
    selector: 'evj-line-chart-shared',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnChanges, OnInit {
    @Input() private data: IProductionTrend[] = [];
    @Input() public graphType: 'productionTrend' | 'deviationReasons' = null;

    @ViewChild('chart', { static: true }) private chart: ElementRef;

    private readonly MAX_COEF: number = 0.1;
    private readonly MIN_COEF: number = 0.3;

    private readonly chartStroke: { [key: string]: string } = {
        plan: '#ffffff',
        fact: '#3fa9f5',
    };

    private svg = null;

    private chartData: {
        graphType: ProductionTrendType;
        graph: IChartD3[];
        isAdditional?: boolean;
    }[] = [];

    private axis: { axisX: any; axisY: any } = { axisX: null, axisY: null };

    public graphMaxX: number = null;
    public graphMaxY: number = null;

    private dataMax: number = null;
    private dataMin: number = null;

    public scaleFuncs: { x: any; y: any } = { x: null, y: null };

    public readonly padding: { [key: string]: number } = {
        top: 20,
        right: 65,
        bottom: 30,
        left: 65,
    };

    constructor() {}

    public ngOnChanges(): void {
        if (this.data.length) {
            this.findMinMax();
            this.initGraph();
            this.transformData();
            this.drawAxis();
            this.drawGraph();
        }
    }

    public ngOnInit(): void {
        this.dateFormatLocale();
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (this.svg) {
            this.initGraph();
            this.transformData();
            this.drawAxis();
            this.drawGraph();
        }
    }

    private initGraph(): void {
        if (this.svg) {
            this.svg.remove();
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

    private transformData(): void {
        this.chartData = [];
        this.data.forEach((item) => this.transformOneChartData(item));
    }

    private transformOneChartData(chart: IProductionTrend): void {
        const domainDates = d3.extent(chart.graph, (item: IChartMini) => item.timestamp);
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
            .ticks(7)
            .tickFormat(this.dateFormatLocale())
            .tickSizeOuter(0);
        this.axis.axisY = d3
            .axisLeft(this.scaleFuncs.y)
            .ticks(10)
            .tickSize(0);

        const chartData: { graphType: ProductionTrendType; graph: IChartD3[] } = {
            graphType: chart.graphType,
            graph: [],
        };

        chart.graph.forEach((item) => {
            chartData.graph.push({
                x: this.scaleFuncs.x(item.timestamp),
                y: this.scaleFuncs.y(item.value),
            });
        });

        this.chartData.push(chartData);

        this.transformDeviationData(chart, 'deviationUp');
        this.transformDeviationData(chart, 'deviationDown');
    }

    private transformDeviationData(
        chart: IProductionTrend,
        deviationType: 'deviationUp' | 'deviationDown'
    ): void {
        if (chart[deviationType]) {
            const chartData: {
                graphType: ProductionTrendType;
                graph: IChartD3[];
                isAdditional: true;
            } = {
                graphType: chart.graphType,
                graph: [],
                isAdditional: true,
            };
            const coef: 1 | -1 = deviationType === 'deviationUp' ? 1 : -1;
            chart.graph.forEach((item) => {
                chartData.graph.push({
                    x: this.scaleFuncs.x(item.timestamp),
                    y: this.scaleFuncs.y(item.value + coef * chart[deviationType]),
                });
            });

            this.chartData.push(chartData);
        }
    }

    private drawGraph(): void {
        this.chartData.forEach((chart) => {
            const line = d3
                .line()
                .x((item: IChartD3) => item.x)
                .y((item: IChartD3) => item.y);

            const lineWidth: number = chart.graphType === 'fact' ? 2 : 0.5;

            const path = this.svg
                .append('path')
                .attr('class', `graph-line-${chart.graphType}`)
                .attr('d', line(chart.graph))
                .style('fill', 'none')
                .style('stroke', this.chartStroke[chart.graphType])
                .style('stroke-width', lineWidth);

            if (chart.isAdditional) {
                path.style('stroke-dasharray', '2 5');
            }
        });
    }

    private drawAxis(): void {
        // отрисовка оси у
        this.svg
            .append('g')
            .attr('transform', `translate(${this.padding.left},0)`)
            .attr('class', 'axis')
            .call(this.axis.axisY)
            .selectAll('text')
            .style('font-size', '12px')
            .style('fill', '#8c99b2');

        // отрисовка оси х
        this.svg
            .append('g')
            .attr('transform', `translate(0,${this.graphMaxY - this.padding.bottom})`)
            .attr('class', 'axis')
            .call(this.axis.axisX)
            .selectAll('text')
            .style('font-size', '12px')
            .style('fill', '#8c99b2');

        // изменение цветов осей и удаление первых и последних засечек
        let g = this.svg.selectAll('g.axis');
        g.style('color', '#606580');
        g.selectAll('.tick:first-of-type').remove();
        g.selectAll('.tick:last-of-type').remove();

        // отрисовка центра начала координат
        g = this.svg.select('g.axis:last-of-type').style('color', '#3fa9f5');
        g.append('g')
            .attr('opacity', 1)
            .attr('transform', `translate(${this.padding.left},0)`)
            .attr('class', 'center-of-coords')
            .append('circle')
            .attr('r', 5)
            .style('fill', 'currentColor');
        g.select('.center-of-coords')
            .append('line')
            .attr('x1', `-${this.padding.left}`)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', 0)
            .style('stroke', 'currentColor');

        // изменение засечек с линий на круги
        this.svg
            .select('g.axis:last-of-type')
            .selectAll('.tick line')
            .remove();
        this.svg
            .select('g.axis:last-of-type')
            .selectAll('.tick')
            .append('circle')
            .attr('r', 3)
            .style('fill', '#3fa9f5');

        this.drawAxisArrows('xAxis');
        this.drawAxisArrows('yAxis');

        this.drawGridLines();
    }

    // отрисовка стрелок на осях
    private drawAxisArrows(axis: 'xAxis' | 'yAxis'): void {
        const arrowMax: number = 10;
        const arrowMin: number = 3;

        let typeOfAxis: string = 'last-of-type';
        let translate: string = `${this.graphMaxX - this.padding.right - arrowMax},0`;
        let points: string = `0,-${arrowMin} ${arrowMax},0 0,${arrowMin}`;

        if (axis === 'yAxis') {
            typeOfAxis = 'first-of-type';
            translate = `0,${this.padding.top}`;
            points = `-${arrowMin},0 0,-${arrowMax} ${arrowMin},0`;
        }

        this.svg
            .select(`g.axis:${typeOfAxis}`)
            .append('g')
            .attr('opacity', 1)
            .attr('transform', `translate(${translate})`)
            .append('polygon')
            .attr('points', `${points}`)
            .style('fill', 'currentColor');
    }

    // отрисовка сетки координат
    private drawGridLines(): void {
        this.svg.selectAll('g.axis:first-of-type g.tick:nth-child(2n+1)').remove();

        this.svg
            .selectAll('g.axis:first-of-type g.tick')
            .append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', this.graphMaxX - this.padding.right - this.padding.left)
            .attr('y2', 0)
            .style('opacity', '0.2')
            .style('stroke', '#8c99b2');
    }

    private dateFormatLocale(): (date: Date) => string {
        const locale = d3.timeFormatLocale({
            dateTime: '%A, %e %B %Y г. %X',
            date: '%d.%m.%Y',
            time: '%H:%M:%S',
            periods: ['', ''],
            days: [
                'воскресенье',
                'понедельник',
                'вторник',
                'среда',
                'четверг',
                'пятница',
                'суббота',
            ],
            shortDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
            ],
            shortMonths: [
                'Янв',
                'Фев',
                'Мар',
                'Апр',
                'Май',
                'Июн',
                'Июл',
                'Авг',
                'Сен',
                'Окт',
                'Ноя',
                'Дек',
            ],
        });

        const formatMillisecond = locale.format('.%L');
        const formatSecond = locale.format(':%S');
        const formatMinute = locale.format('%H:%M');
        const formatHour = locale.format('%H %p');
        const formatDay = locale.format('%d %b');
        const formatWeek = locale.format('%b %d ');
        const formatMonth = locale.format('%B');
        const formatYear = locale.format('%Y');

        return (date) =>
            (d3.timeSecond(date) < date
                ? formatMillisecond
                : d3.timeMinute(date) < date
                ? formatSecond
                : d3.timeHour(date) < date
                ? formatMinute
                : d3.timeDay(date) < date
                ? formatHour
                : d3.timeMonth(date) < date
                ? d3.timeWeek(date) < date
                    ? formatDay
                    : formatWeek
                : d3.timeYear(date) < date
                ? formatMonth
                : formatYear)(date);
    }
}
