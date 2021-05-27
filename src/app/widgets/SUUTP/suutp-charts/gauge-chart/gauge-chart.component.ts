import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
    ElementRef,
    OnChanges,
    HostListener,
    Input
} from "@angular/core";
import { AsyncRender } from '@shared/functions/async-render.function';
import * as d3 from 'd3';
import { ISuutpGaugeChart, SuutpGaugeChartColors } from "@widgets/SUUTP/suutp-charts/suutp-charts.interface";

interface ISuutpGaugeChartConfig {
    diagramWidth: number,
    bounds: number[],
    colorBounds: SuutpGaugeChartColors[],
    serifColorBounds: SuutpGaugeChartColors[],
    scale: number,
    gauge: {
        total: number,
        unit: string,
        deviation: number,
        activeZone: number[],
        activeColorIndex: string,
        angle: number
    }
}

@Component({
  selector: 'evj-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GaugeChartComponent implements OnInit, OnChanges {
    @Input() public readonly data: ISuutpGaugeChart;
    @ViewChild('chart') chart: ElementRef;

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.chartInit();
    }

    readonly type: number = 0;

    readonly chartConfig: ISuutpGaugeChartConfig[] = [
        {
            diagramWidth: 8,
            bounds: [],
            colorBounds: ['Red', 'Yellow', 'Blue'],
            serifColorBounds: ['Red', 'White'],
            scale: 0.8,
            gauge: {
                total: 0,
                unit: '%',
                deviation: 0,
                activeZone: [-0.25 * Math.PI, -0.25 * Math.PI],
                activeColorIndex: 'Yellow',
                angle: 0,
            },
        }
    ];

    private svg: any;
    private arc: any;
    private serifArc: any;
    private size: {width: number, height: number} = { width: 86, height: 86 };
    private svgSize: {width: number, height: number} = { width: 96, height: 96 };

    private innerRadius: number;
    private outerRadius: number;
    private gauge;
    private start: number = (-3 * Math.PI) / 4;
    private end: number = -this.start;

    public ngOnChanges(): void {
        if (this.data) {
            this.dataBind();
        }
        this.chartInit();
    }

    public ngOnInit(): void {
        if (this.data) {
            this.dataBind();
        }
        this.chartInit();
    }

    private dataBind(): void {
        const maxBound = Math.max.apply(null, this.data?.bounds)
        this.chartConfig[this.type].gauge.total = this.data?.fact;
        this.chartConfig[this.type].gauge.deviation = this.data?.deviation;
        this.chartConfig[this.type].colorBounds = this.data?.colorBounds;
        this.chartConfig[this.type].serifColorBounds = this.data?.colorBounds?.slice(0, -1);
        this.chartConfig[this.type].gauge.angle = this.convertPercentToGrad(this.getFactPercent(this.data?.fact, maxBound));
        this.chartConfig[this.type].bounds = this.data?.bounds;

        // Данные для активной области
        const value = this.data?.fact / maxBound * 100;
        const boundEdge = this.chartConfig[this.type].bounds?.find(item => item > value);
        const index = this.chartConfig[this.type].bounds?.indexOf(boundEdge) - 1;

        const color = this.chartConfig[this.type].colorBounds[index];

        const startActive = (this.convertPercentToGrad(value) * (Math.PI / 180));
        const endActive = (this.convertPercentToGrad(boundEdge) * (Math.PI / 180));

        this.chartConfig[this.type].gauge.activeZone = [startActive, endActive];
        this.chartConfig[this.type].gauge.activeColorIndex = color ? color : this.chartConfig[this.type].gauge.activeColorIndex;
    }

    private chartInit(): void {
        this.bindChart();
    }

    @AsyncRender
    private bindChart(): void {
        const diagramWidth = this.chartConfig[this.type].diagramWidth;

        this.gauge = this.chartConfig[this.type].gauge

        this.outerRadius = this.size.width / 2 - 4;
        this.innerRadius = this.outerRadius - diagramWidth;

        this.initSvg();
        this.drawElements();
        this.drawActiveSection();
        this.drawSections()
    }

    private initSvg(): void {
        d3.select(this.chart.nativeElement).selectAll('*').remove();

        this.svg = d3
            .select(this.chart.nativeElement)
            .append('svg')
            .attr('class', 'diagram')
            .attr('viewBox', `0 0 ${this.svgSize.width} ${this.svgSize.height}`)
            .append('g')
            .attr('transform', `translate(${this.svgSize.width / 2} , ${this.svgSize.height / 2})`);

    }


    private drawElements(): void {
        this.drawArcs();
        // Темный круг между тёмным кругом с текстом и цветными арками
        this.drawCircle(this.size.width / 2 - 2, 'circle__dark');
        // Основная диаграмма поверх которой будут остальные
        this.mainDiagram();
        // Стрелка
        this.drawGradientArrow(this.gauge.angle);
        // Темный круглый фон с текстом
        this.drawCircle(this.size.width / 2 - 26, 'circle__dark');
        this.drawSerifs();
        this.addText(`${this.gauge.total}%`, 'total', 4);
        this.addText(`${this.gauge.deviation}%`, 'deviation', 28);

        // Текст за пределами, логики пока что нет, поэтому статические
        this.addText("90%", "serif-text", -34, -36);
        this.addText("95%", "serif-text", -34, 36)
    }

    private drawSections(): void {
        const colorBounds: SuutpGaugeChartColors[] = this.chartConfig[this.type].colorBounds;

        // Если имеется массив bounds, то размер секции рассчитывается в соответствии с ним
        const defEndBound = 100;

        this.chartConfig[this.type].bounds.forEach((bound, i) => {
            const startBound = this.chartConfig[this.type].bounds[i]; // 0
            const endBound = this.chartConfig[this.type].bounds[i + 1]; // 40
            // высчитывается угол
            const startRad = this.convertPercentToGrad(startBound ? startBound : 0) * (Math.PI / 180);
            const endRad = this.convertPercentToGrad(endBound ? endBound : defEndBound) * (Math.PI / 180);
            const section = this.createPie(startRad, endRad);
            if (colorBounds[i]) {
                this.drawDiagram(`diagram-section-${colorBounds[i]}`, () => section([null]));
            }
        });
    }

    private drawActiveSection(): void {
        // Активная секция(Там где стрелка)
        const sectionActive = this.createPie(this.gauge.activeZone[0], this.gauge.activeZone[1]);

        if (this.data?.fact < this.data?.plan) {
            this.drawDiagram(`diagram-section-serif-${this.gauge.activeColorIndex}`, () => sectionActive([null]));
        }
    }

    private mainDiagram(): void {
        const backPie = this.createPie(this.start, this.end);
        this.drawDiagram('background-pie', () => backPie([null]));
    }

    private drawArcs(): void {
        this.arc = d3
            .arc() // "основная" арка
            .outerRadius(this.outerRadius - 2)
            .innerRadius(this.innerRadius - 2);
        this.serifArc = d3
            .arc() // арка засечек
            .outerRadius(this.outerRadius - 1)
            .innerRadius(this.innerRadius - 3);
    }

    private drawGradientArrow = (arrowAngle: number) => { // стрелка указывающая на значение
        let shadow: any;

        shadow = d3
            .arc()
            .innerRadius(10)
            .outerRadius(this.outerRadius - 12)
            .startAngle(arrowAngle * 3 / 180)
            .endAngle(this.end)

        const shadowGradient = this.svg
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
        this.svg.append('path')
            .attr('class', 'needle')
            .attr('d', 'M-3 0 L-1 -35 L1 0 S3 5 0 5 S-3 5 -3 0 Z') // стрелка
            .attr(
                `transform`,
                `rotate(${isNaN(arrowAngle) ? 0 : arrowAngle}) scale(${this.chartConfig[this.type].scale})`
            );

        this.svg
            .append('path')
            .attr('d', shadow)
            .style('fill', 'url(#gradient)');
    };

    private drawSerifs(): void {
        const serifColorBounds: SuutpGaugeChartColors[] = this.chartConfig[this.type].serifColorBounds;
        // Края диаграммы
        const serifSize = Math.PI / 180;
        const serifStart = this.createPie(this.start, this.start + serifSize);
        const serifEnd = this.createPie(this.end - serifSize, this.end);
        this.drawDiagram('serif', () => serifStart([null]));
        this.drawDiagram('serif', () => serifEnd([null]));

        // Засечки на диаграмме
        this.chartConfig[this.type].colorBounds.forEach((bound, i) => {
            const index = i + 1;
            const endBound = this.chartConfig[this.type]?.bounds[index];
            if (!endBound) { return; }
            const endRad = this.convertPercentToGrad(endBound) * (Math.PI / 180);
            const sectionSerif = this.createPie(endRad - serifSize, endRad);
            const className = serifColorBounds[index - 1];
            if (className) {
                this.drawDiagram(`diagram-section-serif-${className}`, () => sectionSerif([null]), this.serifArc);
            }
        });
    }

    private addText(text: string, cls: string, yCord: number, xCord: number = 0): void {
        this.svg.append('g')
            .append('text')
            .attr('class', cls)
            .attr('text-anchor', 'middle')
            .attr('x', xCord)
            .attr('y', yCord)
            .text(text);
    }

    private drawCircle(r: number, className: string): void {
        this.svg.append('circle').attr('r', r).attr('class', className);
    }

    private createPie(startAngel: number, endAngel: number): d3.Pie {
        return d3.pie().startAngle(startAngel).endAngle(endAngel).value(1);
    }

    private drawDiagram(className: string, pie: any, fig: d3.Arc = this.arc): void {
        this.svg.append('g')
            .attr('class', className)
            .selectAll('path')
            .data(pie())
            .enter()
            .append('path')
            .attr('d', fig);
    }

    // функция для высчитывания процентов готовности чего-то
    private getFactPercent(fact: number, plan: number): number {
        let per;

        per = fact / plan * 100;
        per = per > 100 ? 100 : per < -100 ? -100 : per;
        return per || 0;
    }

    // перевод процентов в угол наклона
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
