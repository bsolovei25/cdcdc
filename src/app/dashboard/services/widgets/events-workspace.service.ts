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
    IAsusService,
    IAsusEOService,
    IAsusWorkgroup,
    IAsusCategories,
    ISmotrReference,
    ISaveMethodEvent, IRetrievalEventDto, ISearchRetrievalWindow, IAsusTpPlace, IAsusTmPlace
} from '../../models/events-widget';
import { EventService } from '../widgets/event.service';
import { SnackBarService } from '../snack-bar.service';
import { fillDataShape } from '../../../@shared/common-functions';
import { AvatarConfiguratorService } from '../avatar-configurator.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class EventsWorkspaceService {
    public event: EventsWidgetNotification;
    public eventHistory: number[] = [];

    //#region FLAGS
    public isLoading: boolean = true;
    public isEditEvent: boolean = false;
    public isCreateNewEvent: boolean = false;
    public isOverlayChartOpen: boolean = false;
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
    public asusEquipments: IAsusTpPlace[] = [];
    public asusUnits: IAsusTmPlace[] = [];
    public smotrReference: ISmotrReference = null;
    public category$: BehaviorSubject<ICategory[]> = new BehaviorSubject<ICategory[]>([]);
    public categoryPipe: Observable<ICategory[]> = this.category$.pipe(
        filter((item) => item !== null),
        map((cats) => cats.filter((cat) => {
            if (this.isCreateNewEvent) {
                switch (cat.name) {
                    case 'smotr':
                        return false;
                    default:
                        return true;
                }
            }
            switch (cat.name) {
                case 'asus':
                case 'smotr':
                    return false;
                default:
                    return true;
            }
        }))
    );
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

    public searchWindow$: BehaviorSubject<ISearchRetrievalWindow> =
        new BehaviorSubject<ISearchRetrievalWindow>(null);
    public ewAlertInfo$: BehaviorSubject<IAlertWindowModel> =
        new BehaviorSubject<IAlertWindowModel>(null);

    constructor(
        private eventService: EventService,
        private snackBarService: SnackBarService,
        private avatarConfiguratorService: AvatarConfiguratorService
    ) { }

    public async loadItem(id: number = null): Promise<void> {
        this.isLoading = true;
        try {
            if (id) {
                await this.getEvent(id);
            }
            this.eventService.currentEventId$.next(id);
            this.loadReferences();
            this.setDefaultEvent();
        } catch (err) {
            console.error(err);
        } finally {
            setTimeout(() => (this.isLoading = false), 200);
        }
    }

    private async getEvent(id: number): Promise<void> {
        this.event = await this.eventService.getEvent(id);
        this.event = { ...this.defaultEvent, ...this.event };
        const dataLoadQueue: Promise<void>[] = [];
        if (this.event.category.name === 'asus') {
            dataLoadQueue.push(
                this.eventService.getAsusEquipments(this.event.asusEvent.tmPlace).then((data) => {
                    this.asusEquipments = data;
                }),
                this.eventService.getAsusEOServices(this.event.asusEvent.equipment).then((data) => {
                    this.asusEOServices = data;
                }),
            );
        }
        await Promise.all(dataLoadQueue);
    }

    public async goBackEvent(isContinue: boolean = false): Promise<void> {
        if (!(this.eventHistory?.length > 0)) {
            this.event = null;
            return;
        }
        if (!this.isCreateNewEvent && !isContinue) {
            this.eventHistory.pop();
            this.goBackEvent(true);
        }
        await this.editEvent(this.eventHistory[this.eventHistory.length - 1], true);
    }

    public async editEvent(idEvent: number, isBack: boolean = false): Promise<void> {
        this.isCreateNewEvent = false;
        this.isEditEvent = true;
        await this.loadItem(idEvent);
        if (!isBack) {
            this.eventHistory.push(this.event.id);
        }
    }

    public async refreshEvent(): Promise<void> {
        this.isEditEvent = true;
        this.isCreateNewEvent = true;
        await this.loadItem();
        this.event = fillDataShape(this.defaultEvent);
    }

    public async createEvent(idParent: number = null): Promise<void> {
        this.isEditEvent = true;
        if (this.isCreateNewEvent) {
            this.snackBarService.openSnackBar('Для создания нового события, сохраните текущее!', 'snackbar-red');
            return;
        }
        if (!this.checkParentRetrievalCategory(idParent)) {
            return;
        }
        this.isCreateNewEvent = true;
        await this.loadItem();
        this.event = {...this.defaultEvent};
        if (idParent) {
            this.event.parentId = idParent;
            this.event.category = {
                id: null,
                name: null,
                code: null,
            };
        }
    }

    // TODO временно пока не будет поддержка мульти авторизации
    private checkParentRetrievalCategory(idParent: number | null): boolean {
        if (!idParent) {
            return true;
        }
        return this.checkRetrievalCategory();
    }
    private checkRetrievalCategory(): boolean {
        switch (this.event.category.name) {
            case 'smotr':
            case 'asus':
                this.snackBarService.openSnackBar('Данное действие пока не доступно для данных категорий событий! Ждите в ближайшем обновлении :)', 'snackbar-red');
                return false;
        }
        return true;
    }

    public async createRetrievalLink(idRetrieval: number): Promise<void> {
        const idEvent = this.event.id;
        console.log('add retrieval: ' + idEvent + idRetrieval);
        try {
            await this.eventService.addLink(idEvent, idRetrieval);
            this.snackBarService.openSnackBar('События успешно связаны!');
        } catch (err) {
            console.log(err);
        } finally {
            this.editEvent(this.event.id, true);
        }
    }

    public async deleteRetrievalLink(idRetrieval: number): Promise<void> {
        const idEvent = this.event.id;
        console.log('delete retrieval: ' + idEvent + idRetrieval);
        try {
            await this.eventService.deleteLink(idEvent, idRetrieval);
            this.snackBarService.openSnackBar('Связь между событиями успешно удалена!');
        } catch (err) {
            console.log(err);
        } finally {
            this.editEvent(this.event.id, true);
        }
    }

    private async saveCreatedEvent(saveMethod: ISaveMethodEvent): Promise<void> {
        try {
            if (this.event.parentId) {
                if (!this.checkRetrievalCategory()) {
                    return;
                }
                await this.eventService.postEventRetrieval(this.event);
            } else {
                await this.eventService.postEvent(this.event);
            }
            this.isCreateNewEvent = false;
            this.snackBarService.openSnackBar('Сохранено');
        } catch (err) {
            console.error(err);
        }
    }

    public async saveEvent(): Promise<void> {
        this.isLoading = true;
        try {
            const saveMethod: ISaveMethodEvent = await this.eventService.getSaveMethod(this.event);
            console.log(saveMethod);
            if (this.isCreateNewEvent) {
                this.saveCreatedEvent(saveMethod);
            } else {
                this.saveEditedEvent(saveMethod);
            }
        } catch {}
        this.isLoading = false;
    }

    private async saveEditedEvent(saveMethod: ISaveMethodEvent): Promise<void> {
        if (this.event.category.name === 'asus') {
            this.snackBarService.openSnackBar('Данное действие не допустимо для выбранного события!', 'snackbar-red');
        } else {
            try {
                await this.eventService.putEvent(this.event);
                this.snackBarService.openSnackBar('Изменения сохранены');
            } catch (err) {
                console.error(err);
            }
        }
    }

    public async deleteRetrievalEvent(retrieval: IRetrievalEventDto): Promise<void> {
        try {
            await this.eventService.deleteRetrievalEvents(
                this.event.id,
                retrieval.innerNotificationId,
            );
            const index = this.event.retrievalEvents.findIndex((item) => item.innerNotificationId === retrieval.innerNotificationId);
            this.event.retrievalEvents.splice(index, 1);
            this.snackBarService.openSnackBar('Мероприятие удалено');
        } catch (err) {
            console.error(err);
            this.snackBarService.openSnackBar('Ошибка', 'snackbar-red');
        }
    }

    public sendMessageToEvent(
        msg: string,
        category: 'comments' | 'facts'
    ): void {
        const fullComment = {
            comment: msg,
            createdAt: new Date(),
            displayName: this.currentAuthUser.displayName,
        };
        this.event[category].push(fullComment);
    }

    public setDeadlineToEvent(date: Date): void {
        this.event.deadline = new Date(date);
    }

    public getUserAvatarUrl(user: IUser): string {
        return this.avatarConfiguratorService.getAvatarPath(user?.photoId);
    }

    // TODO #SMOTR region start
    public async escalateEvent(message: string): Promise<void> {
        if (!this.event.originalId) {
            return;
        }
        this.isLoading = true;
        try {
            this.sendMessageToEvent(message, 'comments');
            await this.eventService.escalateSmotrEvent(this.event.originalId);
        } catch (e) {
            console.log(e);
            this.event.comments.pop();
        }
        this.isLoading = false;
    }
    public async closeEvent(message: string): Promise<void> {
        if (!this.event.originalId) {
            return;
        }
        this.isLoading = true;
        const tempStatus = this.event.status;
        try {
            this.sendMessageToEvent(message, 'comments');
            this.event.status = this.status.find(el => el.name === 'closed');
            await this.eventService.closeSmotrEvent(this.event.originalId);
        } catch (e) {
            console.log(e);
            this.event.status = tempStatus;
            this.event.comments.pop();
        }
        this.isLoading = false;
    }
    public async updateEvent(): Promise<void> {
        if (this.event.originalId) {
            const a = this.eventService.closeSmotrEvent(this.event.originalId);
            // console.log(a);
        }
    }
    // TODO #SMOTR region end

    public setDefaultEvent(): void {
        this.defaultEvent = {
            isUserCanEdit: true,
            itemNumber: 0,
            branch: 'Производство',
            category: {
                id: null,
                name: null,
                code: null,
            },
            description: '',
            deviationReason: 'Причина отклонения...',
            directReasons: '',
            establishedFacts: '',
            eventDateTime: new Date(),
            eventType: this.eventTypes ? this.eventTypes[0] : null,
            fixedBy: this.currentAuthUser,
            organization: 'АО Газпромнефть',
            priority: this.priority
                ? this.priority[2]
                    ? this.priority[2]
                    : this.priority[0]
                : undefined,
            responsibleOperator: this.currentAuthUser ? fillDataShape(this.currentAuthUser) : null,
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
            asusEvent: {
                category: '',
                workGroup: '',
                service: '',
                eoService: null,
                equipment: null,
                tmPlace: null,
            }
        };
    }

    private async loadReferences(): Promise<void> {
        const dataLoadQueue: Promise<void>[] = [];
        dataLoadQueue.push(
            this.eventService.getCategory().then((data) => {
                this.category = data;
                this.category$.next(data);
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
            this.eventService.getSmotrReference().then((data) => {
                this.smotrReference = data;
            }),
            this.eventService.getAsusUnits().then((data) => {
                this.asusUnits = data;
            }),
        );
        await Promise.all(dataLoadQueue);
    }

    public closeSearchWindow(): void {
        this.searchWindow$.next(null);
    }
}
