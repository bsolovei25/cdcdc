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
import { fillDataShape } from '../../../@shared/common-functions';

@Component({
    selector: 'evj-events-workspace',
    templateUrl: './events-workspace.component.html',
    styleUrls: ['./events-workspace.component.scss'],
})
export class EventsWorkSpaceComponent extends WidgetPlatform implements OnInit, OnDestroy {
    event: EventsWidgetNotification;
    isLoading: boolean = true;

    isUserCanEdit: boolean = true; // может пользователь редактировать

    // isNew: boolean = true;

    isEdit: boolean = false; // изменено ли событие

    isClickFact: number; // хз
    isClickComment: number; // хз

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

    // isNewRetrieval: EventsWidgetNotification = null; // TOFIX

    openEvent: boolean = true; // отображение кнопок в хэдере

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
        public ewService: EventsWorkspaceService,
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
                    this.ewService.event = value;
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
        this.ewService.setEventByInfo(value);

        setTimeout(() => (this.isLoading = false), 500);

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
        this.event = null;
    }

    @HostListener('document:resize', ['$event'])
    OnResize(event): void {
        try {
            // this.progressLine();
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
        // this.isNew = false;
        // this.isNewRetrieval = null;
    }

    // для существующего event
    onSendMessage(): void {
        if (this.input2.nativeElement.value) {
            const msg = this.input2.nativeElement.value;
            this.input2.nativeElement.value = '';
            this.ewService.sendMessageToEvent(msg, 'comments', false);
            this.dateComment = new Date();
            setTimeout(() => {
                this.scrollCommentBottom();
            }, 50);
        } else if (this.input.nativeElement.value) {
            const msg = this.input.nativeElement.value;
            this.input.nativeElement.value = '';
            this.ewService.sendMessageToEvent(msg, 'facts', false);
            setTimeout(() => {
                this.scrollFactBottom();
            }, 50);
        }
    }

    // при создании retrieval event
    onSendNewMessage(): void {
        if (this.newInput2.nativeElement.value) {
            this.ewService.retrievalEvent.facts = this.ewService.retrievalEvent?.facts ?? [];
            const msg = this.newInput2.nativeElement.value;
            this.newInput2.nativeElement.value = '';
            this.ewService.sendMessageToEvent(msg, 'comments', false);
            setTimeout(() => {
                this.scrollFactBottom();
            }, 50);
        } else if (this.newInput.nativeElement.value) {
            this.ewService.retrievalEvent.comments = this.ewService.retrievalEvent?.comments ?? [];
            const msg = this.newInput.nativeElement.value;
            this.newInput.nativeElement.value = '';
            this.ewService.sendMessageToEvent(msg, 'comments', false);
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
        this.ewService.isCreateNewEvent = true;

        this.dataPicker = false;

        this.dateChoose = new Date();

        this.ewService.createNewEvent();
    }

    // #region DATA API

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

        this.ewService.saveEvent();

        this.isLoading = false;
    }

    onLoadEvent(id): void {
        this.setEventByInfo(id);
    }

    // #endregion

    // #region Retrieval Event

    async saveRetrieval(): Promise<void> {
        this.ewService.saveNewRetrievalEvent();
        this.ewService.isOverlayRetrivealOpen = false;
    }

    addRetrieval(): void {
        // document.getElementById('overlay-retrieval').style.display = 'block';

        this.dataPicker = false;

        this.dateChooseNew = new Date();

        // показать попап с retrieval event

        this.ewService.createNewEvent(true);

        this.ewService.isOverlayRetrivealOpen = true;
    }

    overlayClose(): void {
        // document.getElementById('overlay-retrieval').style.display = 'none';
        // скрыть попап
        this.ewService.isOverlayRetrivealOpen = false;
        this.ewService.createNewEvent(true);
    }

    onEditRetrieval(retNotid: EventsWidgetNotification): void {
        this.isEdit = true;
        this.ewService.retrievalEvent = retNotid;
        // document.getElementById('overlay-retrieval').style.display = 'block';

        // показать попап с retrieval event
    }

    async editSaveRetrieval(): Promise<void> {
        this.ewService.isOverlayRetrivealOpen = false;
        this.ewService.saveEditedRetrievalEvent();
        // this.progressLine();
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
        this.ewService.isOverlayRetrivealOpen = true;
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

    openLineChart(): void {
        this.ewService.isOverlayChartOpen = true;
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    overlayChartClose(): void {
        this.ewService.isOverlayChartOpen = false;
    }

    chooseRespons(data: IUser): void {
        this.ewService.event.fixedBy = data;
    }

    chooseMeropRespons(data: IUser): void {
        this.ewService.retrievalEvent.fixedBy = data;
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

        this.ewService.event.deadline = this.dateChoose;
    }

    dateTimePickerNew(data: ITime): void {
        const time = data.time.split(':');
        const date = new Date(data.date);

        this.dateChooseNew = new Date(date.setHours(+time[0], +time[1], +time[2]));

        this.ewService.retrievalEvent.deadline = this.dateChooseNew;
    }
}
