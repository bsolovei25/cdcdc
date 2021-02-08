import { Component, OnInit, ElementRef, ViewChild, Input, Injectable } from '@angular/core';
import { PieWidget } from 'src/app/dashboard/models/widget.model';

declare var d3: any;

@Injectable()
@Component({
    selector: 'evj-widget-pie',
    templateUrl: './widget-pie.component.html',
    styleUrls: ['./widget-pie.component.scss'],
})
export class WidgetsPieComponent implements OnInit {
    public readonly RADIUS: number = 40;

    @Input() public data: PieWidget;

    @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

    constructor() {}

    ngOnInit(): void {
        this.d3Circle(this.data, this.myCircle.nativeElement);
    }

    public d3Circle(data, el): void {
        const summ = data.critical + data.nonCritical;
        const mass = [data.nonCritical, data.critical];
        let color: any;

        if (summ === 0) {
            color = d3.scaleOrdinal().range(['gray']);
        } else {
            color = d3.scaleOrdinal().range(['white', 'orange']);
        }

        const canvas = d3
            .select(el)
            .append('svg')
            .attr('min-width', '200px')
            .attr('viewBox', '0 -10 200 200');

        let group = canvas.append('g').attr('transform', 'translate(102 ,88)');

        const arc = d3
            .arc()
            .innerRadius(43)
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
            .attr('stroke', 'black')
            .attr('fill', (d) => color(d.index));

        group = group
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '2em')
            .attr('fill', !data.nonCritical && !data.critical ? 'gray' : 'white')
            .attr('dominant-baseline', 'middle')
            .text(summ);

        let text = canvas
            .append('text')
            .attr('fill', 'rgb(140,153,178)')
            .attr('font-size', '11px')
            .attr('x', '46')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('y', '0')
            .text(data.name);

        let positive = canvas
            .append('text')
            .attr('font-size', '8px')
            .attr('x', '100')
            .attr('y', '155')
            .attr('fill', 'rgb(97,101,128)')
            .text('Не критичные', data.nonCriticall);

        let positive_num = canvas
            .append('text')
            .attr('font-size', '12px')
            .attr('x', '125')
            .attr('y', '172')
            .attr('fill', !data.nonCritical && !data.critical ? 'gray' : 'white')
            .text(data.nonCritical);

        let negative = canvas
            .append('text')
            .attr('font-size', '8px')
            .attr('x', '50')
            .attr('y', '155')
            .attr('fill', 'rgb(97,101,128)')
            .text('Критичные /', data.critical);

        let negative_num = canvas
            .append('text')
            .attr('font-size', '12px')
            .attr('x', '70')
            .attr('y', '172')
            .attr('fill', !data.nonCritical && !data.critical ? 'gray' : 'orange')
            .text(data.critical);

        let pie_back = canvas
            .append('image')
            .attr('xlink:href', !data.nonCritical && !data.critical ? 'assets/pic/ncir.svg' : 'assets/pic/acir.svg')
            .attr('height', '185px')
            .attr('width', '200px')
            .attr('x', '3')
            .attr('y', '-3');
    }
}
