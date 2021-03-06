import { Injectable } from '@angular/core';
import {
    EventsWidgetCategoryCode,
    EventsWidgetNotificationPriority,
    EventsWidgetNotificationStatus,
    IAsusCategories,
    IAsusEOService,
    IAsusService,
    IAsusTmPlace,
    IAsusTpPlace,
    IAsusWorkgroup,
    ICategory,
    IEventsWidgetAttributes,
    IEventsWidgetNotification,
    IExtraOptionsWindow,
    IPriority,
    IRetrievalEventDto,
    ISaveMethodEvent,
    ISearchRetrievalWindow,
    ISmotrReference,
    IStatus,
    ISubcategory,
    IUnitEvents,
    IUser,
} from '../../../models/EVJ/events-widget';
import { EventService } from './event.service';
import { SnackBarService } from '../../snack-bar.service';
import { fillDataShape } from '@shared/functions/common-functions';
import { AvatarConfiguratorService } from '@core/service/avatar-configurator.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAlertWindowModel } from '@shared/interfaces/alert-window.model';
import { filter, map } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { IMessage, IMessageFileAttachment } from '@shared/interfaces/message.model';
import { FileAttachMenuService } from '../../file-attach-menu.service';
import { IChatMessageWithAttachments } from '@widgets/EVJ/events-workspace/components/chat/chat.component';
import { ClaimService, EnumClaimGlobal } from '../../claim.service';
import { KpeWorkspaceService } from './kpe-workspace.service';
import { IKpeNotification } from '../../../models/EVJ/kpe-workspace.model';
import { IKDPAZRequest } from '@widgets/EVJ/evj-events-workspace/evj-cmid-event/components/evj-cmid-event-edit-form/evj-cmid-event-edit-form.interfaces';

@Injectable({
    providedIn: 'root',
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

    public attributes$: BehaviorSubject<IEventsWidgetAttributes> = new BehaviorSubject<IEventsWidgetAttributes>(null);

    private readonly parentCategoryId = {
        safety: 1002,
        tasks: 1003,
        equipmentStatus: 1004
    }

    //#region REFERENCES
    public priority: IPriority[] = [];
    public status: IStatus[] = [];
    public subCategory$: BehaviorSubject<ISubcategory[]> = new BehaviorSubject<ISubcategory[]>([]);
    public tasksSubcategoryFilter: Observable<ISubcategory[]> = this.getSubcategoryFilter(this.parentCategoryId.tasks);
    public safetySubcategoryFilter: Observable<ISubcategory[]> = this.getSubcategoryFilter(this.parentCategoryId.safety);
    public equipmentStatusSubcategoryFilter: Observable<ISubcategory[]> = this.getSubcategoryFilter(this.parentCategoryId.equipmentStatus);
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
    public asusUnits$: BehaviorSubject<IAsusTmPlace[]> = new BehaviorSubject<IAsusTmPlace[]>([]);
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
        new: '??????????',
        inWork: '?? ????????????',
        closed: '??????????????????',
        wasted: '????????????????????',
    };

    public readonly subCategories: { [id in number]: string } = {
        0: '????????????????????????',
        1: '??????????/???????????????? ??????????',
    };

    public readonly priorities: { [id in EventsWidgetNotificationPriority]: string } = {
        danger: '??????????????',
        warning: '??????????????',
        standard: '??????????????????????',
    };

    public readonly categories: { [id in EventsWidgetCategoryCode]: string } = {
        smotr: '??????????',
        safety: '????????????????????????',
        tasks: '???????????????????????????????? ??????????????',
        equipmentStatus: '?????????????????? ????????????????????????',
        drops: '????????????',
        asus: '???????? (?????? ?? ??????????)',
        ejs: '?????????????????????? ???????????? ??????????????',
        indicators: '???????????????????????????????? ????????????????????',
        resources: '?????????????????????????????? ??????????????',
        modelCalculations: '????',
        cmidCard: '????????',
    };

    private defaultEvent: IEventsWidgetNotification = null;

    public searchWindow$: BehaviorSubject<ISearchRetrievalWindow> = new BehaviorSubject<ISearchRetrievalWindow>(null);
    public ewAlertInfo$: BehaviorSubject<IAlertWindowModel> = new BehaviorSubject<IAlertWindowModel>(null);
    public extraOptionsWindow$: BehaviorSubject<IExtraOptionsWindow> = new BehaviorSubject<IExtraOptionsWindow>(null);
    public acceptButton$: BehaviorSubject<IKpeNotification> = new BehaviorSubject<IKpeNotification>(null);
    public getResponsible$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
    public eventSaved$: BehaviorSubject<IEventsWidgetNotification> = new BehaviorSubject<IEventsWidgetNotification>(null);
    public eventSentToSave$: BehaviorSubject<IEventsWidgetNotification> = new BehaviorSubject<IEventsWidgetNotification>(null);

    get isCategoryEdit(): boolean {
        return (
            this.isCreateNewEvent ||
            this.claimService.claimGlobal$.value.some((x) => x === EnumClaimGlobal.EventsChangeCategory)
        );
    }

    get subCategory(): ISubcategory[] {
        return this.subCategory$.getValue();
    }

    set subCategory(value: ISubcategory[]) {
        this.subCategory$.next([...value]);
    }

    constructor(
        private eventService: EventService,
        private snackBarService: SnackBarService,
        private avatarConfiguratorService: AvatarConfiguratorService,
        private fileAttachMenuService: FileAttachMenuService,
        private claimService: ClaimService,
        private kpeWorkspaceService: KpeWorkspaceService
    ) {}

    public async loadItem(id: number = null): Promise<void> {
        this.isLoading = true;
        try {
            await this.loadReferences();
            this.setDefaultEvent();
            if (id) {
                await this.getEvent(id);
            }
            this.eventService.currentEventId$.next(id);
        } catch (err) {
            console.error(err);
        } finally {
            setTimeout(() => (this.isLoading = false), 200);
        }
    }

    private async getEvent(id: number): Promise<void> {
        const event = await this.eventService.getEvent(id);
        this.event = { ...this.defaultEvent, ...event };
        this.event.comments = await this.processAttachments(this.event.comments);
        this.event.facts = await this.processAttachments(this.event.facts);
        this.originalEvent = { ...this.event };
        if (this.event.category.name === 'asus') {
            await this.asusReferencesLoad();
        }
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
            this.snackBarService.openSnackBar('?????? ???????????????? ???????????? ??????????????, ?????????????????? ??????????????!', 'error');
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
                code: null,
            };
        }
        this.originalEvent = { ...this.event };
    }

    // TODO ???????????????? ???????? ???? ?????????? ?????????????????? ???????????? ??????????????????????
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
                    '???????????? ???????????????? ???????? ???? ???????????????? ?????? ???????????? ?????????????????? ??????????????! ?????????? ?? ?????????????????? ???????????????????? :)',
                    'error'
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
            this.snackBarService.openSnackBar('?????????????? ?????????????? ??????????????!');
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
            this.snackBarService.openSnackBar('?????????? ?????????? ?????????????????? ?????????????? ??????????????!');
        } catch (err) {
            console.log(err);
        } finally {
            this.editEvent(this.event.id, true);
        }
    }

    private async saveCreatedEvent(saveMethod: ISaveMethodEvent): Promise<void> {
        let event: IEventsWidgetNotification = null;
        this.eventSentToSave$.next(event);
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
                this.eventSaved$.next(this.event);
            }
            this.isCreateNewEvent = false;

            if (this.event.kpeAdditionalParameter) {
                await this.accept(this.acceptButton$.getValue());
            }

            this.snackBarService.openSnackBar('??????????????????');
        } catch (err) {
            console.error(err);
        }
    }

    public async accept(data: IKpeNotification): Promise<void> {
        try {
            const res = await this.kpeWorkspaceService.postKpeNotificationParameters(this.event, data);
            this.event.kpeAdditionalParameter = res;
        } catch (error) {
            console.error(error);
        }
    }

    public async saveEvent(): Promise<void> {
        this.isLoading = true;
        try {
            const saveMethod: ISaveMethodEvent = await this.eventService.getSaveMethod(this.checkEvent(this.event));
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
        this.eventSentToSave$.next(this.event);
        if (this.event.category.name === 'asus') {
            this.snackBarService.openSnackBar('???????????? ???????????????? ???? ?????????????????? ?????? ???????????????????? ??????????????!', 'error');
        } else {
            try {
                const event = await this.eventService.putEvent(this.event, saveMethod);
                if (event) {
                    this.eventSaved$.next(event);
                }
                this.snackBarService.openSnackBar('?????????????????? ??????????????????');
            } catch (err) {
                console.error(err);
            }
        }
    }

    public async deleteRetrievalEvent(retrieval: IRetrievalEventDto): Promise<void> {
        try {
            await this.eventService.deleteRetrievalEvents(this.event.id, retrieval.innerNotificationId);
            const index = this.event.retrievalEvents.findIndex(
                (item) => item.innerNotificationId === retrieval.innerNotificationId
            );
            this.event.retrievalEvents.splice(index, 1);
            this.snackBarService.openSnackBar('?????????????????????? ??????????????');
        } catch (err) {
            console.error(err);
            this.snackBarService.openSnackBar('????????????', 'error');
        }
    }

    public async sendMessageToEvent(msg: IChatMessageWithAttachments, category: 'comments' | 'facts'): Promise<void> {
        this.isLoading = true;
        console.log(msg);
        await this.uploadNewlyAddedAttachments(msg.attachments).then((attachments) => {
            const fullComment = {
                comment: msg?.msg ? msg?.msg : msg.toString(),
                createdAt: new Date(),
                displayName: this.currentAuthUser.displayName,
                attachedFiles: attachments,
            };
            this.event[category].push(fullComment);
            this.isLoading = false;
        });
    }

    public setDeadlineToEvent(date: Date): void {
        this.event.deadline = new Date(date);
    }

    public setStartToEvent(date: Date): void {
        this.event.eventDateTime = new Date(date);
    }

    public setEventEndDateTime(date: Date): void {
        this.event.eventEndDateTime = new Date(date);
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
            const fullComment = {
                comment: message,
                createdAt: new Date(),
                displayName: this.currentAuthUser.displayName,
                attachedFiles: null,
            };
            this.event.comments.push(fullComment);
            const saveMethod = await this.eventService.getSaveMethod(this.event);
            this.event.deviationData.escalateLevelNumber++;
            await this.eventService.escalateSmotrEvent(saveMethod, this.event);
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
        const tempStatus = { ...this.event.status };
        try {
            const fullComment = {
                comment: message,
                createdAt: new Date(),
                displayName: this.currentAuthUser.displayName,
                attachedFiles: null,
            };
            this.event.comments.push(fullComment);
            const saveMethod = await this.eventService.getSaveMethod(this.event);
            await this.eventService.closeSmotrEvent(saveMethod, this.event);
            this.event.status = this.status.find((el) => el.name === 'closed');
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
            branch: '????????????????????????',
            category: {
                id: 0,
                name: null,
                code: null,
            },
            subCategory: null,
            description: '',
            deviationReason: '',
            directReasons: '',
            eventDateTime: new Date(),
            eventType: this.eventTypes ? this.eventTypes[0] : null,
            fixedBy: null,
            organization: '???? ????????????????????????',
            priority: this.priority ? (this.priority[2] ? this.priority[2] : this.priority[0]) : undefined,
            responsibleOperator: this.getResponsible$.getValue() ?? null,
            retrievalEvents: [],
            severity: 'Critical',
            status: this.status
                ? this.status[0]
                : {
                      id: 0,
                      name: null,
                      code: null,
                      description: null,
                  },
            equipmentCategory: null,
            deadline: new Date(),
            graphValues: null,
            isAcknowledged: false,
            unit: this.units.find((u) => u.id === this.attributes$?.getValue()?.UnitId) ?? null,
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
                safetyAndEmergencyProtectionStatus: '',
            },
            asusEvent: {
                category: '',
                workGroup: '',
                service: '',
                eoService: null,
                equipment: null,
                tmPlace: null,
            },
            productionTasks: {
                subCategory: null,
            },
            eventEndDateTime: null,
            smpo: {},
            smotr: {}
        };
    }

    private async loadReferences(): Promise<void> {
        const dataLoadQueue: Promise<void>[] = [];
        dataLoadQueue.push(
            this.eventService.getCategory().then((data) => {
                this.category = data;
                // TODO ?????????? ?????????????? ?? ????
                const idx = this.category.findIndex((value) => value.name === 'modelCalculations');
                this.category.splice(idx, 1);
                this.category$.next(this.category);
            }),
            this.eventService.getUser().then((data) => {
                this.users = data;
            }),
            this.eventService.getStatus().then((data) => {
                this.status = data;
            }),
            this.eventService.getSubcategory().then((data) => {
                this.subCategory = data.filter((item) => !!item.description && item.isVisibleToFilter);
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

    public closeExtraOptionsWindow(): void {
        this.extraOptionsWindow$.next(null);
    }

    private async asusReferencesLoad(): Promise<void> {
        const dataLoadQueue: Promise<void>[] = [];
        const saveMethod: ISaveMethodEvent = await this.eventService.getSaveMethod(this.event);
        const referenceMethod: ISaveMethodEvent = await this.eventService.getReferenceMethod(this.event);
        dataLoadQueue.push(
            this.eventService.getAsusCategories(referenceMethod, this.event?.id).then((data) => {
                this.asusCategories = data;
            }),
            this.eventService.getAsusWorkgroup(saveMethod).then((data) => {
                this.asusWorkgroup = data;
            }),
            this.eventService.getAsusServices(saveMethod).then((data) => {
                this.asusServices = data;
            }),
            this.eventService.getAsusUnits(referenceMethod, this.event?.id).then((data) => {
                this.asusUnits$.next(data);
            })
        );
        try {
            await Promise.all(dataLoadQueue);
        } catch {
            console.warn('Promise.allSettled');
        }
    }

    public async changeCategory(): Promise<void> {
        if (this.event.category.name === 'tasks') {
            this.event.subCategory = this.subCategory?.find((value) => value.code === '0');
        }
        if (this.event.category.name === 'asus') {
            await this.asusReferencesLoad();
        }
    }

    public eventCompare(event1: IEventsWidgetNotification, event2: IEventsWidgetNotification): boolean {
        if (!event1) {
            return true;
        }
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

    private async uploadNewlyAddedAttachments(files: IMessageFileAttachment[]): Promise<IMessageFileAttachment[]> {
        files?.map(async (file) => {
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

    public async getAutoResponsible(unitId: number): Promise<void> {
        try {
            const responsibleUserId = await this.eventService.getResponsibleUserId(unitId);
            const responsibleUser = await this.eventService.getResponsibleUser(responsibleUserId.userId);
            this.getResponsible$.next(responsibleUser);
        } catch {
            this.getResponsible$.next(null);
        }
    }

    public async getUnitResponsibleUsers(unitId: number): Promise<IUser[]> {
        try {
            return await this.eventService.getUnitResponsibleUsers(unitId);
        } catch {
            console.log(error);
        }
    }

    public saveCmidCards(cards: IKDPAZRequest[]): Observable<unknown> {
        return this.eventService.postKDPAZCards(cards);
    }

    private checkEvent(eventObj: IEventsWidgetNotification): IEventsWidgetNotification {
        const event = {...eventObj};
        if (eventObj?.subCategory?.id !== 1060) {
            event.smpo = null;
        }

        return event;
    }

    private getSubcategoryFilter(parentCategoryId: number): Observable<ISubcategory[]> {
        return this.subCategory$.asObservable().pipe(
            filter((item) => item !== null),
            map((subcategories) => subcategories.filter(
                (subcategory) => subcategory.isCanBeManuallySelected && (subcategory.parentCategoryId === parentCategoryId)
            ))
        );
    }
}
