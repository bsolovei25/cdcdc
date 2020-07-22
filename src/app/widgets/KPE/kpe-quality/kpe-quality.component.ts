import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';
import { IProductionTrend } from '../../../dashboard/models/production-trends.model';
import { IKpeGaudeData } from '../shared/kpe-gaude-chart/kpe-gaude-chart.component';

@Component({
    selector: 'evj-kpe-quality',
    templateUrl: './kpe-quality.component.html',
    styleUrls: ['./kpe-quality.component.scss'],
})
export class KpeQualityComponent extends WidgetPlatform implements OnInit, OnDestroy {
    data;

    public lineChartData: IProductionTrend[] = [];

    margin = { top: 20, right: 20, bottom: 30, left: 40 };

    public gaudeData: IKpeGaudeData = null;

    constructor(
        private hostElement: ElementRef,
        protected widgetService: WidgetService,
        private http: HttpClient,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
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
        this.http
            .get('assets/mock/KPE/kpe-gaude.json')
            .toPromise()
            .then((data: { gaude: IKpeGaudeData[] }) => {
                let counter: number = 0;
                setInterval(() => {
                    if (counter === data.gaude.length) {
                        counter = 0;
                    }
                    this.gaudeData = data.gaude[counter++];
                }, 5000);
            });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        // this.data = ref.chartItems;
    }
}
