import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import * as d3 from 'd3';

@Component({
    selector: 'evj-kpe-quality',
    templateUrl: './kpe-quality.component.html',
    styleUrls: ['./kpe-quality.component.scss'],
})
export class KpeQualityComponent extends WidgetPlatform implements OnInit, OnDestroy {
    @ViewChild('chart') private chartContainer: ElementRef;

    margin = { top: 20, right: 20, bottom: 30, left: 40 };

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
        setTimeout(() => {
            // this.createChart();
        }, 1000);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        // this.data = ref.chartItems;
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
