import {
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    ElementRef,
    HostListener,
    SimpleChanges,
    OnChanges, OnInit, Input
} from "@angular/core";
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';
import { IChartD3 } from "@shared/interfaces/smart-scroll.model";
import { AsyncRender } from "@shared/functions/async-render.function";
import { ISuutpLineChart } from '../suutp-charts.interface';

@Component({
  selector: 'evj-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent implements OnInit, OnChanges {
    @Input() data: ISuutpLineChart[];
    @ViewChild('chart', { static: true }) private chart: ElementRef;

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.drawSvg();
    }
    // tslint:disable-next-line:typedef
    private svg;

    private graphMaxY: number = 0;
    private graphMinY: number = 0;

    public size: { width: number | null; height: number | null } = { width: null, height: null };

    public sizeX: { min: number; max: number } = { min: 0, max: 0 }; // минимальная и максимальная даты с графиков

    public sizeY: { min: number; max: number } = { min: 0, max: 0 }; // пока что 0 и 100, ось y - это проценты
    // tslint:disable-next-line:no-any
    public scaleFuncs: { x: any; y: any } = { x: null, y: null };

    private readonly padding: { top: number; right: number; bottom: number; left: number } = {
        top: 10,
        right: 17,
        bottom: 43,
        left: 62,
    };
    // tslint:disable-next-line:no-any
    private curve: Selection;

    private graphData: IChartD3[] = [];

    public ngOnChanges(changes: SimpleChanges): void {
        this.drawSvg();
    }

    public ngOnInit(): void {
        this.drawSvg();
    }

    @AsyncRender
    private drawSvg(): void {
        this.findMinMax();
        this.defineScale();
        this.initSvg();
        this.transformData();
        this.drawAxises();
        this.drawCenterRect();
        this.drawGridlines();
        this.drawChart();
        this.drawMinMaxLines();
        this.drawShiftLines();
    }

  private initSvg(): void {
      if (this.svg) {
          this.svg.remove();
          this.svg = undefined;
      }

      this.svg = d3Selection.select(this.chart.nativeElement).append('svg');

      this.svg
          .attr('width', '100%')
          .attr('height', '100%')
          .attr(
              'viewBox',
              `0 0 ${this.size.width} ${this.size.height}`
          );
  }

    private findMinMax(): void {
        if (this.data) {
            const dateMax = d3.max(this.data, item => item?.date);
            const dateMin = d3.min(this.data, item => item?.date);

            this.sizeX.min = new Date(dateMin).getTime();
            this.sizeX.max = new Date(dateMax).getTime();

            const valueMax = d3.max(this.data, item => item?.value);
            const valueMin = d3.min(this.data, item => item?.value)

            this.graphMaxY = valueMax;
            this.graphMinY = valueMin;
        }
        this.sizeY.min = 0;
        this.sizeY.max = 100
    }

    private defineScale(): void {
        this.size = {
            width: this.chart.nativeElement.clientWidth,
            height: this.chart.nativeElement.clientHeight,
        };

        const domainValues = [this.sizeY.min, this.sizeY.max];
        const domainDates = [
            this.sizeX.min,
            this.sizeX.max
        ];

        const rangeY = [this.size.height - this.padding.bottom, this.padding.top];
        const rangeX = [this.padding.left, this.size.width - this.padding.right];

        this.scaleFuncs.x = d3
            .scaleTime()
            .domain(domainDates)
            .rangeRound(rangeX);
        this.scaleFuncs.y = d3
            .scaleLinear()
            .domain(domainValues)
            .range(rangeY);
    }

    private transformData(): void {
    this.graphData = [];
    this.data?.forEach((item) => {
            this.graphData.push({
                x: this.scaleFuncs.x(new Date(item.date)),
                y: this.scaleFuncs.y(item.value),
            })
        })
    }

    private drawChart(): void {
        const curve = d3.curveLinear;
        const line = d3
            .line()
            .x((item: IChartD3) => item.x)
            .y((item: IChartD3) => item.y)
            .curve(curve);
        this.curve = this.svg.append('path').attr('class', `line-graph`).attr('d', line(this.graphData));
    }

    private drawAxises(): void {
        // x
        const xAxis = this.svg
            .append('g')
            .attr('transform', `translate(0, ${this.size.height - this.padding.bottom})`) // +5 - дополнительный отступ?
            .attr('class', 'x-axis')
            .call(
                d3.axisBottom(this.scaleFuncs.x).tickSize(0).ticks(25).tickFormat(d3.timeFormat('%H:%M'))
            )
            .call((g) => g.select('.domain').remove())

        // y
        this.svg
            .append('g')
            .attr('transform', `translate(${this.padding.left}, 0)`)
            .attr('class', 'y-axis')
            .call(d3.axisLeft(this.scaleFuncs.y).tickSize(0).ticks(6).tickFormat(x => `${x}%`))
            .call((g) => g.select('.domain').remove())

        // Увеличиваем отступ для текста тиков по осям
        xAxis
            .selectAll("g.tick text")
            .attr("y", 10)
    }

    private drawCenterRect(): void {
        this.svg
            .append("g")
            .attr("transform", `translate(${this.padding.left}, 0)`)
            .append('rect')
            .attr('class', 'center-rect')
            .attr('x', 0)
            .attr('y', this.scaleFuncs.y(80))
            .attr('width', this.size.width - this.padding.left)
            .attr('height', this.scaleFuncs.y(17) - this.scaleFuncs.y(80)) // пока что нет логики для высоты этого прямоугольника
            .attr("fill", "var(--chart-limits-area-color)")
    }

    private drawGridlines(): void {
        const xGrid = this.svg
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0, ${this.size.height - this.padding.bottom})`)
            .call(
                d3
                    .axisBottom(this.scaleFuncs.x)
                    .ticks(25)
                    .tickSize(1 - (this.size.height - this.padding.bottom - this.padding.top))
                    .tickFormat('')
            )

        const yGrid = this.svg
            .append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(${this.padding.left},0)`)
            .call(
                d3
                    .axisLeft(this.scaleFuncs.y)
                    .ticks(10)
                    .tickSize(1 - (this.size.width - this.padding.left - this.padding.right))
                    .tickFormat('')
            )

        xGrid
            .select("g.tick line")
            .attr("stroke", "var(--chart-axes-color)")
        yGrid
            .select("g.tick line")
            .attr("stroke", "var(--chart-axes-color)")
    }

    private drawMinMaxLines(): void {
      const linesG = this.svg
          .append('g')
          .attr('class', 'lines')
          .attr('opacity', 1)
          .style('color', 'var(--chart-limits-color)')
          .style('stroke', 'currentColor')
          .style('stroke-dasharray', "2,2")
          .style('stroke-width', '1px')

      linesG
          .append('line')
          .attr('class', 'line-minimum-value')
          .attr('x1', this.padding.left)
          .attr('x2', this.size.width)
          .attr('y1', this.scaleFuncs.y(this.graphMinY))
          .attr('y2', this.scaleFuncs.y(this.graphMinY))

      linesG
          .append("line")
          .attr('class', 'line-maximum-value')
          .attr('x1', this.padding.left)
          .attr('x2', this.size.width)
          .attr('y1', this.scaleFuncs.y(this.graphMaxY))
          .attr('y2', this.scaleFuncs.y(this.graphMaxY))
    };

    private drawShiftLines(): void {
        // находить смены для графиков по-другому, так сейчас должны совпадать месяц, год и день, чтобы линия смены отобразилась
        const firstShift = new Date("2020-02-02T05:00:00.000Z");
        const secondShift = new Date("2020-02-01T17:00:00.000Z");

        const shiftLinesG = this.svg
            .append('g')
            .attr('class', 'shift-lines')
            .attr('opacity', 1)
            .style('color', 'var(--chart-shift-lines-color)')
            .style('stroke', 'currentColor')
            .style('stroke-width', '1px')

        shiftLinesG
            .append('line')
            .attr('class', 'shift-line')
            .attr('x1', this.scaleFuncs.x(firstShift.getTime()))
            .attr('x2', this.scaleFuncs.x(firstShift.getTime()))
            .attr('y1', this.scaleFuncs.y(this.sizeY.min))
            .attr('y2', this.scaleFuncs.y(this.sizeY.max))

        shiftLinesG
            .append('line')
            .attr('class', 'shift-line')
            .attr('x1', this.scaleFuncs.x(secondShift.getTime()))
            .attr('x2', this.scaleFuncs.x(secondShift.getTime()))
            .attr('y1', this.scaleFuncs.y(this.sizeY.min))
            .attr('y2', this.scaleFuncs.y(this.sizeY.max))

        shiftLinesG
            .append("path")
            .attr("d", d3.symbol().type(d3.symbolTriangle).size(20))
            .attr("transform", () => `translate(${this.scaleFuncs.x(firstShift.getTime())}, ${this.scaleFuncs.y(this.sizeY.min)})`)
            .style("fill", "currentColor");

        shiftLinesG
            .append("path")
            .attr("d", d3.symbol().type(d3.symbolTriangle).size(20))
            .attr("transform", () => `translate(${this.scaleFuncs.x(firstShift.getTime())}, ${this.scaleFuncs.y(this.sizeY.max)}) rotate(180)`)
            .style("fill", "currentColor");

        shiftLinesG
            .append("path")
            .attr("d", d3.symbol().type(d3.symbolTriangle).size(20))
            .attr("transform", () => `translate(${this.scaleFuncs.x(secondShift.getTime())}, ${this.scaleFuncs.y(this.sizeY.min)})`)
            .style("fill", "currentColor");

        shiftLinesG
            .append("path")
            .attr("d", d3.symbol().type(d3.symbolTriangle).size(20))
            .attr("transform", () => `translate(${this.scaleFuncs.x(secondShift.getTime())}, ${this.scaleFuncs.y(this.sizeY.max)}) rotate(180)`)
            .style("fill", "currentColor");
    }
}
