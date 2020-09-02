import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IMultiChartLine } from '../../../dashboard/models/ASTUE-ONPZ/astue-onpz-multi-chart.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'evj-astue-onpz-conventional-fuel',
    templateUrl: './astue-onpz-conventional-fuel.component.html',
    styleUrls: ['./astue-onpz-conventional-fuel.component.scss'],
})
export class AstueOnpzConventionalFuelComponent extends WidgetPlatform
    implements OnInit, OnDestroy {
    public data: IMultiChartLine[] = [];

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        private http: HttpClient
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.http
                .get<IMultiChartLine[]>('assets/mock/ASTUE-ONPZ/conventional-fuel.json')
                .subscribe((data) => {
                    data.forEach((item) => {
                        item.graph.forEach((val) => {
                            val.timeStamp = new Date(val.timeStamp);
                        });
                    });
                    this.data = data;
                })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}
