import { Injectable } from '@angular/core';
import {
    IEventsWidgetNotification,
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
    ISaveMethodEvent,
    IRetrievalEventDto,
    ISearchRetrievalWindow,
    IAsusTpPlace,
    IAsusTmPlace, ISubcategory
} from '../../models/events-widget';
import { EventService } from './event.service';
import { SnackBarService } from '../snack-bar.service';
import { fillDataShape } from '@shared/common-functions';
import { AvatarConfiguratorService } from '../avatar-configurator.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAlertWindowModel } from '@shared/models/alert-window.model';
import { filter, map } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { IMessage, IMessageFileAttachment } from '@shared/models/message.model';
import { FileAttachMenuService } from '../file-attach-menu.service';
import { IChatMessageWithAttachments } from '../../../widgets/EVJ/events-workspace/components/chat/chat.component';

@Injectable({
    providedIn: 'root'
})
export class EventsWorkspaceService {
    public event$: BehaviorSubject<IEventsWidgetNotification> = new BehaviorSubject<IEventsWidgetNotification>(null);

    public set event(value: IEventsWidgetNotification) {
        this.event$.next(value);
    }

    public get event(): IEventsWidgetNotification {
        return this.event$.getValue();
    }

    // public event: EventsWidgetNotification;
    public originalEvent: IEventsWidgetNotification;
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
    public subCategory: ISubcategory[] = [];
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
        map((cats) =>
            cats.filter((cat) => {
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
                    case 'ejs':
                    case 'modelCalculations':
                        return false;
                    default:
                        return true;
                }
            })
        )
    );
    //#endregion

    public currentAuthUser: IUser = null;

    public readonly statuses: { [id in EventsWidgetNotificationStatus]: string } = {
        new: 'Новое',
        inWork: 'В работе',
        closed: 'Завершено'
    };

    public readonly subCategories: { [id in number]: string } = {
        0: 'Распоряжения',
        1: 'Прием/передача смены'
    };

    public readonly priorities: { [id in EventsWidgetNotificationPriority]: string } = {
        danger: 'Высокий',
        warning: 'Средний',
        standard: 'Стандартный'
    };

    public readonly categories: { [id in EventsWidgetCategoryCode]: string } = {
        smotr: 'СМОТР',
        safety: 'Безопасность',
        tasks: 'Производственные задания',
        equipmentStatus: 'Состояния оборудования',
        drops: 'Сбросы',
        asus: 'АСУС (КИП и АСУТП)',
        ejs: 'ЭЖС',
        indicators: 'Производственные показатели',
        resources: 'Вспомогательные ресурсы',
        modelCalculations: 'ЦД'
    };

    private defaultEvent: IEventsWidgetNotification = null;

    public searchWindow$: BehaviorSubject<ISearchRetrievalWindow> = new BehaviorSubject<ISearchRetrievalWindow>(null);
    public ewAlertInfo$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<IAlertWindowModel>(null);

    constructor(
        private eventService: EventService,
        private snackBarService: SnackBarService,
        private avatarConfiguratorService: AvatarConfiguratorService,
        private fileAttachMenuService: FileAttachMenuService
    ) {
    }

    public async loadItem(id: number = null): Promise<void> {
        this.isLoading = true;
        try {
            this.setDefaultEvent();
            if (id) {
                await this.getEvent(id);
            }
            this.eventService.currentEventId$.next(id);
            this.loadReferences();
        } catch (err) {
            console.error(err);
        } finally {
            setTimeout(() => (this.isLoading = false), 200);
        }
    }

    private async getEvent(id: number): Promise<void> {
        this.event = await this.eventService.getEvent(id);
        this.event = { ...this.defaultEvent, ...this.event };
        this.event.comments = await this.processAttachments(this.event.comments);
        this.event.facts = await this.processAttachments(this.event.facts);
        this.originalEvent = { ...this.event };
        const dataLoadQueue: Promise<void>[] = [];
        if (this.event.category.name === 'asus') {
            await this.asusReferencesLoad();
            const saveMethod = await this.eventService.getSaveMethod(this.event);
            dataLoadQueue.push(
                this.eventService
                    .getAsusEquipments(this.event.asusEvent.tmPlace, saveMethod)
                    .then((data) => {
                        this.asusEquipments = data;
                    }),
                this.eventService
                    .getAsusEOServices(this.event.asusEvent.equipment, saveMethod)
                    .then((data) => {
                        this.asusEOServices = data;
                    })
            );
        }
        await Promise.all(dataLoadQueue);
    }

    public async goBackEvent(isContinue: boolean = false): Promise<void> {
        if (!(this.eventHistory?.length > 0)) {
            this.event = null;
            this.originalEvent = { ...this.event };
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
        this.event.fixedBy = { ...this.currentAuthUser };
        this.originalEvent = { ...this.event };
    }

    public async createEvent(idParent: number = null): Promise<void> {
        this.isEditEvent = true;
        if (this.isCreateNewEvent) {
            this.snackBarService.openSnackBar(
                'Для создания нового события, сохраните текущее!',
                'snackbar-red'
            );
            return;
        }
        if (!this.checkParentRetrievalCategory(idParent)) {
            return;
        }
        this.isCreateNewEvent = true;
        await this.loadItem();
        this.event = { ...this.defaultEvent };
        this.event.fixedBy = { ...this.currentAuthUser };
        if (idParent) {
            this.event.parentId = idParent;
            this.event.category = {
                id: null,
                name: null,
                code: null
            };
        }
        this.originalEvent = { ...this.event };
    }

    // TODO временно пока не будет поддержка мульти авторизации
    private checkParentRetrievalCategory(idParent: number | null): boolean {
        if (!idParent) {
            return true;
        }
        return this.checkRetrievalCategory();
    }

    public checkRetrievalCategory(): boolean {
        switch (this.event.category.name) {
            case 'smotr':
            case 'asus':
                this.snackBarService.openSnackBar(
                    'Данное действие пока не доступно для данных категорий событий! Ждите в ближайшем обновлении :)',
                    'snackbar-red'
                );
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
        let event: IEventsWidgetNotification = null;
        try {
            if (this.event.parentId) {
                if (!this.checkRetrievalCategory()) {
                    return;
                }
                event = await this.eventService.postEventRetrieval(this.event);
            } else {
                event = await this.eventService.postEvent(this.event, saveMethod);
            }
            if (event?.id) {
                this.event.id = event.id;
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
            if (!saveMethod) {
                throw error('no save method');
            }
            if (this.isCreateNewEvent) {
                await this.saveCreatedEvent(saveMethod);
            } else {
                await this.saveEditedEvent(saveMethod);
            }
        } catch (e) {
            console.error(e);
        }
        this.isLoading = false;
    }

    private async saveEditedEvent(saveMethod: ISaveMethodEvent): Promise<void> {
        if (this.event.category.name === 'asus') {
            this.snackBarService.openSnackBar(
                'Данное действие не допустимо для выбранного события!',
                'snackbar-red'
            );
        } else {
            try {
                await this.eventService.putEvent(this.event, saveMethod);
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
                retrieval.innerNotificationId
            );
            const index = this.event.retrievalEvents.findIndex(
                (item) => item.innerNotificationId === retrieval.innerNotificationId
            );
            this.event.retrievalEvents.splice(index, 1);
            this.snackBarService.openSnackBar('Мероприятие удалено');
        } catch (err) {
            console.error(err);
            this.snackBarService.openSnackBar('Ошибка', 'snackbar-red');
        }
    }

    public sendMessageToEvent(
        msg: IChatMessageWithAttachments,
        category: 'comments' | 'facts'
    ): void {
        this.isLoading = true;
        this.uploadNewlyAddedAttachments(msg.attachments).then((attachments) => {
            const fullComment = {
                comment: msg.msg,
                createdAt: new Date(),
                displayName: this.currentAuthUser.displayName,
                attachedFiles: attachments
            };
            this.event[category].push(fullComment);
            this.isLoading = false;
        });
    }

    public setDeadlineToEvent(date: Date): void {
        this.event.deadline = new Date(date);
    }

    public getUserAvatarUrl(user: IUser): string {
        return this.avatarConfiguratorService.getAvatarPath(user?.photoId);
    }

    // TODO #SMOTR region start
    public async escalateEvent(message: IChatMessageWithAttachments): Promise<void> {
        if (!this.event.originalId) {
            return;
        }
        this.isLoading = true;
        try {
            this.sendMessageToEvent(message, 'comments');
            const saveMethod = await this.eventService.getSaveMethod(this.event);
            await this.eventService.escalateSmotrEvent(saveMethod, this.event);
        } catch (e) {
            console.log(e);
            this.event.comments.pop();
        }
        this.isLoading = false;
    }

    public async closeEvent(message: IChatMessageWithAttachments): Promise<void> {
        if (!this.event.originalId) {
            return;
        }
        this.isLoading = true;
        const tempStatus = { ...this.event.status };
        try {
            this.sendMessageToEvent(message, 'comments');
            const saveMethod = await this.eventService.getSaveMethod(this.event);
            await this.eventService.closeSmotrEvent(saveMethod, this.event);
            this.event.status = this.status.find((el) => el.name === 'closed');
            this.sendMessageToEvent(message, 'comments');
        } catch (e) {
            console.log(e);
            this.event.comments.pop();
            this.event.status = tempStatus;
        }
        this.isLoading = false;
    }

    public async updateEvent(): Promise<void> {
        if (this.event.originalId) {
            // const a = this.eventService.closeSmotrEvent(this.event.originalId);
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
                id: 0,
                name: null,
                code: null
            },
            description: '',
            deviationReason: '',
            directReasons: '',
            establishedFacts: '',
            eventDateTime: new Date(),
            eventType: this.eventTypes ? this.eventTypes[0] : null,
            fixedBy: null,
            organization: 'АО Газпромнефть',
            priority: this.priority
                ? this.priority[2]
                    ? this.priority[2]
                    : this.priority[0]
                : undefined,
            responsibleOperator: null,
            retrievalEvents: [],
            severity: 'Critical',
            status: this.status
                ? this.status[0]
                : {
                    id: 0,
                    name: null,
                    code: null
                },
            equipmentCategory: null,
            deadline: new Date(),
            graphValues: null,
            isAcknowledged: false,
            unit: this.units.find((u) => u.id === this.currentAuthUser?.unitId) ?? null,
            unitName: null,
            facts: [],
            comments: [],
            shiftPassEvent: {
                id: 0,
                notes: '',
                shiftMembers: '',
                compressorsInWork: '',
                equipmentAtRepair: '',
                equipmentReserved: '',
                fireExtinguishingEquipmentStatus: '',
                pressureGaugesStatus: '',
                shiftComments: '',
                shiftDangerWorks: '',
                shiftEstablishedFacts: '',
                shiftInstruction: '',
                shiftOtherEvents: '',
                shiftPropertyNotes: '',
                shiftRepairWorks: '',
                ventilationStatus: '',
                safetyAndEmergencyProtectionStatus: ''
            },
            asusEvent: {
                category: '',
                workGroup: '',
                service: '',
                eoService: null,
                equipment: null,
                tmPlace: null
            },
            productionTasks: {
                subCategory: null,
                start: undefined,
                inWork: undefined,
                close: undefined
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
            this.eventService.getSubcategory().then((data) => {
                this.subCategory = data.filter((item) => !!item.description);
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
            // TODO delete
            this.eventService.getSmotrReference().then((data) => {
                this.smotrReference = data;
            })
        );
        try {
            await Promise.all(dataLoadQueue);
        } catch {
            console.warn('Promise.allSettled');
        }
    }

    public closeSearchWindow(): void {
        this.searchWindow$.next(null);
    }

    private async asusReferencesLoad(): Promise<void> {
        const dataLoadQueue: Promise<void>[] = [];
        const saveMethod: ISaveMethodEvent = await this.eventService.getSaveMethod(this.event);
        dataLoadQueue.push(
            this.eventService.getAsusCategories(saveMethod).then((data) => {
                this.asusCategories = data;
            }),
            this.eventService.getAsusWorkgroup(saveMethod).then((data) => {
                this.asusWorkgroup = data;
            }),
            this.eventService.getAsusServices(saveMethod).then((data) => {
                this.asusServices = data;
            }),
            this.eventService.getAsusUnits(saveMethod).then((data) => {
                this.asusUnits = data;
            })
        );
        try {
            await Promise.all(dataLoadQueue);
        } catch {
            console.warn('Promise.allSettled');
        }
    }

    public async changeCategory(): Promise<void> {
        console.log(this.event.category);
        console.log(this.event);

        if (this.event.category.name === 'asus') {
            await this.asusReferencesLoad();
        }
    }

    public eventCompare(
        event1: IEventsWidgetNotification,
        event2: IEventsWidgetNotification
    ): boolean {
        return JSON.stringify(event1) === JSON.stringify(event2);
    }

    private async getFileInfoById(file: IMessageFileAttachment): Promise<any> {
        return await this.fileAttachMenuService.getFileInfoById(file.fileId);
    }

    private async uploadAttachment(file: File): Promise<any> {
        return await this.fileAttachMenuService.uploadFile(file);
    }

    private async processAttachments(messages: IMessage[]): Promise<IMessage[]> {
        messages.map(async (message) => {
            message.attachedFiles.map(async (file) => {
                // 00000000-0000-0000-0000-000000000000 - handle corrupted fileId uid
                if (file.fileId && file.fileId !== '00000000-0000-0000-0000-000000000000') {
                    const fileInfo = await this.getFileInfoById(file);
                    file.size = this.fileAttachMenuService.convertBytes(fileInfo.length);
                    file.name = fileInfo.fileName;
                    file.contentType = fileInfo.contentType;
                }
            });
        });
        return messages;
    }

    private async uploadNewlyAddedAttachments(
        files: IMessageFileAttachment[]
    ): Promise<IMessageFileAttachment[]> {
        files.map(async (file) => {
            if (!file.fileId && file._file) {
                file.fileId = await this.uploadAttachment(file._file);
                file._file = null;
            }
        });
        return files;
    }

    public async changeStatus(status: IStatus): Promise<void> {
        this.isLoading = true;
        try {
            this.event = await this.eventService.incrementStatus(this.event.id, status.name);
        } catch (error) {
            console.log(error);
        }
        this.isLoading = false;
    }
}
