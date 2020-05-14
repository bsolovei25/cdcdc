import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { SpaceNumber } from '@shared/pipes/number_space.pipe';
import { IProducts } from '../../product-groups.component';

@Component({
    selector: 'evj-product-groups-right',
    templateUrl: './product-groups-right.component.html',
    styleUrls: ['./product-groups-right.component.scss']
})
export class ProductGroupsRightComponent implements OnInit {

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

    @Input() public data: IProducts;

    @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

    constructor(private spacePipe: SpaceNumber) { }

    ngOnInit(): void {
        this.d3Block(this.data, this.myCircle.nativeElement);
    }

    public d3Block(data, el): void {
        let color: any;

        if (data.groupDeviationShipPerformance === 0) {
            color = d3.scaleOrdinal().range(['var(--color-text-sub-heading)']);
        } else if (data.groupDeviationShipPerformance === 100) {
            color = d3.scaleOrdinal().range(['white']);
        } else {
            color = d3.scaleOrdinal().range(['orange', '#1b1e27']);
        }

        const canvas = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('width', '100%')
            .attr('viewBox', '0 -24 150 115');

        this.d3Circle(data, canvas);
    }

    d3Circle(data, el): void {
        const newValue: string = this.spacePipe.transform(data.groupDeviationShip);
        const deviationValue = this.spacePipe.transform(data.groupDeviationValue);
        const deviationNotValue = this.spacePipe.transform(data.groupDeviationNotValue);

        const x = -60;
        const y = 30;

        const indicatorRightPie = this.indicatorGauge(data.groupDeviationShipPerformance);

        this.d3Grauge(el, this.gaugemap, indicatorRightPie, x, y);

        // const background = el
        //     .append('image')
        //     .attr(
        //         'xlink:href',
        //         'assets/icons/widgets/SMP/product-group-planning/background_right_circle.svg'
        //     )
        //     .attr('height', '110px')
        //     .attr('width', '110px')
        //     .attr('x', '-113')
        //     .attr('y', '-25');

        const topLabel = el
            .append('text')
            .attr('fill', 'white')
            .attr('font-size', '15px')
            .attr('x', '30')
            .attr('y', '20')
            .attr('text-anchor', 'left')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .text('Оформлено');

        const bottomLabel = el
            .append('text')
            .attr('fill', 'white')
            .attr('font-size', '15px')
            .attr('x', '30')
            .attr('y', '40')
            .attr('text-anchor', 'left')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .text('Не оформлено');

        const value = el
            .append('text')
            .attr('fill', 'white')
            .attr('font-size', '15px')
            .attr('x', '-59')
            .attr('y', '33')
            .attr('text-anchor', 'middle')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .text(newValue);

        const valueName = el
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/right-side/pie-icon.svg')
            .attr('height', '20px')
            .attr('width', '20px')
            .attr('x', '-67')
            .attr('y', '43');

        const topBorder = el
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/right-side/right-top-border.svg')
            .attr('height', '40px')
            .attr('width', '140px')
            .attr('x', '140')
            .attr('y', '-13');

        const bottomBorder = el
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/right-side/right-bottom-border.svg')
            .attr('height', '40px')
            .attr('width', '140px')
            .attr('x', '140')
            .attr('y', '28');

        const groupDeviationValue = el
            .append('text')
            .attr('fill', 'white')
            .attr('font-size', '15px')
            .attr('x', '210')
            .attr('y', '12')
            .attr('text-anchor', 'middle')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .text(deviationValue);

        const groupDeviationNotValue = el
            .append('text')
            .attr('fill', 'white')
            .attr('font-size', '15px')
            .attr('x', '210')
            .attr('y', '54')
            .attr('text-anchor', 'middle')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .text(deviationNotValue);
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
        this.gauge(el, {
            size: 100,
            clipWidth: 300,
            clipHeight: 300,
            ringWidth: 58,
            maxValue: 80,
            transitionMs: 4000,
        }, gaugemap);

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
