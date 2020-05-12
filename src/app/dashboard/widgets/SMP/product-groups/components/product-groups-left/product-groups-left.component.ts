import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { SpaceNumber } from '@shared/pipes/number_space.pipe';
import { IProducts } from '../../product-groups.component';

@Component({
    selector: 'evj-product-groups-left',
    templateUrl: './product-groups-left.component.html',
    styleUrls: ['./product-groups-left.component.scss']
})
export class ProductGroupsLeftComponent implements OnInit {
    public readonly RADIUS = 29;

    @Input() public data: IProducts;
    @Input() isActive: boolean;
    @Input() public imageType: string;

    percent: number;

    @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

    constructor(private spacePipe: SpaceNumber) { }

    ngOnInit(): void {
        this.d3Circle(this.data, this.myCircle.nativeElement);
    }

    private d3Circle(data, el): void {
        let imageActive =
            'assets/icons/widgets/SMP/product-group-planning/icons_circle/' + data.typeImage + '_a.svg';
        let image =
            'assets/icons/widgets/SMP/product-group-planning/icons_circle/' + data.typeImage + '.svg';

        let planPercent = 100;

        const mass = [data.performance + 35, planPercent - data.performance];

        let color: any;

        this.percent = data.performance > 100 ? 100 : data.performance < 0 ? 0 : data.performance;

        let newValue = this.spacePipe.transform(data.groupValue);
        let critical_newValue = this.spacePipe.transform(data.groupDeviationValue);

        color = d3.scaleOrdinal().range(['var(--color-border-active)', 'orange']);

        if (this.percent === 100) {
            color = d3.scaleOrdinal().range(['var(--color-border-active)']);
        } else if (this.percent === 0) {
            color = d3.scaleOrdinal().range(['orange']);
        } else {
            color = d3.scaleOrdinal().range(['var(--color-border-active)', 'orange']);
        }

        let filterName: Array<string> = this.textFilter(data.groupName);

        const canvas = d3
            .select(el)
            .append('svg')
            .attr('min-width', '200px')
            .attr('max-width', '500px')
            .attr('width', '100%')
            .attr('viewBox', '80 0 300 95');

        const background = canvas
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/SMP/product-group-planning/left-side/back-left-pie.svg'
            )
            .attr('height', '75px')
            .attr('width', '100%')
            .attr('x', '27')
            .attr('y', '10');

        const group = canvas.append('g').attr('transform', 'translate(171 ,48)');

        const arc = d3
            .arc()
            .innerRadius(32)
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

        const pie_back = canvas
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/onLeftCircle.svg')
            .attr('height', '112px')
            .attr('width', '82px')
            .attr('x', '131')
            .attr('y', '-7');

        const valueCircle = canvas
            .append('text')
            .attr('font-size', '12px')
            .attr('x', '172')
            .attr('y', '75')
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .text(this.percent + '%');

        if (filterName.length !== 1) {
            const name1 = canvas
                .append('text')
                .attr('font-size', '18px')
                .attr('x', '30')
                .attr('y', '50')
                .attr('fill', 'white')
                .text(filterName[0]);

            const name2 = canvas
                .append('text')
                .attr('font-size', '18px')
                .attr('x', '30')
                .attr('y', '70')
                .attr('fill', 'white')
                .text('/' + filterName[1]);
        } else {
            const name = canvas
                .append('text')
                .attr('font-size', '18px')
                .attr('x', '30')
                .attr('y', '55')
                .attr('fill', 'white')
                .text(data.groupName);
        }

        const button_left_top = canvas
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/SMP/product-group-planning/left-side/left-pie-left-top-button.svg'
            )
            .attr('height', '19px')
            .attr('width', '32px')
            .attr('x', '218')
            .attr('y', '19');

        const button_left_middle = canvas
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/SMP/product-group-planning/left-side/left-pie-left-middle-button.svg'
            )
            .attr('height', '15px')
            .attr('width', '26px')
            .attr('x', '224')
            .attr('y', '39');

        const button_left_bottom = canvas
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/SMP/product-group-planning/left-side/left-pie-left-bottom-button.svg'
            )
            .attr('height', '19px')
            .attr('width', '32px')
            .attr('x', '218')
            .attr('y', '55');

        if (data.groupDeviationValue !== 0) {
            const icon = canvas
                .append('image')
                .attr('xlink:href', imageActive)
                .attr('height', '25px')
                .attr('width', '25px')
                .attr('x', '160')
                .attr('y', '34');

            const value = canvas
                .append('text')
                .attr('font-size', '20px')
                .attr('x', '260')
                .attr('y', '45')
                .attr('fill', 'white')
                .text(newValue);

            const critical_value = canvas
                .append('text')
                .attr('font-size', '18px')
                .attr('x', '260')
                .attr('y', '65')
                .attr('fill', 'orange')
                .text(critical_newValue);
        } else {
            const icon = canvas
                .append('image')
                .attr('xlink:href', image)
                .attr('height', '25px')
                .attr('width', '25px')
                .attr('x', '160')
                .attr('y', '34');

            const value = canvas
                .append('text')
                .attr('font-size', '20px')
                .attr('x', '240')
                .attr('y', '55')
                .attr('fill', 'white')
                .text(newValue);
        }

        if (data.groupDeviationFlag != 0) {
            const button = canvas
                .append('image')
                .attr(
                    'xlink:href',
                    'assets/icons/widgets/SMP/product-group-planning/left-side/left-pie-right-top-button.svg'
                )
                .attr('height', '25px')
                .attr('width', '60px')
                .attr('x', '326')
                .attr('y', '20');
        } else {
            const button = canvas
                .append('image')
                .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/left-pie-right-top-button.svg')
                .attr('height', '25px')
                .attr('width', '60px')
                .attr('x', '326')
                .attr('y', '19');
        }

        const button2 = canvas
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/SMP/product-group-planning/left-side/left-pie-right-bottom-button.svg'
            )
            .attr('height', '25px')
            .attr('width', '60px')
            .attr('x', '326')
            .attr('y', '48');

        const arrow = canvas
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/arrow.svg')
            .attr('height', '35px')
            .attr('width', '35px')
            .attr('x', '395')
            .attr('y', '32');
    }

    textFilter(text: string): string[] {
        return text.split('/');
    }

}
