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

    private appConfig: any;

    private restUrl: string;

    private savePassword: boolean;

    user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    get userIsAuthenticated(): boolean {
        return false
    }

    constructor(
        private router: Router,
        private http: HttpClient,
        private configService: AppConfigService
    ) {
        // this.restUrl = configService.restUrl;
        this.configService.restUrl$.subscribe(a => {
            console.log(a);
            this.restUrl = a
        });
    }

    async authenticate(username: string, password: string): Promise<any> {
        try {
            return await this.http.post<any>(this.restUrl + `/api/user-management/auth`, { username, password }).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getUserAuth(): Promise<any[]> {
        try {
            if (this.restUrl) {
                return await this.http.get<any[]>(this.restUrl + '/api/user-management/current').toPromise();
            }
        } catch (error) {
            console.error(error);
        }
    }

    async logOut(): Promise<any> {
        try {
            return await this.http.post<any>(this.restUrl + `/api/user-management/logout`, ({})).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

}
