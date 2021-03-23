import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { ISmpEvent } from '../../../dashboard/models/SMP/smp-events.model';
import { ISelectValue } from '../../../@shared/components/select/select.component';
import { ISmpEventsMessageModel } from '../../../@shared/models/smp-events-message.model';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { SmpEventsService } from '../../../dashboard/services/widgets/SMP/smp-events.service';

@Component({
    selector: 'evj-smp-events-workspace',
    templateUrl: './smp-events-workspace.component.html',
    styleUrls: ['./smp-events-workspace.component.scss'],
})
export class SmpEventsWorkspaceComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {
    public isLoading: boolean = false;

    public data: ISmpEvent;

    public selectItems: ISelectValue[] = [
        {
            value: 0,
            label: 'УИПЦП',
        },
        {
            value: 1,
            label: 'УИПЦП 1',
        },
        {
            value: 2,
            label: 'УИПЦП 2',
        },
    ];

    public reasons: ISmpEventsMessageModel[] = [
        {
            comment: 'Причина №1',
        },
        {
            comment: 'Причина №2',
        },
        {
            comment: 'Причина №3',
        },
    ];

    public events: ISmpEventsMessageModel[] = [
        {
            comment: 'Мероприятие №1',
        },
        {
            comment: 'Мероприятие №2',
        },
        {
            comment: 'Мероприятие №3',
        },
    ];

    constructor(
        protected widgetService: WidgetService,
        private eventService: SmpEventsService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
        this.isRealtimeData = false;
    }

    public ngOnInit(): void {
        super.widgetInit();

        this.subscriptions.push(
            this.eventService.isEventLoading$.subscribe((data) => (this.isLoading = data)),
            this.eventService.event$.subscribe((event) => {
                this.data = event;
            })
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}
}
