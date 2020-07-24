import {
    Component,
    AfterViewInit,
    Input,
    ViewChild,
    ElementRef,
    OnChanges,
    HostListener,
} from '@angular/core';
import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';

export interface IKpeGaudeData {
    value: number;
    deviation: number;
}

@Component({
    selector: 'evj-kpe-gaude-chart',
    templateUrl: './kpe-gaude-chart.component.html',
    styleUrls: ['./kpe-gaude-chart.component.scss'],
})
export class KpeGaudeChartComponent implements OnChanges, AfterViewInit {
    @Input() private data: IKpeGaudeData = {
        value: 90,
        deviation: 0,
    };

    @ViewChild('chart') private chart: ElementRef;

    private svg;
    private maxSize: number = 0;

    constructor() {}

    public ngOnChanges(): void {
        this.startDrawChart();
    }

    public ngAfterViewInit(): void {
        this.startDrawChart();
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.startDrawChart();
    }

    private startDrawChart(): void {
        if (this.data) {
            this.initData();
            this.drawChart();
            this.drawText();
        }
    }

    // создание svg и установка максимальных размеров
    private initData(): void {
        if (this.svg) {
            d3Selection
                .select(this.chart.nativeElement)
                .select('svg')
                .remove();
            this.svg.remove();
            this.svg = undefined;
        }
        this.svg = d3Selection.select(this.chart.nativeElement).append('svg');
        this.maxSize = 200;

        this.svg
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${this.maxSize} ${this.maxSize}`);
        this.svg = this.svg
            .append('g')
            .attr('class', 'svg')
            .attr('transform', `translate(${this.maxSize / 2},${this.maxSize / 2})`);
    }

    // оттрисовка диаграммы
    private drawChart(): void {
        const svg = this.svg;
        const maxSize = this.maxSize;
        const min = (maxSize / 2) * 0.8; // макс значение в px радиуса внешней дуги
        const max = maxSize / 2; // макс значение в px радиуса внешней дуги
        const innerMin = (maxSize / 2) * 0.85; // мин значение в px радиуса внутренней дуги
        const innerMax = (maxSize / 2) * 0.95; // макс значение в px радиуса внутренней дуги
        const arc = defineArc(min, max); // функция наруужней дуги
        const innerArc = defineArc(innerMin, innerMax); // функция внутренних дуг
        const dashedArc = defineArc(min, max, 0.02); // функция верхней пунктирной дуги

        // масштабирующая функция (перевод чисел в градусы)
        const scale = d3
            .scaleLinear()
            .domain([0, 100]) // числовой диапазон
            .range([0, 270]); // диапазон угла

        const pie = definePie(); // функция для внешней дуги
        const endAngleFn = (d) => (scale(d) * Math.PI) / 180 - (1.5 * Math.PI) / 2;
        const lastArc = definePie(endAngleFn); // функция дуги, которая следует за ползунком

        drawArc(pie([1]), 'back-arc', arc); // отрисовка внешней дуги
        drawArc(pie([1]), 'unactive-arc', innerArc); // отрисовка внутренней дуги
        drawArc(lastArc([this.data.value]), 'needle-arc', innerArc); // отрисовка подвижной дуги
        drawArc(pie(new Array(60)), 'back-arc', dashedArc, true); // отрисовка пунктирной дуги

        this.svg.append('g').attr('class', 'lines'); // добавление группы засечек
        drawNeedle([0], 'end-line', 'line1', true); // отрисовка засечки начала
        drawNeedle([100], 'end-line', 'line2', true); // отрисовка засечки конца
        drawNeedle([this.data.value], 'needle', 'needle'); // отрисовка ползунка

        function defineArc(innerRad: number, outerRad: number, padAngle: number = 0): any {
            return d3
                .arc()
                .innerRadius(innerRad)
                .outerRadius(outerRad)
                .cornerRadius(0)
                .padAngle(padAngle);
        }

        function definePie(endAngle: any = (1.5 * Math.PI) / 2): any {
            return d3
                .pie()
                .startAngle((-1.5 * Math.PI) / 2)
                .endAngle(endAngle)
                .value((d) => 1);
        }

        function drawArc(dataFn: any, cls: string, arcFn: any, isDashed: boolean = false): any {
            const block = !isDashed ? svg : svg.append('g');
            block
                .selectAll('.arc')
                .data(dataFn)
                .enter()
                .append('path')
                .attr('class', cls)
                .attr('d', arcFn);
        }

        function drawNeedle(
            data: any[],
            cls: string,
            classed: string,
            isLine: boolean = false
        ): any {
            const block = isLine ? svg.select('g.lines') : svg;
            block
                .selectAll(`.needle`)
                .data(data)
                .enter()
                .append('line')
                .attr('class', cls)
                .attr('x1', -min * Math.cos(Math.PI / 4))
                .attr('x2', -max * Math.cos(Math.PI / 4))
                .attr('y1', min * Math.sin(Math.PI / 4))
                .attr('y2', max * Math.sin(Math.PI / 4))
                .classed(classed, true)
                .style('transform', (d) => `rotate(${scale(d)}deg)`);
        }
    }

    // отрисовка текста
    private drawText(): void {
        this.svg.select('g.text').remove();
        const g = this.svg.append('g').attr('class', 'text');
        const mid = this.maxSize / 2;

        g.append('line')
            .attr('class', 'line')
            .attr('x1', -this.maxSize * 0.3)
            .attr('y1', 0)
            .attr('x2', this.maxSize * 0.3)
            .attr('y2', 0);
        addText(`${this.data.value.toFixed(1)}%`, 'main main-text', -15);
        addText(`\u0394 ${this.data.deviation.toFixed(1)}%`, 'dev sub-text', 33);
        addText(`100%`, 'sub-text', mid - 30);

        function addText(text: string, cls: string, yCoord: number): void {
            g.append('text')
                .attr('class', cls)
                .attr('text-anchor', 'middle')
                .attr('x', 0)
                .attr('y', yCoord)
                .text(text);
        }
    }
}
