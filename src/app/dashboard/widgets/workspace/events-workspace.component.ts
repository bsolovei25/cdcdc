import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Inject,
    OnDestroy,
    AfterViewInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from '../../services/event.service';
import {
    EventsWidgetNotification,
    EventsWidgetNotificationStatus,
    EventsWidgetNotificationPriority,
    IStatus,
    IPriority,
    IUser,
    ICategory,
    EventsWidgetCategory,
    EventsWidgetCategoryCode,
    EventsWidgetDataPreview,
    EventsWidgetData,
} from '../../models/events-widget';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewWidgetService } from '../../services/new-widget.service';
import { DateAdapter } from '@angular/material/core';
import { AuthService } from '@core/service/auth.service';

@Component({
    selector: 'evj-events-workspace',
    templateUrl: './events-workspace.component.html',
    styleUrls: ['./events-workspace.component.scss'],
})
export class EventsWorkSpaceComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    event: EventsWidgetNotification;
    isLoading: boolean = true;

    public previewTitle: string = 'events-workspace';
    public title: string = 'Рабочая область';
    public widgetType: string;
    public icon: string = 'document';
    comments: string[] = [];
    fact: string[] = [];
    isNew: boolean = true;

    isEdit: boolean = false;

    isClickFact: boolean = false;

    priority: IPriority[];
    status: IStatus[];
    user: IUser[];
    code;
    category: ICategory[];
    place;
    equipmentCategory;
    eventTypes;

    nameUser: string;

    nameUserFirstName: string;
    nameUserLastName: string;

    userChoosen: boolean = false;
    userMeropChoosen: boolean = false;
    chooseNameUser: string;
    userBrigade: string;
    userDescription: string;

    saveEvent: boolean;
    isEditing: boolean = false;

    dateComment: Date;

    isNewRetrieval: EventsWidgetNotification = null;

    openEvent: boolean = true;

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

    foods = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' },
    ];

    eventLegends = [{ isLegend: true }, { isLegend: false }];

    idUser: number = 0;

    static itemCols: number = 20;
    static itemRows: number = 5;

    @ViewChild('input', { static: false }) input: ElementRef;
    @ViewChild('input2', { static: false }) input2: ElementRef;
    @ViewChild('newInput', { static: false }) newInput: ElementRef;
    @ViewChild('newInput2', { static: false }) newInput2: ElementRef;
    @ViewChild('scroll', { static: false }) scroll: ElementRef;
    @ViewChild('scroll2', { static: false }) scroll2: ElementRef;

    constructor(
        private eventService: EventService,
        private snackBar: MatSnackBar,
        public widgetService: NewWidgetService,
        private dateAdapter: DateAdapter<Date>,
        private authService: AuthService,
        // private formBuilder: FormBuilder,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscriptions.push(
            this.widgetService.getWidgetChannel(id).subscribe((data) => {
                this.title = data.title;
                this.widgetType = data.widgetType;
            })
        );

        this.subscriptions.push(
            this.authService.user$.subscribe((data: IUser) => {
                if (data) {
                    this.nameUser = data.firstName + ' ' + data.lastName;
                    this.nameUserFirstName = data.firstName;
                    this.nameUserLastName = data.lastName;
                }
            })
        );

        this.dateAdapter.setLocale('ru');
    }

    ngOnInit(): void {
        if (!this.isMock) {
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
            this.subscriptions.push(
                this.widgetService
                    .getWidgetLiveDataFromWS(this.id, 'events-workspace')
                    .subscribe((value) => {
                        this.wsHandler(value);
                    })
            );
        }
        this.isLoading = false;
    }

    private async setEventByInfo(value: EventsWidgetNotification | number): Promise<void> {
        this.isLoading = true;

        this.resetComponent();
        this.isNew = false;
        if (typeof value !== 'number') {
            this.event = value;
        }

        if (this.event.graphValues) {
            this.onSendMessage(true);
        }

        await this.loadItem(typeof value === 'number' ? value : undefined);
    }

    ngAfterViewInit(): void {
        // this.isLoading = false;
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            for (const subscription of this.subscriptions) {
                subscription.unsubscribe();
            }
        }
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

    createdEvent(event: boolean) {
        console.log(event);
        event === true ? this.createEvent() : this.saveItem();
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

    onSendMessage(graph?): void {
        if (graph === true) {
            const commentInfo = {
                comment: 'График',
                createdAt: Date().toString(),
                displayName: this.nameUser,
            };
            this.event.comments.push(commentInfo);
        } else {
            if (this.input2.nativeElement.value) {
                const commentInfo = {
                    comment: this.input2.nativeElement.value,
                    createdAt: Date().toString(),
                    displayName: this.nameUser,
                };
                this.event.comments.push(commentInfo);
                // this.comments.push(this.input.nativeElement.value);
                this.input2.nativeElement.value = '';
                this.dateComment = new Date();
                setTimeout(() => {
                    this.scrollCommentBottom();
                }, 50);
            } else if (this.input.nativeElement.value) {
                const factInfo = {
                    comment: this.input.nativeElement.value,
                    createdAt: Date().toString(),
                    displayName: this.nameUser,
                };
                this.event.facts.push(factInfo);
                this.input.nativeElement.value = '';
                setTimeout(() => {
                    this.scrollFactBottom();
                }, 50);
            }
        }
    }

    onSendNewMessage(graph?): void {
        if (graph === true) {
            const commentInfo = {
                comment: 'График',
                createdAt: Date().toString(),
                displayName: this.nameUser,
            };
            this.isNewRetrieval.comments.push(commentInfo);
        } else {
            if (this.newInput2.nativeElement.value) {
                const factInfo = {
                    comment: this.newInput2.nativeElement.value,
                    createdAt: Date().toString(),
                    displayName: this.nameUser,
                };
                this.isNewRetrieval.facts.push(factInfo);
                // this.comments.push(this.input.nativeElement.value);
                this.newInput2.nativeElement.value = '';
                setTimeout(() => {
                    this.scrollFactBottom();
                }, 50);
            } else if (this.newInput.nativeElement.value) {
                const commentInfo = {
                    comment: this.newInput.nativeElement.value,
                    createdAt: Date().toString(),
                    displayName: this.nameUser,
                };
                this.isNewRetrieval.comments.push(commentInfo);
                this.newInput.nativeElement.value = '';
                setTimeout(() => {
                    this.scrollCommentBottom();
                }, 50);
            }
        }
    }

    clickFact(): void {
        this.isClickFact = !this.isClickFact;
    }

    scrollCommentBottom() {
        this.scroll.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
    }
    scrollFactBottom() {
        this.scroll2.nativeElement.scrollTop = this.scroll.nativeElement.scrollHeight;
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

        this.event = {
            itemNumber: 0,
            branch: 'Производство',
            category: this.category ? this.category[0] : null,
            // comments: ['Новое событие'],
            description: '',
            deviationReason: 'Причина отклонения...',
            directReasons: '',
            establishedFacts: '',
            eventDateTime: new Date(),
            eventType: this.eventTypes ? this.eventTypes[0] : null,
            fixedBy: {
                email: 'test@test',
                login: '',
                firstName: '',
                id: 1,
                lastName: '',
                middleName: '',
                phone: '00123456789',
            },
            place: { id: 5001, name: 'ГФУ-2 с БОР' },
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
            })
        );
        dataLoadQueue.push(
            this.eventService.getUser().then((data) => {
                this.user = data;
            })
        );
        dataLoadQueue.push(
            this.eventService.getStatus().then((data) => {
                this.status = data;
            })
        );
        dataLoadQueue.push(
            this.eventService.getPriority().then((data) => {
                this.priority = data;
            })
        );

        dataLoadQueue.push(
            this.eventService.getPlace().then((data) => {
                this.place = data;
            })
        );
        dataLoadQueue.push(
            this.eventService.getEquipmentCategory().then((data) => {
                this.equipmentCategory = data;
            })
        );
        dataLoadQueue.push(
            this.eventService.getEventType().then((data) => {
                this.eventTypes = data;
            })
        );

        dataLoadQueue.push(
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

    async saveItem(): Promise<void> {
        this.isLoading = true;
        this.isEditing = false;
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

    onLoadEvent(id) {
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

        this.isNewRetrieval = {
            itemNumber: 0,
            branch: 'Производство',
            category: this.category ? this.category[0] : null,
            // comments: ['Новое событие'],
            deviationReason: 'Причина отклонения...',
            directReasons: '',
            establishedFacts: '',
            eventDateTime: new Date(),
            eventType: this.eventTypes ? this.eventTypes[0] : null,
            fixedBy: {
                id: 2,
                login: 'PetrovP',
                firstName: 'Петр',
                lastName: 'Петров',
                middleName: '',
                email: 'test@test',
                phone: '00123456789',
            },
            comments: [],
            facts: [],
            organization: 'АО Газпромнефть',
            place: { id: 5001, name: 'ГФУ-1' },
            priority: { id: 2003, name: 'standard', code: '2' },
            //     responsibleOperator: this.user ? this.user[0] : null,
            responsibleOperator: this.user[this.idUser - 1],
            status: this.status ? this.status[0] : null,
            description: '',
            equipmentCategory: this.equipmentCategory ? this.equipmentCategory[0] : null,
            retrievalEvents: [],
            severity: 'Critical',
            deadline: new Date(),
            graphValues: null,
            isAcknowledged: false,
        };
    }

    overlayClose(): void {
        document.getElementById('overlay-retrieval').style.display = 'none';
        this.isNewRetrieval = null;
    }

    cancelRetrieval(): void {
        this.event.retrievalEvents.pop();
    }

    onEditRetrieval(retrieval: EventsWidgetNotification): void {
        this.isEdit = true;
        this.isNewRetrieval = retrieval;
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
                this.isLoading = true;
                const put = await this.eventService.editRetrievalEvents(
                    this.event.id,
                    this.isNewRetrieval
                );
                const idx = this.event.retrievalEvents.findIndex(
                    (i) => i.innerNotification.id === this.isNewRetrieval.id
                );
                if (idx !== -1) {
                    this.event.retrievalEvents[idx].innerNotification = this.isNewRetrieval;
                }
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
    }

    async deleteRetrieval(idEvent: number, idRetr: number): Promise<void> {
        const del = await this.eventService.deleteRetrievalEvents(idEvent, idRetr);
        this.eventService.updateEvent$.next(true);
        const idx = this.event.retrievalEvents.findIndex((i) => i.innerNotification.id === idRetr);
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
        const snackBarInstance = this.snackBar.open(msg, actionText, { duration: msgDuration });
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

    chooseRespons(data) {
        this.userChoosen = true;
        this.chooseNameUser = data.firstName + ' ' + data.middleName + ' ' + data.lastName;
        this.userBrigade = data.brigade.number;
        this.userDescription = data.positionDescription;
    }

    chooseMeropRespons(data) {
        this.userMeropChoosen = true;
        this.chooseNameUser = data.firstName + ' ' + data.middleName + ' ' + data.lastName;
        this.userBrigade = data.brigade.number;
        this.userDescription = data.positionDescription;
    }

    onEditShortInfo() {
        this.isEditing = true;
    }
}
