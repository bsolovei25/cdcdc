import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { ITypeProduct } from '../../product-groups.component';
import { SpaceNumber } from '@shared/pipes/number_space.pipe';

@Component({
    selector: 'evj-product-groups-middle',
    templateUrl: './product-groups-middle.component.html',
    styleUrls: ['./product-groups-middle.component.scss']
})
export class ProductGroupsMiddleComponent implements OnInit, AfterViewInit {
    @ViewChild('circle', { static: true }) circle: ElementRef;
    @Input() data: ITypeProduct;

    gaugemap: any = {};

    public readonly RADIUS: number = 36.5; /// PieCircle Radius
    public defaultPercent: number = 100;

    public criticalValue: number = 64; /// временные константы
    public criticalPie: number = 18; /// временные константы
    public indicator: number;

    public svg;
    public r: number;
    public arc;
    public tickData;
    public pointerHeadLength: number;
    public pointer;
    public scale;
    public range;
    public ticks;


    /// CONFIG GAUGE(!!!)
    public config = {
        size: 190,
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

        majorTicks: 30, /// CHANGE VALUE PIE GAUGE  (!!!! меняем значение в зависимости количества дней в месяце)
        labelFormat: d3.format('d'),
        labelInset: 10,

        arcColorFn: d3.interpolateHslLong(d3.rgb('red'), d3.rgb('blue')),
    };

    public pointId: any;
    public piePointNumber: number;

    constructor(private spacePipe: SpaceNumber) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.indicator = this.indicatorGauge(this.data.gaugePercent);
        this.draw(this.data, this.circle.nativeElement, this.gaugemap, this.indicator);
        this.d3Circle(this.data, this.circle.nativeElement);
    }

    // CirclePie RENDERING

    public d3Circle(data, el): void {
        const summ = this.defaultPercent - data.piePercent;
        const mass = [data.piePercent, summ];
        let color: any;

        if (summ === 0) {
            color = d3.scaleOrdinal().range(['var(--color-oil-circle-disable)']);
        } else if (data.pieStatus === 'warning') {
            color = d3.scaleOrdinal().range(['var(--color-oil-danger)', 'var(--color-oil-circle-disable)']);
        } else if (data.pieStatus === 'normal') {
            color = d3.scaleOrdinal().range(['var(--color-text-main)', 'var(--color-oil-circle-disable)']);
        }

        const svg = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('viewBox', '0 0 100 100');

        const group = svg.append('g').attr('transform', 'translate(52 ,52)');

        const arc = d3
            .arc()
            .innerRadius(35)
            .outerRadius(this.RADIUS);

        const pie = d3
            .pie()
            .value((d) => {
                return d;
            })
            .sort(() => null);

        const arcs = group
            .selectAll('.arc')
            .data(pie(mass))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', (d) => color(d.index));

        const textBlock = svg
            .append('foreignObject')
            .attr('height', 62)
            .attr('width', 62)
            .attr('x', 20)
            .attr('y', 20);

        const div = svg
            .select('foreignObject')
            .append('xhtml:div')
            .attr('style', () => {
                if (data.title.length > 6) {
                    return 'font-size: 11px; height: 100%;width: 100%; display: flex;align-items: center; justify-content: center; text-align: center;'
                } else {
                    return 'font-size: 14px; height: 100%;width: 100%; display: flex;align-items: center; justify-content: center;'
                }
            })
            .html(data.title);

        // const title = svg
        //     .append('text')
        //     .attr('text-anchor', 'middle')
        //     .attr('font-size', '16px')
        //     .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
        //     .attr('y', '56')
        //     .attr('x', '52')
        //     .attr('dx', 10)
        //     .attr('dy', 20)
        //     .attr('fill', 'var(--color-text-main')
        //     .text(data.title);

        const leftTopButton = svg
            .append('image')
            .attr(
                'xlink:href',
                () => {
                    if (data.productFiling === 'critical') {

                    } else if (data.productFiling === 'warning') {

                    } else {
                        return 'assets/icons/widgets/SMP/product-group-planning/middle-side/middle-left-top-button.svg'
                    }
                }

            )
            .attr('height', '25px')
            .attr('width', '32px')
            .attr('x', '-60')
            .attr('y', '28');

        const leftButtonButton = svg
            .append('image')
            .attr(
                'xlink:href',
                () => {
                    if (data.productUpdate === 'critical') {

                    } else if (data.productUpdate === 'warning') {

                    } else {
                        return 'assets/icons/widgets/SMP/product-group-planning/middle-side/middle-left-bottom-button.svg'
                    }
                }

            )
            .attr('height', '25px')
            .attr('width', '32px')
            .attr('x', '-60')
            .attr('y', '57');

        const leftButton = svg
            .append('image')
            .attr(
                'xlink:href',
                () => {
                    if (data.productCrowded === 'critical') {

                    } else if (data.productCrowded === 'warning') {

                    } else {
                        return 'assets/icons/widgets/SMP/product-group-planning/middle-side/middle-left-big-button.svg'
                    }
                }

            )
            .attr('height', '60px')
            .attr('width', '32px')
            .attr('x', '-28')
            .attr('y', '25');



        const rightTopButton = svg
            .append('image')
            .attr(
                'xlink:href',
                () => {
                    if (data.productFlask === 'critical') {

                    } else if (data.productFlask === 'warning') {

                    } else {
                        return 'assets/icons/widgets/SMP/product-group-planning/middle-side/middle-right-top-button.svg'
                    }
                }

            )
            .attr('height', '25px')
            .attr('width', '32px')
            .attr('x', '130')
            .attr('y', '28');

        const rightButtonButton = svg
            .append('image')
            .attr(
                'xlink:href',
                () => {
                    if (data.productList === 'critical') {

                    } else if (data.productList === 'warning') {

                    } else {
                        return 'assets/icons/widgets/SMP/product-group-planning/middle-side/middle-right-bottom-button.svg'
                    }
                }

            )
            .attr('height', '25px')
            .attr('width', '32px')
            .attr('x', '130')
            .attr('y', '57');

        const rightButton = svg
            .append('image')
            .attr(
                'xlink:href',
                () => {
                    if (data.productBuild === 'critical') {

                    } else if (data.productBuild === 'warning') {

                    } else {
                        return 'assets/icons/widgets/SMP/product-group-planning/middle-side/middle-right-big-button.svg'
                    }
                }

            )
            .attr('height', '60px')
            .attr('width', '32px')
            .attr('x', '98')
            .attr('y', '25');

    }

    // GAUGE RENDERING

    indicatorGauge(valuePercent: number): number {
        const percent = valuePercent > 100 ? 100 : valuePercent < 0 ? 0 : valuePercent;
        return (this.config.majorTicks * percent) / 100;
    }

    draw(data, el, gaugemap, indicator): void {
        this.config.majorTicks = this.data.days.length;
        this.gauge({
            size: 295,
            clipWidth: 300,
            clipHeight: 300,
            ringWidth: 60,
            maxValue: 25,
            transitionMs: 4000,
        }, gaugemap);
        this.render(el, indicator, this.criticalPie, data);
    }

    gauge(configuration, gaugemap): void {
        gaugemap.configure = this.configure;

        gaugemap.isRendered = this.isRendered(this.svg);

        gaugemap.render = this.render;

        gaugemap.update = this.update;

        this.configure(configuration);
        return gaugemap;
    }

    deg2rad(deg: number): number {
        return (deg * Math.PI) / 180;
    }

    centerTranslation(r: number): string {
        return 'translate(' + r + ',' + r + ')';
    }

    isRendered(svg): boolean {
        return svg !== undefined;
    }

    render(container, newValue, criticalPie, data): void {
        this.svg = d3
            .select(container)
            .append('svg:svg')
            .attr('class', 'gauge')
            .attr('viewBox', '0 0 290 290');

        const centerTx = this.centerTranslation(this.r + 2);

        const arcs = this.svg
            .append('g')
            .attr('class', 'arc')
            .attr('id', 'test')
            .attr('transform', centerTx);

        const reverseData = [].concat(data.days).reverse();
        const pointPie = reverseData.find(e => e.state !== 'disabled').day;

        this.pointId = arcs.selectAll('path')
            .data(this.tickData)
            .enter()
            .append('path')
            .attr('stroke', 'var(--color-bg-main)')
            .attr('stroke-width', '4px')
            .attr('id', (d, i) => {
                if (i === (pointPie - 1)) {
                    this.piePointNumber = i;
                    return 'point';
                }
            })
            .attr('fill', (d, i) => {
                const status = this.data.days.find(e => e.day - 1 === i).state;
                if (status === 'normal') {
                    return 'var(--color-active)';
                } else if (status === 'warning') {
                    return 'var(--color-warning)';
                } else if (status === 'danger') {
                    return 'var(--color-danger)';
                } else {
                    return 'var(--color-smp-blue)';
                }
            })
            .attr('d', this.arc);

        const pointid = this.pointId?.nodes()?.find(el => el?.id === 'point');
        let pointidLength: number;
        let coordsPoint;
        if (pointid) {
            pointidLength = pointid.getTotalLength();
            coordsPoint = pointid.getPointAtLength(pointidLength);

        }

        const aroundGauge = this.svg
            .append('image')
            .attr('xlink:href', '/assets/icons/widgets/SMP/circle-back.svg')
            .attr('height', '100%')
            .attr('width', '100%')
            .attr('x', '5')
            .attr('y', '5');

        if (coordsPoint) {
            let defaultX = coordsPoint.x + 146;
            let defaultY = coordsPoint.y + 151;
            if (this.piePointNumber > 12 && this.piePointNumber < 18) {
                defaultY = defaultY - 5;
            } else if (this.piePointNumber > 17 && this.piePointNumber < 25) {
                defaultY = defaultY - 22;
                defaultX = coordsPoint.x + 131 + 5 * (8 - (25 - this.piePointNumber));
            } else if (this.piePointNumber > 24 && this.piePointNumber <= 30) {
                defaultY = defaultY - 5 * (29 - this.piePointNumber);
                defaultX = defaultX + 4 * (8 - (29 - this.piePointNumber));
            }
            const point = this.svg
                .append('circle')
                .attr('cx', defaultX)
                .attr('cy', defaultY)
                .attr('r', '5px')
                .attr('fill', 'var(--color-text-main');
        }
    }

    update(newValue, newConfiguration?): void {
        if (newConfiguration !== undefined) {
            this.configure(newConfiguration);
        }
        const ratio = this.scale(newValue);
        const newAngle = this.config.minAngle + ratio * this.range;
        this.pointer
            .transition()
            .duration(this.config.transitionMs)
            .ease(d3.easeElastic)
            .attr('transform', 'rotate(' + newAngle + ')');
    }

    configure(configuration): void {
        let prop;
        for (prop in configuration) {
            this.config[prop] = configuration[prop];
        }

        this.range = this.config.maxAngle - this.config.minAngle;
        this.r = this.config.size / 2;
        this.pointerHeadLength = Math.round(this.r * this.config.pointerHeadLengthPercent);

        // a linear scale this.gaugemap maps domain values to a percent from 0..1
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

}
