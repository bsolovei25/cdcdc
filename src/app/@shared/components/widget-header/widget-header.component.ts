import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { EnumClaimWidgets, ClaimService } from '../../../dashboard/services/claim.service';
import { OverlayService } from '../../../dashboard/services/overlay.service';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { UserSettingsService } from '../../../dashboard/services/user-settings.service';

@Component({
    selector: 'evj-widget-header',
    templateUrl: './widget-header.component.html',
    styleUrls: ['./widget-header.component.scss'],
})
export class WidgetHeaderComponent implements OnInit, OnChanges, OnDestroy {
    @Input() isPreview: boolean;
    @Input() widgetType: string;
    @Input() title: string;
    @Input() units: string;
    @Input() code: string;
    @Input() id: string;
    @Input() uniqId: string;
    @Input() icon: string = 'shedule';

    @Input() isEventOpen: boolean;
    @Input() tankInfo: boolean;
    @Input() blockWorkspaceButton: boolean;
    @Input() public toggleAstue: boolean = true;
    public localeSelect: { name: string; id: number }[];
    @Input() set select(data) {
        if (data) {
            this.localeSelect = data;
            this.selectValue = data?.[0];
            this.selected.emit(this.selectValue);
        }
    }
    @Output() eventCreated: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() eventBack: EventEmitter<null> = new EventEmitter<null>();
    @Output() public selected: EventEmitter<any> = new EventEmitter<any>();
    @Output() public selectedMenu: EventEmitter<any> = new EventEmitter<any>();
    @Output() private toggleAstueChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    public readonly iconRoute: string = './assets/icons/widget-title-icons/';
    private subscriptions: Subscription[] = [];
    claimWidgets: EnumClaimWidgets[] = [];
    EnumClaimWidgets: typeof EnumClaimWidgets = EnumClaimWidgets;

    public selectValue: { name: string; id: number };

    public CreateIcon: boolean = true;
    public isReportButton: boolean = true;

    public filterTankInfo: boolean = false;

    constructor(
        public overlayService: OverlayService,
        public widgetService: WidgetService,
        public userSettings: UserSettingsService,
        private claimService: ClaimService
    ) {}

    public ngOnChanges(): void {
        this.filterTankInfo = this.tankInfo;
        this.CreateIcon = this.isEventOpen;
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.claimService.claimWidgets$.subscribe((data) => {
                this.claimWidgets = data;
            })
        );
    }

    ngOnDestroy(): void {
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
        this.CreateIcon = false;
        this.blockWorkspaceButton = true;
        this.eventCreated.emit(event);
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
}