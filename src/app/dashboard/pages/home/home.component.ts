import { Component, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { ClaimService } from '../../services/claim.service';
import { OverlayService } from '../../services/overlay.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'evj-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    fullscreen: boolean = false;

    formControl: FormControl = new FormControl(
        { value: '123', disabled: true },
        Validators.minLength(7)
    );
    formControl1: FormControl = new FormControl('123', Validators.minLength(7));

    constructor(
        private widgetService: WidgetService,
        private userSettings: UserSettingsService,
        private claimService: ClaimService,
        public overlayService: OverlayService
    ) {}

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
