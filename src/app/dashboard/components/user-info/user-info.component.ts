import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { AuthService } from '@core/service/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/events-widget';
import { Subscription } from 'rxjs';
import { AppConfigService } from '../../../services/appConfigService';
import { OverlayService } from '../../services/overlay.service';
import { AvatarConfiguratorService } from '../../services/avatar-configurator.service';
import { IAlertPasswordModel } from '../../../@shared/models/alert-password.model';

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
        isShiftWorker: false,
    };

    public photoPath: string = 'assets/icons/widgets/admin/default_avatar2.svg';

    isShowScreens: boolean = false;
    subscription: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        public viewContainerRef: ViewContainerRef,
        private configService: AppConfigService,
        public overlayService: OverlayService,
        private avatarConfiguratorService: AvatarConfiguratorService
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    async loadData(): Promise<void> {
        this.subscription = this.authService.user$.subscribe((data: IUser) => {
            if (!data) {
                return;
            }
            this.data = data;
            this.photoPath = this.avatarConfiguratorService.getAvatarPath(this.data.photoId);
        });
    }

    resetPassword(): void {
        const passwordOptions: IAlertPasswordModel = {
            isShow: true,
            isCreatePassword: false,
            closeFunction: () => this.overlayService.dashboardAlertPassword$.next(null),
        };
        this.overlayService.dashboardAlertPassword$.next(passwordOptions);
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
