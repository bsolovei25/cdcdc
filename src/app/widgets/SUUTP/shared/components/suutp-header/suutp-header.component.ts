import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { UserSettingsService } from '@dashboard/services/user-settings.service';

import { IHeaderMenu } from '@widgets/SUUTP/shared/header-menu.interface';

@Component({
    selector: 'evj-suutp-header',
    templateUrl: './suutp-header.component.html',
    styleUrls: ['./suutp-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuutpHeaderComponent {
    @Input() uniqId: string = '';
    @Input() title: string;
    public isMenuOpen: boolean;
    public isMenuOpen$: Subject<boolean> = new Subject<boolean>();
    public additionalMenuItems: IHeaderMenu[] = [];

    constructor(private userSettings: UserSettingsService) {}

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
        this.isMenuOpen$.next(this.isMenuOpen);
    }

    closeMenu(): void {
        this.isMenuOpen = false;
        this.isMenuOpen$.next(this.isMenuOpen);
    }

    public async onRemoveButton(): Promise<void> {
        await this.userSettings.removeItem(this.uniqId);
    }

}
