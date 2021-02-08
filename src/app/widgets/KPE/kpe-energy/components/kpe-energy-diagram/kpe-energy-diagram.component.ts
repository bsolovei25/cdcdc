import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { newArray } from '@angular/compiler/src/util';
import { AsyncRender } from '@shared/functions/async-render.function';

@Component({
    selector: 'evj-kpe-energy-diagram',
    templateUrl: './kpe-energy-diagram.component.html',
    styleUrls: ['./kpe-energy-diagram.component.scss'],
})
export class KpeEnergyDiagramComponent implements OnInit {
    private readonly defaultImg: string = '';
    private readonly diagramCounter: number = 133.33;
    private readonly tickDensity: number = 90 / this.diagramCounter;

    @ViewChild('chart') chart: ElementRef;

    @Input() fact: number = 0;
    @Input() plan: number = 0;
    @Input() deviation: number = 0;
    @Input() img: string = this.defaultImg;

    public ngOnInit(): void {
        this.dataHandler();
        const mainValue = this.fact > this.plan ? (this.plan / this.fact) * 100 : (this.fact / this.plan) * 100;
        const subValue = Math.abs(this.fact - this.plan);
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
        const diagramWidth = 4;

        const outerRadius = width / 2 - 2;
        const innerRadius = outerRadius - diagramWidth;

        function createPie(startAngel: number, endAngel: number): d3.Pie {
            return d3
                .pie()
                .startAngle(startAngel)
                .endAngle(endAngel)
                .value(1);
        }

        const mainPie = createPie(-Math.PI, (2 * Math.PI * mainValue) / this.diagramCounter - Math.PI);
        const subPie = createPie((2 * Math.PI * mainValue) / this.diagramCounter - Math.PI, Math.PI / 2);

        const arc: d3.Arc = d3
            .arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius)
            .padAngle(0.025);

        const svg = d3
            .select(this.chart.nativeElement)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        function drawDiagram(className: string, pie: any): void {
            svg.append('g')
                .attr('class', className)
                .selectAll('path')
                .data(pie())
                .enter()
                .append('path')
                .attr('d', arc);
        }

        drawDiagram('sub', () => subPie(this.fact > this.plan ? [null] : newArray(tickSub)));
        drawDiagram('main', () => mainPie(newArray(tickMain)));

        function addSerif(angle: number, className: 'serif-active' | 'serif-warning'): void {
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

        addSerif(Math.PI / 2, 'serif-active');
        addSerif(0, this.fact > this.plan ? 'serif-warning' : 'serif-active');

        addSerif(
            (2 * Math.PI * mainValue) / this.diagramCounter + Math.PI / 2,
            this.fact >= this.plan ? 'serif-active' : 'serif-warning'
        );

        function drawCircle(r: number, className: string): void {
            svg.append('circle')
                .attr('r', r)
                .attr('class', className);
        }

        const circleRad = 18;

        const shadowGradient = svg
            .append('defs')
            .append('linearGradient')
            .attr('id', 'kpe-energy-gradient')
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
            .outerRadius(innerRadius - 2)
            .startAngle(-0.5 * Math.PI)
            .endAngle(-0.008 * Math.PI);

        // const arrowAngle = (-180 + 270 * mainValue / this.diagramCounter);
        const arrowAngle = this.fact > this.plan ? 90 : -180 + (360 * mainValue) / this.diagramCounter;

        const needleShadow = svg
            .append('path')
            .attr('d', shadow)
            .attr(`transform`, `rotate(${arrowAngle})`)
            .style('fill', 'url(#kpe-energy-gradient)');

        const hideDownSector = d3
            .arc()
            .innerRadius(circleRad)
            .outerRadius(outerRadius)
            .startAngle(-0.49 * Math.PI)
            .endAngle(-0.01 * Math.PI);

        svg.append('path')
            .attr('d', hideDownSector)
            .attr(`transform`, `rotate(180)`)
            .attr('class', 'kpe-energy-hide-down-sector');

        const needle = svg
            .append('path')
            .attr('class', 'needle')
            .attr('d', 'M-3 0 L-1 -30 L1 0 S3 5 0 5 S-3 5 -3 0 Z') // стрелка
            .attr(`transform`, `rotate(${arrowAngle})`);

        drawCircle(circleRad, 'needle-hover-circle');
    }
}
