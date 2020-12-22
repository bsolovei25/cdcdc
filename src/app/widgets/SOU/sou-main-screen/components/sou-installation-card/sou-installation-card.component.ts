import { Component, Input, OnInit } from '@angular/core';
import { UserSettingsService } from 'src/app/dashboard/services/user-settings.service';
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
  ) { }

  ngOnInit(): void {
  }
  public openInstallation(event: MouseEvent): void {
    if (this.installation.widgetName) {
    this.userSettingsService.loadScreenByWidget(this.installation.widgetName);
    return;
    }
  }

}
