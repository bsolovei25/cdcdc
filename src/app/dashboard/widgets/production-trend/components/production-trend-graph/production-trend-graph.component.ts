import {
    Component,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnChanges,
    HostListener,
    Input,
} from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { IChartD3, IChartMini } from '../../../../../@shared/models/smart-scroll.model';
import { IProductionTrend, ProductionTrendType } from '../../../../models/production-trends.model';

@Component({
    selector: 'evj-production-trend-graph',
    templateUrl: './production-trend-graph.component.html',
    styleUrls: ['./production-trend-graph.component.scss'],
})
export class ProductionTrendGraphComponent implements OnChanges, AfterViewInit {
    @Input() private data: IProductionTrend[] = [
        {
            graphType: 'fact',
            graph: [
                {
                    value: 1,
                    timestamp: new Date(2020, 2, 1),
                },
                {
                    value: 6,
                    timestamp: new Date(2020, 2, 2),
                },
                {
                    value: 4,
                    timestamp: new Date(2020, 2, 3),
                },
                {
                    value: 9,
                    timestamp: new Date(2020, 2, 4),
                },
                {
                    value: -3,
                    timestamp: new Date(2020, 2, 5),
                },
                {
                    value: 8,
                    timestamp: new Date(2020, 2, 6),
                },
                {
                    value: 5,
                    timestamp: new Date(2020, 2, 7),
                },
            ],
        },
        {
            graphType: 'plan',
            graph: [
                {
                    value: 16,
                    timestamp: new Date(2020, 2, 1),
                },
                {
                    value: 15,
                    timestamp: new Date(2020, 2, 2),
                },
                {
                    value: 1,
                    timestamp: new Date(2020, 2, 3),
                },
                {
                    value: 6,
                    timestamp: new Date(2020, 2, 4),
                },
                {
                    value: 5,
                    timestamp: new Date(2020, 2, 5),
                },
                {
                    value: 10,
                    timestamp: new Date(2020, 2, 6),
                },
                {
                    value: 3,
                    timestamp: new Date(2020, 2, 7),
                },
            ],
        },
    ];

    @ViewChild('chart', { static: true }) private chart: ElementRef;

    private readonly chartStroke: { [key: string]: string } = {
        plan: '#ffffff',
        fact: '#1eccb4',
        deviation: '#cc2d1f',
    };

    private svg = null;

    private chartData: { graphType: ProductionTrendType; graph: IChartD3[] }[] = [];

    private graphMaxX: number = null;
    private graphMaxY: number = null;

    private dataMax: number = null;
    private dataMin: number = null;

    private readonly paddingX: number = 0;
    private readonly paddingY: number = 0;

    public sbWidth: number = 20;
    public sbLeft: number = 6;

    constructor() {}

    public ngOnChanges(): void {
        this.findMinMax();
        if (this.svg) {
            this.initGraph();
            this.transformData();
            this.drawGraph();
        }
    }

    public ngAfterViewInit(): void {
        this.findMinMax();
        this.initGraph();
        this.transformData();
        this.drawGraph();
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (this.svg) {
            this.initGraph();
            this.transformData();
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
            .attr('viewBox', `0 0 ${this.graphMaxX} ${this.graphMaxY + 5}`);
    }

    private findMinMax(): void {
        const maxValues: number[] = [];
        const minValues: number[] = [];

        this.data.forEach((graph) => {
            maxValues.push(d3.max(graph.graph, (item: IChartMini) => item.value));
            minValues.push(d3.min(graph.graph, (item: IChartMini) => item.value));
        });

        this.dataMax = d3.max(maxValues);
        this.dataMin = d3.min(minValues);
    }

    private transformData(): void {
        this.chartData = [];
        this.data.forEach((item) => this.transformOneChartData(item));

        console.log('data: ', this.data);
        console.log('chartData: ', this.chartData);
    }

    private transformOneChartData(chart: IProductionTrend): void {
        const domainDates = d3.extent(chart.graph, (item: IChartMini) => item.timestamp);
        const rangeX = [this.paddingX, this.graphMaxX - this.paddingX];
        const time = d3
            .scaleTime()
            .domain(domainDates)
            .rangeRound(rangeX);

        const domainValues = [this.dataMin, this.dataMax];
        const rangeY = [this.paddingY, this.graphMaxY - this.paddingY];
        const val = d3
            .scaleLinear()
            .domain(domainValues)
            .range(rangeY);

        const chartData: { graphType: ProductionTrendType; graph: IChartD3[] } = {
            graphType: chart.graphType,
            graph: [],
        };

        chart.graph.forEach((item) => {
            chartData.graph.push({ x: time(item.timestamp), y: val(item.value) });
        });

        this.chartData.push(chartData);
    }

    private drawGraph(): void {
        this.chartData.forEach((chart) => {
            const line = d3
                .line()
                .x((item: IChartD3) => item.x)
                .y((item: IChartD3) => item.y);

            this.svg
                .append('path')
                .attr('d', line(chart.graph))
                .style('fill', 'none')
                .style('stroke', this.chartStroke[chart.graphType])
                .style('stroke-width', 1);

            if (chart.graphType === 'plan') {
                const lineTop = d3
                    .line()
                    .x((item: IChartD3) => item.x)
                    .y((item: IChartD3) => item.y + 10);
                const lineBottom = d3
                    .line()
                    .x((item: IChartD3) => item.x)
                    .y((item: IChartD3) => item.y - 10);

                this.svg
                    .append('path')
                    .attr('d', lineTop(chart.graph))
                    .style('fill', 'none')
                    .style('stroke', this.chartStroke.deviation)
                    .style('stroke-width', 1)
                    .style('stroke-dasharray', '1 1');

                this.svg
                    .append('path')
                    .attr('d', lineBottom(chart.graph))
                    .style('fill', 'none')
                    .style('stroke', this.chartStroke.deviation)
                    .style('stroke-width', 1)
                    .style('stroke-dasharray', '1 1');
            }
        });
    }
}
