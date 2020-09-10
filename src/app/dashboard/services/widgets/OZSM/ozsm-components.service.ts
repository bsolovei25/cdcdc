import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventsWidgetsStats, IEventsWidgetOptions } from '../../../models/events-widget';
import { AppConfigService } from '../../../../services/appConfigService';

@Injectable({ providedIn: 'root' })

export class OzsmComponentsService {

    private readonly restUrl: string;

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getLineDiagram(options: IEventsWidgetOptions): Promise<EventsWidgetsStats> {
        try {
            return this.http
                .get<EventsWidgetsStats>(
                    this.restUrl + ``
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }
}
