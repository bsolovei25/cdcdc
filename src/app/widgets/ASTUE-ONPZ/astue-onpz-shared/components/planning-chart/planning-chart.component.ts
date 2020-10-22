import {
    Component,
    ElementRef, EventEmitter,
    HostListener,
    Input,
    OnChanges,
    Output,
    ViewChild
} from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import {
    IProductionTrend,
    ProductionTrendType,
} from '../../../../../dashboard/models/LCO/production-trends.model';
import { IChartD3, IChartMini } from '@shared/models/smart-scroll.model';
import { AsyncRender } from '@shared/functions/async-render.function';
import { fillDataArrayChart } from '@shared/functions/fill-data-array.function';
import { newArray } from '@angular/compiler/src/util';
import { IDatesInterval, WidgetService } from '../../../../../dashboard/services/widget.service';
import { dateFormatLocale } from '@shared/functions/universal-time-fromat.function';

@Component({
    selector: 'evj-planning-chart',
    templateUrl: './planning-chart.component.html',
    styleUrls: ['./planning-chart.component.scss'],
})
export class PlanningChartComponent implements OnChanges {

    @Input() private scroll: { left: number, right: number } = { left: 0, right: 100 };
    @Input() private data: IProductionTrend[] = [];
    @Input() private isSpline: boolean = true;
    @Input() private isWithPicker: boolean = false;
    @Input() private intervalHours: number[] = [];
    @Input() set size(value: number) {
        this.deltaCf = PlanningChartComponent.STEP_CF * value;
    }
    @Output() scrollData: EventEmitter<IChartMini[]> = new EventEmitter<IChartMini[]>(true);

    private dateTimeInterval: Date[] = null;

    @ViewChild('chart', { static: true }) private chart: ElementRef;

    private chartData: {
        graphType: ProductionTrendType;
        graph: IChartD3[];
    }[] = [];

    private svg;

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

    private deltaCf: number = 0.1;
    private static STEP_CF: number = 0.05;

    private readonly topMargin: number = 25;

    private get currentDates(): IDatesInterval {
        return this.widgetService.currentDates$.getValue();
    }

    constructor(private widgetService: WidgetService) {}

    public ngOnChanges(): void {
        this.initInterval();
        if (this.data?.length > 0) {
            this.normalizeData();
            this.startDrawChart();
        } else {
            this.dropChart();
        }
        this.scrollData.emit(this.data?.find(x => x.graphType === 'fact')?.graph ?? []);
    }

    public changeScale(isPlus: boolean): void {
        this.deltaCf += (+isPlus || -1) * PlanningChartComponent.STEP_CF;
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
        this.drawMask();
        this.drawAxisLabels();
        this.drawFutureRect();
        this.drawPoints();
        this.customizeAreas();
    }

    private initInterval(): void {
        const currentDatetime = new Date();
        currentDatetime.setMinutes(0, 0, 0);
        this.dateTimeInterval = newArray(2);
        this.dateTimeInterval[0] = new Date(currentDatetime.getTime() -
            1000 * 60 * 60 * this.intervalHours[0]);
        this.dateTimeInterval[1] = new Date(currentDatetime.getTime() +
            1000 * 60 * 60 * this.intervalHours[1]);
    }

    private initData(): void {
        if (this.isWithPicker) {
            this.padding.top = 70;
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
            .attr(
                'viewBox',
                `0 0 ${this.graphMaxX > 0 ? this.graphMaxX : 0} ${
                    this.graphMaxY > 5 ? this.graphMaxY - 5 : 0
                }`
            );
    }

    // TODO cancel normalize data
    private normalizeData(): void {
        if (this.currentDates) {
            return;
        }
        this.data.forEach((item) => {
            item.graph = fillDataArrayChart(
                item.graph,
                this.dateTimeInterval[0].getTime(),
                this.dateTimeInterval[1].getTime(),
            );
        });
    }

    private findMinMax(): void {
        const minDate: Date[] = [];
        const maxDate: Date[] = [];

        this.data.forEach((graph) => {
            maxDate.push(d3.max(graph.graph, (item: IChartMini) => item.timeStamp));
            minDate.push(d3.min(graph.graph, (item: IChartMini) => item.timeStamp));
        });

        [this.dataMin, this.dataMax] = d3.extent(this.data.flatMap((x) => x.graph).map((x) => x.value));
        this.dataMin -= (this.dataMax - this.dataMin) * this.deltaCf;
        this.dataMax += (this.dataMax - this.dataMin) * this.deltaCf;
        this.dateMax = d3.max(maxDate);
        this.dateMin = d3.min(minDate);
    }

    private defineScale(): void {
        let domainDates = [this.dateMin, this.dateMax];
        const rangeX = [this.padding.left, this.graphMaxX - this.padding.right];
        const deltaDomainDates = domainDates[1].getTime() - domainDates[0].getTime();
        domainDates = [
            new Date(domainDates[0].getTime() + this.scroll.left / 100 * deltaDomainDates),
            new Date(domainDates[1].getTime() - this.scroll.right / 100 * deltaDomainDates),
        ];

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

        if (!!this.currentDates) {
            this.axis.axisX = d3
                .axisBottom(this.scaleFuncs.x)
                .ticks(12)
                .tickFormat(dateFormatLocale())
                .tickSizeOuter(0);
        } else {
            this.axis.axisX = d3
                .axisBottom(this.scaleFuncs.x)
                .ticks(12)
                .tickFormat(d3.timeFormat('%H'))
                .tickSizeOuter(0);
        }
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

    private drawMask(): void {
        if (this.isWithPicker) {
            const mask = this.svg
                .append('mask')
                .attr('width', this.graphMaxX)
                .attr('height', this.graphMaxY)
                .attr('id', 'planning-mask');
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
                .attr('mask', 'url(#planning-mask)')
                .style('fill', 'var(--color-astue-onpz-bg-axis-2)');
        }
    }

    private drawPoints(): void {
        if (this.currentDates) {
            return;
        }
        const pointsG = this.svg.append('g').attr('class', 'chart-points');
        const item = this.chartData
            .find((x) => x.graphType === 'fact')
            ?.graph.filter((x) => x.x < this.scaleFuncs.x(new Date())).slice(-1)[0];
        if (item) {
            const g = pointsG.append('g').attr('class', 'fact-point');
            let r = 9;
            let opacity = 0.33;
            for (let i = 0; i < 3; i++) {
                g.append('circle')
                    .attr('class', 'point point_fact')
                    .attr('cx', item.x)
                    .attr('cy', item.y)
                    .attr('r', r)
                    .style('opacity', opacity);
                r -= 3;
                opacity += 0.33;
            }
            g.style('transform', 'translateY(5)');
        }
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
        this.svg.selectAll('g.axisX g.tick')._groups[0].forEach((g, idx) => {
            if (idx % 2 && this.currentDates && !this.isWithPicker) {
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
        if (this.currentDates) {
            return;
        }
        const currentDatetime: Date = new Date();
        currentDatetime.setMinutes(0, 0, 0);
        const fact = this.chartData
            .find((chart) => chart.graphType === 'fact')
            ?.graph.filter((f) => f.x <= this.scaleFuncs.x(new Date())) ?? [];
        const x = fact[fact.length - 1]?.x;
        const y = this.padding.top;
        const y2 = this.graphMaxY - this.padding.bottom;
        const width = this.graphMaxX - this.padding.right - x;
        const height = this.graphMaxY - this.padding.top - this.padding.bottom;
        if (!this.isWithPicker && width > 0 && fact[fact.length - 1]?.x) {
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
        } else if (width > 0) {
            const w = 60;

            const g = this.svg.append('g').attr('class', 'picker');
            g.append('rect')
                .attr('x', x)
                .attr('y', this.padding.top)
                .attr('width', width)
                .attr('height', height)
                .attr('class', 'future');
            g.append('line')
                .attr('x1', x)
                .attr('y1', this.padding.top - this.topMargin)
                .attr('x2', x)
                .attr('y2', y2)
                .attr('class', 'future-with-line');
            g.append('line')
                .attr('x1', x - this.topMargin / 2)
                .attr('y1', this.padding.top - this.topMargin)
                .attr('x2', x + this.topMargin / 2)
                .attr('y2', this.padding.top - this.topMargin)
                .attr('class', 'future-with-line future-with-line_hor');
            g.append('rect')
                .attr('x', x - w)
                .attr('y', this.padding.top - this.topMargin - w * 0.5)
                .attr('width', w * 2)
                .attr('height', w * 0.5)
                .attr('rx', 5)
                .attr('class', 'data');

            const factG = this.data.find((item) => item.graphType === 'fact').graph ?? [];
            const factVal = factG.length ? factG[factG.length - 1] : null;

            g.append('text')
                .attr('text-anchor', 'middle')
                .attr('x', x)
                .attr('y', this.padding.top - this.topMargin - w * 0.17)
                .attr('class', 'data-fact')
                .text(factVal?.value.toFixed(2) ?? '');

            const formatDate = d3.timeFormat('%d.%m.%Y | %H:%M:%S');

            g.append('text')
                .attr('text-anchor', 'middle')
                .attr('x', x)
                .attr('y', this.padding.top - this.topMargin - w * 0.55)
                .attr('class', 'data-date')
                .text(formatDate(currentDatetime));
        }
    }

    private dropChart(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = undefined;
        }
    }
}
