import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { AuthService } from '@core/service/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/events-widget';
import { Subscription } from 'rxjs';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { PasswordResetComponent } from '../../../@core/pages/reset-password/password-reset.component';
import { AppConfigService } from '../../../services/appConfigService';
import { OverlayService } from '../../services/overlay.service';
import { AvatarConfiguratorService } from '../../services/avatar-configurator.service';

@Component({
    selector: 'evj-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit, OnDestroy {
    data: IUser = {
        id: 0,
        login: '',
        firstName: '',
        lastName: '',
        middleName: '',
        brigade: { id: 0, number: '' },
        positionDescription: '',
    };

    public photoPath: string = 'assets/icons/widgets/admin/default_avatar2.svg';

    private overlayRef: OverlayRef | null;

    isShowScreens: boolean = false;
    subscription: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        public overlay: Overlay,
        public viewContainerRef: ViewContainerRef,
        private configService: AppConfigService,
        public myOverlayService: OverlayService,
        private avatarConfiguratorService: AvatarConfiguratorService,
    ) { }

    ngOnInit(): void {
        this.loadData();
        this.myOverlayService.closed$.subscribe((val) => this.closeOverlay(val));
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    async loadData(): Promise<void> {
        this.subscription = this.authService.user$.subscribe((data: IUser) => {
            if (data) {
                this.data = data;
                this.photoPath = this.avatarConfiguratorService.getAvatarPath(this.data.photoId);
            }
        });
    }

    resetPassword(): void {
        let config = new OverlayConfig();
        config.positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
        config.hasBackdrop = true;
        this.overlayRef = this.overlay.create(config);
        this.overlayRef.backdropClick().subscribe(() => {
            this.overlayRef.dispose();
        });
        this.overlayRef.attach(new ComponentPortal(PasswordResetComponent, this.viewContainerRef));
    }

    closeOverlay(value): void {
        value ? this.overlayRef.dispose() : null;
    }


    async logOut(): Promise<void> {
        await this.authService.logOut();
        this.router.navigate(['login']);
    }

    async fullScreen(): Promise<void> {
        const elem = document.getElementById('#fullScreen');
        document.documentElement.requestFullscreen();
    }

    isLeaveScreen(): void {
        this.isShowScreens = false;
    }
    isOverScreen(): void {
        this.isShowScreens = true;
    }

    ScreenActive(): void {
        this.isShowScreens = true;
    }

    ScreenDisable(): void {
        this.isShowScreens = false;
    }
}
