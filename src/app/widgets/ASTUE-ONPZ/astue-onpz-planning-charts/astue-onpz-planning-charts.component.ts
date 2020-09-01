import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { HttpClient } from '@angular/common/http';
import { IProductionTrend } from '../../../dashboard/models/production-trends.model';

export interface IPlanningChart {
    tag: string;
    title: string;
    unitName: string;
    units: string;
    currentFactValue: number;
    graph: IProductionTrend[];
}

@Component({
    selector: 'evj-astue-onpz-planning-charts',
    templateUrl: './astue-onpz-planning-charts.component.html',
    styleUrls: ['./astue-onpz-planning-charts.component.scss'],
})
export class AstueOnpzPlanningChartsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public data: IPlanningChart[] = [];

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private http: HttpClient
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.http
                .get<IPlanningChart[]>('assets/mock/ASTUE-ONPZ/planning-charts.mock.json')
                .subscribe((data: IPlanningChart[]) => (this.data = data))
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}
