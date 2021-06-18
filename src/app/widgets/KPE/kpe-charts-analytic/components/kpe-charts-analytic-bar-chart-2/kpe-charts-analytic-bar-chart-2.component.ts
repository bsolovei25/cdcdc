import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { AsyncRender } from '@shared/functions/async-render.function';
import { IInterval } from '@widgets/KPE/kpe-charts-analytic/components/kpe-charts-analytic-bar-chart/kpe-charts-analytic-bar-chart.component';
import {
    IKpeChartsAnalyticGraphData,
    IKpeChartsAnalyticGraphPoint
} from '@dashboard/models/KPE/kpe-charts-analytic.model';

export interface IBarDiagramData {
    day: number;
    planValue: number;
    factValue: number;
}

@Component({
    selector: 'evj-kpe-charts-analytic-bar-chart-2',
    templateUrl: './kpe-charts-analytic-bar-chart-2.component.html',
    styleUrls: ['./kpe-charts-analytic-bar-chart-2.component.scss'],
})
export class KpeChartsAnalyticBarChart2Component implements OnChanges, OnInit {
    @Input()
    public data: IKpeChartsAnalyticGraphData[];

    @Input()
    public units: string;

    @Input()
    public interval: IInterval;

    @ViewChild('chart')
    private chart: ElementRef;

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (this.data.length && this.chart) {
            this.drawSvg();
        }
    }

    public size: { width: number | null; height: number | null } = { width: null, height: null };

    public scales: { x: any; y: any } = { x: null, y: null };

    public sizeX: { min: number; max: number } = { min: 1, max: 31 };

    public sizeY: { min: number; max: number } = { min: 0, max: 0};

    private readonly padding: { top: number; right: number; bottom: number; left: number } = {
        top: 7,
        right: 1,
        bottom: 20,
        left: 25,
    };

    private day: number | null = null;

    private svg: any = null;

    private dataset: { x: number; y: number }[] = [];

    private mappedDataArray: IBarDiagramData[] = [];
    private averageDataArray: IBarDiagramData[] = [];

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes) {
            this.drawSvg();
        }
    }

    public ngOnInit(): void {
        this.drawSvg();
    }

    @AsyncRender
    private drawSvg(): void {
        this.mapData();
        this.configChartArea();
        this.mapToAverageValues();
        this.prepareData();
        this.initScale();
        this.initSvg();
        this.drawAxises();
        this.drawGrid();
        this.drawDayThreshold();
        this.drawEqColumns();
        this.drawCurve();
    }

    private mapData(): IBarDiagramData[] {
        this.mappedDataArray = [];
        if (this.mappedDataArray.length === 0) {
            for (let i = 0; i < this.data[0].graph.length; i++) {
                const data: IBarDiagramData = {
                    day: 0,
                    planValue: 0,
                    factValue: 0,
                };

                this.mappedDataArray.push(data)
            }
        }

        this.fillMappedDataArray(this.data[0].graph, 'factValue', this.mappedDataArray);
        this.fillMappedDataArray(this.data[1].graph, 'planValue', this.mappedDataArray);

        return this.mappedDataArray;
    }

    private fillMappedDataArray(graph: IKpeChartsAnalyticGraphPoint[], property: string, destinationArray: IBarDiagramData[]): void {
        graph.forEach((point, index) => {
            destinationArray[index].day = new Date(point.timeStamp).getDate();
            destinationArray[index][property] = point.value;
        })
    }


    private configChartArea(): void {
        this.mappedDataArray.forEach(point => {
            const maxValue = Math.max(point.factValue, point.planValue);
            const minValue = Math.min(point.factValue, point.planValue);
            if (minValue < this.sizeY.min) {
                this.sizeY.min = minValue;
            }

            if (maxValue > this.sizeY.max) {
                this.sizeY.max = maxValue;
            }
        })

        this.sizeX = {
            min: this.interval.min.getDate(),
            max: this.interval.max.getDate()
        }

    }

    private mapToAverageValues(): IBarDiagramData[] {
        let sumPlan: number = 0;
        let sumFact: number = 0;

        this.groupBy(this.mappedDataArray, 'day').forEach((point, index) => {
            sumPlan = 0;
            sumFact = 0;

            point.forEach((v) => {
                sumPlan += v.planValue;
                sumFact += v.factValue;
            });

            this.averageDataArray[index] = {
                day: point[0].day,
                factValue: sumFact / point.length,
                planValue: sumPlan / point.length
            }

        });

        this.averageDataArray = this.averageDataArray.slice(1, this.averageDataArray.length);
        return this.averageDataArray;
    }

    public groupBy(array, property) {
        return array.reduce((memo, x) => {
            if (!memo[x[property]]) {
                memo[x[property]] = [];
            }
            memo[x[property]].push(x);
            return memo;
        }, []);
    }

    private prepareData(): void {
        this.dataset = [];

        const maxPlan = Math.max(...this.averageDataArray.map((d) => d.planValue), 0);
        const maxFact = Math.max(...this.averageDataArray.map((d) => d.factValue), 0);
        const k = Math.max(maxPlan, maxFact) / this.sizeY.max + 0.1;
        const maxDay = Math.max(...this.averageDataArray.filter((d) => d.factValue !== 0).map((d) => d.day), 0);

        this.averageDataArray.map((item) => {
            /*
            if (item.factValue !== 0) {
                maxDay = item.day >= maxDay ? item.day : maxDay === 0 ? item.day : maxDay;
            }
             */
            item.planValue = Math.round(item.planValue / k);
            item.factValue = Math.round(item.factValue / k);
            if (item.planValue > this.sizeY.max) {
                item.planValue = this.sizeY.max;
            }
            // добавляем координаты по ширине col, чтобы line не привязывалась к вершинам col
            this.dataset.push({ x: item.day - 0.42, y: item.planValue + 0.3 });
            this.dataset.push({ x: item.day + 0.42, y: item.planValue + 0.3 });
        });

        this.day = maxDay;
    }

    private initScale(): void {
        this.size = {
            width: this.chart.nativeElement.clientWidth,
            height: this.chart.nativeElement.clientHeight,
        };

        this.scales.x = d3
            .scaleLinear()
            .domain([this.sizeX.min, this.sizeX.max])
            .range([this.padding.left, this.size.width - this.padding.right]);

        this.scales.y = d3
            .scaleLinear()
            .domain([this.sizeY.min, this.sizeY.max])
            .range([this.size.height - this.padding.bottom, this.padding.top]);
    }

    private initSvg(): void {
        if (this.svg) {
            this.svg.remove();
            this.svg = undefined;
        }

        this.svg = d3.select(this.chart.nativeElement).append('svg');
        this.svg
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${this.size.width} ${this.size.height}`);
    }

    private drawAxises(): void {
        // x
        this.svg
            .append('g')
            .attr('transform', `translate(0, ${this.size.height - this.padding.bottom + 7})`)
            .attr('class', 'x-axis')
            .call(d3.axisBottom(this.scales.x).tickSize(0).ticks(5))
            .call((g) => g.select('.domain').remove());

        // y
        this.svg
            .append('g')
            .attr('transform', `translate(${this.padding.left}, 0)`)
            .attr('class', 'y-axis')
            .call(d3.axisLeft(this.scales.y).tickSize(0).ticks(7))
            .call((g) => g.select('.domain').remove());
    }

    private drawGrid(): void {
        this.svg
            .append('g')
            .attr('transform', `translate(0, ${this.size.height - this.padding.bottom})`)
            .call(
                d3
                    .axisBottom(this.scales.x)
                    .ticks(this.sizeX.max)
                    .tickSize(1 - (this.size.height - this.padding.bottom - this.padding.top))
                    .tickFormat('')
            )
            .attr('class', 'grid grid-first');

        this.svg
            .append('g')
            .attr('transform', `translate(${this.padding.left}, 0)`)
            .call(
                d3
                    .axisLeft(this.scales.y)
                    .ticks(7)
                    .tickSize(1 - (this.size.width - this.padding.left - this.padding.right))
                    .tickFormat('')
            )
            .attr('class', 'grid grid-second');
    }

    private drawDayThreshold(): void {
        this.svg
            .append('line')
            .attr('class', 'line-active')
            .attr('transform', `translate(10, 0)`)
            .attr('x1', this.scales.x(this.day))
            .attr('x2', this.scales.x(this.day))
            .attr('y1', this.scales.y(this.sizeY.min))
            .attr('y2', this.scales.y(this.sizeY.max));
    }

    private appendRect(x: number, y: number, className: string): void {
        this.svg
            .append('rect')
            .attr('x', this.scales.x(x) + 6) // смещаем rect для центрирования внутри колонки
            .attr('y', this.scales.y(y))
            .attr('class', className);

        this.svg
            .append('rect')
            .attr('x', this.scales.x(x) + 6) // смещаем rect для центрирования внутри колонки
            .attr('y', this.scales.y(y - 0.5))
            .attr('class', className);
    }

    private drawEqColumns(): void {
        this.averageDataArray.forEach((item) => {
            if (item.factValue > this.sizeY.max) {
                item.factValue = this.sizeY.max;
            }
            if (item.planValue > this.sizeY.max) {
                item.planValue = this.sizeY.max;
            }
            for (let i = 1; i <= item.factValue; i++) {
                let className = '';
                if (item.factValue > item.planValue) {
                    className = i > item.planValue ? 'rect rect-orange' : 'rect rect-white';
                } else if (item.factValue < item.planValue && item.factValue !== 0) {
                    className = 'rect rect-white';
                    // вручную достраиваем разницу между fact и plan
                    for (let j = 0; j <= item.planValue - item.factValue; j++) {
                        this.appendRect(item.day, j + item.factValue, 'rect rect-orange');
                    }
                } else {
                    className = 'rect rect-normal';
                }
                this.appendRect(item.day, i, className);
            }
        });
    }

    private drawCurve(): void {
        const line = d3
            .line()
            .x((d) => this.scales.x(d.x))
            .y((d) => this.scales.y(d.y))
            .curve(d3.curveStepAfter);

        this.svg
            .append('path')
            .datum(this.dataset)
            .attr('transform', `translate(8, 0)`)
            .attr('class', 'step-line')
            .attr('d', line);
    }
}
