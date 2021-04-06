import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AsyncRender } from '@shared/functions/async-render.function';
import * as d3 from 'd3';
import { CONTENT_DATA } from '../kpe-universal-card/mock';
import { IKpeUniversalCardMonthData } from '../kpe-universal-card/kpe-universal-card.component';
import { IKpeGaugeChartPage } from "../../key-performance-indicators/components/gauge-diagram/gauge-diagram.component";

@Component({
    selector: 'evj-kpe-performance-indicator-item',
    templateUrl: './kpe-performance-indicator-item.component.html',
    styleUrls: ['./kpe-performance-indicator-item.component.scss'],
})
export class KpePerformanceIndicatorItemComponent implements OnInit, OnChanges {
    @ViewChild('chart', { static: true }) chart: ElementRef;
    @ViewChild('container', { static: true }) container: ElementRef;

    @Input() data: IKpeGaugeChartPage;

    public svg: any;
    public size: number = 0;
    public arcDash: number;
    private currentMonth: IKpeUniversalCardMonthData[];

    constructor() {}

    @AsyncRender
    private drawSvg(): void {
        this.size = Math.min(this.container.nativeElement.offsetHeight, this.container.nativeElement.offsetWidth) - 60;

        const outerR = this.size / 2 - 15;
        const innerR = outerR - 4;

        if (this.svg) {
            this.svg.remove();
        }

        this.svg = d3
            .select(this.chart.nativeElement)
            .append('svg')
            .attr('width', `${this.size}px`)
            .attr('height', `${this.size}px`);

        const arc = (start, end) => {
            return d3.arc().innerRadius(innerR).outerRadius(outerR).startAngle(start).endAngle(end);
        };

        const g: any = this.svg
            .append('g')
            .attr('width', `${this.size}px`)
            .attr('height', `${this.size}px`)
            .style('transform', `translate(${this.size / 2}px, ${this.size / 2}px)`);

        const dashDev: number = Math.PI / 180;

        this.currentMonth.forEach((item, i) => {
            g.append('path')
                .attr('d', arc(i * this.arcDash, (i + 1) * this.arcDash - dashDev))
                .style('fill', `var(--color-kpe-universal-card-month-${item.status})`);
        });
    }

    ngOnChanges(): void {
        this.fillDayStatuses();
        this.drawSvg();
    }

    ngOnInit(): void {
        // Массив размер которого равен колличесвту дней в месяце
        this.daysInMonth();

        // Проставляем дефолтные значения для каждого дня
        for (let i = 0; i < this.currentMonth.length; i++) {
            this.currentMonth[i] = {
                day: i + 1,
                status: 'default',
            };
        }
        this.fillDayStatuses();
        this.drawSvg();
    }

    public getExtremumValue(flag: 'min' | 'max'): number {
        if (!this.data) { return 0; }
        if (flag === 'min') {
            return d3.min(this.data?.bounds.slice(1));
        }
        if (flag === 'max') {
            return d3.max(this.data?.bounds.slice(1, -1));
        }
    }

    private fillDayStatuses(): void {
        this.currentMonth?.forEach((item, i) => {
            const newItem = this.data?.dailyStatus?.find((date) => date.day === item.day);
            if (newItem) {
                this.currentMonth[i] = newItem;
            }
        });
    }

    private daysInMonth(): void {
        const currentDate: Date = new Date();
        const daysCount = 32 - new Date(currentDate.getFullYear(), currentDate.getMonth(), 32).getDate();

        this.arcDash = (2 * Math.PI) / daysCount;
        this.currentMonth = new Array(daysCount);
    }
}
