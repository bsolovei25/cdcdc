import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { ChannelPlatform } from "@dashboard/models/@PLATFORM/channel-platform";
import { WidgetService } from "@dashboard/services/widget.service";
import { AsyncRender } from "@shared/functions/async-render.function";
import { IAstueOnpzMainIndicatorsRaw } from "../../astue-onpz-main-indicators.interface";

import { BehaviorSubject } from "rxjs";
import * as d3 from "d3";

@Component({
    selector: 'evj-astue-onpz-main-indicators-item',
    templateUrl: './astue-onpz-main-indicators-item.component.html',
    styleUrls: ['./astue-onpz-main-indicators-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstueOnpzMainIndicatorsItemComponent extends ChannelPlatform<IAstueOnpzMainIndicatorsRaw> implements OnInit, OnDestroy {
    @ViewChild('chart') chart: ElementRef;

    public data$: BehaviorSubject<IAstueOnpzMainIndicatorsRaw> = new BehaviorSubject<IAstueOnpzMainIndicatorsRaw>(null);

    private svg: any;
    private percent: number = 0;

    constructor(
        @Inject('widgetId') public widgetId: string,
        @Inject('channelId') public channelId: string,
        protected widgetService: WidgetService,
    ) {
        super(widgetId, channelId, widgetService);
    }

    public ngOnInit(): void {
        super.ngOnInit();
        this.drawSvg();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: IAstueOnpzMainIndicatorsRaw): void {
        this.percent = ref.factValue / ref.planValue;
        this.percent = this.percent > 0 ? (this.percent > 1 ? 1 / this.percent : this.percent) : 0;

        this.data$.next(ref);
        this.drawSvg()
    }

    @AsyncRender
    private drawSvg(): void {
        const innerR = 66;
        const outerR = 70;

        if (this.svg) {
            this.svg.remove();
        }

        this.svg = d3.select(this.chart.nativeElement).append('svg').attr('width', '140px').attr('height', '140px');

        const arc = d3
            .arc()
            .innerRadius(innerR)
            .outerRadius(outerR)
            .startAngle(0)
            .endAngle(this.data$.value?.deviationValue || 0 < 0 ? 2 * Math.PI * this.percent : -2 * Math.PI * this.percent);

        const arcBg = d3
            .arc()
            .innerRadius(innerR)
            .outerRadius(outerR)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        const arcPlan = d3
            .arc()
            .innerRadius(innerR - 14)
            .outerRadius(outerR - 14)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        const g = this.svg
            .append('g')
            .attr('width', '140px')
            .attr('height', '140px')
            .style('transform', 'translate(70px, 70px)');

        g.append('path')
            .attr('d', arcBg)
            .attr('class', this.data$.value?.deviationValue !== 0 ? 'diagram-deviation' : 'diagram-value');

        g.append('path').attr('d', arc).attr('class', 'diagram-value');

        g.append('path').attr('d', arcPlan).attr('class', 'diagram-inner');
    }

}
