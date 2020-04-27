import { Directive, ElementRef, HostListener, Renderer2, Input } from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';

@Directive({
    selector: '[evjLineChartPicker]',
})
export class LineChartPickerDirective {
    @Input() private graphMaxX: number = null;
    @Input() private graphMaxY: number = null;
    @Input() private scaleFuncs: { x: any; y: any } = { x: null, y: null };
    @Input() private padding: { [key: string]: number } = {};

    private svg: any = null;

    private readonly dataPickerColors: { [key: string]: string } = {
        standard: '#00A99D',
        warning: '#f4a321',
        danger: '#eb5757',
    };

    private eventListenerFn: () => void = null;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('mouseenter') onMouseEnter(): void {
        this.svg = d3Selection.select(this.el.nativeElement).select('svg');

        if (this.svg._groups[0][0]) {
            this.drawMouseGroup();
        }
    }

    @HostListener('mouseleave') onMouseLeave(): void {
        if (this.eventListenerFn) {
            this.eventListenerFn();
        }
    }

    private drawMouseGroup(): void {
        const height = this.graphMaxY - this.padding.top - this.padding.bottom;
        const width = this.graphMaxX - this.padding.left - this.padding.right;

        // группа событий мыши
        const mouseG = this.svg
            .append('g')
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

        // отрисовка левой части плашки
        infoG
            .append('line')
            .attr('class', 'line-left-horizontal')
            .attr('x1', 0)
            .attr('y1', -8)
            .attr('x2', 0)
            .attr('y2', -8)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-left-horizontal')
            .attr('x1', 0)
            .attr('y1', 15)
            .attr('x2', 0)
            .attr('y2', 15)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-left-vertical')
            .attr('x1', 0)
            .attr('y1', -6)
            .attr('x2', 0)
            .attr('y2', 13)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-left-incline')
            .attr('x1', 0)
            .attr('y1', 15)
            .attr('x2', 0)
            .attr('y2', 13)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-left-incline')
            .attr('x1', 0)
            .attr('y1', -8)
            .attr('x2', 0)
            .attr('y2', -6)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        // отрисовка правой части плашки
        infoG
            .append('line')
            .attr('class', 'line-right-horizontal')
            .attr('x1', 0)
            .attr('y1', -8)
            .attr('x2', 0)
            .attr('y2', -8)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-right-horizontal')
            .attr('x1', 0)
            .attr('y1', 15)
            .attr('x2', 0)
            .attr('y2', 15)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-right-vertical')
            .attr('x1', 0)
            .attr('y1', -6)
            .attr('x2', 0)
            .attr('y2', 13)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-right-incline')
            .attr('x1', 0)
            .attr('y1', 15)
            .attr('x2', 0)
            .attr('y2', 13)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        infoG
            .append('line')
            .attr('class', 'line-right-incline')
            .attr('x1', 0)
            .attr('y1', -8)
            .attr('x2', 0)
            .attr('y2', -6)
            .attr('stroke-width', 1)
            .attr('stroke', 'currentColor');

        // значение на кривой факт
        infoG
            .append('text')
            .attr('text-anchor', 'end')
            .attr('class', 'mouse-graph-value')
            .attr('x', 0)
            .attr('y', 8)
            .style('font-size', '13')
            .style('fill', 'white');

        // отклонение от плана
        infoG
            .append('text')
            .attr('text-anchor', 'start')
            .attr('class', 'mouse-graph-deviation')
            .attr('x', 0)
            .attr('y', 8)
            .style('font-size', '13')
            .style('fill', 'currentColor');

        // текущая дата
        infoG
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('class', 'mouse-graph-date')
            .attr('x', 0)
            .attr('y', -14)
            .style('font-size', '11')
            .style('fill', 'white');
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
                const posPlan = this.findCursorPosition(x, 'plan');

                this.svg
                    .select('.mouse-line')
                    .attr('x1', x)
                    .attr('x2', x);

                this.svg.selectAll('.mouse-line-circle').attr('cx', x);

                this.svg
                    .select('.mouse-per-line')
                    .attr('cx', x)
                    .attr('cy', posFact.y - this.padding.top);

                const infoFramePaddings = {
                    near: 20,
                    nearText: 15,
                    longerAngle: 58,
                    longer: 60,
                };

                this.svg
                    .selectAll('g.mouse-info .line-left-horizontal')
                    .attr('x1', x - infoFramePaddings.longerAngle)
                    .attr('x2', x - infoFramePaddings.near);
                this.svg
                    .selectAll('g.mouse-info .line-left-vertical')
                    .attr('x1', x - infoFramePaddings.longer)
                    .attr('x2', x - infoFramePaddings.longer);
                this.svg
                    .selectAll('g.mouse-info .line-right-horizontal')
                    .attr('x1', x + infoFramePaddings.longerAngle)
                    .attr('x2', x + infoFramePaddings.near);
                this.svg
                    .selectAll('g.mouse-info .line-right-vertical')
                    .attr('x1', x + infoFramePaddings.longer)
                    .attr('x2', x + infoFramePaddings.longer);
                this.svg
                    .selectAll('g.mouse-info .line-right-incline')
                    .attr('x1', x + infoFramePaddings.longerAngle)
                    .attr('x2', x + infoFramePaddings.longer);
                this.svg
                    .selectAll('g.mouse-info .line-left-incline')
                    .attr('x1', x - infoFramePaddings.longerAngle)
                    .attr('x2', x - infoFramePaddings.longer);

                this.svg
                    .select('g.mouse-info .mouse-graph-value')
                    .attr('x', x - infoFramePaddings.nearText)
                    .text(this.scaleFuncs.y.invert(posFact.y).toFixed(0));

                this.svg
                    .select('g.mouse-info .mouse-graph-deviation')
                    .attr('x', x + infoFramePaddings.nearText)
                    .text(
                        (
                            this.scaleFuncs.y.invert(posFact.y) -
                            this.scaleFuncs.y.invert(posPlan.y)
                        ).toFixed(0)
                    );

                const formatDate = d3.timeFormat('%d.%m.%Y | %H:%M:%S');

                this.svg
                    .select('g.mouse-info .mouse-graph-date')
                    .attr('x', x)
                    .text(formatDate(this.scaleFuncs.x.invert(posFact.x)));

                if (posFact.y < posPlan.y) {
                    this.svg.select('g.mouse-over').style('color', this.dataPickerColors.danger);
                } else {
                    this.svg.select('g.mouse-over').style('color', this.dataPickerColors.standard);
                }
            })
        );

        return () => eventListeners.forEach((item) => item());
    }

    private findCursorPosition(posX: number, curveType: 'plan' | 'fact'): SVGPoint {
        let line: SVGGeometryElement = null;
        [[line]] = this.svg.select(`.graph-line-${curveType}`)._groups;

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
