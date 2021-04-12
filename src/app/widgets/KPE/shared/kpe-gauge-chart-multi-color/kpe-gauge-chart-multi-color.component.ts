import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AsyncRender } from '@shared/functions/async-render.function';
import * as d3 from 'd3';
import { IKpeGaugeChartPage } from '../../key-performance-indicators/components/gauge-diagram/gauge-diagram.component';

export type KpeGaugeChartMultiColor = 'Red' | 'Yellow' | 'Blue' | 'Green';

interface IChartConfig {
    diagramWidth: number;
    bounds?: number[];
    colorBounds: KpeGaugeChartMultiColor[];
    serifColorBounds: KpeGaugeChartMultiColor[];
    centralSerifColorIndex?: KpeGaugeChartMultiColor;
    scale: number;
    gauge: {
        total: number;
        unit: string;
        deviation: number;
        activeZone: number[];
        activeColorIndex: KpeGaugeChartMultiColor;
        angle: number;
    };
}

@Component({
    selector: 'evj-kpe-gauge-chart-multi-color',
    templateUrl: './kpe-gauge-chart-multi-color.component.html',
    styleUrls: ['./kpe-gauge-chart-multi-color.component.scss'],
})
export class KpeGaugeChartMultiColorComponent implements OnInit, OnChanges {
    @ViewChild('chart') chart: ElementRef;
    @Input() type: number;
    @Input() showAxisValues: boolean = true;
    @Input() isPerformance: boolean = false; // В performance екст отличается от остальных текстов под диаграммой
    @Input() data: IKpeGaugeChartPage | null = null;

    readonly chartConfig: IChartConfig[] = [
        {
            diagramWidth: 2,
            colorBounds: ['Yellow', 'Blue', 'Green'],
            serifColorBounds: ['Yellow', 'Blue'],
            centralSerifColorIndex: 'Blue',
            scale: 0.88,
            gauge: {
                total: 100,
                unit: '%',
                deviation: 20,
                activeZone: [Math.PI / 4, Math.PI / 4 + Math.PI / 6],
                activeColorIndex: 'Green',
                angle: 75,
            },
        },
        {
            diagramWidth: 6,
            colorBounds: ['Red', 'Yellow', 'Blue'],
            serifColorBounds: ['Red', 'Yellow'],
            scale: 0.88,
            gauge: {
                total: 0,
                unit: '%',
                deviation: 0,
                activeZone: [-0.25 * Math.PI, -0.25 * Math.PI],
                activeColorIndex: 'Yellow',
                angle: 0,
            },
        },
        {
            diagramWidth: 2,
            colorBounds: ['Red', 'Yellow', 'Blue', 'Green', 'Red'],
            serifColorBounds: ['Red', 'Yellow', 'Blue', 'Green'],
            centralSerifColorIndex: 'Green',
            scale: 0.88,
            gauge: {
                total: 100,
                unit: '%',
                deviation: 20,
                activeZone: [Math.PI / 4, Math.PI / 4 + Math.PI / 6],
                activeColorIndex: 'Red',
                angle: 75,
            },
        },
        {
            diagramWidth: 2,
            colorBounds: ['Yellow', 'Red'],
            serifColorBounds: [],
            centralSerifColorIndex: 'Blue',
            scale: 0.88,
            gauge: {
                total: 50,
                unit: 'шт',
                deviation: 550,
                activeZone: [-0.75 * Math.PI, -Math.PI / 2],
                activeColorIndex: 'Red',
                angle: -90,
            },
        },
    ];

    public ngOnChanges(): void {
        this.dataBind();
        this.chartInit();
    }

    public ngOnInit(): void {
        this.chartInit();
    }

    private dataBind(): void {
        this.chartConfig[this.type].gauge.total = this.data?.value ? this.data?.value : this.chartConfig[this.type].gauge.total;
        this.chartConfig[this.type].gauge.deviation = this.data?.deviation ? this.data?.deviation : this.chartConfig[this.type].gauge.deviation;
        this.chartConfig[this.type].colorBounds = this.data?.colorBounds ? this.data?.colorBounds : this.chartConfig[this.type].colorBounds;
        this.chartConfig[this.type].serifColorBounds = this.data?.colorBounds ? this.data?.colorBounds.slice(0, -1) : this.chartConfig[this.type].serifColorBounds;
        this.chartConfig[this.type].gauge.angle = this.data?.value || this.data?.value === 0 ? this.convertPercentToGrad(this.data?.zeroOn === 'Right' ? 100 - this.data?.value : this.data?.value) : this.chartConfig[this.type].gauge.angle;
        this.chartConfig[this.type].bounds = this.data?.bounds ? this.data?.bounds : null;

        // Данные для активной области
        let value;
        let boundEdge;
        let index;

        if (this.data?.zeroOn === 'Right') {
            value = 100 - this.data?.value;
            // Если zeroOn === 'Right', то находим минимальную границу диапазона bound, в который попадает значение
            boundEdge = this.chartConfig[this.type].bounds?.reduce((prev, curr) => {
                    if (prev < value && value < curr) {
                        return prev;
                    }
                }
            );
            index = this.chartConfig[this.type].bounds?.indexOf(boundEdge);
        } else {
            value = this.data?.value;
            boundEdge = this.chartConfig[this.type].bounds?.find(item => item > this.data?.value);
            index = this.chartConfig[this.type].bounds?.indexOf(boundEdge) - 1;
        }

        if (boundEdge || boundEdge === 0) {
            const color = this.chartConfig[this.type].colorBounds[index];
            this.chartConfig[this.type].gauge.activeColorIndex = color ? color : this.chartConfig[this.type].gauge.activeColorIndex;
            const startActive = (this.convertPercentToGrad(value) * (Math.PI / 180));
            const endActive = (this.convertPercentToGrad(boundEdge) * (Math.PI / 180));
            this.chartConfig[this.type].gauge.activeZone = [startActive, endActive];
        }
    }

    private chartInit(): void {
        this.bindChart();
    }

    @AsyncRender
    private bindChart(): void {
        // На сколько (равных?) секций разделена диаграмма
        const colorBounds: KpeGaugeChartMultiColor[] = this.chartConfig[this.type].colorBounds;
        const serifColorBounds: KpeGaugeChartMultiColor[] = this.chartConfig[this.type].serifColorBounds;
        const diagramWidth = this.chartConfig[this.type].diagramWidth;

        const gauge = this.chartConfig[this.type].gauge // Временная мера для разнообразия

        const width = 76;
        const height = 76;

        const outerRadius = width / 2 - 2;
        const innerRadius = outerRadius - diagramWidth;

        const start = (-3 * Math.PI) / 4;
        const end = -start;

        d3.select(this.chart.nativeElement).selectAll('*').remove();
        const svg = d3
            .select(this.chart.nativeElement)
            .append('svg')
            .attr('viewBox', `0 0 76 76`)
            .append('g')
            .attr('transform', `translate(${width / 2} , ${height / 2})`);

        const arc: d3.Arc = d3
            .arc()
            .outerRadius(outerRadius - 2)
            .innerRadius(innerRadius - 2);
        const serifArc: d3.Arc = d3
            .arc()
            .outerRadius(outerRadius - 1)
            .innerRadius(innerRadius - 3);
        const arcHidden: d3.Arc = d3
            .arc()
            .outerRadius(outerRadius - 2)
            .innerRadius(1);

        function drawCircle(r: number, className: string): void {
            svg.append('circle').attr('r', r).attr('class', className);
        }

        function createPie(startAngel: number, endAngel: number): d3.Pie {
            return d3.pie().startAngle(startAngel).endAngle(endAngel).value(1);
        }

        function drawDiagram(className: string, pie: any, fig: d3.Arc = arc): void {
            svg.append('g')
                .attr('class', className)
                .selectAll('path')
                .data(pie())
                .enter()
                .append('path')
                .attr('d', fig);
        }

        const gradientArrow = (arrowAngle: number) => {
            // arrowAngle от -135 до 135
            let shadow: any;

            if (this.type === 2) {
                shadow = d3
                    .arc()
                    .innerRadius(16)
                    .outerRadius(outerRadius - 10)
                    .startAngle(arrowAngle > 0 ? -0.5 * Math.PI : 0.5 * Math.PI)
                    .endAngle(-0.008 * Math.PI);
            } else if (this.type === 1){
                shadow = d3
                    .arc()
                    .innerRadius(16)
                    .outerRadius(outerRadius - 10)
                    .startAngle(0.5 * Math.PI)
                    .endAngle(-0.008 * Math.PI);
            }
            else {
                shadow = d3
                    .arc()
                    .innerRadius(16)
                    .outerRadius(outerRadius - 8)
                    .startAngle(-0.5 * Math.PI)
                    .endAngle(-0.008 * Math.PI);
            }

            const shadowGradient = svg
                .append('defs')
                .append('linearGradient')
                .attr('id', 'gradient')
                .attr('x1', '0%')
                .attr('x2', '0%')
                .attr('y1', '0%')
                .attr('y2', '100%')
                .attr('spreadMethod', 'pad');

            shadowGradient.append('svg:stop').attr('offset', '0%').attr('class', 'needle-shadow-gradient-1');

            shadowGradient.append('svg:stop').attr('offset', '100%').attr('class', 'needle-shadow-gradient-2');

            // Стрелка
            svg.append('path')
                .attr('class', 'needle')
                .attr('d', 'M-3 0 L-1 -30 L1 0 S3 5 0 5 S-3 5 -3 0 Z') // стрелка
                .attr(
                    `transform`,
                    `rotate(${isNaN(arrowAngle) ? 0 : arrowAngle}) scale(${this.chartConfig[this.type].scale})`
                );

            const needleShadow = svg
                .append('path')
                .attr('d', shadow)
                .attr(`transform`, `rotate(${isNaN(arrowAngle) ? 0 : arrowAngle})`)
                .style('fill', 'url(#gradient)');
        };

        function addText(text: string, cls: string, yCord: number, xCord: number = 0): void {
            svg.append('g')
                .append('text')
                .attr('class', cls)
                .attr('text-anchor', 'middle')
                .attr('x', xCord)
                .attr('y', yCord)
                .text(text);
        }

        // Темный круглый фон
        drawCircle(width / 2 - 2, 'circle__dark');

        // Основаная диаграмма поверх которой будут остальные
        const backPie = createPie(start, end);
        drawDiagram('background-pie', () => backPie([null]));

        // Секции диаграммы
        const sectionSize = (end - start) / colorBounds.length; // Размер каждой секции общ. разм/ колличесво секций

        // Если имеется массив bounds, то размер секции рассчитывается в соответсвии с ним, если нет - то размер секций одинаковый
        if (this.chartConfig[this.type].bounds) {
            this.chartConfig[this.type].bounds.forEach((bound, i) => {
                const startBound = this.chartConfig[this.type].bounds[i];
                const endBound = this.chartConfig[this.type].bounds[i + 1];
                const startRad = this.convertPercentToGrad(startBound ? startBound : 0) * (Math.PI / 180);
                const endRad = this.convertPercentToGrad(endBound ? endBound : 100) * (Math.PI / 180);
                const section = createPie(startRad, endRad);
                drawDiagram(`diagram-section-${colorBounds[i]}`, () => section([null]));
            });
        } else {
            colorBounds.forEach((colorIndex, i) => {
                const section = createPie(start + i * sectionSize, start + (i + 1) * sectionSize);
                drawDiagram(`diagram-section-${colorIndex}`, () => section([null]));
            });
        }

        // Стрелка
        gradientArrow(gauge.angle);

        // Закрываем тень от стрелки
        const sectionHidden = createPie(end, end + Math.PI / 2);
        drawDiagram(`circle__dark`, () => sectionHidden([null]), arcHidden);

        // Темный круглый фон с текстом
        drawCircle(width / 2 - 18, 'circle__dark');
        addText('' + gauge.total, 'total', -2);
        addText('' + gauge.deviation, 'deviation', 9);

        if (!this.isPerformance) {
            addText(gauge.unit, 'unit', 25);
        }

        if (this.showAxisValues) {
            addText('+5', 'axis-value', -25, 31);
            addText('+5', 'axis-value', -25, -31);
        }

        // Активная секция(Там где стрелка)
        const sectionActive = createPie(gauge.activeZone[0], gauge.activeZone[1]);
        drawDiagram(`diagram-section-serif-${gauge.activeColorIndex}`, () => sectionActive([null]));

        // Края диаграммы
        const serifSize = Math.PI / 180;
        const serifStart = createPie(start, start + serifSize);
        const serifEnd = createPie(end - serifSize, end);
        drawDiagram('serif', () => serifStart([null]));
        drawDiagram('serif', () => serifEnd([null]));

        // Засечки на диаграмме
        // Если имеется массив bounds, то положение засечки секции рассчитывается по последнему значению диапозона
        if (this.chartConfig[this.type].bounds) {
            this.chartConfig[this.type].bounds.forEach((bound, i) => {
                const index = this.data?.zeroOn === 'Right' ? i : i - 1;
                const endBound = this.chartConfig[this.type].bounds[index];
                if (!endBound) { return; }
                const endRad = this.convertPercentToGrad(endBound) * (Math.PI / 180);
                const sectionSerif = createPie(endRad - serifSize, endRad);
                const className = this.data?.zeroOn === 'Right' ? colorBounds[index] : serifColorBounds[index - 1];
                drawDiagram(`diagram-section-serif-${className}`, () => sectionSerif([null]), serifArc);
            });
        } else {
            serifColorBounds.forEach((colorIndex, i) => {
                const sectionSerif = createPie(start + (i + 1) * sectionSize - serifSize, start + (i + 1) * sectionSize);
                drawDiagram(`diagram-section-serif-${colorIndex}`, () => sectionSerif([null]), serifArc);
            });
        }

        // Засечка в центре если он нужна
        if (!!this.chartConfig[this.type]?.centralSerifColorIndex) {
            const sectionSerifCenter = createPie(-serifSize / 2, serifSize / 2);
            drawDiagram(
                `diagram-section-serif-${this.chartConfig[this.type].centralSerifColorIndex}`,
                () => sectionSerifCenter([null]),
                serifArc
            );
        }
    }

    private convertPercentToGrad(percent: number): number {
        const start = (-3 * 180) / 4;
        const end = -start;

        if (percent > 0 && percent < 100) {
            return percent * 2 * end / 100 - end;
        }
        if (percent >= 100) {
            return end;
        }
        if (percent <= 0) {
            return start;
        }
    }
}
