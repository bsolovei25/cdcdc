import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import * as d3 from 'd3';

export interface IBarDiagramSize {
    width: number | null;
    height: number | null;
}

export interface IBarDiagramData {
    day: number;
    planValue: number;
    factValue: number;
}

@Component({
    selector: 'evj-bar-diagram',
    templateUrl: './bar-diagram.component.html',
    styleUrls: ['./bar-diagram.component.scss']
})
export class BarDiagramComponent implements OnChanges {

    @Input()
    public size: IBarDiagramSize = null;

    @Input()
    public data: IBarDiagramData[] = [];

    public scales: { x: any; y: any } = {x: null, y: null};

    public sizeX: { min: number; max: number } = {min: 1, max: 31};

    public sizeY: { min: number; max: number } = {min: 0, max: 30};

    public margin: { top: number, right: number, bottom: number, left: number } =
        {top: 0, right: 0, bottom: 0, left: 0};

    private day: number | null = null;

    private svg: any = null;

    private g: any = null;

    private dataset: { x: number; y: number }[] = [];

    constructor(
        private hostElement: ElementRef
    ) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.size = changes.size?.currentValue ? changes.size?.currentValue : this.size;
        this.data = changes.data?.currentValue ? changes.data?.currentValue : this.data;

        this.configChartArea();
        this.prepareData();

        if (this.size.width && this.size.height) {
            this.drawSvg();
        }
    }

    private drawSvg(): void {
        this.initScale();
        this.initSvg();
        this.drawAxises();
        this.drawBackgroundCols();
        this.drawEqColumns();
        this.drawCurve();
    }

    private configChartArea(): void {
        this.sizeX.max =
            new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 0).getDate();
    }

    private prepareData(): void {
        this.dataset = [];
        let maxDay = 0;
        this.data.forEach(item => {
            if (item.factValue !== 0) {
                maxDay = item.day >= maxDay ? item.day : maxDay === 0 ? item.day : maxDay;
            }
            // добавляем координаты по ширине col, чтобы line не привязывалась к вершинам col
            this.dataset.push({x: item.day - 0.42, y: item.planValue + 0.3});
            this.dataset.push({x: item.day + 0.42, y: item.planValue + 0.3});
        });
        this.day = maxDay;
    }

    private initScale(): void {
        this.scales.x = d3.scaleLinear()
            .domain([this.sizeX.min, this.sizeX.max])
            .range([0, this.size.width - this.margin.right - this.margin.left]);

        this.scales.y = d3.scaleLinear()
            .domain([this.sizeY.min, this.sizeY.max])
            .range([this.size.height - this.margin.top - this.margin.bottom, 0]);
    }

    private initSvg(): void {
        if (this.g) {
            this.g.remove();
            this.g = undefined;
        }

        const viewBoxWidth = this.size.width + this.margin.right + this.margin.left;
        const viewBoxHeight = this.size.height + this.margin.top + this.margin.bottom;

        this.svg = d3.select(this.hostElement.nativeElement).select('svg');
        this.svg.attr('viewBox', `0 0 ${viewBoxWidth} ${viewBoxHeight}`);
        this.g = this.svg.append('g');
    }

    private drawAxises(): void {
        // x
        this.g.append('g')
            .attr('transform', `translate(0, ${this.size.height - this.margin.top - this.margin.bottom})`)
            .attr('class', 'x-axis')
            .call(d3.axisBottom(this.scales.x).tickSize(0).ticks(this.sizeX.max).tickFormat(''))
            .call(g => g.select('.domain').remove());

        // y
        this.g.append('g')
            .attr('transform', `translate(${0}, 0)`)
            .attr('class', 'y-axis')
            .call(d3.axisLeft(this.scales.y).tickSize(0).ticks(7).tickFormat(''))
            .call(g => g.select('.domain').remove());
    }

    private drawBackgroundCols(): void {
        this.g.append('g')
            .attr('transform', `translate(0, ${this.size.height - this.margin.top - this.margin.bottom})`)
            .call(d3.axisBottom(this.scales.x)
                .ticks(this.sizeX.max)
                .tickSize(1 - (this.size.height - this.margin.top - this.margin.bottom))
                .tickFormat('')
            )
            .attr('class', 'background-col');

        this.g.selectAll('.background-col line')
            .attr('class', (d, g) => {
                return g === this.day - 1 ? 'active' : 'normal';
            });
    }

    private appendRect(x: number, y: number, className: string): void {
        this.g.append('rect')
            .attr('x', this.scales.x(x) - 1.5) // смещаем rect для центрирования внутри колонки
            .attr('y', this.scales.y(y))
            .attr('width', 10)
            .attr('height', 5)
            .attr('class', className);
    }

    private drawEqColumns(): void {
        this.data.forEach(item => {
            for (let i = 0; i <= item.factValue; i++) {
                let className = '';
                if (item.factValue > item.planValue) {
                    className = i > item.planValue ? 'rect rect-orange' : 'rect rect-white';
                } else if (item.factValue < item.planValue && item.factValue !== 0) {
                    className = 'rect rect-white';
                    // вручную достраиваем разницу между fact и plan
                    for (let j = 0; j <= item.planValue - item.factValue; j++) {
                        this.appendRect(item.day, j + item.factValue, 'rect rect-orange');
                    }
                } else {
                    className = 'rect rect-normal';
                }
                this.appendRect(item.day, i, className);
            }
        });
    }

    private drawCurve(): void {
        const line = d3.line()
            .x((d) => this.scales.x(d.x))
            .y((d) => this.scales.y(d.y))
            .curve(d3.curveStepAfter);

        this.g.append('path')
            .datum(this.dataset)
            .attr('class', 'step-line')
            .attr('d', line);
    }
}
