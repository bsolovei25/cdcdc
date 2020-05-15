import { Injectable } from '@angular/core';
import {
    EventsWidgetNotification,
    IPriority,
    IStatus,
    IUser,
    ICategory,
    IUnitEvents,
    EventsWidgetNotificationStatus,
    EventsWidgetNotificationPriority,
    EventsWidgetCategoryCode,
    IRetrievalEvents, IAsusService, IAsusEOService, IAsusWorkgroup, IAsusCategories, ISmotrReference
} from '../../models/events-widget';
import { EventService } from '../widgets/event.service';
import { SnackBarService } from '../snack-bar.service';
import { fillDataShape } from '../../../@shared/common-functions';
import { AvatarConfiguratorService } from '../avatar-configurator.service';

@Injectable({
    providedIn: 'root',
})
export class EventsWorkspaceService {
    public event: EventsWidgetNotification;
    public retrievalEvent: EventsWidgetNotification;

    //#region FLAGS
    public isLoading: boolean = true;
    public isEditEvent: boolean = false;
    public isEditRetrievalEvent: boolean = false;
    public isCreateNewEvent: boolean = false;
    public isOverlayChartOpen: boolean = false;
    public isOverlayRetrivealOpen: boolean = false;
    public isOverlayConfirmOpen: boolean = false;
    //#endregion

    //#region REFERENCES
    public priority: IPriority[] = [];
    public status: IStatus[] = [];
    public users: IUser[] = [];
    public category: ICategory[] = [];
    public equipmentCategory: ICategory[] = [];
    public eventTypes: ICategory[] = [];
    public units: IUnitEvents[] = [];
    public asusCategories: IAsusCategories[] = [];
    public asusWorkgroup: IAsusWorkgroup[] = [];
    public asusServices: IAsusService[] = [];
    public asusEOServices: IAsusEOService[] = [];
    public smotrReference: ISmotrReference = null;
    //#endregion

    public currentAuthUser: IUser = null;

    public readonly statuses: { [id in EventsWidgetNotificationStatus]: string } = {
        new: 'Новое',
        inWork: 'В работе',
        closed: 'Завершено',
    };

    public readonly priorities: { [id in EventsWidgetNotificationPriority]: string } = {
        danger: 'Высокий',
        warning: 'Средний',
        standard: 'Стандартный',
    };

    public readonly categories: { [id in EventsWidgetCategoryCode]: string } = {
        smotr: 'СМОТР',
        safety: 'Безопасноть',
        tasks: 'Производственные задания',
        equipmentStatus: 'Состояния оборудования',
        drops: 'Сбросы',
        asus: 'АСУС',
    };

    private defaultEvent: EventsWidgetNotification = null;

    constructor(
        private eventService: EventService,
        private snackBarService: SnackBarService,
        private avatarConfiguratorService: AvatarConfiguratorService
    ) {
        this.loadItem();
    }

    public async loadItem(id?: number): Promise<void> {
        try {
            if (id) {
                this.event = await this.eventService.getEvent(id);
            }
            const dataLoadQueue: Promise<void>[] = [];
            dataLoadQueue.push(
                this.eventService.getCategory().then((data) => {
                    this.category = data;
                }),
                this.eventService.getUser().then((data) => {
                    this.users = data;
                }),
                this.eventService.getStatus().then((data) => {
                    this.status = data;
                }),
                this.eventService.getUnits().then((data) => {
                    this.units = data;
                }),
                this.eventService.getPriority().then((data) => {
                    this.priority = data;
                }),
                this.eventService.getEquipmentCategory().then((data) => {
                    this.equipmentCategory = data;
                }),
                this.eventService.getEventType().then((data) => {
                    this.eventTypes = data;
                }),
                this.eventService.getAsusCategories().then((data) => {
                    this.asusCategories = data;
                }),
                this.eventService.getAsusWorkgroup().then((data) => {
                    this.asusWorkgroup = data;
                }),
                this.eventService.getAsusServices().then((data) => {
                    this.asusServices = data;
                }),
                this.eventService.getAsusEOServices().then((data) => {
                    this.asusEOServices = data;
                }),
                this.eventService.getSmotrReference().then((data) => {
                   this.smotrReference = data;
                }),
            );
            await Promise.all(dataLoadQueue);
            this.setDefaultEvent();
        } catch (err) {
            console.error(err);
        } finally {
            setTimeout(() => (this.isLoading = false), 200);
        }
    }

    public setDefaultEvent(): void {
        this.defaultEvent = {
            isUserCanEdit: true,
            itemNumber: 0,
            branch: 'Производство',
            category: this.category ? this.category[0] : null,
            description: '',
            deviationReason: 'Причина отклонения...',
            directReasons: '',
            establishedFacts: '',
            eventDateTime: new Date(),
            eventType: this.eventTypes ? this.eventTypes[0] : null,
            fixedBy: {
                email: '',
                login: '',
                firstName: '',
                id: undefined,
                lastName: '',
                middleName: '',
                phone: '',
            },
            organization: 'АО Газпромнефть',
            priority: this.priority
                ? this.priority[2]
                    ? this.priority[2]
                    : this.priority[0]
                : undefined,
            responsibleOperator: fillDataShape(this.currentAuthUser),
            retrievalEvents: [],
            severity: 'Critical',
            status: this.status ? this.status[0] : null,
            equipmentCategory: this.equipmentCategory ? this.equipmentCategory[0] : null,
            deadline: new Date(),
            graphValues: null,
            isAcknowledged: false,
            unitName: null,
            facts: [],
            comments: [],
        };
    }

    public async setEventByInfo(value: EventsWidgetNotification | number): Promise<void> {
        this.isLoading = true;
        this.isCreateNewEvent = false;

        if (typeof value !== 'number') {
            this.event = value;
            console.log(value);
        }

        this.loadItem(typeof value === 'number' ? value : undefined);
    }

    public createNewEvent(isRetrieval: boolean = false): void {
        this.loadItem();
        if (!this.defaultEvent) {
            this.setDefaultEvent();
        }
        if (!isRetrieval) {
            this.isCreateNewEvent = true;
            this.event = fillDataShape(this.defaultEvent);
        } else {
            this.retrievalEvent = fillDataShape(this.defaultEvent);
        }
    }

    public async saveEvent(): Promise<void> {
        this.isLoading = true;
        if (this.isCreateNewEvent) {
            try {
                const event = await this.eventService.postEvent(this.event);
                this.event = event;
                this.isCreateNewEvent = false;
                this.snackBarService.openSnackBar('Сохранено');
            } catch (err) {
                console.error(err);
                this.snackBarService.openSnackBar('Ошибка', 'snackbar-red');
            }
        } else {
            try {
                await this.eventService.putEvent(this.event);
                this.snackBarService.openSnackBar('Изменения сохранены');
            } catch (err) {
                console.error(err);
                this.snackBarService.openSnackBar('Ошибка', 'snackbar-red');
            }
        }
        this.eventService.updateEvent$.next(true);
        this.isLoading = false;
    }

    public async saveNewRetrievalEvent(): Promise<void> {
        if (!this.isCreateNewEvent) {
            try {
                const addedRetrievalEvent = await this.eventService.addRetrievalEvents(
                    this.event.id,
                    this.retrievalEvent
                );
                this.event.retrievalEvents.push(addedRetrievalEvent);
                this.eventService.updateEvent$.next(true);
                this.retrievalEvent = fillDataShape(this.defaultEvent);
                this.snackBarService.openSnackBar('Сохранено');
            } catch (error) {
                console.error(error);
                this.snackBarService.openSnackBar('Ошибка', 'snackbar-red');
            }
        } else {
            const addingRetrieval: IRetrievalEvents = {
                id: undefined,
                innerNotification: this.retrievalEvent,
                timerPercentage: 50,
            };
            this.event.retrievalEvents.push(addingRetrieval);
            this.snackBarService.openSnackBar('Сохранено');
            this.retrievalEvent = fillDataShape(this.defaultEvent);
        }
    }

    public async saveEditedRetrievalEvent(): Promise<void> {
        if (!this.isCreateNewEvent) {
            const index = this.event.retrievalEvents.findIndex(
                (item) => item.id === this.retrievalEvent.id
            );
            if (index !== -1) {
                try {
                    this.event.retrievalEvents[index].innerNotification = this.retrievalEvent;
                    await this.eventService.editRetrievalEvents(this.event.retrievalEvents[index]);
                    this.eventService.updateEvent$.next(true);
                    this.isEditRetrievalEvent = false;
                    this.retrievalEvent = fillDataShape(this.defaultEvent);
                    this.snackBarService.openSnackBar('Изменения сохранены');
                } catch (err) {
                    console.error(err);
                    this.snackBarService.openSnackBar('Ошибка', 'snackbar-red');
                }
            }
        } else {
            const index = this.event.retrievalEvents.findIndex(
                (item) => item.id === this.retrievalEvent.id
            );
            this.event.retrievalEvents[index].innerNotification = this.retrievalEvent;
            this.isEditRetrievalEvent = false;
            this.snackBarService.openSnackBar('Изменения сохранены');
        }
    }

    public async deleteRetrievalEvent(retrieval: IRetrievalEvents): Promise<void> {
        try {
            await this.eventService.deleteRetrievalEvents(
                this.event.id,
                retrieval.innerNotification.id
            );
            this.eventService.updateEvent$.next(true);
            const index = this.event.retrievalEvents.findIndex((item) => item.id === retrieval.id);
            this.event.retrievalEvents.splice(index, 1);
            this.snackBarService.openSnackBar('Мероприятие удалено');
        } catch (err) {
            console.error(err);
            this.snackBarService.openSnackBar('Ошибка', 'snackbar-red');
        }
    }

    public sendMessageToEvent(
        msg: string,
        category: 'comments' | 'facts',
        isRetrieval: boolean = false
    ): void {
        const fullComment = {
            comment: msg,
            createdAt: new Date(),
            displayName: this.currentAuthUser.displayName,
        };
        if (isRetrieval) {
            this.retrievalEvent[category].push(fullComment);
        } else {
            this.event[category].push(fullComment);
        }
    }

    public setDeadlineToEvent(date: Date, isRetriveal: boolean = false): void {
        const deadline: Date = new Date(date);

        if (isRetriveal) {
            this.retrievalEvent.deadline = deadline;
        } else {
            this.event.deadline = deadline;
        }
    }

    public getUserAvatarUrl(user: IUser): string {
        return this.avatarConfiguratorService.getAvatarPath(user?.photoId);
    }

    public async escalateEvent(): Promise<void> {
        if (this.event.originalId) {
            const a = this.eventService.escalateSmotrEvent(this.event.originalId);
            console.log(a);
        }
    }

    public async closeEvent(): Promise<void> {
        if (this.event.originalId) {
            const a = this.eventService.closeSmotrEvent(this.event.originalId);
            console.log(a);
        }
    }

    public async updateEvent(): Promise<void> {
        if (this.event.originalId) {
            const a = this.eventService.closeSmotrEvent(this.event.originalId);
            console.log(a);
        }
    }
}
