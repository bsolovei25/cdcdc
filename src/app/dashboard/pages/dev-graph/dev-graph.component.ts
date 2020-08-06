import {
    AfterViewInit,
    Component,
    ElementRef,
    Input, OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';

import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import {
    ISplineDiagramData,
    ISplineDiagramSize, LineType
} from '../../../widgets/LCO/spline-trends-chart/components/spline-diagram/spline-diagram.component';
import { HttpClient } from '@angular/common/http';
import { timestamp } from 'rxjs/operators';

interface ICdIndicatorLoad {
    // name: string;
    percentValue: number;
    //
    // value: number;
    // deviation: number;
}

@Component({
    selector: 'evj-dev-graph',
    templateUrl: './dev-graph.component.html',
    styleUrls: ['./dev-graph.component.scss']
})
export class DevGraphComponent implements OnInit, AfterViewInit {
    @ViewChild('gauge') gaugeElement: ElementRef;
    @ViewChild('diagram', { static: false }) private diagram: ElementRef;

    public data: ICdIndicatorLoad = {
        percentValue: 50
    };

    private svgBody: any;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.drawWidget();
    }

    getLineWidth(curValue: number, maxValue: number): string {
        return `width: ${curValue / maxValue * 100}%`;
    }

    get chartWidth(): string {
        if (!(this.gaugeElement?.nativeElement?.offsetHeight > 0)) {
            return;
        }
        const height = this.gaugeElement.nativeElement.offsetHeight;
        return `min-width: ${height}px; max-width: ${height}px;`;
    }

    get borderLeft(): string {
        if (!(this.gaugeElement?.nativeElement?.offsetHeight > 0)) {
            return;
        }
        const height = this.gaugeElement.nativeElement.offsetHeight;
        return `left: ${height / 2}px`;
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
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 200 200');

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
                'assets/icons/widgets/APS/aps-indicator-load-deviation/diagram-frame.svg'
            )
            .attr('x', 5)
            .attr('y', 0)
            .attr('width', 190)
            .attr('height', 55);
        indicator
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/APS/aps-indicator-load-deviation/diagram-frame.svg'
            )
            .attr('x', 5)
            .attr('y', -200)
            .attr('width', 190)
            .attr('height', 55)
            .style('transform', 'scaleY(-1)');

        const gaude = indicator.append('g').attr('class', 'gaude');
        this.drawBigGaude(gaude, this.data.percentValue);
        const innerGaude = gaude.append('g').attr('class', 'innerGaude');
        this.drawInnerGaude(innerGaude, this.data.percentValue);
        const text = gaude.append('g').attr('class', 'gaude-text');
        this.drawTextInGaude(text);
        gaude.style('transform', 'translate(50%, 51.5%) scale(8.9)');
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
        this.drawArc(pie(new Array(100)), 'dashed-arc', dashedArc, svg.append('g')); // отрисовка пунктирной дуги

        // позиция бегунка в положении 0
        const needlePos = {
            x1: -min * Math.cos(Math.PI / 4),
            x2: -max * Math.cos(Math.PI / 4),
            y1: min * Math.sin(Math.PI / 4),
            y2: max * Math.sin(Math.PI / 4)
        };
        // отрисовка линий начала и конца
        const lines = svg.append('g').attr('class', 'lines');
        this.drawNeedle([0], 'end-line', 'line1', lines, needlePos, scale);
        this.drawNeedle([100], 'end-line', 'line2', lines, needlePos, scale);
        // отрисовка бегунка
        this.drawNeedle([data], 'needle', 'needle', svg, needlePos, scale);
    }

    private drawInnerGaude(block: any, data: any): void {
        const svg = block;
        const lineMin = 6.6;
        const lineMax = 6.8;
        const rainbowMin = 5.5;
        const rainbowMax = 5.9;
        const startAngle = (-1.5 * Math.PI) / 2;
        const endAngle = (1.5 * Math.PI) / 2;
        const scale = d3
            .scaleLinear()
            .domain([0, 100]) // числовой диапазон
            .range([0, 270]); // диапазон угла
        const arc = this.defineArc(lineMin, lineMax); // параметры дуги
        const pie = this.definePie(startAngle, endAngle); // функция дуги
        this.drawArc(pie([1]), 'arc-line', arc, svg); // отрисовка дуги
        const needlePos = {
            cx: (-(lineMax + lineMin) / 2) * Math.cos(Math.PI / 4),
            cy: ((lineMax + lineMin) / 2) * Math.sin(Math.PI / 4),
            r: (lineMax - lineMin) * 1.5
        };
        this.drawCircleNeedle([data], 'circle-needle', 'circleNeedle', svg, needlePos, scale);
        // пунктирная дуга
        const rainbowArc = this.defineArc(rainbowMin, rainbowMax, 0.05); // параметры дуги
        const rainbowG = svg.append('g').attr('class', 'rainbow');
        this.drawArc(pie(new Array(30)), 'rainbow-arc', rainbowArc, rainbowG); // отрисовка дуги
        const gradient = d3.interpolateHsl('#442726', '#4C7795'); // функция градиента
        rainbowG.selectAll('.rainbow-arc')._groups[0].forEach((item, idx, arr) => {
            const coef = (idx + 1) / arr.length;
            d3.select(item).style('fill', gradient(coef));
        });
    }

    private drawTextInGaude(block: any): void {
        block
            .append('text')
            .attr('class', 'value')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', 0)
            .text(this.data.percentValue);
        block
            .append('text')
            .attr('class', 'units')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', 3)
            .text('%');
        block
            .append('text')
            .attr('class', 'name')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', 6)
            .text('Загрузка');
        block
            .append('text')
            .attr('class', 'name')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', 7.5)
            .text('Установок');
    }

    //#region gaude functions

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

    private drawCircleNeedle(
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
            .append('circle')
            .attr('class', cls)
            .attr('cx', needlePos.cx)
            .attr('cy', needlePos.cy)
            .attr('r', needlePos.r)
            .classed(classed, true)
            .style('transform', (d) => `rotate(${scaleFn(d)}deg)`);
    }

    //#endregion gaude functions
}

