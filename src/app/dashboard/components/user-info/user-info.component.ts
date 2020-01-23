import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@core/service/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/events-widget';
import { Subscription } from 'rxjs';

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
    isShowScreens: boolean = false;
    subscription: Subscription;

    constructor(private authService: AuthService, private router: Router) {}

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
            if (data) {
                this.data = data;
            }
        });
    }

    async logOut(): Promise<void> {
        await this.authService.logOut();
        this.router.navigate(['login']);
    }

    async fullScreen(): Promise<void> {
        const elem = document.getElementById('#fullScreen');
        console.log(elem);

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
