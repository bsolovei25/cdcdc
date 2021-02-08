import { Component, ElementRef, HostListener, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

export type LineType = 'fact' | 'plan';

export interface ISplineDiagramSize {
    width: number | null;
    height: number | null;
}

export interface ISplineDiagramData {
    planValue: number;
    deviationValue: number;
    fact: {
        x: number;
        y: number;
    }[];
    plan: {
        x: number;
        y: number;
    }[];
    lowBound: {
        x: number;
        y: number;
    }[];
    highBound: {
        x: number;
        y: number;
    }[];
}

@Component({
    selector: 'evj-spline-diagram',
    templateUrl: './spline-diagram.component.html',
    styleUrls: ['./spline-diagram.component.scss'],
})
export class SplineDiagramComponent implements OnChanges {
    @Input()
    public data: ISplineDiagramData = null;

    @Input()
    public currentMonth: Date = new Date();

    @ViewChild('chart')
    private chart: ElementRef;

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (this.data && this.chart) {
            this.drawSvg();
        }
    }

    public factDataset: {
        x: number;
        y: number;
    }[] = [];

    public planDataset: {
        x: number;
        y: number;
    }[] = [];

    public lowDataset: {
        x: number;
        y: number;
    }[] = [];

    public highDataset: {
        x: number;
        y: number;
    }[] = [];

    public size: { width: number | null; height: number | null } = { width: null, height: null };

    public scales: { x: any; y: any } = { x: null, y: null };

    public sizeX: { min: number; max: number } = { min: 1, max: 31 };

    public sizeY: { min: number; max: number } = { min: 0, max: 0 };

    private readonly padding: { top: number; right: number; bottom: number; left: number } = {
        top: 5,
        right: 20,
        bottom: 40,
        left: 40,
    };

    private day: number | null = null;

    private plan: number = 0;

    private svg: any = null;

    private readonly DELTA: number = 0.05;

    constructor() {}

    public ngOnChanges(changes: SimpleChanges): void {
        this.prepareData();
        if (this.data && this.chart) {
            this.drawSvg();
        }
    }

    private configChartArea(): void {
        this.sizeX.max = new Date(
            new Date(this.currentMonth).getFullYear(),
            new Date(this.currentMonth).getMonth() + 1,
            0
        ).getDate();
    }

    private drawSvg(): void {
        this.configChartArea();
        // chart layout render
        this.initScale();
        this.initSvg();
        this.drawAxises();
        this.drawGradient();
        this.drawGrid();
        // data render
        this.drawCurve(this.factDataset, 'fact');
        this.drawCurve(this.planDataset, 'plan');
        this.drawDayThreshold();
    }

    private prepareData(): void {
        this.factDataset = this.data?.fact ? this.data.fact : [];
        this.planDataset = this.data?.plan ? this.data.plan : [];
        this.lowDataset = this.data?.lowBound ? this.data.lowBound : [];
        this.highDataset = this.data?.highBound ? this.data.highBound : [];

        this.plan = this.data && this.data.planValue ? this.data.planValue : 0;

        if (this.factDataset.length && this.planDataset.length) {
            [this.sizeY.min, this.sizeY.max] = d3.extent(
                [...this.factDataset, ...this.planDataset].map((item) => item.y)
            );
            this.sizeY.min -= (this.sizeY.max - this.sizeY.min) * this.DELTA;
            this.sizeY.max += (this.sizeY.max - this.sizeY.min) * this.DELTA;
            this.day = d3.max(this.factDataset.map((item) => item.x));
        }
    }

    private initScale(): void {
        this.size = {
            width: this.chart.nativeElement.clientWidth,
            height: this.chart.nativeElement.clientHeight,
        };

        this.scales.x = d3
            .scaleLinear()
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
            .attr('transform', `translate(0, ${this.size.height - this.padding.bottom + 20})`)
            .attr('class', 'x-axis')
            .call(d3.axisBottom(this.scales.x).tickSize(0).ticks(this.sizeX.max))
            .call((g) => g.select('.domain').remove());

        this.svg.selectAll('.x-axis text').attr('class', (d, g) => {
            return g === this.day - 1 ? 'white' : 'gray';
        });

        // y
        this.svg
            .append('g')
            .attr('transform', `translate(${this.padding.left}, 0)`)
            .attr('class', 'y-axis')
            .call(d3.axisLeft(this.scales.y).tickSize(0).ticks(7).tickFormat(d3.format('.1f'))) // форматирование до 1 знака после запятой
            .call((g) => g.select('.domain').remove());
    }

    private drawGrid(): void {
        this.svg
            .append('g')
            .attr('transform', `translate(0, ${this.size.height - this.padding.bottom})`)
            .call(
                d3
                    .axisBottom(this.scales.x)
                    .ticks(this.sizeX.max)
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
                    .ticks(7)
                    .tickSize(1 - (this.size.width - this.padding.left - this.padding.right))
                    .tickFormat('')
            )
            .attr('class', 'grid');
    }

    private appendPlanThresholdCircle(r: number, coord: { x: number; y: number }, className: string): void {
        this.svg
            .append('circle')
            .attr('r', r)
            .attr('cx', this.scales.x(coord.x))
            .attr('cy', this.scales.y(coord.y))
            .attr('class', className);
    }

    private appendCurveDataCircle(r: number, x: number, y: number, className: string): void {
        this.svg
            .append('circle')
            .attr('class', className)
            .attr('r', r)
            .attr('cx', this.scales.x(x))
            .attr('cy', this.scales.y(y));
    }

    private drawCurve(dataset: { x: number; y: number }[], type: LineType): void {
        const lineClass: string = type === 'fact' ? 'data-curve' : 'plan-threshold-line-filled';

        const line = d3
            .line()
            .x((d) => this.scales.x(d.x))
            .y((d) => this.scales.y(d.y))
            .curve(d3.curveMonotoneX);

        if (type === 'fact') {
            this.svg.append('path').datum(dataset).attr('class', lineClass).attr('d', line);
        } else if (type === 'plan') {
            const currentDataset = dataset.filter((el) => el.x <= this.day);
            const futureDataset = dataset.filter((el) => el.x >= this.day);
            this.svg.append('path').datum(currentDataset).attr('class', lineClass).attr('d', line);
            this.svg.append('path').datum(futureDataset).attr('class', 'plan-threshold-line-rest').attr('d', line);
        }

        dataset.forEach((data, idx) => {
            if (type === 'fact') {
                this.svg
                    .append('line')
                    .attr('class', 'bound-line')
                    .attr('x1', this.scales.x(data.x))
                    .attr('x2', this.scales.x(data.x))
                    .attr('y1', this.scales.y(data.y))
                    .attr('y2', this.scales.y(this.planDataset.find((el) => el.x === data.x).y));

                if (data.y > this.planDataset[data.x - 1].y) {
                    this.appendCurveDataCircle(2, data.x, data.y, 'curve-value-circle-high');

                    this.svg
                        .append('rect')
                        .attr('class', 'curve-value-rect-high')
                        .attr('x', this.scales.x(data.x) - 3)
                        .attr('y', this.scales.y(data.y) - 3)
                        .attr('width', 6)
                        .attr('height', 6);
                } else {
                    this.appendCurveDataCircle(2, data.x, data.y, 'curve-value-circle-low');
                    this.appendCurveDataCircle(4, data.x, data.y, 'curve-value-rect-low');
                }
            } else if (type === 'plan') {
                this.appendPlanThresholdCircle(1.5, data, 'plan-threshold-circle-inner');
                if (idx + 1 <= this.day) {
                    this.appendPlanThresholdCircle(3, data, 'plan-threshold-circle-outer');
                }
            }
        });
    }

    private drawGradient(): void {
        const lg = this.svg
            .append('defs')
            .append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%');

        lg.append('stop').attr('offset', '0%').attr('class', 'gradient-stop-1');

        lg.append('stop').attr('offset', '100%').attr('class', 'gradient-stop-2');

        const area = d3
            .area()
            .x((d) => this.scales.x(d.x))
            .y1((d) => this.scales.y(d.planY))
            .y0((d) => this.scales.y(d.factY));

        const areaToHide = d3
            .area()
            .x((d) => this.scales.x(d.x))
            .y1((d) => this.scales.y(d.factY))
            .y0(this.scales.y(this.sizeY.max));

        const fact = [...new Map(this.factDataset.map((item) => [item.x, item])).values()];
        const plan = [...new Map(this.planDataset.map((item) => [item.x, item])).values()];

        const dataset = [];
        fact.forEach((factItem) => {
            const planItem = plan.find((p) => p.x === factItem.x);
            dataset.push({
                x: factItem.x,
                factY: factItem.y,
                planY: planItem.y,
            });
        });

        this.svg.append('path').datum(dataset).attr('class', 'data-area').attr('d', area);

        this.svg.append('path').datum(dataset).attr('class', 'data-area-hide').attr('d', areaToHide);
    }

    private drawDayThreshold(): void {
        const displayedMonth = new Date(this.currentMonth).getMonth();
        const currentMonth = new Date().getMonth();
        if (displayedMonth !== currentMonth) {
            return;
        }
        this.svg
            .append('line')
            .attr('class', 'day-threshold-line')
            .attr('x1', this.scales.x(this.day))
            .attr('x2', this.scales.x(this.day))
            .attr('y1', this.scales.y(this.sizeY.max))
            .attr('y2', this.scales.y(this.sizeY.min));

        this.appendThresholdCircles(this.scales.y(this.sizeY.min));
        this.appendThresholdCircles(this.scales.y(this.sizeY.max));
    }

    private appendThresholdCircles(cy: number): void {
        this.svg
            .append('circle')
            .attr('r', 1)
            .attr('cx', this.scales.x(this.day))
            .attr('cy', cy)
            .attr('class', 'day-threshold-circle');
    }
}
