import { Component, OnInit, OnDestroy } from '@angular/core';
import { OverlayService } from '../../../services/overlay.service';
import { Router } from '@angular/router';
import { AuthService } from '@core/service/auth.service';
import { IAlertPasswordModel } from '@shared/interfaces/alert-password.model';
import { IUser } from '../../../models/EVJ/events-widget';
import { Subscription } from 'rxjs';
import { ThemeConfiguratorService } from '@core/service/theme-configurator.service';
import { IAlertWindowModel } from '@shared/interfaces/alert-window.model';
import { AppConfigService } from '@core/service/app-config.service';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from '../../about/about.component';

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
        private themeService: ThemeConfiguratorService,
        public dialog: MatDialog
    ) {}

    public ngOnInit(): void {
        this.setMenuItems();
        this.loadData();
        this.themeService.isDarkTheme.subscribe((value) => {
            this.isDarkTheme = value;
            const idx: number = this.menuItems.findIndex((item) => item.name === 'Изменение темы');
            if (idx !== -1) {
                this.menuItems[idx].icon = this.isDarkTheme ? 'lightTheme' : 'darkTheme';
            }
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
                icon: 'fullScreen',
            },
            {
                name: 'Изменение пароля',
                action: this.resetPassword.bind(this),
                icon: 'password',
            },
            {
                name: 'Изменение темы',
                action: this.themeService.changeTheme.bind(this.themeService),
                icon: this.isDarkTheme ? 'lightTheme' : 'darkTheme',
            },
            {
                name: 'О приложении',
                action: this.aboutApp.bind(this),
                icon: 'list',
            },
            {
                name: 'Выйти',
                action: this.logOut.bind(this),
                icon: 'logOut',
            },
        ];
    }

    private switchTheme(): void {
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
                    const idx: number = this.menuItems.findIndex((item) => item.name === 'Изменение пароля');
                    if (idx !== -1) {
                        this.menuItems.splice(idx, 1);
                    }
                } else {
                    this.setMenuItems();
                }
            })
        );
    }

    public aboutApp(): void {
        const openDialog = this.dialog.open(AboutComponent);
    }
}
