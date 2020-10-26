import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import { TimeLineDataInput } from '../../../dashboard/models/LCO/time-line-diagram';
import { WidgetService } from '../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-time-line-diagram',
    templateUrl: './time-line-diagram.component.html',
    styleUrls: ['./time-line-diagram.component.scss'],
})
export class TimeLineDiagramComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public data: TimeLineDataInput = {
        values: [],
    };

    public isMockData: TimeLineDataInput = {
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

    constructor(
        protected widgetService: WidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetUnits = 'час';
        this.widgetIcon = 'drop';
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: TimeLineDataInput): void {
        this.data = ref;
    }
}
