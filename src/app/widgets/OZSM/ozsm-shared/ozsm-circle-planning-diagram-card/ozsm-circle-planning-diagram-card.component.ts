import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { ICircleData } from '../../../../dashboard/models/OZSM/ozsm-circle-planning-diagram.model';

@Component({
    selector: 'evj-ozsm-circle-planning-diagram-card',
    templateUrl: './ozsm-circle-planning-diagram-card.component.html',
    styleUrls: ['./ozsm-circle-planning-diagram-card.component.scss']
})

export class OzsmCirclePlanningDiagramCardComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('diagram', { static: true }) private diagram: ElementRef;
    private data: ICircleData[] =
        [{
            name: 'Выработка',
            value: 1126658,
            deviation: 1140062,
            percentValue: 72,
        },
            {
                name: 'Смешивание',
                value: 1126658,
                deviation: 1140062,
                percentValue: 100,
            }];

    public activeData: ICircleData;
    private svgBody: any;

    constructor() { }

    ngOnInit(): void {
        this.activeData = this.data.shift();
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
            .attr('width', '75%')
            .attr('height', '75%')
            .attr('viewBox', '0 0 400 200');

        const indicator = this.svgBody.append('g').attr('class', 'indicator');
        indicator
            .append('circle')
            .attr('cx', 100)
            .attr('cy', 100)
            .attr('r', 100)
            .attr('fill', '#161A28')
            .attr('stroke', '#272A38')
            .attr('stroke-width', 1);
        indicator
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/OZSM/ozsm-circle-planning-diagram/diagram-frame.svg'
            )
            .attr('x', 5)
            .attr('y', 0)
            .attr('width', 190)
            .attr('height', 55);
        indicator
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/OZSM/ozsm-circle-planning-diagram/diagram-frame.svg'
            )
            .attr('x', 5)
            .attr('y', -200)
            .attr('width', 190)
            .attr('height', 55)
            .style('transform', 'scaleY(-1)');

        const gaude = indicator.append('g').attr('class', 'gaude');
        this.drawBigGaude(gaude, this.activeData.percentValue);
        const innerGaude = gaude.append('g').attr('class', 'innerGaude');
        this.drawInnerGaude(innerGaude, this.activeData.percentValue);
        const text = gaude.append('g').attr('class', 'gaude-text');
        this.drawTextInGaude(text);
        gaude.style('transform', 'translate(25%, 51%) scale(9)');
    }
    private drawBigGaude(block: any, data: any): void {
        const svg = block;
        const min = 8;
        const max = 9.5;
        const innerMin = 8.4;
        const innerMax = 9.1;
        const startAngle = 0;
        const endAngle = 180;
        // масштабирующая функция (перевод чисел в градусы)
        const scale = d3
            .scaleLinear()
            .domain([0, 100]) // числовой диапазон
            .range([0, 360]); // диапазон угла

        const arc = this.defineArc(min, max);
        const innerArc = this.defineArc(innerMin, innerMax);
        const dashedArc = this.defineArc(min, max, 0.1); // функция верхней пунктирной дуги

        const pie = this.definePie(startAngle, endAngle); // функция для внешней дуги
        const endAngleFn = (d) => (scale(d) * Math.PI) / 180;
        const lastPie = this.definePie(startAngle, endAngleFn); // функция дуги, которая следует за ползунком

        this.drawArc(pie([1]), 'back-arc', arc, svg); // отрисовка внешней дуги
        this.drawArc(pie([1]), 'deviation-arc', innerArc, svg); // отрисовка подвижной дуги
        this.drawArc(lastPie([data]), 'needle-arc', innerArc, svg); // отрисовка подвижной дуги
        this.drawArc(pie(new Array(120)), 'dashed-arc', dashedArc, svg); // отрисовка пунктирной дуги
    }

    private drawInnerGaude(block: any, data: any): void {
        const startAngle = 0;
        const endAngle = 180;
        const scale = d3
            .scaleLinear()
            .domain([0, 100]) // числовой диапазон
            .range([0, 360]); // диапазон угла

        const pie = this.definePie(startAngle, endAngle); // функция дуги

    }

    private drawTextInGaude(block: any): void {
        block
            .append('text')
            .attr('class', 'value')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', 1.5)
            .text(this.activeData.value);
        block
            .append('text')
            .attr('class', 'units')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', -5)
            .text('ТН');
        block
            .append('text')
            .attr('class', 'units')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', 5)
            .text('0');

        block
            .append('text')
            .attr('class', 'name')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', -1.5)
            .text(this.activeData.name);
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



