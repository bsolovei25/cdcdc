import {
    Component,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnChanges,
    HostListener,
    Input,
    Renderer2,
    OnDestroy,
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
export class ProductionTrendGraphComponent implements OnChanges, AfterViewInit, OnDestroy {
    @Input() private data: IProductionTrend[] = [
        {
            graphType: 'fact',
            graph: [
                {
                    value: 1000,
                    timestamp: new Date(2020, 2, 1),
                },
                {
                    value: 6000,
                    timestamp: new Date(2020, 2, 2),
                },
                {
                    value: 4500,
                    timestamp: new Date(2020, 2, 3),
                },
                {
                    value: 900,
                    timestamp: new Date(2020, 2, 4),
                },
                {
                    value: 1300,
                    timestamp: new Date(2020, 2, 5),
                },
                {
                    value: 5800,
                    timestamp: new Date(2020, 2, 6),
                },
                {
                    value: 4500,
                    timestamp: new Date(2020, 2, 7),
                },
            ],
        },
        {
            graphType: 'plan',
            graph: [
                {
                    value: 1600,
                    timestamp: new Date(2020, 2, 1),
                },
                {
                    value: 1500,
                    timestamp: new Date(2020, 2, 2),
                },
                {
                    value: 1000,
                    timestamp: new Date(2020, 2, 3),
                },
                {
                    value: 6000,
                    timestamp: new Date(2020, 2, 4),
                },
                {
                    value: 5000,
                    timestamp: new Date(2020, 2, 5),
                },
                {
                    value: 1000,
                    timestamp: new Date(2020, 2, 6),
                },
                {
                    value: 3000,
                    timestamp: new Date(2020, 2, 7),
                },
            ],
        },
    ];

    @ViewChild('chart', { static: true }) private chart: ElementRef;

    private readonly MAX_COEF: number = 0.1;

    private readonly chartStroke: { [key: string]: string } = {
        plan: '#ffffff',
        fact: '#3fa9f5',
    };

    private readonly dataPickerColors: { [key: string]: string } = {
        standard: '#00A99D',
        warning: '#f4a321',
        danger: '#eb5757',
    };

    private svg = null;

    private chartData: { graphType: ProductionTrendType; graph: IChartD3[] }[] = [];

    private axis: { axisX: any; axisY: any } = { axisX: null, axisY: null };

    private graphMaxX: number = null;
    private graphMaxY: number = null;

    private dataMax: number = null;
    private dataMin: number = null;

    private readonly padding: { [key: string]: number } = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50,
    };

    public sbWidth: number = 20;
    public sbLeft: number = 6;

    private eventListenerFn: () => void = null;

    constructor(private renderer: Renderer2) {}

    public ngOnChanges(): void {
        this.findMinMax();
        if (this.svg) {
            this.initGraph();
            this.transformData();
            this.drawAxis();
            this.drawGraph();
            this.drawMouseGroup();
        }
    }

    public ngAfterViewInit(): void {
        const date = this.dateFormatLocale();

        this.findMinMax();
        this.initGraph();
        this.transformData();
        this.drawAxis();
        this.drawGraph();
        this.drawMouseGroup();
    }

    public ngOnDestroy(): void {
        if (this.eventListenerFn) {
            this.eventListenerFn();
        }
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (this.svg) {
            this.initGraph();
            this.transformData();
            this.drawAxis();
            this.drawGraph();
            this.drawMouseGroup();
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
        this.dataMin = d3.min(minValues) * (1 - 0.3);
    }

    private transformData(): void {
        this.chartData = [];
        this.data.forEach((item) => this.transformOneChartData(item));
    }

    private transformOneChartData(chart: IProductionTrend): void {
        const domainDates = d3.extent(chart.graph, (item: IChartMini) => item.timestamp);
        const rangeX = [this.padding.left, this.graphMaxX - this.padding.right];
        const time = d3
            .scaleTime()
            .domain(domainDates)
            .rangeRound(rangeX);

        const domainValues = [this.dataMax, this.dataMin];
        const rangeY = [this.padding.top, this.graphMaxY - this.padding.bottom];
        const val = d3
            .scaleLinear()
            .domain(domainValues)
            .range(rangeY);

        this.axis.axisX = d3
            .axisBottom(time)
            .ticks(d3.timeDay.every(1))
            .tickFormat(this.dateFormatLocale())
            .tickSizeOuter(0);
        this.axis.axisY = d3
            .axisLeft(val)
            .ticks(10)
            .tickSize(0);

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
                .attr('class', `graph-line-${chart.graphType}`)
                .attr('d', line(chart.graph))
                .style('fill', 'none')
                .style('stroke', this.chartStroke[chart.graphType])
                .style('stroke-width', 2);
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
        const formatMinute = locale.format('%I:%M');
        const formatHour = locale.format('%I %p');
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

    private drawMouseGroup(): void {
        const height = this.graphMaxY - this.padding.top - this.padding.bottom;
        const width = this.graphMaxX - this.padding.left - this.padding.right;

        // группа событий мыши
        const mouseG = this.svg
            .append('g')
            .attr('class', 'mouse-over')
            .attr('transform', `translate(${this.padding.left},${this.padding.top})`)
            .style('color', this.dataPickerColors.standard);

        // линия курсора
        mouseG
            .append('line')
            .attr('class', 'mouse-line')
            .attr('y1', 0)
            .attr('x1', 0)
            .attr('y2', height)
            .attr('x2', 0)
            .style('stroke', 'currentColor')
            .style('stroke-width', '1px');

        // точка курсора на оси дат
        mouseG
            .append('circle')
            .attr('class', 'mouse-line-circle')
            .attr('r', '3')
            .attr('cy', `${height}`)
            .style('fill', 'currentColor');

        // точки курсора на плашке
        mouseG
            .append('circle')
            .attr('class', 'mouse-line-circle')
            .attr('r', '4')
            .attr('cy', 0)
            .attr('opacity', 1)
            .style('fill', 'currentColor');
        mouseG
            .append('circle')
            .attr('class', 'mouse-line-circle')
            .attr('r', '5')
            .attr('cy', 0)
            .attr('opacity', 0.6)
            .style('fill', 'currentColor');
        mouseG
            .append('circle')
            .attr('class', 'mouse-line-circle')
            .attr('r', '8')
            .attr('cy', 0)
            .attr('opacity', 0.3)
            .style('fill', 'currentColor');
        mouseG
            .append('circle')
            .attr('class', 'mouse-line-circle')
            .attr('r', '12')
            .attr('cy', 0)
            .attr('opacity', 0.1)
            .style('fill', 'currentColor');

        // точка курсора на линии плановых значений
        mouseG
            .append('circle')
            .attr('class', 'mouse-per-line')
            .attr('r', '4')
            .style('fill', 'currentColor')
            .style('stroke-width', '1px');

        // область для прослушивания событий мыши
        const [[mouseListenArea]] = mouseG
            .append('svg:rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')._groups;

        this.eventListenerFn = this.listenMouseEvents(mouseListenArea);
    }

    private listenMouseEvents(element: HTMLElement): () => void {
        const eventListeners: (() => void)[] = [];

        eventListeners.push(
            this.renderer.listen(element, 'mouseout', () => {
                this.svg.select('.mouse-over').style('opacity', 0);
            }),
            this.renderer.listen(element, 'mouseover', () => {
                this.svg.select('.mouse-over').style('opacity', 1);
            }),
            this.renderer.listen(element, 'mousemove', (event: MouseEvent) => {
                const rect: DOMRect = element.getBoundingClientRect();
                const x = event.clientX - rect.left;

                let factLine: SVGGeometryElement = null;
                [[factLine]] = this.svg.select('.graph-line-fact')._groups;

                let beginFact: number = 0;
                let endFact: number = factLine.getTotalLength();
                let targetFact: number = null;
                let posFact: SVGPoint = null;

                while (true) {
                    targetFact = Math.floor((beginFact + endFact) / 2);
                    posFact = factLine.getPointAtLength(targetFact);
                    if (
                        (targetFact === endFact || targetFact === beginFact) &&
                        posFact.x !== x + this.padding.left
                    ) {
                        break;
                    }
                    if (posFact.x > x + this.padding.left) {
                        endFact = targetFact;
                    } else if (posFact.x < x + this.padding.left) {
                        beginFact = targetFact;
                    } else {
                        break;
                    }
                }

                let planLine: SVGGeometryElement = null;
                [[planLine]] = this.svg.select('.graph-line-plan')._groups;

                let beginPlan: number = 0;
                let endPlan: number = planLine.getTotalLength();
                let targetPlan: number = null;
                let posPlan: SVGPoint = null;

                while (true) {
                    targetPlan = Math.floor((beginPlan + endPlan) / 2);
                    posPlan = planLine.getPointAtLength(targetPlan);
                    if (
                        (targetPlan === endPlan || targetPlan === beginPlan) &&
                        posPlan.x !== x + this.padding.left
                    ) {
                        break;
                    }
                    if (posPlan.x > x + this.padding.left) {
                        endPlan = targetPlan;
                    } else if (posPlan.x < x + this.padding.left) {
                        beginPlan = targetPlan;
                    } else {
                        break;
                    }
                }

                this.svg
                    .select('.mouse-line')
                    .attr('x1', x)
                    .attr('x2', x);

                this.svg.selectAll('.mouse-line-circle').attr('cx', x);

                this.svg
                    .select('.mouse-per-line')
                    .attr('cx', x)
                    .attr('cy', posFact.y - this.padding.top);

                if (posFact.y < posPlan.y) {
                    this.svg.select('g.mouse-over').style('color', this.dataPickerColors.danger);
                } else {
                    this.svg.select('g.mouse-over').style('color', this.dataPickerColors.standard);
                }
            })
        );

        return () => eventListeners.forEach((item) => item());
    }
}
