import { Component, OnInit, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as d3 from 'd3';

export interface IKpeGaugeChartPage {
    name: string;
    value: number;
}

@Component({
    selector: 'evj-kpe-gauge-diagram',
    templateUrl: './gauge-diagram.component.html',
    styleUrls: ['./gauge-diagram.component.scss'],
})
export class GaugeDiagramComponent implements OnInit, OnChanges {
    @Input()
    public data: IKpeGaugeChartPage;

    private svg: any;
    private g: any;
    private needle: any;
    private needleShadow: any;
    public percent: number = 0;
    public text: any;

    constructor(private hostElement: ElementRef) {}

    public ngOnInit(): void {
        this.initSvg();
        this.drawSvg();
        this.placeText();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (this.needle) {
            this.percent = Number(this.data.value.toFixed(1));
            this.pokeNeedle(this.convertPercentToGrad(this.percent));
            this.text.text(this.percent);
        }
        if (this.data) {
            this.appendName(51, this.data.name);
        }
    }

    private convertPercentToGrad(percent: number): number {
        if (percent > 0 && percent < 100) {
            return percent * 2.7 - 135;
        }
        if (percent >= 100) {
            return 135;
        }
        if (percent <= 0) {
            return -133;
        }
    }

    private initSvg(): void {
        this.svg = d3.select(this.hostElement.nativeElement).select('svg');
        this.g = this.svg.append('g').attr('transform', 'translate(58,58)');
    }

    private initAngleGen(segmentNumber: number): any {
        const gens = [];
        let i = 0;
        while (i < segmentNumber) {
            gens.push({ size: 1 });
            i++;
        }
        return gens;
    }

    private pokeNeedle(grad: number): void {
        const duration = 1000;

        this.needle.transition().duration(duration).attr(`transform`, `rotate(${grad})`);

        this.needleShadow.transition().duration(duration).attr(`transform`, `rotate(${grad})`);
    }

    private appendTitle(y: number, text: string): void {
        this.g.append('text').attr('class', 'title-text').attr('y', y).text(text);
    }

    private appendName(y: number, text: string): void {
        this.g.selectAll('.name-text').remove();
        this.g.append('text').attr('class', 'name-text').attr('y', y).text(text);
    }

    private placeText(): void {
        this.text = this.g.append('text').attr('class', 'value').text(this.percent);

        this.g.append('text').attr('class', 'percentage').attr('y', '11').text('%');

        this.appendTitle(39, 'Ключевой показатель');
        this.appendTitle(45, 'эффективности');
    }

    private appendCircle(r: number, className: string): void {
        this.g.append('circle').attr('r', r).attr('class', className);
    }

    private drawSvg(): void {
        const angleGen = d3
            .pie()
            .startAngle(-0.75 * Math.PI)
            .endAngle(0.75 * Math.PI)
            .padAngle(0.02)
            .value((d) => d.size);

        const angleGenSource = this.initAngleGen(20);
        const data = angleGen(angleGenSource);

        const arcGen = d3.arc().innerRadius(45).outerRadius(51);

        const arc = d3
            .arc()
            .innerRadius(56.5)
            .outerRadius(57)
            .startAngle(-0.68 * Math.PI)
            .endAngle(0.68 * Math.PI);

        this.g.selectAll('path').data(data).enter().append('path').attr('d', arcGen).attr('class', 'arc-gen');

        this.g.append('path').attr('d', arc).attr('class', 'arc');

        this.drawNeedleShadow();

        const hideDownSector = d3
            .arc()
            .innerRadius(21)
            .outerRadius(41.5)
            .startAngle(-0.25 * Math.PI)
            .endAngle(0.25 * Math.PI);

        this.g
            .append('path')
            .attr('d', hideDownSector)
            .attr(`transform`, `rotate(180)`)
            .attr('class', 'hide-down-sector');

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

    private drawNeedleShadow(): void {
        const shadowGradient = this.g
            .append('defs')
            .append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%')
            .attr('spreadMethod', 'pad');

        shadowGradient.append('svg:stop').attr('offset', '0%').attr('class', 'needle-shadow-gradient-1');

        shadowGradient.append('svg:stop').attr('offset', '100%').attr('class', 'needle-shadow-gradient-2');

        const shadow = d3
            .arc()
            .innerRadius(21)
            .outerRadius(41.5)
            .startAngle(-0.5 * Math.PI)
            .endAngle(-0.008 * Math.PI);

        this.needleShadow = this.g
            .append('path')
            .attr('d', shadow)
            .attr(`transform`, `rotate(${0})`)
            .style('fill', 'url(#gradient)');
    }
}
