import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SolidGaugeWithMarkerItem } from 'src/app/dashboard/models/LCO/solid-gauge-with-marker';

declare var d3: any;

@Component({
    selector: 'evj-solid-gauge-with-marker',
    templateUrl: './solid-gauge-with-marker.component.html',
    styleUrls: ['./solid-gauge-with-marker.component.scss'],
})
export class SolidGaugeWithMarkerComponent implements AfterViewInit {
    @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

    @Input() public data: SolidGaugeWithMarkerItem;

    gaugemap: any = {};

    constructor() { }

    public criticalValue: number = 64;
    public criticalPie: number = 16;
    public indicator: number;
    public pie: number = 25;

    public svg;
    public r;
    public arc;
    public tickData;
    public pointerHeadLength;
    public pointer;
    public scale;
    public range;
    public ticks;

    public config = {
        size: 710,
        clipWidth: 200,
        clipHeight: 110,
        ringInset: 20,
        ringWidth: 20,

        pointerWidth: 10,
        pointerTailLength: 5,
        pointerHeadLengthPercent: 0.9,

        minValue: 0,
        maxValue: 25,

        minAngle: -120,
        maxAngle: 120,

        transitionMs: 750,

        majorTicks: 25,
        labelFormat: d3.format('d'),
        labelInset: 10,

        arcColorFn: d3.interpolateHsl(d3.rgb('#e8e2ca'), d3.rgb('#3e6c0a')),
    };

    ngAfterViewInit(): void {
        this.dataHandler();
        this.indicator = this.indicatorGauge(this.data);
        this.draw(this.data, this.myCircle.nativeElement, this.gaugemap, this.indicator);
    }

    dataHandler(): void {
        this.data.percent *= this.criticalPie / this.config.maxValue;
    }

    indicatorGauge(data): number {
        const percent = data.percent > 100 ? 100 : data.percent < 0 ? 0 : data.percent;
        return (this.pie * percent) / 100;
    }

    draw(data, el, gaugemap, indicator): void {
        this.gauge({
            size: 300,
            clipWidth: 300,
            clipHeight: 300,
            ringWidth: 60,
            maxValue: 25,
            transitionMs: 4000,
        }, gaugemap);
        this.render(el, indicator, this.criticalPie, this.pie, data);
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

    render(container, newValue, criticalPie, pie, data): void {
        this.svg = d3
            .select(container)
            .append('svg:svg')
            .attr('class', 'gauge')
            .attr('viewBox', '-10 -30 320 290');

        const centerTx = this.centerTranslation(this.r);

        const arcs = this.svg
            .append('g')
            .attr('class', 'arc')
            .attr('transform', centerTx);

        if (newValue < criticalPie) {
            arcs.selectAll('path')
                .data(this.tickData)
                .enter()
                .append('path')
                .attr('stroke', 'black')
                .attr('fill', (d, i) => {
                    if (i + 1 > criticalPie) {
                        return 'rgba(244,163,33, 0.5)';
                    } else if (i + 1 <= newValue + 1 && newValue !== 0) {
                        return 'rgb(158, 215, 245)';
                    } else if (i + 1 >= newValue && i + 1 <= criticalPie) {
                        return 'rgba(158, 215, 245, 0.5)';
                    }
                })
                .attr('d', this.arc);
        } else {
            arcs.selectAll('path')
                .data(this.tickData)
                .enter()
                .append('path')
                .attr('stroke', 'black')
                .attr('fill', (d, i) => {
                    if (i + 1 <= newValue + 1 && i + 1 > criticalPie) {
                        return 'orange';
                    } else if (i + 1 <= criticalPie) {
                        return 'white';
                    } else if (i + 1 >= newValue && i + 1 <= pie) {
                        return 'rgba(244,163,33, 0.5)';
                    }
                })
                .attr('d', this.arc);
        }

        const aroundGauge = this.svg
            .append('image')
            .attr('xlink:href', 'assets/pic/SolidGauge/aroundGauge.svg')
            .attr('height', '420px')
            .attr('width', '410px')
            .attr('x', '-55')
            .attr('y', '-105');

        const lineData = [
            [this.config.pointerWidth / 2, 0],
            [0, -this.pointerHeadLength + 20],
            [-(this.config.pointerWidth / 2), 0],
            [0, this.config.pointerTailLength],
            [this.config.pointerWidth / 4, 0],
        ];
        const pointerLine = d3.line().curve(d3.curveLinear);
        const pg = this.svg
            .append('g')
            .data([lineData])
            .attr('class', 'pointer')
            .attr('transform', centerTx);

        this.pointer = pg
            .append('path')
            .attr('fill', newValue < criticalPie ? 'white' : 'orange')
            .attr('d', pointerLine /*function(d) { return pointerLine(d) +'Z';}*/)
            .attr('transform', 'rotate(' + this.config.minAngle + ')');


        this.update(newValue === undefined ? 0 : newValue);

        const circleInGauge = this.svg
            .append('circle')
            .attr('cx', '150')
            .attr('cy', '150')
            .attr('r', '45px')
            .attr('fill', 'rgb(33,36,45)');

        const valueGauge = this.svg
            .append('text')
            .attr('fill', newValue < criticalPie ? 'white' : 'orange')
            .attr('font-size', '23px')
            .attr('x', '148')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('y', '160')
            .attr('text-anchor', 'middle')
            .text(data.fact < 0 ? 0 : data.fact);

        const bottomTextGauge = this.svg
            .append('text')
            .attr('fill', '#8C99B2')
            .attr('font-size', '12px')
            .attr('x', '150')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('y', '215')
            .attr('text-anchor', 'middle')
            .text(data.name);

        const lineGauge = this.svg
            .append('image')
            .attr('xlink:href', 'assets/pic/SolidGauge/lineGauge.svg')
            .attr('height', '120px')
            .attr('width', '110px')
            .attr('x', '199.4')
            .attr('y', '-14');

        const lineCriticalGauge = this.svg
            .append('text')
            .attr('fill', 'rgb(158, 215, 245)')
            .attr('font-size', '12px')
            .attr('x', '270')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('y', '25')
            .attr('text-anchor', 'middle')
            .text(data.value);
    }

    update(newValue, newConfiguration?): void {
        if (newConfiguration !== undefined) {
            this.configure(newConfiguration);
        }
        const ratio = this.scale(newValue);
        const newAngle = this.config.minAngle + ratio * this.range;
        this.pointer
            // .transition()
            // .duration(this.config.transitionMs)
            // .ease(d3.easeElastic)
            .attr('transform', 'rotate(' + newAngle + ')');
    }

    configure(configuration): void{
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
