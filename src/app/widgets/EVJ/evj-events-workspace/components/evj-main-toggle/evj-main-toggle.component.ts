import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { IEjcoOnpzUnit } from '../../../../EJCO-ONPZ/ejco-onpz-unit-sou/ejco-onpz-unit-sou.component';
import { Subscription } from 'rxjs';
import { OverlayService } from '../../../../../dashboard/services/overlay.service';
import { WidgetService } from '../../../../../dashboard/services/widget.service';
import { UserSettingsService } from '../../../../../dashboard/services/user-settings.service';
import { ClaimService, EnumClaimWidgets } from '../../../../../dashboard/services/claim.service';
import { EventsWorkspaceService } from "../../../../../dashboard/services/widgets/EVJ/events-workspace.service";
import { FormControl } from '@angular/forms';
import {SnackBarService} from "../../../../../dashboard/services/snack-bar.service";

@Component({
    selector: 'evj-evj-main-toggle',
    templateUrl: './evj-main-toggle.component.html',
    styleUrls: ['./evj-main-toggle.component.scss'],
})
export class EvjMainToggleComponent implements OnInit, OnDestroy, OnChanges {
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
    @Output() public limitationCheckbox: EventEmitter<boolean> = new EventEmitter<boolean>();
    public readonly iconRoute: string = 'assets/icons/widget-title-icons/';
    private subscriptions: Subscription[] = [];
    claimWidgets: EnumClaimWidgets[] = [];
    EnumClaimWidgets: typeof EnumClaimWidgets = EnumClaimWidgets;

    public selectValue: { name: string; id: number };

    public createIcon: boolean = true;
    public isReportButton: boolean = true;

    public filterTankInfo: boolean = false;

    public ejcoActiveTab: string | null = null;

    public limitationFormControl: FormControl = new FormControl();

    public isClaimRestriction: boolean = false;

    constructor(
        public overlayService: OverlayService,
        public widgetService: WidgetService,
        public userSettings: UserSettingsService,
        private claimService: ClaimService,
        private chDet: ChangeDetectorRef,
        public ewService: EventsWorkspaceService,
        private snackBar: SnackBarService,
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
        this.checkClaim();
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

    public backEvent(): void {
        this.eventBack.emit();
    }

    public onSelected(event): void {
        if (event) {
            this.selected.emit(event.value);
        }
    }

    public onSelectedMenu(event: boolean): void {
        this.isEventOpen = event;
        this.selectedMenu.emit(event);
    }

    public reportSelected(event: boolean): void {
        this.selected.emit(event);
        this.isReportButton = event;
    }

    compareFn(o1: any, o2: any): boolean {
        return o1.name === o2.name && o1.id === o2.id;
    }

    public onFilterTankInfo(): void {
        this.filterTankInfo = true;
        this.selected.emit(true);
    }

    public toggleAstueEfficiency(isInitialDataShow: boolean): void {
        this.toggleAstueChange.emit(isInitialDataShow);
    }

    public handleEjcoTabClick(caption: string | null = null): void {
        if (!caption) {
            this.ejcoTabClicked.emit();
            return;
        }
        this.ejcoActiveTab = caption;
        this.ejcoTabClicked.emit(caption);
    }

    public isLimitationAvailable(): boolean {
        const categoryId = this.ewService.event?.category?.id;
        const subCategoryId = this.ewService.event?.subCategory?.id;
        const eventId = this.ewService.event?.id;
        return !(categoryId === 1006 || categoryId === 1007 || subCategoryId === 1010 || !eventId);
    }

    public emitAction(event: Event): void {
        event.preventDefault();
        if (this.ewService.event) {
            this.limitationCheckbox.emit(this.ewService.event?.isRestrictions);
        } else {
            this.snackBar.openSnackBar('Выберите или создайте Новое событие');
        }
    }

    private checkClaim(): void {
        this.subscriptions.push(
            this.claimService.allUserClaims$.subscribe((x) => {
                const restriction = x.find((claim) => claim.claimType === 'eventsResrictions');
                this.isClaimRestriction = restriction?.claimCategory === 'allow' ? true : false;
            })
        );
    }
}

