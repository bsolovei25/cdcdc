import { Component, ViewChild, ElementRef, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import * as d3Selection from 'd3-selection';
import {
    IProductionDeviationsColumn,
    IGeometryParameters,
    LineType,
} from '../../../../../dashboard/models/SMP/production-deviations.model';

@Component({
    selector: 'evj-production-deviations-column',
    templateUrl: './production-deviations-column.component.html',
    styleUrls: ['./production-deviations-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionDeviationsColumnComponent implements OnChanges {
    @Input() private data: IProductionDeviationsColumn = null;

    @ViewChild('col', { static: true }) private column: ElementRef;

    private blockParams: IGeometryParameters = {
        height: 0,
        width: 0,
    };

    private readonly line: IGeometryParameters = {
        height: 4,
        width: 10,
        padding: 1,
    };

    private readonly lineTypes: LineType[] = ['fact', 'plan', 'warning', 'danger'];

    private linesCounters: Map<LineType, number> = new Map<LineType, number>();

    private readonly colors: { [key: string]: string } = {
        fact: '#ffffff',
        plan: '#6ba4ef',
        warning: '#ff9700',
        danger: '#d00100',
    };

    constructor() {
        this.lineTypes.forEach((item) => this.linesCounters.set(item, 0));
    }

    public ngOnChanges(): void {
        setTimeout(() => {
            this.defineBlockData();
            this.createBlock();
            this.drawLines();
        }, 0);
    }

    private defineBlockData(): void {
        const elem: HTMLElement = this.column.nativeElement as HTMLElement;
        this.blockParams = {
            height: elem.clientHeight,
            width: elem.clientWidth,
        };
        const maxLines: number = this.blockParams.height / this.line.height;
        if (this.data.plan > this.data.fact) {
            const allLines: number = Math.floor((maxLines * this.data.plan) / this.data.maxValue);
            const factLines: number = Math.floor((maxLines * this.data.fact) / this.data.maxValue);
            this.linesCounters.set('plan', allLines - factLines);
            this.linesCounters.set('fact', factLines);
        } else if (this.data.fact < this.data.limit?.value) {
            const factLines: number = Math.floor((maxLines * this.data.fact) / this.data.maxValue);
            this.linesCounters.set('fact', factLines);
        } else if (this.data.limit) {
            const allLines: number = Math.floor((maxLines * this.data.fact) / this.data.maxValue);
            const limitLines: number = Math.floor((maxLines * this.data.limit.value) / this.data.maxValue);
            this.linesCounters.set(this.data.limit.type, allLines - limitLines);
            this.linesCounters.set('fact', limitLines);
        }
    }

    private createBlock(): void {
        d3Selection
            .select(this.column.nativeElement)
            .append('div')
            .attr('class', 'block')
            .style('position', 'absolute')
            .style('z-index', `2`)
            .style('bottom', 0)
            .style('width', '100%')
            .style('height', '100%')
            .style('overflow', 'hidden');
    }

    private drawLines(): void {
        const lineHeight: number = this.line.height - 2 * this.line.padding;
        const block = d3Selection.select(this.column.nativeElement).selectAll('.block');

        let yCoord: number = 0;

        this.lineTypes.forEach((item) => {
            const lines: number = this.linesCounters.get(item);
            let i: number = 0;

            while (i < lines) {
                block
                    .append('div')
                    .attr('class', 'line')
                    .style('position', 'absolute')
                    .style('left', '0px')
                    .style('bottom', `${yCoord}px`)
                    .style('width', '100%')
                    .style('height', `${this.line.height}px`)
                    .style('display', 'flex')
                    .style('flex-direction', 'column')
                    .style('justify-content', 'center')
                    .style('align-items', 'center')
                    .append('div')
                    .style('width', `${this.line.width}px`)
                    .style('height', `${lineHeight}px`)
                    .style('background', this.colors[item]);

                yCoord += this.line.height;
                i++;
            }
        });
    }
}
