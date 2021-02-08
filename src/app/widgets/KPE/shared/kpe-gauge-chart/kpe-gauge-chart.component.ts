import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';
import * as d3 from 'd3';
import { AsyncRender } from '@shared/functions/async-render.function';

@Component({
    selector: 'evj-kpe-gauge-chart',
    templateUrl: './kpe-gauge-chart.component.html',
    styleUrls: ['./kpe-gauge-chart.component.scss'],
})
export class KpeGaugeChartComponent implements OnInit, OnChanges {
    private readonly defaultImg: string = '';
    private readonly diagramCounter: number = 100;
    private readonly tickDensity: number = 80 / this.diagramCounter;

    @ViewChild('chart') chart: ElementRef;

    @Input() fact: number = 0;
    @Input() plan: number = 0;
    @Input() deviation: number = 0;
    @Input() noDeviation: boolean = false;
    @Input() img: string = this.defaultImg;
    @Input() background: 'lite' | 'dark' | 'sou' = 'lite';
    @Input() isPercent: boolean = false;

    public ngOnInit(): void {
        this.chartInit();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.chartInit();
    }

    private chartInit(): void {
        this.dataHandler();
        const mainValue =
            this.fact > this.plan
                ? (this.plan / this.fact) * this.diagramCounter
                : (this.fact / this.plan) * this.diagramCounter;
        const subValue = this.diagramCounter - mainValue;
        this.bindChart(mainValue, subValue);
    }

    private dataHandler(): void {
        this.img = this.img?.length > 0 ? this.img : this.defaultImg;
    }

    private getTick(percent: number): number {
        return this.tickDensity * percent;
    }

    @AsyncRender
    private bindChart(mainValue: number, subValue: number): void {
        const tickMain = this.getTick(mainValue);
        const tickSub = this.getTick(subValue);

        const width = 75;
        const height = 75;
        const diagramWidth = 7;

        const outerRadius = width / 2 - 2;
        const innerRadius = outerRadius - diagramWidth;

        function createPie(startAngel: number, endAngel: number): d3.Pie {
            return d3
                .pie()
                .startAngle(startAngel)
                .endAngle(endAngel)
                .value(1);
        }

        const backPie = createPie((-3 * Math.PI) / 4, (3 * Math.PI) / 4);
        const mainPie = createPie(
            (-3 * Math.PI) / 4,
            (1.5 * Math.PI * mainValue) / this.diagramCounter - (3 * Math.PI) / 4
        );
        const subPie = createPie(
            (1.5 * Math.PI * mainValue) / this.diagramCounter - (3 * Math.PI) / 4,
            (3 * Math.PI) / 4
        );

        const arc: d3.Arc = d3
            .arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius)
            .padAngle(0.025);

        const backArc: d3.Arc = d3
            .arc()
            .outerRadius(outerRadius + 1.5)
            .innerRadius(innerRadius - 1.5);

        d3.select(this.chart.nativeElement)
            .selectAll('*')
            .remove();

        const svg = d3
            .select(this.chart.nativeElement)
            .append('svg')
            .attr('viewBox', `0 0 75 75`)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        function drawDiagram(className: string, pie: any, fig: d3.Arc = arc): void {
            svg.append('g')
                .attr('class', className)
                .selectAll('path')
                .data(pie())
                .enter()
                .append('path')
                .attr('d', fig);
        }

        drawDiagram('background', () => backPie([null]), backArc);
        drawDiagram('sub', () => subPie(this.fact > this.plan ? [null] : newArray(tickSub)));
        drawDiagram('main', () => mainPie(newArray(tickMain)));

        function addSerif(angle: number, className: 'serif-active' | 'serif-warning'): void {
            if (!innerRadius || !outerRadius || !angle) {
                return;
            }
            const lineOut = 2;
            const lineWidth = 2;
            svg.append('g')
                .attr('class', className)
                .selectAll('.needle')
                .data([null])
                .enter()
                .append('line')
                .attr('x1', (innerRadius - lineOut) * Math.cos(angle))
                .attr('x2', (outerRadius + lineOut) * Math.cos(angle))
                .attr('y1', (innerRadius - lineOut) * Math.sin(angle))
                .attr('y2', (outerRadius + lineOut) * Math.sin(angle))
                .classed('needle', true)
                .style('stroke-width', lineWidth);
        }

        addSerif((3 * Math.PI) / 4, 'serif-active');
        addSerif(Math.PI / 4, this.fact > this.plan ? 'serif-warning' : 'serif-active');

        addSerif(
            (1.5 * Math.PI * mainValue) / this.diagramCounter + (3 * Math.PI) / 4,
            this.fact >= this.plan ? 'serif-active' : 'serif-warning'
        );

        const circleRad = 16;

        const shadowGradient = svg
            .append('defs')
            .append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%')
            .attr('spreadMethod', 'pad');

        shadowGradient
            .append('svg:stop')
            .attr('offset', '0%')
            .attr('class', 'needle-shadow-gradient-1');

        shadowGradient
            .append('svg:stop')
            .attr('offset', '100%')
            .attr('class', 'needle-shadow-gradient-2');

        const shadow = d3
            .arc()
            .innerRadius(circleRad)
            .outerRadius(innerRadius - 3)
            .startAngle(-0.5 * Math.PI)
            .endAngle(-0.008 * Math.PI);

        const arrowAngle = this.fact > this.plan ? 135 : -135 + (270 * mainValue) / this.diagramCounter;

        const needleShadow = svg
            .append('path')
            .attr('d', shadow)
            .attr(`transform`, `rotate(${isNaN(arrowAngle) ? 0 : arrowAngle})`)
            .style('fill', 'url(#gradient)');

        const hideDownSector = d3
            .arc()
            .innerRadius(circleRad)
            .outerRadius(outerRadius)
            .startAngle(-0.24 * Math.PI)
            .endAngle(0.24 * Math.PI);

        svg.append('path')
            .attr('d', hideDownSector)
            .attr(`transform`, `rotate(180)`)
            .attr(
                'class',
                this.background === 'lite'
                    ? 'kpe-gauge-hide-down-sector'
                    : this.background === 'dark'
                    ? 'kpe-gauge-hide-down-sector-d'
                    : 'kpe-gauge-hide-down-sector-sou'
            );

        svg.append('path')
            .attr('class', 'needle')
            .attr('d', 'M-3 0 L-1 -30 L1 0 S3 5 0 5 S-3 5 -3 0 Z') // стрелка
            .attr(`transform`, `rotate(${isNaN(arrowAngle) ? 0 : arrowAngle}) scale(0.87)`);

        drawCircle(
            circleRad,
            this.background === 'lite'
                ? 'needle-hover-circle-back'
                : this.background === 'dark'
                ? 'needle-hover-circle-back-d'
                : 'needle-hover-circle-back-sou'
        );

        const g = svg.append('g').attr('class', 'text');

        if (!this.noDeviation) {
            g.append('line')
                .attr('class', 'line')
                .attr('x1', -14)
                .attr('y1', 3)
                .attr('x2', 14)
                .attr('y2', 3);
            addText(`${this.fact}`, 'text text__value', -2);
            addText(`\u0394 ${this.deviation}`, 'text text__deviation', 13);
            addText(`${this.plan}${this.isPercent ? '%' : ''}`, 'text text__plan', 28);
        } else {
            addText(`${this.fact}`, 'text text__value', -2);
            addText(`%`, 'text text__unit', 9);
            addText(`${this.plan}${this.isPercent ? '%' : ''}`, 'text text__plan', 28);
        }

        function addText(text: string, cls: string, yCord: number): void {
            g.append('text')
                .attr('class', cls)
                .attr('text-anchor', 'middle')
                .attr('x', 0)
                .attr('y', yCord)
                .text(text);
        }

        function drawCircle(r: number, className: string): void {
            svg.append('circle')
                .attr('r', r)
                .attr('class', className);
        }
    }
}
