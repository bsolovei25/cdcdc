import {
    Component,
    ElementRef,
    Inject,
    OnDestroy,
    OnInit,
    Renderer2,
    ViewChild
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import * as d3 from 'd3';
import { IProductionTrend } from '../../../dashboard/models/production-trends.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'evj-kpe-readiness',
    templateUrl: './kpe-readiness.component.html',
    styleUrls: ['./kpe-readiness.component.scss']
})
export class KpeReadinessComponent extends WidgetPlatform implements OnInit, OnDestroy {

    @ViewChild('chart') private chartContainer: ElementRef;

    public lineChartData: IProductionTrend[] = [];

    margin = { top: 20, right: 20, bottom: 30, left: 40 };

    constructor(protected widgetService: WidgetService,
                private http: HttpClient,
                @Inject('isMock') public isMock: boolean,
                @Inject('widgetId') public id: string,
                @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        setTimeout(() => {
            this.createChart();
        }, 1000);
        this.http
            .get('assets/mock/KPE/kpe-trends.json')
            .toPromise()
            .then((data: { data: IProductionTrend[] }) => {
                this.lineChartData = data.data;
                this.lineChartData.forEach((item) =>
                    item.graph.forEach((chart) => {
                        chart.timeStamp = new Date(chart.timeStamp);
                    })
                );
            });
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
    }

    private createChart(): void {
        const element = this.chartContainer.nativeElement;

        const svg = d3
            .select(element)
            .append('svg')
            .attr('width', element.offsetWidth)
            .attr('height', element.offsetHeight)
            .append('circle') // attach a circle
            .attr('cx', 200) // position the x-centre
            .attr('cy', 100) // position the y-centre
            .attr('r', 50) // set the radius
            .style('stroke-dasharray', '2, 2') // make the stroke dashed
            .attr('stroke-width', '5px')
            .style('stroke', 'white') // set the line colour
            .style('fill', 'none');
    }

}
