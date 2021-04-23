import { Component, ViewChild, ElementRef, OnChanges, HostListener, Input, OnInit } from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { IProductionTrend, ProductionTrendType } from '../../../dashboard/models/LCO/production-trends.model';
import { IChartD3, IChartMini, IPointTank } from '../../interfaces/smart-scroll.model';
import { ChartStyleType, ChartStyle, IChartStyle } from '../../interfaces/line-chart-style.model';
import { IDatesInterval } from '../../../dashboard/services/widget.service';
import { setLimits } from '../../functions/set-limits.function';
import { dateFormatLocale } from '@shared/functions/universal-time-fromat.function';

@Component({
    selector: 'evj-line-chart-shared',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnChanges, OnInit {
    @Input() public data: IProductionTrend[] = [];
    @Input() public points: IPointTank[] = [];
    @Input() private limits: IDatesInterval = null;
    @Input() public isShowingLegend: boolean = false;
    @Input() public chartType: 'production-trend' | 'reasons-deviations' | 'oil-operations' | 'astue-efficiency' =
        'production-trend';

    @Input()
    private scroll: { left: number; right: number } = { left: 0, right: 0 };

    @ViewChild('chart') private chart: ElementRef;

    private DELTA_CF: number = 0.1;

    private readonly chartStroke: { [key: string]: string } = {
        plan: 'var(--index-fact-color)',
        fact: 'var(--index-plan-color)',
    };

    private svg: any = null;

    private chartData: {
        graphType: ProductionTrendType;
        graphStyle: ChartStyleType;
        graph: IChartD3[];
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
        setTimeout(() => this.graphInit(), 0);
    }

    public ngOnInit(): void {
        dateFormatLocale();
    }

    private graphInit(): void {
        if (!this.data?.length) {
            this.svg?.remove();
            return;
        }
        this.findMinMax();
        this.initGraph();
        this.transformData();
        this.drawGraph();
        this.drawMask();
        this.drawAxis();
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.graphInit();
    }

    private initGraph(): void {
        if (this.svg) {
            this.svg.remove();
        }

        this.svg = d3Selection.select(this.chart.nativeElement).append('svg');

        this.graphMaxX = +d3Selection.select(this.chart.nativeElement).style('width').slice(0, -2);
        this.graphMaxY = +d3Selection.select(this.chart.nativeElement).style('height').slice(0, -2);

        this.svg
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${this.graphMaxX} ${this.graphMaxY > 5 ? this.graphMaxY - 5 : 0}`);
    }

    private findMinMax(): void {
        if (this.limits) {
            this.data.forEach((graph) => (graph.graph = setLimits(graph.graph, this.limits)));
        }

        [this.dataMin, this.dataMax] = d3.extent(this.data.flatMap((x) => x.graph).map((x) => x.value));
        this.dataMin -= (this.dataMax - this.dataMin) * this.DELTA_CF;
        this.dataMax += (this.dataMax - this.dataMin) * this.DELTA_CF;
    }

    private transformData(): void {
        this.chartData = [];
        this.data.forEach((item) => this.transformOneChartData(item));
    }

    private transformOneChartData(chart: IProductionTrend): void {
        let domainDates;
        if (!this.limits) {
            domainDates = d3.extent(chart.graph, (item: IChartMini) => item.timeStamp);
        } else {
            domainDates = [this.limits.fromDateTime, this.limits.toDateTime];
            const deltaDomainDates = domainDates[1]?.getTime() - domainDates[0]?.getTime();
            domainDates = [
                new Date(domainDates[0]?.getTime() + (this.scroll.left / 100) * deltaDomainDates),
                new Date(domainDates[1]?.getTime() - (this.scroll.right / 100) * deltaDomainDates),
            ];
        }
        const rangeX = [this.padding.left, this.graphMaxX - this.padding.right];
        this.scaleFuncs.x = d3.scaleTime().domain(domainDates).rangeRound(rangeX);

        const domainValues = [this.dataMax, this.dataMin];
        const rangeY = [this.padding.top, this.graphMaxY - this.padding.bottom];
        this.scaleFuncs.y = d3.scaleLinear().domain(domainValues).range(rangeY);

        this.axis.axisX = d3.axisBottom(this.scaleFuncs.x).ticks(7).tickFormat(dateFormatLocale()).tickSizeOuter(0);
        this.axis.axisY = d3.axisLeft(this.scaleFuncs.y).ticks(10).tickSize(0);

        const chartData: {
            graphType: ProductionTrendType;
            graphStyle: ChartStyleType;
            graph: IChartD3[];
        } = {
            graphType: chart.graphType,
            graphStyle: chart.graphStyle,
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

    private drawGraph(): void {
        const chartStyle = new ChartStyle();
        this.chartData.forEach((chart) => {
            const line = d3
                .line()
                .x((item: IChartD3) => item.x)
                .y((item: IChartD3) => item.y);

            const graphStyle: IChartStyle = chartStyle[chart.graphStyle];

            const lineWidth: number = graphStyle.lineWidth;
            const lineColor: string = graphStyle.lineColor;

            this.svg
                .append('path')
                .attr('class', `graph-line-${chart.graphType}`)
                .attr('d', line(chart.graph))
                .style('fill', 'none')
                .style('stroke', lineColor)
                .style('stroke-width', lineWidth)
                .style('stroke-dasharray', chartStyle.drawLineType(graphStyle));
        });
    }

    private drawMask(): void {
        const mask = this.svg
            .append('mask')
            .attr('width', this.graphMaxX)
            .attr('height', this.graphMaxY)
            .attr('id', 'border-mask');

        mask.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', this.graphMaxX)
            .attr('height', this.graphMaxY)
            .style('fill', 'white')
            .style('opacity', 1);

        mask.append('rect')
            .attr('x', this.padding.left)
            .attr('y', this.padding.top)
            .attr('width', this.graphMaxX - this.padding.right - this.padding.left)
            .attr('height', this.graphMaxY - this.padding.bottom - this.padding.top)
            .style('fill', 'black');

        this.svg
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', this.graphMaxX)
            .attr('height', this.graphMaxY)
            .attr('mask', 'url(#border-mask)')
            .attr('class', this.chartType === 'astue-efficiency' ? 'longer-rect' : 'longer-rect-default');
    }

    private drawLegend(): void {
        if (this.isShowingLegend) {
            const legendG = this.svg.append('g').attr('class', 'graph-legend');
            legendG
                .append('text')
                .text('Фактическое')
                .attr('text-anchor', 'start')
                .attr('x', 70)
                .attr('y', 45)
                .style('font-size', '12px')
                .style('fill', this.chartStroke.fact);
            legendG
                .append('text')
                .text('Плановое')
                .attr('text-anchor', 'end')
                .attr('x', this.graphMaxX - this.padding.left)
                .attr('y', 45)
                .style('font-size', '12px')
                .style('fill', this.chartStroke.plan);
        }
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
            .style('fill', 'var(--text-main-color)');

        this.svg.select('g.axis path').remove();

        // отрисовка оси х
        this.svg
            .append('g')
            .attr('transform', `translate(0,${this.graphMaxY - this.padding.bottom})`)
            .attr('class', 'axis')
            .call(this.axis.axisX)
            .selectAll('text')
            .style('font-size', '12px')
            .style('fill', 'var(--text-main-color)');

        // изменение цветов осей
        let g = this.svg.selectAll('g.axis');
        g.style('color', 'var(--border-icon-color)');

        // отрисовка центра начала координат
        g = this.svg.select('g.axis:last-of-type').style('color', 'var(--index-plan-color)');
        const linesG = g.append('g').attr('opacity', 1).attr('class', 'longer-line');

        linesG
            .append('line')
            .attr('x1', this.padding.left * 0.25)
            .attr('y1', 0)
            .attr('x2', this.padding.left)
            .attr('y2', 0)
            .style('stroke', 'currentColor');

        linesG
            .append('line')
            .attr('x1', this.graphMaxX - this.padding.right)
            .attr('y1', 0)
            .attr('x2', this.graphMaxX - this.padding.right * 0.25)
            .attr('y2', 0)
            .style('stroke', 'currentColor');

        // изменение засечек с линий на круги
        this.svg.select('g.axis:last-of-type').selectAll('.tick line').remove();
        this.svg
            .select('g.axis:last-of-type')
            .selectAll('.tick')
            .append('circle')
            .attr('r', 3)
            .style('fill', 'var(--index-plan-color)');

        this.drawAxisArrows('xAxis');

        this.drawGridLines();
        this.drawLegend();
    }

    // отрисовка стрелок на осях
    private drawAxisArrows(axis: 'xAxis' | 'yAxis'): void {
        const arrowMax: number = 10;
        const arrowMin: number = 3;

        let typeOfAxis: string = 'last-of-type';
        let translate: string = `${this.graphMaxX - this.padding.right * 0.25 - arrowMax},0`;
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
            .style('stroke', 'var(--text-main-color)');
    }
}
