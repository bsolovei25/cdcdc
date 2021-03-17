import { Component, Input, OnInit } from '@angular/core';
import { UserSettingsService } from 'src/app/dashboard/services/user-settings.service';
import { SouMvpMnemonicSchemeService } from 'src/app/dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';
import { IInstallation } from '../../../../../dashboard/models/SOU/sou-main-screen.model';

@Component({
    selector: 'evj-sou-installation-card',
    templateUrl: './sou-installation-card.component.html',
    styleUrls: ['./sou-installation-card.component.scss'],
})
export class SouInstallationCardComponent implements OnInit {
    private readonly redirectWidget: string = 'sou-operational-accounting-system-main';

    @Input() installation: IInstallation;

    constructor(private userSettingsService: UserSettingsService, private mvpService: SouMvpMnemonicSchemeService) {}

    ngOnInit(): void {}

    public openInstallation(event: MouseEvent): void {
        this.userSettingsService.loadScreenByWidget(this.redirectWidget).then();
        this.mvpService.redirectMnemonic(this.installation.id);
    }
}
