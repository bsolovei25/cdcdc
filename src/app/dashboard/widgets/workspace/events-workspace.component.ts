import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { EventService } from '../../services/widgets/event.service';
import { EventsWidgetNotification, IUser, EventsWidgetData } from '../../models/events-widget';
import { WidgetService } from '../../services/widget.service';
import { DateAdapter } from '@angular/material/core';
import { AuthService } from '@core/service/auth.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { EventsWorkspaceService } from '../../services/widgets/events-workspace.service';

@Component({
    selector: 'evj-events-workspace',
    templateUrl: './events-workspace.component.html',
    styleUrls: ['./events-workspace.component.scss'],
})
export class EventsWorkSpaceComponent extends WidgetPlatform implements OnInit, OnDestroy {
    static itemCols: number = 27;
    static itemRows: number = 30;
    public static minItemCols: number = 32;
    public static minItemRows: number = 30;

    constructor(
        public ewService: EventsWorkspaceService,
        private eventService: EventService,
        public widgetService: WidgetService,
        private dateAdapter: DateAdapter<Date>,
        private authService: AuthService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'document';
        this.dateAdapter.setLocale('ru');
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.authService.user$.subscribe((data: IUser) => {
                if (data) {
                    this.ewService.currentAuthUser = data;
                }
            })
        );
        this.ewService.loadItem();
    }

    protected dataHandler(ref: any): void {
        this.wsHandler(ref);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    private wsHandler(data: EventsWidgetData): void {
        if (this.ewService.event?.id !== data.notification.id) {
            return;
        }
        switch (data.action) {
            case 'edit':
                this.editWsElement(data.notification);
                break;
            case 'delete':
                this.deleteWsElement();
                break;
        }
    }

    private editWsElement(notification: EventsWidgetNotification): void {
        this.ewService.editEvent(notification.id);
    }

    private deleteWsElement(): void {
        this.ewService.event = null;
        this.eventService.currentEventId$.next(null);
    }

    // нажатие на кнопку в хэдере
    createdEvent(isEdit: boolean): void {
        if (isEdit) {
            if (this.ewService.isCreateNewEvent) {
                this.ewService.refreshEvent();
                return;
            }
            this.ewService.createEvent();
            return;
        }
        this.ewService.saveEvent();
    }

    public backEvent(): void {
        this.ewService.goBackEvent();
    }

    canShowSaveButton(): boolean {
        return this.ewService.event?.isUserCanEdit ?? false;
    }
}
