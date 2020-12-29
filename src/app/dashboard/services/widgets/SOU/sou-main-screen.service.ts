import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';

@Injectable({
    providedIn: 'root',
})

export class SouMainScreenService {
    private readonly restUrl: string;

    constructor(
        private http: HttpClient,
        configService: AppConfigService,
    ) {
        this.restUrl = configService.restUrl;
    }
    async getAllInstallations(WidgetType: string): Promise<any> {
        return this.http
            .get<any>(
                this.restUrl + `/api/debugging-service-RealtimeWidgetService/Start/realtimedata/${WidgetType}`
            )
            .toPromise();
    }
}
