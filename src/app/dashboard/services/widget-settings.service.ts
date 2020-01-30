import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IWidgetSettings } from '../models/widget.model';
import { AppConfigService } from 'src/app/services/appConfigService';

@Injectable({
    providedIn: 'root',
})
export class WidgetSettingsService {
    private readonly restUrl: string;

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getSettings(widgetUniqueId: string): Promise<IWidgetSettings[]> {
        const url = `${this.restUrl}/api/user-management/widgetsettings/${widgetUniqueId}`;
        const settings = await this.http.get<IWidgetSettings[]>(url).toPromise();
        return settings;
    }

    public async saveSettings(widgetUniqueId: string, settings: IWidgetSettings[]): Promise<void> {
        const url = `${this.restUrl}/api/user-management/widgetsettings/${widgetUniqueId}`;
        await this.http.post(url, settings).toPromise();
    }

    public async saveSingleSetting(
        widgetUniqueId: string,
        key: string,
        value: string): Promise<void> {

        const url = `${this.restUrl}/api/user-management/widgetsettings/${widgetUniqueId}/${key}`;
        await this.http.post(url, value).toPromise();
    }
}
