import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { newArray } from '@angular/compiler/src/util';
import * as d3 from 'd3';
import { AsyncRender } from '@shared/functions/async-render.function';

@Component({
    selector: 'evj-ozsm-circle-planning-diagram-plan',
    templateUrl: './ozsm-circle-planning-diagram-plan.component.html',
    styleUrls: ['./ozsm-circle-planning-diagram-plan.component.scss']
})
export class OzsmCirclePlanningDiagramPlanComponent implements OnInit, OnChanges {

    private readonly defaultImg: string = '';
    private readonly diagramCounter: number = 100;
    private readonly tickDensity: number = 80 / this.diagramCounter;

    @ViewChild('chart') chart: ElementRef;

    @Input() fact: number = 1126658;
    @Input() plan: number = 1440962;
    @Input() difference: number = 0;
    @Input() name: string = 'производства';
    @Input() img: string = this.defaultImg;
    @Input() background: 'lite' | 'dark' = 'lite';
    @Input() isPercent: boolean = false;

    public ngOnInit(): void {
        this.chartInit();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.chartInit();
    }

    private chartInit(): void {
        this.dataHandler();
        const mainValue = this.fact > this.plan
            ? this.plan / this.fact * 100
            : this.fact / this.plan * 100;
        const subValue = Math.abs(this.fact - this.plan);
        this.bindChart(mainValue, subValue);
    }

    private dataHandler(): void {
        this.img = this.img?.length > 0 ? this.img : this.defaultImg;
    }

    private getTick(percent: number): number {
        return this.tickDensity * percent;
    }

    @AsyncRender
    private bindChart(mainValue: number, subValue: number): void {
        const tickMain = this.getTick(mainValue);
        const tickSub = this.getTick(subValue);

        const width = 155;
        const height = 155;
        const diagramWidth = 7;

        const outerRadius = width / 2 - 2;
        const innerRadius = outerRadius - diagramWidth;

        function createPie(startAngel: number, endAngel: number): d3.Pie {
            return d3.pie()
                .startAngle(startAngel)
                .endAngle(endAngel)
                .value(1);
        }

        const backPie = createPie(-3 * Math.PI / 4, 3 * Math.PI / 4);
        const mainPie = createPie(-3 * Math.PI / 4, 1.5 * Math.PI * mainValue / this.diagramCounter - 3 * Math.PI / 4);
        const subPie = createPie(1.5 * Math.PI * mainValue / this.diagramCounter - 3 * Math.PI / 4, 3 * Math.PI / 4);

        const arc: d3.Arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius)
            .padAngle(0.025);

        const backArc: d3.Arc = d3.arc()
            .outerRadius(outerRadius + 4)
            .innerRadius(innerRadius - 4);

        d3.select(this.chart.nativeElement).selectAll('*').remove();

        const svg = d3.select(this.chart.nativeElement).append('svg')
            .attr('viewBox', `0 0 192 192`)
            .append('g')
            .style('background', 'red')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        function drawDiagram(className: string, pie: any, fig: d3.Arc = arc): void {
            svg.append('g')
                .attr('class', className)
                .selectAll('path')
                .data(pie())
                .enter()
                .append('path')
                .attr('d', fig);
        }

        drawDiagram('background', () => backPie([null]), backArc);
        drawDiagram('sub', () => subPie(this.fact > this.plan ? [null] : newArray(tickSub)));
        drawDiagram('main', () => mainPie(newArray(tickMain)));

        function addSerif(angle: number, className: 'serif-active' | 'serif-warning'): void {
            const lineOut = 4;
            const lineWidth = 2;
            svg.append('g')
                .attr('class', className)
                .selectAll('.needle')
                .data([null])
                .enter()
                .append('line')
                .attr('x1', (innerRadius - lineOut) * Math.cos(angle))
                .attr('x2', (outerRadius + lineOut) * Math.cos(angle))
                .attr('y1', (innerRadius - lineOut) * Math.sin(angle))
                .attr('y2', (outerRadius + lineOut) * Math.sin(angle))
                .classed('needle', true)
                .style('stroke-width', lineWidth);
        }

        addSerif(3 * Math.PI / 4, 'serif-active');
        addSerif(1.5 * Math.PI * mainValue / this.diagramCounter + 3 * Math.PI / 4, this.fact >= this.plan ? 'serif-active' : 'serif-warning');

        const g = svg.append('g').attr('class', 'text');

        g.append('line')
            .attr('class', 'line')
            .attr('x1', -14)
            .attr('y1', 3)
            .attr('x2', 14)
            .attr('y2', 3);
        addText(`${this.fact}`, 'text text__value', -5);
        addText(`План`, 'text text__name', 60);
        addText(`${this.name}`, 'text text__name', 72);
        addText(`${this.plan}`, 'text text__plan', 20);
        addText(`${this.difference}`, 'text text__difference', 40);
        addText(`TH`, 'text text__TH', -30);


        function addText(text: string, cls: string, yCord: number): void {
            g.append('text')
                .attr('class', cls)
                .attr('text-anchor', 'middle')
                .attr('x', 0)
                .attr('y', yCord)
                .text(text);
        }
    }
}
