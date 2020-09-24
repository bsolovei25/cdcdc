import {
    Component,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import * as d3 from 'd3';
import { AsyncRender } from '@shared/functions/async-render.function';

export type LineType = 'fact' | 'plan';

export interface IDeviationDiagramData {
    day: number;
    planValue: number;
    factValue: number;
}

@Component({
    selector: 'evj-kpe-deviation-diagram',
    templateUrl: './kpe-deviation-diagram.component.html',
    styleUrls: ['./kpe-deviation-diagram.component.scss']
})
export class KpeDeviationDiagramComponent implements OnChanges {
    @Input()
    public data: IDeviationDiagramData[] = [];

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

    public size: { width: number | null; height: number | null; } = { width: null, height: null };

    public scales: { x: any; y: any } = { x: null, y: null };

    public sizeX: { min: number; max: number } = { min: 1, max: 31 };

    public sizeY: { min: number; max: number } = { min: 0, max: 0 };

    private readonly padding: { top: number, right: number, bottom: number, left: number } =
        { top: 10, right: 5, bottom: 20, left: 27 };

    private day: number | null = null;

    private svg: any = null;


    public ngOnChanges(changes: SimpleChanges): void {
        this.drawSvg();
    }

    private configChartArea(): void {
        this.sizeX.max =
            new Date((new Date(this.currentMonth)).getFullYear(), (new Date(this.currentMonth)).getMonth() + 1, 0).getDate();
    }

    @AsyncRender
    private drawSvg(): void {
        this.configChartArea();
        this.prepareData();
        this.initScale();
        this.initSvg();
        this.drawAxises();
        this.drawGrid();
        this.drawRectLeft();
        this.drawCurve(this.planDataset, 'plan-curve');
        this.drawCurve(this.factDataset, 'fact-curve');
        this.drawDayThreshold();
        this.drawDeviations();
    }

    private prepareData(): void {
        this.factDataset = [];
        this.planDataset = [];

        this.data.forEach(item => {
            if (item.factValue !== 0) {
                this.factDataset.push({x: item.day, y: item.factValue});
            }
            this.planDataset.push({x: item.day, y: item.planValue});
        });

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
        this.sizeY.min = minY - 0.5;
        this.sizeY.max = maxY + 0.5;

        this.planDataset.splice(-(this.planDataset.length - this.sizeX.max));
    }

    private drawRectLeft(): void {
        this.svg.append('rect')
            .attr('x', this.scales.x(this.day))
            .attr('y', this.scales.y(this.sizeY.max))
            .attr('width', this.scales.x(this.sizeX.max) - this.scales.x(this.day))
            .attr('height', this.scales.y(this.sizeY.min) - this.scales.y(this.sizeY.max) - 0.5)
            .attr('class', 'rect-left');
    }

    private initScale(): void {
        this.size = {
            width: this.chart.nativeElement.clientWidth,
            height: this.chart.nativeElement.clientHeight
        };

        this.scales.x = d3.scaleLinear()
            .domain([this.sizeX.min, this.sizeX.max])
            .range([this.padding.left, this.size.width - this.padding.right]);

        this.scales.y = d3.scaleLinear()
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
        this.svg.append('g')
            .attr('transform', `translate(0, ${this.size.height - this.padding.bottom + 5})`) // 5 - дополнительный отступ
            .attr('class', 'x-axis')
            .call(
                d3.axisBottom(this.scales.x)
                    .tickSize(0)
                    .ticks(8)
                    .tickValues([
                        1, 5, 10, 15, 20, 25, this.sizeX.max
                    ])
            )
            .call(g => g.select('.domain').remove());

        // y
        this.svg.append('g')
            .attr('transform', `translate(${this.padding.left}, 0)`)
            .attr('class', 'y-axis')
            .call(d3.axisLeft(this.scales.y).tickSize(0).ticks(3))
            .call(g => g.select('.domain').remove());
    }

    private drawGrid(): void {
        this.svg.append('g')
            .attr('transform', `translate(0, ${this.size.height - this.padding.bottom})`)
            .call(d3.axisBottom(this.scales.x)
                .ticks(31)
                .tickSize(1 - (this.size.height - this.padding.bottom - this.padding.top))
                .tickFormat('')
            )
            .attr('class', 'grid');

        this.svg.append('g')
            .attr('transform', `translate(${this.padding.left}, 0)`)
            .call(d3.axisLeft(this.scales.y)
                .ticks(4)
                .tickSize(1 - (this.size.width - this.padding.left - this.padding.right))
                .tickFormat('')
            )
            .attr('class', 'grid');
    }

    private appendCircle(r: number, x: number, y: number, className: string): void {
        this.svg.append('circle')
            .attr('class', className)
            .attr('r', r)
            .attr('cx', this.scales.x(x))
            .attr('cy', this.scales.y(y));
    }

    private appendLine(x1: number, x2: number, y1: number, y2: number, className: string): void {
        this.svg.append('line')
            .attr('class', className)
            .attr('x1', this.scales.x(x1))
            .attr('x2', this.scales.x(x2))
            .attr('y1', this.scales.y(y1))
            .attr('y2', this.scales.y(y2));
    }

    private drawCurve(dataset: {x: number, y: number}[], className: string): void {
        const line = d3.line()
            .x((d) => this.scales.x(d.x))
            .y((d) => this.scales.y(d.y))
            .curve(d3.curveLinear);

        this.svg.append('path')
            .datum(dataset)
            .attr('class', className)
            .attr('d', line);
    }

    private drawDayThreshold(): void {
        this.appendLine(
            this.day,
            this.day,
            this.sizeY.max,
            this.sizeY.min,
            'day-threshold-line',
        );

        const dayFact = this.factDataset.find(item => item.x === this.day);

        this.appendCircle(8, this.day, dayFact?.y, 'day-circle-1');
        this.appendCircle(4, this.day, dayFact?.y, 'day-circle-2');
        this.appendCircle(2, this.day, dayFact?.y, 'day-circle-3');
        this.appendCircle(1, this.day, dayFact?.y, 'day-circle-4');
    }

    private drawDeviations(): void {
        this.data.forEach(item => {
            if (item.factValue !== item.planValue && item.factValue !== 0) {
                this.appendLine(
                    item.day,
                    item.day,
                    item.planValue,
                    item.factValue,
                    'deviation-line',
                );

                this.appendCircle(3, item.day, item.planValue, 'deviation-circle');
                this.appendCircle(3, item.day, item.factValue, 'deviation-circle');
            }
        });
    }
}
