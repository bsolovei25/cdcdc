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
import { EventsWorkspaceService } from '../../services/events-workspace.service';

@Component({
    selector: 'evj-events-workspace',
    templateUrl: './events-workspace.component.html',
    styleUrls: ['./events-workspace.component.scss'],
})
export class EventsWorkSpaceComponent extends WidgetPlatform implements OnInit, OnDestroy {
    isEditingDescription: boolean = false;

    progressLineHeight: number; // хз

    static itemCols: number = 20;
    static itemRows: number = 5;

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
    }

    ngOnInit(): void {
        super.widgetInit();
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
        this.ewService.setEventByInfo(value);

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

    async createEvent(): Promise<void> {
        this.ewService.isCreateNewEvent = true;
        this.ewService.createNewEvent();
    }

    // #region DATA API

    async saveItem(): Promise<void> {
        this.isEditingDescription = false;
        this.ewService.saveEvent();
    }

    // #endregion

    // #region Retrieval Event
    addRetrieval(): void {
        this.ewService.isOverlayRetrivealOpen = true;
        this.ewService.createNewEvent(true);
    }

    overlayClose(): void {
        this.ewService.isOverlayRetrivealOpen = false;
        this.ewService.createNewEvent(true);
    }
    // #endregion

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
