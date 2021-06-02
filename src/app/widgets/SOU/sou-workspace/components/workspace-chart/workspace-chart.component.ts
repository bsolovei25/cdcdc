import {
    Component,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter, OnChanges, HostListener, ChangeDetectorRef, OnInit
} from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { IChartD3, IChartMini } from '@shared/interfaces/smart-scroll.model';
import { IDatesInterval, WidgetService } from '@dashboard/services/widget.service';
import { AsyncRender } from '@shared/functions/async-render.function';
import { newArray } from '@angular/compiler/src/util';
import { fillDataArrayChart } from '@shared/functions/fill-data-array.function';
import { dateFormatLocale } from '@shared/functions/universal-time-fromat.function';
import { CHART_DATA } from '@widgets/SOU/sou-workspace/components/workspace-chart/mock';

@Component({
    selector: 'evj-workspace-chart',
    templateUrl: './workspace-chart.component.html',
    styleUrls: ['./workspace-chart.component.scss']
})
export class WorkspaceChartComponent implements OnChanges, OnInit {

    public selectedPeriod: IDatesInterval =
        {
            fromDateTime: new Date(2020, 2, 4, 15),
            toDateTime: new Date(2020, 2, 7, 20)
        };

    public sbLeft: number = 0;

    public sbWidth: number = 100;

    public data = CHART_DATA;

    @Input() private scroll: { left: number; right: number } = { left: 0, right: 0 };
    @Input() private isSpline: boolean = false;
    @Input() private isWithPicker: boolean = false;
    @Input() private intervalHours: number[] = [];

    @Input() set size(value: number) {
        this.deltaCf = WorkspaceChartComponent.STEP_CF * value;
    }

    @Output() scrollData: EventEmitter<IChartMini[]> = new EventEmitter<IChartMini[]>(true);
    @Output() clickSmartTrend: EventEmitter<boolean> = new EventEmitter;

    private dateTimeInterval: Date[] = null;

    @ViewChild('chart', { static: true }) private chart: ElementRef;

    private chartData: {
        graphType: string;
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
    private curve: Selection;

    private padding: { left: number; right: number; top: number; bottom: number } = {
        left: 50,
        right: 20,
        top: 0,
        bottom: 25
    };

    private deltaCf: number = 0.1;
    private static STEP_CF: number = 0.05;

    private firstTimeSmallChart: boolean = true;

    private get currentDates(): IDatesInterval {
        return this.widgetService.currentDates$.getValue();
    }

    constructor(private widgetService: WidgetService, private chDet: ChangeDetectorRef) {
    }

    public ngOnChanges(): void {
        this.initInterval();
        if (this.data?.length > 0) {
            this.normalizeData();
            this.startDrawChart();
        } else {
            this.dropChart();
        }
        this.scrollData.emit(this.data?.find((x) => x.graphType === 'fact')?.graph ?? []);
        this.chDet.detectChanges();
    }

    ngOnInit(): void {
        if (!!this.data.length) {
            this.startDrawChart();
            this.chDet.detectChanges();
        } else {
            this.dropChart();
        }
    }

    clickBtn(): void {
        this.clickSmartTrend.emit();
    }

    public changeScale(isPlus: boolean): void {
        this.deltaCf += (+isPlus || -1) * WorkspaceChartComponent.STEP_CF;
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (!!this.data.length) {
            this.startDrawChart();
            this.chDet.detectChanges();
        } else {
            this.dropChart();
        }
    }

    @AsyncRender
    private startDrawChart(): void {
        console.log('pffsdfsdfsdfsd');
        this.dropChart();
        this.initData();
        this.findMinMax();
        this.defineScale();
        this.transformData();
        this.drawGridlines();
        this.drawChart();
        this.drawAxisLabels();
    }

    private initInterval(): void {
        const currentDatetime = new Date();
        currentDatetime.setMinutes(0, 0, 0);
        this.dateTimeInterval = newArray(2);
        this.dateTimeInterval[0] = new Date(currentDatetime.getTime() - 1000 * 60 * 60 * this.intervalHours[0]);
        this.dateTimeInterval[1] = new Date(currentDatetime.getTime() + 1000 * 60 * 60 * this.intervalHours[1]);
    }

    private initData(): void {
        if (this.isWithPicker) {
            this.padding.top = 70;
        }

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

    // TODO cancel normalize data
    private normalizeData(): void {
        if (this.currentDates) {
            return;
        }
        this.data.forEach((item) => {
            item.graph = fillDataArrayChart(
                item.graph,
                this.dateTimeInterval[0].getTime(),
                this.dateTimeInterval[1].getTime()
            );
        });
        // TODO: for check
        // const fact = this.data.find((x) => x.graphType === 'fact').graph;
        // fact[fact.length - 1].value += 50000;
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
            new Date(domainDates[0].getTime() + (this.scroll.left / 100) * deltaDomainDates),
            new Date(domainDates[1].getTime() - (this.scroll.right / 100) * deltaDomainDates)
        ];

        this.scaleFuncs.x = d3.scaleTime().domain(domainDates).rangeRound(rangeX);

        const domainValues = [this.dataMax, this.dataMin];
        const rangeY = [this.padding.top, this.graphMaxY - this.padding.bottom];
        this.scaleFuncs.y = d3.scaleLinear().domain(domainValues).range(rangeY);

        if (!!this.currentDates) {
            this.axis.axisX = d3
                .axisBottom(this.scaleFuncs.x)
                .ticks(12)
                .tickFormat(dateFormatLocale())
                .tickSizeOuter(0);
        } else {
            this.axis.axisX = d3
                .axisBottom(this.scaleFuncs.x)
                .ticks(26)
                .tickFormat(d3.timeFormat('%H:%M'))
                .tickSizeOuter(0);
        }
        this.axis.axisY = d3.axisLeft(this.scaleFuncs.y).ticks(5).tickSize(0);
    }

    private transformData(): void {
        this.chartData = [];
        this.data.forEach((item) => this.transformOneChartData(item));
    }

    private transformOneChartData(chart): void {
        const chartData: {
            graphType: string;
            graph: IChartD3[];
        } = {
            graphType: chart.graphType,
            graph: []
        };

        chart.graph.forEach((item) => {
            chartData.graph.push({
                x: this.scaleFuncs.x(item.timeStamp),
                y: this.scaleFuncs.y(item.value)
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

            this.curve = this.svg.append('path').attr('class', `graph-line-${chart.graphType}`).attr('d', line(chart.graph));

            if (chart.graphType === 'higherBorder' || chart.graphType === 'lowerBorder') {
                const areaFn = chart.graphType === 'lowerBorder' ? areaBottom : areaTop;
                this.svg.append('path').attr('class', `graph-area-${chart.graphType}`).attr('d', areaFn(chart.graph));
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
            .style('color', 'var(--chart-segment-color)');

        const yscale = d3.scaleLinear()
            .range([231, 0]);
        const line = this.svg
            .append('g')
            .attr('class', 'yAxis')
            .attr('transform', `translate(50,0)`)
            .call(
                d3
                    .axisLeft(yscale)
                    .tickSize(0)
                    .tickValues([])
            )
            .style('color', 'var(--text-subscript-color)');

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
            .style('color', 'var(--chart-segment-color)');
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

            if (this.chart.nativeElement.clientWidth < 800 && this.firstTimeSmallChart) {
                this.firstTimeSmallChart = false;
                this.svg.selectAll('g.axisX g.tick')._groups[0].forEach((g, idx) => {
                    if (!(idx % 2)) {
                        g.remove();
                    }
                });
            } else {
                this.firstTimeSmallChart = true;
            }
        };

        const translateX: string = `translate(0,${this.graphMaxY - this.padding.bottom})`;
        const translateY: string = `translate(${this.padding.left},0)`;
        drawLabels('axisX', translateX);
        drawLabels('axisY', translateY);
    }

    private dropChart(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = undefined;
        }
    }

}
