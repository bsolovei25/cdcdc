import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppConfigService {
    private appConfig: any;

    restUrl$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient) {}

    public async loadAppConfig() {
        const data = await this.http.get('/assets/config.json').toPromise();
        this.appConfig = data;
        this.restUrl$.next(this.appConfig.restUrl);
        // if (this.appConfig) {
        //     this.router.initialNavigation();
        // }
    }

    get wsUrl(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.wsUrl;
    }

    get restUrl(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.restUrl;
    }

    get fsUrl(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.fileStorage;
    }

    get reconnectInterval(): number {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.reconnectInterval;
    }
}
