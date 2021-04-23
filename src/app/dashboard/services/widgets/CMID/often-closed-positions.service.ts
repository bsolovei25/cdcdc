import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AppConfigService } from "@core/service/app-config.service";
import { ICmidOftenClosedPosition } from "@widgets/CMID/cmid-often-closed-positions/cmid-often-closed-positions.interfaces";

@Injectable({
    providedIn: 'root',
})
export class OftenClosedPositionsService {
    private restUrl: string;

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getPositionsList(widgetId: string): Promise<ICmidOftenClosedPosition[]> {
        // return this.http.get<IOftenClosedPosition[]>(`${this.restUrl}/api/../../../${widgetId}`).toPromise();
        return null;
    }
}
