import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserSettingsService } from '../../../dashboard/services/user-settings.service';
import { IApsWidgetHeaderMenu, ApsHeaderIconType } from '../../models/aps-widget-header.model';
import { ClaimService, EnumClaimWidgets } from '../../../dashboard/services/claim.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-aps-widget-header',
    templateUrl: './aps-widget-header.component.html',
    styleUrls: ['./aps-widget-header.component.scss'],
})
export class ApsWidgetHeaderComponent implements OnInit, OnDestroy {
    @Input() private uniqId: string = '';
    @Input() public widgetTitle: string = '';
    @Input() public icon: ApsHeaderIconType = 'drop';
    @Input() public additionalMenuItems: IApsWidgetHeaderMenu[] = [
        // { title: 'Настройки', action: () => null },
    ];
    @Input() public kpeFlag: boolean = false;

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
