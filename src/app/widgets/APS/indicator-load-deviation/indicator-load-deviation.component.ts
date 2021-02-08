import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';

export interface IApsIndicatorLoad {
    name: string;
    value: number;
    deviation: number;
    percentValue: number;
}

@Component({
    selector: 'evj-indicator-load-deviation',
    templateUrl: './indicator-load-deviation.component.html',
    styleUrls: ['./indicator-load-deviation.component.scss'],
})
export class IndicatorLoadDeviationComponent
    extends WidgetPlatform<unknown>
    implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('menu', { static: true }) private menu: ElementRef;
    @ViewChild('diagram', { static: true }) private diagram: ElementRef;

    private dataQuality: number = 0;
    private chartQuality: number = 0;
    public activeCard: IApsIndicatorLoad;
    private data: IApsIndicatorLoad[] = [
        {
            name: 'План первичной переработки',
            value: 1600537,
            deviation: -537,
            percentValue: 98,
        },
        {
            name: 'Гидроочистка ДТ',
            value: 850074,
            deviation: -298,
            percentValue: 87,
        },
        {
            name: 'Риформинг',
            value: 70470,
            deviation: -348,
            percentValue: 45,
        },
        {
            name: 'Кат. крекинг',
            value: 126679,
            deviation: -329,
            percentValue: 67,
        },
        {
            name: 'Ароматика',
            value: 640667,
            deviation: -104,
            percentValue: 52,
        },
        {
            name: 'Прочее',
            value: 272118,
            deviation: -82,
            percentValue: 15,
        },
    ];

    private svgMenu;
    private svgBody;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.activeCard = this.data.shift();
    }

    public ngAfterViewInit(): void {
        this.drawWidget();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}

    private drawWidget(): void {
        if (this.svgMenu) {
            this.svgMenu.remove();
        }
        if (this.svgBody) {
            this.svgBody.remove();
        }
        this.drawMenu();
        this.drawDiagram();
        // this.drawArrows();
        this.drawCards();
    }

    private drawMenu(): void {
        this.svgMenu = d3Selection.select(this.menu.nativeElement).append('svg');
        this.svgMenu.attr('width', '100%').attr('height', '100%').attr('viewBox', '0 0 400 50');

        const buttons = this.svgMenu.append('g').attr('class', 'buttons');
        const urlButton = 'assets/icons/widgets/APS/aps-indicator-load-deviation/button.svg';
        const urlButtonActive = 'assets/icons/widgets/APS/aps-indicator-load-deviation/button-active.svg';
        buttons
            .append('image')
            .attr('xlink:href', urlButton)
            .attr('x', 75)
            .attr('y', -5)
            .attr('width', 125)
            .attr('height', 40)
            .style('cursor', 'pointer');
        buttons
            .append('text')
            .attr('x', 140)
            .attr('y', 20)
            .attr('fill', '#8C99B2')
            .attr('text-anchor', 'middle')
            .style('font-size', 12)
            .text('Планирование');

        buttons
            .append('image')
            .attr('xlink:href', urlButtonActive)
            .attr('x', 205)
            .attr('y', -5)
            .attr('width', 125)
            .attr('height', 40)
            .style('cursor', 'pointer');

        buttons
            .append('text')
            .attr('x', 267)
            .attr('y', 20)
            .attr('fill', '#ffffff')
            .attr('text-anchor', 'middle')
            .style('font-size', 12)
            .text('Мониторинг');

        const labels = this.svgMenu.append('g').attr('class', 'labels');
        labels
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/data-quality.svg')
            .attr('x', 29)
            .attr('y', 40);
        labels
            .append('text')
            .attr('x', 140)
            .attr('y', 53)
            .attr('fill', '#ffffff')
            .attr('text-anchor', 'middle')
            .style('font-size', 11)
            .text('Качество данных');
        labels
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/graph-quality.svg')
            .attr('x', 199)
            .attr('y', 40);
        labels
            .append('text')
            .attr('x', 267)
            .attr('y', 53)
            .attr('fill', '#ffffff')
            .attr('text-anchor', 'middle')
            .style('font-size', 11)
            .text('Качество графика');

        this.svgMenu
            .append('circle')
            .attr('class', 'indicator')
            .attr('cx', 35)
            .attr('cy', 23)
            .attr('r', 35)
            .attr('fill', '#1C1F2D');

        this.svgMenu
            .append('circle')
            .attr('class', 'indicator')
            .attr('cx', 365)
            .attr('cy', 23)
            .attr('r', 35)
            .attr('fill', '#1C1F2D');

        const indicator1 = this.drawQualityIndicator(90);
        indicator1.style('transform', 'translate(35px, 23px) scale(3)');
        const indicator2 = this.drawQualityIndicator(30);
        indicator2.style('transform', 'translate(365px, 23px) scale(3)');
    }

    private drawQualityIndicator(value: number): any {
        const svg = this.svgMenu.append('g').attr('class', 'indicator');
        const min = 8;
        const max = 10;
        // масштабирующая функция (перевод чисел в градусы)
        const scale = d3
            .scaleLinear()
            .domain([0, 100]) // числовой диапазон
            .range([0, 360]); // диапазон угла

        const arc = this.defineArc(min, max);
        const dashedArc = this.defineArc(min, max, 0.05); // функция верхней пунктирной дуги

        const pie = this.definePie(0, 2 * Math.PI); // функция для внешней дуги
        const endAngleFn = (d) => (scale(d) * Math.PI) / 180;
        const lastArc = this.definePie(0, endAngleFn); // функция дуги, которая следует за ползунком

        this.drawArc(pie([1]), 'back-arc', arc, svg); // отрисовка внешней дуги
        this.drawArc(lastArc([value]), 'needle-arc', arc, svg); // отрисовка подвижной дуги
        this.drawArc(pie(new Array(60)), 'dashed-arc', dashedArc, svg.append('g')); // отрисовка пунктирной дуги

        svg.append('circle').attr('class', 'point').attr('cx', 0).attr('cy', -5).attr('r', 1);
        svg.append('text')
            .attr('class', 'value')
            .attr('text-anchor', 'middle')
            .attr('x', 0)
            .attr('y', 2)
            .text(value.toFixed(1));
        svg.append('text').attr('class', 'units').attr('text-anchor', 'middle').attr('x', 0).attr('y', 6).text('%');

        return svg;
    }

    private drawDiagram(): void {
        this.svgBody = d3Selection.select(this.diagram.nativeElement).append('svg');
        this.svgBody.attr('width', '100%').attr('height', '100%').attr('viewBox', '0 0 400 200');

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
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/diagram-frame.svg')
            .attr('x', 5)
            .attr('y', 0)
            .attr('width', 190)
            .attr('height', 55);
        indicator
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/diagram-frame.svg')
            .attr('x', 5)
            .attr('y', -200)
            .attr('width', 190)
            .attr('height', 55)
            .style('transform', 'scaleY(-1)');

        const gaude = indicator.append('g').attr('class', 'gaude');
        this.drawBigGaude(gaude, this.activeCard.percentValue);
        const innerGaude = gaude.append('g').attr('class', 'innerGaude');
        this.drawInnerGaude(innerGaude, this.activeCard.percentValue);
        const text = gaude.append('g').attr('class', 'gaude-text');
        this.drawTextInGaude(text);
        gaude.style('transform', 'translate(25%, 51%) scale(9)');
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
        this.drawArc(pie(new Array(80)), 'dashed-arc', dashedArc, svg.append('g')); // отрисовка пунктирной дуги

        // позиция бегунка в положении 0
        const needlePos = {
            x1: -min * Math.cos(Math.PI / 4),
            x2: -max * Math.cos(Math.PI / 4),
            y1: min * Math.sin(Math.PI / 4),
            y2: max * Math.sin(Math.PI / 4),
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
            r: (lineMax - lineMin) * 1.5,
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
            .attr('text-anchor', 'end')
            .attr('x', 3.2)
            .attr('y', -1)
            .text(this.activeCard.value);
        block
            .append('text')
            .attr('class', 'deviation')
            .attr('text-anchor', 'end')
            .attr('x', 3.2)
            .attr('y', 1)
            .text(this.activeCard.deviation);
        block.append('text').attr('class', 'units').attr('text-anchor', 'middle').attr('x', 0).attr('y', 3).text('ТН');

        let text = this.activeCard.name;
        if (text.length > 14) {
            text = text.slice(0, 11) + '...';
        }

        block.append('text').attr('class', 'name').attr('text-anchor', 'middle').attr('x', 0).attr('y', 7.5).text(text);
        block
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/deviation-arrow.svg')
            .attr('x', -3.5)
            .attr('y', 0)
            .attr('width', 1.2)
            .attr('height', 1.2);
    }

    // TOFIX не умещаются линии из дизайна
    private drawArrows(): void {
        const arrows = this.svgBody.append('g').attr('class', 'arrows');

        arrows
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/arrow1.svg')
            .attr('x', 200)
            .attr('y', 15)
            .attr('width', 40)
            .attr('height', 15);

        arrows
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/arrow2.svg')
            .attr('x', 215)
            .attr('y', 57)
            .attr('width', 25)
            .attr('height', 13);

        arrows
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/arrow3.svg')
            .attr('x', 222)
            .attr('y', 96)
            .attr('width', 17)
            .attr('height', 7);

        arrows
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/arrow4.svg')
            .attr('x', 215)
            .attr('y', 130)
            .attr('width', 25)
            .attr('height', 13);

        arrows
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/arrow5.svg')
            .attr('x', 203)
            .attr('y', 168)
            .attr('width', 40)
            .attr('height', 15);
    }

    private drawCards(): void {
        const step = 50;
        let stepCounter = -25;
        let card;

        const cards = this.svgBody.append('g').attr('class', 'cards');

        this.data.forEach((item, idx) => {
            card = cards.append('g').attr('class', 'card');
            card.append('image')
                .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/card-left.svg')
                .attr('x', 210)
                .attr('y', stepCounter)
                .attr('width', 48)
                .attr('height', 45);

            card.append('image')
                .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/card-frame.svg')
                .attr('x', 210)
                .attr('y', stepCounter)
                .attr('width', 190)
                .attr('height', 46);

            card.append('image')
                .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/card-values.svg')
                .attr('x', 320)
                .attr('y', stepCounter + 3)
                .attr('width', 75)
                .attr('height', 40);

            card.append('image')
                .attr('xlink:href', 'assets/icons/widgets/APS/aps-indicator-load-deviation/card-icon.svg')
                .attr('x', 217)
                .attr('y', stepCounter + 13)
                .attr('width', 20)
                .attr('height', 20);

            let text = item.name;
            if (text.length > 14) {
                text = text.slice(0, 11) + '...';
            }

            card.append('text')
                .attr('x', 240)
                .attr('y', stepCounter + 25)
                .attr('fill', '#8D9EB8')
                .style('font-size', 11)
                .text(text);

            card.append('text')
                .attr('x', 390)
                .attr('y', stepCounter + 20)
                .attr('fill', '#ffffff')
                .attr('text-anchor', 'end')
                .style('font-size', 11)
                .text(`${item.value}`);

            card.append('text')
                .attr('x', 390)
                .attr('y', stepCounter + 35)
                .attr('fill', '#FF931E')
                .attr('text-anchor', 'end')
                .style('font-size', 11)
                .text(`${item.deviation}`);

            card.on('click', () => {
                console.log(idx);
                this.onClickCard(idx);
            });

            stepCounter += step;
        });
    }

    private onClickCard(idx: number): void {
        const card = this.data.splice(idx, 1, this.activeCard)[0];
        this.activeCard = card;
        this.drawWidget();
    }

    //#region gaude functions

    private defineArc(innerRad: number, outerRad: number, padAngle: number = 0, cornerRadius: number = 0): any {
        return d3.arc().innerRadius(innerRad).outerRadius(outerRad).cornerRadius(cornerRadius).padAngle(padAngle);
    }

    private definePie(startAngle: any, endAngle: any, val: any = (d) => 1): any {
        return d3.pie().startAngle(startAngle).endAngle(endAngle).value(val);
    }

    private drawArc(dataFn: any, cls: string, arcFn: any, block: any): any {
        block.selectAll('.arc').data(dataFn).enter().append('path').attr('class', cls).attr('d', arcFn);
    }

    private drawNeedle(data: any[], cls: string, classed: string, block: any, needlePos: any, scaleFn: any): any {
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

    private drawCircleNeedle(data: any[], cls: string, classed: string, block: any, needlePos: any, scaleFn: any): any {
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
