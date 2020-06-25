import { Component, Input } from '@angular/core';
import { UserSettingsService } from '../../../dashboard/services/user-settings.service';
import { IApsWidgetHeaderMenu, ApsHeaderIconType } from '../../models/aps-widget-header.model';

@Component({
    selector: 'evj-aps-widget-header',
    templateUrl: './aps-widget-header.component.html',
    styleUrls: ['./aps-widget-header.component.scss'],
})
export class ApsWidgetHeaderComponent {
    @Input() private uniqId: string = '';
    @Input() public widgetTitle: string = '';
    @Input() public icon: ApsHeaderIconType = 'drop';
    @Input() public additionalMenuItems: IApsWidgetHeaderMenu[] = [
        // { title: 'Настройки', action: () => null },
    ];

    public isMenuOpen: boolean = false;

    constructor(private userSettings: UserSettingsService) {}

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
