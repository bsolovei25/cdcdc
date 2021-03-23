import { Component, ElementRef, ViewChild, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { RingEnegryIndicatorModel } from '../../../dashboard/models/LCO/ring-energy-indicator';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';

declare var d3: any;

@Component({
    selector: 'evj-ring-energy-indicator',
    templateUrl: './ring-energy-indicator.component.html',
    styleUrls: ['./ring-energy-indicator.component.scss'],
})
export class RingEnergyIndicatorComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    @ViewChild('circleFactory') CircleFactory: ElementRef;

    public readonly RADIUS: number = 50;

    public pic: string;

    public svg: any;

    public data: RingEnegryIndicatorModel;

    constructor(
        public widgetService: WidgetService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
        this.widgetIcon = 'zipper';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.data = ref;
        if (this.svg) {
            this.svg.remove();
        }
        this.d3Circle(this.data, this.CircleFactory.nativeElement);
    }

    public d3Circle(data, el): void {
        this.pic = data.isCritical
            ? 'assets/pic/RingEnergyIndicator/active' + data.iconId + '.svg'
            : 'assets/pic/RingEnergyIndicator/notActive' + data.iconId + '.svg';

        const mass = [data.percent, 100 - data.percent];
        let color: any;
        let countValue;

        if (!data.isCritical) {
            color = d3.scaleOrdinal().range(['#9ED7F5', 'rgba(158,215,245,0.3)']);
        } else {
            color = d3.scaleOrdinal().range(['white', 'rgba(255,165,0,0.3)']);
        }

        this.svg = d3.select(el).append('svg').attr('min-width', '100px').attr('viewBox', '0 3 200 200');

        let group = this.svg.append('g').attr('transform', 'translate(98.5, 74)');

        const arc = d3.arc().innerRadius(45).outerRadius(this.RADIUS);

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

        countValue = data.values.length;

        if (countValue > 1) {
            let y = 160;
            let index = 0;
            for (let i of data.values) {
                index++;
                if (index < 3) {
                    let plan = this.svg
                        .append('text')
                        .attr('font-size', '10px')
                        .attr('x', '125')
                        .attr('y', y + 1)
                        .attr('fill', 'rgba(158,215,245)')
                        .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                        .text(i.planValue);

                    let name = this.svg
                        .append('text')
                        .attr('font-size', '8px')
                        .attr('x', '93')
                        .attr('y', y)
                        .attr('fill', '#636680')
                        .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                        .text(i.name);

                    let fact = this.svg
                        .append('text')
                        .attr('font-size', '10px')
                        .attr('x', '50')
                        .attr('y', y + 1)
                        .attr('fill', data.isCritical ? 'orange' : 'white')
                        .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                        .text(i.fact);
                    y += 15;
                } else {
                }
            }
        } else {
            let plan = this.svg
                .append('text')
                .attr('font-size', '10px')
                .attr('x', '125')
                .attr('y', 171)
                .attr('fill', 'rgba(158,215,245)')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .text(data.values[0].planValue);

            let name = this.svg
                .append('text')
                .attr('font-size', '8px')
                .attr('x', '93')
                .attr('y', 170)
                .attr('fill', '#636680')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .text(data.values[0].name);

            let fact = this.svg
                .append('text')
                .attr('font-size', '10px')
                .attr('x', '50')
                .attr('y', 171)
                .attr('fill', data.isCritical ? 'orange' : 'white')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .text(data.values[0].fact);
        }

        let pie_back = this.svg
            .append('image')
            .attr('xlink:href', 'assets/pic/RingEnergyIndicator/around.svg')
            .attr('height', '189px')
            .attr('width', '120px')
            .attr('opacity', '0.6')
            .attr('x', '40')
            .attr('y', '-20');

        let imageInCenter = this.svg
            .append('image')
            .attr('xlink:href', this.pic)
            .attr('height', '150px')
            .attr('width', '150px')
            .attr('x', '22')
            .attr('y', '-5');
    }
}
