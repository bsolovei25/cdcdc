import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { HttpClient } from '@angular/common/http';
import { IProductionTrend } from '../../../dashboard/models/production-trends.model';
import { IKpeGaudeData } from '../shared/kpe-gaude-chart/kpe-gaude-chart.component';
import { IDeviationDiagramData } from '../shared/kpe-deviation-diagram/kpe-deviation-diagram.component';

@Component({
    selector: 'evj-kpe-quality',
    templateUrl: './kpe-quality.component.html',
    styleUrls: ['./kpe-quality.component.scss'],
})
export class KpeQualityComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public data: any;

    public lineChartData: IProductionTrend[] = [];

    public margin = { top: 20, right: 20, bottom: 30, left: 40 };

    public gaudeData: IKpeGaudeData = null;

    public deviationChartData: IDeviationDiagramData[] = [];

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

    public ngOnInit(): void {
        super.widgetInit();
        this.http
            .get('assets/mock/KPE/deviation-chart.json')
            .toPromise()
            .then((data: IDeviationDiagramData[]) => {
                this.deviationChartData = data;
            });
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public gaugeWidth(container: HTMLDivElement): string {
        if (!(container?.offsetHeight > 0)) {
            return;
        }
        const height = container.offsetHeight;
        return `min-width: ${height * 1.136}px`;
    }


    protected dataHandler(ref: any): void {
        // this.data = ref.chartItems;
    }
}
