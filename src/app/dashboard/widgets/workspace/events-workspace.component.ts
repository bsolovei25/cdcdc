import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { EventService } from '../../services/widgets/event.service';
import { EventsWidgetNotification, IUser, EventsWidgetData } from '../../models/events-widget';
import { WidgetService } from '../../services/widget.service';
import { DateAdapter } from '@angular/material/core';
import { AuthService } from '@core/service/auth.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { EventsWorkspaceService } from '../../services/widgets/events-workspace.service';
import { IAlertWindowModel } from '@shared/models/alert-window.model';

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
        if (isEdit && this.ewService.eventCompare(this.ewService.event, this.ewService.originalEvent)) {
            this.ewService.goBackEvent();
            if (this.ewService.isCreateNewEvent) {
                this.ewService.refreshEvent();
            } else {
                this.ewService.createEvent();
            }
            return;
        }
        const tempInfo: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены, что хотите перейти к созданию нового события? Все несохраненные изменения будут потеряны.',
            acceptText: 'Да, создать событие',
            cancelText: 'Отмена',
            closeFunction: () => this.ewService.ewAlertInfo$.next(null),
        };
        if (isEdit) {
            if (this.ewService.isCreateNewEvent) {
                tempInfo.acceptFunction = () => this.ewService.refreshEvent();
                this.ewService.ewAlertInfo$.next(tempInfo);
                return;
            }
            tempInfo.acceptFunction = () => this.ewService.createEvent();
            this.ewService.ewAlertInfo$.next(tempInfo);
            return;
        }
        tempInfo.questionText = 'Вы уверены, что хотите сохранить изменения?';
        tempInfo.acceptText = 'Да, сохранить событие';
        tempInfo.acceptFunction = () => this.ewService.saveEvent();
        this.ewService.ewAlertInfo$.next(tempInfo);
    }

    public backEvent(): void {
        if (this.ewService.eventCompare(this.ewService.event, this.ewService.originalEvent)) {
            this.ewService.goBackEvent();
            return;
        }
        const tempInfo: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены, что хотите вернуться к предыдущему событию? Все несохраненные изменения будут потеряны.',
            acceptText: 'Да',
            cancelText: 'Отмена',
            acceptFunction: () => this.ewService.goBackEvent(),
            closeFunction: () => this.ewService.ewAlertInfo$.next(null),
        };
        this.ewService.ewAlertInfo$.next(tempInfo);
    }

    canShowSaveButton(): boolean {
        return this.ewService.event?.isUserCanEdit ?? false;
    }

    public overlayChartClose(): void {
        this.ewService.isOverlayChartOpen = false;
    }
}
