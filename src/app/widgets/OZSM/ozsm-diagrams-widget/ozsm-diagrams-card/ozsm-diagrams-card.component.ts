import {
    Component,
    OnInit,
    Input,
    ElementRef,
    SimpleChanges,
    OnChanges
} from '@angular/core';
import * as d3 from 'd3';
import { newArray } from '@angular/compiler/src/util';

export interface IOzsmCircleDiagram {
    fact: number;
    plan: number;
    deviation?: number;
    percentage?: number;
    amount?: number;
    title: string;
}

interface IDiagrammOptions {
    diameter: number;
}

@Component({
    selector: 'evj-ozsm-diagrams-card',
    templateUrl: './ozsm-diagrams-card.component.html',
    styleUrls: ['./ozsm-diagrams-card.component.scss'],
})
export class OzsmDiagramsCardComponent implements OnInit, OnChanges {

    @Input()
    public data: IOzsmCircleDiagram = {
        fact: 70,
        plan: 100,
        deviation: 100,
        percentage: 70,
        amount: 365,
        title: '№8',
    };

    private readonly diagramCounter: number = 160;
    private readonly tickDensity: number = 110 / this.diagramCounter;

    private svg: any;
    private g: any;
    public percent: number;

    private diagramOptions: IDiagrammOptions = {
        diameter: 30
    };

    constructor(private hostElement: ElementRef) {
    }

    public ngOnInit(): void {
        this.initSvg();
        this.drawInnerSvg();
        this.drawOutterSvg();
        this.placeText();
    }

    public ngOnChanges(changes: SimpleChanges): void {
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
        this.g = this.svg.append('g')
            .attr('transform', 'translate(40,40)');
        this.appendMask();
    }

    private placeText(): void {
        this.g.append('text')
            .attr('class', 'ozsm-title-text')
            .text(this.data.title)
            .attr('y', 0);
    }

    private appendCircle(r: number, className: string): void {
        this.g
            .append('circle')
            .attr('r', r)
            .attr('class', className);
    }

    private appendMask(): void {
        const defs = this.svg.append('defs');

        const pattern = defs.append('pattern')
            .attr('id', 'pattern-dash')
            .attr('width', 2)
            .attr('height', 2)
            .attr('patternUnits', 'userSpaceOnUse');

        pattern.append('rect')
            .attr('width', 1)
            .attr('height', 2)
            .attr('fill', 'white');

        const mask = defs.append('mask')
            .attr('id', 'mask-dash');

        mask.append('rect')
            .attr('x', -30)
            .attr('y', 0)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('fill', 'url(#pattern-dash)');
    }

    private drawInnerSvg(): void {
        const k = this.data.fact * 1.4 / this.data.plan;
        const arcWidth = 2;

        this.appendCircle(this.diagramOptions.diameter, 'bg-diagram-card');

        const arc = d3.arc()
            .innerRadius(this.diagramOptions.diameter - 5)
            .outerRadius(this.diagramOptions.diameter - 5 + arcWidth)
            .startAngle(-Math.PI)
            .endAngle(Math.PI);

        this.g
            .append('path')
            .attr('d', arc)
            .attr('class', this.data.fact === this.data.plan ? 'bg-arc-default' : 'bg-arc-deviation');

        if (this.data.fact < this.data.plan) {
            const arcDeviation = d3.arc()
                .innerRadius(this.diagramOptions.diameter - 5)
                .outerRadius(this.diagramOptions.diameter - 5 + arcWidth)
                .cornerRadius(1)
                .startAngle(0)
                .endAngle(1.4 * Math.PI);

            this.g
                .append('path')
                .attr('d', arcDeviation)
                .attr('class', 'arc-deviation');
        }

        const arcValue = d3.arc()
            .innerRadius(this.diagramOptions.diameter - 5)
            .outerRadius(this.diagramOptions.diameter - 5 + arcWidth)
            .cornerRadius(1)
            .startAngle(0)
            .endAngle(k * Math.PI);

        this.g
            .append('path')
            .attr('d', arcValue)
            .attr('class', this.data.fact === this.data.plan ? 'arc-value-default' : 'arc-value-deviation');

        const outerArc = d3.arc()
            .innerRadius(this.diagramOptions.diameter)
            .outerRadius(this.diagramOptions.diameter + 0.7)
            .startAngle(-3.95)
            .endAngle(0.8);

        this.g
            .append('path')
            .attr('d', outerArc)
            .attr('class', 'ozms-outer-arc');
    }

    private drawOutterSvg(): void {
        const mainValue = this.data.fact > this.data.plan
            ? this.data.plan / this.data.fact * 100
            : this.data.fact / this.data.plan * 100;

        const tickMain = this.getTick(mainValue);

        function createPie(startAngel: number, endAngel: number): d3.Pie {
            return d3.pie()
                .startAngle(startAngel)
                .endAngle(endAngel)
                .value(1);
        }

        const mainPie = createPie(-Math.PI, 2 * Math.PI * mainValue / this.diagramCounter - Math.PI);
        const subPie = createPie(2 * Math.PI * mainValue / this.diagramCounter - Math.PI, Math.PI / 5);

        const arcSegBg = d3.arc()
            .outerRadius(this.diagramOptions.diameter + 9)
            .innerRadius(this.diagramOptions.diameter + 2);

        const arcSegValue = d3.arc()
            .outerRadius(this.diagramOptions.diameter + 8)
            .innerRadius(this.diagramOptions.diameter + 3)
            .padAngle(0.025);

        this.drawDiagram('outer-arc-bg', () => subPie(newArray(1)), arcSegBg);
        this.drawDiagram('outer-arc-value', () => mainPie(newArray(tickMain)), arcSegValue);

        this.addSerif(Math.PI / 2, 'ozsm-serif-default');
        this.addSerif(2 * Math.PI * mainValue / this.diagramCounter + Math.PI / 2, 'ozsm-serif-active');
    }

    private addSerif(angle: number, className: string): void {
        this.g.append('g')
            .attr('class', className)
            .selectAll('.needle')
            .data([null])
            .enter()
            .append('line')
            .attr('x1', (this.diagramOptions.diameter + 2) * Math.cos(angle) + 1)
            .attr('x2', (this.diagramOptions.diameter + 10) * Math.cos(angle) + 1)
            .attr('y1', (this.diagramOptions.diameter + 2) * Math.sin(angle))
            .attr('y2', (this.diagramOptions.diameter + 10) * Math.sin(angle))
            .classed('needle', true);
    }

    private drawDiagram(className: string, pie: any, arc: any): void {
        this.g.append('g')
            .attr('class', className)
            .selectAll('path')
            .data(pie())
            .enter()
            .append('path')
            .attr('d', arc);
    }
}
