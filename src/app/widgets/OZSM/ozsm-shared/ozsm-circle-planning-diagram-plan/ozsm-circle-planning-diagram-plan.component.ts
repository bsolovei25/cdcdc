import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewInit,
    ViewChild,
    ElementRef,
    Input
} from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { ICircleData } from 'src/app/dashboard/models/OZSM/ozsm-circle-planning-diagram.model';
import { planData } from '../../ozsm-circle-planning-diagram/ozsm-circle-planning-diagam-mock';

@Component({
    selector: 'evj-ozsm-circle-planning-diagram-plan',
    templateUrl: './ozsm-circle-planning-diagram-plan.component.html',
    styleUrls: ['./ozsm-circle-planning-diagram-plan.component.scss']
})
export class OzsmCirclePlanningDiagramPlanComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('diagram', { static: true }) private diagram: ElementRef;
    @Input() plan: ICircleData;

    public activeData: ICircleData;
    private svgBody: any;

    constructor() { }

    ngOnInit(): void {
        this.activeData = this.plan;
    }
    ngOnDestroy(): void {
    }
    ngAfterViewInit(): void {
        this.drawWidget();
    }
    private drawWidget(): void {
        if (this.svgBody) {
            this.svgBody.remove();
        }
        this.drawDiagram();
    }
    private drawDiagram(): void {
        this.svgBody = d3Selection.select(this.diagram.nativeElement).append('svg');
        this.svgBody
            .attr('width', 200)
            .attr('height', 200)
            .attr('viewBox', '0 0 200 200');

        const indicator = this.svgBody.append('g').attr('class', 'indicator');
        indicator
            .append('circle')
            .attr('cx', 100)
            .attr('cy', 100)
            .attr('r', 100)
            .attr('fill', '#171A24')
            .attr('stroke', '#272A38')
            .attr('stroke-width', 1);
        indicator
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/OZSM/ozsm-circle-planning-diagram/diagram-frame.svg'
            )
            .attr('x', 12)
            .attr('y', 0)
            .attr('width', 188)
            .attr('height', 55);
        indicator
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/OZSM/ozsm-circle-planning-diagram/diagram-frame.svg'
            )
            .attr('x', 12)
            .attr('y', -200)
            .attr('width', 188)
            .attr('height', 55)
            .style('transform', 'scaleY(-1)');
        indicator
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/OZSM/ozsm-circle-planning-diagram/stroke-line.svg'
            )
            .attr('x', 65)
            .attr('y', -105)
            .attr('width', 70)
            .attr('height', 20)
            .style('transform', 'scaleY(-1)');

        const gaude = indicator.append('g').attr('class', 'gaude');
        this.drawBigGaude(gaude, this.activeData.percentValue);
        const innerGaude = gaude.append('g').attr('class', 'innerGaude');
        this.drawInnerGaude(innerGaude, this.activeData.percentValue);
        const text = gaude.append('g').attr('class', 'gaude-text');
        this.drawTextInGaude(text);
        gaude.style('transform', 'translate(50%, 50%) scale(9)');
    }
    private drawBigGaude(block: any, data: any): void {
        const svg = block;
        const min = 7.5;
        const max = 10;
        const innerMin = 8;
        const innerMax = 9.5;
        const startAngle = (-1.5 * Math.PI) / 2;
        const endAngle = (1.5 * Math.PI) / 2;
        // масштабирующая функция (перевод чисел в градусы)
        const scale = d3
            .scaleLinear()
            .domain([0, 100]) // числовой диапазон
            .range([0, 270]); // диапазон угла

        const arc = this.defineArc(min, max);
        const innerArc = this.defineArc(innerMin, innerMax);
        const dashedArc = this.defineArc(min, max, 0.015); // функция верхней пунктирной дуги

        const pie = this.definePie(startAngle, endAngle); // функция для внешней дуги
        const endAngleFn = (d) => (scale(d) * Math.PI) / 180 - (1.5 * Math.PI) / 2;
        const lastPie = this.definePie(startAngle, endAngleFn); // функция дуги, которая следует за ползунком


        this.drawArc(pie([1]), 'back-arc', arc, svg); // отрисовка внешней дуги
        this.drawArc(pie([1]), 'deviation-arc', innerArc, svg); // отрисовка подвижной дуги
        this.drawArc(lastPie([data]), 'needle-arc', innerArc, svg); // отрисовка подвижной дуги
        this.drawArc(pie(new Array(120)), 'dashed-arc', dashedArc, svg.append('g')); // отрисовка пунктирной дуги

        // позиция бегунка в положении 0
        const needlePos = {
            x1: -min * Math.cos(Math.PI / 4),
            x2: -max * Math.cos(Math.PI / 4),
            y1: min * Math.sin(Math.PI / 4),
            y2: max * Math.sin(Math.PI / 4),
        };
        // отрисовка линий начала и конца
        const lines = svg.append('g').attr('class', 'lines');
        this.drawNeedle([0], 'end-line', 'line1', lines, needlePos, scale); // бегунок начальный
        this.drawNeedle([100], 'end-line', 'line2', lines, needlePos, scale); // бегунок крайний
        this.drawNeedle([data], 'needle', 'needle', svg, needlePos, scale); // бегунок со значением percentValue
    }

    private drawInnerGaude(block: any, data: any): void {
        const svg = block;
        const rainbowMin = 6.6;
        const rainbowMax = 6.9;
        const startAngle = (-1.5 * Math.PI) / 2;
        const endAngle = (1.5 * Math.PI) / 2;
        const scale = d3
            .scaleLinear()
            .domain([0, 100]) // числовой диапазон
            .range([0, 270]); // диапазон угла

        const pie = this.definePie(startAngle, endAngle); // функция дуги

        const rainbowArc = this.defineArc(rainbowMin, rainbowMax, 0.025); // параметры дуги
        const rainbowG = svg.append('g').attr('class', 'rainbow');
        this.drawArc(pie(new Array(65)), 'rainbow-arc', rainbowArc, rainbowG); // отрисовка дуги
    }

    private drawTextInGaude(block: any): void {
        block
            .append('text')
            .attr('class', 'value')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', -1.2)
            .text(this.activeData.value);
        block
            .append('text')
            .attr('class', 'deviation')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', 1.2)
            .text(this.activeData.deviation);
        block
            .append('text')
            .attr('class', 'units')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', 4)
            .text('0');
        block
            .append('text')
            .attr('class', 'th')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', -4)
            .text('ТН');

        block
            .append('text')
            .attr('class', 'name')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', 8)
            .text(this.activeData.name);
        block
            .append('text')
            .attr('class', 'name')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', 6.5)
            .text('План');
    }

    private defineArc(
        innerRad: number,
        outerRad: number,
        padAngle: number = 0,
        cornerRadius: number = 0
    ): any {
        return d3
            .arc()
            .innerRadius(innerRad)
            .outerRadius(outerRad)
            .cornerRadius(cornerRadius)
            .padAngle(padAngle);
    }

    private definePie(startAngle: any, endAngle: any, val: any = (d) => 1): any {
        return d3
            .pie()
            .startAngle(startAngle)
            .endAngle(endAngle)
            .value(val);
    }

    private drawArc(dataFn: any, cls: string, arcFn: any, block: any): any {
        block
            .selectAll('.arc')
            .data(dataFn)
            .enter()
            .append('path')
            .attr('class', cls)
            .attr('d', arcFn);
    }

    private drawNeedle(
        data: any[],
        cls: string,
        classed: string,
        block: any,
        needlePos: any,
        scaleFn: any
    ): any {
        block
            .selectAll(`.needle`)
            .data(data)
            .enter()
            .append('line')
            .attr('class', cls)
            .attr('x1', needlePos.x1)
            .attr('x2', needlePos.x2)
            .attr('y1', needlePos.y1)
            .attr('y2', needlePos.y2)
            .classed(classed, true)
            .style('transform', (d) => `rotate(${scaleFn(d)}deg)`);
    }
}
