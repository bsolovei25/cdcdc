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

    private color: string = '#0089FF';

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
            .attr('font-size', '5.3px')
            .attr('font-style', 'normal')
            .attr('font-weight', 'normal')
            .attr('font-family', 'Tahoma')
            .attr('y', y)
            .attr('z-index', '100')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('fill', '#8C99B2')
            .text(text);
    }

    private placeText(): void {
        this.text = this.g.append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '13px')
            .attr('font-weight', 'normal')
            .attr('fill', '#D7E2F2')
            .attr('dominant-baseline', 'middle')
            .text(this.percent);

        this.g.append('text')
            .attr('font-size', '6px')
            .attr('y', '11')
            .attr('text-anchor', 'middle')
            .attr('font-weight', 'normal')
            .attr('fill', '#606580')
            .attr('dominant-baseline', 'middle')
            .text('%');

        this.appendTitle(39, 'Ключевой показатель');
        this.appendTitle(45, 'эффективности');
        this.appendTitle(51, this.data.name);
    }

    private drawSvg(): void {
        const borderColor = '#262A39';
        const bodyColor = '#1B1F2C';

        const angleGen = d3.pie()
            .startAngle(-0.75 * Math.PI)
            .endAngle(0.75 * Math.PI)
            .padAngle(.03)
            .value((d) => d.size);

        const angleGenSource = this.initAngleGen(17);
        const data = angleGen(angleGenSource);

        const arcGen = d3.arc()
            .innerRadius(45)
            .outerRadius(51);

        const arc = d3.arc()
            .innerRadius(57.5)
            .outerRadius(58)
            .startAngle(-0.68 * Math.PI)
            .endAngle(0.68 * Math.PI);

        this.g
            .selectAll('path')
            .data(data)
            .enter()
            .append('path')
            .attr('d', arcGen)
            .attr('fill', this.color);

        this.g
            .append('path')
            .attr('d', arc)
            .attr('fill', borderColor);

        this.needle = this.g
            .append('path')
            .attr('fill', '#D7E2F2')
            .attr('d', 'M-3 0 L-1 -43 L1 0 S3 5 0 5 S-3 5 -3 0 Z') // стрелка
            .attr(`transform`, `rotate(${0})`);

        this.g
            .append('circle')
            .attr('r', 21)
            .attr('fill', borderColor);

        this.g
            .append('circle')
            .attr('r', 20.5)
            .attr('fill', bodyColor);

        this.g
            .append('circle')
            .attr('r', 19)
            .attr('fill', borderColor);
    }
}
