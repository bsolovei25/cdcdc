import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/service/auth.service';
import { Router } from '@angular/router';

interface IUserInfo {
    firstName: string;
    lastName?: string;
    middleName?: string;
    positionDescription?: string;
    brigade?: { id: number; number: string };
}

@Component({
    selector: 'evj-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
    data: IUserInfo = {
        firstName: '',
        lastName: '',
        brigade: { id: 0, number: '' },
        middleName: '',
        positionDescription: ''
    };
    isShowScreens: boolean = false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.loadData();
    }

    async loadData(): Promise<void> {
        const data: any[] = await this.authService.getUserAuth();
        if (data && data[0]) {
            this.data = data[0];
        }
    }

    async logOut(): Promise<void> {
        await this.authService.logOut();
        this.router.navigate(['login']);
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
