import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { AuthService } from '@core/service/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/events-widget';
import { Subscription } from 'rxjs';
import { AppConfigService } from '@core/service/app-config.service';
import { OverlayService } from '../../services/overlay.service';
import { AvatarConfiguratorService } from '@core/service/avatar-configurator.service';

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
}
