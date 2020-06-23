import { Component, OnInit, Input } from '@angular/core';
import { UserSettingsService } from '../../../dashboard/services/user-settings.service';

@Component({
    selector: 'evj-aps-widget-header',
    templateUrl: './aps-widget-header.component.html',
    styleUrls: ['./aps-widget-header.component.scss'],
})
export class ApsWidgetHeaderComponent implements OnInit {
    @Input() private uniqId: string = '';
    @Input() public onFullScreenButton: any = null;

    public isMenuOpen: boolean = false;

    constructor(private userSettings: UserSettingsService) {}

    ngOnInit(): void {}

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu(): void {
        this.isMenuOpen = false;
    }

    public async onRemoveButton(): Promise<void> {
        await this.userSettings.removeItem(this.uniqId);
    }
}
