import { Directive, ElementRef, Renderer2, Input, HostListener } from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { IPointTank, IPointD3 } from '../models/smart-scroll.model';

@Directive({
    selector: '[evjLineChartTanks]',
})
export class LineChartTanksDirective {
    @Input() private points: IPointTank[] = [];
    @Input() private graphMaxX: number = null;
    @Input() private graphMaxY: number = null;
    @Input() private scaleFuncs: { x: any; y: any } = { x: null, y: null };
    @Input() private padding: { [key: string]: number } = {};

    private readonly arrowUpUrl: string = 'assets/icons/widgets/reasons-deviations/up-icon.svg';
    private readonly arrowDownUrl: string = 'assets/icons/widgets/reasons-deviations/down-icon.svg';

    private svg: any = null;

    private chartPointsData: IPointD3[] = [];

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('document:resize') onResize(): void {
        this.svg = d3Selection.select(this.el.nativeElement).select('svg');
        this.svg.select('g.chart-points').remove();

        this.transformData();
        this.drawPoints();
    }

    private transformData(): void {
        this.chartPointsData = [];
        this.points.forEach((point: IPointTank) => {
            this.chartPointsData.push({
                x: this.scaleFuncs.x(point.timestamp),
                y: this.scaleFuncs.y(point.value),
                additional: point.additional,
            });
        });
    }

    private drawPoints(): void {
        const pointG = this.svg.append('g').attr('class', 'chart-points');

        this.chartPointsData.forEach((point: IPointD3) => {
            pointG
                .append('g')
                .attr('class', 'chart-point')
                .append('image')
                .attr('xlink:href', this.arrowUpUrl)
                .attr('width', 24)
                .attr('height', 24)
                .attr('x', point.x - 12)
                .attr('y', point.y - 30);

            const cardWidth: number = 100;
            const cardHeight: number = 120;
            const rx: number = 10;

            const cardPosX: number = point.x;
            let cardPosY: number = point.y;

            console.log(cardPosY);
            console.log(this.graphMaxY);
            console.log(this.svg.style('height'));

            // if (cardHeight + cardPosY > this.graphMaxY) {
            //     cardPosY = cardPosY + (this.graphMaxY - (cardHeight + cardPosY));
            //     console.log(cardPosY);
            // }

            pointG
                .append('rect')
                .attr('width', cardWidth)
                .attr('height', cardHeight)
                .attr('rx', rx)
                .attr('fill', 'yellow')
                .attr('x', cardPosX)
                .attr('y', cardPosY);
        });
    }
}
