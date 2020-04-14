// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// RxJS
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from '../../dashboard/models/events-widget';
import { SnackBarService } from '../../dashboard/services/snack-bar.service';
// Local modules

export interface ITokenData extends IUser {
    token: string;
}

@Injectable({
    providedIn: 'root', // singleton service
})
export class AuthService {
    private authTokenData: ITokenData | null;
    private restUrl: string;

    user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

    get userIsAuthenticated(): boolean {
        return this.authTokenData !== null;
    }

    public get userSessionToken(): string | null {
        const storageToken: string | null = localStorage.getItem('authentication-token');
        return this.authTokenData ? this.authTokenData.token : storageToken;
    }
    public set userSessionToken(newValue: string) {
        if (newValue) {
            this.authTokenData.token = newValue;
        }
    }
    public set authData(newValue: ITokenData) {
        if (newValue) {
            this.authTokenData = newValue;
        }
    }

    constructor(
        private router: Router,
        private http: HttpClient,
        private configService: AppConfigService,
        private materialController: SnackBarService
    ) {
        this.configService.restUrl$.subscribe((value) => {
            this.restUrl = value;
        });
    }

    async authenticate(username: string, password: string): Promise<ITokenData> {
        try {
            const auth = await this.http
                .post<ITokenData>(this.restUrl + `/api/user-management/auth`, {
                    username,
                    password,
                })
                .toPromise();
            this.configureUserAuth(auth);
            return auth;
        } catch (error) {
            if (error.status === 0) {
                this.materialController.openSnackBar('Сервер не отвечает');
            } else {
                this.materialController.openSnackBar(
                    'Ошибка авторизации, неверный логин или пароль, обратитесь к системному администратору!'
                );
            }
            console.error(error);
        }
    }

    async resetPassword(password: string, oldPassword: string): Promise<ITokenData> {
        const body = {
            username: this.user$.getValue().login,
            password,
            oldPassword
        }
        return await this.http
            .post<ITokenData>(this.restUrl + `/api/user-management/user/${this.user$.getValue().id}/password`, body)
            .toPromise();
    }

    async getUserAuth(): Promise<ITokenData> | null {
        if (!this.restUrl) {
            return null;
        }

        let current: ITokenData;

        // Try get current by token
        try {
            if (this.userSessionToken) {
                current = await this.http
                    .get<ITokenData>(this.restUrl + '/api/user-management/current')
                    .toPromise();
                this.configureUserAuth(current);
                return current;
            }
        } catch (error) {
            console.warn(error);
        }

        // If not loaded by token, try with Windows auth
        try {
            current = await this.http
                .get<ITokenData>(this.restUrl + '/api/user-management/windows-current', {
                    withCredentials: true,
                })
                .toPromise();

            this.configureUserAuth(current);
            return current;
        } catch (error) {
            this.router.navigate(['login']);
            this.materialController.openSnackBar(
                'Ошибка авторизации, неудачная попытка Windows аутентификации, обратитесь к системному администратору!'
            );
            console.warn(error);
        }
        return null;
    }

    private configureUserAuth(tokenData: ITokenData): void {
        this.user$.next(tokenData);

        if (!tokenData.token) return;

        this.authTokenData = tokenData;
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
}
