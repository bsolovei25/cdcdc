import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/index';
import {
    EventsWidgetNotification,
    IStatus,
    ICategory,
    EventsWidgetOptions,
    EventsWidgetsStats,
    EventsWidgetNotificationPreview,
    IRetrievalEvents,
    IUnitEvents,
    IUser,
    IPriority,
    IAsusService,
    IAsusEOService,
    IAsusCategories,
    IAsusWorkgroup,
    ISmotrReference,
    ISaveMethodEvent, IRetrievalEventDto, IAsusTmPlace, IAsusTpPlace
} from '../../models/events-widget';
import { AppConfigService } from 'src/app/services/appConfigService';

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private readonly restUrl: string;
    private readonly smotrUrl: string;
    private readonly isDomenAuth: boolean;
    private readonly batchSize: number = 50;

    public currentEventId$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
        this.smotrUrl = configService.smotrUrl;
        this.isDomenAuth = configService.isDomenAuth;
    }

    async getBatchData(
        lastId: number,
        options: EventsWidgetOptions
    ): Promise<EventsWidgetNotificationPreview[]> {
        try {
            return this.http
                .get<EventsWidgetNotificationPreview[]>(
                    this.restUrl +
                        `/api/notifications/getbyfilter?${this.getOptionString(lastId, options)}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    public async getStats(options: EventsWidgetOptions): Promise<EventsWidgetsStats> {
        try {
            return this.http
                .get<EventsWidgetsStats>(
                    this.restUrl + `/api/notifications/stats?${this.getOptionString(0, options)}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    public async getPlaces(widgetId: string): Promise<string[]> {
        try {
            return this.http
                .get<string[]>(`${this.restUrl}/api/notifications/widget/places/${widgetId}`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getEvent(id: number): Promise<EventsWidgetNotification> {
        try {
            return this.http
                // .get<EventsWidgetNotification>('assets/mock/SmotrEventsMock/event.json')
                .get<EventsWidgetNotification>(this.restUrl + '/api/notifications/' + id)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    getSaveMethod(event: EventsWidgetNotification): Promise<ISaveMethodEvent> {
        try {
            return this.http
                .post<ISaveMethodEvent>(`${this.restUrl}/api/notifications/save-method`, event)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async postEvent(body: EventsWidgetNotification): Promise<any> {
        try {
            return this.http.post(this.restUrl + '/api/notifications', body).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async postEventRetrieval(body: EventsWidgetNotification): Promise<any> {
        try {
            return this.http.post(`${this.restUrl}/api/notification-retrieval/${body.parentId}/RetrievalEvents`, body).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async putEvent(body: EventsWidgetNotification): Promise<any> {
        try {
            return this.http.put(this.restUrl + '/api/notifications/' + body.id, body).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteEvent(id: number): Promise<any> {
        try {
            return this.http.delete(this.restUrl + '/api/notifications/' + id).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async addLink(idEvent: number, idRetrieval: number): Promise<any> {
        return this.http
            .post(`${this.restUrl}/api/notification-retrieval/${idEvent}/RetrievalEvents/${idRetrieval}`, null)
            .toPromise();
    }

    async deleteLink(idEvent: number, idRetrieval: number): Promise<any> {
        return this.http
            .delete(`${this.restUrl}/api/notification-retrieval/${idEvent}/RetrievalEvents/${idRetrieval}`)
            .toPromise();
    }

    async getStatus(): Promise<IStatus[]> {
        try {
            return this.http
                .get<IStatus[]>(this.restUrl + '/api/notification-reference/status')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getPriority(): Promise<IPriority[]> {
        try {
            return this.http
                .get<IPriority[]>(this.restUrl + '/api/notification-reference/priority')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getCategory(): Promise<ICategory[]> {
        try {
            return this.http
                .get<ICategory[]>(this.restUrl + '/api/notification-reference/category')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getEventType(): Promise<ICategory[]> {
        try {
            return this.http
                .get<ICategory[]>(this.restUrl + '/api/notification-reference/eventtype')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getPlace(): Promise<any> {
        try {
            return this.http
                .get<any>(this.restUrl + '/api/notification-reference/place')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getUnits(): Promise<IUnitEvents[]> {
        try {
            return this.http
                .get<IUnitEvents[]>(this.restUrl + '/api/notification-reference/units')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getUser(): Promise<IUser[]> {
        try {
            return this.http.get<IUser[]>(this.restUrl + '/api/user-management/users').toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getEquipmentCategory(): Promise<ICategory[]> {
        try {
            return this.http
                .get<ICategory[]>(this.restUrl + '/api/notification-reference/equipmentcategory')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusCategories(): Promise<IAsusCategories[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http
                    .get<IAsusCategories[]>('assets/mock/AsusEventsMock/category.json')
                    .toPromise();
            }
            return this.http
                .get<IAsusCategories[]>(this.restUrl + '/api/asus-events/category')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusWorkgroup(): Promise<IAsusWorkgroup[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http
                    .get<IAsusWorkgroup[]>('assets/mock/AsusEventsMock/workgroup.json')
                    .toPromise();
            }
            return this.http
                .get<IAsusWorkgroup[]>(this.restUrl + '/api/asus-events/api/References/workgroup')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusServices(): Promise<IAsusService[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http
                    .get<IAsusService[]>('assets/mock/AsusEventsMock/services.json')
                    .toPromise();
            }
            return this.http
                .get<IAsusService[]>(this.restUrl + '/api/asus-events//api/References/services')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusUnits(): Promise<IAsusTmPlace[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http
                    .get<IAsusTmPlace[]>('assets/mock/AsusEventsMock/tmplace.json')
                    .toPromise();
            }
            return this.http
                .get<IAsusTmPlace[]>(this.restUrl + 'api/references/tmplaces')
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusEquipments(codeSap: string): Promise<IAsusTpPlace[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http
                    .get<IAsusTpPlace[]>('assets/mock/AsusEventsMock/tpplace.json')
                    .toPromise();
            }
            return this.http
                .get<IAsusTpPlace[]>(this.restUrl + `api/references/tplaces?tmSapCode=${codeSap}`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusEOServices(codeSap: string): Promise<IAsusEOService[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http
                    .get<IAsusEOService[]>('assets/mock/AsusEventsMock/eoplace.json')
                    .toPromise();
            }
            return this.http
                .get<IAsusEOService[]>(this.restUrl + `api/references/eoservice?tpSapCode=${codeSap}`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    // TODO change route and add isDomenAuth
    async getSmotrReference(): Promise<ISmotrReference> {
        try {
            if (!this.isDomenAuth) {
                return this.http
                    .get<ISmotrReference>('assets/mock/SmotrEventsMock/reference.json')
                    // .get<IAsusEOService[]>(this.restUrl + '/api/notification-reference/eoservice')
                    .toPromise();
            }
        } catch (error) {
            console.error(error);
        }
    }

    async addRetrievalEvents(idEvent: number, body): Promise<any> {
        try {
            return this.http
                .post<any>(
                    this.restUrl + `/api/notification-retrieval/${idEvent}/retrievalevents`,
                    body
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteRetrievalEvents(idEvent: number, idRetr: number): Promise<any> {
        try {
            return await this.http
                .delete<any>(
                    this.restUrl +
                        `/api/notification-retrieval/${idEvent}/retrievalevents/${idRetr}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    public async escalateSmotrEvent(id: string): Promise<any> {
        const url: string = `${this.smotrUrl}/api/monitoring/escalatedeviation/${id}`;
        return await this.http.put(url, null).toPromise();
    }

    public async closeSmotrEvent(id: string): Promise<any> {
        const url: string = `${this.smotrUrl}/api/monitoring/closedeviation/${id}`;
        return await this.http.put(url, null).toPromise();
    }

    public async updateSmotrEvent(id: string): Promise<any> {
        const url: string = `${this.smotrUrl}/api/monitoring/updatedeviation/${id}`;
        try {
            return await this.http.put(url, null).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    private getOptionString(lastId: number, options: EventsWidgetOptions): string {
        let res = `take=${this.batchSize}&lastId=${lastId}&`;
        if (options.dates) {
            res +=
                `fromDateTime=${options.dates?.fromDateTime.toISOString()}&` +
                `toDateTime=${options.dates?.toDateTime.toISOString()}`;
        }
        if (options.categories?.length > 0) {
            for (const category of options.categories) {
                res += `&categoryIds=${category}`;
            }
        }
        if (options.placeNames?.length > 0) {
            for (const place of options.placeNames) {
                res += `&placeNames=${place}`;
            }
        }
        if (options.filter) {
            switch (options.filter) {
                case 'all':
                    res += '&statusIds=3001&statusIds=3002';
                    break;
                case 'closed':
                    res += '&statusIds=3003';
                    break;
                case 'inWork':
                    res += '&statusIds=3002';
                    break;
            }
        }
        if (options.description) {
            res += `&description=${options.description}`;
        }
        return res;
    }
}
