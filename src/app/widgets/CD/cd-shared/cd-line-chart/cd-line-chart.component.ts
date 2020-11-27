import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

export type LineType = 'fact' | 'plan' | 'lower-border' | 'higher-border';

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
    selector: 'evj-cd-line-chart',
    templateUrl: './cd-line-chart.component.html',
    styleUrls: ['./cd-line-chart.component.scss'],
})
export class CdLineChartComponent implements OnChanges {
    @Input()
    public data: ISplineDiagramData = null;

    @Input()
    public size: ISplineDiagramSize = null;

    @Input() hoursCount: number = 8;

    public isLoading: boolean = true;

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

    public margin: { top: number; right: number; bottom: number; left: number } = {
        top: 0,
        right: 10,
        bottom: 0,
        left: 10,
    };

    private currentHour: number = 0;

    private plan: number = 0;

    private svg: any;

    private g: any = null;

    constructor(private hostElement: ElementRef) {}

    public ngOnChanges(changes: SimpleChanges): void {
        setTimeout(() => {
            // TOFIX задание координаты линии текущего часа
            this.currentHour = this.hoursCount + 1;
            this.size = changes.size?.currentValue ? changes.size?.currentValue : this.size;
            this.data = changes.data?.currentValue ? changes.data?.currentValue : this.data;
            if (this.size?.width && this.size?.height && this.data) {
                this.drawSvg();
                this.drawSvg();
            }
        }, 100);
    }

    private configChartArea(): void {
        this.sizeX.min = 1;
        this.sizeX.max = this.hoursCount + 3;
    }

    private drawSvg(): void {
        this.configChartArea();
        this.prepareData();
        // chart layout render
        this.initScale();
        this.initSvg();
        this.drawAxises();
        this.drawGrid();
        this.drawDayThreshold();
        // data render
        this.drawCurve(this.factDataset, 'fact');
        this.drawCurve(this.planDataset, 'plan');
    }

    private prepareData(): void {
        this.factDataset = this.data?.fact ? this.data.fact : [];
        this.planDataset = this.data?.plan ? this.data.plan : [];
        this.lowDataset = this.data?.lowBound ? this.data.lowBound : [];
        this.highDataset = this.data?.highBound ? this.data.highBound : [];
        this.plan = this.data && this.data.planValue ? this.data.planValue : 0;

        const [minY, maxY] = d3.extent(
            [...this.factDataset, ...this.planDataset].map((el) => el.y)
        );
        this.sizeY.min = minY - (maxY - minY) * 0.1;
        this.sizeY.max = maxY + (maxY - minY) * 0.1;
    }

    private initScale(): void {
        this.scales.x = d3
            .scaleLinear()
            .domain([this.sizeX.min, this.sizeX.max])
            .range([0, this.size.width - this.margin.right - this.margin.left]);

        this.scales.y = d3
            .scaleLinear()
            .domain([this.sizeY.min, this.sizeY.max])
            .range([this.size.height - this.margin.top - this.margin.bottom, 0]);
    }

    private initSvg(): void {
        if (this.g) {
            this.g.remove();
            this.g = null;
        }

        const viewBoxWidth = this.size.width + this.margin.right + this.margin.left;
        const viewBoxHeight = this.size.height + this.margin.top + this.margin.bottom;

        this.svg = d3.select(this.hostElement.nativeElement).select('svg');
        this.svg.attr('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
        this.g = this.svg.append('g').attr('transform', 'translate(41,0)');
    }

    private drawAxises(): void {
        // y
        this.g
            .append('g')
            .attr('transform', `translate(${-10}, 0)`)
            .attr('class', 'y-axis')
            .call(
                d3
                    .axisLeft(this.scales.y)
                    .tickSize(0)
                    .ticks(3)
                    .tickFormat(d3.format('.1f'))
            ) // форматирование до 1 знака после запятой
            .call((g) => g.select('.domain').remove());
    }

    private drawGrid(): void {
        this.g
            .append('g')
            .attr(
                'transform',
                `translate(0, ${this.size.height - this.margin.top - this.margin.bottom})`
            )
            .call(
                d3
                    .axisBottom(this.scales.x)
                    .ticks(this.sizeX.max)
                    .tickSize(1 - (this.size.height - this.margin.top - this.margin.bottom))
                    .tickFormat('')
            )
            .attr('class', 'grid');

        this.g
            .append('g')
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
        this.g
            .append('circle')
            .attr('class', className)
            .attr('r', r)
            .attr('cx', this.scales.x(x))
            .attr('cy', this.scales.y(y));
    }

    private drawCurve(dataset: { x: number; y: number }[], type: LineType): void {
        const arr: { x: number; y: number }[] = dataset.map((item) => {
            return { x: item.x, y: item.y };
        });

        if (this.hoursCount === 24) {
            dataset = arr.slice(1, this.hoursCount + 2);
        } else {
            const lastIdx: number = arr.length - 1;
            dataset = arr.slice(lastIdx - this.hoursCount);
            dataset.forEach((item, idx) => {
                item.x = idx + 1;
            });
        }

        const lineClass: string = `line line__${type}`;

        const line = d3
            .line()
            .x((d) => this.scales.x(d.x))
            .y((d) => this.scales.y(d.y));

        this.g
            .append('path')
            .datum(dataset)
            .attr('class', lineClass)
            .attr('d', line);

        dataset.forEach((data, idx) => {
            if (idx === 0) {
                return;
            }
            const circleClass =
                type === 'fact'
                    ? data.y < this.planDataset[data.x - 1].y
                        ? 'deviation'
                        : 'fact'
                    : 'plan';
            this.appendCurveDataCircle(3, data.x, data.y, `circle circle_${circleClass}`);
        });
    }

    private drawDayThreshold(): void {
        this.g
            .append('line')
            .attr('class', 'line line__threshold')
            .attr('x1', this.scales.x(this.currentHour))
            .attr('x2', this.scales.x(this.currentHour))
            .attr('y1', this.scales.y(this.sizeY.max))
            .attr('y2', this.scales.y(this.sizeY.min));
    }
}
