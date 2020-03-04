import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/services/appConfigService';

/*

To save settings:
    await this.widgetSettingsService
        .saveSettings('4fdeb1ee-60d6-4430-9999-64c0af141ea4', {asd: 'dsa', zxc: 'cxz'});

To load settings
    const settings = await this.widgetSettingsService
        .getSettings<{asd: string, zxc: string}>('4fdeb1ee-60d6-4430-9999-64c0af141ea4');
*/

@Injectable({
    providedIn: 'root',
})
export class WidgetSettingsService {
    private readonly restUrl: string;

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getSettings<TSettings>(widgetUniqueId: string): Promise<TSettings> {
        const url = `${this.restUrl}/api/user-management/widgetsettings/${widgetUniqueId}`;
        const settings = await this.http.get<TSettings>(url).toPromise();
        return settings;
    }

    public async saveSettings<TSettings>(
        widgetUniqueId: string,
        settings: TSettings
    ): Promise<void> {
        const url = `${this.restUrl}/api/user-management/widgetsettings/${widgetUniqueId}`;
        const json = this.jsonStringify(settings);
        await this.http.post(url, json).toPromise();
    }

    public async saveSingleSetting(
        widgetUniqueId: string,
        key: string,
        value: string
    ): Promise<void> {
        const url = `${this.restUrl}/api/user-management/widgetsettings/${widgetUniqueId}/${key}`;
        await this.http.post(url, `${value}`).toPromise();
    }

    private jsonStringify<T>(data: T): string {
        return JSON.stringify(data, this.replacer);
    }

    // value to be serialized can be of any type
    // tslint:disable-next-line: no-any
    private replacer(key: string, value: any): string {
        if (typeof value === 'boolean' || typeof value === 'number') {
            return String(value);
        }
        return value;
    }
}
