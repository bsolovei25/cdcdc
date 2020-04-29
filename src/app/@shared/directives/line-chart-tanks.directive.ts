import {
    Directive,
    ElementRef,
    Renderer2,
    Input,
    HostListener,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { IPointTank, IPointD3 } from '../models/smart-scroll.model';

@Directive({
    selector: '[evjLineChartTanks]',
})
export class LineChartTanksDirective implements OnChanges {
    @Input() private points: IPointTank[] = [];
    @Input() private graphMaxX: number = null;
    @Input() private graphMaxY: number = null;
    @Input() private scaleFuncs: { x: any; y: any } = { x: null, y: null };
    @Input() private padding: { [key: string]: number } = {};

    private readonly arrowUpUrl: string = 'assets/icons/widgets/reasons-deviations/up-icon.svg';
    private readonly arrowDownUrl: string = 'assets/icons/widgets/reasons-deviations/down-icon.svg';

    private svg: any = null;

    private chartPointsData: IPointD3[] = [];

    private eventListenerFn: () => void = null;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (!changes.points?.firstChange || !changes.scaleFuncs?.firstChange) {
            this.mainFunction();
        }
    }

    @HostListener('document:resize') onResize(): void {
        this.mainFunction();
    }

    private mainFunction(): void {
        this.svg = d3Selection.select(this.el.nativeElement).select('svg');

        this.svg.select('g.chart-points').remove();
        if (this.eventListenerFn) {
            this.eventListenerFn();
        }

        this.transformData();
        this.eventListenerFn = this.drawPoints();
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

    private drawPoints(): () => void {
        const pointsG = this.svg.append('g').attr('class', 'chart-points');
        const eventListeners: (() => void)[] = [];

        this.chartPointsData.forEach((point: IPointD3) => {
            const pointG = pointsG.append('g').attr('class', 'chart-point');

            const iconHeight: number = 24;
            const iconWidth: number = 24;

            pointG
                .append('image')
                .attr('xlink:href', this.arrowUpUrl)
                .attr('width', iconHeight)
                .attr('height', iconWidth)
                .attr('x', point.x - iconWidth / 2)
                .attr('y', point.y - (iconHeight + 5));

            const cardWidth: number = 100;
            const cardHeight: number = 120;
            const rx: number = 10;

            let cardPosX: number = point.x;
            let cardPosY: number = point.y;

            if (this.graphMaxY && cardHeight + cardPosY > this.graphMaxY - this.padding.bottom) {
                cardPosY =
                    cardPosY + (this.graphMaxY - (cardHeight + cardPosY + this.padding.bottom));
                cardPosX += 12;
            }

            pointG
                .append('rect')
                .attr('class', 'point-card')
                .attr('width', cardWidth)
                .attr('height', cardHeight)
                .attr('rx', rx)
                .attr('fill', 'rgb(28, 35, 51)')
                .attr('x', cardPosX)
                .attr('y', cardPosY)
                .style('display', 'none');

            const [[icon]] = pointG.select('image')._groups;

            eventListeners.push(
                this.renderer.listen(icon, 'mouseenter', (event: MouseEvent) => {
                    const elem: HTMLElement = event.target as HTMLElement;
                    const target: HTMLElement = elem.nextSibling as HTMLElement;
                    target.style.display = 'inline';
                }),

                this.renderer.listen(icon, 'mouseleave', (event) => {
                    const elem: HTMLElement = event.target as HTMLElement;
                    const target: HTMLElement = elem.nextSibling as HTMLElement;
                    target.style.display = 'none';
                })
            );
        });

        return () => eventListeners.forEach((listener) => listener());
    }
}
