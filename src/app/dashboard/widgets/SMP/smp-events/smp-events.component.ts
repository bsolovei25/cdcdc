import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';
import { WidgetPlatform } from '../../../models/widget-platform';
import { SmpEventsService } from '../../../services/widgets/smp-events.service';
import { ISmpEventCard, ISmpEventStatusStatistics } from '../../../models/SMP/smp-events.model';

@Component({
    selector: 'evj-smp-events',
    templateUrl: './smp-events.component.html',
    styleUrls: ['./smp-events.component.scss'],
})
export class SmpEventsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public stats: ISmpEventStatusStatistics = {
        statsByStatus: [
            {
                status: {
                    id: 3001,
                    name: 'new',
                    code: '0',
                },
                count: 9,
            },
            {
                status: {
                    id: 3002,
                    name: 'inWork',
                    code: '1',
                },
                count: 9,
            },
            {
                status: {
                    id: 3003,
                    name: 'closed',
                    code: '2',
                    description: 'Завершено',
                },
                count: 0,
            },
        ],
    };
    public cards: ISmpEventCard[] = [];

    static itemCols: number = 14;
    static itemRows: number = 20;

    constructor(
        protected widgetService: WidgetService,
        private eventService: SmpEventsService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}
