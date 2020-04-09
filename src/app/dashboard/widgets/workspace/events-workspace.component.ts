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
import { EventsWidgetNotification, IUser, EventsWidgetData } from '../../models/events-widget';
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
    isLoading: boolean = true;

    isEditingDescription: boolean = false;

    progressLineHeight: number; // хз

    static itemCols: number = 20;
    static itemRows: number = 5;

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
                    this.ewService.isEditEvent = true;
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
        this.ewService.createNewEvent();
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

    // для существующего event
    onSendMessage(): void {
        if (this.input2.nativeElement.value) {
            const msg = this.input2.nativeElement.value;
            this.input2.nativeElement.value = '';
            this.ewService.sendMessageToEvent(msg, 'comments', false);
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
        this.isEditingDescription = false;
        //  this.event.deadline = this.formatDate(new Date(this.event.deadline));
        this.ewService.saveEvent();
        this.isLoading = false;
    }

    onLoadEvent(id: number): void {
        this.setEventByInfo(id);
    }

    // #endregion

    // #region Retrieval Event

    async saveRetrieval(): Promise<void> {
        this.isLoading = true;
        this.ewService.saveNewRetrievalEvent();
        this.overlayClose();
        this.isLoading = false;
    }

    addRetrieval(): void {
        this.ewService.createNewEvent(true);

        this.ewService.isOverlayRetrivealOpen = true;
    }

    overlayClose(): void {
        this.ewService.isOverlayRetrivealOpen = false;
        this.ewService.createNewEvent(true);
    }

    onEditRetrieval(retNotid: EventsWidgetNotification): void {
        this.ewService.isEditEvent = true;
        this.ewService.retrievalEvent = retNotid;
        this.ewService.isOverlayRetrivealOpen = true;
    }

    async editSaveRetrieval(): Promise<void> {
        this.isLoading = true;
        this.ewService.saveEditedRetrievalEvent();
        this.overlayClose();
        this.isLoading = false;
        // this.progressLine();
    }

    // #endregion

    // #region Popup Alert

    overlayConfirmationOpen(): void {
        this.ewService.isOverlayConfirmOpen = true;
    }

    overlayConfirmationClose(): void {
        this.ewService.isOverlayConfirmOpen = false;
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
        this.isEditingDescription = true;
    }

    public getUserAvatarUrl(user: IUser): string {
        const avatar: string = 'assets/icons/widgets/admin/default_avatar2.svg';
        return user?.photoId ? `${this.fsUrl}/${user.photoId}` : avatar;
    }

    // TODO
    progressLine(): void {
        const heightMiddle = this.progress.nativeElement.offsetParent.offsetHeight - 103;
        const countRetAll = this.ewService.event.retrievalEvents.length;
        let countRetComplete = 0;
        for (let i of this.ewService.event.retrievalEvents) {
            if (i.innerNotification.status.name === 'closed') {
                countRetComplete++;
            }
        }
        this.progressLineHeight = (heightMiddle / countRetAll) * countRetComplete;
    }

    dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }

    dateTimePickerNew(date: Date): void {
        this.ewService.setDeadlineToEvent(date, true);
    }
}
