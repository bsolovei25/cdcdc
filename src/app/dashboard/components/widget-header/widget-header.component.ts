import { Component, OnInit, Input, Inject, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
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
    @Output() eventCreated = new EventEmitter<boolean>();
    public readonly iconRoute: string = './assets/icons/widget-title-icons/';
    private subscriptions: Subscription[] = [];
    claimWidgets: EnumClaimWidgets[] = [];

    public CreateIcon: boolean = true;

    constructor(
        public widgetService: NewWidgetService,
        public userSettings: NewUserSettingsService,
        private claimService: ClaimService
    ) { }

    ngOnInit(): void {
        this.subscriptions.push(
            this.claimService.claimWidgets$.subscribe(data => {
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

    ngOnChanges() {
        this.CreateIcon = this.isEventOpen;
    }

    onRemoveButton() {
        this.widgetService.removeItemService(this.uniqId);
        this.userSettings.removeItem(this.uniqId);
    }

    createEvent(event): void {
        console.log('1');
        this.CreateIcon = false;
        this.eventCreated.emit(event);
    }
}
