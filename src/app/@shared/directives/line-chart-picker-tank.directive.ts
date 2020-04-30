import { Directive, Input, ElementRef, Renderer2, HostListener, OnDestroy } from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { ProductionTrendType } from '../../dashboard/models/production-trends.model';

@Directive({
    selector: '[evjLineChartPickerTank]',
})
export class LineChartPickerTankDirective implements OnDestroy {
    @Input() private graphMaxX: number = null;
    @Input() private graphMaxY: number = null;
    @Input() private scaleFuncs: { x: any; y: any } = { x: null, y: null };
    @Input() private padding: { [key: string]: number } = {};

    private svg: any = null;

    private readonly dataPickerColors: { [key: string]: string } = {
        standard: '#3fa9f5',
    };

    private readonly card: {[key:string]:string} = {}

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

        const cardWidth: number = 120;
        const cardHeight: number = 75;
        const rx: number = 10;

        infoG
            .append('rect')
            .attr('x', 0)
            .attr('y', 5)
            .attr('width', cardWidth)
            .attr('height', cardHeight)
            .attr('rx', rx)
            .attr('fill', 'rgb(28, 35, 51)');

        const tankWidth: number = 50;
        const tankHeight: number = 50;

        const tankUrl: string = true ? this.tankImageUrl : this.unitImageUrl;

        const tankG = infoG.append('g').attr('class', 'mouse-info-tank');

        tankG
            .append('image')
            .attr('xlink:href', tankUrl)
            .attr('width', tankWidth)
            .attr('height', tankHeight)
            .attr('x', 5)
            .attr('y', 10);

        tankG
            .append('text')
            .attr('text-anchor', 'start')
            .attr('x', 5)
            .attr('y', 65)
            .text('Резервуар')
            .attr('fill', '#ffffff')
            .style('font-size', 10);

        tankG
            .append('text')
            .attr('text-anchor', 'start')
            .attr('x', 5)
            .attr('y', 80)
            .text('№234')
            .attr('fill', '#ffffff')
            .style('font-size', 10);
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

                const posFact = this.findCursorPosition(x, 'fact');

                const factY = this.scaleFuncs.y.invert(posFact.y);

                this.svg
                    .select('.mouse-line')
                    .attr('x1', x)
                    .attr('x2', x);

                this.svg.selectAll('.mouse-line-circle').attr('cx', x);

                this.svg
                    .select('.mouse-per-line')
                    .attr('cx', x)
                    .attr('cy', posFact.y - this.padding.top);

                // this.svg.select('g.mouse-over g.mouse-info rect').attr('x', x + 10);
            })
        );

        return () => eventListeners.forEach((item) => item());
    }

    private findCursorPosition(posX: number, curveType: ProductionTrendType): SVGPoint {
        let line: SVGGeometryElement = null;
        [[line]] = this.svg.select(`.graph-line-${curveType}`)._groups;

        if (!line) {
            return null;
        }

        let begin: number = 0;
        let end: number = line.getTotalLength();
        let target: number = null;
        let pos: SVGPoint = null;

        while (true) {
            target = Math.floor((begin + end) / 2);
            pos = line.getPointAtLength(target);
            if ((target === end || target === begin) && pos.x !== posX + this.padding.left) {
                break;
            }
            if (pos.x > posX + this.padding.left) {
                end = target;
            } else if (pos.x < posX + this.padding.left) {
                begin = target;
            } else {
                break;
            }
        }

        return pos;
    }
}
