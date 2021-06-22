import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { AsyncRender } from '@shared/functions/async-render.function';
import { ITrendAnalysisGraphData } from '@widgets/EC/ec-widget-trend-analysis-graph/ec-widget-trend-analysis-graph.component';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { fillDataArrayChart } from '@shared/functions/fill-data-array.function';
import { IChartMini } from '@shared/interfaces/smart-scroll.model';

@Component({
    selector: 'evj-ec-widget-trend-analysis-multi-chart',
    templateUrl: './ec-widget-trend-analysis-multi-chart.component.html',
    styleUrls: ['./ec-widget-trend-analysis-multi-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcWidgetTrendAnalysisMultiChartComponent {
    @Input() set chartsData(ref: ITrendAnalysisGraphData[]) {
        if (ref.length) {
            this.data = ref;
            this.transformData();
            this.startDrawChart();
        } else {
            this.data = [];
            this.dropChart();
        }
    }
    @Input() private intervalHours: number[] = [];

    @ViewChild('chart', {static: true}) private chart: ElementRef;

    public data: ITrendAnalysisGraphData[] = [];
    public scaleFuncs: {
        x: (s: string | Date | number) => number;
        y: (s: string | Date | number) => number;
    } = {
        x: null,
        y: null
    };

    private readonly MAX_COEF: number = 0.3;
    private readonly MIN_COEF: number = 0.3;
    private svg: d3Selection = null;
    private graphMaxX: number = 0;
    private graphMaxY: number = 0;
    private padding: { left: number; right: number; top: number; bottom: number } = {
        left: 280,
        right: 30,
        top: 25,
        bottom: 35,
    };

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (!!this.data.length) {
            this.startDrawChart();
        } else {
            this.dropChart();
        }
    }

    @AsyncRender
    public startDrawChart(): void {
        this.dropChart();
        this.initData();
        this.bottomScale();
        this.drawFutureRect();
        this.leftScales();
    }

    private initData(): void {
        this.svg = d3Selection.select(this.chart.nativeElement).append('svg');
        this.graphMaxX = +d3Selection.select(this.chart.nativeElement).style('width').slice(0, -2);
        this.graphMaxY = +d3Selection.select(this.chart.nativeElement).style('height').slice(0, -2);
        this.svg
            .attr('width', '100%')
            // тут можно подогнать мин ширину графика
            .attr('min-width', '1000px')
            .attr('height', '100%')
            .attr(
                'viewBox',
                `0 0 ${this.graphMaxX > 0 ? this.graphMaxX : 0} ${this.graphMaxY > 5 ? this.graphMaxY - 5 : 0}`
            );
        this.padding.left = this.data.filter(f => f.showGraph).length * 40 || 40;
    }

    private bottomScale(): void {
        const startTime = new Date(new Date().setHours(this.intervalHours[0], 0, 0, 0));
        const endTime = new Date(startTime).setHours(this.intervalHours[1]);
        const domainDates = [startTime, endTime];
        const rangeX = [this.padding.left, this.graphMaxX - this.padding.right];
        this.scaleFuncs.x = d3.scaleTime().domain(domainDates).rangeRound(rangeX);
        const axisX = d3
            .axisBottom(this.scaleFuncs.x)
            .ticks(24)
            .tickSize(5)
            .tickFormat(d3.timeFormat('%H:%M'))

        const translateX: string = `translate(0,${this.graphMaxY - this.padding.bottom})`;
        // рисуем нижнюю линию
        this.svg
            .append('g')
            .attr('transform', translateX)
            .attr('class', 'axisX')
            .call(axisX)
            .selectAll('text')
        this.svg.selectAll('g.axisX g.tick line')._groups[0].forEach((g) => {
            g.remove();
        });
        // рисуем сетку по вертикали
        const yLines = d3
            .axisBottom(this.scaleFuncs.x)
            .ticks(24)
            .tickSize(-this.graphMaxY + this.padding.top + this.padding.bottom)
            .tickFormat('')
        this.svg
            .append('g')
            .attr('transform', translateX)
            .call(yLines)
            .attr('class', 'grid , grid_bg');
    }

    private leftScales(): void {
        // рисуем оси Y
        this.data.filter(t => t.showGraph).forEach((trend, i) => {
            const maxTrendVal = d3.max(trend.trendValues, (ref: IChartMini) => ref.value);
            const minTrendVal = d3.min(trend.trendValues, (ref: IChartMini) => ref.value);
            const maxDomainVal = maxTrendVal + (maxTrendVal - minTrendVal) * this.MAX_COEF;
            const minDomainVal = minTrendVal - (maxTrendVal - minTrendVal) * this.MIN_COEF;
            const domainValues = [minDomainVal * 0.3, maxDomainVal];
            const rangeY = [this.padding.top, this.graphMaxY - this.padding.bottom];

            this.scaleFuncs.y = d3.scaleLinear().domain(domainValues).range(rangeY);
            // рисуем горизонтальную сетку на первой итерации
            if (i === 0) {
                this.drawGrid();
            }
            const axisY = d3.axisLeft(this.scaleFuncs.y)
                .ticks(5)
                .tickSize(5)
                .tickFormat(d3.format('d'));
            this.svg
                .append('g')
                .attr('transform', `translate(${this.padding.left - i * 40}, 0)`)
                .attr('class', 'axisY')
                .attr('class', 'axisY-' + i)
                .attr('id', i)
                .call(axisY)
                .selectAll('text')
            this.svg.select('g.axisY-' + i).select('path').attr('stroke', trend.color)
            this.svg.select('g.axisY-' + i).selectAll('g.tick')._groups[0].forEach(g => {
                g.children[0].setAttribute('stroke', trend.color);
            });
            // добавляем стрелочки к осям Y
            this.drawAxisArrows(i, trend.color);
            // рисуем линии на графике
            this.drawChart(trend);
        });
    }

    private drawAxisArrows(i: number, color: string): void {
        // рисуем треугольники
        this.svg
            .select('g.axisY-' + i)
            .append('polygon')
            .attr('points', '0, 13 -3,19 3,19')
            .style('fill', color);
        // рисуем линии под треугольниками до оси Y
        this.svg
            .select('g.axisY-' + i)
            .append('line')
            .attr('x1', 0)
            .attr('y1', 20)
            .attr('x2', 0)
            .attr('y2', 25)
            .style('stroke', color);
    }


    private drawChart(data: ITrendAnalysisGraphData): void {
        const points = data.trendValues.map(item => {
            return {
                y: this.scaleFuncs.y(item.value),
                x: this.scaleFuncs.x(new Date(item.timeStamp))
            };
        });
        const line = d3.line()
            .x((item) => item.x)
            .y((item) => item.y)
            .curve(d3.curveLinear);

        this.svg.append('path')
            .attr('d', line(points))
            .style('fill', 'none')
            .attr('opacity', 1)
            .style('stroke', data.color)
            .style('stroke-width', 1)
        // добавляем круги в конец линий
        this.appendCircle(8, points[points.length - 1], 0.05, data.color);
        this.appendCircle(4, points[points.length - 1], 0.2, data.color);
        this.appendCircle(2, points[points.length - 1], 0.5, data.color);
        this.appendCircle(1, points[points.length - 1], 1, data.color);

    }

    private appendCircle(r: number, last: { x: number, y: number }, opacity: number, color: string): void {
        this.svg
            .append('circle')
            .attr('opacity', opacity)
            .attr('fill', color)
            .attr('r', r)
            .attr('cx', last.x)
            .attr('cy', last.y);
    }

    private dropChart(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = undefined;
        }
    }

    private drawGrid(): void {
        const xLine = d3.axisLeft(this.scaleFuncs.y)
            .ticks(5)
            .tickSize(-this.graphMaxX + this.padding.left + this.padding.right)
            .tickFormat('')
        this.svg
            .append('g')
            .attr('transform', `translate(${this.padding.left}, 0)`)
            .call(xLine)
            .attr('class', 'grid');
    }

    private transformData(): void {
        const startTime = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
        const endTime = new Date(startTime).setHours(23);

        this.data.forEach((graph) => {
            graph.trendValues?.forEach((item) => {
                item.timeStamp = new Date(item.timeStamp);
            });
        });

        this.data.forEach(
            (item) =>
                (item.trendValues = fillDataArrayChart(
                    item.trendValues,
                    startTime,
                    endTime,
                    false
                ))
        );
    }

    private drawFutureRect(): void {
        const fact = this.data[0].trendValues;
        const x = this.scaleFuncs.x(new Date(fact[fact.length - 1].timeStamp));
        const y = this.padding.top;
        const width = this.graphMaxX - this.padding.right - x;
        const height = this.graphMaxY - this.padding.top - this.padding.bottom;
        if (width > 0) {
            this.svg
                .append('rect')
                .attr('x', x)
                .attr('y', y)
                .attr('width', width)
                .attr('height', height)
                .attr('class', 'future-rect');
        }
    }
}
