import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';
import { SpaceNumber } from '@shared/pipes/number_space.pipe';
import { IProducts } from '../../product-groups.component';

@Component({
    selector: 'evj-product-groups-left',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './product-groups-left.component.html',
    styleUrls: ['./product-groups-left.component.scss']
})
export class ProductGroupsLeftComponent implements OnInit, OnChanges {
    public readonly RADIUS = 29;

    @Input() public data: IProducts;
    @Input() isActive: boolean;
    @Input() public imageType: string;

    percent: number;

    @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

    public svg: any;

    constructor(private spacePipe: SpaceNumber) { }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
        if (this.svg) {
            this.svg.remove();
        }
        this.d3Circle(this.data, this.myCircle.nativeElement);
    }

    private d3Circle(data, el): void {
        const imageActive =
            'assets/icons/widgets/SMP/product-group-planning/icons_circle/' + data.typeImage + '_a.svg';
        const image =
            'assets/icons/widgets/SMP/product-group-planning/icons_circle/' + data.typeImage + '.svg';

        const planPercent = 100;

        const mass = [data.performance + 35, planPercent - data.performance];

        let color: any;

        this.percent = data.performance > 100 ? 100 : data.performance < 0 ? 0 : data.performance;

        const newValue = this.spacePipe.transform(data.groupValue);
        const criticalNewValue = this.spacePipe.transform(data.groupValueTwo);

        color = d3.scaleOrdinal().range(['var(--color-border-active)', 'orange']);

        if (this.percent === 100) {
            color = d3.scaleOrdinal().range(['var(--color-border-active)']);
        } else if (this.percent === 0) {
            color = d3.scaleOrdinal().range(['orange']);
        } else {
            color = d3.scaleOrdinal().range(['var(--color-border-active)', 'orange']);
        }

        const filterName: string[] = this.textFilter(data.groupName);

        this.svg = d3
            .select(el)
            .append('svg')
            .attr('min-width', '200px')
            .attr('max-width', '500px')
            .attr('width', '100%')
            .attr('viewBox', '80 0 300 95');

        const background = this.svg
            .append('image')
            .attr(
                'xlink:href',
                'assets/icons/widgets/SMP/product-group-planning/left-side/back-left-pie.svg'
            )
            .attr('height', '75px')
            .attr('width', '100%')
            .attr('x', '27')
            .attr('y', '10');

        const group = this.svg.append('g').attr('transform', 'translate(171 ,48)');

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

        const pieBack = this.svg
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/onLeftCircle.svg')
            .attr('height', '112px')
            .attr('width', '82px')
            .attr('x', '131')
            .attr('y', '-7');

        const valueCircle = this.svg
            .append('text')
            .attr('font-size', '12px')
            .attr('x', '172')
            .attr('y', '75')
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .text(this.percent + '%');

        if (filterName.length !== 1) {
            const name1 = this.svg
                .append('text')
                .attr('font-size', '18px')
                .attr('x', '30')
                .attr('y', '50')
                .attr('fill', 'white')
                .text(filterName[0]);

            const name2 = this.svg
                .append('text')
                .attr('font-size', '18px')
                .attr('x', '30')
                .attr('y', '70')
                .attr('fill', 'white')
                .text('/' + filterName[1]);
        } else {
            const name = this.svg
                .append('text')
                .attr('font-size', '18px')
                .attr('x', '50')
                .attr('y', '55')
                .attr('fill', 'white')
                .text(data.groupName);
        }

        const point = this.svg
            .append('image')
            .attr(
                'xlink:href',
                () => {
                    if (data.pointStatus === 'danger') {
                        return 'assets/icons/widgets/SMP/product-group-planning/left-side/danger-point.svg'
                    } else if (data.pointStatus === 'warning') {
                        return 'assets/icons/widgets/SMP/product-group-planning/left-side/warning-point.svg'
                    } else {
                        return 'assets/icons/widgets/SMP/product-group-planning/left-side/normal-point.svg'
                    }
                }
            )
            .attr('height', '19px')
            .attr('width', () => {
                if (data.pointStatus === 'normal') {
                    return '12px';
                } else {
                    return '32px';
                }
            })
            .attr('x', '20')
            .attr('y', '40');

        const icon = this.svg
            .append('image')
            .attr('xlink:href', imageActive)
            .attr('height', '25px')
            .attr('width', '25px')
            .attr('x', '160')
            .attr('y', '34');

        const value = this.svg
            .append('text')
            .attr('font-size', '20px')
            .attr('x', '260')
            .attr('y', '45')
            .attr('fill', 'white')
            .text(newValue);

        const criticalValue = this.svg
            .append('text')
            .attr('font-size', '20px')
            .attr('x', '260')
            .attr('y', '65')
            .attr('fill', 'white')
            .text(criticalNewValue);

        const arrow = this.svg
            .append('image')
            .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/arrow.svg')
            .attr('height', '35px')
            .attr('width', '35px')
            .attr('x', '405')
            .attr('y', '32');
    }

    textFilter(text: string): string[] {
        return text.split('/');
    }

}
