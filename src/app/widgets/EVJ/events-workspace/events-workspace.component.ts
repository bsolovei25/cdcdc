import { Component, OnInit, OnDestroy, Inject, HostListener } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { EventsWorkspaceService } from '../../../dashboard/services/widgets/events-workspace.service';
import { EventService } from '../../../dashboard/services/widgets/event.service';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthService } from '../../../@core/service/auth.service';
import {
    IUser,
    EventsWidgetData,
    EventsWidgetNotification,
    IStatus,
} from '../../../dashboard/models/events-widget';
import { IAlertWindowModel } from '../../../@shared/models/alert-window.model';
import {
    MomentDateAdapter,
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

@Component({
    selector: 'evj-events-workspace',
    templateUrl: './events-workspace.component.html',
    styleUrls: ['./events-workspace.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
    ],
})
export class EventsWorkspaceComponent extends WidgetPlatform implements OnInit, OnDestroy {
    get eventProdButton(): string {
        const flagCat: boolean = this.ewService.event?.category?.code === '2';
        const flagStat: boolean = this.ewService.event?.status?.name === 'closed';
        const flagNew: boolean = this.ewService.event?.status?.name === 'new';
        const message: string = flagNew ? 'В работу' : 'Завершить';

        return flagCat && !flagStat ? message : '';
    }

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

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHandler(event: BeforeUnloadEvent): BeforeUnloadEvent {
        if (this.ewService.eventCompare(this.ewService.event, this.ewService.originalEvent)) {
            return;
        }
        event.preventDefault();
        event.returnValue = true;
        return event;
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
        if (
            isEdit &&
            this.ewService.eventCompare(this.ewService.event, this.ewService.originalEvent)
        ) {
            if (this.ewService.isCreateNewEvent) {
                this.ewService.refreshEvent();
            } else {
                this.ewService.createEvent();
            }
            return;
        }
        const tempInfo: IAlertWindowModel = {
            isShow: true,
            questionText:
                'Вы уверены, что хотите перейти к созданию нового события? Все несохраненные изменения будут потеряны.',
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
            questionText:
                'Вы уверены, что хотите вернуться к предыдущему событию? Все несохраненные изменения будут потеряны.',
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

    public onChangeStatus(): void {
        const statusId: number = this.ewService.event.status.id + 1;
        const newStatus: IStatus = this.ewService.status.find((item) => item.id === statusId);
        this.ewService.event.status = newStatus;
    }
}