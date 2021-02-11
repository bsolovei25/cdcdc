import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
} from '@angular/core';
import { LineType } from '../../../../../CD/cd-shared/cd-line-chart/cd-line-chart.component';
import * as d3 from 'd3';
import { dateFormatLocale, shortMonths } from '@shared/functions/universal-time-fromat.function';
import { AsyncRender } from '@shared/functions/async-render.function';
import {
    DATA_SOURCE_FACT,
    DATA_SOURCE_HIGHER_BORDER,
    DATA_SOURCE_LOWER_BORDER,
    DATA_SOURCE_PLAN,
} from './astue-onpz-factory-analysis-chart.mock';
import { IDatesInterval } from '../../../../../../dashboard/services/widget.service';
import { IMultiChartLine } from '../../../../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';

@Component({
    selector: 'evj-astue-onpz-factory-analysis-chart',
    templateUrl: './astue-onpz-factory-analysis-chart.component.html',
    styleUrls: ['./astue-onpz-factory-analysis-chart.component.scss'],
})
export class AstueOnpzFactoryAnalysisChartComponent implements OnInit, OnChanges {
    size: { width: number; height: number } = null;

    public isLoading: boolean = true;

    private readonly isMockEnabled: boolean = false;

    @Input()
    private scroll: { left: number; right: number } = { left: 0, right: 0 };

    @Input()
    public graphData: { name: string; graph: IMultiChartLine[] } = { name: '', graph: [] };

    @Input()
    public selectedPeriod: IDatesInterval | null = null;

    @Output()
    public planFactValues: EventEmitter<{ fact: number; plan: number }> = new EventEmitter<{
        fact: number;
        plan: number;
    }>();

    public factDataset: {
        x: Date;
        y: number;
    }[] = [];

    public planDataset: {
        x: Date;
        y: number;
    }[] = [];

    public lowDataset: {
        x: Date;
        y: number;
    }[] = [];

    public highDataset: {
        x: Date;
        y: number;
    }[] = [];

    public scales: { x: d3.sclaeDate; y: d3.sclaeLinear } = { x: null, y: null };

    public sizeX: { min: Date | null; max: Date | null } = { min: null, max: null };

    public sizeXCoord: { min: number | null; max: number | null } = { min: null, max: null };

    public sizeY: { min: number; max: number } = { min: 0, max: 100 };

    public margin: { top: number; right: number; bottom: number; left: number } = {
        top: 0,
        right: 0,
        bottom: 30,
        left: 59,
    };

    private positionMouse: number | null = null;

    private svg: d3;

    private readonly DELTA: number = 0.07;

    private eventListenerFn: () => void = null;

    private curves: { type: LineType; curve: Selection }[] = [];

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.initSvgDraw();
    }

    constructor(private hostElement: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.initSvgDraw();
    }

    ngOnChanges(changes: SimpleChanges): void {
        // if (changes.selectedPeriod) {
        this.initSvgDraw();
        // }
    }

    private initSvgDraw(): void {
        if (this.graphData && this.graphData.graph.length) {
            this.drawSvg();
        }
    }

    @AsyncRender
    private drawSvg(): void {
        this.prepareData();
        this.configChartArea();
        // chart layout render
        this.initScale();
        this.initSvg();
        this.drawAxises();
        this.drawGrid();
        this.drawDaysThreshold();
        // this.drawDayThreshold();
        // data render
        // this.drawCurve(this.factDataset, 'fact');
        this.drawCurve(this.planDataset, 'plan');
        this.drawCurve(this.lowDataset, 'lower-border');
        this.drawCurve(this.highDataset, 'higher-border');
        this.drawCurve(this.factDataset, 'fact');
        this.drawMouseGroup();
    }

    private prepareData(): void {
        if (this.isMockEnabled) {
            this.planDataset = DATA_SOURCE_PLAN;
            this.factDataset = DATA_SOURCE_FACT;
            this.lowDataset = DATA_SOURCE_LOWER_BORDER;
            this.highDataset = DATA_SOURCE_HIGHER_BORDER;
        } else {
            this.graphData?.graph.forEach((item) => {
                const array = item.graph.map((graphItem) => {
                    return { x: new Date(graphItem.timeStamp), y: graphItem.value };
                });
                if (item.graphType === 'plan') {
                    this.planDataset = array;
                }
                if (item.graphType === 'fact') {
                    this.factDataset = array;
                }
                if (item.graphType === 'lowerBorder') {
                    this.lowDataset = array;
                }
                if (item.graphType === 'higherBorder') {
                    this.highDataset = array;
                }
            });
        }

        const dataArray = [].concat.apply(
            [],
            [this.factDataset, this.planDataset, this.lowDataset, this.highDataset].filter((item) => item.length)
        );

        [this.sizeY.min, this.sizeY.max] = d3.extent(dataArray.map((item) => item.y));
        this.sizeY.min -= (this.sizeY.max - this.sizeY.min) * this.DELTA;
        this.sizeY.max += (this.sizeY.max - this.sizeY.min) * this.DELTA;

        // округляем в зависимости от разрядности числа для отображения всех значений на оси y
        function getRoundStep(value: number): number {
            let digitCapacity = Math.ceil(Math.log(value + 1) / Math.LN10);
            let counter = 1;
            while (digitCapacity > 1) {
                counter = counter * 10;
                digitCapacity--;
            }
            return counter;
        }
        this.sizeY.max = Math.ceil(this.sizeY.max / getRoundStep(this.sizeY.max)) * getRoundStep(this.sizeY.max);
    }

    private configChartArea(): void {
        this.size = {
            width: this.hostElement.nativeElement.clientWidth,
            height: this.hostElement.nativeElement.clientHeight,
        };
    }

    private initScale(): void {
        let domainDates = [this.selectedPeriod.fromDateTime, this.selectedPeriod.toDateTime];
        const deltaDomainDates = domainDates[1].getTime() - domainDates[0].getTime();
        domainDates = [
            new Date(domainDates[0].getTime() + (this.scroll.left / 100) * deltaDomainDates),
            new Date(domainDates[1].getTime() - (this.scroll.right / 100) * deltaDomainDates),
        ];

        this.scales.x = d3
            .scaleTime()
            .domain(domainDates)
            .range([0, this.size.width - this.margin.right - this.margin.left]);

        this.scales.y = d3
            .scaleLinear()
            .domain([this.sizeY.min, this.sizeY.max])
            .range([this.size.height - this.margin.top - this.margin.bottom, 0]);
    }

    private drawMouseGroup(): void {
        // группа событий мыши
        const mouseG = this.svg
            .append('g')
            .attr('class', 'mouse-over')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
            .attr('opacity', 1)
            .style('color', 'white');

        const lastCord = this.scales.x(this.factDataset[this.factDataset.length - 1]?.x);
        // линия курсора
        mouseG
            .append('line')
            .attr('class', 'mouse-line')
            .attr('x1', lastCord)
            .attr('x2', lastCord)
            .attr('y1', this.scales.y(this.sizeY.max))
            .attr('y2', this.scales.y(this.sizeY.min))
            .style('stroke', 'currentColor')
            .style('stroke-width', '1px');

        const width = this.size.width - this.margin.left - this.margin.right;
        const height = this.size.height - this.margin.bottom - this.margin.top;
        mouseG
            .append('text')
            .attr('class', 'label-mouse')
            .attr('text-anchor', 'start')
            .attr('font-size', '12px')
            .attr('x', 0)
            .attr('y', this.size.height - this.margin.bottom - 5)
            .attr('fill', '#D7E2F2')
            .text('');

        // область для прослушивания событий мыши
        const [[mouseListenArea]] = mouseG
            .append('svg:rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')._groups;

        if (this.eventListenerFn) {
            this.eventListenerFn();
        }
        this.eventListenerFn = this.listenMouseEvents(mouseListenArea);
    }

    private initSvg(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = null;
        }

        this.svg = d3.select(this.hostElement.nativeElement).select('svg').append('g');
        this.svg.attr('viewBox', `0 0 ${this.size.width} ${this.size.height}`);
    }

    private drawAxises(): void {
        const drawAxis = (type: 'x' | 'y', axisTemplate) => {
            const axis = this.svg
                .append('g')
                .attr(
                    'transform',
                    `translate(${this.margin.left},  ${type === 'x' ? this.size.height - this.margin.bottom : 0})`
                )
                .attr('class', 'axis')
                .call(
                    axisTemplate
                        .tickSize(0)
                        .tickSizeOuter(0)
                        .ticks(type === 'x' ? 24 : 5)
                        .tickFormat(type === 'x' ? dateFormatLocale() : d3.format('.1f'))
                )
                .call((g) => g.select('.domain').remove());
            axis.select('path.domain').remove();
            axis.selectAll('g.tick line').remove();
            axis.selectAll('g.tick')._groups[0][axis.selectAll('g.tick')._groups[0].length - 1].remove();

            if (type === 'x') {
                axis.selectAll('g.tick')._groups[0][0].remove();
                axis.selectAll('g.tick')._groups[0].forEach((x) => {
                    shortMonths.forEach((m) => {
                        if (x.getElementsByTagName('text')[0].textContent.includes(m)) {
                            x.getElementsByTagName('text')[0].classList.add('month-text');
                        }
                    });
                });
            }
        };

        drawAxis('x', d3.axisBottom(this.scales.x));
        drawAxis('y', d3.axisLeft(this.scales.y));

        [this.sizeXCoord.min, this.sizeXCoord.max] = d3.extent(
            [...this.factDataset, ...this.planDataset, ...this.lowDataset, ...this.highDataset].map((item) =>
                this.scales.x(item.x)
            )
        );
    }

    private drawGrid(): void {
        this.svg
            .append('rect')
            .attr('width', this.size.width - this.margin.left - this.margin.right)
            .attr('height', this.size.height - this.margin.bottom - this.margin.top)
            .attr('transform', `translate(${this.margin.left}, 0)`)
            .attr('class', 'grid__background');

        this.svg
            .append('g')
            .attr(
                'transform',
                `translate(${this.margin.left}, ${this.size.height - this.margin.top - this.margin.bottom})`
            )
            .call(
                d3
                    .axisBottom(this.scales.x)
                    .ticks(this.sizeX.max)
                    .tickSize(1 - (this.size.height - this.margin.top - this.margin.bottom))
                    .tickFormat('')
            )
            .attr('class', 'grid');

        this.svg
            .append('g')
            .attr('transform', `translate(${this.margin.left}, 0)`)
            .call(
                d3
                    .axisLeft(this.scales.y)
                    .ticks(5)
                    .tickSize(1 - (this.size.width - this.margin.left - this.margin.right))
                    .tickFormat('')
            )
            .attr('class', 'grid');
    }

    private appendCurveDataCircle(r: number, x: number, y: number, className: string): void {
        this.svg
            .append('circle')
            .attr('class', className)
            .attr('transform', `translate(${this.margin.left}, 0)`)
            .attr('r', r)
            .attr('cx', x)
            .attr('cy', y);
    }

    private drawCurve(dataset: { x: Date; y: number }[], type: LineType): void {
        const lineClass: string = `line line__${type}`;

        const line = d3
            .line()
            .x((d) => this.scales.x(d.x))
            .y((d) => this.scales.y(d.y));

        this.curves[type] = this.svg
            .append('path')
            .datum(dataset)
            .attr('class', lineClass)
            .attr('d', line)
            .attr('transform', `translate(${this.margin.left}, 0)`);

        if (type === 'fact') {
            const lastCord = this.scales.x(dataset[dataset.length - 1]?.x);
            const lastDate = dataset[dataset.length - 1]?.x;
            this.svg
                .append('line')
                .attr('class', 'line__last-threshold')
                .attr('x1', lastCord)
                .attr('x2', lastCord)
                .attr('y1', this.scales.y(this.sizeY.max))
                .attr('y2', this.scales.y(this.sizeY.min))
                .attr('transform', `translate(${this.margin.left}, 0)`);

            if (!!lastDate) {
                this.svg
                    .append('text')
                    .attr('transform', `translate(${this.margin.left + 5}, 0)`)
                    .attr('font-size', '12px')
                    .attr('class', 'last-threshold__label')
                    .attr('x', lastCord)
                    .attr('y', this.size.height - this.margin.bottom - 5)
                    .attr('fill', '#D7E2F2')
                    .text(lastDate.getHours() + ':' + lastDate.getMinutes());
            }

            dataset.forEach((d, idx) => {
                if (idx === 0) {
                    return;
                }
                this.appendCurveDataCircle(2, this.scales.x(d.x), this.scales.y(d.y), `circle circle_${type}`);
            });
        }

        if (type === 'higher-border' || type === 'lower-border') {
            const areaTop = d3
                .area()
                .x((d) => this.scales.x(d.x))
                .y0(this.margin.top)
                .y1((d) => this.scales.y(d.y))
                .curve(d3.curveLinear);

            const areaBottom = d3
                .area()
                .x((d) => this.scales.x(d.x))
                .y1(this.size.height - this.margin.bottom)
                .y0((d) => this.scales.y(d.y))
                .curve(d3.curveLinear);

            const areaFn = type === 'higher-border' ? areaTop : areaBottom;

            this.svg
                .append('path')
                .attr('class', `graph-area`)
                .attr('transform', `translate(${this.margin.left}, 0)`)
                .attr('d', areaFn(dataset));
        }
    }

    private drawDaysThreshold(): void {
        const xArr = this.getBorderCoords(this.selectedPeriod.fromDateTime, this.selectedPeriod.toDateTime);
        const topOffset = this.size.height - this.margin.bottom;
        xArr.forEach((x) => {
            this.svg
                .append('line')
                .attr('class', 'line line__threshold')
                .attr('x1', x)
                .attr('x2', x)
                .attr('y1', this.scales.y(this.sizeY.max))
                .attr('y2', this.scales.y(this.sizeY.min));
            this.svg
                .append('path')
                .attr('d', `M ${x - 4} ${topOffset} L ${x + 4} ${topOffset} L ${x} ${topOffset - 4} z`)
                .attr('class', 'month-threshold');
        });
    }

    private getBorderCoords(minDate: Date, maxDate: Date): number[] {
        const delta = 1000 * 60 * 60 * 24; // 1 day
        const resultArr = [];
        let checkValue = minDate.setHours(0, 0, 0, 0);

        while (true) {
            checkValue += delta;
            if (checkValue >= maxDate.getTime()) {
                return resultArr;
            }
            resultArr.push(this.scales.x(checkValue) + this.margin.left);
        }
    }

    private listenMouseEvents(element: HTMLElement): () => void {
        const eventListeners: (() => void)[] = [];
        eventListeners.push(
            this.renderer.listen(element, 'mouseleave', () => {
                this.toggleFloatingDayThreshold('disable');
                this.setChartInfoValues({ fact: 0, plan: 0 });
                if (this.eventListenerFn) {
                    this.positionMouse = null;
                }
            }),
            this.renderer.listen(element, 'mousemove', (event: MouseEvent) => {
                this.toggleFloatingDayThreshold('enable');
                const rect: DOMRect = element.getBoundingClientRect();
                this.positionMouse = event.clientX - rect.left;
                this.svg.select('.mouse-line').attr('x1', this.positionMouse).attr('x2', this.positionMouse);
                const formatDate = d3.timeFormat('%H:%M');
                if (this.positionMouse >= this.sizeXCoord.min && this.positionMouse <= this.sizeXCoord.max) {
                    this.setChartInfoValues(this.getValuesAtX(this.positionMouse));
                }
                this.svg
                    .select('.label-mouse')
                    .attr('x', this.positionMouse + 7)
                    .text(formatDate(this.scales.x.invert(this.positionMouse)));
            })
        );
        return () => eventListeners?.forEach((item) => item());
    }

    private getValuesAtX(xParam: number): { fact: number; plan: number } {
        return {
            fact: this.yValueForX(xParam, this.curves['fact']),
            plan: this.yValueForX(xParam, this.curves['plan']),
        };
    }

    private yValueForX(x: number, path: any): number {
        const node = path.node();
        const pathLength = node.getTotalLength();

        if (pathLength <= 0) {
            return;
        } // валидация path на пустоту

        let start = 0;
        let end = pathLength;
        let target = (start + end) / 2;

        x = Math.max(x, node.getPointAtLength(0).x);
        x = Math.min(x, node.getPointAtLength(pathLength).x);

        while (target >= start && target <= pathLength) {
            const pos = node.getPointAtLength(target);
            if (Math.abs(pos.x - x) < 0.001) {
                return this.scales.y.invert(pos.y);
            } else if (pos.x > x) {
                end = target;
            } else {
                start = target;
            }
            target = (start + end) / 2;
        }
    }

    private setChartInfoValues(values: { fact: number; plan: number }): void {
        this.planFactValues.emit(values);
    }

    private toggleFloatingDayThreshold(actionType: 'enable' | 'disable'): void {
        this.svg.select('.line__last-threshold').style('opacity', actionType === 'enable' ? 0 : 1);
        this.svg.select('.last-threshold__label').style('opacity', actionType === 'enable' ? 0 : 1);
        this.svg.select('.mouse-line').style('opacity', actionType === 'enable' ? 1 : 0);
        this.svg.select('.label-mouse').style('opacity', actionType === 'enable' ? 1 : 0);
    }
}
