import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { count } from 'rxjs/operators';

declare var d3: any;

@Component({
    selector: 'evj-ring-energy-indicator',
    templateUrl: './ring-energy-indicator.component.html',
    styleUrls: ['./ring-energy-indicator.component.scss'],
})
export class RingEnergyIndicatorComponent implements AfterViewInit {
    @ViewChild('circleFactory', { static: false }) CircleFactory: ElementRef;

    public readonly RADIUS = 50;

    public title: string = 'Производство';
    public code: string;
    public units: string;
    public name: string;
    public previewTitle: string;

    static itemCols = 12;
    static itemRows = 8;

    public pic;

    private subscription: Subscription;

    public data = {
        isCritical: true,
        iconId: 4,
        procent: 10,
        value: [
            {
                name: 'тм',
                plan: 67.7,
                fact: 138.2,
            },
            {
                name: 'т.у.т',
                plan: 108.6,
                fact: 221.6,
            },
        ],
    };

    private subscriptions: Subscription[] = [];

    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
                this.title = data.title;
                this.code = data.code;
                this.units = data.units;
                this.name = data.name;
                this.previewTitle = data.widgetType;
            })
        );
    }

    ngAfterViewInit() {
        if (!this.isMock) {
            this.d3Circle(this.data, this.CircleFactory.nativeElement);
        }
    }

    ngOnDestroy() {
        if (this.subscriptions) {
            for (const subscription of this.subscriptions) {
                subscription.unsubscribe();
            }
        }
    }

    public d3Circle(data, el): void {
        this.pic = data.isCritical
            ? '/assets/pic/RingEnergyIndicator/active' + data.iconId + '.svg'
            : '/assets/pic/RingEnergyIndicator/notActive' + data.iconId + '.svg';

        const mass = [data.procent, 100 - data.procent];
        let color: any;
        let countValue;

        if (!data.isCritical) {
            color = d3.scaleOrdinal().range(['#9ED7F5', 'rgba(158,215,245,0.3)']);
        } else {
            color = d3.scaleOrdinal().range(['white', 'rgba(255,165,0,0.3)']);
        }

        const canvas = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('viewBox', '0 3 200 200');

        let group = canvas.append('g').attr('transform', 'translate(98.5, 74)');

        const arc = d3
            .arc()
            .innerRadius(45)
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

        countValue = data.value.length;

        if (countValue > 1) {
            let y = 160;
            for (let i of data.value) {
                let plan = canvas
                    .append('text')
                    .attr('font-size', '10px')
                    .attr('x', '125')
                    .attr('y', y + 1)
                    .attr('fill', 'rgba(158,215,245)')
                    .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                    .text(i.plan);

                let name = canvas
                    .append('text')
                    .attr('font-size', '8px')
                    .attr('x', '93')
                    .attr('y', y)
                    .attr('fill', '#636680')
                    .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                    .text(i.name);

                let fact = canvas
                    .append('text')
                    .attr('font-size', '10px')
                    .attr('x', '50')
                    .attr('y', y + 1)
                    .attr('fill', data.isCritical ? 'orange' : 'white')
                    .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                    .text(i.fact);
                y += 15;
            }
        } else {
            let plan = canvas
                .append('text')
                .attr('font-size', '10px')
                .attr('x', '125')
                .attr('y', 171)
                .attr('fill', 'rgba(158,215,245)')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .text(data.value[0].plan);

            let name = canvas
                .append('text')
                .attr('font-size', '8px')
                .attr('x', '93')
                .attr('y', 170)
                .attr('fill', '#636680')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .text(data.value[0].name);

            let fact = canvas
                .append('text')
                .attr('font-size', '10px')
                .attr('x', '50')
                .attr('y', 171)
                .attr('fill', data.isCritical ? 'orange' : 'white')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .text(data.value[0].fact);
        }

        let pie_back = canvas
            .append('image')
            .attr('xlink:href', '/assets/pic/RingEnergyIndicator/around.svg')
            .attr('height', '189px')
            .attr('width', '120px')
            .attr('opacity', '0.6')
            .attr('x', '40')
            .attr('y', '-20');

        let imageInCenter = canvas
            .append('image')
            .attr('xlink:href', this.pic)
            .attr('height', '150px')
            .attr('width', '150px')
            .attr('x', '22')
            .attr('y', '-5');
    }
}