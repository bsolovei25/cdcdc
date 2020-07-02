import { Component, OnDestroy, OnInit } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { ClaimService } from '../../services/claim.service';
import { OverlayService } from '../../services/overlay.service';
import { ActivatedRoute, Router } from '@angular/router';

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
        public overlayService: OverlayService,
        // public route: ActivatedRoute,
        public router: Router,
    ) {
        this.applicationCreate();
    }

    ngOnInit(): void {
        this.claimService.getClaim();
        this.widgetService.getRest();
        this.widgetService.initWS();
        document.addEventListener('fullscreenchange', () => {
            this.fullscreen = !!document.fullscreenElement;
        });
        // const answer = this.route.snapshot.queryParamMap.get('screenId');
        // this.router.navigate([], { queryParams: {screenId: 1}});
    }

    ngOnDestroy(): void {
        this.widgetService.closeService();
        this.userSettings.clearScreens();
    }

    async applicationCreate(): Promise<void> {
        const isRefresh = localStorage.getItem('refresh-dashboard');
        if (isRefresh === 'true') {
            const queryParamsStr = localStorage.getItem('queryParams');
            if (queryParamsStr?.length > 0) {
                const queryParams = JSON.parse(queryParamsStr);
                console.log(queryParams);
                await this.router.navigate([], {queryParams});
            }
            localStorage.setItem('refresh-dashboard', 'false');
            window.location.reload();
        }
    }
}
