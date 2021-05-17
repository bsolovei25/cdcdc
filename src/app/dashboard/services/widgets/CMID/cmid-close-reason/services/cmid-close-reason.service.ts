import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AppConfigService } from "@core/service/app-config.service";

@Injectable({
    providedIn: 'root',
})
export class CmidCloseReasonService {
    private restUrl: string;

    // Mock
    public vprValue = 92.7;
    public operativeValue = 96.4;
    public reasonGroups = [
        {
            name: 'Организационные',
            value: 12
        },
        {
            name: 'Технологические',
            value: 6
        },
        {
            name: 'Регламентные',
            value: 8
        },
        {
            name: 'КИП',
            value: 24
        }
    ];
    public countStatistics = [
        {
            type: 'Несанкцион.',
            value: 3
        },
        {
            type: 'Просрочен.',
            value: 17
        },
        {
            type: 'Всего',
            value: 55
    }];

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }
}