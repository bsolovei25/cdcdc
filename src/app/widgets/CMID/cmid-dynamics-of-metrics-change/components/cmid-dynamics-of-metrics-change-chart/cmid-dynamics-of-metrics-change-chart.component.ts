import {
    Component,
    ChangeDetectionStrategy,
    Input,
    ElementRef,
    Renderer2,
    ViewChild,
    AfterViewInit,
    HostListener,
} from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { ICmidDynamicsOfMetricsChangeModel } from '@widgets/CMID/cmid-dynamics-of-metrics-change/models/cmid-dynamics-of-metrics-change.model';

@Component({
    selector: 'evj-cmid-dynamics-of-metrics-change-chart',
    templateUrl: './cmid-dynamics-of-metrics-change-chart.component.html',
    styleUrls: ['./cmid-dynamics-of-metrics-change-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmidDynamicsOfMetricsChangeChartComponent implements AfterViewInit {
    @Input() public data: ICmidDynamicsOfMetricsChangeModel[];
    @ViewChild('linechart') svgWrapper: ElementRef;

    public group: string[];
    public gridLinesY: number;
    public gridLinesX: number;
    public lineGroup: any;
    public readonly padding: { top: number; right: number; bottom: number; left: number } = {
        top: 22,
        right: 20,
        bottom: 15,
        left: 25,
    };
    private axes: { axisX: d3.axisBottom; axisY: d3.axisLeft } = { axisX: null, axisY: null };
    private scaleFunc: { x: d3.scaleTime; y: d3.scaleLinear } = { x: null, y: null };
    private svg: d3Selection;
    private svgInner: d3Selection;
    private width: number = null;
    private height: number = null;
    private normalizeNumber: number = 30;
    private mouseLeaveUnlistener: () => void;
    private mouseMoveUnlistener: () => void;
    private mousePosition: number | null = null;

    constructor(public chartElem: ElementRef, private renderer: Renderer2) {}

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.graphInit();
    }

    ngAfterViewInit(): void {
        this.graphInit();
    }

    private graphInit(): void {
        this.dropChart();
        this.initSvg();
        this.initScale();
        this.initAxes();
        this.drawLines();
        this.drawGridLines();
    }

    private initSvg(): void {
        this.svg = d3
            .select(this.chartElem.nativeElement)
            .select('.linechart__graph')
            .style('height', `calc(100% - ${this.normalizeNumber}px)`)
            .append('svg')
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('preserveAspectRatio', 'none')
            .attr('height', '100%')
            .attr('width', '100%')
            .attr(
                'viewBox',
                `0 0 ${this.svgWrapper.nativeElement.getBoundingClientRect().width + this.normalizeNumber} ${
                    this.svgWrapper.nativeElement.getBoundingClientRect().height + this.normalizeNumber
                }`
            );
        this.svgInner = this.svg.append('g').attr('class', 'linechart__lines').style('transform', 'translateY(5px)');
    }

    private initScale(): void {
        const dates = this.data.map((x) => new Date(x.date));
        const maxYValues = Math.max(...this.data.map((d) => d.value));
        const minYValues = Math.min(...this.data.map((d) => d.value));
        const minXValues = new Date(Math.min.apply(null, dates));
        const maxXValues = new Date(Math.max.apply(null, dates));
        this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
        this.height = this.chartElem.nativeElement.getBoundingClientRect().height;
        this.scaleFunc.x = d3.scaleTime().domain([minXValues, maxXValues]).range([0, this.width]);
        this.scaleFunc.y = d3.scaleLinear().domain([maxYValues, minYValues]).range([0, this.height]);
    }

    private initAxes(): void {
        this.axes.axisX = d3.axisBottom().scale(this.scaleFunc.x).ticks(31).tickFormat(d3.timeFormat('%d'));
        this.axes.axisY = d3.axisLeft().scale(this.scaleFunc.y);
        this.svgInner
            .append('g')
            .attr('class', 'axis')
            .style('transform', 'translate(' + this.padding.left + 'px, ' + this.height + 'px)')
            .call(this.axes.axisX);
        this.svgInner
            .append('g')
            .attr('class', 'axis')
            .style('transform', 'translate(' + this.padding.left + 'px,  0)')
            .call(this.axes.axisY);
    }

    private drawLines(): void {
        const line = d3
            .line()
            .x((d) => d[0])
            .y((d) => d[1]);
        const points: [number, number][] = this.data.map((item) => [
            this.scaleFunc.x(new Date(item.date)),
            this.scaleFunc.y(item.value),
        ]);
        this.lineGroup = this.svgInner
            .append('g')
            .append('path')
            .style('transform', 'translate(' + this.padding.left + 'px, ' + '0px)')
            .attr('id', 'line')
            .style('fill', 'none')
            .style('stroke', 'var(--text-accent-color)')
            .style('stroke-width', '2px');
        this.lineGroup.attr('d', line(points));
    }

    private drawGridLines(): void {
        this.gridLinesY = d3.axisLeft(this.scaleFunc.y).tickFormat('').tickSize(-this.width).scale(this.scaleFunc.y);
        this.gridLinesX = d3
            .axisBottom(this.scaleFunc.x)
            .tickFormat('')
            .tickSize(-this.height)
            .ticks(32)
            .scale(this.scaleFunc.x);
        this.svg
            .append('g')
            .attr('class', 'grid')
            .style('transform', 'translate(' + this.padding.left + 'px, ' + '5px)')
            .style('color', 'var(--chart-segment-color)')
            .call(this.gridLinesY)
            .select('.domain')
            .style('visibility', 'hidden');
        this.svg
            .append('g')
            .attr('class', 'grid')
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
            .attr('fill', 'var(--text-contrast-color)')
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
            (this.mouseLeaveUnlistener = this.renderer.listen(element, 'mouseleave', () => {
                this.toggleShowingValues('disable');
                this.mousePosition = null;
            })),
            (this.mouseMoveUnlistener = this.renderer.listen(element, 'mousemove', (event: MouseEvent) => {
                const formatDate = d3.timeFormat('%d/%H:%M');
                const rect: DOMRect = element.getBoundingClientRect();

                this.toggleShowingValues('enable');
                this.mousePosition = event.clientX - rect.left;
                this.svg.select('.mouse-line').attr('x1', this.mousePosition).attr('x2', this.mousePosition);
                this.svg
                    .select('.label-mouse')
                    .attr('x', this.mousePosition + 10)
                    .text(formatDate(this.scaleFunc.x.invert(this.mousePosition)));
            }))
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
