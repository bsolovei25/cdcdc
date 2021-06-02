import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigService } from "@core/service/app-config.service";

@Injectable({
    providedIn: 'root',
})
export class CmidOperationalReadinessService{
    private restUrl: string;

    public countStatistik = 98;

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }
}