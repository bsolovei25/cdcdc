import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigService } from "@core/service/app-config.service";
import { IFactorItems } from "@widgets/CMID/cmid-factor-analysis/cmid-factor-analysis.component";

@Injectable({
    providedIn: 'root'
})
export class CmidFactorAnalysisService {
    private restUrl: string;
    
    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getFactorAnalysisData(widgetId: string): Promise<IFactorItems> {
        return null
    }
}