import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener,
    Inject,
    Input,
    OnInit,
    Output,
    ViewChild,
    EventEmitter
} from '@angular/core';
import { WidgetPlatform } from '@dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '@dashboard/services/widget.service';
import * as d3 from 'd3';
import {
    ICmidRadarDataOptions,
    ICmidVectorDiagramModel,
    ICmidVectorDiagramModelPoint, ICmidVectorDiagramRadarOptions
} from '@widgets/CMID/cmid-vector-diagram/models/cmid-vector-diagram.model';
import { radarDataOptions } from '@widgets/CMID/cmid-vector-diagram/const/cmid-vector-diagram.const';

@Component({
    selector: 'evj-cmid-vector-diagram-chart',
    templateUrl: './cmid-vector-daigram-chart.component.html',
    styleUrls: ['./cmid-vector-daigram-chart.component.scss']
})
export class CmidVectorDiagrammChartComponent extends WidgetPlatform<unknown> implements OnInit, AfterViewInit {
    @Input() data: ICmidVectorDiagramModel;
    @Input() radarOptions: ICmidVectorDiagramRadarOptions;
    @Input() checkedId: number;
    @Output() checkedChart: EventEmitter<number> = new EventEmitter<number>();
    @ViewChild('chart') chart: ElementRef;

    public svg: any;
    public graphTops: string[] = [];
    public radialScale: d3.linearScale;
    private radarDataOptions: ICmidRadarDataOptions[];
    constructor(
        public widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        this.radarDataOptions = radarDataOptions;
        this.radialScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, 92]);
        this.data.points.map((item: ICmidVectorDiagramModelPoint) => {
            this.graphTops.push(item.name);
        })
    }

    ngAfterViewInit(): void {
        this.initRadarChart();
    }

    @HostListener('document:resize', ['$event'])
    OnResize(): void {
        this.initRadarChart();
    }

    public getHeaderIcon(id: number): string {
        switch (id) {
            case 1:
                return 'safety.svg';
            case 2:
                return 'reliability.svg';
            case 3:
                return 'ecology.svg';
        }
    }

    public onChartSelected(value: number): void {
        this.checkedChart.emit(value);
    }

    private initRadarChart(): void {
        this.destroySvg();
        this.initSvg();
        this.drawCircles();
        this.drawLines();
        this.drawData();
        this.drawGrows();
    }

    private initSvg(): void {
        this.radarOptions.circlePosition.x = this.chart.nativeElement.getBoundingClientRect().width / 2;
        this.radarOptions.circlePosition.y = this.chart.nativeElement.getBoundingClientRect().height / 2;
        this.svg = d3.select(this.chart.nativeElement)
            .select('.radar')
            .append('svg')
            .attr('preserveAspectRatio', 'none')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${this.chart.nativeElement.getBoundingClientRect().width + 20} ${this.chart.nativeElement.getBoundingClientRect().height + 20}`);

        this.svg.append('defs');
        this.svg.append('mask')
            .attr('id', `myMask-${this.data.id}`);
    }

    private drawCircles(): void {
        this.svg.append('circle')
            .attr('cx', this.radarOptions.circlePosition.x)
            .attr('cy', this.radarOptions.circlePosition.y)
            .attr('r', 92)
            .style('stroke-width', 1)
            .style('stroke', this.radarOptions.circleBorder)
            .style('fill', this.radarOptions.circleInnerColor);
        this.svg.append('circle')
            .attr('cx', this.radarOptions.circlePosition.x)
            .attr('cy', this.radarOptions.circlePosition.y)
            .attr('r', 68)
            .style('stroke-width', 1)
            .style('stroke', this.radarOptions.circleBorder2)
            .style('fill', this.radarOptions.circleInnerColor);
        this.svg.append('circle')
            .attr('cx', this.radarOptions.circlePosition.x)
            .attr('cy', this.radarOptions.circlePosition.y)
            .attr('r', 45)
            .style('stroke-width', 1)
            .style('stroke', this.radarOptions.circleBorder2)
            .style('fill', this.radarOptions.circleInnerColor);
    }

    private drawLines(): void {
        const factCoordinatesData = [];
        const normCoordinatesData = [];
        this.data.points.forEach((item: ICmidVectorDiagramModelPoint) => {
            factCoordinatesData.push(item.itemFactValue)
            normCoordinatesData.push(item.itemNormValue)
        })
        const factCoordinates = this.getPathCoordinates(factCoordinatesData, this.graphTops);
        const normCoordinates = this.getPathCoordinates(normCoordinatesData, this.graphTops);
        this.svg.append('g')
            .attr('class', `radar__polygons-${this.data.id}`);

        const radarsWrapper = d3.select(`.radar__polygons-${this.data.id}`);
        const mask = d3.select(`#myMask-${this.data.id}`)
        const defs = d3.select('defs')
        defs.append('marker')
            .attr('id', 'dot')
            .attr('viewBox', [0, 0, 20, 20])
            .attr('refX', 10)
            .attr('refY', 10)
            .attr('markerWidth', 10)
            .attr('markerHeight', 10)
            .append('circle')
            .attr('cx', 10)
            .attr('cy', 10)
            .attr('r', this.radarOptions.pointRadius)
            .style('fill', 'var(--text-accent-color)');
        mask.append('polygon')
            .attr('points', normCoordinates.map((d) => {
                return [d.x, d.y].join(',');
            }))
            .style('fill', 'var(--text-accent-color')
        mask.append('polygon')
            .attr('points', factCoordinates.map((d) => {
                return [d.x, d.y].join(',');
            }))
        radarsWrapper.append('g')
            .attr('class', 'radar__norm-value')
            .append('polygon')
            .attr('points', normCoordinates.map((d) => {
                return [d.x, d.y].join(',');
            }))
            .attr('stroke-width', 0)
            .attr('fill', this.radarOptions.rectNormColor)
            .attr('stroke-opacity', 1)
            .attr('mask', `url(#myMask-${this.data.id})`)
        radarsWrapper.append('g')
            .attr('class', 'radar__fact-value')
            .append('polygon')
            .attr('points', factCoordinates.map((d) => {
                return [d.x, d.y].join(',');
            }))
            .attr('marker-start', 'url(#dot)')
            .attr('marker-mid', 'url(#dot)')
            .attr('marker-end', 'url(#dot)')
            .attr('stroke-width', 1)
            .attr('stroke', 'white')
            .attr('fill', this.radarOptions.rectFactColor)
            .attr('stroke-opacity', 1)
    }

    private drawData(): void {
        this.data.points.forEach((item: ICmidVectorDiagramModelPoint, index: number) => {
            const angle = (Math.PI / 2) + (2 * Math.PI * index / this.graphTops.length);
            const lineAndLabelCoordinate = this.angleToCoordinate(angle, 100);
            this.svg.append('line')
                .attr('class', 'radar__axis-line')
                .attr('x1', this.radarOptions.circlePosition.x)
                .attr('y1', this.radarOptions.circlePosition.y)
                .attr('x2', lineAndLabelCoordinate.x)
                .attr('y2', lineAndLabelCoordinate.y)
                .attr('stroke', this.radarOptions.lineColor);
            this.svg.append('g')
                .attr('class', 'radar__axis-label')
                .append('text')
                .attr('x', lineAndLabelCoordinate.x)
                .attr('y', lineAndLabelCoordinate.y)
                .text(item.itemFactValue + '%')
                .style('transform', `translate(${this.radarDataOptions[index].valueTransform})`)
                .style('font-size', '13px')
                .style('fill', this.getValueColor(item.itemFactValue, item.itemNormValue));
            this.svg.append('foreignObject')
                .attr('x', lineAndLabelCoordinate.x)
                .attr('y', lineAndLabelCoordinate.y)
                .attr('width', this.radarDataOptions[index].textWidth)
                .attr('height', 35)
                .style('transform', `translate(${this.radarDataOptions[index].textTransform})`)
                .append('xhtml:a')
                .attr('href', item.link)
                .style('display', 'block')
                .style('font-size', '11px')
                .style('line-height', '16px')
                .style('color', 'var(--text-subscript-color)')
                .style('text-decoration', 'none')
                .style('float', () => lineAndLabelCoordinate.x < this.radarOptions.circlePosition.x ? 'right' : null)
                .style('text-align', () => lineAndLabelCoordinate.x < this.radarOptions.circlePosition.x ? 'right' : null)
                .html(item.name);
        })
    }

    private drawGrows(): void {
        this.svg.append('g')
            .attr('class', 'radar__average')
            .append('text')
            .attr('x', '50%')
            .attr('y', this.radarOptions.circlePosition.y)
            .text(this.data.centerValue)
            .style('transform', 'translateX(-36px)')
            .style('font-size', '24px')
            .style('line-height', '36px')
            .style('fill', 'var(--text-accent-color)')
        this.svg.append('g')
            .attr('class', () => {
                return this.data.growIndex ? 'radar__grow-up' : 'radar__grow-down'
            })
            .append('text')
            .attr('x', '50%')
            .attr('y', this.radarOptions.circlePosition.y)
            .text(() => {
                return this.data.growIndex ? this.data.growIndex : this.data.downIndex
            })
            .style('transform', 'translate(-18px, 18px)')
            .style('font-size', '13px')
            .style('line-height', '16px')
        this.svg.append('polygon')
            .attr('points', '195,138 200,146 190,146')
            .attr('style', () => {
                return this.data.growIndex ? 'transform: none' : 'transform: rotate(-180deg); transform-origin: 196px 141px;'
            })
            .attr('class', () => {
                return this.data.growIndex ? 'radar__grow-up' : 'radar__grow-down'
            })
    }

    private getValueColor(factValue: number, normValue: number): string {
        return factValue < normValue ? 'var(--index-error-color)' : 'var(--text-accent-color)';
    }

    private angleToCoordinate(angle: number, value: number): {x: number, y: number} {
        const x = Math.cos(angle) * this.radialScale(value);
        const y = Math.sin(angle) * this.radialScale(value);
        return {x: this.radarOptions.circlePosition.x + x, y: this.radarOptions.circlePosition.y - y};
    }

    private getPathCoordinates(points: number[], graphTops: string[]): any[] {
        const coordinates = [];
        graphTops.forEach((item: string, index: number) => {
            const angle = (Math.PI / 2) + (2 * Math.PI * index / graphTops.length);
            coordinates.push(this.angleToCoordinate(angle, points[index]));
        })
        return coordinates;
    }

    private destroySvg(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = undefined;
        }
    }

    protected dataHandler(ref: unknown): void {
    }
}
