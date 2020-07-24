import {Component, OnInit, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as d3 from 'd3';

export interface ISplineDiagramSize {
    width: number | null;
    height: number | null;
}

export interface ISplineDiagramData {
    plan: number;
    chart: {
        x: number;
        y: number;
    }[];
}

@Component({
    selector: 'evj-spline-diagram',
    templateUrl: './spline-diagram.component.html',
    styleUrls: ['./spline-diagram.component.scss'],
})
export class SplineDiagramComponent implements OnInit, OnChanges {
    @Input()
    public data: ISplineDiagramData;

    @Input()
    public size: ISplineDiagramSize;

    public dataset: {
        x: number;
        y: number;
    }[] = [];

    public scales: { x: any; y: any } = {x: null, y: null};

    public sizeX: { min: number; max: number } = {min: 1, max: 31};

    public sizeY: { min: number; max: number } = {min: 0, max: 0};

    public margin: { top: number, right: number, bottom: number, left: number } =
        {top: 20, right: 20, bottom: 30, left: 10};

    private day: number = 0;

    private plan: number = 0;

    private svg: any;

    private g: any;

    private colors: any = {
        white: '#FFFFFF',
        grey1: '#5B607D',
        grey2: '#8C99B2',
        grey3: '#616580',
        grey4: 'rgba(33, 36, 45, 0.1)',
        blue: '#A2E2FF',
        orange: '#F4A321',
    };

    constructor(
        private hostElement: ElementRef,
    ) {
    }

    public ngOnInit(): void {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.data && changes.data.currentValue) {
            this.data = changes.data.currentValue;
            this.drawSvg();
        }
        if (changes.size && changes.size.currentValue) {
            this.size = changes.size.currentValue;
            this.drawSvg();
        }
    }

    private drawSvg(): void {
        // chart layout render
        this.initScale();
        this.initSvg();
        this.drawAxises();
        this.drawGrid();
        // data render
        this.prepareData();
        this.drawPlanThreshold();
        this.drawCurve();
        this.drawGradient();
        this.drawDayThreshold();
    }

    private prepareData(): void {
        this.dataset = this.data && this.data.chart ? this.data.chart : [];
        this.plan = this.data && this.data.plan ? this.data.plan : 0;

        let maxX = 0;
        let maxY = 0;
        let minY = 0;

        this.dataset.forEach(item => {
            maxX = item.x >= maxX ? item.x : maxX === 0 ? item.x : maxX;
            maxY = item.y >= maxY ? item.y : maxY === 0 ? item.y : maxY;
            minY = item.y <= minY ? item.y : minY === 0 ? item.y : minY;
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

        this.svg = d3.select(this.hostElement.nativeElement).select('svg');
        this.svg.attr('viewBox', `0 0 ${this.size.width + this.margin.right + this.margin.left} ${this.size.height + this.margin.top + this.margin.bottom}`);
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
            .style('font-size', '11px')
            .style('fill', (d, g) => {
                return g === this.day - 1 ? this.colors.white : this.colors.grey1;
            });

        // y
        this.g.append('g')
            .attr('transform', `translate(${-10}, 0)`)
            .attr('class', 'y-axis')
            .call(d3.axisLeft(this.scales.y).tickSize(0).ticks(7).tickFormat(d3.format('.1f')))
            .call(g => g.select('.domain').remove());

        this.g.selectAll('.y-axis text')
            .style('fill', this.colors.grey2)
            .style('font-size', '10px');
    }

    private drawGrid(): void {
        const strokeWidth = 0.5;
        const opacity = 0.1;

        this.g.append('g')
            .attr('transform', `translate(0, ${this.size.height - this.margin.top - this.margin.bottom})`)
            .call(d3.axisBottom(this.scales.x)
                .ticks(this.sizeX.max)
                .tickSize(-(this.size.height - this.margin.top - this.margin.bottom))
                .tickFormat('')
            )
            .style('color', this.colors.grey3)
            .style('stroke-width', strokeWidth)
            .style('opacity', opacity);

        this.g.append('g')
            .call(d3.axisLeft(this.scales.y)
                .ticks(7)
                .tickSize(-(this.size.width - this.margin.left - this.margin.right))
                .tickFormat('')
            )
            .style('color', this.colors.grey3)
            .style('stroke-width', strokeWidth)
            .style('opacity', opacity);

        this.g.selectAll('.grid path')
            .style('fill', this.colors.grey4);
    }

    private appendPlanThreshold(x1: number, x2: number, stroke: number): void {
        this.g.append('line')
            .attr('x1', this.scales.x(x1))
            .attr('x2', this.scales.x(x2))
            .attr('y1', this.scales.y(this.plan))
            .attr('y2', this.scales.y(this.plan))
            .style('stroke', this.colors.blue)
            .style('stroke-width', stroke);
    }

    private drawPlanThreshold(): void {
        this.appendPlanThreshold(1, this.day, 1);
        this.appendPlanThreshold(this.day, this.sizeX.max, 0.5);

        let i = 0;
        while (i < this.day) {
            i++;
            this.g.append('circle')
                .attr('r', 3)
                .attr('cx', this.scales.x(i))
                .attr('cy', this.scales.y(this.plan))
                .style('stroke', this.colors.blue)
                .style('fill', 'transparent');
        }

        i = 0;
        while (i < this.sizeX.max) {
            i++;
            this.g.append('circle')
                .attr('r', 1.5)
                .attr('cx', this.scales.x(i))
                .attr('cy', this.scales.y(this.plan))
                .style('fill', this.colors.blue);
        }
    }

    private drawCurve(): void {
        const line = d3.line()
            .x((d) => this.scales.x(d.x))
            .y((d) => this.scales.y(d.y))
            .curve(d3.curveMonotoneX);

        this.g.append('path')
            .datum(this.dataset)
            .attr('class', 'line')
            .style('stroke', this.colors.white)
            .style('stroke-width', 0.5)
            .style('fill', 'none')
            .attr('d', line);

        this.dataset.forEach(data => {
            this.g.append('line')
                .attr('x1', this.scales.x(data.x))
                .attr('x2', this.scales.x(data.x))
                .attr('y1', this.scales.y(data.y))
                .attr('y2', this.scales.y(this.plan))
                .style('stroke', this.colors.white)
                .style('stroke-width', 0.2);

            if (data.y > this.plan) {
                this.g.append('circle')
                    .attr('r', 2)
                    .attr('cx', this.scales.x(data.x))
                    .attr('cy', this.scales.y(data.y))
                    .style('fill', this.colors.orange);

                this.g.append('rect')
                    .attr('x', this.scales.x(data.x) - 3)
                    .attr('y', this.scales.y(data.y) - 3)
                    .attr('width', 6)
                    .attr('height', 6)
                    .style('fill', 'transparent')
                    .style('stroke', this.colors.orange);
            } else {
                this.g.append('circle')
                    .attr('r', 2)
                    .attr('cx', this.scales.x(data.x))
                    .attr('cy', this.scales.y(data.y))
                    .style('fill', this.colors.white);

                this.g.append('circle')
                    .attr('r', 4)
                    .attr('cx', this.scales.x(data.x))
                    .attr('cy', this.scales.y(data.y))
                    .style('fill', 'transparent')
                    .style('stroke', this.colors.blue);
            }
        });
    }

    private drawGradient(): void {
        const lg = this.g.append('defs').append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%');

        lg.append('stop')
            .attr('offset', '0%')
            .style('stop-color', this.colors.orange)
            .style('stop-opacity', 0.5);

        lg.append('stop')
            .attr('offset', '100%')
            .style('stop-color', 'transparent')
            .style('stop-opacity', 0);

        const area = d3.area()
            .x((d) => this.scales.x(d.x))
            .y1((d) => this.scales.y(d.y))
            .y0(this.scales.y(this.plan));

        const newDataSet = [];
        this.dataset.forEach(item => {
            if (item.y > this.plan) {
                newDataSet.push(item);
            }
        });

        this.g.append('path')
            .datum(newDataSet)
            .attr('class', 'area')
            .attr('d', area)
            .style('fill', 'url(#gradient)');
    }

    private drawDayThreshold(): void {
        this.g.append('line')
            .attr('x1', this.scales.x(this.day))
            .attr('x2', this.scales.x(this.day))
            .attr('y1', this.scales.y(this.sizeY.max))
            .attr('y2', this.scales.y(this.sizeY.min))
            .style('stroke', this.colors.white)
            .style('stroke-width', 0.25);

        this.appendThresholdCircles(this.scales.y(this.sizeY.min));
        this.appendThresholdCircles(this.scales.y(this.sizeY.max));
    }

    private appendThresholdCircles(cy: number): void {
        this.g.append('circle')
            .attr('r', 1)
            .attr('cx', this.scales.x(this.day))
            .attr('cy', cy)
            .style('fill', this.colors.white);
    }
}
