import { Component, OnDestroy, Inject, ElementRef, ViewChild, OnInit } from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';

declare var d3: any;

@Component({
    selector: 'evj-circle-diagram',
    templateUrl: './circle-diagram.component.html',
    styleUrls: ['./circle-diagram.component.scss'],
})
export class CircleDiagramComponent extends WidgetPlatform<unknown> implements OnDestroy, OnInit {
    private x: number = 175;
    private y: number = 40;

    public svg: any;

    public data = {
        acknowledged: 40,
        nonAcknowledged: 100,
        diagnostics: 100,
        prognosis: 0,
    };

    public readonly RADIUS: number = 40;

    @ViewChild('myCircle') myCircle: ElementRef;

    constructor(
        public widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'tools';
    }

    ngOnInit(): void {
        this.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        this.data = ref;
        if (this.svg) {
            this.svg.remove();
        }
        this.d3Circle(this.data, this.myCircle.nativeElement);
    }

    public d3Circle(data, el): void {
        const summ = data.nonAcknowledged + data.acknowledged + data.diagnostics + data.prognosis;
        const mass = [data.acknowledged, data.nonAcknowledged, data.diagnostics, data.prognosis];
        let color: any;

        if (summ === 0) {
            color = d3.scaleOrdinal().range(['gray']);
        } else {
            color = d3.scaleOrdinal().range(['white', 'orange', 'var(--color-border-active)', 'var(--color-circle)']);
        }

        this.svg = d3.select(el).append('svg').attr('min-width', '100px').attr('viewBox', '40 25 208 120');

        let group = this.svg.append('g').attr('transform', 'translate(102 ,88)');

        const arc = d3.arc().innerRadius(43).outerRadius(this.RADIUS);

        const pie = d3
            .pie()
            .value((d) => {
                return d;
            })
            .sort(() => null);

        const arcs = group.selectAll('.arc').data(pie(mass)).enter().append('g').attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('stroke', 'black')
            .attr('fill', (d) => color(d.index));

        group = group
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '2em')
            .attr('fill', !data.acknowledged && !data.nonAcknowledged ? 'gray' : 'white')
            .attr('dominant-baseline', 'middle')
            .text(summ);

        const acknowledgedl = this.svg
            .append('text')
            .attr('font-size', '8px')
            .attr('x', this.x)
            .attr('y', this.y)
            .attr('fill', 'orange')
            .text('Не квитировано', data.acknowledgedl);

        const acknowledgedl_num = this.svg
            .append('text')
            .attr('font-size', '10px')
            .attr('x', this.x)
            .attr('y', this.y + 14)
            .attr('fill', !data.acknowledged ? 'gray' : 'orange')
            .text(data.acknowledged);

        const nonAcknowledged = this.svg
            .append('text')
            .attr('font-size', '8px')
            .attr('x', this.x)
            .attr('y', this.y + 14 * 2)
            .attr('fill', 'white')
            .text('Квитировано', data.nonAcknowledged);

        const nonAcknowledged_num = this.svg
            .append('text')
            .attr('font-size', '10px')
            .attr('x', this.x)
            .attr('y', this.y + 14 * 3)
            .attr('fill', !data.nonAcknowledged ? 'gray' : 'white')
            .text(data.nonAcknowledged);

        const diagnostic = this.svg
            .append('text')
            .attr('font-size', '8px')
            .attr('x', this.x)
            .attr('y', this.y + 14 * 4)
            .attr('fill', 'var(--color-border-active)')
            .text('Диагностика', data.nonAcknowledged);

        const diagnostic_num = this.svg
            .append('text')
            .attr('font-size', '10px')
            .attr('x', this.x)
            .attr('y', this.y + 14 * 5)
            .attr('fill', !data.diagnostics ? 'gray' : 'var(--color-border-active)')
            .text(data.diagnostics);

        const prognosis = this.svg
            .append('text')
            .attr('font-size', '8px')
            .attr('x', this.x)
            .attr('y', this.y + 14 * 6)
            .attr('fill', 'var(--color-circle)')
            .text('Прогноз', data.prognosis);

        const prognosis_num = this.svg
            .append('text')
            .attr('font-size', '10px')
            .attr('x', this.x)
            .attr('y', this.y + 14 * 7)
            .attr('fill', !data.prognosis ? 'gray' : 'var(--color-circle)')
            .text(data.prognosis);

        const pie_back = this.svg
            .append('image')
            .attr(
                'xlink:href',
                !data.acknowledged ? 'assets/pic/circle-diagram-grey.svg' : 'assets/pic/circle-diagram-orange.svg'
            )
            .attr('height', '189px')
            .attr('width', '110px')
            .attr('x', '47')
            .attr('y', '-7');
    }
}
