import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProductionTrend } from '../../../dashboard/models/production-trends.model';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-kpe-energy',
    templateUrl: './kpe-energy.component.html',
    styleUrls: ['./kpe-energy.component.scss']
})
export class KpeEnergyComponent extends WidgetPlatform implements OnInit {

    @ViewChild('gauge') gaugeElement: ElementRef;
    public lineChartData: IProductionTrend[] = [];

    constructor(
        private http: HttpClient,
        protected widgetService: WidgetService,
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
                    item.graph.map((chart) => {
                        chart.timeStamp = new Date(chart.timeStamp);
                    })
                );
            });
    }

    protected dataHandler(ref: any): void {
    }

    get chartWidth(): string {
        if (!(this.gaugeElement?.nativeElement?.offsetHeight > 0)) {
            return;
        }
        const height = this.gaugeElement.nativeElement.offsetHeight;
        return `min-width: ${height}px`;
    }
}
