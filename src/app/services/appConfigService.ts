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

    public async loadAppConfig(): Promise<void> {
        this.appConfig = await this.http.get('assets/config.json').toPromise();
        this.restUrl$.next(this.appConfig.restUrl);
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

    get shiftFree(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.shiftFree;
    }

    get isDomenAuth(): boolean {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.isDomenAuth;
    }

    /**
     * @deprecated Use `${this.restUrl}/api/file-storage/${fileId}` to load files!
     */
    get fsUrl(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.fileStorage;
    }

    get smotrUrl(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.smotrUrl;
    }

    get reconnectInterval(): number {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.reconnectInterval;
    }
}
