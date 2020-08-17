import { Component, Inject, OnInit } from '@angular/core';
import { IDeviationDiagramData } from '../shared/kpe-deviation-diagram/kpe-deviation-diagram.component';
import { HttpClient } from '@angular/common/http';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-kpe-safety',
    templateUrl: './kpe-safety.component.html',
    styleUrls: ['./kpe-safety.component.scss']
})
export class KpeSafetyComponent extends WidgetPlatform implements OnInit {

    public deviationChartData: IDeviationDiagramData[] = [];

    constructor(protected widgetService: WidgetService,
                private http: HttpClient,
                @Inject('isMock') public isMock: boolean,
                @Inject('widgetId') public id: string,
                @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    ngOnInit(): void {
        this.http
            .get('assets/mock/KPE/deviation-chart.json')
            .toPromise()
            .then((data: IDeviationDiagramData[]) => {
                this.deviationChartData = data;
            });
    }

    public gaugeWidth(container: HTMLDivElement): string {
        if (!(container?.offsetHeight > 0)) {
            return;
        }
        const height = container.offsetHeight;
        return `min-width: ${height * 1.136}px`;
    }

    protected dataHandler(ref: any): void {
    }
}
