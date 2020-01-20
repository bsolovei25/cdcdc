import {
    Component,
    OnDestroy,
    OnInit,
    Inject,
    ElementRef,
    ViewChild,
    Input,
    AfterViewInit,
} from '@angular/core';

import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';

declare var d3: any;

@Component({
    selector: 'evj-circle-diagram',
    templateUrl: './circle-diagram.component.html',
    styleUrls: ['./circle-diagram.component.scss'],
})
export class CircleDiagramComponent implements OnInit, OnDestroy, AfterViewInit {
    private x: number = 175;
    private y: number = 40;

    static itemCols = 18;
    static itemRows = 14;

    public code: string;
    public title: string;
    public units: string = 'шт.';
    public previewTitle: string;
    public options;

    public svg: any;

    public data = {
        acknowledged: 40,
        nonAcknowledged: 100,
        diagnostics: 100,
        prognosis: 0,
    };

    public readonly RADIUS = 40;
    private subscriptions: Subscription[] = [];

    @ViewChild('myCircle', { static: false }) myCircle: ElementRef;

    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(id).subscribe((data) => {
                (this.code = data.code),
                    (this.title = data.title),
                    //    this.units = data.units,
                    (this.options = data.widgetOptions);
            })
        );
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        try {
            if (!this.isMock) {
                this.subscriptions.push(
                    this.widgetService
                        .getWidgetLiveDataFromWS(this.id, 'circle-diagram')
                        .subscribe((ref) => {
                            this.data = ref;
                            if (this.svg) {
                                this.svg.remove();
                            }
                            this.d3Circle(this.data, this.myCircle.nativeElement);
                        })
                );
            }
        } catch {}
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            for (const subscribe of this.subscriptions) {
                subscribe.unsubscribe();
            }
        }
    }

    public d3Circle(data, el): void {
        const summ = data.nonAcknowledged + data.acknowledged + data.diagnostics + data.prognosis;
        const mass = [data.acknowledged, data.nonAcknowledged, data.diagnostics, data.prognosis];
        let color: any;

        if (summ === 0) {
            color = d3.scaleOrdinal().range(['gray']);
        } else {
            color = d3
                .scaleOrdinal()
                .range(['white', 'orange', 'var(--color-border-active)', 'var(--color-circle)']);
        }

        this.svg = d3
            .select(el)
            .append('svg')
            .attr('min-width', '100px')
            .attr('viewBox', '40 25 208 120');

        let group = this.svg.append('g').attr('transform', 'translate(102 ,88)');

        const arc = d3
            .arc()
            .innerRadius(43)
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
            .attr('stroke', 'black')
            .attr('fill', (d) => color(d.index));

        group = group
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '2em')
            .attr('fill', !data.acknowledged && !data.nonAcknowledged ? 'gray' : 'white')
            .attr('dominant-baseline', 'middle')
            .text(summ);

        let acknowledgedl = this.svg
            .append('text')
            .attr('font-size', '8px')
            .attr('x', this.x)
            .attr('y', this.y)
            .attr('fill', 'orange')
            .text('Не квитировано', data.acknowledgedl);

        let acknowledgedl_num = this.svg
            .append('text')
            .attr('font-size', '10px')
            .attr('x', this.x)
            .attr('y', this.y + 14)
            .attr('fill', !data.acknowledged ? 'gray' : 'orange')
            .text(data.acknowledged);

        let nonAcknowledged = this.svg
            .append('text')
            .attr('font-size', '8px')
            .attr('x', this.x)
            .attr('y', this.y + 14 * 2)
            .attr('fill', 'white')
            .text('Квитировано', data.nonAcknowledged);

        let nonAcknowledged_num = this.svg
            .append('text')
            .attr('font-size', '10px')
            .attr('x', this.x)
            .attr('y', this.y + 14 * 3)
            .attr('fill', !data.nonAcknowledged ? 'gray' : 'white')
            .text(data.nonAcknowledged);

        let diagnostic = this.svg
            .append('text')
            .attr('font-size', '8px')
            .attr('x', this.x)
            .attr('y', this.y + 14 * 4)
            .attr('fill', 'var(--color-border-active)')
            .text('Диагностика', data.nonAcknowledged);

        let diagnostic_num = this.svg
            .append('text')
            .attr('font-size', '10px')
            .attr('x', this.x)
            .attr('y', this.y + 14 * 5)
            .attr('fill', !data.diagnostics ? 'gray' : 'var(--color-border-active)')
            .text(data.diagnostics);

        let prognosis = this.svg
            .append('text')
            .attr('font-size', '8px')
            .attr('x', this.x)
            .attr('y', this.y + 14 * 6)
            .attr('fill', 'var(--color-circle)')
            .text('Прогноз', data.prognosis);

        let prognosis_num = this.svg
            .append('text')
            .attr('font-size', '10px')
            .attr('x', this.x)
            .attr('y', this.y + 14 * 7)
            .attr('fill', !data.prognosis ? 'gray' : 'var(--color-circle)')
            .text(data.prognosis);

        let pie_back = this.svg
            .append('image')
            .attr(
                'xlink:href',
                !data.acknowledged
                    ? './assets/pic/circle-diagram-grey.svg'
                    : './assets/pic/circle-diagram-orange.svg'
            )
            .attr('height', '189px')
            .attr('width', '110px')
            .attr('x', '47')
            .attr('y', '-7');
    }
}
