import { Component, OnInit, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

export interface IKpeGaugeChartInputData {
    name: string;
    value: number;
}

@Component({
    selector: 'evj-kpe-gauge-diagram',
    templateUrl: './gauge-diagram.component.html',
    styleUrls: ['./gauge-diagram.component.scss'],
})
export class GaugeDiagramComponent implements OnInit {
    @Input()
    public data: IKpeGaugeChartInputData = {
        name: 'АВТ-10',
        value: 97.1,
    };

    private svg: any;
    private g: any;
    private needle: any;
    public percent: number = 0;
    public text: any;

    constructor(private hostElement: ElementRef) {
    }

    public ngOnInit(): void {
        this.initSvg();
        if (this.data) {
            this.drawSvg();
            this.placeText();
        }

        // TODO mock данные для стрелки
        this.initMockAnimation();
    }

    // TODO mock данные для стрелки
    private initMockAnimation(): void {
        setInterval(() => {
            this.percent = Number(this.generateRandomNumber().toFixed(1));
            this.pokeNeedle(this.convertPercentToGrad(this.percent));
            this.text.text(this.percent);
        }, 1000);
    }

    // TODO mock данные для стрелки
    private generateRandomNumber(): number {
        const min = 90;
        const max = 100;
        return Math.random() * (max - min) + min;
    }

    private convertPercentToGrad(percent: number): number {
        if (percent > 0 && percent < 100) {
            return percent * (2.7) - 135;
        }
        if (percent >= 100) {
            return 135;
        }
        if (percent <= 0) {
            return -135;
        }
    }

    private initSvg(): void {
        this.svg = d3.select(this.hostElement.nativeElement).select('svg');
        this.g = this.svg.append('g')
            .attr('transform', 'translate(58,58)')
        ;
    }

    private initAngleGen(segmentNumber: number): any {
        const gens = [];
        let i = 0;
        while (i < segmentNumber) {
            gens.push({size: 1});
            i++;
        }
        return gens;
    }

    private pokeNeedle(grad: number): void {
        this.needle
            .transition()
            .duration(1000)
            .attr(`transform`, `rotate(${grad})`);
    }

    private appendTitle(y: number, text: string): void {
        this.g.append('text')
            .attr('class', 'title-text')
            .attr('y', y)
            .text(text);
    }

    private placeText(): void {
        this.text = this.g.append('text')
            .attr('class', 'value')
            .text(this.percent);

        this.g.append('text')
            .attr('class', 'percentage')
            .attr('y', '11')
            .text('%');

        this.appendTitle(39, 'Ключевой показатель');
        this.appendTitle(45, 'эффективности');
        this.appendTitle(51, this.data.name);
    }

    private appendCircle(r: number, className: string): void {
        this.g
            .append('circle')
            .attr('r', r)
            .attr('class', className);
    }

    private drawSvg(): void {
        const angleGen = d3.pie()
            .startAngle(-0.75 * Math.PI)
            .endAngle(0.75 * Math.PI)
            .padAngle(.02)
            .value((d) => d.size);

        const angleGenSource = this.initAngleGen(20);
        const data = angleGen(angleGenSource);

        const arcGen = d3.arc()
            .innerRadius(45)
            .outerRadius(51);

        const arc = d3.arc()
            .innerRadius(56.5)
            .outerRadius(57)
            .startAngle(-0.68 * Math.PI)
            .endAngle(0.68 * Math.PI);

        this.g
            .selectAll('path')
            .data(data)
            .enter()
            .append('path')
            .attr('d', arcGen)
            .attr('class', 'arc-gen');

        this.g
            .append('path')
            .attr('d', arc)
            .attr('class', 'arc');

        this.needle = this.g
            .append('path')
            .attr('class', 'needle')
            .attr('d', 'M-3 0 L-1 -43 L1 0 S3 5 0 5 S-3 5 -3 0 Z') // стрелка
            .attr(`transform`, `rotate(${0})`);

        this.appendCircle(21, 'fill-border-color');
        this.appendCircle(20.5, 'fill-body-color');
        this.appendCircle(19, 'fill-border-color');
        this.appendCircle(18.5, 'fill-center-circle');
    }
}
