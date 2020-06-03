import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    async getSaveMethod(event: EventsWidgetNotification): Promise<ISaveMethodEvent> {
        try {
            const saveMethod: ISaveMethodEvent = await this.http
                .post<ISaveMethodEvent>(`${this.restUrl}/api/notifications/save-method`, event)
                .toPromise();
            saveMethod.options = {
                headers: new HttpHeaders({
                    AuthenticationType:  saveMethod.data.authenticationType,
                })
            };
            return saveMethod;
        } catch (error) {
            console.error(error);
        }
    }

    async postEvent(body: EventsWidgetNotification, saveMethod: ISaveMethodEvent): Promise<any> {
        try {
            return this.http.post(`${saveMethod.data.url}/api/notifications`, body, saveMethod.options).toPromise();
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

    async putEvent(body: EventsWidgetNotification, saveMethod: ISaveMethodEvent): Promise<any> {
        try {
            return this.http.put(`${saveMethod.data.url}/api/notifications/${body.id}`, body, saveMethod.options).toPromise();
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

    async getAsusCategories(saveMethod: ISaveMethodEvent): Promise<IAsusCategories[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http
                    .get<IAsusCategories[]>('assets/mock/AsusEventsMock/category.json')
                    .toPromise();
            }
            return this.http
                .get<IAsusCategories[]>(saveMethod.data.url + '/api/asus-events/category', saveMethod.options)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusWorkgroup(saveMethod: ISaveMethodEvent): Promise<IAsusWorkgroup[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http
                    .get<IAsusWorkgroup[]>('assets/mock/AsusEventsMock/workgroup.json')
                    .toPromise();
            }
            return this.http
                .get<IAsusWorkgroup[]>(saveMethod.data.url + '/api/asus-events/api/References/workgroup', saveMethod.options)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusServices(saveMethod: ISaveMethodEvent): Promise<IAsusService[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http
                    .get<IAsusService[]>('assets/mock/AsusEventsMock/services.json')
                    .toPromise();
            }
            return this.http
                .get<IAsusService[]>(saveMethod.data.url + '/api/asus-events//api/References/services', saveMethod.options)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusUnits(saveMethod: ISaveMethodEvent): Promise<IAsusTmPlace[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http
                    .get<IAsusTmPlace[]>('assets/mock/AsusEventsMock/tmplace.json')
                    .toPromise();
            }
            return this.http
                .get<IAsusTmPlace[]>(saveMethod + 'api/references/tmplaces', saveMethod.options)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusEquipments(codeSap: string, saveMethod: ISaveMethodEvent): Promise<IAsusTpPlace[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http
                    .get<IAsusTpPlace[]>('assets/mock/AsusEventsMock/tpplace.json')
                    .toPromise();
            }
            return this.http
                .get<IAsusTpPlace[]>(saveMethod.data.url + `api/references/tplaces?tmSapCode=${codeSap}`, saveMethod.options)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusEOServices(codeSap: string, saveMethod: ISaveMethodEvent): Promise<IAsusEOService[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http
                    .get<IAsusEOService[]>('assets/mock/AsusEventsMock/eoplace.json')
                    .toPromise();
            }
            return this.http
                .get<IAsusEOService[]>(saveMethod.data.url + `api/references/eoservice?tpSapCode=${codeSap}`, saveMethod.options)
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

    public async escalateSmotrEvent(saveMethod: ISaveMethodEvent, body: EventsWidgetNotification): Promise<any> {
        const options = {
            headers: new HttpHeaders({
                AuthenticationType:  saveMethod.data.authenticationType,
            })
        };
        const url: string = `${saveMethod.data.url}/api/monitoring/escalatedeviation`;
        return await this.http.post(url, body, options).toPromise();
    }

    public async closeSmotrEvent(saveMethod: ISaveMethodEvent, body: EventsWidgetNotification): Promise<any> {
        const options = {
            headers: new HttpHeaders({
                AuthenticationType:  saveMethod.data.authenticationType,
            })
        };
        const url: string = `${saveMethod.data.url}/api/monitoring/closedeviation`;
        return await this.http.post(url, body, options).toPromise();
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
                res += `&unitNames=${place}`;
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
