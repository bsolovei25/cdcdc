import { Component, OnInit, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as d3 from 'd3';

export interface IOzsmCircleDiagramFull {
    fact: number;
    plan: number;
    unit: string;
    deviationDays: number[];
}

@Component({
    selector: 'evj-ozsm-circle-diagram-full',
    templateUrl: './ozsm-circle-diagram-full.component.html',
    styleUrls: ['./ozsm-circle-diagram-full.component.scss'],
})
export class OzsmCircleDiagramFullComponent implements OnInit, OnChanges {
    @Input()
    public data: IOzsmCircleDiagramFull;

    public day: number = 26;

    private svg: any;

    private g: any;

    public percent: number;

    constructor(private hostElement: ElementRef) {}

    public ngOnInit(): void {
        this.initSvg();
        this.drawSvg();
        this.placeText();
        this.drawFrames();
    }

    public ngOnChanges(changes: SimpleChanges): void {}

    private initSvg(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = undefined;
        }

        this.svg = d3.select(this.hostElement.nativeElement).select('svg');
        this.g = this.svg.append('g').attr('transform', 'translate(50,50)');
    }

    private placeText(): void {
        this.g
            .append('text')
            .attr('class', 'unit-text')
            .text(this.data.unit)
            .attr('y', -16);

        this.g
            .append('text')
            .attr('class', 'fact-text')
            .text(this.data.fact)
            .attr('y', 0);

        this.g
            .append('text')
            .attr('class', 'plan-text')
            .attr('y', 11)
            .text(this.data.plan);

        this.g
            .append('text')
            .attr('class', 'deviation-text')
            .attr('y', 25)
            .text(this.data.fact - this.data.plan);
    }

    private initAngleGen(segmentNumber: number): any {
        const gens = [];
        let i = 0;
        let className = '';
        while (i < segmentNumber) {
            className = this.day > i ? 'ozsm-segment-day-active' : 'ozsm-segment-day';
            this.data.deviationDays.forEach((num) => {
                className = i === num ? 'ozsm-segment-day-deviation' : className;
            });
            className = i === 9 ? 'ozsm-segment-day-deviation' : className;
            className = this.day === i + 1 ? className + ' ozsm-segment-current-day' : className;
            gens.push({ size: 1, class: className });
            i++;
        }
        return gens;
    }

    private drawSvg(): void {
        const k = (this.data.fact * 1.4) / this.data.plan;
        const chartD = 50;
        const arcWidth = 2;
        const segmentArcWidth = 3;

        this.appendCircle(chartD, 'bg');

        const segmentArc = d3
            .pie()
            .padAngle(0.02)
            .value((d) => (d.data ? d.data.size : 1));

        const arcGen = d3
            .arc()
            .innerRadius(chartD - 10)
            .outerRadius(chartD - 10 + segmentArcWidth);

        const angleGenSource = this.initAngleGen(31);
        const data = segmentArc(angleGenSource);

        this.g
            .selectAll('path')
            .data(data)
            .enter()
            .append('path')
            .attr('d', arcGen)
            .attr('class', (d) => (d.data ? d.data.class : ''));

        const arc = this.createArc(chartD - 15, chartD - 15 + arcWidth, 0, -Math.PI, Math.PI);

        this.g
            .append('path')
            .attr('d', arc)
            .attr('class', this.data.fact === this.data.plan ? 'bg-arc-default' : 'bg-arc-deviation');

        if (this.data.fact < this.data.plan) {
            const arcDeviation = this.createArc(chartD - 15, chartD - 15 + arcWidth, 1, 0, 1.4 * Math.PI);

            this.g
                .append('path')
                .attr('d', arcDeviation)
                .attr('class', 'arc-deviation');
        }

        const arcValue = this.createArc(chartD - 15, chartD - 15 + arcWidth, 1, 0, k * Math.PI);

        this.g
            .append('path')
            .attr('d', arcValue)
            .attr('class', this.data.fact === this.data.plan ? 'arc-value-default' : 'arc-value-deviation');

        data.forEach((item) => {
            if (item.data.class.includes('ozsm-segment-current-day')) {
                const classArr = item.data.class.split(' ');
                const angle = item.endAngle - item.padAngle * 4;
                const radius = chartD - 8.5;
                const markerRadius = 3;
                const cx = markerRadius * Math.cos(angle) + Math.sqrt(radius * radius - markerRadius) * Math.sin(angle);
                const cy = markerRadius * Math.sin(angle) - Math.sqrt(radius * radius - markerRadius) * Math.cos(angle);
                this.appendCircle(markerRadius, classArr[0], cx, cy);
                this.appendCircle(1.8, 'arc-value-deviation', cx, cy);
            }
        });
    }

    private drawFrames(): void {
        const arcOutter = d3
            .arc()
            .innerRadius(48)
            .outerRadius(49.75)
            .startAngle(-0.3 * Math.PI)
            .endAngle(0.3 * Math.PI);

        const arcInner = d3
            .arc()
            .innerRadius(46)
            .outerRadius(48)
            .startAngle(-0.2 * Math.PI)
            .endAngle(0.2 * Math.PI);

        this.appendArc(arcOutter, 180);
        this.appendArc(arcInner, 180);
        this.appendArc(arcOutter);
        this.appendArc(arcInner);

        this.appendRect(-40.2, -29.5);
        this.appendRect(37.2, -29.5);
        this.appendRect(37.2, 26.5);
        this.appendRect(-40.2, 26.5);
    }

    private appendCircle(r: number, className: string, cx?: number, cy?: number): void {
        this.g
            .append('circle')
            .attr('cx', cx ? cx : 0)
            .attr('cy', cy ? cy : 0)
            .attr('r', r)
            .attr('class', className);
    }

    private appendRect(x: number, y: number): void {
        this.g
            .append('rect')
            .attr('class', 'hide-frame-corner')
            .attr('x', x)
            .attr('y', y)
            .attr('width', 3)
            .attr('height', 3);
    }

    private appendArc(arc: any, rotate?: number): void {
        this.g
            .append('path')
            .attr('d', arc)
            .attr(`transform`, `rotate(${rotate ? rotate : 0})`)
            .attr('class', 'ozsm-circle-frame');
    }

    private createArc(
        innerRadius: number,
        outterRadius: number,
        cornerRadius?: number,
        startAngle?: number,
        endAngle?: number
    ): any {
        return d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outterRadius)
            .cornerRadius(cornerRadius ? cornerRadius : 0)
            .startAngle(startAngle ? startAngle : 0)
            .endAngle(endAngle ? endAngle : 0);
    }
}
