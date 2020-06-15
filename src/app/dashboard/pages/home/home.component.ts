import { Component, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { ClaimService } from '../../services/claim.service';
import { OverlayService } from '../../services/overlay.service';
import { IAlertPasswordModel } from '../../../@shared/models/alert-password.model';

@Component({
    selector: 'evj-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    fullscreen: boolean = false;

    constructor(
        private widgetService: WidgetService,
        private userSettings: UserSettingsService,
        private claimService: ClaimService,
        public overlayService: OverlayService
    ) {
        const isRefresh = localStorage.getItem('refresh-dashboard');
        if (isRefresh === 'true') {
            localStorage.setItem('refresh-dashboard', 'false');
            window.location.reload();
        }
    }

    ngOnInit(): void {
        this.claimService.getClaim();
        this.widgetService.getRest();
        this.widgetService.initWS();
        document.addEventListener('fullscreenchange', () => {
            this.fullscreen = !!document.fullscreenElement;
        });
    }

    ngOnDestroy(): void {
        this.widgetService.closeService();
        this.userSettings.clearScreens();
    }
}
