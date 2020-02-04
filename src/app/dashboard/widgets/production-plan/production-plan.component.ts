import { Component, AfterViewInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { IProductionPlan } from '../../models/production-plan';

declare var d3: any;

@Component({
    selector: 'evj-production-plan',
    templateUrl: './production-plan.component.html',
    styleUrls: ['./production-plan.component.scss'],
})
export class ProductionPlanComponent implements AfterViewInit {
    @ViewChild('circleProduct', { static: false }) circleProduct: ElementRef;

    public readonly RADIUS = 12;
    public readonly CircleRADIUS = 30;

    public title = 'Суточное планирование по продуктам';
    public code;
    public units;
    public name;

    static itemCols = 12;
    static itemRows = 8;

    public clicked = false;

    public AtopButtonLeft = './assets/icons/widgets/production-plan/top_left_Active.svg';
    public NAtopButtonLeft = './assets/icons/widgets/production-plan/top_left_notActive.svg';
    public AtopButtonRight = './assets/icons/widgets/production-plan/top_right_Active.svg';
    public NAtopButtonRight = './assets/icons/widgets/production-plan/top_right_notActive.svg';
    public AbottomButtonTop = './assets/icons/widgets/production-plan/top_circle_Active.svg';
    public NAbottomButtonTop = './assets/icons/widgets/production-plan/top_circle_notActive.svg';
    public AbottomButtonBottom = './assets/icons/widgets/production-plan/bottom_circle_Active.svg';
    public NAbottomButtonBottom =
        './assets/icons/widgets/production-plan/bottom_circle_notActive.svg';

    public data: IProductionPlan = {
        planPercent: 100,
        factPercent: 50,
        resourceValue: 50000,
        stockValue: -7800,
        dataPercent: 80,
        modelPercent: 30,
    };

    private subscriptions: Subscription[] = [];

    public previewTitle: string;

    public svg;

    ///Gauge param
    gaugemap: any = {};
    public criticalValue = 64;
    public criticalPie = 16;
    public indicator;
    public pie = 40;

    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
                this.title = data.title;
                this.code = data.code;
                this.units = data.units;
                this.name = data.name;
                this.previewTitle = data.widgetType;
            })
        );
    }

    ngAfterViewInit() {
        if (!this.isMock) {
            this.d3Circle(this.data, this.circleProduct.nativeElement);
            this.d3Grauge(
                this.data,
                this.circleProduct.nativeElement,
                this.gaugemap,
                this.indicator
            );
            this.d3BigCirlce(this.data, this.circleProduct.nativeElement);
        }
    }

    ngOnDestroy() {
        if (this.subscriptions) {
            for (const subscription of this.subscriptions) {
                subscription.unsubscribe();
            }
        }
    }

    d3Circle(data, el) {
        let checkTopLeftButton = false;
        let checkTopRightButton = false;

        let checkCircleTopButton = false;
        let checkCircleBottomButton = false;

        this.svg = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('viewBox', '0 3 220 160');

        let circle_border = this.svg
            .append('image')
            .attr('xlink:href', './assets/icons/widgets/production-plan/circle_border.svg')
            .attr('height', '130px')
            .attr('width', '180px')
            .attr('x', '10')
            .attr('y', '35');

        // VALUE MIDDLE RIGHT
        let top_middle_value = this.svg
            .append('text')
            .attr('x', 167)
            .attr('y', 91)
            .attr('text-anchor', 'middle')
            .attr('font-size', '7px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text(data.stockValue);

        let bottom_middle_value = this.svg
            .append('text')
            .attr('x', 167)
            .attr('y', 111)
            .attr('text-anchor', 'middle')
            .attr('font-size', '7px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text(data.resourceValue);

        let circle = this.svg
            .append('circle')
            .attr('fill', 'orange')
            .attr('cx', 184)
            .attr('cy', 110)
            .attr('r', '1.2');

        let arrow = this.svg
            .append('image')
            .attr('xlink:href', './assets/icons/widgets/production-plan/critical_arrow.svg')
            .attr('height', '5px')
            .attr('width', '5px')
            .attr('x', 182)
            .attr('y', 88);

        // TOP CIRCLE BLOCKS

        let top_button_circle = this.svg
            .append('image')
            .attr('xlink:href', this.NAbottomButtonTop)
            .attr('height', '60px')
            .attr('width', '100px')
            .attr('class', 'top_button_circle')
            .attr('x', '90')
            .attr('y', '30')
            .on('click', () => {
                checkCircleTopButton = !checkCircleTopButton;
                checkCircleBottomButton = false;
                if (checkCircleTopButton) {
                    this.svg
                        .select('.top_button_circle')
                        .attr(
                            'xlink:href',
                            './assets/icons/widgets/production-plan/top_circle_Active.svg'
                        );
                } else {
                    this.svg
                        .select('.top_button_circle')
                        .attr(
                            'xlink:href',
                            './assets/icons/widgets/production-plan/top_circle_notActive.svg'
                        );
                }

                this.svg
                    .select('.bottom_button_circle')
                    .attr(
                        'xlink:href',
                        './assets/icons/widgets/production-plan/bottom_circle_notActive.svg'
                    );
                //  return checkCircleTopButton = !checkCircleTopButton;
            });

        let bottom_button_circle = this.svg
            .append('image')
            .attr('xlink:href', this.NAbottomButtonBottom)
            .attr('height', '60px')
            .attr('width', '100px')
            .attr('x', '90')
            .attr('class', 'bottom_button_circle')
            .attr('y', '110')
            .on('click', () => {
                checkCircleBottomButton = !checkCircleBottomButton;
                checkCircleTopButton = false;
                if (checkCircleBottomButton) {
                    this.svg
                        .select('.bottom_button_circle')
                        .attr(
                            'xlink:href',
                            './assets/icons/widgets/production-plan/bottom_circle_Active.svg'
                        );
                } else {
                    this.svg
                        .select('.bottom_button_circle')
                        .attr(
                            'xlink:href',
                            './assets/icons/widgets/production-plan/bottom_circle_notActive.svg'
                        );
                }
                this.svg
                    .select('.top_button_circle')
                    .attr(
                        'xlink:href',
                        './assets/icons/widgets/production-plan/top_circle_notActive.svg'
                    );
                // return checkCircleBottomButton = !checkCircleBottomButton;
            });

        let top_button_left = this.svg
            .append('image')
            .attr('xlink:href', this.NAtopButtonLeft)
            .attr('height', '15px')
            .attr('width', '55px')
            .attr('x', '49')
            .attr('class', 'top_button_left')
            .attr('y', '8')
            .on('click', () => {
                checkTopLeftButton = !checkTopLeftButton;
                checkTopRightButton = false;
                if (checkTopLeftButton) {
                    this.svg
                        .select('.top_button_left')
                        .attr(
                            'xlink:href',
                            './assets/icons/widgets/production-plan/top_left_Active.svg'
                        );
                } else {
                    this.svg
                        .select('.top_button_left')
                        .attr(
                            'xlink:href',
                            './assets/icons/widgets/production-plan/top_left_notActive.svg'
                        );
                }
                this.svg
                    .select('.top_button_right')
                    .attr(
                        'xlink:href',
                        './assets/icons/widgets/production-plan/top_right_notActive.svg'
                    );
                // return checkTopLeftButton = !checkTopLeftButton;
            });

        let top_button_right = this.svg
            .append('image')
            .attr('xlink:href', this.NAtopButtonRight)
            .attr('height', '15px')
            .attr('width', '55px')
            .attr('x', '106')
            .attr('class', 'top_button_right')
            .attr('y', '8')
            .on('click', () => {
                checkTopRightButton = !checkTopRightButton;
                checkTopLeftButton = false;
                if (checkTopRightButton) {
                    this.svg
                        .select('.top_button_right')
                        .attr(
                            'xlink:href',
                            './assets/icons/widgets/production-plan/top_right_Active.svg'
                        );
                } else {
                    this.svg
                        .select('.top_button_right')
                        .attr(
                            'xlink:href',
                            './assets/icons/widgets/production-plan/top_right_notActive.svg'
                        );
                }
                this.svg
                    .select('.top_button_left')
                    .attr(
                        'xlink:href',
                        './assets/icons/widgets/production-plan/top_left_notActive.svg'
                    );
            });

        let small_circle_left = this.svg
            .append('image')
            .attr('xlink:href', './assets/icons/widgets/production-plan/small_circle.svg')
            .attr('height', '30px')
            .attr('width', '40px')
            .attr('x', '12')
            .attr('y', '5');

        let small_circle_right = this.svg
            .append('image')
            .attr('xlink:href', './assets/icons/widgets/production-plan/small_circle.svg')
            .attr('height', '30px')
            .attr('width', '40px')
            .attr('x', '160')
            .attr('y', '5');

        let small_line_left = this.svg
            .append('image')
            .attr('xlink:href', './assets/icons/widgets/production-plan/small_line_left.svg')
            .attr('height', '20px')
            .attr('width', '75px')
            .attr('x', '32')
            .attr('y', '21');

        let small_line_right = this.svg
            .append('image')
            .attr('xlink:href', './assets/icons/widgets/production-plan/small_line_right.svg')
            .attr('height', '20px')
            .attr('width', '75px')
            .attr('x', '105')
            .attr('y', '21');

        let left_text = this.svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('x', 75)
            .attr('y', 31)
            .attr('font-size', '4px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text('Качество данных');

        let right_text = this.svg
            .append('text')
            .attr('x', 135)
            .attr('y', 31)
            .attr('text-anchor', 'middle')
            .attr('font-size', '4px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text('Качество модели');

        let top_middle_text = this.svg
            .append('text')
            .attr('x', 135)
            .attr('y', 91)
            .attr('text-anchor', 'middle')
            .attr('font-size', '5px')
            .attr('fill', '#5F6580')
            .attr('dominant-baseline', 'middle')
            .text('Запас');

        let bottom_middle_text = this.svg
            .append('text')
            .attr('x', 135)
            .attr('y', 110)
            .attr('text-anchor', 'middle')
            .attr('font-size', '5px')
            .attr('fill', '#5F6580')
            .attr('dominant-baseline', 'middle')
            .text('Ср. мес. ресурс');

        let middle_line = this.svg
            .append('line')
            .attr('x1', 112)
            .attr('y1', 100)
            .attr('x2', 190)
            .attr('y2', 100)
            .attr('stroke-width', 0.5)
            .attr('stroke', '#5F6580');
        /// FIRST SMALL LEFT CIRCLE !!!!

        const mass = [10, 20];
        let color: any;

        color = d3.scaleOrdinal().range(['white', '#272a38']);

        let group = this.svg.append('g').attr('transform', 'translate(32 ,20)');

        const arc = d3
            .arc()
            .innerRadius(10)
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

        let value_right = group
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '7px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text(data.dataPercent);

        let orange_right = group
            .append('circle')
            .attr('fill', 'orange')
            .attr('cx', '0')
            .attr('cy', '-6')
            .attr('r', '1.2');

        let percent_right = group
            .append('text')
            .attr('x', '0')
            .attr('y', '6')
            .attr('text-anchor', 'middle')
            .attr('font-size', '4px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text('%');

        /// SECOND SMALL RIGHT CIRCLE

        const mass_second = [15, 70];

        let group_second = this.svg.append('g').attr('transform', 'translate(180 ,20)');

        const arc_second = d3
            .arc()
            .innerRadius(10)
            .outerRadius(this.RADIUS);

        const pie_second = d3
            .pie()
            .value((d) => {
                return d;
            })
            .sort(() => null);

        const arcs_second = group_second
            .selectAll('.arc')
            .data(pie(mass_second))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs_second
            .append('path')
            .attr('d', arc_second)
            .attr('fill', (d) => color(d.index));

        let value_left = group_second
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '8px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text(data.modelPercent);

        let orange_left = group_second
            .append('circle')
            .attr('fill', 'orange')
            .attr('cx', '0')
            .attr('cy', '-6')
            .attr('r', '1.2');

        let percent_left = group_second
            .append('text')
            .attr('x', '0')
            .attr('y', '6')
            .attr('text-anchor', 'middle')
            .attr('font-size', '4px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text('%');
    }

    d3BigCirlce(data, el) {
        const mass = [data.factPercent + 35, data.planPercent - data.factPercent];
        let color: any;

        let group = this.svg.append('g').attr('transform', 'translate(63 ,100)');

        color = d3.scaleOrdinal().range(['#414651', '#1B1E29']);

        const arc = d3
            .arc()
            .innerRadius(38)
            .outerRadius(this.CircleRADIUS);

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
            .attr('class', 'arc1');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', (d) => color(d.index));

        group = group
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text(data.factPercent);

        let pie_back = this.svg
            .append('image')
            .attr('xlink:href', '/assets/icons/widgets/production-plan/onCircle.svg')
            .attr('height', '155px')
            .attr('width', '60px')
            .attr('x', '33')
            .attr('fill', 'rgb(27, 30, 39)')
            .attr('y', '50.9');

        let text_on_pie0 = this.svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '4px')
            .attr('fill', '#414651')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('dominant-baseline', 'middle')
            .attr('x', '64')
            .attr('y', '115')
            .text('тн');

        let text_on_pie1 = this.svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '4px')
            .attr('fill', 'white')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('dominant-baseline', 'middle')
            .attr('x', '64')
            .attr('y', '125')
            .text('План');

        let text_on_pie2 = this.svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '4px')
            .attr('fill', 'white')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('dominant-baseline', 'middle')
            .attr('x', '64')
            .attr('y', '130')
            .text('Производства');
    }

    d3Grauge(data, el, gaugemap, indicator) {
        let svgAll = this.svg;
        var gauge = function(container, configuration) {
            var config = {
                size: 710,
                clipWidth: 200,
                clipHeight: 110,
                ringInset: 20,
                ringWidth: 10,

                pointerWidth: 10,
                pointerTailLength: 5,
                pointerHeadLengthPercent: 0.9,

                minValue: 0,
                maxValue: 60,

                minAngle: -120,
                maxAngle: 120,

                transitionMs: 750,

                majorTicks: 60,
                labelFormat: d3.format('d'),
                labelInset: 10,

                arcColorFn: d3.interpolateHslLong(d3.rgb('red'), d3.rgb('blue')),
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
                return 'translate(' + 63 + ',' + 101 + ')';
            }

            function isRendered() {
                return svg !== undefined;
            }
            gaugemap.isRendered = isRendered;

            function render(newValue, criticalPie, pie) {
                /*
            svg = d3
                .select(container)
                .append('svg:svg')
                .attr('class', 'gauge')
                .attr('viewBox', '-10 -30 320 290'); */

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
                        .attr('stroke-linecap', 'round')
                        .attr('stroke-linejoin', 'round')
                        .attr('stroke-dasharray', '.5 180')
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
                        .attr('stroke', 'rgb(27,30,41)')
                        .attr('fill', function(d, i) {
                            return config.arcColorFn(d * i);
                        })
                        .attr('fill-opacity', '0.6')
                        .attr('d', arc);
                }

                var lineData = [
                    /*  [(config.pointerWidth / 2) - 0, 0],
                [0, -pointerHeadLength + 14],
                [-(config.pointerWidth / 2), 0],
                [0, config.pointerTailLength - 31],
                [config.pointerWidth / 2, 0], */
                    [0, 0],
                    [0, 0],
                    [0, 0],
                    [0, config.pointerTailLength - 31],
                    [0, 0],
                ];
                var pointerLine = d3.line().curve(d3.curveLinear);
                var pg = svg
                    .append('g')
                    .data([lineData])
                    .attr('class', 'pointer')
                    .attr('transform', centerTx);

                pointer = pg
                    .append('path')
                    .attr('fill', 'blue')
                    .attr('d', pointerLine /*function(d) { return pointerLine(d) +'Z';}*/)
                    .attr('transform', 'rotate(' + config.minAngle + ')');

                update(newValue === undefined ? 0 : newValue);

                let valueGauge = svg
                    .append('text')
                    .attr('fill', newValue < criticalPie ? 'white' : 'orange')
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
            size: 90,
            clipWidth: 300,
            clipHeight: 300,
            ringWidth: 52,
            maxValue: 60,
            transitionMs: 4000,
        });
        powerGauge.render(indicator, this.criticalPie, this.pie);
    }
}
