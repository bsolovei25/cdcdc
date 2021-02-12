import { Component, Inject, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { HttpClient } from '@angular/common/http';
import { IDeviationDiagramData } from '../shared/kpe-deviation-diagram/kpe-deviation-diagram.component';
import { KpeHelperService } from '../shared/kpe-helper.service';
import {ArrayOfObjectsDeepEqual} from "@shared/functions/deep-equal.function";

export interface IKpePlanReadinessTrendData<T> {
    name: string;
    value: number;
    measurement: string;
    data: T[]; // IKpeLineChartData | IDeviationDiagramData
}

@Component({
    selector: 'evj-kpe-plan-readiness-trend',
    templateUrl: './kpe-plan-readiness-trend.component.html',
    styleUrls: ['./kpe-plan-readiness-trend.component.scss'],
})
export class KpePlanReadinessTrendComponent extends WidgetPlatform<unknown> implements OnInit {
    public data: IKpePlanReadinessTrendData<IDeviationDiagramData>[] = [];

    public displayedMonth: Date;

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private http: HttpClient,
        private kpeHelperService: KpeHelperService
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    protected dataHandler(ref: any): void {
        if (!ArrayOfObjectsDeepEqual(this.data, ref.data)) {
            this.data = [];
            for (const item of ref.data ?? []) {
                this.data.push({
                    name: item.name,
                    measurement: item.measurement,
                    value: item.value,
                    data: this.kpeHelperService.prepareKpeLineChartData(item.data),
                });

                item.data.forEach((data) => {
                    if (data.graphType === 'fact') {
                        this.displayedMonth = new Date(data.graph[0].timeStamp);
                    }
                });
            }
        }
    }
}
