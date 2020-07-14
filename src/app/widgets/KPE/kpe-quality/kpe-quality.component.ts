import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import * as d3 from 'd3';

@Component({
    selector: 'evj-kpe-quality',
    templateUrl: './kpe-quality.component.html',
    styleUrls: ['./kpe-quality.component.scss']
})
export class KpeQualityComponent extends WidgetPlatform implements OnInit, OnDestroy {

    public datas = {
        value: 0,
        resourceValue: 0,
        stockValue: 0,
        criticalValue: 0,
        dataPercent: 0,
        modelPercent: 0,
    };

    public svg_circle: any;

    @ViewChild('circleProduct') circleProduct: ElementRef;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();

        const radius = 90,
            padding = 20,
            radians = 2 * Math.PI;

        const dimension = (2 * radius) + (2 * padding),
            points = 50, percentage = 0.62;

        const angle = d3.scaleLinear()
            .domain([0, points - 1])
            .range([0, radians]);

        const line = d3.radialLine()
            .curve(d3.curveBasis)
            .tension(0)
            .radius(radius)
            .angle((d, i) => {
                if (i < (points * percentage + 1)) {
                    return angle(i);
                }
            });

        const svg = d3.select(".container").append("svg")
            .attr("width", dimension)
            .attr("height", dimension)
            .append("g");

        svg.append("path").datum(d3.range(points))
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke-dasharray", "3 7")
            .attr("stroke-width", "25px")
            .attr("stroke", "#1F2025")
            .attr("d", line)
            .attr("transform", "translate(110,120) rotate(-110)");



        this.d3BigGrauge(this.datas, this.svg_circle, this.bigGaugemap, 78, 102);
    }

    isDeviation(value, performance) {
        const plan: number = performance > 0 ? value : value - performance;
        return plan === 0 ? 100 : (value / plan) * 100;
    }

    d3BigGrauge(data, el, gaugemap, x, y) {
        const indicatorRightPie = this.isDeviation(data.value, data.criticalValue);

        let svgAll = el;
        var gauge = function(container, configuration) {
            var config = {
                size: 210,
                clipWidth: 200,
                clipHeight: 110,
                ringInset: 20,
                ringWidth: 10,

                pointerWidth: 10,
                pointerTailLength: 5,
                pointerHeadLengthPercent: 0.9,

                minValue: 0,
                maxValue: 80,

                minAngle: -133,
                maxAngle: 133,

                transitionMs: 750,

                majorTicks: 100,
                labelFormat: d3.format('d'),
                labelInset: 10,

                arcColorFn: d3.interpolateHslLong(
                    d3.rgb('rgb(13,77,112)'),
                    d3.rgb('rgb(15, 149, 209)')
                ),
            };
            var range = undefined;
            var r = undefined;
            var pointerHeadLength = undefined;
            var value = 0;

            var svg = svgAll;
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
                r = config.size / 1.5;
                pointerHeadLength = Math.round(r * config.pointerHeadLengthPercent);

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
                return 'translate(' + x + ',' + y + ')';
            }

            function isRendered() {
                return svg !== undefined;
            }
            gaugemap.isRendered = isRendered;

            function render(indicator) {
                var centerTx = centerTranslation();

                var arcs = svg
                    .append('g')
                    .attr('class', 'arc')
                    .attr('transform', centerTx);

                arcs.selectAll('path')
                    .data(tickData)
                    .enter()
                    .append('path')
                    .attr('stroke-width', 0.5)
                    .attr('stroke', 'black')
                    .attr('fill', function(d, i) {
                        if (i + 1 <= indicator) {
                            return config.arcColorFn(d * i);
                        } else if (i + 1 > indicator) {
                            return 'orange';
                        }
                    })
                    .attr('d', arc);

                update(indicator === undefined ? 0 : indicator);

                let valueGauge = svg
                    .append('text')
                    .attr('fill', 'white')
                    .attr('font-size', '23px')
                    .attr('x', '148')
                    .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                    .attr('y', '160')
                    .attr('text-anchor', 'middle')
                    .text(data.fact < 0 ? 0 : data.fact);
            }
            gaugemap.render = render;
            function update(newValue, newConfiguration?) {
                if (newConfiguration !== undefined) {
                    configure(newConfiguration);
                }
                var ratio = scale(newValue);
                var newAngle = config.minAngle + ratio * range;
            }
            gaugemap.update = update;

            configure(configuration);
            return gaugemap;
        };

        var powerGauge = gauge(el, {
            size: 93,
            clipWidth: 300,
            clipHeight: 300,
            ringWidth: 55,
            maxValue: 100,
            transitionMs: 4000,
        });
        powerGauge.render(indicatorRightPie);
    }




    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        // this.data = ref.chartItems;
    }



}
