import { Directive, Input, ElementRef, Renderer2, HostListener, OnDestroy } from '@angular/core';
import * as d3Selection from 'd3-selection';
import { ProductionTrendType } from '../../dashboard/models/LCO/production-trends.model';
import { lineBreakTankName } from '../functions/line-break.function';
import { findCursorPosition } from '../functions/find-cursor-position.function';

@Directive({
    selector: '[evjLineChartPickerTank]',
})
export class LineChartPickerTankDirective implements OnDestroy {
    @Input() private graphMaxX: number = null;
    @Input() private graphMaxY: number = null;
    @Input() private scaleFuncs: { x: any; y: any } = { x: null, y: null };
    @Input() private padding: { [key: string]: number } = {};
    @Input() private maxValue: number = 7000;
    @Input() private tankName: string = 'Резервуар 0';

    private svg: any = null;

    private readonly dataPickerColors: { [key: string]: string } = {
        standard: '#3fa9f5',
    };

    private readonly card: { [key: string]: number } = {
        width: 120,
        height: 75,
        rx: 10,
        offsetY: 10,
    };

    private readonly tank: { [key: string]: number } = {
        width: 50,
        weight: 50,
    };

    private readonly tankImageUrl: string = 'assets/icons/widgets/reasons-deviations/tank-icon.svg';
    private readonly unitImageUrl: string = 'assets/icons/widgets/reasons-deviations/unit-icon.svg';

    private eventListenerFn: () => void = null;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    public ngOnDestroy(): void {
        if (this.eventListenerFn) {
            this.eventListenerFn();
        }
    }

    @HostListener('mouseenter') onMouseEnter(): void {
        this.svg = d3Selection.select(this.el.nativeElement).select('svg');

        if (this.svg._groups[0][0]) {
            this.drawMouseGroup();
        }
    }

    @HostListener('mouseleave') onMouseLeave(): void {
        if (this.eventListenerFn) {
            this.svg.select('g.mouse-over').remove();
            this.eventListenerFn();
        }
    }

    private drawMouseGroup(): void {
        const height = this.graphMaxY - this.padding.top - this.padding.bottom;
        const width = this.graphMaxX - this.padding.left - this.padding.right;

        // группа событий мыши
        const mouseG = this.svg
            .select('g.chart-points')
            .insert('g', 'g.chart-point-hidden')
            .attr('class', 'mouse-over')
            .attr('transform', `translate(${this.padding.left},${this.padding.top})`)
            .attr('opacity', 0)
            .style('color', this.dataPickerColors.standard);

        // линия курсора
        mouseG
            .append('line')
            .attr('class', 'mouse-line')
            .attr('y1', 0)
            .attr('x1', 0)
            .attr('y2', height)
            .attr('x2', 0)
            .style('stroke', 'currentColor')
            .style('stroke-width', '1px');

        // точка курсора на оси дат
        mouseG
            .append('circle')
            .attr('class', 'mouse-line-circle')
            .attr('r', '3')
            .attr('cy', `${height}`)
            .style('fill', 'currentColor');

        // точки курсора на плашке
        mouseG
            .append('circle')
            .attr('class', 'mouse-line-circle')
            .attr('r', '4')
            .attr('cy', 0)
            .attr('opacity', 1)
            .style('fill', 'currentColor');
        mouseG
            .append('circle')
            .attr('class', 'mouse-line-circle')
            .attr('r', '5')
            .attr('cy', 0)
            .attr('opacity', 0.6)
            .style('fill', 'currentColor');
        mouseG
            .append('circle')
            .attr('class', 'mouse-line-circle')
            .attr('r', '8')
            .attr('cy', 0)
            .attr('opacity', 0.3)
            .style('fill', 'currentColor');
        mouseG
            .append('circle')
            .attr('class', 'mouse-line-circle')
            .attr('r', '12')
            .attr('cy', 0)
            .attr('opacity', 0.1)
            .style('fill', 'currentColor');

        // точка курсора на линии плановых значений
        mouseG
            .append('circle')
            .attr('class', 'mouse-per-line')
            .attr('r', '4')
            .style('fill', 'currentColor')
            .style('stroke-width', '1px');

        this.drawMouseInfoGroup();

        // область для прослушивания событий мыши
        const [[mouseListenArea]] = mouseG
            .append('svg:rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')._groups;

        this.eventListenerFn = this.listenMouseEvents(mouseListenArea);
    }

    private drawMouseInfoGroup(): void {
        const infoG = this.svg
            .select('g.mouse-over')
            .append('g')
            .attr('class', 'mouse-info');

        infoG
            .append('clipPath')
            .attr('id', 'rect-clip')
            .append('rect')
            .attr('class', 'card')
            .attr('x', 0)
            .attr('y', this.card.offsetY)
            .attr('width', this.card.width)
            .attr('height', this.card.height)
            .attr('rx', this.card.rx);

        infoG
            .append('clipPath')
            .attr('id', 'value-clip')
            .append('rect')
            .attr('class', 'card')
            .attr('x', 0)
            .attr('y', this.card.height - 30)
            .attr('width', this.card.width)
            .attr('height', this.card.height);

        infoG
            .append('rect')
            .attr('class', 'card')
            .attr('x', 0)
            .attr('y', this.card.offsetY)
            .attr('width', this.card.width)
            .attr('height', this.card.height)
            .attr('rx', this.card.rx)
            .attr('fill', 'rgb(28, 35, 51)');

        const tankUrl: string = true ? this.tankImageUrl : this.unitImageUrl;

        const tankG = infoG.append('g').attr('class', 'mouse-info-tank');

        tankG
            .append('image')
            .attr('class', 'card-tank-image')
            .attr('xlink:href', tankUrl)
            .attr('width', this.tank.width)
            .attr('height', this.tank.height)
            .attr('x', this.card.width * 0.05)
            .attr('y', this.card.height * 0.2);

        if (this.tankName.length > 9) {
            const [firstStr, secondStr] = lineBreakTankName(this.tankName);

            tankG
                .append('text')
                .attr('class', 'card-tank-text')
                .attr('text-anchor', 'middle')
                .attr('x', this.card.width * 0.05 + this.tank.width / 2)
                .attr('y', 65)
                .text(firstStr)
                .attr('fill', '#ffffff')
                .style('font-size', 10);

            tankG
                .append('text')
                .attr('class', 'card-tank-text')
                .attr('text-anchor', 'middle')
                .attr('x', this.card.width * 0.05 + this.tank.width / 2)
                .attr('y', 77)
                .text(secondStr)
                .attr('fill', '#ffffff')
                .style('font-size', 10);
        } else {
            tankG
                .append('text')
                .attr('class', 'card-tank-text')
                .attr('text-anchor', 'middle')
                .attr('x', this.card.width * 0.05 + this.tank.width / 2)
                .attr('y', 70)
                .text(this.tankName)
                .attr('fill', '#ffffff')
                .style('font-size', 10);
        }

        tankG
            .append('circle')
            .attr('class', 'card-circle')
            .attr('cx', (this.card.width / 4) * 3.3)
            .attr('cy', this.card.height / 2 + this.card.offsetY)
            .attr('r', this.card.height / 1.9)
            .attr('fill', this.dataPickerColors.standard)
            .attr('opacity', 0.1)
            .style('clip-path', 'url(#rect-clip)');

        tankG
            .append('circle')
            .attr('class', 'card-circle')
            .attr('cx', (this.card.width / 4) * 3.3)
            .attr('cy', this.card.height / 2 + this.card.offsetY)
            .attr('r', this.card.height / 2.5)
            .attr('fill', this.dataPickerColors.standard)
            .attr('opacity', 0.3)
            .style('clip-path', 'url(#rect-clip)');

        tankG
            .append('circle')
            .attr('class', 'card-circle')
            .attr('cx', (this.card.width / 4) * 3.3)
            .attr('cy', this.card.height / 2 + this.card.offsetY)
            .attr('r', this.card.height / 2.5)
            .attr('fill', this.dataPickerColors.standard)
            .style('clip-path', 'url(#rect-clip)')
            .style('clip-path', 'url(#value-clip)');

        tankG
            .append('text')
            .attr('class', 'card-circle-text')
            .attr('text-anchor', 'middle')
            .attr('x', (this.card.width / 4) * 3.3)
            .attr('y', (this.card.height / 4) * 3)
            .text('710т')
            .attr('fill', '#ffffff')
            .style('font-size', 12);
    }

    private listenMouseEvents(element: HTMLElement): () => void {
        const eventListeners: (() => void)[] = [];

        eventListeners.push(
            this.renderer.listen(element, 'mouseout', () => {
                this.svg.select('.mouse-over').style('opacity', 0);
            }),
            this.renderer.listen(element, 'mouseover', () => {
                this.svg.select('.mouse-over').style('opacity', 1);
            }),
            this.renderer.listen(element, 'mousemove', (event: MouseEvent) => {
                const rect: DOMRect = element.getBoundingClientRect();
                const x = event.clientX - rect.left;

                this.moveLineCoords(x);

                this.moveCardCoords(x);
                this.drawCircleColumnDiagram(x);
            })
        );

        return () => eventListeners.forEach((item) => item());
    }

    private moveLineCoords(x: number): void {
        const posFact = findCursorPosition(x, 'fact', this.svg, this.padding);

        if (!posFact) {
            return;
        }

        this.svg
            .select('.mouse-line')
            .attr('x1', x)
            .attr('x2', x);

        this.svg.selectAll('.mouse-line-circle').attr('cx', x);

        this.svg
            .select('.mouse-per-line')
            .attr('cx', x)
            .attr('cy', posFact.y - this.padding.top);
    }

    private moveCardCoords(x: number): void {
        const cardG = this.svg.select('g.mouse-over g.mouse-info');

        let offsetX: number = 10;
        let coordX: number = 0;

        if (this.graphMaxX - this.padding.right - this.padding.left < x + offsetX + this.card.width) {
            coordX -= this.card.width;
            offsetX *= -1;
        }

        coordX += offsetX + x;

        cardG.selectAll('.card').attr('x', coordX);
        cardG.selectAll('.card-tank-image').attr('x', this.card.width * 0.05 + coordX);
        cardG.selectAll('.card-tank-text').attr('x', this.card.width * 0.05 + this.tank.width / 2 + coordX);
        cardG.selectAll('.card-circle').attr('cx', (this.card.width / 4) * 3.3 + coordX);
        cardG.selectAll('.card-circle-text').attr('x', (this.card.width / 4) * 3.3 + coordX);
    }

    private drawCircleColumnDiagram(x: number): void {
        const posFact = findCursorPosition(x, 'fact', this.svg, this.padding);

        if (!posFact) {
            return;
        }

        const factY = this.scaleFuncs.y.invert(posFact.y);

        const percent: number = factY / this.maxValue;

        const cardG = this.svg.select('g.mouse-over g.mouse-info');
        cardG.select('.card-circle-text').text(`${factY.toFixed(0)}т`);
        cardG.select('#value-clip rect').attr('y', this.card.offsetY + this.card.height * (1 - percent));
    }
}
