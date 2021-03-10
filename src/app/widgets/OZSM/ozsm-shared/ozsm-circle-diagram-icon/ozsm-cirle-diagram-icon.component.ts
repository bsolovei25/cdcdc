import { ozsmDiagramInnerIcon } from '../../../../dashboard/models/OZSM/ozsm-circle-diagram-icon.model';
import { AsyncRender } from '@shared/functions/async-render.function';
import { Component, OnInit, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import * as d3 from 'd3';
import { IOzsmPlanningMainItem } from '../../../../dashboard/models/OZSM/ozsm-planning-main.model';

@Component({
    selector: 'evj-ozsm-cirle-diagram-icon',
    templateUrl: './ozsm-cirle-diagram-icon.component.html',
    styleUrls: ['./ozsm-cirle-diagram-icon.component.scss'],
})
export class OzsmCircleDiagramIconComponent implements OnInit, OnChanges {
    @ViewChild('chart') chart: ElementRef;
    @Input() innerIcon: ozsmDiagramInnerIcon = 'cap';
    @Input() data: IOzsmPlanningMainItem = null;

    svg: any;

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (!this.data) {
            return;
        }
        this.draw(this.data.percent);
    }

    @AsyncRender
    draw(percent: number): void {
        if (this.svg) {
           this.svg.remove();
        }
        const diagramValue = 3.6 * percent;
        this.svg = d3.select(this.chart.nativeElement).append('svg').attr('width', 66).attr('height', 66);

        this.svg.append('circle').attr('cx', 33).attr('cy', 33).attr('r', 32).attr('class', 'big-circle');

        this.svg.append('circle').attr('cx', 33).attr('cy', 33).attr('r', 26).attr('class', 'small-circle');

        // Круговая шкала
        for (let i = 0; i <= 360; i += 5) {
            if (i === 0) {
                this.svg.append('rect')
                    .attr('x', 32.5)
                    .attr('y', 60)
                    .style('transform-origin', 'center center')
                    .style('transform', `rotate(${180}deg)`)
                    .attr('width', 0.5)
                    .attr('height', 4)
                    .attr('class', 'active');
            } else {
                this.svg.append('rect')
                    .attr('x', 32.5)
                    .attr('y', 60)
                    .style('transform-origin', 'center center')
                    .style('transform', `rotate(${180 + i}deg)`)
                    .attr('width', 1)
                    .attr('height', 4)
                    .attr('class', i <= +diagramValue ? 'active' : 'unactive');
            }
        }

        // Указатель
        this.svg.append('rect')
            .attr('x', 32.5)
            .attr('y', 1)
            .style('transform-origin', 'center center')
            .style('transform', `rotate(${diagramValue}deg)`)
            .attr('width', 1)
            .attr('height', 6)
            .attr('class', +diagramValue !== 360 ? 'white' : 'transparent');
    }
}
