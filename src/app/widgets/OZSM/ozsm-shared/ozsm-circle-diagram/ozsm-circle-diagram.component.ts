import { Component, OnInit, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as d3 from 'd3';

export interface IOzsmCircleDiagram {
    fact: number;
    plan: number;
    units: string;
}

@Component({
    selector: 'evj-ozsm-circle-diagram',
    templateUrl: './ozsm-circle-diagram.component.html',
    styleUrls: ['./ozsm-circle-diagram.component.scss'],
})
export class OzsmCircleDiagramComponent implements OnInit, OnChanges {
    @Input()
    public data: IOzsmCircleDiagram;

    private svg: any;
    private g: any;
    public percent: number;

    constructor(private hostElement: ElementRef) {}

    public ngOnInit(): void {
        this.initSvg();
        this.drawSvg();
        this.placeText();
    }

    public ngOnChanges(changes: SimpleChanges): void {}

    private initSvg(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = undefined;
        }

        this.svg = d3.select(this.hostElement.nativeElement).select('svg');
        this.g = this.svg.append('g').attr('transform', 'translate(47,47)');
        this.appendMask();
    }

    private placeText(): void {
        this.g.append('text').attr('class', 'sub-text').text(this.data.units).attr('y', -30);

        this.g.append('text').attr('class', 'value').text(this.data.fact).attr('y', -5);

        this.g
            .append('rect') // outline for reference
            .attr('class', 'divider')
            .attr('x', -30)
            .attr('y', 7);

        this.g
            .append('text')
            .attr('class', 'sub-text')
            .attr('y', 20)
            .text(this.data.fact - this.data.plan);
    }

    private appendCircle(r: number, className: string): void {
        this.g.append('circle').attr('r', r).attr('class', className);
    }

    private appendMask(): void {
        const defs = this.svg.append('defs');

        const pattern = defs
            .append('pattern')
            .attr('id', 'pattern-dash')
            .attr('width', 2)
            .attr('height', 2)
            .attr('patternUnits', 'userSpaceOnUse');

        pattern.append('rect').attr('width', 1).attr('height', 2).attr('fill', 'white');

        const mask = defs.append('mask').attr('id', 'mask-dash');

        mask.append('rect')
            .attr('x', -30)
            .attr('y', 0)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('fill', 'url(#pattern-dash)');
    }

    private drawSvg(): void {
        const k = (this.data.fact * 1.4) / this.data.plan;
        const chartD = 45;
        const arcWidth = 2;

        this.appendCircle(chartD, 'bg');

        const arc = d3
            .arc()
            .innerRadius(chartD - 5)
            .outerRadius(chartD - 5 + arcWidth)
            .startAngle(-Math.PI)
            .endAngle(Math.PI);

        this.g
            .append('path')
            .attr('d', arc)
            .attr('class', this.data.fact === this.data.plan ? 'bg-arc-default' : 'bg-arc-deviation');

        if (this.data.fact < this.data.plan) {
            const arcDeviation = d3
                .arc()
                .innerRadius(chartD - 5)
                .outerRadius(chartD - 5 + arcWidth)
                .cornerRadius(1)
                .startAngle(0)
                .endAngle(1.4 * Math.PI);

            this.g.append('path').attr('d', arcDeviation).attr('class', 'arc-deviation');
        }

        const arcValue = d3
            .arc()
            .innerRadius(chartD - 5)
            .outerRadius(chartD - 5 + arcWidth)
            .cornerRadius(1)
            .startAngle(0)
            .endAngle(k * Math.PI);

        this.g
            .append('path')
            .attr('d', arcValue)
            .attr('class', this.data.fact === this.data.plan ? 'arc-value-default' : 'arc-value-deviation');
    }
}
