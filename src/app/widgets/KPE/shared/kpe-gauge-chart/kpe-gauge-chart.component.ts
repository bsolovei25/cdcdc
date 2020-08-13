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

    @Input() fact: number = 110;
    @Input() plan: number = 100;
    @Input() img: string = this.defaultImg;

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

        const mainPie = createPie(-3 * Math.PI / 4, 1.5 * Math.PI * mainValue / this.diagramCounter - 3 * Math.PI / 4);
        const subPie = createPie(1.5 * Math.PI * mainValue / this.diagramCounter - 3 * Math.PI / 4, 3 * Math.PI / 4);

        const arc: d3.Arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius)
            .padAngle(0.025);

        const svg = d3.select(this.chart.nativeElement).append('svg')
            // .attr('width', width)
            // .attr('height', height)
            .attr('viewBox', `0 0 75 75`)
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
        // drawDiagram('main', () => mainPie(newArray(tickMain)));
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

        addSerif(1.5 * Math.PI * mainValue / this.diagramCounter + 3 * Math.PI / 4, this.fact >= this. plan ? 'serif-active' : 'serif-warning');

        const g = svg.append('g').attr('class', 'text');

        g.append('line')
            .attr('class', 'line')
            .attr('x1', -15)
            .attr('y1', 5)
            .attr('x2', 15)
            .attr('y2', 5);
        addText(`97.1`, 'text text__value', 0);
        addText(`\u0394 10%`, 'text text__deviation', 33);
        // addText(`100%`, 'sub-text', mid - 30);

        function addText(text: string, cls: string, yCord: number): void {
            g.append('text')
                .attr('class', cls)
                .attr('text-anchor', 'middle')
                .attr('x', 0)
                .attr('y', yCord)
                .text(text);
        }
    }
}
