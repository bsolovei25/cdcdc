// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// RxJS
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';
import { MatSnackBar } from '@angular/material/snack-bar';
// Local modules

interface ITokenData {
    login: string;
    firstName: string;
    lastName: string;
    middleName: string;
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

    user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    get userIsAuthenticated(): boolean {
        return false;
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

    async getUserAuth(): Promise<any[]> | null {
        try {
            if (this.restUrl) {
                return await this.http
                    .get<any[]>(this.restUrl + '/api/user-management/current')
                    .toPromise();
            }
        } catch (error) {
            this.router.navigate(['login']);
            console.error(error);
        }
        return null;
    }

    private configureUserAuth(tokenData: ITokenData): void {
        this.authTokenData = tokenData;
        this.user$.next('');
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
