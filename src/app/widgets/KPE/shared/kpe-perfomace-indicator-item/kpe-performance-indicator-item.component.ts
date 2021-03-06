import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { AsyncRender } from '@shared/functions/async-render.function';
import * as d3 from 'd3';
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

    @Input()
    public data: IKpeGaugeChartPage;
    public internalData: IKpeGaugeChartPage | null = null;

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
        this.prepareData();
        this.fillDayStatuses();
        this.drawSvg();
    }

    ngOnInit(): void {
        // ???????????? ???????????? ???????????????? ?????????? ?????????????????????? ???????? ?? ????????????
        this.daysInMonth();

        // ?????????????????????? ?????????????????? ???????????????? ?????? ?????????????? ??????
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
        const values = this.data.bounds?.slice(1, -1);
        if (flag === 'min') {
            return this.data.zeroOn === 'Right' ? d3.max(values) : d3.min(values);
        }
        if (flag === 'max') {
            return this.data.zeroOn === 'Right' ? d3.min(values) : d3.max(values);
        }
    }

    private prepareData(): void {
        if (!this.data) { return; }
        this.internalData = {...this.data};
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
