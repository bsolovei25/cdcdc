import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { LineType } from '../../../../../CD/cd-shared/cd-line-chart/cd-line-chart.component';
import * as d3 from 'd3';
import { dateFormatLocale, shortMonths } from '@shared/functions/universal-time-fromat.function';
import { AsyncRender } from '@shared/functions/async-render.function';

@Component({
    selector: 'evj-astue-onpz-factory-analysis-chart',
    templateUrl: './astue-onpz-factory-analysis-chart.component.html',
    styleUrls: ['./astue-onpz-factory-analysis-chart.component.scss'],
})
export class AstueOnpzFactoryAnalysisChartComponent implements OnInit {
    data: any = null;
    size: { width: number; height: number } = null;

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

    public sizeY: { min: number; max: number } = { min: 0, max: 100 };

    public margin: { top: number; right: number; bottom: number; left: number } = {
        top: 0,
        right: 0,
        bottom: 30,
        left: 59,
    };

    private currentHour: number = 0;

    private plan: number = 0;

    private svg: any;

    private g: any = null;

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.drawSvg();
    }

    constructor(private hostElement: ElementRef) {}

    ngOnInit(): void {
        this.drawSvg();
    }

    private configChartArea(): void {
        this.size = {
            width: this.hostElement.nativeElement.clientWidth,
            height: this.hostElement.nativeElement.clientHeight,
        };
    }

    @AsyncRender
    private drawSvg(): void {
        this.configChartArea();
        // this.prepareData();
        // chart layout render
        this.initScale();
        this.initSvg();
        this.drawAxises();
        this.drawGrid();
        // this.drawDayThreshold();
        // data render
        // this.drawCurve(this.factDataset, 'fact');
        // this.drawCurve(this.planDataset, 'plan');
    }

    private prepareData(): void {}

    private initScale(): void {
        this.scales.x = d3
            .scaleTime()
            .domain([new Date(1606338000000), new Date(1606338000000 + 345600000)])
            .range([0, this.size.width - this.margin.right - this.margin.left]);

        this.scales.y = d3
            .scaleLinear()
            .domain([this.sizeY.min, this.sizeY.max])
            .range([this.size.height - this.margin.top - this.margin.bottom, 0]);
    }

    private initSvg(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = null;
        }

        this.svg = d3
            .select(this.hostElement.nativeElement)
            .select('svg')
            .append('g');
        console.log(this.hostElement.nativeElement.clientHeight);
        this.svg.attr('viewBox', `0 0 ${this.size.width} ${this.size.height}`);
    }

    private drawAxises(): void {
        // y
        const axisY = this.svg
            .append('g')
            .attr('transform', `translate(${this.margin.left}, 0)`)
            .attr('class', 'y-axis')
            .call(
                d3
                    .axisLeft(this.scales.y)
                    .tickSize(0)
                    .ticks(5)
                    .tickFormat(d3.format('.1f'))
            ) // форматирование до 1 знака после запятой
            .call((g) => g.select('.domain').remove());
        axisY
            .selectAll('g.tick')
            ._groups[0][axisY.selectAll('g.tick')._groups[0].length - 1].remove();

        const axisX = this.svg
            .append('g')
            .attr(
                'transform',
                `translate(${this.margin.left}, ${this.size.height - this.margin.bottom})`
            )
            .attr('class', 'y-axis')
            .call(
                d3
                    .axisBottom(this.scales.x)
                    .ticks(24)
                    .tickFormat(dateFormatLocale())
                    .tickSizeOuter(0)
            )
            .call((g) => g.select('.domain').remove());
        axisX.select('path.domain').remove();
        axisX.selectAll('g.tick line').remove();
        axisX
            .selectAll('g.tick')
            ._groups[0][axisX.selectAll('g.tick')._groups[0].length - 1].remove();
        axisX.selectAll('g.tick')._groups[0][0].remove();
        axisX.selectAll('g.tick')._groups[0].forEach((x) => {
            shortMonths.forEach((m) => {
                if (x.getElementsByTagName('text')[0].textContent.includes(m)) {
                    console.log(x.getElementsByTagName('text')[0].textContent);
                    x.getElementsByTagName('text')[0].style.fill = 'white';
                }
            });
        });
    }

    private drawGrid(): void {
        // chart background
        this.svg
            .append('rect')
            .attr('width', this.size.width - this.margin.left - this.margin.right)
            .attr('height', this.size.height - this.margin.bottom - this.margin.top)
            .attr('transform', `translate(${this.margin.left}, 0)`)
            .attr('opacity', '.35')
            .attr('fill', '#12151');

        this.svg
            .append('g')
            .attr(
                'transform',
                `translate(${this.margin.left}, ${this.size.height -
                    this.margin.top -
                    this.margin.bottom})`
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
            .attr('r', r)
            .attr('cx', this.scales.x(x))
            .attr('cy', this.scales.y(y));
    }

    private drawCurve(dataset: { x: number; y: number }[], type: LineType): void {
        const lineClass: string = `line line__${type}`;

        const line = d3
            .line()
            .x((d) => this.scales.x(d.x))
            .y((d) => this.scales.y(d.y));

        this.svg
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
        this.svg
            .append('line')
            .attr('class', 'line line__threshold')
            .attr('x1', this.scales.x(this.currentHour))
            .attr('x2', this.scales.x(this.currentHour))
            .attr('y1', this.scales.y(this.sizeY.max))
            .attr('y2', this.scales.y(this.sizeY.min));
    }
}
