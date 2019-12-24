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
        this.loadAppConfig();

    }

    public async loadAppConfig() {
        const data = await this.http.get('/assets/config.json').toPromise();
        this.appConfig = data;
    }

    get restUrl(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.restUrl;
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
            return await this.http.get<any[]>(this.restUrl + '/api/user-management/current').toPromise();
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
