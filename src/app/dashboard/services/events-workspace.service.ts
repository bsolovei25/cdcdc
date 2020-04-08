import { Injectable } from '@angular/core';
import {
    IPriority,
    IStatus,
    IUser,
    ICategory,
    IUnitEvents,
    EventsWidgetNotificationStatus,
    EventsWidgetNotificationPriority,
    EventsWidgetCategoryCode,
    EventsWidgetNotification,
    IRetrievalEvents,
} from '../models/events-widget';
import { EventService } from './event.service';
import { fillDataShape } from '../../@shared/common-functions';

@Injectable({
    providedIn: 'root',
})
export class EventsWorkspaceService {
    public event: EventsWidgetNotification;
    public retrievalEvent: EventsWidgetNotification;

    //#region FLAGS
    public isCreateNewEvent: boolean = false;
    public isOverlayChartOpen: boolean = false;
    public isOverlayRetrivealOpen: boolean = false;
    //#endregion

    public priority: IPriority[];
    public status: IStatus[];
    public users: IUser[];
    public category: ICategory[];
    public equipmentCategory: ICategory[];
    public eventTypes: ICategory[];
    public units: IUnitEvents[];

    public currentAuthUser: IUser = null;

    //#region RESPONSIBLE_USER
    // public;
    //#endregion

    statuses: { [id in EventsWidgetNotificationStatus]: string } = {
        new: 'Новое',
        inWork: 'В работе',
        closed: 'Завершено',
    };

    priorities: { [id in EventsWidgetNotificationPriority]: string } = {
        danger: 'Высокий',
        warning: 'Средний',
        standard: 'Стандартный',
    };

    categories: { [id in EventsWidgetCategoryCode]: string } = {
        smotr: 'СМОТР',
        safety: 'Безопасноть',
        tasks: 'Производственные задания',
        equipmentStatus: 'Состояния оборудования',
        drops: 'Сбросы',
    };

    public defaultEvent: EventsWidgetNotification = null;

    constructor(private eventService: EventService) {
        this.loadItem();
    }

    public async loadItem(id?: number): Promise<void> {
        try {
            if (id) {
                this.event = await this.eventService.getEvent(id);
            }
            this.category = await this.eventService.getCategory();
            this.users = await this.eventService.getUser();
            this.status = await this.eventService.getStatus();
            this.units = await this.eventService.getUnits();
            this.priority = await this.eventService.getPriority();
            this.equipmentCategory = await this.eventService.getEquipmentCategory();
            this.eventTypes = await this.eventService.getEventType();
            this.setDefaultEvent();
        } catch (err) {
            console.error(err);
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
                id: null,
                lastName: '',
                middleName: '',
                phone: '',
            },
            organization: 'АО Газпромнефть',
            priority: this.priority
                ? this.priority[2]
                    ? this.priority[2]
                    : this.priority[0]
                : null,
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
        this.isCreateNewEvent = false;

        if (typeof value !== 'number') {
            this.event = value;
            console.log(value);
        }

        this.loadItem(typeof value === 'number' ? value : undefined);
    }

    public createNewEvent(isRetrieval: boolean = false): void {
        this.loadItem();
        if (!isRetrieval) {
            this.isCreateNewEvent = true;
            this.event = fillDataShape(this.defaultEvent);
        } else {
            this.retrievalEvent = fillDataShape(this.defaultEvent);
        }
    }

    public async saveEvent(): Promise<void> {
        if (this.isCreateNewEvent) {
            try {
                const event = await this.eventService.postEvent(this.event);
                this.event = event;
                this.isCreateNewEvent = false;
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                await this.eventService.putEvent(this.event);
            } catch (err) {
                console.error(err);
            }
        }
        this.eventService.updateEvent$.next(true);
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
            } catch (error) {
                console.error(error);
            }
        } else {
            const addingRetrieval: IRetrievalEvents = {
                id: null,
                innerNotification: this.retrievalEvent,
                timerPercentage: 50,
            };
            this.event.retrievalEvents.push(addingRetrieval);
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
                    this.retrievalEvent = fillDataShape(this.defaultEvent);
                } catch (err) {
                    console.error(err);
                }
            }
        } else {
            const index = this.event.retrievalEvents.findIndex(
                (item) => item.id === this.retrievalEvent.id
            );
            this.event.retrievalEvents[index].innerNotification = this.retrievalEvent;
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
}
