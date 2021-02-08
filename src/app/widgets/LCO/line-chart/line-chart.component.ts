import { Component, ElementRef, OnDestroy, ViewChild, Inject, HostListener, OnInit } from '@angular/core';

import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Format from 'd3-format';
import { Mock } from 'src/app/widgets/LCO/line-chart/mock';
import { Subscription } from 'rxjs';
import { LineChartData, LineChartGraph, LineChartGraphValue } from '../../../dashboard/models/line-chart';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'evj-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public position?: string = 'default';

    public data: LineChartData;

    public paths: {
        fact: any;
        plan: any;
        lowerLimit: any;
        upperLimit: any;
    } = {
        fact: null,
        plan: null,
        lowerLimit: null,
        upperLimit: null,
    };

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
    dataLine;
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

    constructor(
        public widgetService: WidgetService,
        private http: HttpClient,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
        if (this.dataLine) {
            this.draw(this.dataLine);
        }
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataConnect(): void {
        super.dataConnect();
        if (this.dataLine) {
            this.draw(this.dataLine);
        }
    }

    protected dataDisconnect(): void {
        this.disableLiveData();
    }

    protected async dataHandler(ref: any): Promise<void> {
        // const tempData: any = await this.http.get(`assets/mock/LineChartMock/ws.json`).toPromise();
        // this.dataLine = tempData.data;
        this.dataLine = ref;
        this.dataLine.graphs.map((x) => x.values.map((z) => (z.date = new Date(z.date))));
        this.draw(this.dataLine);
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        if (this.dataLine) {
            this.draw(this.dataLine);
        }
    }

    private enableLiveData() {
        // TODO добавить получение типа графика
        this.subscriptions.push(
            this.widgetService.getWidgetLiveDataFromWS(this.id, 'line-chart').subscribe((ref) => {
                this.dataLine = ref;
                this.dataLine.graphs.map((x) => x.values.map((z) => (z.date = new Date(z.date))));
                this.draw(this.dataLine);
            })
        );
    }

    private disableLiveData(): void {
        this.draw(Mock);
    }

    private draw(data): void {
        if (!this.widgetOptions) {
            return;
        }

        if (this.svg) {
            this.svg.remove();
        }

        this.data = this.buildData(data);
        this.deviationMode = this.refreshDeviations();
        this.startChart();
    }

    private buildData(data): any {
        const xMax = d3.max(data.graphs, (c) => d3.max(c.values, (d) => d.date));
        const xMin = d3.min(data.graphs, (c) => d3.min(c.values, (d) => d.date));
        data.graphs
            .filter((x) => x.graphType !== 'fact')
            .forEach((g) => {
                this.fillToXMAx(g.values, xMax);
                this.fillToXMin(g.values, xMin);
            });

        return data;
    }

    private fillToXMAx(values, xMax): any {
        const latest = values.slice().reverse()[0];
        if (latest?.date?.getTime() !== xMax?.getTime()) {
            return values.push({ value: latest.value, date: xMax });
        }
        // return values.push({ value: 0, date: xMax });
    }

    private fillToXMin(values, xMin): any {
        const first = values[0];
        if (first?.date?.getTime() !== xMin?.getTime()) {
            return values.unshift({ value: first.value, date: xMin });
        }
        // return values.push({ value: 0, date: xMin });
    }

    private startChart(): void {
        // const plan = this.data.graphs.find(d => d.graphType === 'plan');
        // const fact = this.data.graphs.find(d => d.graphType === 'fact');
        const upperLimit = this.data.graphs.find((d) => d.graphType === 'upperLimit');
        const lowerLimit = this.data.graphs.find((d) => d.graphType === 'lowerLimit');
        const fact = this.data.graphs.filter((d) => d.graphType === 'fact');

        this.initChart();
        this.refreshDomains();
        this.refreshLines();
        this.drawAxis();
        this.drawGridLines();

        if (this.deviationMode === 'limits') {
            this.drawLimitsAreas(upperLimit, lowerLimit);
            this.drawDeviationGradient(fact[0].values);
            // this.drawLimitsDeviationAreas(upperLimit, lowerLimit, fact);
        } else {
            this.deleteLimitsData();
            // this.drawDeviationAreas(plan, fact);
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
        if (
            plan.findIndex(
                (p) =>
                    lowerLimit.findIndex((ll) => ll.value !== p.value) !== -1 ||
                    upperLimit.findIndex((ll) => ll.value !== p.value) !== -1
            ) !== -1
        ) {
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
                                .find((p) => new Date(p.date).getTime() <= new Date(d.date).getTime());
                            if (planvalue && planvalue.value < d.value) {
                                acc.values.push(d);
                            }
                            break;
                        case 'limits':
                            const ul = upperLimit
                                .slice()
                                .reverse()
                                .find((p) => new Date(p.date).getTime() <= new Date(d.date).getTime());
                            if (ul && ul.value < d.value) {
                                acc.values.push(d);
                            }

                            const li = lowerLimit
                                .slice()
                                .reverse()
                                .find((p) => new Date(p.date).getTime() <= new Date(d.date).getTime());
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

    private deleteLimitsData(): void {
        const ulIndex = this.data.graphs.findIndex((d) => d.graphType === 'upperLimit');
        if (ulIndex !== -1) {
            this.data.graphs.splice(ulIndex, 1);
        }
        const llIndex = this.data.graphs.findIndex((d) => d.graphType === 'lowerLimit');
        if (llIndex !== -1) {
            this.data.graphs.splice(llIndex, 1);
        }
    }

    private refreshDomains(): void {
        this.x = d3Scale.scaleTime().range([0, this.width - 60]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);

        if (this.data.graphs.find((d) => d.graphType === 'plan')) {
            this.x.domain(d3Array.extent(this.data.graphs.map((v) => v.values.map((v) => v.date))[1], (d: Date) => d));
        } else {
            this.x.domain(d3Array.extent(this.data.graphs.map((v) => v.values.map((v) => v.date))[0], (d: Date) => d));
        }

        const yMin = d3Array.min(this.data.graphs, (c) => d3Array.min(c.values, (d) => d.value));
        const yMax = d3Array.max(this.data.graphs, (c) => d3Array.max(c.values, (d) => d.value));
        const offset = (yMax - yMin) * 0.15;

        this.y.domain([yMin - offset, yMax + offset]).nice();
    }

    private refreshLines() {
        if (!this.widgetOptions) return;

        this.lines = {
            plan: d3Shape
                .line()
                .curve(d3Shape[this.widgetOptions.planLineType])
                .x((d: any) => this.x(d.date))
                .y((d: any) => this.y(d.value)),
            fact: d3Shape
                .line()
                .curve(d3Shape[this.widgetOptions.factLineType])
                .x((d: any) => this.x(d.date))
                .y((d: any) => this.y(d.value)),
            upperLimit: d3Shape
                .line()
                .curve(d3Shape[this.widgetOptions.lowerLimitLineType])
                .x((d: any) => this.x(d.date))
                .y((d: any) => this.y(d.value)),
            lowerLimit: d3Shape
                .line()
                .curve(d3Shape[this.widgetOptions.upperLimitLineType])
                .x((d: any) => this.x(d.date))
                .y((d: any) => this.y(d.value)),
        };

        // this.line = d3Shape.line()
        //   .curve(d3Shape['curveMonotoneX'])
        //   .x((d: any) => this.x(d.date))
        //   .y((d: any) => this.y(d.value));
    }

    private initChart(): void {
        const element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        this.heightNoMargins = element.offsetHeight;

        const minWidth = 350;
        if (minWidth > this.width) {
            this.width = minWidth;
        }

        this.svg = d3Selection
            .select(element)
            .append('svg')
            .attr('width', this.width)
            .attr('height', element.offsetHeight);
        this.g = this.svg.append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
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
            days: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
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
            shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
        let formatMillisecond = locale.format('.%L'),
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

    private drawGridLines(): void {
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

    private drawPath(): void {
        const line = d3
            .line()
            .x((d) => this.x(d.date))
            .y((d) => this.y(d.value))
            .curve(d3.curveLinear);

        this.data.graphs.forEach((graph) => {
            const path = this.g
                .append('path')
                .datum(graph.values)
                .attr('d', line)
                .attr('class', this.trendsStyle[graph.graphType].trend.class)
                .attr('id', graph.graphType);
            this.paths[graph.graphType] = path;
        });
    }

    private drawPoints(): void {
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

    private drawLimitsAreas(upperLimit, lowerLimit): void {
        const upperLimitArea = d3Shape
            .area()
            .curve(d3Shape[this.widgetOptions['upperLimitLineType']])
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

        const lowerLimitArea = d3Shape
            .area()
            .curve(d3Shape[this.widgetOptions['lowerLimitLineType']])
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

    private drawDeviationGradient(fact: { date: Date; value: number }[]): void {
        const upperDataset = [];
        const lowerDataset = [];
        let tempUpper = [];
        let tempLower = [];

        fact.forEach((item) => {
            if (this.paths.upperLimit?.node().getPointAtLength(this.x(item.date)).y > this.y(item.value)) {
                tempUpper.push({
                    date: this.x(item.date),
                    y0: this.paths.upperLimit?.node().getPointAtLength(this.x(item.date)).y,
                    y1: this.y(item.value),
                });
            } else if (this.paths.upperLimit?.node().getPointAtLength(this.x(item.date)).y <= this.y(item.value)) {
                if (tempUpper.length) {
                    upperDataset.push(tempUpper);
                    tempUpper = [];
                }
            }

            if (this.paths.lowerLimit?.node().getPointAtLength(this.x(item.date)).y < this.y(item.value)) {
                tempLower.push({
                    date: this.x(item.date),
                    y0: this.paths.lowerLimit?.node().getPointAtLength(this.x(item.date)).y,
                    y1: this.y(item.value),
                });
            } else if (this.paths.lowerLimit?.node().getPointAtLength(this.x(item.date)).y >= this.y(item.value)) {
                if (tempLower.length) {
                    lowerDataset.push(tempLower);
                    tempLower = [];
                }
            }
        });

        const upperGradientParams: {
            id: string;
            class1: string;
            class2: string;
        } = {
            id: 'line-upper-deviation-gradient',
            class1: 'line-upper-deviation-gradient-stop-1',
            class2: 'line-upper-deviation-gradient-stop-2',
        };
        this.appendGradient(upperGradientParams);
        upperDataset.forEach((item) => {
            this.appendArea(item, `fill: url(#${upperGradientParams.id})`);
        });

        const lowerGradientParams: {
            id: string;
            class1: string;
            class2: string;
        } = {
            id: 'line-lower-deviation-gradient',
            class1: 'line-lower-deviation-gradient-stop-1',
            class2: 'line-lower-deviation-gradient-stop-2',
        };
        this.appendGradient(lowerGradientParams);
        lowerDataset.forEach((item) => {
            this.appendArea(item, `fill: url(#${lowerGradientParams.id})`);
        });
    }

    private appendArea(dataset: { date: Date; y1: number; y0: number }[], style: string): void {
        const area = d3
            .area()
            .x((d) => d.date)
            .y1((d) => d.y1)
            .y0((d) => d.y0);

        this.g
            .append('path')
            .datum(dataset)
            .attr('style', `${style}`)
            .attr('d', area);
    }

    private appendGradient(params: { id: string; class1: string; class2: string }): void {
        const grad = this.g
            .append('defs')
            .append('linearGradient')
            .attr('id', `${params.id}`)
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%');

        grad.append('stop')
            .attr('offset', `0%`)
            .attr('class', `${params.class1}`);

        grad.append('stop')
            .attr('offset', `100%`)
            .attr('class', `${params.class2}`);
    }

    // private drawLimitsDeviationAreas(upperLimit, lowerLimit, fact) {
    //
    //   const upperLimitClipPathArea = d3Shape.area()
    //     .curve(d3Shape[this.widgetOptions['upperLimitLineType']])
    //     .x(d => this.x(d.date))
    //     .y0(d => {
    //       return this.y(this.heightNoMargins);
    //     })
    //     .y1(d => this.y(d.value));
    //
    //
    //   const upperLimitClipPathSoruce = this.g.selectAll(".area")
    //     .data([upperLimit])
    //     .enter()
    //     .append("g");
    //
    //   upperLimitClipPathSoruce
    //     .append("clipPath")
    //     .attr('id', 'upperLimitClipPathArea-' + this.position)
    //     .attr('class', 'area')
    //     .append("path")
    //     .attr("d", d => {
    //       return upperLimitClipPathArea(d.values);
    //     });
    //
    //   const upperLimitArea = d3Shape.area()
    //     .curve(d3Shape[this.widgetOptions['factLineType']])
    //     .x(d => this.x(d.date))
    //     .y0(d => {
    //       return this.y(0);
    //     })
    //     .y1(d => this.y(d.value));
    //
    //
    //   const upperLimitSource = this.g.selectAll(".limit-area")
    //     .data([fact])
    //     .enter()
    //     .append("g");
    //
    //
    //   upperLimitSource.append("path")
    //     .attr("d", d => {
    //       return upperLimitArea(d.values);
    //     })
    //     .attr('class', 'upper-limit-area')
    //
    //     .attr("fill", 'url(#upper-limit-deviation-gradient-' + this.position + ')')
    //     .attr("clip-path", 'url(#upperLimitClipPathArea-' + this.position + ')');
    //
    //
    //   const upperLimitGradient = upperLimitSource
    //     .append("g")
    //     .append('linearGradient')
    //     .attr('class', 'gradient')
    //     .attr('id', 'upper-limit-deviation-gradient-' + this.position)
    //     .attr('x1', "0%")
    //     .attr('x2', "0%")
    //     .attr('y1', "0%")
    //     .attr('y2', "100%");
    //
    //   upperLimitGradient.append('stop')
    //     .attr('offset', "0")
    //     .attr('stop-color', "rgba(244, 163, 33, 0.2)");
    //
    //   upperLimitGradient.append('stop')
    //     .attr('offset', "50%")
    //     .attr('stop-color', "transparent");
    //
    //
    //   const lowerLimitClipPathArea = d3Shape.area()
    //     .curve(d3Shape[this.widgetOptions['lowerLimitLineType']])
    //     .x(d => this.x(d.date))
    //     .y0(d => {
    //       return this.y(0);
    //     })
    //     .y1(d => this.y(d.value));
    //
    //
    //   const lowerLimitClipPathSoruce = this.g.selectAll(".l-area")
    //     .data([lowerLimit])
    //     .enter()
    //     .append("g");
    //
    //   lowerLimitClipPathSoruce
    //     .append("clipPath")
    //     .attr('id', 'lowerLimitClipPathArea-' + this.position)
    //     .attr('class', 'area')
    //     .append("path")
    //     .attr("d", d => {
    //       return lowerLimitClipPathArea(d.values);
    //     });
    //
    //
    //   const lowerLimitArea = d3Shape.area()
    //     .curve(d3Shape[this.widgetOptions['factLineType']])
    //     .x(d => this.x(d.date))
    //     .y0(d => 0)
    //     .y1(d => this.y(d.value));
    //
    //   const lowerLimitSource = this.g.selectAll(".limit-area")
    //     .data([fact])
    //     .enter()
    //     .append("g");
    //
    //   lowerLimitSource.append("path")
    //     .attr("d", d => {
    //       return lowerLimitArea(d.values);
    //     })
    //     .attr('class', 'lower-limit-area')
    //     .attr("clip-path", 'url(#lowerLimitClipPathArea-' + this.position + ')')
    //     .attr("fill", 'url(#lower-limit-deviation-gradient-' + this.position + ')');
    //
    //
    //   const lowerLimitGradient = lowerLimitSource
    //     .append("g")
    //     .append('linearGradient')
    //     .attr('id', 'lower-limit-deviation-gradient-' + this.position)
    //     .attr('x1', "0%")
    //     .attr('x2', "0%")
    //     .attr('y1', "0%")
    //     .attr('y2', "100%");
    //
    //   lowerLimitGradient.append('stop')
    //     .attr('offset', "50%")
    //     .attr('stop-color', "transparent");
    //
    //   lowerLimitGradient.append('stop')
    //     .attr('offset', "100%")
    //     .attr('stop-color', "rgba(244, 163, 33, 0.2)");
    //
    // }
    // private drawLimitsDeviationAreas(upperLimit, lowerLimit, fact) {
    //
    //   const upperLimitClipPathArea = d3Shape.area()
    //     .curve(d3Shape[this.widgetOptions['upperLimitLineType']])
    //     .x(d => this.x(d.date))
    //     .y0(d => {
    //       return this.y(this.heightNoMargins);
    //     })
    //     .y1(d => this.y(d.value));
    //
    //
    //   const upperLimitClipPathSoruce = this.g.selectAll(".area")
    //     .data([upperLimit])
    //     .enter()
    //     .append("g");
    //
    //   upperLimitClipPathSoruce
    //     .append("clipPath")
    //     .attr('id', 'upperLimitClipPathArea-' + this.position)
    //     .attr('class', 'area')
    //     .append("path")
    //     .attr("d", d => {
    //       return upperLimitClipPathArea(d.values);
    //     });
    //
    //   const upperLimitArea = d3Shape.area()
    //     .curve(d3Shape[this.widgetOptions['factLineType']])
    //     .x(d => this.x(d.date))
    //     .y0(d => {
    //       return this.y(0);
    //     })
    //     .y1(d => this.y(d.value));
    //
    //
    //   const upperLimitSource = this.g.selectAll(".limit-area")
    //     .data([fact])
    //     .enter()
    //     .append("g");
    //
    //
    //   upperLimitSource.append("path")
    //     .attr("d", d => {
    //       return upperLimitArea(d.values);
    //     })
    //     .attr('class', 'upper-limit-area')
    //
    //     .attr("fill", 'url(#upper-limit-deviation-gradient-' + this.position + ')')
    //     .attr("clip-path", 'url(#upperLimitClipPathArea-' + this.position + ')');
    //
    //
    //   const upperLimitGradient = upperLimitSource
    //     .append("g")
    //     .append('linearGradient')
    //     .attr('class', 'gradient')
    //     .attr('id', 'upper-limit-deviation-gradient-' + this.position)
    //     .attr('x1', "0%")
    //     .attr('x2', "0%")
    //     .attr('y1', "0%")
    //     .attr('y2', "100%");
    //
    //   upperLimitGradient.append('stop')
    //     .attr('offset', "0")
    //     .attr('stop-color', "rgba(244, 163, 33, 0.2)");
    //
    //   upperLimitGradient.append('stop')
    //     .attr('offset', "50%")
    //     .attr('stop-color', "transparent");
    //
    //
    //   const lowerLimitClipPathArea = d3Shape.area()
    //     .curve(d3Shape[this.widgetOptions['lowerLimitLineType']])
    //     .x(d => this.x(d.date))
    //     .y0(d => {
    //       return this.y(0);
    //     })
    //     .y1(d => this.y(d.value));
    //
    //
    //   const lowerLimitClipPathSoruce = this.g.selectAll(".l-area")
    //     .data([lowerLimit])
    //     .enter()
    //     .append("g");
    //
    //   lowerLimitClipPathSoruce
    //     .append("clipPath")
    //     .attr('id', 'lowerLimitClipPathArea-' + this.position)
    //     .attr('class', 'area')
    //     .append("path")
    //     .attr("d", d => {
    //       return lowerLimitClipPathArea(d.values);
    //     });
    //
    //
    //   const lowerLimitArea = d3Shape.area()
    //     .curve(d3Shape[this.widgetOptions['factLineType']])
    //     .x(d => this.x(d.date))
    //     .y0(d => 0)
    //     .y1(d => this.y(d.value));
    //
    //   const lowerLimitSource = this.g.selectAll(".limit-area")
    //     .data([fact])
    //     .enter()
    //     .append("g");
    //
    //   lowerLimitSource.append("path")
    //     .attr("d", d => {
    //       return lowerLimitArea(d.values);
    //     })
    //     .attr('class', 'lower-limit-area')
    //     .attr("clip-path", 'url(#lowerLimitClipPathArea-' + this.position + ')')
    //     .attr("fill", 'url(#lower-limit-deviation-gradient-' + this.position + ')');
    //
    //
    //   const lowerLimitGradient = lowerLimitSource
    //     .append("g")
    //     .append('linearGradient')
    //     .attr('id', 'lower-limit-deviation-gradient-' + this.position)
    //     .attr('x1', "0%")
    //     .attr('x2', "0%")
    //     .attr('y1', "0%")
    //     .attr('y2', "100%");
    //
    //   lowerLimitGradient.append('stop')
    //     .attr('offset', "50%")
    //     .attr('stop-color', "transparent");
    //
    //   lowerLimitGradient.append('stop')
    //     .attr('offset', "100%")
    //     .attr('stop-color', "rgba(244, 163, 33, 0.2)");
    //
    // }

    // private drawDeviationAreas(planData, factData) {
    //   let clipPathArea = d3Shape.area()
    //     .curve(d3Shape[this.widgetOptions['planLineType']])
    //     .x(d => this.x(d.date))
    //     .y0(d => {
    //       return this.y(this.heightNoMargins);
    //     })
    //     .y1(d => this.y(d.value));
    //
    //
    //   let clipPathSource = this.g.selectAll(".area")
    //     .data([planData])
    //     .enter()
    //     .append("g");
    //
    //
    //   clipPathSource
    //     .append("clipPath")
    //     .attr('id', 'clipPathArea-' + this.position)
    //     .attr('class', 'area')
    //     .append("path")
    //     .attr("d", d => {
    //       if (d) {
    //         return clipPathArea(d.values);
    //       }
    //
    //     });
    //
    //
    //   const deviationArea = d3Shape.area()
    //     .curve(d3Shape[this.widgetOptions['factLineType']])
    //     .x(d => this.x(d.date))
    //     .y0(d => {
    //       return this.y(0);
    //     })
    //     .y1(d => this.y(d.value));
    //
    //
    //   const deviationSource = this.g.selectAll(".deviation-area")
    //     .data([factData])
    //     .enter()
    //     .append("g");
    //
    //
    //   deviationSource.append("path")
    //     .attr("d", d => {
    //       return deviationArea(d.values);
    //     })
    //     .attr('class', 'deviation-area')
    //     .attr("clip-path", 'url(#clipPathArea-' + this.position + ')')
    //     .attr("fill", 'url(#deviation-gradient)')
    //
    //
    //   const gradient = deviationSource
    //     .append("g")
    //     .append('linearGradient')
    //     .attr('id', 'deviation-gradient')
    //     .attr('x1', "0%")
    //     .attr('x2', "0%")
    //     .attr('y1', "0%")
    //     .attr('y2', "100%");
    //
    //   gradient.append('stop')
    //     .attr('offset', "0")
    //     .attr('stop-color', "rgba(244, 163, 33, 0.2)");
    //
    //   gradient.append('stop')
    //     .attr('offset', "50%")
    //     .attr('stop-color', "transparent");
    //
    //
    // }
}
