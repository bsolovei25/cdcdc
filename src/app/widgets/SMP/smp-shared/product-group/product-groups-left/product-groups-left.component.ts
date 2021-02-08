import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';
import { SpaceNumber } from '@shared/pipes/number-space.pipe';
import { IProductGroups } from '../../../../../dashboard/models/SMP/product-groups.model';

@Component({
    selector: 'evj-product-groups-left',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './product-groups-left.component.html',
    styleUrls: ['./product-groups-left.component.scss'],
})
export class ProductGroupsLeftComponent implements OnInit, OnChanges {
    @Input() set dataProductGroups(data: IProductGroups) {
        // (data.passRest < 0) ? this.planTankLevel = 0 : (data.passRest > 100) ? this.planTankLevel = 100 : this.planTankLevel = data.passRest;
        // (data.allRest < 0) ? this.factTankLevel = 0 : (data.allRest > 100) ? this.factTankLevel = 100 : this.factTankLevel = data.allRest;
        this.data = data;
    }
    planTankLevel: number = 24;
    factTankLevel: number = 90;
    data: IProductGroups;

    date: any = new Date();

    public readonly RADIUS: number = 29;
    public config: any = {
        daysCount: 32 - new Date(this.date.getFullYear(), this.date.getMonth(), 32).getDate(),
        interval: Math.PI / 120,
    };

    @Input() public imageType: string;

    percent: number;

    status: string[] = ['normal', 'warning', 'danger'];

    @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

    public svg: any;

    constructor(private spacePipe: SpaceNumber) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.svg) {
            this.svg.remove();
        }
        this.d3Circle(this.data, this.myCircle.nativeElement);
    }

    private d3Circle(data: IProductGroups, el): void {
        const performance = data.passPlanPercent;
        const imageActive = 'assets/icons/widgets/SMP/product-group-planning/icons_circle/' + data.typeImage + '_a.svg';
        const image = 'assets/icons/widgets/SMP/product-group-planning/icons_circle/' + data.typeImage + '.svg';

        const planPercent = 100;

        const mass = [performance, planPercent - performance];

        let color: any;

        this.percent = performance < 0 ? 0 : performance;

        const newValue = this.spacePipe.transform(data.devProduction);
        const criticalNewValue = this.spacePipe.transform(data.devPassport);

        color = d3.scaleOrdinal().range(['var(--color-border-active)', 'orange']);

        if (this.percent === 100) {
            color = d3.scaleOrdinal().range(['var(--color-smp-left-gauge)']);
        } else if (this.percent === 0) {
            color = d3.scaleOrdinal().range(['var(--color-smp-gauge-back)']);
        } else {
            color = d3.scaleOrdinal().range(['var(--color-smp-left-gauge)', 'var(--color-smp-gauge-back)']);
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
            .attr('xlink:href', 'assets/icons/widgets/SMP/product-group-planning/left-side/back-left-pie.svg')
            .attr('height', '75px')
            .attr('width', '100%')
            .attr('x', '27')
            .attr('y', '10');

        const group = this.svg.append('g').attr('transform', 'translate(171 ,48)');

        const arc = d3.arc().innerRadius(31).outerRadius(this.RADIUS);

        const pie = d3
            .pie()
            .value((d) => {
                return d;
            })
            .sort(() => null);

        const arcs = group.selectAll('.arc').data(pie(mass)).enter().append('g').attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)

            .attr('fill', (d) => color(d.index));

        if (filterName.length !== 1) {
            const name1 = this.svg
                .append('text')
                .attr('font-size', '20px')
                .attr('x', '50')
                .attr('y', '50')
                .attr('fill', 'white')
                .text(filterName[0]);

            const name2 = this.svg
                .append('text')
                .attr('font-size', '20px')
                .attr('x', '50')
                .attr('y', '70')
                .attr('fill', 'white')
                .text('/' + filterName[1]);
        } else {
            const name = this.svg
                .append('text')
                .attr('font-size', '20px')
                .attr('x', '50')
                .attr('y', '55')
                .attr('fill', 'white')
                .text(data.groupName);
        }

        const point = this.svg
            .append('image')
            .attr(
                'xlink:href',
                `assets/icons/widgets/SMP/product-group-planning/left-side/${this.status[data.pointStatus]}-point.svg`
            )
            .attr('height', '15px')
            .attr('width', () => {
                if (data.pointStatus === 0) {
                    return '8px';
                } else {
                    return '32px';
                }
            })
            .attr('x', '20')
            .attr('y', '42');

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
            .attr('x', '265')
            .attr('y', '45')
            .attr('fill', 'white')
            .text(newValue);

        const criticalValue = this.svg
            .append('text')
            .attr('font-size', '20px')
            .attr('x', '265')
            .attr('y', '65')
            .attr('fill', 'white')
            .text(criticalNewValue);

        const arrow = this.svg
            .append('image')
            .attr('xlink:href', `assets/icons/widgets/SMP/product-group-planning/arrow${data.pointStatus}.svg`)
            .attr('height', '35px')
            .attr('width', '35px')
            .attr('x', '405')
            .attr('y', '32');

        const pi = Math.PI;

        for (let i = 0; i < this.config.daysCount; i++) {
            const arcDay = d3
                .arc()
                .innerRadius(33)
                .outerRadius(35)
                .startAngle(
                    (i * (2 * pi - this.config.daysCount * this.config.interval)) / this.config.daysCount +
                        i * this.config.interval
                )
                .endAngle(
                    ((i + 1) * (2 * pi - this.config.daysCount * this.config.interval)) / this.config.daysCount +
                        i * this.config.interval
                );

            const dayStatus =
                this.status[this.data.daysGroup.find((item) => item.day === i + 1)?.critical] ?? 'unknown';

            group.append('path').attr('d', arcDay).attr('fill', `var(--color-smp-days-${dayStatus})`);
        }
    }

    textFilter(text: string): string[] {
        return text.split('/');
    }
}
