import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { IShipment } from '../../models/shipment-schedule';

declare var d3: any;

@Component({
    selector: 'evj-shipment-schedule',
    templateUrl: './shipment-schedule.component.html',
    styleUrls: ['./shipment-schedule.component.scss'],
})
export class ShipmentScheduleComponent implements AfterViewInit {
    @ViewChild('circleProduct', { static: false }) circleProduct: ElementRef;
    @ViewChild('launchСalculations', { static: false }) launchСalculations: ElementRef;

    static itemCols = 12;
    static itemRows = 8;

    private subscriptions: Subscription[] = [];

    public title = 'График отгрузки';
    public code;
    public units;
    public name;
    public previewTitle: string;

    public svg;

    public readonly RADIUS = 12;
    public readonly CircleRADIUS = 30;

    ///Gauge param
    gaugemap: any = {};
    public criticalValue = 64;
    public criticalPie = 16;
    public indicator;
    public pie = 40;

    public clicked = false;

    public data: IShipment = {
        planPercent: 100,
        factPercent: 70,
        fio: 'Никонов И.О.',
        date: '30.03.2019 18:00',
        status: 'Формирование',
        loadingPercent: 95,
        levelServicePercent: 98,
        violationValue: -9000,
        method: [
            {
                label: 'НГП-19-04-b-1-0',
                value: 1,
                date: 'От: 31.03.2019 12:30',
            },
            {
                label: 'НГП-19-04-b-1-1',
                value: 2,
                date: 'От: 01.04.2019 12:30',
            },
            {
                label: 'НГП-19-04-b-1-2',
                value: 3,
                date: 'От: 02.04.2019 12:30',
            },
            {
                label: 'НГП-19-04-b-1-3',
                value: 4,
                date: 'От: 03.04.2019 12:30',
            },
        ],
    };

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
            this.d3Block(this.data, this.launchСalculations.nativeElement);
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

    d3Block(data, el) {
        let svg = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('viewBox', '0 3 370 300');

        let top_block = svg
            .append('image')
            .attr('xlink:href', './assets/icons/widgets/shipment-schedule/top_block.svg')
            .attr('height', '40px')
            .attr('width', '200px')
            .attr('x', '25')
            .attr('y', '0');

        let GO = svg
            .append('image')
            .attr('xlink:href', './assets/icons/widgets/shipment-schedule/GO.svg')
            .attr('height', '39px')
            .attr('width', '39px')
            .attr('x', '27.5')
            .attr('y', '7.5');

        let PP = svg
            .append('image')
            .attr('xlink:href', './assets/icons/widgets/shipment-schedule/PP.svg')
            .attr('height', '39px')
            .attr('width', '39px')
            .attr('x', '27.5')
            .attr('y', '-6.5');

        this.d3DropDown(data.method, svg);

        let param_button = svg
            .append('image')
            .attr('xlink:href', './assets/icons/widgets/shipment-schedule/param_button.svg')
            .attr('height', '35px')
            .attr('width', '35px')
            .attr('x', '229')
            .attr('y', '2.5');

        let start_button = svg
            .append('image')
            .attr('xlink:href', './assets/icons/widgets/shipment-schedule/start_button.svg')
            .attr('height', '35px')
            .attr('width', '35px')
            .attr('x', '270')
            .attr('y', '2.5');
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
            .attr('viewBox', '10 7 220 155');

        let top_line = this.svg
            .append('line')
            .attr('x1', 20)
            .attr('y1', 40)
            .attr('x2', 200)
            .attr('y2', 40)
            .attr('stroke-width', 0.3)
            .attr('stroke', '#5F6580');

        let x = 20;
        let y = 40;

        for (let i = 0; i < 5; i++) {
            let circle_on_line = this.svg
                .append('circle')
                // .attr('fill', 'orange')
                .attr('fill', 'var(--color-border-active')
                .attr('cx', x)
                .attr('cy', y)
                .attr('r', '1.2');
            x += 45;
        }

        ////INFO BLOCK - FIO, TIME, STATUS
        let info_fio = this.svg
            .append('text')
            .attr('x', 40)
            .attr('y', 50)
            .attr('text-anchor', 'middle')
            .attr('font-size', '5px')
            .attr('fill', '#5F6580')
            .attr('dominant-baseline', 'middle')
            .text('Ответственный:');

        let fio = this.svg
            .append('text')
            .attr('x', 76)
            .attr('y', 50)
            .attr('text-anchor', 'middle')
            .attr('font-size', '5px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text(data.fio);

        let info_time = this.svg
            .append('text')
            .attr('x', 29)
            .attr('y', 60)
            .attr('text-anchor', 'middle')
            .attr('font-size', '5px')
            .attr('fill', '#5F6580')
            .attr('dominant-baseline', 'middle')
            .text('Время:');

        let time = this.svg
            .append('text')
            .attr('x', 59)
            .attr('y', 60)
            .attr('text-anchor', 'middle')
            .attr('font-size', '5px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text(data.date);

        let info_status = this.svg
            .append('text')
            .attr('x', 30)
            .attr('y', 70)
            .attr('text-anchor', 'middle')
            .attr('font-size', '5px')
            .attr('fill', '#5F6580')
            .attr('dominant-baseline', 'middle')
            .text('Стадия:');

        let status = this.svg
            .append('text')
            .attr('x', 58)
            .attr('y', 70)
            .attr('text-anchor', 'middle')
            .attr('font-size', '5px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text(data.status);

        ///// BORDER BLOCK
        let circle_border = this.svg
            .append('image')
            .attr('xlink:href', './assets/icons/widgets/production-plan/circle_border.svg')
            .attr('height', '130px')
            .attr('width', '180px')
            .attr('transform', 'scale(-1,1)')
            .attr('x', '-200')
            .attr('y', '35');

        let bottom_button_circle = this.svg
            .append('image')
            .attr('xlink:href', './assets/icons/widgets/shipment-schedule/bottom_border.svg')
            .attr('height', '60px')
            .attr('width', '100px')
            .attr('x', '20')
            .attr('y', '110');

        //// TEXT IN MIDDLE
        let top_middle_text = this.svg
            .append('text')
            .attr('x', 38)
            .attr('y', 91)
            .attr('text-anchor', 'middle')
            .attr('font-size', '5px')
            .attr('fill', '#5F6580')
            .attr('dominant-baseline', 'middle')
            .text('Загрузка ОК');

        let bottom_middle_text = this.svg
            .append('text')
            .attr('x', 43)
            .attr('y', 110)
            .attr('text-anchor', 'middle')
            .attr('font-size', '5px')
            .attr('fill', '#5F6580')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('dominant-baseline', 'middle')
            .text('Уровень сервиса');

        let middle_line = this.svg
            .append('line')
            .attr('x1', 20)
            .attr('y1', 100)
            .attr('x2', 97)
            .attr('y2', 100)
            .attr('stroke-width', 0.3)
            .attr('stroke', '#5F6580');

        //// VALUE IN MIDDLE

        let top_value = this.svg
            .append('text')
            .attr('x', 80)
            .attr('y', 91)
            .attr('text-anchor', 'middle')
            .attr('font-size', '8px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text(data.loadingPercent + ' %');

        let bottom_value = this.svg
            .append('text')
            .attr('x', 80)
            .attr('y', 110)
            .attr('text-anchor', 'middle')
            .attr('font-size', '8px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text(data.levelServicePercent + ' %');

        ///// CIRCLE ON MIDDLE VALUE
        let circle_value1 = this.svg
            .append('circle')
            .attr('fill', 'orange')
            .attr('cx', 95)
            .attr('cy', 90)
            .attr('r', '1.2');

        let circle_value2 = this.svg
            .append('circle')
            .attr('fill', 'orange')
            .attr('cx', 95)
            .attr('cy', 110)
            .attr('r', '1.2');

        //// BOTTOM TEXT AND VALUE
        let bottomTextValue1 = this.svg
            .append('text')
            .attr('x', 43)
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('y', 135)
            .attr('text-anchor', 'middle')
            .attr('font-size', '5px')
            .attr('fill', '#5F6580')
            .attr('dominant-baseline', 'middle')
            .text('Средне арифм.');

        let bottomTextValue2 = this.svg
            .append('text')
            .attr('x', 38.2)
            .attr('y', 141)
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('text-anchor', 'middle')
            .attr('font-size', '5px')
            .attr('fill', '#5F6580')
            .attr('dominant-baseline', 'middle')
            .text('нарушение');

        let bottomTextValue3 = this.svg
            .append('text')
            .attr('x', 41)
            .attr('y', 147)
            .attr('text-anchor', 'middle')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('font-size', '5px')
            .attr('fill', '#5F6580')
            .attr('dominant-baseline', 'middle')
            .text('страх. запаса');

        let bottomValue = this.svg
            .append('text')
            .attr('x', 80)
            .attr('y', 142)
            .attr('text-anchor', 'middle')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('font-size', '8px')
            .attr('fill', 'white')
            .attr('dominant-baseline', 'middle')
            .text(data.violationValue);

        let arrow_value = this.svg
            .append('image')
            .attr('xlink:href', './assets/icons/widgets/shipment-schedule/critical_arrow.svg')
            .attr('height', '4px')
            .attr('width', '4px')
            .attr('x', 95)
            .attr('y', 140);
    }

    d3BigCirlce(data, el) {
        const mass = [data.factPercent + 35, data.planPercent - data.factPercent];
        let color: any;

        let group = this.svg.append('g').attr('transform', 'translate(149 ,100)');

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
            .attr('x', '119')
            .attr('fill', 'rgb(27, 30, 39)')
            .attr('y', '50.9');

        let text_on_pie0 = this.svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '4px')
            .attr('fill', '#414651')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('dominant-baseline', 'middle')
            .attr('x', '150')
            .attr('y', '115')
            .text('тн');

        let text_on_pie1 = this.svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '4px')
            .attr('fill', 'white')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('dominant-baseline', 'middle')
            .attr('x', '150')
            .attr('y', '125')
            .text('График');

        let text_on_pie2 = this.svg
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '4px')
            .attr('fill', 'white')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('dominant-baseline', 'middle')
            .attr('x', '150')
            .attr('y', '130')
            .text('Отгрузки');
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
                return 'translate(' + 149 + ',' + 101 + ')';
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

    d3DropDown(data, svg) {
        var members = [
            {
                label: 'Method 1',
                value: 1,
            },
            {
                label: 'Method 2',
                value: 2,
            },
            {
                label: 'Method 3',
                value: 3,
            },
            {
                label: 'Method 4',
                value: 4,
            },
        ];

        var config = {
            width: 140,
            container: svg,
            data,
            fontSize: 10,
            color: 'white',
            fontFamily: 'calibri',
            x: 70,
            y: 10,
        };

        svgDropDown(config);

        /**  svg-dropdown.js - svg dropdown library  */

        function svgDropDown(options) {
            if (typeof options !== 'object' || options === null || !options.container) {
                console.error(new Error('Container not provided'));
                return;
            }
            const defaultOptions = {
                width: 200,
                members: [],
                fontSize: 12,
                color: 'var(--color-text-sub)',
                fontFamily: 'Calibri,Candara,Segoe,Segoe UI,Optima,Arial,sans-serif',
                x: 0,
                y: 0,
            };

            options = { ...defaultOptions, ...options };

            options.optionHeight = options.fontSize * 2;
            options.height = options.fontSize + 8;
            options.padding = 5;
            options.hoverColor = 'var(--color-bg-additional)';
            options.hoverTextColor = '#fff';
            options.bgColor = 'var(--color-bg-main)';
            options.width = options.width - 2;

            const g = options.container
                .append('svg')
                .attr('x', options.x)
                .attr('y', options.y)
                .attr('shape-rendering', 'crispEdges')
                .append('g')
                .attr('transform', 'translate(1,1)')
                .attr('font-family', options.fontFamily);

            let selectedOption =
                options.data.length === 0
                    ? {
                          label: '',
                          value: '',
                      }
                    : options.data[0];

            /** Rendering Select Field */
            const selectField = g.append('g');

            // background
            selectField
                .append('rect')
                .attr('width', options.width)
                .attr('height', options.height)
                .attr('class', 'option select-field')
                .attr('fill', options.bgColor);
            // .style('stroke', '#a0a0a0')
            //  .style('stroke-width', '1');

            // text
            const activeText = selectField
                .append('text')
                .text(selectedOption.label)
                .attr('x', options.padding)
                .attr('y', options.height / 2 + options.fontSize / 3)
                .attr('font-size', options.fontSize)
                .attr('fill', options.color);

            // arrow symbol at the end of the select box
            selectField
                .append('text')
                .text('▼')
                .attr('x', options.width - options.fontSize - options.padding)
                .attr('y', options.height / 2 + (options.fontSize - 2) / 3)
                .attr('font-size', options.fontSize - 2)
                .attr('fill', 'rgb(95, 101, 128)');

            // transparent surface to capture actions
            selectField
                .append('rect')
                .attr('width', options.width)
                .attr('height', options.height)
                .style('fill', 'transparent')
                .on('click', handleSelectClick);

            /** rendering options */
            const optionGroup = g
                .append('g')
                .attr('transform', `translate(0, ${options.height})`)
                .attr('opacity', 0); //.attr("display", "none"); Issue in IE/Firefox: Unable to calculate textLength when display is none.

            // Rendering options group
            const optionEnter = optionGroup
                .selectAll('g')
                .data(options.data)
                .enter()
                .append('g')
                .on('click', handleOptionClick);

            // Rendering background
            optionEnter
                .append('rect')
                .attr('width', options.width)
                .attr('height', options.optionHeight)
                .attr('y', function(d, i) {
                    return i * options.optionHeight;
                })
                .attr('class', 'option')
                //  .style('stroke', options.hoverColor)
                .style('stroke-dasharray', (d, i) => {
                    let stroke = [
                        0,
                        options.width,
                        options.optionHeight,
                        options.width,
                        options.optionHeight,
                    ];
                    if (i === 0) {
                        stroke = [
                            options.width + options.optionHeight,
                            options.width,
                            options.optionHeight,
                        ];
                    } else if (i === options.data.length - 1) {
                        stroke = [0, options.width, options.optionHeight * 2 + options.width];
                    }
                    return stroke.join(' ');
                })
                .style('stroke-width', 1)
                .style('fill', options.bgColor);

            // Rendering option text
            optionEnter
                .append('text')
                .attr('x', options.padding)
                .attr('y', function(d, i) {
                    return (
                        i * options.optionHeight + options.optionHeight / 2 + options.fontSize / 3
                    );
                })
                .text(function(d) {
                    return d.label;
                })
                .attr('font-size', options.fontSize)
                .attr('fill', options.color)
                .each(wrap);

            // Rendering option surface to take care of events
            optionEnter
                .append('rect')
                .attr('width', options.width)
                .attr('height', options.optionHeight)
                .attr('y', function(d, i) {
                    return i * options.optionHeight;
                })
                .style('fill', 'transparent')
                .on('mouseover', handleMouseOver)
                .on('mouseout', handleMouseOut);

            //once the textLength gets calculated, change opacity to 1 and display to none
            optionGroup.attr('display', 'none').attr('opacity', 1);

            d3.select('body').on('click', function() {
                optionGroup.attr('display', 'none');
            });

            // Utility Methods
            function handleMouseOver() {
                d3.select(d3.event.target.parentNode)
                    .select('.option')
                    .style('fill', options.hoverColor);

                d3.select(d3.event.target.parentNode)
                    .select('text')
                    .style('fill', options.hoverTextColor);
            }

            function handleMouseOut() {
                d3.select(d3.event.target.parentNode)
                    .select('.option')
                    .style('fill', options.bgColor);

                d3.select(d3.event.target.parentNode)
                    .select('text')
                    .style('fill', options.color);
            }

            function handleOptionClick(d) {
                d3.event.stopPropagation();
                selectedOption = d;
                activeText.text(selectedOption.label).each(wrap);
                typeof options.changeHandler === 'function' && options.changeHandler.call(this, d);
                optionGroup.attr('display', 'none');
            }

            function handleSelectClick() {
                d3.event.stopPropagation();
                const visibility = optionGroup.attr('display') === 'block' ? 'none' : 'block';
                optionGroup.attr('display', visibility);
            }

            // wraps words
            function wrap() {
                const width = options.width;
                const padding = options.padding;
                const self = d3.select(this);
                let textLength = self.node().getComputedTextLength();
                let text = self.text();
                const textArr = text.split(/\s+/);
                let lastWord = '';
                while (textLength > width - 2 * padding && text.length > 0) {
                    lastWord = textArr.pop();
                    text = textArr.join(' ');
                    self.text(text);
                    textLength = self.node().getComputedTextLength();
                }
                self.text(text + ' ' + lastWord);

                // providing ellipsis to last word in the text
                if (lastWord) {
                    textLength = self.node().getComputedTextLength();
                    text = self.text();
                    while (textLength > width - 2 * padding && text.length > 0) {
                        text = text.slice(0, -1);
                        self.text(text + '...');
                        textLength = self.node().getComputedTextLength();
                    }
                }
            }
        }
    }
}
