import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AsyncRender } from '@shared/functions/async-render.function';
import * as d3 from 'd3';

interface IChartConfig {
    diagramWidth: number;
    sectionColorsIndex: number[];
    serifColorsIndex: number[];
    centralSerifColorIndex?: number;
    scale: number;
    gauge: {
        total: number;
        unit: string;
        deviation: number;
        activeZone: number[];
        activeColorIndex: number;
        angle: number;
    };
}

@Component({
    selector: 'evj-kpe-gauge-chart-multi-color',
    templateUrl: './kpe-gauge-chart-multi-color.component.html',
    styleUrls: ['./kpe-gauge-chart-multi-color.component.scss'],
})
export class KpeGaugeChartMultiColorComponent implements OnInit {
    @ViewChild('chart') chart: ElementRef;
    @Input() type: number;
    @Input() showAxisValues: boolean = true;
    @Input() isPerformance: boolean = false; // В performance екст отличается от остальных текстов под диаграммой

    readonly chartConfig: IChartConfig[] = [
        {
            diagramWidth: 2,
            sectionColorsIndex: [2, 3, 4],
            serifColorsIndex: [2, 4],
            centralSerifColorIndex: 3,
            scale: 0.88,
            gauge: {
                total: 100,
                unit: '%',
                deviation: 20,
                activeZone: [Math.PI / 4, Math.PI / 4 + Math.PI / 6],
                activeColorIndex: 4,
                angle: 75,
            },
        },
        {
            diagramWidth: 6,
            sectionColorsIndex: [1, 2, 3],
            serifColorsIndex: [1, 2],
            scale: 0.88,
            gauge: {
                total: 97.1,
                unit: '%',
                deviation: -2.8,
                activeZone: [Math.PI / 6, Math.PI / 4],
                activeColorIndex: 2,
                angle: 30,
            },
        },
        {
            diagramWidth: 2,
            sectionColorsIndex: [1, 2, 3, 2, 1],
            serifColorsIndex: [1, 2, 2, 1],
            centralSerifColorIndex: 3,
            scale: 0.88,
            gauge: {
                total: 100,
                unit: '%',
                deviation: 20,
                activeZone: [Math.PI / 4, Math.PI / 4 + Math.PI / 6],
                activeColorIndex: 1,
                angle: 75,
            },
        },
        {
            diagramWidth: 2,
            sectionColorsIndex: [2, 1],
            serifColorsIndex: [],
            centralSerifColorIndex: 2,
            scale: 0.88,
            gauge: {
                total: 50,
                unit: 'шт',
                deviation: 550,
                activeZone: [-0.75 * Math.PI, -Math.PI / 2],
                activeColorIndex: 1,
                angle: -90,
            },
        },
    ];

    public ngOnInit(): void {
        this.chartInit();
    }

    private chartInit(): void {
        this.bindChart();
    }

    @AsyncRender
    private bindChart(): void {
        // На сколько (равных?) секций разделена диаграмма
        const sectionColorsIndex: number[] = this.chartConfig[this.type].sectionColorsIndex;
        const serifColorsIndex: number[] = this.chartConfig[this.type].serifColorsIndex;
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
        const sectionSize = (end - start) / sectionColorsIndex.length; // Размер каждой секции общ. разм/ колличесво секций
        sectionColorsIndex.forEach((colorIndex, i) => {
            const section = createPie(start + i * sectionSize, start + (i + 1) * sectionSize);
            drawDiagram(`diagram-section-${colorIndex}`, () => section([null]));
        });

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
        serifColorsIndex.forEach((colorIndex, i) => {
            const sectionSerif = createPie(start + (i + 1) * sectionSize - serifSize, start + (i + 1) * sectionSize);
            drawDiagram(`diagram-section-serif-${colorIndex}`, () => sectionSerif([null]), serifArc);
        });

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
}
