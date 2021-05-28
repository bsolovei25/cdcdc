import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
} from '@angular/core';
import { DecorateUntilDestroy, takeUntilDestroyed } from '@shared/functions/take-until-destroed.function';
import { map } from 'rxjs/operators';
import { IChatMessageWithAttachments } from '../components/evj-chat/evj-chat.component';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { EventService } from '../../../../dashboard/services/widgets/EVJ/event.service';
import { WidgetService } from '../../../../dashboard/services/widget.service';
import { UserSettingsService } from '../../../../dashboard/services/user-settings.service';
import { ClaimService, EnumClaimWidgets } from '../../../../dashboard/services/claim.service';
import { IEjcoOnpzUnit } from '../../../EJCO-ONPZ/ejco-onpz-unit-sou/ejco-onpz-unit-sou.component';
import { Observable, Subscription } from 'rxjs';
import { EvjEventsSmpoCorrectMenuComponent } from '../components/evj-events-smpo-correct-menu/evj-events-smpo-correct-menu.component';
import { PopoverOverlayService } from '@shared/components/popover-overlay/popover-overlay.service';
import { IMenuItem } from '../components/evj-events-smpo-reasons-menu/evj-events-smpo-reasons-menu-item/evj-events-smpo-reasons-menu-item.component';

@DecorateUntilDestroy()
@Component({
    selector: 'evj-smotr-event',
    templateUrl: './evj-smotr-event.component.html',
    styleUrls: ['./evj-smotr-event.component.scss'],
})
export class EvjSmotrEventComponent implements OnInit, OnDestroy, OnChanges {
    @Input() isPreview: boolean;
    @Input() widgetType: string;
    @Input() title: string;
    @Input() units: string;
    @Input() code: string;
    @Input() id: string;
    @Input() uniqId: string;
    @Input() icon: string = 'shedule';

    @Input() isEventOpen: boolean;
    @Input() eventProdTask: string;
    @Input() tankInfo: boolean;
    @Input() blockWorkspaceButton: boolean;
    @Input() public toggleAstue: boolean = true;
    public localeSelect: { name: string; id: number }[];
    @Input() set select(data) {
        if (data) {
            this.localeSelect = data;
            this.selectValue = data?.[0];
            this.selected.emit(this.selectValue);
            this.chDet.detectChanges();
        }
    }
    @Input() public ejcoTabs?: IEjcoOnpzUnit[] = [];
    @Output() public eventProdTaskChange: EventEmitter<void> = new EventEmitter<void>();
    @Output() eventCreated: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() eventBack: EventEmitter<null> = new EventEmitter<null>();
    @Output() public selected: EventEmitter<any> = new EventEmitter<any>();
    @Output() public selectedMenu: EventEmitter<any> = new EventEmitter<any>();
    @Output() private toggleAstueChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public ejcoTabClicked?: EventEmitter<string | null> = new EventEmitter<string | null>();
    public readonly iconRoute: string = 'assets/icons/widget-title-icons/';
    private subscriptions: Subscription[] = [];
    claimWidgets: EnumClaimWidgets[] = [];
    EnumClaimWidgets: typeof EnumClaimWidgets = EnumClaimWidgets;

    public selectValue: { name: string; id: number };
    public createIcon: boolean = true;
    public filterTankInfo: boolean = false;
    public ejcoActiveTab: string | null = null;
    public isEscalatePopupOpen: boolean = false;

    @Input()
    public noOverflow: boolean = false;

    public isClosePopupOpen: boolean = false;
    public isReasonsPopupOpen: boolean = false;

    public graph: any;
    
    private eventsList: IMenuItem[] = [];
    public events: IMenuItem[] = [];

    constructor(
        public widgetService: WidgetService,
        public userSettings: UserSettingsService,
        private claimService: ClaimService,
        private chDet: ChangeDetectorRef,
        public ewService: EventsWorkspaceService,
        private eventService: EventService,
        private popoverOverlayService: PopoverOverlayService,
        private renderer: Renderer2,
        private hostElement: ElementRef
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        this.filterTankInfo = this.tankInfo;
        this.createIcon = this.isEventOpen;
        if (changes.ejcoTabs && this.ejcoTabs && !this.ejcoActiveTab) {
            this.handleEjcoTabClick(this.ejcoTabs[0].caption);
        }
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.claimService.claimWidgets$.subscribe((data) => {
                this.claimWidgets = data;
            })
        );

        this.getEventsList();
        if (this.ewService.event.id) {
            this.events = this.ewService.event.smotr.events;
        }
    }

    public ngOnDestroy(): void {
        if (this.subscriptions.length > 0) {
            for (const subscribe of this.subscriptions) {
                subscribe.unsubscribe();
            }
        }
    }

    public async onRemoveButton(): Promise<void> {
        await this.userSettings.removeItem(this.uniqId);
    }

    public createEvent(event): void {
        this.createIcon = false;
        this.blockWorkspaceButton = true;
        this.eventCreated.emit(event);
    }

    public changeStatus(): void {
        this.eventProdTaskChange.emit();
    }

    compareFn(o1: any, o2: any): boolean {
        return o1.name === o2.name && o1.id === o2.id;
    }
    public handleEjcoTabClick(caption: string | null = null): void {
        if (!caption) {
            this.ejcoTabClicked.emit();
            return;
        }
        this.ejcoActiveTab = caption;
        this.ejcoTabClicked.emit(caption);
    }

    public isDisabledCloseButton(): boolean {
        return this.ewService.event.status.name === 'closed';
    }

    public onChangeEventDescription(description: string): void {
        this.ewService.event.description = description;
    }

    public onSendMessage(message: IChatMessageWithAttachments, msgType: 'comments' | 'facts'): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public onEscalateEvent(message: string): void {
        this.isEscalatePopupOpen = false;
        if (message) {
            this.ewService.escalateEvent(message);
        }
    }

    public onCloseCard(message: string): void {
        this.isClosePopupOpen = false;
        if (message) {
            this.ewService.closeEvent(message);
        }
    }

    setReason(reason: { id: string; name: string }): void {
        this.isReasonsPopupOpen = false;
        if (reason === null) {
            return;
        }
        this.ewService.event.directReasons = reason.name;
    }
    public openClosePopup(): void {
        if (this.isDisabledCloseButton()) {
            return;
        }
        this.isClosePopupOpen = true;
    }

    public onClickUrl(): void {
        if (!this.isDisabledUrlButton()) {
            window.open(this.ewService.event.deviationData.urlOriginalSystem);
        }
    }

    public isDisabledUrlButton(): boolean {
        return !this.ewService.event.deviationData?.urlOriginalSystem;
    }

    public openLineChart(): void {
        this.ewService.isOverlayChartOpen = true;
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public overlayChartClose(): void {
        this.ewService.isOverlayChartOpen = false;
    }

    private eventsList$(): Observable<IMenuItem[]> {
        return this.eventService.getSmotrCorrects()
            .pipe(
                map((corrects) => corrects.map((correct) => ({ ...correct, isSelected: false })) as IMenuItem[])
            );
    }

    private getEventsList(): void {
        this.eventsList$()
        .pipe(takeUntilDestroyed(this))
        .subscribe((list) => {
            this.eventsList = list;
        });
    }

    public removeEvent(event: IMenuItem): void {
        this.events = this.events.filter((currentEvent) => currentEvent.id !== event.id);
        this.getEventsList();
        this.ewService.event.smotr.events = this.events;
    }

    public openEventsList(): void {
        const heightPx = 435;
        const widthPx = 369;

        const limitationWindowTarget = this.createOverlayTarget(heightPx, widthPx);
        const popoverRef = this.popoverOverlayService.open({
            content: EvjEventsSmpoCorrectMenuComponent,
            origin: limitationWindowTarget,
            width: widthPx,
            position: 'end',
            height: heightPx,
            data: this.eventsList,
        });

        popoverRef.afterClosed$
            .pipe(takeUntilDestroyed(this))
            .subscribe((res) => {
            this.renderer.removeChild(this.hostElement.nativeElement, limitationWindowTarget);
            if (res.type !== 'backdropClick') {
                this.events = res?.data;
                this.ewService.event.smotr.events = this.events;
            }
        });
    }

    private createOverlayTarget(height: number, width: number): HTMLElement {
        const limitationWindowTarget = this.renderer.createElement('div');
        this.renderer.setStyle(limitationWindowTarget, 'position', `absolute`);
        this.renderer.setStyle(limitationWindowTarget, 'right', `calc(50% - ${width}px / 2)`);
        this.renderer.setStyle(limitationWindowTarget, 'top', `calc(50% + ${height}px / 2)`);
        this.renderer.appendChild(this.hostElement.nativeElement, limitationWindowTarget);
        return limitationWindowTarget;
    }
}
