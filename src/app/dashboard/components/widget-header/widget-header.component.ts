import {
    Component,
    OnInit,
    Input,
    Inject,
    Output,
    EventEmitter,
    OnChanges,
    OnDestroy,
} from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { NewUserSettingsService } from '../../services/new-user-settings.service';
import { ClaimService, EnumClaimWidgets } from '../../services/claim.service';
import { Subscription } from 'rxjs';

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
    public localeSelect: { name: string; id: number }[];
    @Input() set select(data) {
        if (data) {
            this.localeSelect = data;
            this.selectValue = data?.[0];
            this.selected.emit(this.selectValue);
        }
    }
    @Output() eventCreated = new EventEmitter<boolean>();
    @Output() public selected = new EventEmitter<any>();
    public readonly iconRoute: string = './assets/icons/widget-title-icons/';
    private subscriptions: Subscription[] = [];
    claimWidgets: EnumClaimWidgets[] = [];
    public selectValue: { name: string; id: number };

    public CreateIcon: boolean = true;

    constructor(
        public widgetService: NewWidgetService,
        public userSettings: NewUserSettingsService,
        private claimService: ClaimService
    ) { }

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

    public ngOnChanges(): void {
        this.CreateIcon = this.isEventOpen;
    }

    public onRemoveButton(): void {
        this.widgetService.removeItemService(this.uniqId);
        this.userSettings.removeItem(this.uniqId);
    }

    public createEvent(event): void {
        this.CreateIcon = false;
        this.eventCreated.emit(event);
    }

    public onSelected(event): void {
        if (event) {
            this.selected.emit(event.value);
        }
    }

    compareFn(o1: any, o2: any): boolean {
        return o1.name === o2.name && o1.id === o2.id;
    }
}
