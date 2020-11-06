import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input, OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { IEjcoOnpzUnit } from '../../../../EJCO-ONPZ/ejco-onpz-unit-sou/ejco-onpz-unit-sou.component';
import { Subscription } from 'rxjs';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { UserSettingsService } from '../../../../../dashboard/services/user-settings.service';
import { ClaimService, EnumClaimWidgets } from '../../../../../dashboard/services/claim.service';
import { IChatMessageWithAttachments } from '../../../events-workspace/components/chat/chat.component';
import { EventsWorkspaceService } from '../../../../../dashboard/services/widgets/EVJ/events-workspace.service';
@Component({
  selector: 'evj-evj-main-toggle-smotr',
  templateUrl: './evj-main-toggle-smotr.component.html',
  styleUrls: ['./evj-main-toggle-smotr.component.scss']
})
export class EvjMainToggleSmotrComponent implements OnInit, OnDestroy, OnChanges {
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

    constructor(
        public widgetService: WidgetService,
        public userSettings: UserSettingsService,
        private claimService: ClaimService,
        private chDet: ChangeDetectorRef,
        public ewService: EventsWorkspaceService
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
}

