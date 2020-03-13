import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { TimeLineDataInput } from '../../models/time-line-diagram';
import { NewWidgetService } from '../../services/new-widget.service';
import { WidgetPlatform } from '../../models/widget-platform';

@Component({
    selector: 'evj-time-line-diagram',
    templateUrl: './time-line-diagram.component.html',
    styleUrls: ['./time-line-diagram.component.scss'],
})
export class TimeLineDiagramComponent extends WidgetPlatform implements OnInit, OnDestroy {
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

    protected static itemCols: number = 22;
    protected static itemRows: number = 13;

    constructor(
        protected widgetService: NewWidgetService,
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
