import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfigService } from "@core/service/app-config.service";
import { ICmidMultichartModel } from "@widgets/CMID/cmid-overall-operational-indicator/models/cmid-overall-operational-indicator.model";

@Injectable({
    providedIn: 'root',
})
export class CmidOverallOperationalIndicatorService {
    private restUrl: string;

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getDataList(widgetId: string): Promise<ICmidMultichartModel[]> {
        // ToDo: Раскоментить и вставить url после появления backend
        // return this.http.get<IOftenClosedPosition[]>(`${this.restUrl}/api/../../../${widgetId}`).toPromise();
        return null;
    }
}
