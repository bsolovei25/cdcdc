import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { ICmidOftenClosedPosition } from '@widgets/CMID/cmid-often-closed-positions/cmid-often-closed-positions.interfaces';
import { CmidProductionMapModule } from '@widgets/CMID/cmid-production-map/cmid-production-map.module';

@Injectable({
    providedIn: CmidProductionMapModule,
})
export class CmidProductionMapService {
    private restUrl: string;

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getDataList(widgetId: string): Promise<ICmidOftenClosedPosition[]> {
        // ToDo: Раскоментить и вставить url после появления backend
        // return this.http.get<IOftenClosedPosition[]>(`${this.restUrl}/api/../../../${widgetId}`).toPromise();
        return null;
    }
}
