import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    private appConfig: any;

    constructor(private http: HttpClient) { }

    public async loadAppConfig() {
        const data = await this.http.get('/assets/config.json').toPromise();
        this.appConfig = data;
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
}
