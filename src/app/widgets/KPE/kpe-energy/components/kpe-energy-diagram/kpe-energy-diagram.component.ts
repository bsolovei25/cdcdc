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
    private readonly tickDensity: number = 40 / 133.33;

    @ViewChild('chart') chart: ElementRef;

    @Input() value: number = 110;
    @Input() img: string = this.defaultImg;

    ngOnInit(): void {
        this.checkData();
        const mainValue = this.value > 100 ? 100 : this.value;
        const subValue = this.value > 100 ? this.value - 100 : 0;
        setTimeout(() => this.bindChart(mainValue, subValue));
    }

    private checkData(): void {
        this.img = this.img?.length > 0 ? this.img : this.defaultImg;
        this.value = this.value > 100 / 3 * 4 ? 100 / 3 * 4 : this.value < 0 ? 0 : this.value;
    }

    private getTick(percent: number): number {
        return this.tickDensity * percent;
    }

    private bindChart(mainValue: number, subValue: number): void {
        const tickMain = this.getTick(mainValue);
        const tickSub = this.getTick(subValue);

        const width = 75;
        const height = 75;
        const diagramWidth = 5;

        const outerRadius = width / 2 - 2;
        const innerRadius = outerRadius - diagramWidth;

        function createPie(startAngel: number, endAngel: number): d3.Pie {
            return d3.pie()
                .startAngle(startAngel)
                .endAngle(endAngel)
                .value(1);
        }

        const backPie = createPie(Math.PI, 5 / 2 * Math.PI);
        const mainPie = createPie(-Math.PI, 2 * Math.PI * mainValue / 133 - Math.PI);
        const subPie = createPie(Math.PI / 2, 2 * Math.PI * subValue / 133 + Math.PI / 2);

        const arc: d3.Arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius)
            .padAngle(0.05);

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

        if (subValue > 0) {
            drawDiagram('sub', () => subPie(newArray(tickSub)));
        } else {
            drawDiagram('back', () => backPie([null]));
        }
        drawDiagram(subValue > 0 ? 'main-warning' : 'main', () => mainPie(newArray(tickMain)));

        function addSerif(angle: number, className: 'serif-static' | 'serif-dynamic'): void {
            const lineOut = 2;
            const lineWidth = 3;
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

        addSerif(Math.PI / 2, 'serif-static');
        addSerif(0, 'serif-static');

        addSerif(2 * Math.PI * this.value / 133 + Math.PI / 2, 'serif-dynamic');
    }
}
