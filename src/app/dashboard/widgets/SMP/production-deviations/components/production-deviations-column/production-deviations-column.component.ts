import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';

interface IGeometryParameters {
    height: number;
    width: number;
    margin?: number;
}

type LineType = 'danger' | 'warning' | 'active' | 'common';

@Component({
    selector: 'evj-production-deviations-column',
    templateUrl: './production-deviations-column.component.html',
    styleUrls: ['./production-deviations-column.component.scss'],
})
export class ProductionDeviationsColumnComponent implements OnInit {
    @ViewChild('col', { static: true }) private column: ElementRef;

    private svg;

    private svgParams: IGeometryParameters = {
        height: 0,
        width: 0,
    };

    private readonly line: IGeometryParameters = {
        height: 3,
        width: 10,
        margin: 2,
    };

    private readonly lineTypes: LineType[] = ['danger', 'warning', 'active', 'common'];

    private readonly colors: { [key: string]: string } = {
        common: '#ffffff',
        active: '#3fa9f5',
        warning: '#f4a321',
        danger: '#eb5757',
    };

    private linesCounter: number = 0;

    constructor() {}

    public ngOnInit(): void {
        this.svg = d3Selection
            .select(this.column.nativeElement)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%');
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.defineSvgParameters();
        this.createClipPaths();
        this.lineTypes.forEach((item) => this.drawLines(this.colors[item], item));
        this.moveClipPath('warning', '10%');
        this.moveClipPath('active', '30%');
        this.moveClipPath('common', '70%');
    }

    private createClipPaths(): void {
        this.lineTypes.forEach((item) => {
            this.svg
                .append('clipPath')
                .attr('id', `clip-${item}`)
                .append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', this.svgParams.width)
                .attr('height', this.svgParams.height);
        });
    }

    private defineSvgParameters(): void {
        const elem: HTMLElement = this.svg._groups[0][0] as HTMLElement;
        this.svgParams = {
            height: elem.clientHeight,
            width: elem.clientWidth,
        };
        this.linesCounter = Math.round(
            this.svgParams.height / (this.line.height + this.line.margin)
        );
    }

    private drawLines(color: string, lineType: LineType): void {
        let yCoord: number = 0;
        const xCoord = (this.svgParams.width - this.line.width) / 2;
        for (let i = 0; i < this.linesCounter; i++) {
            const line = this.svg
                .append('rect')
                .attr('x', xCoord)
                .attr('y', yCoord)
                .attr('width', this.line.width)
                .attr('height', this.line.height)
                .attr('fill', color);

            this.setClipPath(line, lineType);

            yCoord = yCoord + this.line.height + this.line.margin;
        }
    }

    private setClipPath(line: any, lineType: LineType): void {
        let i = 0;
        while (true) {
            line.style('clip-path', `url(#clip-${this.lineTypes[i]})`);
            if (this.lineTypes[i] === lineType) {
                break;
            }
            i++;
        }
    }

    private moveClipPath(clipName: LineType, coord: number | string): void {
        const clipPath = this.svg.select(`#clip-${clipName} rect`);
        clipPath.attr('y', `${coord}`);
    }
}
