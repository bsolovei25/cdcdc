import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { TimeLineDataInput } from '../../models/time-line-diagram';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-time-line-diagram',
    templateUrl: './time-line-diagram.component.html',
    styleUrls: ['./time-line-diagram.component.scss'],
})
export class TimeLineDiagramComponent implements OnInit, OnDestroy {
    data: TimeLineDataInput = {
        values: [],
    };

    isMockData: TimeLineDataInput = {
        values: [
            {
                dropTimeNext: '0',
                dropTimeLast: '0',
                dropTitle: 'Сброс на факел',
            },
            {
                dropTimeNext: '0',
                dropTimeLast: '0',
                dropTitle: 'Сточные воды',
            },
        ],
    };

    public title: string = '';
    public units: string = 'час';
    public widgetType: string = 'time-line-diagram';

    subscriptions: Subscription[] = [];

    static itemCols = 22;
    static itemRows = 13;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
                this.title = data.title;
                // this.code = data.code;
                // this.units = data.units;
                // this.name = data.name;
            })
        );
    }

    ngOnInit() {
        if (!this.isMock) {
            this.subscriptions.push(
                this.widgetService
                    .getWidgetLiveDataFromWS(this.id, this.widgetType)
                    .subscribe((data: TimeLineDataInput) => (this.data = data))
            );
        }
    }

    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
        }
    }
}
