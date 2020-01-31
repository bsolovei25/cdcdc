import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { IProduct } from '../../../models/product-group-planning';

declare var d3: any;

@Component({
    selector: 'evj-product-planning-left',
    templateUrl: './product-planning-left.component.html',
    styleUrls: ['./product-planning-left.component.scss'],
})
export class ProductPlanningLeftComponent implements OnInit {
    public readonly RADIUS = 26;

    @Input() public data: IProduct;
    @Input() public imageType: string;

    public procent;

    public pic;

    isCheck: boolean = false;

    @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

    constructor() {}

    ngOnInit() {
        this.d3Circle(this.data, this.myCircle.nativeElement);
    }

    private d3Circle(data, el): void {
        let imageActive =
            '/assets/icons/widgets/product-group-planning/icons_circle/' +
            this.imageType +
            '_a.svg';
        let image =
            '/assets/icons/widgets/product-group-planning/icons_circle/' + this.imageType + '.svg';

        this.procent = (data.productPercent * 34) / 100;

        let count = data.productPercent + 100;
        const mass = [data.productPercent + 35, data.productPercent - 20];

        let color: any;

        color = d3.scaleOrdinal().range(['white', 'orange']);

        if (data.productPercent === 100) {
            color = d3.scaleOrdinal().range(['var(--color-border-active)']);
        } else {
            color = d3.scaleOrdinal().range(['orange', 'white']);
        }

        const canvas = d3
            .select(el)
            .append('svg')
            .attr('min-width', '200px')
            .attr('max-width', '500px')
            .attr('width', '100%')
            .attr('viewBox', '80 0 300 100');

        let background = canvas
            .append('image')
            .attr(
                'xlink:href',
                '/assets/icons/widgets/product-group-planning/background_left_circle.svg'
            )
            .attr('height', '75px')
            .attr('width', '100%')
            .attr('x', '88')
            .attr('y', '10');

        let group = canvas.append('g').attr('transform', 'translate(171 ,48)');

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

        let pie_back = canvas
            .append('image')
            .attr('xlink:href', '/assets/icons/widgets/product-group-planning/onLeftCircle.svg')
            .attr('height', '112px')
            .attr('width', '83px')
            .attr('x', '131')
            .attr('y', '-9');

        let valueCircle = canvas
            .append('text')
            .attr('font-size', '12px')
            .attr('x', '158')
            .attr('y', '75')
            .attr('fill', 'white')
            .text(data.productPercent + '%');

        let name = canvas
            .append('text')
            .attr('font-size', '20px')
            .attr('x', '20')
            .attr('y', '55')
            .attr('fill', 'white')
            .text(data.name);

        if (data.criticalValue !== 0) {
            let icon = canvas
                .append('image')
                .attr('xlink:href', imageActive)
                .attr('height', '25px')
                .attr('width', '25px')
                .attr('x', '160')
                .attr('y', '34');

            let value = canvas
                .append('text')
                .attr('font-size', '18px')
                .attr('x', '240')
                .attr('y', '45')
                .attr('fill', 'white')
                .text(data.value);

            let critical_value = canvas
                .append('text')
                .attr('font-size', '16px')
                .attr('x', '240')
                .attr('y', '65')
                .attr('fill', 'orange')
                .text(data.criticalValue);

            let button = canvas
                .append('image')
                .attr(
                    'xlink:href',
                    '/assets/icons/widgets/product-group-planning/button_icon_1_a.svg'
                )
                .attr('height', '58px')
                .attr('width', '60px')
                .attr('x', '326')
                .attr('y', '19');
        } else {
            let icon = canvas
                .append('image')
                .attr('xlink:href', image)
                .attr('height', '25px')
                .attr('width', '25px')
                .attr('x', '160')
                .attr('y', '34');

            let value = canvas
                .append('text')
                .attr('font-size', '16px')
                .attr('x', '240')
                .attr('y', '50')
                .attr('fill', 'white')
                .text(data.value);

            let button = canvas
                .append('image')
                .attr(
                    'xlink:href',
                    '/assets/icons/widgets/product-group-planning/button_icon_1.svg'
                )
                .attr('height', '58px')
                .attr('width', '60px')
                .attr('x', '326')
                .attr('y', '19');
        }

        let arrow = canvas
            .append('image')
            .attr('xlink:href', '/assets/icons/widgets/product-group-planning/arrow.svg')
            .attr('height', '35px')
            .attr('width', '35px')
            .attr('x', '400')
            .attr('y', '32');
    }

    public isClick() {
        this.isCheck = !this.isCheck;
    }
}
