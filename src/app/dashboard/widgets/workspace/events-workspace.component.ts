import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { EventService } from '../../services/event.service';
import { EventsWidgetNotification, IUser, EventsWidgetData } from '../../models/events-widget';
import { WidgetService } from '../../services/widget.service';
import { DateAdapter } from '@angular/material/core';
import { AuthService } from '@core/service/auth.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { EventsWorkspaceService } from '../../services/events-workspace.service';

@Component({
    selector: 'evj-events-workspace',
    templateUrl: './events-workspace.component.html',
    styleUrls: ['./events-workspace.component.scss'],
})
export class EventsWorkSpaceComponent extends WidgetPlatform implements OnInit, OnDestroy {
    isEditingDescription: boolean = false;

    progressLineHeight: number; // хз

    static itemCols: number = 27;
    static itemRows: number = 30;
    public static minItemCols: number = 27;
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
        this.subscriptions.push(
            this.authService.user$.subscribe((data: IUser) => {
                if (data) {
                    this.ewService.currentAuthUser = data;
                }
            })
        );

        this.widgetIcon = 'document';
        this.dateAdapter.setLocale('ru');
    }

    ngOnInit(): void {
        super.widgetInit();
        this.ewService.loadItem();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.eventService.event$.subscribe((value) => {
                if (value) {
                    this.ewService.isEditEvent = true;
                    this.setEventByInfo(value);
                } else {
                    this.ewService.event = value;
                }
            })
        );
    }

    protected dataHandler(ref: any): void {
        this.wsHandler(ref);
    }

    private async setEventByInfo(value: EventsWidgetNotification | number): Promise<void> {
        this.ewService.setEventByInfo(value);

        // this.progressLine();
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
        this.setEventByInfo(notification);
    }

    private deleteWsElement(): void {
        this.ewService.createNewEvent();
    }

    // нажатие на кнопку в хэдере
    createdEvent(event: boolean): void {
        if (event) {
            this.ewService.isEditEvent = true;
            this.createEvent();
        } else {
            this.saveItem();
        }
    }

    async createEvent(): Promise<void> {
        this.ewService.isCreateNewEvent = true;
        this.ewService.createNewEvent();
    }

    // #region DATA API

    async saveItem(): Promise<void> {
        this.isEditingDescription = false;
        this.ewService.saveEvent();
    }

    // #endregion

    // #region Retrieval Event
    addRetrieval(): void {
        this.ewService.isOverlayRetrivealOpen = true;
        this.ewService.createNewEvent(true);
    }

    overlayClose(): void {
        this.ewService.isOverlayRetrivealOpen = false;
        this.ewService.createNewEvent(true);
    }
    // #endregion

    canShowSaveButton(): boolean {
        return this.ewService.event?.isUserCanEdit ?? false;
    }
}
