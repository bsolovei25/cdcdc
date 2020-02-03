import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ITypeProduct } from '../../../models/product-group-planning';

declare var d3: any;

@Component({
    selector: 'evj-product-planning-middle',
    templateUrl: './product-planning-middle.component.html',
    styleUrls: ['./product-planning-middle.component.scss'],
})
export class ProductPlanningMiddleComponent implements OnInit, AfterViewInit {
    public readonly RADIUS = 26;

    @Input() public data: ITypeProduct;
    @Input() public lengthW: number;
    @Input() public indexBlock: number;
    @Input() public imageType: string;

    @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

    constructor() {}

    ngOnInit() {
        this.d3Circle(this.data, this.myCircle.nativeElement);
    }

    ngAfterViewInit() {}

    public d3Circle(data, el): void {
        let imageActive =
            '/assets/icons/widgets/product-group-planning/icons_circle/' +
            this.imageType +
            '_a.svg';
        let image =
            '/assets/icons/widgets/product-group-planning/icons_circle/' + this.imageType + '.svg';

        const mass = [20, 30];
        let color: any;

        if (data.percent === 0) {
            color = d3.scaleOrdinal().range(['var(--color-text-sub-heading)']);
        } else if (data.percent === 100) {
            color = d3.scaleOrdinal().range(['var(--color-border-active)']);
        } else {
            color = d3.scaleOrdinal().range(['orange', '#1b1e27']);
        }

        const canvas = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('width', '100%')
            .attr('viewBox', '0 0 200 100');

        let background = canvas
            .append('image')
            .attr(
                'xlink:href',
                '/assets/icons/widgets/product-group-planning/background_circle.svg'
            )
            .attr('height', '75px')
            .attr('width', '100%')
            .attr('x', '-20')
            .attr('y', '10');

        let group = canvas.append('g').attr('transform', 'translate(31, 47)');
        // .attr("viewBox", "0 20 280 200");

        const arc = d3
            .arc()
            .innerRadius(31)
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

        if (data.criticalValue !== 0 && data.value !== 0) {
            let value = canvas
                .append('text')
                .attr('fill', 'white')
                .attr('font-size', '18px')
                .attr('x', '85')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('y', '50')
                .text(data.value);

            let criticalValue = canvas
                .append('text')
                .attr('fill', 'orange')
                .attr('font-size', '18px')
                .attr('x', '85')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('y', '75')
                .text(data.criticalValue);

            let icon = group
                .append('image')
                .attr('xlink:href', imageActive)
                .attr('height', '25px')
                .attr('width', '25px')
                .attr('x', '-11.5')
                .attr('y', '-12');
        } else if (data.criticalValue !== 0) {
            let value = canvas
                .append('text')
                .attr('fill', 'white')
                .attr('font-size', '18px')
                .attr('x', '85')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('y', '60')
                .text(data.value);

            let icon = group
                .append('image')
                .attr('xlink:href', imageActive)
                .attr('height', '25px')
                .attr('width', '25px')
                .attr('x', '-11.5')
                .attr('y', '-12');
        } else if (data.value !== 0) {
            let icon = group
                .append('image')
                .attr('xlink:href', image)
                .attr('height', '25px')
                .attr('width', '25px')
                .attr('x', '-11.5')
                .attr('y', '-12');

            let value = canvas
                .append('text')
                .attr('fill', 'white')
                .attr('font-size', '18px')
                .attr('x', '85')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('y', '60')
                .text(data.value);
        } else {
            let icon = group
                .append('image')
                .attr('xlink:href', image)
                .attr('height', '25px')
                .attr('width', '25px')
                .attr('x', '-11.5')
                .attr('y', '-12');

            let value = canvas
                .append('text')
                .attr('fill', 'var(--color-text-sub-heading)')
                .attr('font-size', '18px')
                .attr('x', '85')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('y', '60')
                .text(data.value);
        }

        if (data.criticalButton.button1 === true) {
            let button1 = canvas
                .append('image')
                .attr(
                    'xlink:href',
                    '/assets/icons/widgets/product-group-planning/button_icon_1_a.svg'
                )
                .attr('height', '58px')
                .attr('width', '60px')
                .attr('x', '151')
                .attr('y', '27');
        } else {
            let button1 = canvas
                .append('image')
                .attr(
                    'xlink:href',
                    '/assets/icons/widgets/product-group-planning/button_icon_1.svg'
                )
                .attr('height', '58px')
                .attr('width', '60px')
                .attr('x', '151')
                .attr('y', '27');
        }

        if (data.value === 0) {
            let text = canvas
                .append('text')
                .attr('fill', 'var(--color-text-sub-heading)')
                .attr('font-size', '18px')
                .attr('x', '70')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('y', '15')
                .text(data.name);
        } else {
            let text = canvas
                .append('text')
                .attr('fill', 'white')
                .attr('font-size', '18px')
                .attr('x', '70')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('y', '15')
                .text(data.name);
        }

        if (data.criticalButton.button2 === true) {
            let button2 = canvas
                .append('image')
                .attr(
                    'xlink:href',
                    '/assets/icons/widgets/product-group-planning/button_icon_2_a.svg'
                )
                .attr('height', '39px')
                .attr('width', '39px')
                .attr('x', '195')
                .attr('y', '22');
        } else {
            let button2 = canvas
                .append('image')
                .attr(
                    'xlink:href',
                    '/assets/icons/widgets/product-group-planning/button_icon_2.svg'
                )
                .attr('height', '39px')
                .attr('width', '39px')
                .attr('x', '195')
                .attr('y', '22');
        }

        if (data.criticalButton.button3 === true) {
            let button3 = canvas
                .append('image')
                .attr(
                    'xlink:href',
                    '/assets/icons/widgets/product-group-planning/button_icon_3_a.svg'
                )
                .attr('height', '39px')
                .attr('width', '39px')
                .attr('x', '195')
                .attr('y', '52');
        } else {
            let button3 = canvas
                .append('image')
                .attr(
                    'xlink:href',
                    '/assets/icons/widgets/product-group-planning/button_icon_3.svg'
                )
                .attr('height', '39px')
                .attr('width', '39px')
                .attr('x', '195')
                .attr('y', '52');
        }
    }
}
