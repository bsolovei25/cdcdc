import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigService } from "@core/service/app-config.service";

@Injectable({
    providedIn: 'root',
})
export class CmidFilterService {
    private restUrl: string;

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getSelectList(widgetId: string): Promise<unknown> {
        return null;
    }

    public async getFilteredResult(widgetId: string): Promise<unknown> {
        return null;
    }
}