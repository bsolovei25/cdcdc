import { Component, Input, ViewChild, ElementRef, OnChanges, HostListener } from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import {
    IProductionTrend,
    ProductionTrendType,
} from '../../../../../dashboard/models/production-trends.model';
import { IChartD3 } from '@shared/models/smart-scroll.model';
import { AsyncRender } from '@shared/functions/async-render.function';
import { fillDataArray } from '@shared/functions/fill-data-array.function';
import { IDatesInterval, WidgetService } from '../../../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-limits-chart',
    templateUrl: './limits-chart.component.html',
    styleUrls: ['./limits-chart.component.scss'],
})
export class LimitsChartComponent implements OnChanges {
    @Input() private data: IProductionTrend[] = [];
    @Input() private isSpline: boolean = true;

    @ViewChild('chart', { static: true }) private chart: ElementRef;

    private chartData: {
        graphType: ProductionTrendType;
        graph: IChartD3[];
    }[] = [];

    private svg: d3Selection;

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

    private static DELTA_CF: number = 0.1;

    private readonly topMargin: number = 25;

    get currentDates(): IDatesInterval {
        return this.widgetService.currentDates$.getValue();
    }

    constructor(private widgetService: WidgetService) {}

    public ngOnChanges(): void {
        if (!!this.data.length) {
            this.getOxArea();
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

    // TODO delete fillDataArray ++
    private normalizeData(): void {
        if (this.currentDates) {
            // TODO add some mb
        } else {
            fillDataArray(this.data, true, true, this.dateMin.getTime(), this.dateMax.getTime());
        }
    }

    // TODO add dt interval historical ++
    private getOxArea(): void {
        if (this.currentDates) {
            [this.dateMin, this.dateMax] = d3.extent(this.data.flatMap((x) => x.graph).map((x) => x.timeStamp));
        } else {
            const isFilterData = this.data.find((item) => item.graphType === 'fact').graph
                .filter((x) => x.timeStamp.getTime() < new Date().getTime()).length > 0;
            let factChart = this.data.find((g) => g.graphType === 'fact').graph;
            if (isFilterData) {
                factChart = factChart.filter((x) => x.timeStamp.getTime() < new Date().getTime());
                this.data.find((g) => g.graphType === 'fact').graph = factChart;
            }
            const centerTimestamp = new Date(factChart[factChart.length - 1].timeStamp);
            centerTimestamp.setMinutes(0, 0, 0);
            const maxDate = centerTimestamp.getTime() + 1000 * 60 * 60 * 12;
            const minDate = centerTimestamp.getTime() - 1000 * 60 * 60 * 12;
            this.dateMax = new Date(maxDate);
            this.dateMin = new Date(minDate);
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

    private findMinMax(): void {
        [this.dataMin, this.dataMax] = d3.extent(this.data.flatMap((x) => x.graph).map((x) => x.value));
        this.dataMin -= (this.dataMax - this.dataMin) * LimitsChartComponent.DELTA_CF;
        this.dataMax += (this.dataMax - this.dataMin) * LimitsChartComponent.DELTA_CF;
    }

    private defineScale(): void {
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

        // TODO add time format
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

            this.svg
                .append('path')
                .attr('class', `graph-line-${chart.graphType}`)
                .attr('d', line(chart.graph));

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

        this.svg.selectAll('g.axisY g.tick')._groups[0].forEach((g, idx) => {
            if (idx % 2) {
                g.remove();
            }
        });
    }

    private customizeAreas(): void {
        const fact = this.data.find((item) => item.graphType === 'fact')?.graph ?? [];
        const higher = this.data.find((item) => item.graphType === 'higherBorder')?.graph ?? [];
        const lower = this.data.find((item) => item.graphType === 'lowerBorder')?.graph ?? [];
        fact.forEach((val, idx) => {
            if (higher[idx] && higher[idx].value < val.value) {
                this.svg
                    .select('path.graph-line-higherBorder')
                    .attr('class', 'graph-line-higherBorder graph-line_warning');
                this.svg
                    .select('path.graph-area-higherBorder')
                    .attr('class', 'graph-area-higherBorder graph-area_warning');
            } else if (lower[idx] && lower[idx].value > val.value) {
                this.svg
                    .select('path.graph-line-lowerBorder')
                    .attr('class', 'graph-line-lowerBorder graph-line_normal');
                this.svg
                    .select('path.graph-area-lowerBorder')
                    .attr('class', 'graph-area-lowerBorder graph-area_normal');
            }
        });
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
    }

    private dropChart(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = undefined;
        }
    }
}
