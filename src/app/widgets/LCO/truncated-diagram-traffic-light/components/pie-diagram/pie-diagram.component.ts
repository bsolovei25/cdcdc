import { Component, OnInit, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

export interface IPieChartInputData {
    name: string;
    value: number;
    greenUpperBounds?: number;
    yellowUpperBounds?: number;
    redUpperBounds?: number;
    unitsOfMeasure?: string;
    highLightSector?: 0 | 1 | 2;
}

@Component({
    selector: 'evj-pie-diagram',
    templateUrl: './pie-diagram.component.html',
    styleUrls: ['./pie-diagram.component.scss'],
})
export class PieDiagramComponent implements OnInit {
    @Input()
    public data: IPieChartInputData;

    private colors: string[] = [];

    private baseColors: string[] = ['rgb(78, 63, 42)', 'rgb(43, 72, 68)', 'rgb(79, 33, 44)'];

    private highlightColors: string[] = ['rgb(244,163,33)', 'rgb(0, 172, 157)', 'rgb(253, 72, 80)'];

    private svg: any;
    private g: any;

    constructor(private hostElement: ElementRef) {}

    ngOnInit(): void {
        this.initSvg();
        if (this.data) {
            console.log(this.data);

            this.getColors();
            this.placeText();
            this.drawSvg();
        }
    }

    private getColors(): void {
        this.colors = this.baseColors;
        this.colors[this.data.highLightSector] = this.highlightColors[this.data.highLightSector];
    }

    private initSvg(): void {
        this.svg = d3.select(this.hostElement.nativeElement).select('svg');
        this.g = this.svg.append('g').attr('transform', 'translate(50,50)').attr('z-index', '50');
    }

    private placeText(): void {
        this.g
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text(this.data.value);

        this.g
            .append('text')
            .attr('font-size', '12px')
            .attr('y', '40')
            .attr('z-index', '100')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('fill', 'rgb(109, 122, 145)')
            .text(this.data.name);
    }

    private drawSvg(): void {
        const angleGen = d3
            .pie()
            .startAngle(-0.75 * Math.PI)
            .endAngle(0.75 * Math.PI)
            .padAngle(0.05)
            .value((d) => d.size);

        const data = angleGen([{ size: 1 }, { size: 1 }, { size: 1 }]);

        const arcGen = d3.arc().innerRadius(42).outerRadius(50);

        const colors = d3.scaleOrdinal(this.colors);

        this.g
            .selectAll('path')
            .data(data)
            .enter()
            .append('path')
            .attr('d', arcGen)
            .attr('fill', (d, i) => {
                return colors(i);
            });
    }
}
