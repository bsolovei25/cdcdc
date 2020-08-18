import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';
import * as d3 from 'd3';
import { main } from '@angular/compiler-cli/src/main';

@Component({
  selector: 'evj-kpe-gauge-chart',
  templateUrl: './kpe-gauge-chart.component.html',
  styleUrls: ['./kpe-gauge-chart.component.scss']
})
export class KpeGaugeChartComponent implements OnInit {

    private readonly defaultImg: string = '';
    private readonly diagramCounter: number = 100;
    private readonly tickDensity: number = 80 / this.diagramCounter;

    @ViewChild('chart') chart: ElementRef;

    @Input() fact: number = 70;
    @Input() plan: number = 100;
    @Input() img: string = this.defaultImg;
    @Input() background: 'lite' | 'dark' = 'lite';

    ngOnInit(): void {
        this.dataHandler();
        const mainValue = this.fact > this.plan
            ? this.plan / this.fact * 100
            : this.fact / this.plan * 100;
        const subValue = Math.abs(this.fact - this.plan);
        setTimeout(() => this.bindChart(mainValue, subValue));
    }

    private dataHandler(): void {
        this.img = this.img?.length > 0 ? this.img : this.defaultImg;
    }

    private getTick(percent: number): number {
        return this.tickDensity * percent;
    }

    private bindChart(mainValue: number, subValue: number): void {
        const tickMain = this.getTick(mainValue);
        const tickSub = this.getTick(subValue);

        const width = 75;
        const height = 75;
        const diagramWidth = 7;

        const outerRadius = width / 2 - 2;
        const innerRadius = outerRadius - diagramWidth;

        function createPie(startAngel: number, endAngel: number): d3.Pie {
            return d3.pie()
                .startAngle(startAngel)
                .endAngle(endAngel)
                .value(1);
        }

        const backPie = createPie(-3 * Math.PI / 4, 3 * Math.PI / 4);
        const mainPie = createPie(-3 * Math.PI / 4, 1.5 * Math.PI * mainValue / this.diagramCounter - 3 * Math.PI / 4);
        const subPie = createPie(1.5 * Math.PI * mainValue / this.diagramCounter - 3 * Math.PI / 4, 3 * Math.PI / 4);

        const arc: d3.Arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius)
            .padAngle(0.025);

        const backArc: d3.Arc = d3.arc()
            .outerRadius(outerRadius + 1.5)
            .innerRadius(innerRadius - 1.5);

        const svg = d3.select(this.chart.nativeElement).append('svg')
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

        addSerif(3 * Math.PI / 4, 'serif-active');
        addSerif(Math.PI / 4, this.fact > this. plan ?  'serif-warning' : 'serif-active');

        addSerif(1.5 * Math.PI * mainValue / this.diagramCounter + 3 * Math.PI / 4, this.fact >= this.plan ? 'serif-active' : 'serif-warning');

        const circleRad = 16;

        const shadowGradient = svg.append('defs').append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%')
            .attr('spreadMethod', 'pad');

        shadowGradient.append('svg:stop')
            .attr('offset', '0%')
            .attr('class', 'needle-shadow-gradient-1');

        shadowGradient.append('svg:stop')
            .attr('offset', '100%')
            .attr('class', 'needle-shadow-gradient-2');

        const shadow = d3.arc()
            .innerRadius(circleRad)
            .outerRadius(innerRadius - 3)
            .startAngle(-0.5 * Math.PI)
            .endAngle(-0.008 * Math.PI);

        const arrowAngle = (-135 + 270 * mainValue / this.diagramCounter);

        const needleShadow = svg
            .append('path')
            .attr('d', shadow)
            .attr(`transform`, `rotate(${arrowAngle})`)
            .style('fill', 'url(#gradient)');

        const hideDownSector = d3.arc()
            .innerRadius(circleRad)
            .outerRadius(outerRadius)
            .startAngle(-0.24 * Math.PI)
            .endAngle(0.24 * Math.PI);

        svg.append('path')
            .attr('d', hideDownSector)
            .attr(`transform`, `rotate(180)`)
            .attr('class', this.background === 'lite' ? 'kpe-gauge-hide-down-sector' : 'kpe-gauge-hide-down-sector-d');

        svg.append('path')
            .attr('class', 'needle')
            .attr('d', 'M-3 0 L-1 -30 L1 0 S3 5 0 5 S-3 5 -3 0 Z') // стрелка
            .attr(`transform`, `rotate(${arrowAngle}) scale(0.87)`);

        drawCircle(circleRad, this.background === 'lite' ? 'needle-hover-circle-back' : 'needle-hover-circle-back-d');

        const g = svg.append('g').attr('class', 'text');

        g.append('line')
            .attr('class', 'line')
            .attr('x1', -14)
            .attr('y1', 3)
            .attr('x2', 14)
            .attr('y2', 3);
        addText(`97.1`, 'text text__value', -2);
        addText(`\u0394 10`, 'text text__deviation', 13);
        addText(`100`, 'text text__plan', 28);

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
