import { Component, OnInit, ElementRef, Input, ViewChild, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import { SpaceNumber } from '@shared/pipes/number-space.pipe';
import { IProductGroups } from '../../../../../dashboard/models/SMP/product-groups.model';

@Component({
    selector: 'evj-product-groups-right',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './product-groups-right.component.html',
    styleUrls: ['./product-groups-right.component.scss'],
})
export class ProductGroupsRightComponent implements OnInit, OnChanges {
    public readonly RADIUS = 28;

    public pie = 60;

    gaugemap: any = {};

    public config = {
        size: 210,
        clipWidth: 200,
        clipHeight: 110,
        ringInset: 20,
        ringWidth: 10,

        pointerWidth: 10,
        pointerTailLength: 5,
        pointerHeadLengthPercent: 0.9,

        minValue: 0,
        maxValue: 60,

        minAngle: 0,
        maxAngle: 360,

        transitionMs: 750,

        majorTicks: 60,
        labelFormat: d3.format('d'),
        labelInset: 10,

        arcColorFn: d3.interpolateHslLong(d3.rgb('red'), d3.rgb('blue')),
    };
    public range;
    public r;
    public pointerHeadLength;
    public arc;
    public scale;
    public ticks;
    public tickData;
    public svg;

    public svgBlock: any;

    public progressWidth: number = 185;

    @Input() public data: IProductGroups;

    @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

    constructor(private spacePipe: SpaceNumber) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.svgBlock) {
            this.svgBlock.remove();
        }
        this.d3Block(this.data, this.myCircle.nativeElement);
    }

    public d3Block(data: IProductGroups, el): void {
        let color: any;
        const performance = data.shipPlanPercent;

        if (performance === 0) {
            color = d3.scaleOrdinal().range(['var(--color-text-sub-heading)']);
        } else if (performance === 100) {
            color = d3.scaleOrdinal().range(['white']);
        } else {
            color = d3.scaleOrdinal().range(['orange', '#1b1e27']);
        }

        this.svgBlock = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('width', '100%')
            .attr('viewBox', '0 -24 150 115');

        this.d3Circle(data, this.svgBlock);

        const innerGauge = d3
            .arc()
            .innerRadius(36)
            .outerRadius(38)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        this.svgBlock
            .append('g')
            .append('path')
            .attr('d', innerGauge)
            .attr('transform', 'translate(-80, 30)')
            .attr('fill', 'var(--color-smp-days-unknown)');

        const gaugeProgress = d3
            .arc()
            .innerRadius(36)
            .outerRadius(38)
            .startAngle(0)
            .endAngle((performance * 2 * Math.PI) / 100);

        this.svgBlock
            .append('g')
            .append('path')
            .attr('d', gaugeProgress)
            .attr('transform', 'translate(-80, 30)')
            .attr('fill', 'var(--color-smp-left-gauge)');
    }

    d3Circle(data: IProductGroups, el): void {
        const newValue: string = this.spacePipe.transform(data.shipAll);
        const deviationValue = this.spacePipe.transform(data.shipOf);
        const deviationNotValue = this.spacePipe.transform(data.shipOf);

        const x = -80;
        const y = 30;

        const indicatorRightPie = this.indicatorGauge(data.shipPlanPercent);

        this.d3Grauge(el, this.gaugemap, indicatorRightPie, x, y);

        const topLabel = el
            .append('text')
            .attr('fill', 'var(--color-text-main)')
            .attr('font-size', '18px')
            .attr('x', '-15')
            .attr('y', '16')
            .attr('text-anchor', 'left')
            .attr('font-family', 'Tahoma, Geneva, Verdana, sans-serif;')
            .text('Оформлено');

        const bottomLabel = el
            .append('text')
            .attr('fill', 'var(--color-text-main)')
            .attr('font-size', '18px')
            .attr('x', '-15')
            .attr('y', '55')
            .attr('text-anchor', 'left')
            .attr('font-family', 'Tahoma, Geneva, Verdana, sans-serif;')
            .text('Не оформлено');

        const value = el
            .append('text')
            .attr('fill', 'var(--color-text-main)')
            .attr('font-size', '19px')
            .attr('x', '-79')
            .attr('y', '33')
            .attr('text-anchor', 'middle')
            .attr('font-family', 'Tahoma, Geneva, Verdana, sans-serif;')
            .text(newValue);

        const valueName = el
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/right-side/pie-icon.svg')
            .attr('height', '20px')
            .attr('width', '20px')
            .attr('x', '-87')
            .attr('y', '43');

        const topBorder = el
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/right-side/right-top-border.svg')
            .attr('height', '40px')
            .attr('width', '140px')
            .attr('x', '180')
            .attr('y', '-6');

        const bottomBorder = el
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/right-side/right-bottom-border.svg')
            .attr('height', '40px')
            .attr('width', '140px')
            .attr('x', '180')
            .attr('y', '35');

        const groupDeviationValue = el
            .append('text')
            .attr('fill', 'var(--color-text-main)')
            .attr('font-size', '19px')
            .attr('x', '230')
            .attr('y', '20')
            .attr('text-anchor', 'middle')
            .attr('font-family', 'Tahoma, Geneva, Verdana, sans-serif;')
            .text(deviationValue);

        const groupDeviationNotValue = el
            .append('text')
            .attr('fill', 'var(--color-text-main)')
            .attr('font-size', '19px')
            .attr('x', '230')
            .attr('y', '63')
            .attr('text-anchor', 'middle')
            .attr('font-family', 'Tahoma, Geneva, Verdana, sans-serif;')
            .text(deviationNotValue);

        const procentPrgoress1 = data.shipPlanPercent < 0 ? 0 : data.shipPlanPercent < 100 ? data.shipPlanPercent : 100;
        const procentPrgoress2 = data.passPlanPercent < 0 ? 0 : data.passPlanPercent < 100 ? data.passPlanPercent : 100;

        const progressLine1 = el
            .append('rect')
            .attr('class', 'bg-rect')
            .attr('fill', 'var(--color-standard)')
            .attr('fill-opacity', '0.5')
            .attr('height', 3)
            .attr('width', this.progressWidth)
            .attr('x', -15)
            .attr('y', 20);

        const progress1 = el
            .append('rect')
            .attr('class', 'progress-rect')
            .attr('fill', 'var(--color-standard)')
            .attr('height', 3)
            .attr('width', 0)
            .attr('x', -15)
            .attr('y', 20);

        progress1
            .transition()
            .duration(1000)
            .attr('width', () => {
                return (this.progressWidth * procentPrgoress1) / 100;
            });

        const progressLine2 = el
            .append('rect')
            .attr('class', 'bg-rect')
            .attr('fill', 'var(--color-standard)')
            .attr('fill-opacity', '0.5')
            .attr('height', 3)
            .attr('width', this.progressWidth)
            .attr('x', -15)
            .attr('y', 60);

        const progress2 = el
            .append('rect')
            .attr('class', 'progress-rect')
            .attr('fill', 'var(--color-standard)')
            .attr('height', 3)
            .attr('width', 0)
            .attr('x', -15)
            .attr('y', 60);

        progress2
            .transition()
            .duration(1000)
            .attr('width', () => {
                return (this.progressWidth * procentPrgoress2) / 100;
            });
    }

    isInteger(num): boolean {
        return (num ^ 0) === num;
    }

    indicatorGauge(data): number {
        let percent = data > 100 ? 100 : data < 0 ? 0 : data;
        return (this.pie * percent) / 100;
    }

    deg2rad(deg: number): number {
        return (deg * Math.PI) / 180;
    }

    centerTranslation(x: number, y: number): string {
        return 'translate(' + x + ',' + y + ')';
    }

    d3Grauge(el, gaugemap, indicator, x, y): void {
        this.gauge(
            el,
            {
                size: 104,
                clipWidth: 300,
                clipHeight: 300,
                ringWidth: 58,
                maxValue: 80,
                transitionMs: 4000,
            },
            gaugemap
        );

        this.render(indicator, this.pie, x, y);
    }

    gauge(el, configuration, gaugemap): any {
        this.svg = el;
        gaugemap.configure = this.configure;

        gaugemap.isRendered = this.isRendered();

        gaugemap.render = this.render;

        gaugemap.update = this.update;

        this.configure(configuration);
        return gaugemap;
    }

    configure(configuration): any {
        for (const prop in configuration) {
            this.config[prop] = configuration[prop];
        }

        this.range = this.config.maxAngle - this.config.minAngle;
        this.r = this.config.size / 1.5;
        this.pointerHeadLength = Math.round(this.r * this.config.pointerHeadLengthPercent);

        this.scale = d3
            .scaleLinear()
            .range([0, 1])
            .domain([this.config.minValue, this.config.maxValue]);

        this.ticks = this.scale.ticks(this.config.majorTicks);
        this.tickData = d3.range(this.config.majorTicks).map(() => {
            return 1 / this.config.majorTicks;
        });

        this.arc = d3
            .arc()
            .innerRadius(this.r + 50 - this.config.ringWidth - this.config.ringInset)
            .outerRadius(this.r - this.config.ringInset)
            .startAngle((d, i) => {
                const ratio = d * i;
                return this.deg2rad(this.config.minAngle + ratio * this.range);
            })
            .endAngle((d, i) => {
                const ratio = d * (i + 1);
                return this.deg2rad(this.config.minAngle + ratio * this.range);
            });
    }

    isRendered(): boolean {
        return this.svg !== undefined;
    }

    render(indicator, pie, x, y): void {
        const centerTx = this.centerTranslation(x, y);

        const arcs = this.svg
            .append('g')
            .attr('class', 'arc')
            .attr('transform', centerTx);

        arcs.selectAll('path')
            .data(this.tickData)
            .enter()
            .append('path')
            .attr('stroke', 'var(--color-bg-main)')
            .attr('fill', (d, i) => {
                if (indicator === pie) {
                    return 'white';
                } else if (i + 1 <= indicator) {
                    return 'var(--color-active)';
                } else if (i + 1 > indicator && i + 1 <= pie) {
                    return '#272a38';
                }
            })
            .attr('d', this.arc);

        this.update(indicator === undefined ? 0 : indicator);
    }

    update(newValue, newConfiguration?): void {
        if (newConfiguration !== undefined) {
            this.configure(newConfiguration);
        }
        const ratio = this.scale(newValue);
        const newAngle = this.config.minAngle + ratio * this.range;
    }
}
