import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class AppConfigService {
    private appConfig: any;
    restUrl$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient, private titleService: Title) {}

    public async loadAppConfig(): Promise<void> {
        this.appConfig = await this.http.get('assets/config.json').toPromise();
        this.restUrl$.next(this.appConfig.restUrl);
        this.titleService.setTitle(this.projectName);
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

    get cmidUrl(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.cmidUrl;
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

    get authorizationHeader(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.authorizationHeader ?? 'Authorization';
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

    get smpUrl(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.smpUrl;
    }

    get ozsmUrl(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.ozsmUrl;
    }

    get reconnectInterval(): number {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.reconnectInterval;
    }

    get projectName(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.projectName;
    }

    get hash(): string {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.hash;
    }

    get isErrorDisplay(): boolean {
        if (!this.appConfig) {
            throw Error('Config file not loaded!');
        }
        return this.appConfig.isErrorDisplay;
    }
}
