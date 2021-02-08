import { Component, Inject, ElementRef, ViewChild, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';

declare var d3: any;

@Component({
    selector: 'evj-circle-factory-diagram',
    templateUrl: './circle-factory-diagram.component.html',
    styleUrls: ['./circle-factory-diagram.component.scss'],
})
export class CircleFactoryDiagramComponent extends WidgetPlatform<unknown> implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('circleFactory') circleFactory: ElementRef;

    public readonly RADIUS: number = 42;

    public clicked: boolean = false;

    public data = {
        value: 100,
        improvement: 94,
        deviation: 95,
        image: [
            { id: 0, isCritical: true },
            { id: 1, isCritical: false },
            { id: 2, isCritical: true },
            { id: 3, isCritical: false },
            { id: 4, isCritical: false },
            { id: 5, isCritical: true },
        ],
    };

    public previewTitle: string;

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'unit';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    ngAfterViewInit(): void {
        if (!this.isMock) {
            this.d3Circle(this.data, this.circleFactory.nativeElement);
        }
    }

    protected dataConnect(): void {}

    protected dataHandler(ref: any): void {}

    public onChangeBackground(): void {
        if (!this.isMock) {
            this.clicked = !this.clicked;
        }
    }

    public d3Circle(data, el): void {
        const mass = [data.improvement, data.deviation - data.improvement, data.value - data.deviation];
        let color: any;

        if (data.value === 0) {
            color = d3.scaleOrdinal().range(['gray']);
        } else {
            color = d3.scaleOrdinal().range(['white', 'orange', 'rgba(4,12,33,0.1)']);
        }

        const canvas = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('viewBox', '0 3 300 120');

        let group = canvas.append('g').attr('transform', 'translate(60 ,60)');

        const arc = d3
            .arc()
            .innerRadius(44)
            .outerRadius(this.RADIUS);

        const pie = d3
            .pie()
            .value((d) => {
                return d;
            })
            .sort(() => null);

        let groupCircle2 = group
            .append('circle')
            .attr('cx', '0')
            .attr('cy', '0')
            .attr('r', '46')
            .attr('opacity', '0.3')
            .attr('fill', '#040c21');

        const arcs = group
            .selectAll('.arc')
            .data(pie(mass))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', (d) => color(d.index));

        let groupCircle = group
            .append('circle')
            .attr('cx', '0')
            .attr('cy', '0')
            .attr('r', '40')
            .attr('fill', '#040c21');

        let groupText = group
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '7px')
            .attr('fill', '#a2e2ff')
            .attr('x', '0')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .attr('y', '30')
            .text(data.value + '%');

        let improvement_name = canvas
            .append('text')
            .attr('font-size', '10px')
            .attr('x', '220')
            .attr('y', '35')
            .attr('fill', !data.improvement ? 'gray' : 'white')
            .text(data.improvement);

        let improvement = canvas
            .append('text')
            .attr('font-size', '8px')
            .attr('x', '190')
            .attr('y', '20')
            .attr('fill', 'white')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .text('Улучшения');

        let deviation = canvas
            .append('text')
            .attr('font-size', '10px')
            .attr('x', '163')
            .attr('y', '35')
            .attr('fill', !data.deviation ? 'gray' : 'orange')
            .text(data.deviation);

        let deviation_name = canvas
            .append('text')
            .attr('font-size', '8px')
            .attr('x', '130')
            .attr('y', '20')
            .attr('fill', 'orange')
            .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
            .text('Отклонения');

        let pie_back = canvas
            .append('image')
            .attr(
                'xlink:href',
                !data.value
                    ? 'assets/pic/CircleFactory/notActiveCircleBack.svg'
                    : 'assets/pic/CircleFactory/activeCircleBack.svg'
            )
            .attr('height', '189px')
            .attr('width', '110px')
            .attr('x', '6.5')
            .attr('y', '-34');

        let imageFactory = canvas
            .append('image')
            .attr('xlink:href', 'assets/pic/Icons3D/1.png')
            .attr('height', '40px')
            .attr('width', '40px')
            .attr('x', '40')
            .attr('y', '35');

        let xPos1 = 100;
        let xPos2 = 100;
        let yPos = 80;
        for (let item of data.image) {
            if (item.id <= 2) {
                canvas
                    .append('image')
                    .attr(
                        'xlink:href',
                        item.isCritical
                            ? 'assets/pic/IconsCircle/aFabricButton' + item.id + '.svg'
                            : 'assets/pic/IconsCircle/nFabricButton' + item.id + '.svg'
                    )
                    .attr('height', '30px')
                    .attr('width', '30px')
                    .attr('x', xPos1 + 35)
                    .attr('y', '50');
                xPos1 += 35;
            } else {
                canvas
                    .append('image')
                    .attr(
                        'xlink:href',
                        item.isCritical
                            ? 'assets/pic/IconsCircle/aFabricButton' + item.id + '.svg'
                            : 'assets/pic/IconsCircle/nFabricButton' + item.id + '.svg'
                    )
                    .attr('height', '30px')
                    .attr('width', '30px')
                    .attr('x', xPos2 + 35)
                    .attr('y', yPos);
                xPos2 += 35;
            }
        }

        let pointStart = canvas
            .append('image')
            .attr('xlink:href', 'assets/pic/CircleFactory/pointStart.svg')
            .attr('height', '20px')
            .attr('width', '20px')
            .attr('x', '50')
            .attr('y', '8');
    }
}
