import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
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
import { IChartD3 } from '@shared/models/smart-scroll.model';

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

    public scales: { x: any; y: any } = { x: null, y: null };

    public sizeX: { min: number; max: number } = { min: 1, max: 31 };

    public sizeY: { min: number; max: number } = { min: 0, max: 100 };

    public margin: { top: number; right: number; bottom: number; left: number } = {
        top: 0,
        right: 0,
        bottom: 30,
        left: 59,
    };

    private svg: any;

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.drawSvg();
    }

    constructor(private hostElement: ElementRef) {}

    ngOnInit(): void {
        this.drawSvg();
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
    }

    private prepareData(): void {
        this.planDataset = DATA_SOURCE_PLAN;
        this.factDataset = DATA_SOURCE_FACT;
        this.lowDataset = DATA_SOURCE_LOWER_BORDER;
        this.highDataset = DATA_SOURCE_HIGHER_BORDER;
    }

    private configChartArea(): void {
        this.size = {
            width: this.hostElement.nativeElement.clientWidth,
            height: this.hostElement.nativeElement.clientHeight,
        };
    }

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
        this.svg.attr('viewBox', `0 0 ${this.size.width} ${this.size.height}`);
    }

    private drawAxises(): void {
        const drawAxis = (type: 'x' | 'y', axisTemplate) => {
            const axis = this.svg
                .append('g')
                .attr(
                    'transform',
                    `translate(${this.margin.left},  ${
                        type === 'x' ? this.size.height - this.margin.bottom : 0
                    })`
                )
                .attr('class', 'y-axis')
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
            axis.selectAll('g.tick')._groups[0][
                axis.selectAll('g.tick')._groups[0].length - 1
            ].remove();

            if (type === 'x') {
                axis.selectAll('g.tick')._groups[0][0].remove();
                axis.selectAll('g.tick')._groups[0].forEach((x) => {
                    shortMonths.forEach((m) => {
                        if (x.getElementsByTagName('text')[0].textContent.includes(m)) {
                            x.getElementsByTagName('text')[0].style.fill = 'white';
                        }
                    });
                });
            }
        };

        drawAxis('x', d3.axisBottom(this.scales.x));
        drawAxis('y', d3.axisLeft(this.scales.y));
    }

    private drawGrid(): void {
        this.svg
            .append('rect')
            .attr('width', this.size.width - this.margin.left - this.margin.right)
            .attr('height', this.size.height - this.margin.bottom - this.margin.top)
            .attr('transform', `translate(${this.margin.left}, 0)`)
            .attr('opacity', '.25')
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
            .attr('fill', 'red')
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

        this.svg
            .append('path')
            .datum(dataset)
            .attr('class', lineClass)
            .attr('d', line)
            .attr('transform', `translate(${this.margin.left}, 0)`);

        if (type === 'fact') {
            dataset.forEach((d, idx) => {
                if (idx === 0) {
                    return;
                }
                this.appendCurveDataCircle(2, this.scales.x(d.x), this.scales.y(d.y), 'circle');
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
        const xArr = this.getBorderCoords(
            new Date(1606338000000),
            new Date(1606338000000 + 345600000)
        );
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
                .attr(
                    'd',
                    `M ${x - 4} ${topOffset} L ${x + 4} ${topOffset} L ${x} ${topOffset - 4} z`
                )
                .attr('fill', 'var(--color-cd-bg-border-sub)');
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
}
