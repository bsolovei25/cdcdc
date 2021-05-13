import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfigService } from "@core/service/app-config.service";
import { INumberOfOutagesModel } from "@widgets/CMID/cmid-number-of-outages/models/cmid-number-of-outages.model";

@Injectable({
    providedIn: 'root',
})
export class CmidNumberOfOutagesService {
    private restUrl: string;

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getOutagesList(widgetId: string): Promise<INumberOfOutagesModel[]> {
        // ToDo HTTP request should be here.
        return null;
    }
}
