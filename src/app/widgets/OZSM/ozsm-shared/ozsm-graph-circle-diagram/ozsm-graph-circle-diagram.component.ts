import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import { IOzsmPlanningMainItem } from '../../../../dashboard/models/OZSM/ozsm-planning-main.model';

@Component({
    selector: 'evj-ozsm-graph-circle-diagram',
    templateUrl: './ozsm-graph-circle-diagram.component.html',
    styleUrls: ['./ozsm-graph-circle-diagram.component.scss'],
})
export class OzsmGraphCircleDiagramComponent implements OnChanges {
    @Input() public data: IOzsmPlanningMainItem = null;

    private svg: any;
    private g: any;
    public percent: number;

    constructor(private hostElement: ElementRef) {}

    public ngOnChanges(): void {
        if (!this.data) {
            return;
        }
        this.initSvg();
        this.drawSvg();
    }

    private initSvg(): void {
        if (this.svg) {
            this.svg.select('g').remove();
            this.svg = undefined;
        }

        this.svg = d3.select(this.hostElement.nativeElement).select('svg');
        this.g = this.svg.append('g').attr('transform', 'translate(47,47)');
    }

    private appendCircle(r: number, className: string): void {
        this.g
            .append('circle')
            .attr('r', r)
            .attr('class', className);
    }

    private drawSvg(): void {
        const k = (2 * this.data.percent) / 100;
        const chartD = 48;
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
            .attr('class', 'bg-arc-default');

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
            .attr('class', 'arc-value-default');
    }
}
