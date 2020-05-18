import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { WidgetPlatform } from '../../../models/widget-platform';
import { WidgetService } from '../../../services/widget.service';
import { ISelectValue } from '@shared/components/select/select.component';
import { ISmpEventsWorkspaceData } from '../../../models/smp-events-workspace.model';
import { ISmpEventsMessageModel } from '@shared/models/smp-events-message.model';

@Component({
    selector: 'evj-smp-events-workspace',
    templateUrl: './smp-events-workspace.component.html',
    styleUrls: ['./smp-events-workspace.component.scss']
})
export class SmpEventsWorkspaceComponent extends WidgetPlatform implements OnInit, OnDestroy {

    static itemCols = 20;

    static itemRows = 30;

    public data: ISmpEventsWorkspaceData | null;

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
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
    }

    public ngOnInit(): void {
        super.widgetInit();

        this.data = {
            date: '15.05.2020',
            company: 'АО "Газпромнефть - МНПЗ',
            state: 'В работе',
        } as ISmpEventsWorkspaceData;
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
    }
}