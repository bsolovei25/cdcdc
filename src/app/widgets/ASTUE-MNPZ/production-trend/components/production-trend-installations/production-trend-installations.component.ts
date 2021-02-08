import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef, ViewChild, OnChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'evj-production-trend-installations',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './production-trend-installations.component.html',
    styleUrls: ['./production-trend-installations.component.scss'],
})
export class ProductionTrendInstallationsComponent implements OnInit, OnChanges {
    @ViewChild('pic', { static: true }) picture: ElementRef;
    @Input() status: string;
    @Input() fabricType: string;

    public svg: any;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.svg) {
            this.svg.remove();
        }
        this.draw(this.fabricType, this.status, this.picture.nativeElement);
    }

    draw(fabric, status, el): void {
        this.svg = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('viewBox', '0 0 100 100');

        const circle = this.svg
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/production-trend/circle-' + status + '.svg')
            .attr('height', '90px')
            .attr('width', '100px')
            .attr('x', '0')
            .attr('y', '26');

        const installations = this.svg
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/production-trend/fabric-' + fabric + '.svg')
            .attr('height', '90px')
            .attr('width', '90px')
            .attr('x', '5')
            .attr('y', '0');
    }
}
