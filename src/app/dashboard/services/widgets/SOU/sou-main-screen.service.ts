import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { IScenario } from '../../../models/APS/aps-tables.model';
import { IInstallations } from '../../../models/SOU/sou-main-screen.model';

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
    async getAllInstallations(WidgetType: string): Promise<IInstallations[]> {
        return this.http
            .get<IInstallations[]>(
                this.restUrl + `/api/debugging-service-RealtimeWidgetService/Start/realtimedata/${WidgetType}`
            )
            .toPromise();
    }
}
