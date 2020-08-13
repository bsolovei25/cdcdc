import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { newArray } from '@angular/compiler/src/util';

@Component({
    selector: 'evj-kpe-energy-diagram',
    templateUrl: './kpe-energy-diagram.component.html',
    styleUrls: ['./kpe-energy-diagram.component.scss']
})
export class KpeEnergyDiagramComponent implements OnInit {

    private readonly defaultImg: string = '';
    private readonly diagramCounter: number = 133.33;
    private readonly tickDensity: number = 90 / this.diagramCounter;

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
        const diagramWidth = 4;

        const outerRadius = width / 2 - 2;
        const innerRadius = outerRadius - diagramWidth;

        function createPie(startAngel: number, endAngel: number): d3.Pie {
            return d3.pie()
                .startAngle(startAngel)
                .endAngle(endAngel)
                .value(1);
        }

        const mainPie = createPie(-Math.PI, 2 * Math.PI * mainValue / this.diagramCounter - Math.PI);
        const subPie = createPie(2 * Math.PI * mainValue / this.diagramCounter - Math.PI, Math.PI / 2);

        const arc: d3.Arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius)
            .padAngle(0.025);

        const svg = d3.select(this.chart.nativeElement).append('svg')
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
        addSerif(0, this.fact > this. plan ?  'serif-warning' : 'serif-active');

        addSerif(2 * Math.PI * mainValue / this.diagramCounter + Math.PI / 2, this.fact >= this. plan ? 'serif-active' : 'serif-warning');

        function drawCircle(r: number, className: string): void {
            svg.append('circle')
                .attr('r', r)
                .attr('class', className);
        }

        const needle = svg
            .append('path')
            .attr('class', 'needle')
            .attr('d', 'M-3 0 L-1 -30 L1 0 S3 5 0 5 S-3 5 -3 0 Z') // стрелка
            .attr(`transform`, `rotate(${30})`);

        drawCircle(18, 'needle-hover-circle');
    }
}
