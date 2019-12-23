// Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// RxJS
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { get } from 'http';
import { AppConfigService } from 'src/app/services/appConfigService';
// Local modules


@Injectable({
    providedIn: 'root' // singleton service
})
export class AuthService {

    private readonly restUrl: string;

    private savePassword: boolean;

    user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    get userIsAuthenticated(): boolean {
        return
    }

    constructor(
        private router: Router,
        private http: HttpClient,
        private configService: AppConfigService
    ) {
        this.restUrl = configService.restUrl;
    }

    authenticate(login: string, password: string): Promise<any> {
        try {
            return this.http.post<any>(this.restUrl + `/authenticate`, { login, password }).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getUser(): Promise<any> {
        // TODO check
        try {
            return this.http.get<any>(this.restUrl + '/api/user-management/users').toPromise();
        } catch (error) {
            console.error(error);
        }
    }


    async logout(navigateToLoginComponent: boolean = true): Promise<void> {

    }

}
