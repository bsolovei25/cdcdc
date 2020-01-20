// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// RxJS
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from '../../dashboard/models/events-widget';
// Local modules

export interface ITokenData {
    login: string;
    firstName: string;
    lastName: string;
    middleName: string;
    brigade: { id: number, number: string };
    phone: string;
    position: string;
    positionDescription: string;
    token: string;
    id: number;
    email: string;
}

@Injectable({
    providedIn: 'root', // singleton service
})
export class AuthService {
    private authTokenData: ITokenData | null;
    private restUrl: string;

    user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

    get userIsAuthenticated(): boolean {
        return this.authTokenData !== null || false;
    }

    get userSessionToken(): string | null {
        const storageToken: string | null = localStorage.getItem('authentication-token');
        return this.authTokenData ? this.authTokenData.token : storageToken;
    }

    constructor(
        private router: Router,
        private http: HttpClient,
        private configService: AppConfigService,
        private snackBar: MatSnackBar
    ) {
        // this.restUrl = configService.restUrl;
        this.configService.restUrl$.subscribe((value) => {
            this.restUrl = value;
        });
    }

    async authenticate(username: string, password: string): Promise<any> {
        try {
            const auth = await this.http
                .post<any>(this.restUrl + `/api/user-management/auth`, { username, password })
                .toPromise();
            this.configureUserAuth(auth);
            return auth;
        } catch (error) {
            console.error(error);
        }
    }

    async getUserAuth(): Promise<ITokenData> | null {
        try {
            if (this.restUrl) {
                const current: ITokenData = await this.http
                    .get<ITokenData>(this.restUrl + '/api/user-management/current')
                    .toPromise();
                this.user$.next(current);
                return current;
            }
        } catch (error) {
            this.router.navigate(['login']);
            console.error(error);
        }
        return null;
    }

    private configureUserAuth(tokenData: ITokenData): void {
        this.authTokenData = tokenData;
        this.user$.next(tokenData);
        // save token
        localStorage.setItem('authentication-token', this.authTokenData.token);
    }

    private resetUserAuth(clearTokenFromStorage?: boolean): void {
        this.authTokenData = null;
        this.user$.next(null);
        if (clearTokenFromStorage) {
            localStorage.removeItem('authentication-token');
        }
    }

    async logOut(): Promise<void> {
        try {
            this.resetUserAuth(true);
        } catch (error) {
            console.error(error);
        }
    }

    private openSnackBar(
        msg: string = 'Операция выполнена',
        msgDuration: number = 3000,
        actionText?: string,
        actionFunction?: () => void
    ): void {
        const snackBarInstance = this.snackBar.open(msg, actionText, { duration: msgDuration });
        if (actionFunction) {
            snackBarInstance.onAction().subscribe(() => actionFunction());
        }
    }
}
