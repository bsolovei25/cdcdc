import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Inject,
    OnDestroy,
    HostListener,
} from '@angular/core';
import { EventService } from '../../services/event.service';
import {
    EventsWidgetNotification,
    EventsWidgetNotificationStatus,
    EventsWidgetNotificationPriority,
    IStatus,
    IPriority,
    IUser,
    ICategory,
    EventsWidgetCategoryCode,
    EventsWidgetData,
    IUnitEvents,
} from '../../models/events-widget';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WidgetService } from '../../services/widget.service';
import { DateAdapter } from '@angular/material/core';
import { AuthService } from '@core/service/auth.service';
import { WidgetPlatform } from '../../models/widget-platform';

import { ITime } from '../../models/time-data-picker';
import { AppConfigService } from '../../../services/appConfigService';
import { EventsWorkspaceService } from '../../services/events-workspace.service';

@Component({
    selector: 'evj-events-workspace',
    templateUrl: './events-workspace.component.html',
    styleUrls: ['./events-workspace.component.scss'],
})
export class EventsWorkSpaceComponent extends WidgetPlatform implements OnInit, OnDestroy {
    event: EventsWidgetNotification;
    isLoading: boolean = true;

    isUserCanEdit: boolean = true; // может пользователь редактировать

    comments: string[] = []; // TOFIX
    fact: string[] = []; // TOFIX
    isNew: boolean = true;

    isEdit: boolean = false; // изменено ли событие

    isClickFact: number; // хз
    isClickComment: number; // хз

    priority: IPriority[]; // TOFIX
    status: IStatus[]; // TOFIX
    user: IUser[]; // TOFIX
    category: ICategory[]; // TOFIX
    place: string; // TOFIX
    equipmentCategory: any; // TOFIX
    eventTypes: any; // TOFIX

    nameUser: string; // TOFIX
    nameUserFirstName: string; // TOFIX
    nameUserLastName: string; // TOFIX

    public userAvatar: string = 'assets/icons/widgets/admin/default_avatar2.svg'; // TOFIX
    public userAvatarDefault: string = 'assets/icons/widgets/admin/default_avatar2.svg';
    userChoosen: boolean = false; // ответственный
    userMeropChoosen: boolean = false; // ответственный в retrieval
    chooseNameUser: string; // TOFIX
    userBrigade: string; // TOFIX
    userDescription: string; // TOFIX

    saveEvent: boolean;
    isEditing: boolean = false;

    progressLineHeight: number; // хз

    dateComment: Date; // хз

    isNewRetrieval: EventsWidgetNotification = null; // TOFIX

    openEvent: boolean = true; // отображение кнопок в хэдере

    statuses: { [id in EventsWidgetNotificationStatus]: string } = { // TOFIX
        new: 'Новое',
        inWork: 'В работе',
        closed: 'Завершено',
    };

    priorities: { [id in EventsWidgetNotificationPriority]: string } = { // TOFIX
        danger: 'Высокий',
        warning: 'Средний',
        standard: 'Стандартный',
    };

    categories: { [id in EventsWidgetCategoryCode]: string } = { // TOFIX
        smotr: 'СМОТР',
        safety: 'Безопасноть',
        tasks: 'Производственные задания',
        equipmentStatus: 'Состояния оборудования',
        drops: 'Сбросы',
    };

    units: IUnitEvents[]; // TOFIX

    eventLegends: any = [{ isLegend: true }, { isLegend: false }]; // TOFIX

    idUser: number = 0; // TOFIX

    static itemCols: number = 20;
    static itemRows: number = 5;

    dataPicker: boolean = false; // хз

    dateChoose: Date; // хз
    dateChooseNew: Date; // хз

    private fsUrl: string;

    @ViewChild('input') input: ElementRef;
    @ViewChild('input2') input2: ElementRef;
    @ViewChild('newInput') newInput: ElementRef;
    @ViewChild('newInput2') newInput2: ElementRef;
    @ViewChild('scroll') scroll: ElementRef;
    @ViewChild('scroll2') scroll2: ElementRef;
    @ViewChild('graph') graphWidht: ElementRef;
    @ViewChild('progress') progress: ElementRef;

    constructor(
        private ewService: EventsWorkspaceService,
        private eventService: EventService,
        private snackBar: MatSnackBar,
        public widgetService: WidgetService,
        private dateAdapter: DateAdapter<Date>,
        private authService: AuthService,
        private configService: AppConfigService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.subscriptions.push(
            this.authService.user$.subscribe((data: IUser) => {
                if (data) {
                    this.nameUser = data.firstName + ' ' + data.lastName;
                    this.nameUserFirstName = data.firstName;
                    this.nameUserLastName = data.lastName;
                    this.ewService.currentAuthUser = data;
                }
            })
        );

        this.widgetIcon = 'document';
        this.dateAdapter.setLocale('ru');
        this.fsUrl = this.configService.fsUrl;
    }

    ngOnInit(): void {
        super.widgetInit();
        this.isLoading = false;
        this.ewService.loadItem();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.eventService.event$.subscribe((value) => {
                if (value) {
                    this.openEvent = false;
                    this.setEventByInfo(value);
                } else {
                    this.event = value;
                }
            })
        );
    }

    protected dataHandler(ref: any): void {
        this.wsHandler(ref);
    }

    private async setEventByInfo(value: EventsWidgetNotification | number): Promise<void> {
        this.isLoading = true;

        this.resetComponent();
        this.dataPicker = false;
        this.isNew = false;

        if (typeof value !== 'number') {
            this.chooseNameUser =
                value.fixedBy.firstName +
                ' ' +
                value.fixedBy.middleName +
                ' ' +
                value.fixedBy.lastName;
            this.event = value;
            this.dateChoose = value.deadline;
            this.userAvatar = value?.fixedBy?.photoId
                ? `${this.fsUrl}/${value?.fixedBy?.photoId}`
                : this.userAvatarDefault;
            this.isUserCanEdit = value.isUserCanEdit;
            console.log(value);
            console.log(this.isUserCanEdit);
        }

        await this.loadItem(typeof value === 'number' ? value : undefined);
        this.progressLine();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    private wsHandler(data: EventsWidgetData): void {
        if (this.event?.id !== data.notification.id) {
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
        this.event = null;
    }

    @HostListener('document:resize', ['$event'])
    OnResize(event): void {
        try {
            this.progressLine();
        } catch (error) {}
    }

    // нажатие на кнопку в хэдере
    createdEvent(event: boolean): void {
        event ? this.createEvent() : this.saveItem();
    }

    resetComponent(): void {
        if (
            document.getElementById('overlay-retrieval') &&
            document.getElementById('overlay-retrieval').style.display === 'block'
        ) {
            document.getElementById('overlay-retrieval').style.display = 'none';
        }
        if (
            document.getElementById('overlay-chart') &&
            document.getElementById('overlay-chart').style.display === 'block'
        ) {
            document.getElementById('overlay-chart').style.display = 'none';
        }
        this.isNew = false;
        this.isNewRetrieval = null;
    }

    // для существующего event
    onSendMessage(): void {
        if (this.input2.nativeElement.value) {
            const commentInfo = {
                comment: this.input2.nativeElement.value,
                createdAt: new Date(),
                displayName: this.nameUser,
            };
            this.event.comments.push(commentInfo);
            this.input2.nativeElement.value = '';
            this.dateComment = new Date();
            setTimeout(() => {
                this.scrollCommentBottom();
            }, 50);
        } else if (this.input.nativeElement.value) {
            const factInfo = {
                comment: this.input.nativeElement.value,
                createdAt: new Date(),
                displayName: this.nameUser,
            };
            this.event.facts.push(factInfo);
            this.input.nativeElement.value = '';
            setTimeout(() => {
                this.scrollFactBottom();
            }, 50);
        }
    }

    // при создании retrieval event
    onSendNewMessage(): void {
        if (this.newInput2.nativeElement.value) {
            if (this.isNewRetrieval.facts === undefined) {
                this.isNewRetrieval.facts = [];
            }
            const factInfo = {
                comment: this.newInput2.nativeElement.value,
                createdAt: new Date(),
                displayName: this.nameUser,
            };
            this.isNewRetrieval.facts.push(factInfo);
            this.newInput2.nativeElement.value = '';
            setTimeout(() => {
                this.scrollFactBottom();
            }, 50);
        } else if (this.newInput.nativeElement.value) {
            if (this.isNewRetrieval.comments === undefined) {
                this.isNewRetrieval.comments = [];
            }
            const commentInfo = {
                comment: this.newInput.nativeElement.value,
                createdAt: new Date(),
                displayName: this.nameUser,
            };
            this.isNewRetrieval.comments.push(commentInfo);
            this.newInput.nativeElement.value = '';
            setTimeout(() => {
                this.scrollCommentBottom();
            }, 50);
        }
    }

    clickFact(fact, index): void {
        for (let i of this.event.facts) {
            i.active = false;
        }
        fact.active = !fact.active;
        if (fact.active === true) {
            this.isClickFact = index;
        } else {
            this.isClickFact = null;
        }
    }

    clickComment(comment, index): void {
        for (let i of this.event.comments) {
            i.active = false;
        }
        comment.active = !comment.active;
        if (comment.active === true) {
            this.isClickComment = index;
        } else {
            this.isClickComment = null;
        }
    }
    scrollCommentBottom(): void {
        this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
    }
    scrollFactBottom(): void {
        this.scroll2.nativeElement.scrollTop = this.scroll2.nativeElement.scrollHeight;
    }

    onEnterPush(event?: any): void {
        if (event.keyCode === 13) {
            this.onSendMessage();
        }
    }

    async createEvent(): Promise<void> {
        await this.loadItem();
        this.changeCategory();
        this.isNew = true;

        this.dataPicker = false;

        this.dateChoose = new Date();

        this.event = {
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
            responsibleOperator: this.user[this.idUser - 1],
            retrievalEvents: [],
            severity: 'Critical',
            status: this.status ? this.status[0] : null,
            iconUrl: 'number',
            iconUrlStatus: 'number',
            statusName: '',
            equipmentCategory: this.equipmentCategory ? this.equipmentCategory[0] : null,
            deadline: new Date(),
            graphValues: null,
            isAcknowledged: false,
            unitName: null,
            facts: [],
            comments: [],
        };
    }

    // #region DATA API

    async loadItem(id?: number): Promise<void> {
        this.isLoading = true;
        const dataLoadQueue: Promise<void>[] = [];
        if (id) {
            dataLoadQueue.push(
                this.eventService.getEvent(id).then((data) => {
                    this.event = data;
                })
            );
        }

        dataLoadQueue.push(
            this.eventService.getCategory().then((data) => {
                this.category = data;
            }),

            this.eventService.getUser().then((data) => {
                this.user = data;
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
            })
        );

        if (dataLoadQueue.length > 0) {
            try {
                // wait untill all data will be loaded (with parralel requests)
                await Promise.all(dataLoadQueue);
                // fill form data from source object
            } catch (err) {
                console.error(err);
            }
        }
        setTimeout(() => {
            this.isLoading = false;
        }, 500);
    }

    formatDate(date: Date): Date {
        return new Date(
            Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()
            )
        );
    }

    async saveItem(): Promise<void> {
        this.isLoading = true;
        this.isEditing = false;
        //  this.event.deadline = this.formatDate(new Date(this.event.deadline));
        console.log(this.event.deadline);
        if (this.isNew) {
            try {
                const ev = await this.eventService.postEvent(this.event);
                this.event = ev;
                this.isNew = false;
                this.openSnackBar('Сохранено');
            } catch (error) {
                this.isLoading = false;
                this.openSnackBar('Ошибка');
            }
        } else {
            try {
                const ev = await this.eventService.putEvent(this.event);
                this.openSnackBar('Сохранено');
            } catch (error) {
                this.isLoading = false;
                this.openSnackBar('Ошибка');
            }
        }

        this.eventService.updateEvent$.next(true);
        this.isLoading = false;
    }

    onLoadEvent(id): void {
        this.setEventByInfo(id);
    }

    // #endregion

    // #region Retrieval Event

    async saveRetrieval(idEvent: number): Promise<void> {
        // Если не новый event, отсылаем
        if (!this.isNew) {
            try {
                const post = await this.eventService.addRetrievalEvents(
                    idEvent,
                    this.isNewRetrieval
                );
                this.event.retrievalEvents.push(post);
                this.overlayClose();
                this.eventService.updateEvent$.next(true);
                this.openSnackBar('Сохранено');
            } catch (error) {
                this.overlayClose();
                this.isLoading = false;
                this.openSnackBar('Ошибка');
            }
        } else {
            // Если новый event то добавляем в массив
            //this.event.retrievalEvents[0].innerNotification = this.isNewRetrieval;
            this.event.retrievalEvents.push({
                id: 1,
                innerNotification: this.isNewRetrieval,
                timerPercentage: 50,
            });
            this.overlayClose();
        }
    }

    addRetrieval(): void {
        this.changeCategory();
        document.getElementById('overlay-retrieval').style.display = 'block';

        this.dataPicker = false;

        this.dateChooseNew = new Date();

        this.isNewRetrieval = {
            isUserCanEdit: true,
            itemNumber: 0,
            branch: 'Производство',
            category: this.category ? this.category[0] : null,
            deviationReason: 'Причина отклонения...',
            directReasons: '',
            establishedFacts: '',
            eventDateTime: new Date(),
            eventType: this.eventTypes ? this.eventTypes[0] : null,
            fixedBy: {
                id: null,
                login: '',
                firstName: '',
                lastName: '',
                middleName: '',
                email: '',
                phone: '',
            },
            comments: [],
            facts: [],
            organization: 'АО Газпромнефть',
            priority: { id: 2003, name: 'standard', code: '2' },
            responsibleOperator: this.user[this.idUser - 1],
            status: this.status ? this.status[0] : null,
            description: '',
            equipmentCategory: this.equipmentCategory ? this.equipmentCategory[0] : null,
            retrievalEvents: [],
            severity: 'Critical',
            deadline: new Date(),
            graphValues: null,
            isAcknowledged: false,
            unitName: null,
        };
    }

    overlayClose(): void {
        document.getElementById('overlay-retrieval').style.display = 'none';
        this.isNewRetrieval = null;
    }

    // TOFIX
    cancelRetrieval(): void {
        this.event.retrievalEvents.pop();
    }

    onEditRetrieval(retNotid: EventsWidgetNotification): void {
        this.isEdit = true;
        this.isNewRetrieval = retNotid;
        document.getElementById('overlay-retrieval').style.display = 'block';
    }

    async editSaveRetrieval(): Promise<void> {
        this.isEdit = true;
        if (this.isNew) {
            const idx = this.event.retrievalEvents.findIndex(
                (i) => i.innerNotification.id === this.isNewRetrieval.id
            );
            if (idx !== -1) {
                this.event.retrievalEvents[idx].innerNotification = this.isNewRetrieval;
            }
            this.isNewRetrieval = null;
            this.isEdit = false;
            this.overlayClose();
        } else {
            try {
                const idx = this.event.retrievalEvents.findIndex(
                    (i) => i.innerNotification.id === this.isNewRetrieval.id
                );
                if (idx !== -1) {
                    this.event.retrievalEvents[idx].innerNotification = this.isNewRetrieval;
                }
                this.isLoading = true;
                const put = await this.eventService.editRetrievalEvents(
                    this.event.retrievalEvents[idx]
                );
                this.eventService.updateEvent$.next(true);
                this.overlayClose();
                this.isLoading = false;
                this.openSnackBar('Сохранено');
            } catch (error) {
                this.isLoading = false;
                this.openSnackBar('Ошибка');
            }
            this.isEdit = false;
        }
        this.progressLine();
    }

    async deleteRetrieval(idEvent: number, idRetrNotif: number, idRetr): Promise<void> {
        const del = await this.eventService.deleteRetrievalEvents(idEvent, idRetrNotif);
        this.eventService.updateEvent$.next(true);
        const idx = this.event.retrievalEvents.findIndex((i) => i.id === idRetr);
        if (idx !== -1) {
            this.event.retrievalEvents.splice(idx, 1);
        }
    }

    // #endregion

    // #region Overlay Сonfirmation

    openSnackBar(
        msg: string = 'Операция выполнена',
        msgDuration: number = 500,
        actionText?: string,
        actionFunction?: () => void
    ): void {
        const snackBarInstance = this.snackBar.open(msg, actionText, {
            duration: msgDuration,
        });
        if (actionFunction) {
            snackBarInstance.onAction().subscribe(() => actionFunction());
        }
    }

    overlayConfirmationOpen(): void {
        document.getElementById('overlay-confirmation').style.display = 'block';
    }

    overlayConfirmationClose(): void {
        document.getElementById('overlay-confirmation').style.display = 'none';
    }

    // #endregion

    getIndex(i: number): string {
        return Number(i + 1).toString();
    }

    compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    changeCategory(): void {
        for (let item of this.user) {
            if (
                item.lastName === this.nameUserLastName &&
                item.firstName === this.nameUserFirstName
            ) {
                this.idUser = item.id;
            }
        }
    }

    openLineChart(): void {
        document.getElementById('overlay-chart').style.display = 'block';
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    overlayChartClose(): void {
        document.getElementById('overlay-chart').style.display = 'none';
    }

    chooseRespons(data): void {
        this.userChoosen = true;
        this.chooseNameUser = data.firstName + ' ' + data.middleName + ' ' + data.lastName;
        this.userBrigade = data.brigade.number;
        this.userDescription = data.positionDescription;
        this.userAvatar = data?.photoId ? `${this.fsUrl}/${data.photoId}` : this.userAvatarDefault;
    }

    chooseMeropRespons(data): void {
        this.userMeropChoosen = true;
        this.chooseNameUser = data.firstName + ' ' + data.middleName + ' ' + data.lastName;
        this.userBrigade = data.brigade.number;
        this.userDescription = data.positionDescription;
        this.userAvatar = data?.photoId ? `${this.fsUrl}/${data.photoId}` : this.userAvatarDefault;
    }

    onEditShortInfo(): void {
        this.isEditing = true;
    }

    showDateBlock(): void {
        this.dataPicker = !this.dataPicker;
    }

    progressLine(): void {
        const heightMiddle = this.progress.nativeElement.offsetParent.offsetHeight - 103;
        const countRetAll = this.event.retrievalEvents.length;
        let countRetCompleate = 0;
        for (let i of this.event.retrievalEvents) {
            if (i.innerNotification.status.name === 'closed') {
                countRetCompleate++;
            }
        }
        this.progressLineHeight = (heightMiddle / countRetAll) * countRetCompleate;
    }

    dateTimePicker(data: ITime): void {
        const time = data.time.split(':');
        const date = new Date(data.date);

        this.dateChoose = new Date(date.setHours(+time[0], +time[1], +time[2]));

        this.event.deadline = this.dateChoose;
    }

    dateTimePickerNew(data: ITime): void {
        const time = data.time.split(':');
        const date = new Date(data.date);

        this.dateChooseNew = new Date(date.setHours(+time[0], +time[1], +time[2]));

        this.isNewRetrieval.deadline = this.dateChooseNew;
    }
}
