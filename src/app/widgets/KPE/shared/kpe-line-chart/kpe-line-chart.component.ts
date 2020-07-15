import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import {
    IProductionTrend,
    ProductionTrendType,
} from '../../../../dashboard/models/production-trends.model';
import { IChartMini, IChartD3 } from '../../../../@shared/models/smart-scroll.model';

@Component({
    selector: 'evj-kpe-line-chart',
    templateUrl: './kpe-line-chart.component.html',
    styleUrls: ['./kpe-line-chart.component.scss'],
})
export class KpeLineChartComponent implements OnInit, AfterViewInit {
    @ViewChild('chart') private chart: ElementRef;

    private data: IProductionTrend[] = [
        {
            graphType: 'plan',
            graph: [
                {
                    value: 10,
                    timeStamp: new Date(2020, 2, 1),
                },
                {
                    value: 50,
                    timeStamp: new Date(2020, 2, 2),
                },
                {
                    value: 35,
                    timeStamp: new Date(2020, 2, 3),
                },
                {
                    value: 13,
                    timeStamp: new Date(2020, 2, 4),
                },
                {
                    value: 67,
                    timeStamp: new Date(2020, 2, 5),
                },
                {
                    value: 10,
                    timeStamp: new Date(2020, 2, 6),
                },
                {
                    value: 56,
                    timeStamp: new Date(2020, 2, 7),
                },
                {
                    value: 45,
                    timeStamp: new Date(2020, 2, 8),
                },
                {
                    value: 53,
                    timeStamp: new Date(2020, 2, 9),
                },
                {
                    value: 34,
                    timeStamp: new Date(2020, 2, 10),
                },
                {
                    value: 76,
                    timeStamp: new Date(2020, 2, 11),
                },
                {
                    value: 45,
                    timeStamp: new Date(2020, 2, 12),
                },
                {
                    value: 34,
                    timeStamp: new Date(2020, 2, 13),
                },
                {
                    value: 65,
                    timeStamp: new Date(2020, 2, 14),
                },
                {
                    value: 34,
                    timeStamp: new Date(2020, 2, 15),
                },
                {
                    value: 42,
                    timeStamp: new Date(2020, 2, 16),
                },
                {
                    value: 57,
                    timeStamp: new Date(2020, 2, 17),
                },
                {
                    value: 46,
                    timeStamp: new Date(2020, 2, 18),
                },
                {
                    value: 72,
                    timeStamp: new Date(2020, 2, 19),
                },
                {
                    value: 17,
                    timeStamp: new Date(2020, 2, 20),
                },
                {
                    value: 36,
                    timeStamp: new Date(2020, 2, 21),
                },
                {
                    value: 28,
                    timeStamp: new Date(2020, 2, 22),
                },
                {
                    value: 43,
                    timeStamp: new Date(2020, 2, 23),
                },
                {
                    value: 52,
                    timeStamp: new Date(2020, 2, 24),
                },
                {
                    value: 63,
                    timeStamp: new Date(2020, 2, 25),
                },
                {
                    value: 33,
                    timeStamp: new Date(2020, 2, 26),
                },
                {
                    value: 15,
                    timeStamp: new Date(2020, 2, 27),
                },
                {
                    value: 25,
                    timeStamp: new Date(2020, 2, 28),
                },
                {
                    value: 20,
                    timeStamp: new Date(2020, 2, 29),
                },
                {
                    value: 40,
                    timeStamp: new Date(2020, 2, 30),
                },
                {
                    value: 35,
                    timeStamp: new Date(2020, 2, 31),
                },
            ],
        },
        {
            graphType: 'fact',
            graph: [
                {
                    value: 32,
                    timeStamp: new Date(2020, 2, 1),
                },
                {
                    value: 45,
                    timeStamp: new Date(2020, 2, 2),
                },
                {
                    value: 55,
                    timeStamp: new Date(2020, 2, 3),
                },
                {
                    value: 12,
                    timeStamp: new Date(2020, 2, 4),
                },
                {
                    value: 46,
                    timeStamp: new Date(2020, 2, 5),
                },
                {
                    value: 24,
                    timeStamp: new Date(2020, 2, 6),
                },
                {
                    value: 37,
                    timeStamp: new Date(2020, 2, 7),
                },
                {
                    value: 42,
                    timeStamp: new Date(2020, 2, 8),
                },
                {
                    value: 47,
                    timeStamp: new Date(2020, 2, 9),
                },
                {
                    value: 62,
                    timeStamp: new Date(2020, 2, 10),
                },
                {
                    value: 58,
                    timeStamp: new Date(2020, 2, 11),
                },
                {
                    value: 38,
                    timeStamp: new Date(2020, 2, 12),
                },
                {
                    value: 33,
                    timeStamp: new Date(2020, 2, 13),
                },
                {
                    value: 39,
                    timeStamp: new Date(2020, 2, 14),
                },
                {
                    value: 49,
                    timeStamp: new Date(2020, 2, 15),
                },
                {
                    value: 50,
                    timeStamp: new Date(2020, 2, 16),
                },
            ],
        },
    ];

    private chartData: {
        graphType: ProductionTrendType;
        graph: IChartD3[];
    }[] = [];

    private svg;

    private graphMaxX: number = 0;
    private graphMaxY: number = 0;
    private dataMax: number = 0;
    private dataMin: number = 0;

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

    constructor() {}

    public ngOnInit(): void {}

    public ngAfterViewInit(): void {
        this.initData();
        this.drawChart();
        this.findMinMax();
        this.transformData();
        this.drawChart();

        console.log(this.chartData);
    }

    private initData(): void {
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
        const domainDates = d3.extent(chart.graph, (item: IChartMini) => item.timeStamp);
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
            .tickFormat('%d')
            .tickSizeOuter(0);
        this.axis.axisY = d3
            .axisLeft(this.scaleFuncs.y)
            .ticks(10)
            .tickSize(0);

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
            const line = d3
                .line()
                .x((item: IChartD3) => item.x)
                .y((item: IChartD3) => item.y);

            const area = d3
                .area()
                .x((item: IChartD3) => item.x)
                .y0(this.graphMaxY)
                .y1((item: IChartD3) => item.y);

            const lineWidth: number = 1;
            const lineColor: string = chart.graphType === 'fact' ? '#0089FF' : '#4B5169';
            const opacity: number = chart.graphType === 'fact' ? 1 : 0.2;

            this.svg
                .append('path')
                .attr('class', `graph-line-${chart.graphType}`)
                .attr('d', line(chart.graph))
                .style('fill', 'none')
                .style('stroke', lineColor)
                .style('stroke-width', lineWidth)
                .style('opacity', opacity);

            if (chart.graphType === 'plan') {
                this.svg
                    .append('path')
                    .attr('class', `graph-line-${chart.graphType}`)
                    .attr('d', area(chart.graph))
                    .style('fill', '#4B5169')
                    .style('opacity', opacity);
            }
        });
    }
}
