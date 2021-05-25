import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ElementRef,
    Renderer2,
    ViewChild,
    OnChanges,
    SimpleChange
} from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { ICmidMultichartModel } from '../../models/cmid-overall-operational-indicator.model';

@Component({
    selector: 'evj-cmid-metrics-of-change-graph-multiline',
    templateUrl: './cmid-overall-operational-indicator-graph.component.html',
    styleUrls: ['./cmid-overall-operational-indicator-graph.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmidOverallOperationalIndicatorGraphComponent implements OnChanges {
    @Input() data: ICmidMultichartModel[] = [];
    @ViewChild('svgWrapper', { static: true }) svgWrapper: ElementRef;

    public group: string[];
    public gridLinesY: number;
    public gridLinesX: number;
    public lineGroup: any;
    public readonly padding: {top: number, right: number, bottom: number, left: number} = {
        top: 22,
        right: 20,
        bottom: 15,
        left: 25
    }
    private axes: { axisX: d3.axisBottom, axisY: d3.axisLeft } = {axisX: null, axisY: null};
    private scaleFunc: {x: d3.scaleTime, y: d3.scaleLinear} = {x: null, y: null};
    private svg: d3Selection;
    private svgInner: d3Selection;
    private width: number = null;
    private height: number = null;
    private mouseLeaveUnlistener: () => void;
    private mouseMoveUnlistener: () => void;
    private mousePosition: number | null = null;

    constructor(public chartElem: ElementRef, private renderer: Renderer2) {
    }

    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        if (changes.data) {
            this.dropChart();
            this.initSvg();
            this.initScale();
            this.initAxes();
            this.drawLines(this.data);
            this.drawGridLines();
        } else {
            this.dropChart();
        }
    }

    private initSvg(): void {
        this.svg = d3
            .select(this.chartElem.nativeElement)
            .select('.graph-multiline__chart')
            .append('svg')
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("preserveAspectRatio", "xMinYMin")
            .attr("height", '100%')
            .attr("width", '100%')
            .attr(
                'viewBox',
                `0 0 ${this.svgWrapper.nativeElement.getBoundingClientRect().width + 30} ${this.svgWrapper.nativeElement.getBoundingClientRect().height + 30}`
            );
        this.svgInner = this.svg.append('g').attr('class', 'graph__lines').style('transform', 'translateY(5px)');
    }

    private initScale(): void {
        const minYValues = [];
        const maxYValues = [];
        const axisData = this.data.map((item: ICmidMultichartModel) => {
            return item.graph;
        })
        axisData.forEach(item => {
            minYValues.push(Math.min(...item.map(d => d.value)));
            maxYValues.push(Math.max(...item.map(d => d.value)));
        })
        this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
        this.height = this.chartElem.nativeElement.getBoundingClientRect().height;
        this.scaleFunc.x = d3.scaleTime().domain([new Date('2021-05-01'), new Date('2021-05-31')]).range([0, this.width])
        this.scaleFunc.y = d3.scaleLinear().domain([Math.max(...maxYValues), Math.min(...minYValues)]).range([0, this.height])
    }

    private initAxes(): void {
        this.axes.axisX = d3.axisBottom().scale(this.scaleFunc.x).ticks(31).tickFormat(d3.timeFormat('%d'));
        this.axes.axisY = d3.axisLeft().scale(this.scaleFunc.y);
        this.svgInner.append("g")
            .attr("class", "axis")
            .style('transform', 'translate(' + this.padding.left + 'px, ' + (this.height) + 'px)')
            .call(this.axes.axisX);
        this.svgInner.append("g")
            .attr("class", "axis")
            .style("transform", 'translate(' + this.padding.left + 'px,  0)')
            .call(this.axes.axisY);
    }

    private drawLines(data: ICmidMultichartModel[]): void {
        const line = d3
            .line()
            .x(d => d[0])
            .y(d => d[1])
            .curve(d3.curveCardinal);
        data.forEach((item: ICmidMultichartModel) => {
            if (item.visible) {
                const points: [number, number][] = item.graph.map(d => [
                    this.scaleFunc.x(new Date(d.timeStamp)),
                    this.scaleFunc.y(d.value),
                ]);
                this.lineGroup = this.svgInner
                    .append('g')
                    .append('path')
                    .style('transform', 'translate(' + this.padding.left + 'px, ' + '0px)')
                    .attr('id', 'line')
                    .style('fill', 'none')
                    .style('stroke', item.color)
                    .style('stroke-width', '2px')
                this.lineGroup.attr('d', line(points));
            }
        })
    }

    private drawGridLines(): void {
        this.gridLinesY = d3.axisLeft(this.scaleFunc.y)
            .tickFormat('')
            .tickSize(-this.width)
            .scale(this.scaleFunc.y);
        this.gridLinesX = d3.axisBottom(this.scaleFunc.x)
            .tickFormat('')
            .tickSize(-this.height)
            .ticks(32)
            .scale(this.scaleFunc.x);
        this.svg.append("g")
            .attr("class", "grid")
            .style('transform', 'translate(' + this.padding.left + 'px, ' + '5px)')
            .style('color', 'var(--chart-segment-color)')
            .call(this.gridLinesY)
            .select('.domain')
            .style('visibility', 'hidden');
        this.svg.append("g")
            .attr("class", "grid")
            .style('transform', 'translate(' + this.padding.left + 'px, ' + (this.height + 5) + 'px)')
            .style('color', 'var(--chart-segment-color)')
            .call(this.gridLinesX)
            .select('.domain')
            .style('visibility', 'hidden');
    }

    private drawMouseGroup(): void {
        // группа событий мыши
        const mouseG = this.svg
            .append('g')
            .attr('class', 'mouse-over')
            .attr('opacity', 1)
            .style('transform', `translate(${this.padding.left}, 5px)`)
            .style('width', this.width + 'px');

        // лейбл с датой
        mouseG
            .append('text')
            .attr('class', 'label-mouse')
            .attr('text-anchor', 'start')
            .attr('font-size', '12px')
            .attr('x', 0)
            .attr('y', this.chartElem.nativeElement.clientHeight + this.padding.top - 10)
            .attr('fill', '#D7E2F2')
            .text('');

        // линия курсора
        mouseG
            .append('line')
            .attr('class', 'mouse-line')
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('y1', 0)
            .attr('y2', this.height)
            .style('stroke', 'currentColor')
            .style('stroke-width', '1px');

        // область для прослушивания событий мыши
        const [[mouseListenArea]] = mouseG
            .append('svg:rect')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')._groups;

        this.listenMouseEvents(mouseListenArea);
    }

    private listenMouseEvents(element: HTMLElement): void {
        const eventListeners: (() => void)[] = [];
        eventListeners.push(
            this.mouseLeaveUnlistener = this.renderer.listen(element, 'mouseleave', () => {
                this.toggleShowingValues('disable');
                this.mousePosition = null;
            }),
            this.mouseMoveUnlistener = this.renderer.listen(element, 'mousemove', (event: MouseEvent) => {
                const formatDate = d3.timeFormat('%d/%H:%M');
                const rect: DOMRect = element.getBoundingClientRect();

                this.toggleShowingValues('enable');
                this.mousePosition = event.clientX - rect.left;
                this.svg.select('.mouse-line').attr('x1', this.mousePosition).attr('x2', this.mousePosition);
                this.svg
                    .select('.label-mouse')
                    .attr('x', this.mousePosition + 10)
                    .text(formatDate(this.scaleFunc.x.invert(this.mousePosition)))
            })
        );
    }

    private toggleShowingValues(actionType: 'enable' | 'disable'): void {
        this.svg.select('.mouse-line').style('opacity', actionType === 'enable' ? 1 : 0);
        this.svg.select('.label-mouse').style('opacity', actionType === 'enable' ? 1 : 0);
    }

    private dropChart(): void {
        if (this.svg) {
            this.svg.remove();
        }
    }
}
