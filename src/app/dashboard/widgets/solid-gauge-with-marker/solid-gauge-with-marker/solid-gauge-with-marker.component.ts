import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { SolidGaugeWithMarkerItem } from 'src/app/dashboard/models/solid-gauge-with-marker';

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

    constructor() {}

    public criticalValue: number = 64;
    public criticalPie: number = 16;
    public indicator: number;
    public pie: number = 25;

    ngAfterViewInit(): void {
        this.indicator = this.indicatorGauge(this.data);
        this.draw(this.data, this.myCircle.nativeElement, this.gaugemap, this.indicator);
    }

    indicatorGauge(data): number {
        const percent = data.percent > 100 ? 100 : data.percent < 0 ? 0 : data.percent;
        return (this.pie * percent) / 100;
    }

    draw(data, el, gaugemap, indicator): void {
        var gauge = function(container, configuration) {
            var config = {
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
            var range = undefined;
            var r = undefined;
            var pointerHeadLength = undefined;
            var value = 0;

            var svg = undefined;
            var arc = undefined;
            var scale = undefined;
            var ticks = undefined;
            var tickData = undefined;
            var pointer = undefined;

            var donut = d3.pie();

            function deg2rad(deg) {
                return (deg * Math.PI) / 180;
            }

            function newAngle(d) {
                var ratio = scale(d);
                var newAngle = config.minAngle + ratio * range;
                return newAngle;
            }

            function configure(configuration) {
                var prop = undefined;
                for (prop in configuration) {
                    config[prop] = configuration[prop];
                }

                range = config.maxAngle - config.minAngle;
                r = config.size / 2;
                pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

                // a linear scale this.gaugemap maps domain values to a percent from 0..1
                scale = d3
                    .scaleLinear()
                    .range([0, 1])
                    .domain([config.minValue, config.maxValue]);

                ticks = scale.ticks(config.majorTicks);
                tickData = d3.range(config.majorTicks).map(function() {
                    return 1 / config.majorTicks;
                });

                arc = d3
                    .arc()
                    .innerRadius(r + 50 - config.ringWidth - config.ringInset)
                    .outerRadius(r - config.ringInset)
                    .startAngle(function(d, i) {
                        var ratio = d * i;
                        return deg2rad(config.minAngle + ratio * range);
                    })
                    .endAngle(function(d, i) {
                        var ratio = d * (i + 1);
                        return deg2rad(config.minAngle + ratio * range);
                    });
            }
            gaugemap.configure = configure;

            function centerTranslation() {
                return 'translate(' + r + ',' + r + ')';
            }

            function isRendered() {
                return svg !== undefined;
            }
            gaugemap.isRendered = isRendered;

            function render(newValue, criticalPie, pie) {
                svg = d3
                    .select(container)
                    .append('svg:svg')
                    .attr('class', 'gauge')
                    .attr('viewBox', '-10 -30 320 290');

                var centerTx = centerTranslation();

                var arcs = svg
                    .append('g')
                    .attr('class', 'arc')
                    .attr('transform', centerTx);

                if (newValue < criticalPie) {
                    arcs.selectAll('path')
                        .data(tickData)
                        .enter()
                        .append('path')
                        .attr('stroke', 'black')
                        .attr('fill', function(d, i) {
                            if (i + 1 > criticalPie) {
                                return 'rgba(244,163,33, 0.5)';
                            } else if (i + 1 <= newValue + 1 && newValue !== 0) {
                                return 'rgb(158, 215, 245)';
                            } else if (i + 1 >= newValue && i + 1 <= criticalPie) {
                                return 'rgba(158, 215, 245, 0.5)';
                            }
                        })
                        .attr('d', arc);
                } else {
                    arcs.selectAll('path')
                        .data(tickData)
                        .enter()
                        .append('path')
                        .attr('stroke', 'black')
                        .attr('fill', function(d, i) {
                            if (i + 1 <= newValue + 1 && i + 1 > criticalPie) {
                                return 'orange';
                            } else if (i + 1 <= criticalPie) {
                                return 'white';
                            } else if (i + 1 >= newValue && i + 1 <= pie) {
                                return 'rgba(244,163,33, 0.5)';
                            }
                        })
                        .attr('d', arc);
                }

                let aroundGauge = svg
                    .append('image')
                    .attr('xlink:href', '/assets/pic/SolidGauge/aroundGauge.svg')
                    .attr('height', '420px')
                    .attr('width', '410px')
                    .attr('x', '-55')
                    .attr('y', '-105');

                var lineData = [
                    [config.pointerWidth / 2, 0],
                    [0, -pointerHeadLength + 20],
                    [-(config.pointerWidth / 2), 0],
                    [0, config.pointerTailLength],
                    [config.pointerWidth / 4, 0],
                ];
                var pointerLine = d3.line().curve(d3.curveLinear);
                var pg = svg
                    .append('g')
                    .data([lineData])
                    .attr('class', 'pointer')
                    .attr('transform', centerTx);

                pointer = pg
                    .append('path')
                    .attr('fill', newValue < criticalPie ? 'white' : 'orange')
                    .attr('d', pointerLine /*function(d) { return pointerLine(d) +'Z';}*/)
                    .attr('transform', 'rotate(' + config.minAngle + ')');

                /*     var gShadowPointer = svg.append('g').data([lineData])
         .attr('class', 'shadowPointer')
         .attr('transform', centerTx);

       let shadowPointer = gShadowPointer.append("image")
       .attr("xlink:href", "/assets/pic/SolidGauge/shadowPointer.svg")
       .attr("height", "120px")
       .attr("width", "120px")
       .attr("x","0")
       .attr("y","0")
       .attr('transform', 'rotate(' + config.minAngle + ')'); */

                update(newValue === undefined ? 0 : newValue);

                let circleInGauge = svg
                    .append('circle')
                    .attr('cx', '150')
                    .attr('cy', '150')
                    .attr('r', '45px')
                    .attr('fill', 'rgb(33,36,45)');

                let valueGauge = svg
                    .append('text')
                    .attr('fill', newValue < criticalPie ? 'white' : 'orange')
                    .attr('font-size', '23px')
                    .attr('x', '148')
                    .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                    .attr('y', '160')
                    .attr('text-anchor', 'middle')
                    .text(data.fact < 0 ? 0 : data.fact);

                let bottomTextGauge = svg
                    .append('text')
                    .attr('fill', '#8C99B2')
                    .attr('font-size', '12px')
                    .attr('x', '150')
                    .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                    .attr('y', '215')
                    .attr('text-anchor', 'middle')
                    .text(data.name);

                let lineGauge = svg
                    .append('image')
                    .attr('xlink:href', '/assets/pic/SolidGauge/lineGauge.svg')
                    .attr('height', '120px')
                    .attr('width', '110px')
                    .attr('x', '199.4')
                    .attr('y', '-14');

                let lineCriticalGauge = svg
                    .append('text')
                    .attr('fill', 'rgb(158, 215, 245)')
                    .attr('font-size', '12px')
                    .attr('x', '270')
                    .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                    .attr('y', '25')
                    .attr('text-anchor', 'middle')
                    .text(data.value);
            }
            gaugemap.render = render;
            function update(newValue, newConfiguration?) {
                if (newConfiguration !== undefined) {
                    configure(newConfiguration);
                }
                var ratio = scale(newValue);
                var newAngle = config.minAngle + ratio * range;
                pointer
                    .transition()
                    .duration(config.transitionMs)
                    .ease(d3.easeElastic)
                    .attr('transform', 'rotate(' + newAngle + ')');
            }
            gaugemap.update = update;

            configure(configuration);
            return gaugemap;
        };

        var powerGauge = gauge(el, {
            size: 300,
            clipWidth: 300,
            clipHeight: 300,
            ringWidth: 60,
            maxValue: 25,
            transitionMs: 4000,
        });
        powerGauge.render(indicator, this.criticalPie, this.pie);
    }
}
