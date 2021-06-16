import { Component, Input } from '@angular/core';
import { EnumClaimWidgets, ClaimService } from '@dashboard/services/claim.service';
import { BehaviorSubject } from 'rxjs';
import { WidgetService } from '@dashboard/services/widget.service';
import { UserSettingsService } from '@dashboard/services/user-settings.service';

@Component({
    selector: 'evj-widget-header-smp',
    templateUrl: './widget-header-smp.component.html',
    styleUrls: ['./widget-header-smp.component.scss'],
})
export class WidgetHeaderSmpComponent {
    @Input() uniqId: string;
    public claimWidgets$: BehaviorSubject<EnumClaimWidgets[]> = this.claimService.claimWidgets$;
    public EnumClaimWidgets: typeof EnumClaimWidgets = EnumClaimWidgets;

    constructor(
        private widgetService: WidgetService,
        private userSettings: UserSettingsService,
        private claimService: ClaimService
    ) {}

    public async closeWidget(): Promise<void> {
        await this.userSettings.removeItem(this.uniqId);
        // await this.widgetService.removeItemService(this.uniqId);
    }
}
