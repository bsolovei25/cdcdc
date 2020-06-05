import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { Subscription } from 'rxjs';
import { ClaimService, EnumClaimWidgets } from '../../services/claim.service';

@Component({
  selector: 'evj-widget-header-smp',
  templateUrl: './widget-header-smp.component.html',
  styleUrls: ['./widget-header-smp.component.scss']
})
export class WidgetHeaderSmpComponent implements OnInit, OnDestroy {
    @Input() uniqId: string;
    claimWidgets: EnumClaimWidgets[] = [];
    EnumClaimWidgets: typeof EnumClaimWidgets = EnumClaimWidgets;
    private subscriptions: Subscription[] = [];
    constructor(
        private widgetService: WidgetService,
        private userSettings: UserSettingsService,
        private claimService: ClaimService,
    ) { }

    ngOnInit(): void {
        this.subscriptions.push(
            this.claimService.claimWidgets$.subscribe((data) => {
                this.claimWidgets = data;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
        this.subscriptions = [];
    }

    public async closeWidget(): Promise<void> {
        await this.userSettings.removeItem(this.uniqId);
        // await this.widgetService.removeItemService(this.uniqId);
    }
}
