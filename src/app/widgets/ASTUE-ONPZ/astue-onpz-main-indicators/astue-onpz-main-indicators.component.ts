import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import * as d3 from 'd3';
import { AsyncRender } from '@shared/functions/async-render.function';
import {
    AstueOnpzConventionalFuelService,
    IAstueOnpzConventionalFuelSelectOptions,
} from '../astue-onpz-conventional-fuel/astue-onpz-conventional-fuel.service';

interface IAstueOnpzMainIndicatorsRaw {
    deviationName: string;
    deviationValue: number;
    factName: string;
    factValue: number;
    nextPlanName: string;
    nextPlanValue?: number;
    planName: string;
    planValue: number;
    unitId?: number;
    engUnits: string;
}

@Component({
    selector: 'evj-astue-onpz-main-indicators',
    templateUrl: './astue-onpz-main-indicators.component.html',
    styleUrls: ['./astue-onpz-main-indicators.component.scss'],
})
export class AstueOnpzMainIndicatorsComponent extends WidgetPlatform<unknown>
    implements OnInit, OnDestroy {
    @ViewChild('chart') chart: ElementRef;
    public data: IAstueOnpzMainIndicatorsRaw;
    public percent: number = 0;

    public svg: any;

    constructor(
        private conventionalFuelService: AstueOnpzConventionalFuelService,
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    @AsyncRender
    drawSvg(): void {
        const innerR = 66;
        const outerR = 70;

        if (this.svg) {
            this.svg.remove();
        }

        this.svg = d3
            .select(this.chart.nativeElement)
            .append('svg')
            .attr('width', '140px')
            .attr('height', '140px');

        const arc = d3
            .arc()
            .innerRadius(innerR)
            .outerRadius(outerR)
            .startAngle(0)
            .endAngle(2 * Math.PI * this.percent);

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
            .attr('class', (this.data?.factValue - this.data?.planValue) < 0 ? 'diagram-deviation' : 'diagram-inner');

        g.append('path')
            .attr('d', arc)
            .attr('class', 'diagram-value');

        g.append('path')
            .attr('d', arcPlan)
            .attr('class', 'diagram-inner');
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.drawSvg();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.conventionalFuelService.selectedOptions?.subscribe((ref) => {
                this.optionsHandler(ref).then();
            })
        );
    }

    protected dataHandler(ref: IAstueOnpzMainIndicatorsRaw): void {
        this.data = ref;

        this.percent = this.data.factValue / this.data.planValue;
        this.percent = this.percent > 0 ? (this.percent > 1 ? 1 / this.percent : this.percent) : 0;

        if (this.data.factValue < this.data.planValue) {
            this.data.deviationValue = -this.data.deviationValue;
        }
        this.drawSvg();
    }

    private async optionsHandler(options: IAstueOnpzConventionalFuelSelectOptions): Promise<void> {
        const channels = await this.widgetService.getAvailableChannels<{
            name: string;
            id: string;
        }>(this.widgetId);
        const subchannelId = channels.find((x) => x.name === options.fuel).id;
        this.setWsOptions({ subchannelId });
    }
}
