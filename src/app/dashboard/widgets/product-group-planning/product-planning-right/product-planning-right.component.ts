import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ICompleateProduct } from '../../../models/product-group-planning';

declare var d3: any;

@Component({
    selector: 'evj-product-planning-right',
    templateUrl: './product-planning-right.component.html',
    styleUrls: ['./product-planning-right.component.scss'],
})
export class ProductPlanningRightComponent implements OnInit {
    public readonly RADIUS = 28;

    @Input() public data: ICompleateProduct;

    @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

    constructor() {}

    ngOnInit() {
        this.d3Circle(this.data, this.myCircle.nativeElement);
    }

    public d3Circle(data, el): void {
        const mass = [100 - data.compleateProcent, data.compleateProcent];
        let color: any;

        if (data.compleateProcent === 0) {
            color = d3.scaleOrdinal().range(['var(--color-text-sub-heading)']);
        } else if (data.compleateProcent === 100) {
            color = d3.scaleOrdinal().range(['white']);
        } else {
            color = d3.scaleOrdinal().range(['orange', '#1b1e27']);
        }

        const canvas = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('width', '100%')
            .attr('viewBox', '0 -10 150 100');

        let group = canvas.append('g').attr('transform', 'translate(75 ,40)');
        // .attr("viewBox", "0 20 280 200");

        const arc = d3
            .arc()
            .innerRadius(33)
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
            .attr('fill', (d) => color(d.index));

        let background = canvas
            .append('image')
            .attr(
                'xlink:href',
                '/assets/icons/widgets/product-group-planning/background_right_circle.svg'
            )
            .attr('height', '80px')
            .attr('width', '80px')
            .attr('x', '35')
            .attr('y', '0');

        if (data.value !== 0) {
            let arrow = canvas
                .append('image')
                .attr(
                    'xlink:href',
                    '/assets/icons/widgets/product-group-planning/arrow_critical.svg'
                )
                .attr('height', '35px')
                .attr('width', '35px')
                .attr('x', '140')
                .attr('y', '20');

            let value = group
                .append('text')
                .attr('fill', 'white')
                .attr('font-size', '16px')
                .attr('x', '-22')
                .attr('y', '0')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .text(data.value);

            let valueName = group
                .append('text')
                .attr('fill', 'var(--color-text-sub-heading)')
                .attr('font-size', '14px')
                .attr('x', '-7')
                .attr('y', '15')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .text('тн');
        } else {
            let arrow = canvas
                .append('image')
                .attr('xlink:href', '/assets/icons/widgets/product-group-planning/arrow.svg')
                .attr('height', '35px')
                .attr('width', '35px')
                .attr('x', '140')
                .attr('y', '20');

            let icon = group
                .append('image')
                .attr('xlink:href', '/assets/icons/widgets/product-group-planning/accept.svg')
                .attr('height', '25px')
                .attr('width', '25px')
                .attr('x', '-12')
                .attr('y', '-13');
        }
    }
}
