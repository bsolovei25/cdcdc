import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AsyncRender } from '@shared/functions/async-render.function';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import * as d3 from 'd3';

@Component({
    selector: 'evj-sou-main-indicators',
    templateUrl: './sou-main-indicators.component.html',
    styleUrls: ['./sou-main-indicators.component.scss'],
})
export class SouMainIndicatorsComponent extends WidgetPlatform<unknown> implements OnInit {
    menu: string[] = ['Месяц', 'Вклад'];
    choosenItem: number = 0;

    @ViewChild('chart') chart: ElementRef;

    public svg: any;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    @AsyncRender
    drawSvg(): void {
        const innerR = 50;
        const outerR = 42;

        if (this.svg) {
            this.svg.remove();
        }

        this.svg = d3
            .select(this.chart.nativeElement)
            .append('svg')
            .attr('width', '100px')
            .attr('height', '100px');

        const arcBg = d3
            .arc()
            .innerRadius(innerR)
            .outerRadius(outerR)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        const arc = d3
            .arc()
            .innerRadius(innerR - 2)
            .outerRadius(outerR + 2)
            .startAngle(2 * Math.PI)
            .endAngle(1.6 * Math.PI + (4 * Math.PI) / 180);

        const mainPie = d3
            .arc()
            .innerRadius(innerR - 2)
            .outerRadius(outerR + 2)
            .startAngle((4 * Math.PI) / 180)
            .endAngle(1.6 * Math.PI);

        const g: any = this.svg
            .append('g')
            .attr('width', '100px')
            .attr('height', '100px')
            .style('transform', 'translate(50px, 50px)');

        g.append('path')
            .attr('d', arcBg)
            .style('fill', 'var(--sou-mvp-color-bg-title)');

        g.append('path')
            .attr('d', mainPie)
            .style('fill', 'var(--sou-mvp-color-white)');

        g.append('path')
            .attr('d', arc)
            .style('fill', 'var(--sou-mvp-color-warning)');
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.drawSvg();
    }

    public changeMenuItem(i: number): void {
        this.choosenItem = i;
    }

    protected dataHandler(ref: any): void {}
}
