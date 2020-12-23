import { Component, Input, OnInit } from '@angular/core';
import { UserSettingsService } from 'src/app/dashboard/services/user-settings.service';
import { SouMvpMnemonicSchemeService } from 'src/app/dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';
import { IInstallation } from '../../sou-main-screen.component';

@Component({
    selector: 'evj-sou-installation-card',
    templateUrl: './sou-installation-card.component.html',
    styleUrls: ['./sou-installation-card.component.scss']
})
export class SouInstallationCardComponent implements OnInit {

    @Input() installation: IInstallation;

    constructor(
        private userSettingsService: UserSettingsService,
        private mvpService: SouMvpMnemonicSchemeService
    ) {
    }

    ngOnInit(): void {
        if (this.installation.installationId === 0) {
            this.installation.deviation = this.mvpService.deviationToMainScreen;
        }
    }

    public openInstallation(event: MouseEvent): void {
        if (this.installation.widgetName) {
            this.userSettingsService.loadScreenByWidget(this.installation.widgetName);
            this.mvpService.selectedInstallation$.next(this.installation.installationId);
            return;
        }
    }

}
