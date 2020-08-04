import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

export type LineType = 'fact' | 'plan';

export interface ISplineDiagramSize {
    width: number | null;
    height: number | null;
}

export interface ISplineDiagramData {
    planValue: number;
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
    styleUrls: ['./spline-diagram.component.scss']
})
export class SplineDiagramComponent implements OnChanges {
    @Input()
    public data: ISplineDiagramData = null;

    @Input()
    public size: ISplineDiagramSize = null;

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

    public scales: { x: any; y: any } = { x: null, y: null };

    public sizeX: { min: number; max: number } = { min: 1, max: 31 };

    public sizeY: { min: number; max: number } = { min: 0, max: 0 };

    public margin: { top: number, right: number, bottom: number, left: number } =
        { top: 20, right: 20, bottom: 30, left: 10 };

    private day: number = 0;

    private plan: number = 0;

    private svg: any;

    private g: any;

    constructor(
        private hostElement: ElementRef
    ) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        this.size = changes.size?.currentValue ? changes.size?.currentValue : this.size;
        this.data = changes.data?.currentValue ? changes.data?.currentValue : this.data;
        if (this.size?.width && this.size?.height && this.data) {
            this.drawSvg();
            setTimeout(() => this.drawSvg(), 100);
        }
    }

    private configChartArea(): void {
        this.sizeX.max =
            new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 0).getDate();
    }

    private drawSvg(): void {
        this.configChartArea();
        // chart layout render
        this.initScale();
        this.initSvg();
        this.drawAxises();
        this.drawGrid();
        // data render
        this.prepareData();
        // this.drawPlanThreshold();
        // this.drawCurve();
        this.drawCurve(this.factDataset, 'fact');
        this.drawCurve(this.planDataset, 'plan');
        // this.drawGradient();
        this.drawDayThreshold();
    }

    private prepareData(): void {
        this.factDataset = this.data?.fact ? this.data.fact : [];
        this.planDataset = this.data?.plan ? this.data.plan : [];
        this.lowDataset = this.data?.lowBound ? this.data.lowBound : [];
        this.highDataset = this.data?.highBound ? this.data.highBound : [];

        this.plan = this.data && this.data.planValue ? this.data.planValue : 0;

        let maxX = 0;
        let maxY = 0;
        let minY = 0;

        [...this.factDataset, ...this.planDataset].forEach(item => {
            maxY = item.y >= maxY ? item.y : maxY === 0 ? item.y : maxY;
            minY = item.y <= minY ? item.y : minY === 0 ? item.y : minY;
        });
        this.factDataset.forEach(item => {
            maxX = item.x >= maxX ? item.x : maxX === 0 ? item.x : maxX;
        });

        this.day = maxX;
        this.sizeY.min = minY - 1;
        this.sizeY.max = maxY + 1;
    }

    private initScale(): void {
        this.scales.x = d3.scaleLinear()
            .domain([this.sizeX.min, this.sizeX.max])
            .range([0, this.size.width - this.margin.right - this.margin.left]);

        this.scales.y = d3.scaleLinear()
            .domain([this.sizeY.min, this.sizeY.max])
            .range([this.size.height - this.margin.top - this.margin.bottom, 0]);
    }

    private initSvg(): void {
        if (this.g) {
            this.g.remove();
            this.g = undefined;
        }

        const viewBoxWidth = this.size.width + this.margin.right + this.margin.left;
        const viewBoxHeight = this.size.height + this.margin.top + this.margin.bottom;

        this.svg = d3.select(this.hostElement.nativeElement).select('svg');
        this.svg.attr('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
        this.g = this.svg.append('g').attr('transform', 'translate(40,30)');
    }

    private drawAxises(): void {
        // x
        this.g.append('g')
            .attr('transform', `translate(0, ${this.size.height - this.margin.top - this.margin.bottom + 18})`) // 18 - дополнительный отступ
            .attr('class', 'x-axis')
            .call(d3.axisBottom(this.scales.x).tickSize(0).ticks(this.sizeX.max))
            .call(g => g.select('.domain').remove());

        this.g.selectAll('.x-axis text')
            .attr('class', (d, g) => {
                return g === this.day - 1 ? 'white' : 'gray';
            });

        // y
        this.g.append('g')
            .attr('transform', `translate(${-10}, 0)`)
            .attr('class', 'y-axis')
            .call(d3.axisLeft(this.scales.y).tickSize(0).ticks(7).tickFormat(d3.format('.1f'))) // форматирование до 1 знака после запятой
            .call(g => g.select('.domain').remove());
    }

    private drawGrid(): void {
        this.g.append('g')
            .attr('transform', `translate(0, ${this.size.height - this.margin.top - this.margin.bottom})`)
            .call(d3.axisBottom(this.scales.x)
                .ticks(this.sizeX.max)
                .tickSize(1 - (this.size.height - this.margin.top - this.margin.bottom))
                .tickFormat('')
            )
            .attr('class', 'grid');

        this.g.append('g')
            .call(d3.axisLeft(this.scales.y)
                .ticks(7)
                .tickSize(1 - (this.size.width - this.margin.left - this.margin.right))
                .tickFormat('')
            )
            .attr('class', 'grid');
    }

    private appendPlanThreshold(x1: number, x2: number, className: string): void {
        this.g.append('line')
            .attr('x1', this.scales.x(x1))
            .attr('x2', this.scales.x(x2))
            .attr('y1', this.scales.y(this.plan))
            .attr('y2', this.scales.y(this.plan))
            .attr('class', className);
    }

    // old
    private appendPlanThresholdCircles(r: number, coord: number, className: string): void {
        this.g.append('circle')
            .attr('r', r)
            .attr('cx', this.scales.x(coord))
            .attr('cy', this.scales.y(this.plan))
            .attr('class', className);
    }

    private appendPlanThresholdCircle(r: number, coord: { x: number, y: number }, className: string): void {
        this.g.append('circle')
            .attr('r', r)
            .attr('cx', this.scales.x(coord.x))
            .attr('cy', this.scales.y(coord.y))
            .attr('class', className);
    }

    // old
    private drawPlanThreshold(): void {
        this.appendPlanThreshold(1, this.day, 'plan-threshold-line-filled');
        this.appendPlanThreshold(this.day, this.sizeX.max, 'plan-threshold-line-rest');
        let i = 0;
        while (i < this.sizeX.max) {
            i++;
            this.appendPlanThresholdCircles(1.5, i, 'plan-threshold-circle-inner');
            if (i < this.day) {
                this.appendPlanThresholdCircles(3, i, 'plan-threshold-circle-outer');
            }
        }
    }

    private appendCurveDataCircle(r: number, x: number, y: number, className: string): void {
        this.g.append('circle')
            .attr('class', className)
            .attr('r', r)
            .attr('cx', this.scales.x(x))
            .attr('cy', this.scales.y(y));
    }

    private drawCurve(dataset: { x: number; y: number }[], type: LineType): void {
        const lineClass: string = type === 'fact' ? 'data-curve' : 'plan-threshold-line-filled';

        const line = d3.line()
            .x((d) => this.scales.x(d.x))
            .y((d) => this.scales.y(d.y))
            .curve(d3.curveMonotoneX);

        if (type === 'fact') {
            this.g.append('path')
                .datum(dataset)
                .attr('class', lineClass)
                .attr('d', line);
        } else if (type === 'plan') {
            const currentDataset = dataset.filter((el) => el.x <= this.day);
            const futureDataset = dataset.filter((el) => el.x >= this.day);
            this.g.append('path')
                .datum(currentDataset)
                .attr('class', lineClass)
                .attr('d', line);
            this.g.append('path')
                .datum(futureDataset)
                .attr('class', 'plan-threshold-line-rest')
                .attr('d', line);
        }


        dataset.forEach((data, idx) => {
            if (type === 'fact') {
                this.g.append('line')
                    .attr('class', 'bound-line')
                    .attr('x1', this.scales.x(data.x))
                    .attr('x2', this.scales.x(data.x))
                    .attr('y1', this.scales.y(data.y))
                    .attr('y2', this.scales.y(this.planDataset.find((el) => el.x === data.x).y));

                if (data.y > this.highDataset[data.x - 1].y || data.y < this.lowDataset[data.x - 1].y) {
                    this.appendCurveDataCircle(2, data.x, data.y, 'curve-value-circle-high');

                    this.g.append('rect')
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
                if ((idx + 1) <= this.day) {
                    this.appendPlanThresholdCircle(3, data, 'plan-threshold-circle-outer');
                }
            }
        });
    }

    // TODO неправильно работает градиент (необходимо разбивать на области)
    private drawGradient(): void {
        const lg = this.g.append('defs').append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%');

        lg.append('stop')
            .attr('offset', '0%')
            .attr('class', 'gradient-stop-1');

        lg.append('stop')
            .attr('offset', '100%')
            .attr('class', 'gradient-stop-2');

        const area = d3.area()
            .x((d) => this.scales.x(d.x))
            .y1((d) => this.scales.y(d.y))
            .y0(this.scales.y(this.plan));

        const newDataSet = [];
        this.factDataset.forEach(item => {
            if (item.y > this.plan) {
                newDataSet.push(item);
            }
        });

        this.g.append('path')
            .datum(newDataSet)
            .attr('class', 'data-area-high')
            .attr('d', area);
    }

    private drawDayThreshold(): void {
        this.g.append('line')
            .attr('class', 'day-threshold-line')
            .attr('x1', this.scales.x(this.day))
            .attr('x2', this.scales.x(this.day))
            .attr('y1', this.scales.y(this.sizeY.max))
            .attr('y2', this.scales.y(this.sizeY.min));

        this.appendThresholdCircles(this.scales.y(this.sizeY.min));
        this.appendThresholdCircles(this.scales.y(this.sizeY.max));
    }

    private appendThresholdCircles(cy: number): void {
        this.g.append('circle')
            .attr('r', 1)
            .attr('cx', this.scales.x(this.day))
            .attr('cy', cy)
            .attr('class', 'day-threshold-circle');
    }
}
