import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnChanges,
    Input,
    ElementRef,
    Renderer2,
    OnDestroy
} from '@angular/core';
import {AsyncRender} from "@shared/functions/async-render.function";
import * as d3 from 'd3';

@Component({
    selector: 'evj-cmid-dynamics-of-metrics-change-chart',
    templateUrl: './cmid-dynamics-of-metrics-change-chart.component.html',
    styleUrls: ['./cmid-dynamics-of-metrics-change-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CmidDynamicsOfMetricsChangeChartComponent implements OnInit, OnChanges, OnDestroy {
    @Input() public data = [
        {
            value: 97,
            date: "2021-05-01T01:51:00"
        },
        {
            value: 95,
            date: "2021-05-02T02:51:00"
        },
        {
            value: 92,
            date: "2021-05-03T03:51:00"
        },
        {
            value: 95,
            date: "2021-05-04T04:51:00"
        },
        {
            value: 98,
            date: "2021-05-05T05:51:00"
        },
        {
            value: 90,
            date: "2021-05-06T06:51:00"
        },
        {
            value: 100,
            date: "2021-05-07T07:51:00"
        },
        {
            value: 97,
            date: "2021-05-16T08:51:00"
        }
    ];
    public svg: any;
    public svgInner: any;
    public yScale: any;
    public xScale: any;
    public xAxis: any;
    public yAxis: any;
    public lineGroup: any;

    public gridLinesY: number;
    public gridLinesX: number;

    private mousePosition: number | null = null;
    private graphMaxX: number = 0;
    private graphMaxY: number = 0;
    private curve: Selection;
    private width: number = 1164;
    private height: number = 210;
    private margin: number = 22;
    private mouseLeaveUnlistener: () => void;
    private mouseMoveUnlistener: () => void;

    constructor(public chartElem: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit(): void {
        this.initializeChart();
        this.drawChart();
    }

    public ngOnChanges(): void {
        if (this.data?.length > 0) {
            this.initializeChart();
            this.drawChart();
        } else {
            this.dropChart();
        }
    }

    ngOnDestroy(): void {
        this.mouseLeaveUnlistener();
        this.mouseMoveUnlistener();
    }

    @AsyncRender
    private initializeChart(): void {
        this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
        this.height = this.chartElem.nativeElement.getBoundingClientRect().height;

        this.graphMaxX = this.width;
        this.graphMaxY = this.height;

        this.svg = d3
            .select(this.chartElem.nativeElement)
            .select('.linechart')
            .append('svg')
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("preserveAspectRatio", "xMinYMin")
            .attr("height", '100%')
            .attr("width", '100%')
            .attr(
                'viewBox',
                `0 0 1226 ${this.graphMaxY > 5 ? this.graphMaxY - 5 : 0}`
            );
        this.svgInner = this.svg
            .append('g')
            .style('transform', 'translate(' + this.margin + 'px, ' + this.margin + 'px)');

        this.yScale = d3
            .scaleLinear()
            .domain([d3.max(this.data, d => d.value), d3.min(this.data, d => d.value)])
            .range([0, this.height - 2 * this.margin]);

        this.yAxis = this.svgInner
            .append('g')
            .attr('id', 'y-axis')
            .style('transform', 'translate(' + this.margin + 'px,  0)');
        this.xScale = d3.scaleTime()
            .domain([new Date('2021-05-01'), new Date('2021-05-31')])
            .range([this.margin, this.width - this.margin])

        this.xAxis = this.svgInner
            .append('g')
            .attr('id', 'x-axis')
            .style('transform', 'translate(0, ' + (this.height - 2 * this.margin) + 'px)');

        this.lineGroup = this.svgInner
            .append('g')
            .append('path')
            .attr('id', 'line')
            .style('fill', 'none')
            .style('stroke', '#fff')
            .style('stroke-width', '2px')

        this.drawGridLines();
        this.drawMouseGroup();
    }

    @AsyncRender
    private drawChart(): void {
        this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
        this.xScale.range([this.margin, 1164 - 2 * this.margin]);

        const xAxis = d3
            .axisBottom(this.xScale)
            .ticks(31)
            .tickFormat(d3.timeFormat('%d'));

        this.xAxis.call(xAxis);

        const yAxis = d3
            .axisLeft(this.yScale)
            .ticks(5);

        this.yAxis.call(yAxis);

        const line = d3
            .line()
            .x(d => d[0])
            .y(d => d[1])

        const points: [number, number][] = this.data.map(d => [
            this.xScale(new Date(d.date)),
            this.yScale(d.value),
        ]);

        this.lineGroup.attr('d', line(points));

        this.curve = this.svg.append('path').attr('class', `graph-line-sss`);
    }

    private drawGridLines(): void {
        this.gridLinesY = d3.axisLeft(this.yScale)
            .tickFormat('')
            .tickSize(-this.width)
            .scale(this.yScale);

        this.gridLinesX = d3.axisBottom(this.xScale)
            .tickFormat('')
            .tickSize(-this.height)
            .ticks(31)
            .scale(this.xScale);

        this.svg.append("g")
            .attr("class", "grid")
            .style('transform', 'translate(' + this.margin * 2 + 'px, ' + this.margin + 'px)')
            .call(this.gridLinesY)

        this.svg.append("g")
            .attr("class", "grid")
            .style('transform', 'translate(' + this.margin + 'px, ' + '188px)')
            .call(this.gridLinesX)
    }

    private drawMouseGroup(): void {
        // группа событий мыши
        const mouseG = this.svg
            .append('g')
            .attr('class', 'mouse-over')
            .attr('opacity', 1)
            .style('width', this.width + 'px');

        // лейбл с датой
        mouseG
            .append('text')
            .attr('class', 'label-mouse')
            .attr('text-anchor', 'start')
            .attr('font-size', '12px')
            .attr('x', 0)
            .attr('y', this.chartElem.nativeElement.clientHeight + this.margin - 10)
            .attr('fill', '#D7E2F2')
            .text('');

        // линия курсора
        mouseG
            .append('line')
            .attr('class', 'mouse-line')
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('y1', 0)
            .attr('y2', 200)
            .style('stroke', 'currentColor')
            .style('stroke-width', '1px');

        // область для прослушивания событий мыши
        const [[mouseListenArea]] = mouseG
            .append('svg:rect')
            .attr('width', this.graphMaxX)
            .attr('height', this.graphMaxY)
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
                const rect: DOMRect = element.getBoundingClientRect();
                const formatDate = d3.timeFormat('%d/%H:%M');

                this.toggleShowingValues('enable');
                this.mousePosition = event.clientX - rect.left;

                this.svg.select('.mouse-line').attr('x1', this.mousePosition).attr('x2', this.mousePosition);
                this.svg
                    .select('.label-mouse')
                    .attr('x', this.mousePosition + 10)
                    .text(formatDate(this.xScale.invert(this.mousePosition)));
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
            this.svg = undefined;
        }
    }
}
