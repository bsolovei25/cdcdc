import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';
import { WidgetPlatform } from '../../../../../dashboard/models/@PLATFORM/widget-platform';
import { IPlanningChart } from '../../../astue-onpz-planning-charts/astue-onpz-planning-charts.component';
import { IProductionTrend } from '../../../../../dashboard/models/LCO/production-trends.model';
import { IDatesInterval, WidgetService } from '../../../../../dashboard/services/widget.service';
import { AstueOnpzService } from '../../../astue-onpz-shared/astue-onpz.service';
import { fillDataShape } from '@shared/functions/common-functions';
import { IChartMini } from '@shared/interfaces/smart-scroll.model';

@Component({
    selector: 'evj-astue-onpz-big-planning-chart',
    templateUrl: './astue-onpz-big-planning-chart.component.html',
    styleUrls: ['./astue-onpz-big-planning-chart.component.scss'],
})
export class AstueOnpzBigPlanningChartComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public sbLeft: number = 0;
    public sbWidth: number = 100;
    public scrollData: IChartMini[] = [];
    public scrollLimits: IDatesInterval = null;

    public info: IPlanningChart;
    public data: IProductionTrend[] = [];
    public colors: Map<string, number>;
    public scaleCounter: number = 5;
    public chartValue: number = 0;

    set scale(isMinus: boolean) {
        let counter = this.scaleCounter + (+isMinus || -1);
        if (counter < 0) {
            counter = 0;
        }
        this.scaleCounter = counter;
    }

    constructor(
        protected widgetService: WidgetService,
        private cdr: ChangeDetectorRef,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private astueService: AstueOnpzService,
    ) {
        super(widgetService, id, uniqId);
    }

    public setChartValues(value: number): void {
        this.chartValue = value;
        this.cdr.detectChanges();
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.astueService.sharedPlanningGraph$.subscribe((data) => {
                if (!!data) {
                    this.info = fillDataShape(data);
                    this.info.graph.forEach((item) =>
                        item.graph.forEach((val) => (val.timeStamp = new Date(val.timeStamp)))
                    );
                    this.data = this.info?.graph ?? [];
                }
            }),
            this.astueService.colors$.subscribe((value) => {
                this.colors = value;
            }),
            this.widgetService.currentDates$.subscribe((ref) => (this.scrollLimits = ref))
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}
