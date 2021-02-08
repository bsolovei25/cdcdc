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
import { IPointTank, IPointD3 } from '../models/smart-scroll.model';
import { lineBreakTankName } from '../functions/line-break.function';

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
    private readonly tankImageUrl: string = 'assets/icons/widgets/reasons-deviations/tank-icon.svg';
    private readonly unitImageUrl: string = 'assets/icons/widgets/reasons-deviations/unit-icon.svg';

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
                point.additional?.card?.direction === 'Источник' ? this.arrowDownUrl : this.arrowUpUrl;

            pointG
                .append('image')
                .attr('xlink:href', iconUrl)
                .attr('width', iconHeight)
                .attr('height', iconWidth)
                .attr('x', point.x - iconWidth / 2)
                .attr('y', point.y - (iconHeight + 5));
        });

        this.chartPointsData.forEach((point: IPointD3) => {
            const pointG = pointsG.append('g').attr('class', 'chart-point-hidden');

            const iconHeight: number = 24;
            const iconWidth: number = 24;

            pointG
                .append('rect')
                .attr('class', 'icon-hidden')
                .attr('width', iconHeight)
                .attr('height', iconWidth)
                .attr('x', point.x - iconWidth / 2)
                .attr('y', point.y - (iconHeight + 5))
                .attr('fill', 'transparent')
                .style('cursor', 'pointer');

            if (point.additional?.card && this.graphMaxY && this.graphMaxX) {
                const cardWidth: number = 100;
                let cardHeight: number = 100;
                const rx: number = 7;

                if (cardHeight > this.graphMaxY - this.padding.top - this.padding.bottom) {
                    cardHeight = this.graphMaxY - this.padding.top - this.padding.bottom;
                }

                let cardPosX: number = point.x;
                let cardPosY: number = point.y;
                let offset: number = iconWidth / 2;

                if (this.graphMaxX && cardWidth + cardPosX > this.graphMaxX - this.padding.left) {
                    cardPosX = point.x - cardWidth;
                    offset *= -1;
                }

                if (this.graphMaxY && cardHeight + cardPosY > this.graphMaxY - this.padding.bottom) {
                    cardPosY = cardPosY + (this.graphMaxY - (cardHeight + cardPosY + this.padding.bottom));
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

                const tankWidth: number = 50;
                const tankHeight: number = 50;
                const tankPosX: number = cardPosX + (cardWidth - tankWidth) / 2;
                const tankPosY: number = cardPosY + (cardHeight - tankHeight) / 2;
                const tankUrl: string =
                    point.additional.card.objectType === 'tank' ? this.tankImageUrl : this.unitImageUrl;

                const textPosX: number = cardPosX + cardWidth / 2;
                const textSize: number = 12;
                const textTypeColor: string = '#8c99b2';
                const textTypePosY: number = cardPosY + textSize * 1.5;
                const textTankColor: string = '#ffffff';
                const textTankPosY: number = cardPosY + cardHeight - textSize * 1.5;

                cardG
                    .append('image')
                    .attr('xlink:href', tankUrl)
                    .attr('width', tankWidth)
                    .attr('height', tankHeight)
                    .attr('x', tankPosX)
                    .attr('y', tankPosY);

                cardG
                    .append('text')
                    .attr('text-anchor', 'middle')
                    .attr('x', textPosX)
                    .attr('y', textTypePosY)
                    .text(point.additional.card.direction)
                    .attr('fill', textTypeColor)
                    .style('font-size', 12);

                if (point.additional.card.title.length > 12) {
                    const [firstStr, secondStr] = lineBreakTankName(point.additional.card.title);

                    cardG
                        .append('text')
                        .attr('text-anchor', 'middle')
                        .attr('x', textPosX)
                        .attr('y', textTankPosY)
                        .text(firstStr)
                        .attr('fill', textTankColor)
                        .style('font-size', 10);

                    cardG
                        .append('text')
                        .attr('text-anchor', 'middle')
                        .attr('x', textPosX)
                        .attr('y', textTankPosY + 10)
                        .text(secondStr)
                        .attr('fill', textTankColor)
                        .style('font-size', 10);
                } else {
                    cardG
                        .append('text')
                        .attr('text-anchor', 'middle')
                        .attr('x', textPosX)
                        .attr('y', textTankPosY)
                        .text(point.additional.card.title)
                        .attr('fill', textTankColor)
                        .style('font-size', 10);
                }

                const [[icon]] = pointG.select('rect.icon-hidden')._groups;

                const card: HTMLElement = icon.nextSibling as HTMLElement;

                eventListeners.push(
                    this.renderer.listen(icon, 'click', () => {
                        const display: string = card.style.display === 'none' ? 'inline' : 'none';
                        this.svg.selectAll('g.chart-points g.point-card').style('display', 'none');
                        card.style.display = display;
                    }),
                    this.renderer.listen(card, 'click', () => {
                        card.style.display = 'none';
                    })
                );
            }
        });

        return () => eventListeners.forEach((listener) => listener());
    }
}
