import { Component, ElementRef, Input, OnInit, ViewChild, HostListener } from '@angular/core';

import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
// import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Format from 'd3-format';
import {
    LineChartData,
    LineChartGraph,
    LineChartGraphValue,
} from 'src/app/dashboard/models/line-chart';

@Component({
    selector: 'evj-line-chart-workspace',
    templateUrl: './evj-line-chart-workspace.component.html',
    styleUrls: ['./evj-line-chart-workspace.component.scss'],
})
export class EvjLineChartWorkspaceComponent implements OnInit {
    code: number;
    public title: string;
    units: number;
    options = {
        factLineType: 'curveLinear',
        lowerLimitLineType: 'curveMonotoneX',
        planLineType: 'curveLinear',
        upperLimitLineType: 'curveMonotoneX',
    };
    position?: string = 'default';

    data: LineChartData;

    static itemCols = 30;
    static itemRows = 12;

    private dataChart;

    @Input() set dataChartAttribute(value) {
        if (value) value.graphs.map((x) => x.values.map((z) => (z.date = new Date(z.date))));
        this.dataChart = value;
        this.draw(this.dataChart);
    }

    @ViewChild('chart', { static: true }) private chartContainer: ElementRef;

    margin = { top: 10, right: -50, bottom: 20, left: 50 };

    svg;
    g: any;
    width: number;
    height: number;
    heightNoMargins: number; // use it for to build deviation area
    x;
    y;

    line;
    lines: any;

    deviationMode = 'planFact';

    private readonly trendsStyle: any = {
        plan: {
            point: {
                iconUrl: 'assets/icons/widgets/line-chart/point-plan.svg',
                width: 6,
                height: 6,
                widthOffset: -3,
                heightOffset: -3,
                class: 'point point_plan',
            },
            trend: {
                class: 'line line_plan',
            },
        },
        fact: {
            point: {
                iconUrl: 'assets/icons/widgets/line-chart/point-fact.svg',
                width: 8,
                height: 8,
                widthOffset: -4,
                heightOffset: -4,
                class: 'point point_fact',
            },
            trend: {
                class: 'line line_fact',
            },
        },
        deviation: {
            point: {
                iconUrl: 'assets/icons/widgets/line-chart/point-deviation.svg',
                width: 9.2,
                height: 8,
                widthOffset: -4.6,
                heightOffset: -5,
                class: 'point point_deviation',
            },
        },
        lowerLimit: {
            point: {
                iconUrl: 'assets/icons/widgets/line-chart/point-deviation.svg',
                width: 9.2,
                height: 8,
                widthOffset: -4.6,
                heightOffset: -5,
                class: 'point point_deviation',
            },
            trend: {
                class: 'line line_limit',
            },
        },
        upperLimit: {
            point: {
                iconUrl: 'assets/icons/widgets/line-chart/point-deviation.svg',
                width: 9.2,
                height: 8,
                widthOffset: -4.6,
                heightOffset: -5,
                class: 'point point_deviation',
            },
            trend: {
                class: 'line line_limit',
            },
        },
    };
    deviationPoints: any;

    ngOnInit() {}

    @HostListener('document:resize', ['$event'])
    OnResize(event) {
        if (this.dataChart) {
            this.draw(this.dataChart);
        }
    }

    private draw(data) {
        if (this.svg) {
            this.svg.remove();
        }

        this.data = this.buildData(data);
        this.deviationMode = this.refreshDeviations();
        this.startChart();
    }

    private buildData(data) {
        const xMax = d3Array.max(data.graphs, (c) => d3Array.max(c.values, (d) => d.date));
        const xMin = d3Array.min(data.graphs, (c) => d3Array.min(c.values, (d) => d.date));
        data.graphs
            .filter((x) => x.graphType !== 'fact')
            .forEach((g) => {
                this.fillToXMAx(g.values, xMax);
                this.fillToXMin(g.values, xMin);
            });
        return data;
    }

    private fillToXMAx(values, xMax) {
        const latest = values.slice().reverse()[0];
        const xMaxDate = new Date(xMax);
        if (latest && new Date(latest.date).getTime() !== xMaxDate.getTime()) {
            return values.push({ value: latest.value, date: xMax });
        }
    }

    private fillToXMin(values, xMin) {
        const earliest = values.slice()[0];
        const xMinDate = new Date(xMin);
        if (earliest && new Date(earliest.date).getTime() !== xMinDate.getTime()) {
            return values.unshift({ value: earliest.value, date: xMin });
        }
    }

    private startChart() {
        const upperLimit = this.data.graphs.find((d) => d.graphType === 'upperLimit');
        const lowerLimit = this.data.graphs.find((d) => d.graphType === 'lowerLimit');

        this.initChart();
        this.refreshDomains();
        this.refreshLines();
        this.drawAxis();
        this.drawGridLines();

        if (this.deviationMode === 'limits') {
            this.drawLimitsAreas(upperLimit, lowerLimit);
        } else {
            this.deleteLimitsData();
        }

        this.drawPath();
        this.drawPoints();
    }

    private extractByName(graphs: LineChartGraph[], graphTypeName: string): LineChartGraphValue[] {
        const found = graphs.find((d) => d.graphType === graphTypeName);
        return found != null ? found.values : [];
    }

    private refreshDeviations() {
        const plan = this.extractByName(this.data.graphs, 'plan');
        const fact = this.extractByName(this.data.graphs, 'fact');
        const lowerLimit = this.extractByName(this.data.graphs, 'lowerLimit');
        const upperLimit = this.extractByName(this.data.graphs, 'upperLimit');

        let deviationMode = 'planFact';
        if (lowerLimit?.length > 0 || upperLimit?.length > 0) {
            deviationMode = 'limits';
        }

        this.deviationPoints = {
            graphType: 'deviation',
            values: fact.reduce(
                (acc, d, i) => {
                    switch (deviationMode) {
                        case 'planFact':
                            const planvalue = plan
                                .slice()
                                .reverse()
                                .find(
                                    (p) => new Date(p.date).getTime() <= new Date(d.date).getTime()
                                );
                            if (planvalue && planvalue.value < d.value) {
                                acc.values.push(d);
                            }
                            break;
                        case 'limits':
                            const ul = upperLimit
                                .slice()
                                .reverse()
                                .find(
                                    (p) => new Date(p.date).getTime() <= new Date(d.date).getTime()
                                );
                            if (ul && ul.value < d.value) {
                                acc.values.push(d);
                            }

                            const li = lowerLimit
                                .slice()
                                .reverse()
                                .find(
                                    (p) => new Date(p.date).getTime() <= new Date(d.date).getTime()
                                );
                            if (li && li.value > d.value) {
                                acc.values.push(d);
                            }
                            break;
                    }
                    return acc;
                },
                { values: [] }
            ).values,
        };
        return deviationMode;
    }

    private deleteLimitsData() {
        const ulIndex = this.data.graphs.findIndex((d) => d.graphType === 'upperLimit');
        if (ulIndex !== -1) {
            this.data.graphs.splice(ulIndex, 1);
        }
        const llIndex = this.data.graphs.findIndex((d) => d.graphType === 'lowerLimit');
        if (llIndex !== -1) {
            this.data.graphs.splice(llIndex, 1);
        }
    }

    private refreshDomains() {
        this.x = d3Scale.scaleTime().range([0, this.width - 60]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);

        if (this.data.graphs.find((d) => d.graphType === 'plan')) {
            this.x.domain(
                d3Array.extent(
                    this.data.graphs.map((v) => v.values.map((v) => v.date))[1],
                    (d: Date) => d
                )
            );
        } else {
            this.x.domain(
                d3Array.extent(
                    this.data.graphs.map((v) => v.values.map((v) => v.date))[0],
                    (d: Date) => d
                )
            );
        }

        const yMin = d3Array.min(this.data.graphs, (c) => d3Array.min(c.values, (d) => d.value));
        const yMax = d3Array.max(this.data.graphs, (c) => d3Array.max(c.values, (d) => d.value));
        const offset = (yMax - yMin) * 0.15;

        this.y.domain([yMin - offset, yMax + offset]).nice();
    }

    private refreshLines() {
        if (!this.options) return;

        this.lines = {
            plan: d3Shape
                .line()
                .curve(d3Shape[this.options.planLineType])
                .x((d: any) => this.x(d.date))
                .y((d: any) => this.y(d.value)),
            fact: d3Shape
                .line()
                .curve(d3Shape[this.options.factLineType])
                .x((d: any) => this.x(d.date))
                .y((d: any) => this.y(d.value)),
            upperLimit: d3Shape
                .line()
                .curve(d3Shape[this.options.lowerLimitLineType])
                .x((d: any) => this.x(d.date))
                .y((d: any) => this.y(d.value)),
            lowerLimit: d3Shape
                .line()
                .curve(d3Shape[this.options.upperLimitLineType])
                .x((d: any) => this.x(d.date))
                .y((d: any) => this.y(d.value)),
        };
    }

    private initChart() {
        const element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        this.heightNoMargins = element.offsetHeight;

        const minWidth = 350;
        if (minWidth > this.width) {
            this.width = minWidth;
        }

        this.svg = d3
            .select(element)
            .append('svg')
            .attr('width', this.width)
            .attr('height', element.offsetHeight);
        this.g = this.svg
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    private makeXGridLines() {
        return d3Axis.axisBottom(this.x).ticks(5);
    }

    private makeYGridLines() {
        return d3Axis.axisLeft(this.y).ticks(3);
    }

    private drawAxis(): void {
        let locale = d3.timeFormatLocale({
            dateTime: '%A, %e %B %Y г. %X',
            date: '%d.%m.%Y',
            time: '%H:%M:%S',
            periods: ['', ''],
            days: [
                'воскресенье',
                'понедельник',
                'вторник',
                'среда',
                'четверг',
                'пятница',
                'суббота',
            ],
            shortDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
            ],
            shortMonths: [
                'Янв',
                'Фев',
                'Мар',
                'Апр',
                'Май',
                'Июн',
                'Июл',
                'Авг',
                'Сен',
                'Окт',
                'Ноя',
                'Дек',
            ],
        });
        const formatMillisecond = locale.format('.%L'),
            formatSecond = locale.format(':%S'),
            formatMinute = locale.format('%I:%M'),
            formatHour = locale.format('%I %p'),
            formatDay = locale.format('%d %b'),
            formatWeek = locale.format('%b %d '),
            formatMonth = locale.format('%B'),
            formatYear = locale.format('%Y');

        function multiFormat(date) {
            return (d3.timeSecond(date) < date
                ? formatMillisecond
                : d3.timeMinute(date) < date
                    ? formatSecond
                    : d3.timeHour(date) < date
                        ? formatMinute
                        : d3.timeDay(date) < date
                            ? formatHour
                            : d3.timeMonth(date) < date
                                ? d3.timeWeek(date) < date
                                    ? formatDay
                                    : formatWeek
                                : d3.timeYear(date) < date
                                    ? formatMonth
                                    : formatYear)(date);
        }
        // let RU = d3.timeFormatDefaultLocale(ru_RU);
        this.g
            .append('g')
            .attr('class', 'axis x-axis')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(
                d3Axis
                    .axisBottom(this.x)
                    .ticks(7)
                    .tickFormat(multiFormat)
            );

        this.g
            .append('g')
            .attr('class', 'axis y-axis')
            .call(
                d3Axis
                    .axisLeft(this.y)
                    .ticks(7)
                    .tickFormat((d) => {
                        return d3Format.format('.1f')(d);
                    })
            );
    }

    private drawGridLines() {
        this.g
            .append('g')
            .selectAll('grid')
            .attr('class', 'grid')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(
                this.makeXGridLines()
                    .tickSize(-this.height)
                    .tickFormat('')
            )
            .call((g) => g.select('.domain').remove())
            .call((g) =>
                g
                    .selectAll('.tick line')
                    .style('stroke', 'rgba(97,101,128, .5)')
                    .style('stroke-width', '0.5')
            );

        this.g
            .append('g')
            .attr('class', 'grid')
            .call(
                this.makeYGridLines()
                    .tickSize(-this.width)
                    .tickFormat('')
            )
            .call((g) => g.select('.domain').remove())
            .call((g) =>
                g
                    .selectAll('.tick line')
                    .style('stroke', 'rgba(220,220,220, .25)')
                    .style('stroke-width', '0.5')
            );
    }

    private drawPath() {
        const trend = this.g
            .selectAll('.trend')
            .data(this.data.graphs)
            .enter()
            .append('g')
            .attr('class', 'trend');

        trend
            .append('path')
            .attr('d', (d) => this.lines[d.graphType](d.values))
            .attr('class', (d) => this.trendsStyle[d.graphType].trend.class);
    }

    private drawPoints() {
        const points = this.g
            .selectAll('.point')
            .data([
                ...this.data.graphs.filter((d) => d.graphType === 'plan' || d.graphType === 'fact'),
                this.deviationPoints,
            ])
            .enter()
            .append('g');
        points
            .selectAll('.point')
            .data((d) =>
                d.values.map((i) => {
                    i.type = d.graphType;
                    return i;
                })
            )
            .enter()
            .append('svg:image')
            .attr('width', (d) => this.trendsStyle[d.type].point.width)
            .attr('height', (d) => this.trendsStyle[d.type].point.height)
            .attr('x', (d) => this.x(d.date) + this.trendsStyle[d.type].point.widthOffset)
            .attr('y', (d) => this.y(d.value) + this.trendsStyle[d.type].point.heightOffset)
            .attr('xlink:href', (d) => this.trendsStyle[d.type].point.iconUrl)
            .attr('class', 'point')
            .attr('class', (d) => this.trendsStyle[d.type].point.class);
    }

    private drawLimitsAreas(upperLimit, lowerLimit) {
        if (upperLimit) {
            const upperLimitArea = d3Shape
                .area()
                .curve(d3Shape[this.options['upperLimitLineType']])
                .x((d) => this.x(d.date))
                .y0((d) => 0)
                .y1((d) => this.y(d.value));

            const upperLimitSource = this.g
                .selectAll('.limit-area')
                .data([upperLimit])
                .enter()
                .append('g');

            upperLimitSource
                .append('path')
                .attr('d', (d) => {
                    return upperLimitArea(d.values);
                })
                .attr('class', 'upper-limit-area')
                .attr('fill', 'url(#upper-limit-gradient-' + this.position + ')');

            const upperLimitGradient = upperLimitSource
                .append('g')
                .append('linearGradient')
                .attr('class', 'gradient')
                .attr('id', 'upper-limit-gradient-' + this.position)
                .attr('x1', '0%')
                .attr('x2', '0%')
                .attr('y1', '0%')
                .attr('y2', '100%');

            upperLimitGradient
                .append('stop')
                .attr('offset', '0%')
                .attr('stop-color', 'transparent');

            upperLimitGradient
                .append('stop')
                .attr('offset', '50%')
                .attr('stop-color', 'rgba(255,255,255,0.015');
        }

        if (lowerLimit) {
            const lowerLimitArea = d3Shape
                .area()
                .curve(d3Shape[this.options['lowerLimitLineType']])
                .x((d) => this.x(d.date))
                .y0((d) => this.height)
                .y1((d) => this.y(d.value));

            const lowerLimitSource = this.g
                .selectAll('.limit-area')
                .data([lowerLimit])
                .enter()
                .append('g');

            lowerLimitSource
                .append('path')
                .attr('d', (d) => {
                    return lowerLimitArea(d.values);
                })
                .attr('class', 'lower-limit-area')
                .attr('fill', 'url(#lower-limit-gradient-' + this.position + ')');

            const lowerLimitGradient = lowerLimitSource
                .append('g')
                .append('linearGradient')
                .attr('id', 'lower-limit-gradient-' + this.position)
                .attr('x1', '0%')
                .attr('x2', '0%')
                .attr('y1', '0%')
                .attr('y2', '100%');

            lowerLimitGradient
                .append('stop')
                .attr('offset', '50%')
                .attr('stop-color', 'rgba(255,255,255,0.015');

            lowerLimitGradient
                .append('stop')
                .attr('offset', '100%')
                .attr('stop-color', 'transparent');
        }
    }

    public getLastGraphValue(graphType: string): number {
        const graph = this.data?.graphs?.find((d) => d.graphType === graphType) ?? null;
        if (!(graph?.values?.length > 0)) {
            return null;
        }
        return graph.values[graph.values.length - 1]?.value ?? null;
    }
}
