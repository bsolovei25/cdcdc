import { Component, OnInit, OnDestroy } from '@angular/core';
import { OverlayService } from '../../../services/overlay.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { IAlertPasswordModel } from '@shared/models/alert-password.model';
import { IUser } from '../../../models/EVJ/events-widget';
import { Subscription } from 'rxjs';
import { ThemeConfiguratorService } from '@core/service/theme-configurator.service';

interface IMenuItem {
    name: string;
    icon: string;
    action: (...args: any) => void;
}

@Component({
    selector: 'evj-menu-button',
    templateUrl: './menu-button.component.html',
    styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent implements OnInit, OnDestroy {
    public data: IUser;
    public isDropdownShowing: boolean = false;
    public isDarkTheme: boolean;

    public menuItems: IMenuItem[] = [];

    private subscriptions: Subscription[] = [];

    constructor(
        public overlayService: OverlayService,
        private router: Router,
        private authService: AuthService,
        private themeService: ThemeConfiguratorService
    ) {}

    public ngOnInit(): void {
        this.setMenuItems();
        this.loadData();
        this.themeService.isDarkTheme.subscribe(value => {
            this.isDarkTheme = value;
            this.setMenuItems();
        });
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
    }

    public onMouseEnter(): void {
        this.isDropdownShowing = true;
    }

    public onMouseLeave(): void {
        this.isDropdownShowing = false;
    }

    private setMenuItems(): void {
        this.menuItems = [
            {
                name: 'Полный экран',
                action: this.fullScreen,
                icon: 'fullScreen'
            },
            {
                name: 'Изменение пароля',
                action: this.resetPassword.bind(this),
                icon: 'password'
            },
            {
                name: 'Изменение темы',
                action: this.themeService.changeTheme.bind(this.themeService),
                icon: this.isDarkTheme ? 'lightTheme' : 'darkTheme'
            },
            {
                name: 'Выйти',
                action: this.logOut.bind(this),
                icon: 'logOut'
            },
        ];
    }

    private switchTheme(): void {
        // console.log(this.themeService.theme);
        this.themeService.changeTheme();
    }

    private resetPassword(): void {
        const passwordOptions: IAlertPasswordModel = {
            isShow: true,
            isCreatePassword: false,
            closeFunction: () => this.overlayService.dashboardAlertPassword$.next(null),
        };
        this.overlayService.dashboardAlertPassword$.next(passwordOptions);
    }

    private async logOut(): Promise<void> {
        await this.authService.logOut();
        this.router.navigate(['login']);
    }

    private async fullScreen(): Promise<void> {
        const elem = document.getElementById('#fullScreen');
        document.documentElement.requestFullscreen();
    }

    private loadData(): void {
        this.subscriptions.push(
            this.authService.user$.subscribe((data: IUser) => {
                if (data?.sid) {
                    const idx: number = this.menuItems.findIndex(
                        (item) => item.name === 'Изменение пароля'
                    );
                    this.menuItems.splice(idx, 1);
                } else {
                    this.setMenuItems();
                }
            })
        );
    }
}
