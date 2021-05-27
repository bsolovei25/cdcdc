import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { UserSettingsService } from "@dashboard/services/user-settings.service";
import { ClaimService, EnumClaimWidgets } from "@dashboard/services/claim.service";

@Component({
  selector: 'evj-suutp-header',
  templateUrl: './suutp-charts-header.component.html',
  styleUrls: ['./suutp-charts-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuutpChartsHeaderComponent implements OnInit, OnDestroy {
    @Input() private uniqId: string = '';
    @Input() public widgetTitle: string = '';
    @Input() public mainTitleWidth: string = '';
    @Input() public additionalTitle: string = '';

    public isMenuOpen: boolean = false;
    public claimWidgets: EnumClaimWidgets[] = [];
    public EnumClaimWidgets: typeof EnumClaimWidgets = EnumClaimWidgets;

    private subscriptions: Subscription[] = [];

    constructor(private userSettings: UserSettingsService, private claimService: ClaimService) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.claimService.claimWidgets$.subscribe((data) => {
                this.claimWidgets = data;
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
    }

    public toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    public closeMenu(): void {
        this.isMenuOpen = false;
    }

    public async onRemoveButton(): Promise<void> {
        await this.userSettings.removeItem(this.uniqId);
    }
}
