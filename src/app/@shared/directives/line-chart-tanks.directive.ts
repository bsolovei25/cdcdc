import {
    Directive,
    ElementRef,
    Renderer2,
    Input,
    HostListener,
    OnChanges,
    SimpleChanges,
    OnDestroy,
} from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { IPointTank, IPointD3 } from '../models/smart-scroll.model';

@Directive({
    selector: '[evjLineChartTanks]',
})
export class LineChartTanksDirective implements OnChanges, OnDestroy {
    @Input() private points: IPointTank[] = [];
    @Input() private graphMaxX: number = null;
    @Input() private graphMaxY: number = null;
    @Input() private scaleFuncs: { x: any; y: any } = { x: null, y: null };
    @Input() private padding: { [key: string]: number } = {};

    private readonly arrowUpUrl: string = 'assets/icons/widgets/reasons-deviations/up-icon.svg';
    private readonly arrowDownUrl: string = 'assets/icons/widgets/reasons-deviations/down-icon.svg';
    private readonly tankImageUrl: string = 'assets/icons/widgets/reasons-deviations/tank-img.svg';

    private svg: any = null;

    private chartPointsData: IPointD3[] = [];

    private eventListenerFn: () => void = null;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (!changes.points?.firstChange || !changes.scaleFuncs?.firstChange) {
            this.mainFunction();
        }
    }

    public ngOnDestroy(): void {
        if (this.eventListenerFn) {
            this.eventListenerFn();
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
            const iconUrl: string =
                point.additional?.direction === 'Источник' ? this.arrowDownUrl : this.arrowUpUrl;

            pointG
                .append('image')
                .attr('xlink:href', iconUrl)
                .attr('width', iconHeight)
                .attr('height', iconWidth)
                .attr('x', point.x - iconWidth / 2)
                .attr('y', point.y - (iconHeight + 5));

            if (point.additional) {
                const cardWidth: number = 120;
                const cardHeight: number = 140;
                const rx: number = 10;

                let cardPosX: number = point.x;
                let cardPosY: number = point.y;
                let offset: number = iconWidth / 2;

                if (this.graphMaxX && cardWidth + cardPosX > this.graphMaxX - this.padding.left) {
                    cardPosX = point.x - cardWidth;
                    offset *= -1;
                }

                if (
                    this.graphMaxY &&
                    cardHeight + cardPosY > this.graphMaxY - this.padding.bottom
                ) {
                    cardPosY =
                        cardPosY + (this.graphMaxY - (cardHeight + cardPosY + this.padding.bottom));
                    cardPosX += offset;
                }

                const cardG = pointG
                    .append('g')
                    .attr('class', 'point-card')
                    .style('display', 'none');

                cardG
                    .append('rect')
                    .attr('width', cardWidth)
                    .attr('height', cardHeight)
                    .attr('rx', rx)
                    .attr('fill', 'rgb(28, 35, 51)')
                    .attr('x', cardPosX)
                    .attr('y', cardPosY);

                const tankWidth: number = 60;
                const tankHeight: number = 70;
                const tankPosX: number = cardPosX + (cardWidth - tankWidth) / 2;
                const tankPosY: number = cardPosY + (cardHeight - tankHeight) / 2;

                const textPosX: number = cardPosX + cardWidth / 2;
                const textSize: number = 14;
                const textTypeColor: string = '#8c99b2';
                const textTypePosY: number = cardPosY + textSize * 1.3;
                const textTankColor: string = '#ffffff';
                const textTankPosY: number = cardPosY + cardHeight - textSize;

                cardG
                    .append('image')
                    .attr('xlink:href', this.tankImageUrl)
                    .attr('width', tankWidth)
                    .attr('height', tankHeight)
                    .attr('x', tankPosX)
                    .attr('y', tankPosY);

                cardG
                    .append('text')
                    .attr('text-anchor', 'middle')
                    .attr('x', textPosX)
                    .attr('y', textTypePosY)
                    .text(point.additional.direction)
                    .attr('fill', textTypeColor)
                    .style('font-size', 14);

                cardG
                    .append('text')
                    .attr('text-anchor', 'middle')
                    .attr('x', textPosX)
                    .attr('y', textTankPosY)
                    .text(point.additional.title)
                    .attr('fill', textTankColor)
                    .style('font-size', 14);

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
            }
        });

        return () => eventListeners.forEach((listener) => listener());
    }
}
