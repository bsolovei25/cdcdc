import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';
import { IOzsmListPacking } from '../../../../../../dashboard/models/OZSM/list-packing-diagram/ozsm-list-packing-diagrams.model';

@Component({
    selector: 'evj-ozsm-list-packing-diagrams-item',
    templateUrl: './ozsm-list-packing-diagrams-item.component.html',
    styleUrls: ['./ozsm-list-packing-diagrams-item.component.scss'],
})
export class OzsmListPackingDiagramsItemComponent implements OnInit {
    @Input() public data: IOzsmListPacking;

    percent: number = 0;
    deviationPercent: number = 0;

    private readonly diagramCounter: number = 160;
    private readonly tickDensity: number = 110 / this.diagramCounter;

    private svg: any;
    private g: any;
    diameter: number = 30;

    constructor(private hostElement: ElementRef) {}

    public ngOnInit(): void {
        this.initSvg();
        this.drawInnerSvg();
        this.drawOutterSvg();
        this.placeText();
    }

    public ngOnChanges(): void {
        this.percent = this.data.percentage < 0 ? 0 : this.data.percentage < 200 ? this.data.percentage : 200;
        this.deviationPercent = this.percent - 100;
        this.percent = this.percent > 100 ? 200 - this.percent : this.percent;
    }

    private getTick(percent: number): number {
        return this.tickDensity * percent;
    }

    private initSvg(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = undefined;
        }

        this.svg = d3.select(this.hostElement.nativeElement).select('svg');
        this.g = this.svg.append('g').attr('transform', 'translate(40,40)');
    }

    private placeText(): void {
        this.g
            .append('text')
            .attr('class', 'title-number')
            .text(this.data.title)
            .attr('y', 0);
    }

    private appendCircle(r: number, className: string): void {
        this.g
            .append('circle')
            .attr('r', r)
            .attr('class', className);
    }

    private drawInnerSvg(): void {
        const k = this.data.percentage / 100;
        const arcWidth = 2;

        this.appendCircle(this.diameter, 'bg-diagram-card');

        const outerArc = d3
            .arc()
            .innerRadius(this.diameter)
            .outerRadius(this.diameter + 0.7)
            .startAngle(-3.95)
            .endAngle(0.8);

        this.g
            .append('path')
            .attr('d', outerArc)
            .attr('class', 'ozms-outer-arc');
    }

    private drawOutterSvg(): void {
        const mainValue = this.data.percentage < 0 ? 0 : this.data.percentage < 100 ? this.data.percentage : 100;

        const tickMain = this.getTick(mainValue);

        function createPie(startAngel: number, endAngel: number): d3.Pie {
            return d3
                .pie()
                .startAngle(startAngel)
                .endAngle(endAngel)
                .value(1);
        }

        const mainPie = createPie(-Math.PI, (2 * Math.PI * mainValue) / this.diagramCounter - Math.PI);
        const subPie = createPie((2 * Math.PI * mainValue) / this.diagramCounter - Math.PI, Math.PI / 5);

        const arcSegBg = d3
            .arc()
            .outerRadius(this.diameter + 9)
            .innerRadius(this.diameter + 2);

        const arcSegValue = d3
            .arc()
            .outerRadius(this.diameter + 8)
            .innerRadius(this.diameter + 3)
            .padAngle(0.025);

        this.drawDiagram('outer-arc-bg', () => subPie(newArray(1)), arcSegBg);
        this.drawDiagram('outer-arc-value', () => mainPie(newArray(tickMain)), arcSegValue);

        this.addSerif(Math.PI / 2, 'ozsm-serif-default');
        this.addSerif((2 * Math.PI * mainValue) / this.diagramCounter + Math.PI / 2, 'ozsm-serif-active');
    }

    private addSerif(angle: number, className: string): void {
        this.g
            .append('g')
            .attr('class', className)
            .selectAll('.needle')
            .data([null])
            .enter()
            .append('line')
            .attr('x1', (this.diameter + 2) * Math.cos(angle) + 1)
            .attr('x2', (this.diameter + 10) * Math.cos(angle) + 1)
            .attr('y1', (this.diameter + 2) * Math.sin(angle))
            .attr('y2', (this.diameter + 10) * Math.sin(angle))
            .classed('needle', true);
    }

    private drawDiagram(className: string, pie: any, arc: any): void {
        this.g
            .append('g')
            .attr('class', className)
            .selectAll('path')
            .data(pie())
            .enter()
            .append('path')
            .attr('d', arc);
    }
}
