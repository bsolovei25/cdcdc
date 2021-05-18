import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable } from "rxjs";
import {
    EventsWidgetCategoryCode,
    EventsWidgetsStats,
    IAsusCategories,
    IAsusEOService,
    IAsusService,
    IAsusTmPlace,
    IAsusTpPlace,
    IAsusWorkgroup,
    ICategory, ICorrect,
    IEventsWidgetNotification,
    IEventsWidgetNotificationPreview,
    IEventsWidgetOptions, IPhase,
    IPriority,
    IReason,
    IResponsibleUserId,
    IRestriction,
    IRestrictionRequest,
    ISaveMethodEvent,
    ISmotrReference,
    IStatus,
    ISubcategory,
    IUnitEvents,
    IUser
} from "../../../models/EVJ/events-widget";
import { AppConfigService } from '@core/service/app-config.service';
import { catchError } from "rxjs/operators";
import { of } from 'rxjs';

export interface IEventsFilter {
    unitNames?: string[];
    description?: string;
    categoryIds?: number[];
    priority: string;
}

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private readonly restUrl: string;
    private readonly smotrUrl: string;
    private readonly isDomenAuth: boolean;
    private readonly batchSize: number = 50;

    private filterEvent: IEventsFilter;

    public currentEventId$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    public eventFilters$: BehaviorSubject<IEventsFilter> = new BehaviorSubject<IEventsFilter>(null);

    constructor(public http: HttpClient, private configService: AppConfigService) {
        this.restUrl = configService.restUrl;
        this.smotrUrl = configService.smotrUrl;
        this.isDomenAuth = configService.isDomenAuth;
    }

    public async getBatchData(
        lastId: number,
        options: IEventsWidgetOptions
    ): Promise<IEventsWidgetNotificationPreview[]> {
        try {
            return this.getBatchDataObserver(lastId, options).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    public getBatchDataObserver(
        lastId: number,
        options: IEventsWidgetOptions
    ): Observable<IEventsWidgetNotificationPreview[]> {
        const routeAdder = options.categoriesType === 'ed' ? '/ed' : '';
        return this.http.get<IEventsWidgetNotificationPreview[]>(
            this.restUrl + `/api/notifications/getbyfilter${routeAdder}?${this.getOptionString(lastId, options)}`
        );
    }

    public async getStats(options: IEventsWidgetOptions): Promise<EventsWidgetsStats> {
        try {
            return await this.getStatsObserver(options).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    public getStatsObserver(options: IEventsWidgetOptions): Observable<EventsWidgetsStats> {
        const routeAdder = options.categoriesType === 'ed' ? '/ed' : '';
        return this.http.get<EventsWidgetsStats>(
            this.restUrl + `/api/notifications/stats${routeAdder}?${this.getOptionString(0, options)}`
        );
    }

    public async getPlaces(widgetId: string): Promise<string[]> {
        try {
            return this.http.get<string[]>(`${this.restUrl}/api/notifications/widget/places/${widgetId}`).toPromise();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getEvent(id: number): Promise<IEventsWidgetNotification> {
        try {
            return (
                this.http
                    // .get<EventsWidgetNotification>('assets/mock/SmotrEventsMock/event.json')
                    .get<IEventsWidgetNotification>(this.restUrl + '/api/notifications/' + id)
                    .toPromise()
            );
        } catch (error) {
            console.error(error);
        }
    }

    async getSaveMethod(event: IEventsWidgetNotification): Promise<ISaveMethodEvent> {
        try {
            const saveMethod: ISaveMethodEvent = await this.http
                .post<ISaveMethodEvent>(`${this.restUrl}/api/notifications/save-method`, event)
                .toPromise();
            saveMethod.options = {
                headers: new HttpHeaders({
                    AuthenticationType: saveMethod.data.authenticationType,
                }),
            };
            return saveMethod;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getReferenceMethod(event: IEventsWidgetNotification): Promise<ISaveMethodEvent> {
        try {
            const saveMethod: ISaveMethodEvent = await this.http
                .post<ISaveMethodEvent>(`${this.restUrl}/api/Notifications/reference-method`, event)
                .toPromise();
            saveMethod.options = {
                headers: new HttpHeaders({
                    AuthenticationType: saveMethod.data.authenticationType,
                }),
            };
            return saveMethod;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async postEvent(body: IEventsWidgetNotification, saveMethod: ISaveMethodEvent): Promise<any> {
        return this.http.post(`${saveMethod.data.url}/notifications`, body, saveMethod.options).toPromise();
    }

    async postEventRetrieval(body: IEventsWidgetNotification): Promise<IEventsWidgetNotification> {
        return this.http
            .post<IEventsWidgetNotification>(
                `${this.restUrl}/api/notification-retrieval/${body.parentId}/RetrievalEvents`,
                body
            )
            .toPromise();
    }

    async putEvent(body: IEventsWidgetNotification, saveMethod: ISaveMethodEvent): Promise<any> {
        return this.http.put(`${saveMethod.data.url}/notifications/${body.id}`, body, saveMethod.options).toPromise();
    }

    async deleteEvent(id: number): Promise<unknown> {
        return this.http.delete(this.restUrl + '/api/notifications/' + id).toPromise();
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
            return this.http.get<IStatus[]>(this.restUrl + '/api/notification-reference/status').toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getSubcategory(): Promise<ISubcategory[]> {
        try {
            return await this.http
                .get<ISubcategory[]>(`${this.restUrl}/api/notification-reference/subcategory`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getRestrictions(): Promise<IRestriction[]> {
        try {
            return await this.http
                .get<IRestriction[]>(`${this.restUrl}/api/notification-reference/restrictions`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async setRestrictions(id: number, body: IRestrictionRequest): Promise<unknown> {
        try {
            return await this.http
                .post<unknown>(`${this.restUrl}/api/notifications/${id}/restriction`, body)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    public getCorrects(): Observable<ICorrect[]> {
        return this.http
            .get<ICorrect[]>(`${this.restUrl}/api/notification-reference/smpo/event`)
            .pipe(catchError((error) => {
                console.error(error);
                return EMPTY;
            }));
    }

    public getSmotrCorrects(): Observable<ICorrect[]> {
        // return this.http
        //     .get<ISmotrCorrect[]>(`${this.restUrl}/api/notification-reference/smotr/events`)
        //     .pipe(catchError((error) => {
        //         console.error(error);
        //         return EMPTY;
        //     }));

        // Корректирующие мероприятия СМОТР
        return of([
            {id: "be4b7cd3-9455-11ea-a2cf-005056a5c7f6", name: "Прочие"},
            {id: "94ad7506-62ee-11eb-a2d1-005056a5c7f6", name: "Внесение информации о режиме работы в технологический регламент"}, 
            {id: "a24fe9f2-62ee-11eb-a2d1-005056a5c7f6", name: "Проработка корректности действий с технологическим персоналом"}, 
            {id: "acb70e28-62ee-11eb-a2d1-005056a5c7f6", name: "Техническое перевооружение и модернизация"}, 
            {id: "acb70e29-62ee-11eb-a2d1-005056a5c7f6", name: "Чистка оборудования"}, 
            {id: "1dae9b40-6403-11e8-b4a4-005056b52c10", name: "Корректировка параметров технологического режима,направленная на компенсацию либо устранение отклонения"}, 
            {id: "1dae9b41-6403-11e8-b4a4-005056b52c10", name: "Корректировка параметров либо качества сырья"}, 
            {id: "1dae9b42-6403-11e8-b4a4-005056b52c10", name: "Ремонт оборудования"}, 
            {id: "1dae9b44-6403-11e8-b4a4-005056b52c10", name: "Повторное проведение лабораторного анализа"}, 
            {id: "1dae9b45-6403-11e8-b4a4-005056b52c10", name: "Рассмотрение возможности пересмотра норматива технологического регламента"}, 
            {id: "1dae9b47-6403-11e8-b4a4-005056b52c10", name: "Восстановление работоспособности КиП и систем автоматизации"}, 
            {id: "1dae9b48-6403-11e8-b4a4-005056b52c10", name: "Замена оборудования"}, 
            {id: "1dae9b49-6403-11e8-b4a4-005056b52c10", name: "Актуализация данных в системе мониторинга (СМОТР)"}, 
            {id: "1dae9b4a-6403-11e8-b4a4-005056b52c10", name: "Корректировка параметров либо качества энергоносителя и вспомогательных потоков ОЗХ"}
        ]);
    }

    public getReasons(): Observable<IReason[]> {
        return this.http
            .get<IReason[]>(`${this.restUrl}/api/notification-reference/smpo/reason`)
            .pipe(catchError((error) => {
                console.error(error);
                return EMPTY;
            }));
    }

    public getPhaseList(): Observable<IPhase[]> {
        return this.http
            .get<IPhase[]>(`${this.restUrl}/api/notification-reference/smpo/phase`)
            .pipe(catchError((error) => {
                console.error(error);
                return EMPTY;
            }));
    }

    async getPriority(): Promise<IPriority[]> {
        try {
            return this.http.get<IPriority[]>(this.restUrl + '/api/notification-reference/priority').toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getCategory(): Promise<ICategory[]> {
        try {
            return this.http.get<ICategory[]>(this.restUrl + '/api/notification-reference/category').toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getEventType(): Promise<ICategory[]> {
        try {
            return this.http.get<ICategory[]>(this.restUrl + '/api/notification-reference/eventtype').toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getPlace(): Promise<any> {
        try {
            return this.http.get<any>(this.restUrl + '/api/notification-reference/place').toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getUnits(): Promise<IUnitEvents[]> {
        try {
            return this.http.get<IUnitEvents[]>(this.restUrl + '/api/notification-reference/units').toPromise();
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

    async getAsusCategories(saveMethod: ISaveMethodEvent, eventId: number = null): Promise<IAsusCategories[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http.get<IAsusCategories[]>('assets/mock/AsusEventsMock/category.json').toPromise();
            }
            const url = `${saveMethod.data.url}/references/category${eventId ? `?id=${eventId}` : ''}`;
            return this.http.get<IAsusCategories[]>(url, saveMethod.options).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusWorkgroup(saveMethod: ISaveMethodEvent): Promise<IAsusWorkgroup[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http.get<IAsusWorkgroup[]>('assets/mock/AsusEventsMock/workgroup.json').toPromise();
            }
            return this.http
                .get<IAsusWorkgroup[]>(saveMethod.data.url + '/references/workgroup', saveMethod.options)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusServices(saveMethod: ISaveMethodEvent): Promise<IAsusService[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http.get<IAsusService[]>('assets/mock/AsusEventsMock/services.json').toPromise();
            }
            return this.http
                .get<IAsusService[]>(saveMethod.data.url + '/references/services', saveMethod.options)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusUnits(saveMethod: ISaveMethodEvent, eventId: number = null): Promise<IAsusTmPlace[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http.get<IAsusTmPlace[]>('assets/mock/AsusEventsMock/tmplace.json').toPromise();
            }
            const url = `${saveMethod.data.url}/references/tmplaces${eventId ? `?id=${eventId}` : ''}`;
            return this.http.get<IAsusTmPlace[]>(url, saveMethod.options).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusEquipments(
        codeSap: string,
        saveMethod: ISaveMethodEvent,
        eventId: number = null
    ): Promise<IAsusTpPlace[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http.get<IAsusTpPlace[]>('assets/mock/AsusEventsMock/tpplace.json').toPromise();
            }
            const url = `${saveMethod.data.url}/references/tplaces?tmSapCode=${codeSap}${
                eventId ? `&id=${eventId}` : ''
            }`;
            return this.http.get<IAsusTpPlace[]>(url, saveMethod.options).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async getAsusEOServices(
        codeSap: string,
        saveMethod: ISaveMethodEvent,
        eventId: number = null
    ): Promise<IAsusEOService[]> {
        try {
            if (!this.isDomenAuth) {
                return this.http.get<IAsusEOService[]>('assets/mock/AsusEventsMock/eoplace.json').toPromise();
            }
            const url = `${saveMethod.data.url}/references/eoservice?tpSapCode=${codeSap}${
                eventId ? `&id=${eventId}` : ''
            }`;
            return this.http.get<IAsusEOService[]>(url, saveMethod.options).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    // TODO change route and add isDomenAuth
    async getSmotrReference(): Promise<ISmotrReference> {
        try {
            if (!this.isDomenAuth) {
                return (
                    this.http
                        .get<ISmotrReference>('assets/mock/SmotrEventsMock/reference.json')
                        // .get<IAsusEOService[]>(this.restUrl + '/api/notification-reference/eoservice')
                        .toPromise()
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    async addRetrievalEvents(idEvent: number, body): Promise<any> {
        try {
            return this.http
                .post<any>(this.restUrl + `/api/notification-retrieval/${idEvent}/retrievalevents`, body)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    async deleteRetrievalEvents(idEvent: number, idRetr: number): Promise<any> {
        try {
            return await this.http
                .delete<any>(this.restUrl + `/api/notification-retrieval/${idEvent}/retrievalevents/${idRetr}`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    public async escalateSmotrEvent(saveMethod: ISaveMethodEvent, body: IEventsWidgetNotification): Promise<any> {
        const options = {
            headers: new HttpHeaders({
                AuthenticationType: saveMethod.data.authenticationType,
            }),
        };
        const url: string = `${saveMethod.data.url}/monitoring/escalatedeviation`;
        return await this.http.post(url, body, options).toPromise();
    }

    public async closeSmotrEvent(saveMethod: ISaveMethodEvent, body: IEventsWidgetNotification): Promise<any> {
        const options = {
            headers: new HttpHeaders({
                AuthenticationType: saveMethod.data.authenticationType,
            }),
        };
        const url: string = `${saveMethod.data.url}/monitoring/closedeviation`;
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

    public async changeEventIsAcknowledged(id: number, isAcknowledged: boolean): Promise<void> {
        const url: string = `${this.restUrl}/api/notifications/${id}/acknowledged/${isAcknowledged}`;
        return this.http.put<void>(url, null).toPromise();
    }

    private getOptionString(lastId: number, options: IEventsWidgetOptions): string {
        let res = `take=${this.batchSize}&lastId=${lastId}`;
        if (options.dates) {
            res +=
                `&fromDateTime=${options.dates?.fromDateTime.toISOString()}` +
                `&toDateTime=${options.dates?.toDateTime.toISOString()}`;
        }
        if (options.categories?.length > 0 && options.categoriesType === 'default') {
            for (const category of options.categories) {
                res += `&categoryIds=${category}`;
            }
        }
        if (options.categories?.length > 0 && options.categoriesType === 'ed') {
            for (const category of options.categories) {
                res += `&dispatcherCategoryIds=${category}`;
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
                case 'isNotAcknowledged':
                    res += '&statusIds=-100';
                    break;
            }
        }
        if (options.description) {
            res += `&description=${options.description}`;
        }
        if (options.isVideoWall) {
            res += `&isVideoWall=${options.isVideoWall}`;
        }
        if (options.sortType) {
            res += `&sortType=${options.sortType}`;
        }
        if (options.units) {
            options.units.forEach((value) => {
                res += `&unitNames=${value.name}`;
            });
        }
        if (options.priority) {
            res += `&priorityIds=${options.priority.id}`;
        }
        if (options.subCategory) {
            options.subCategory.forEach((value) => {
                res += `&subcategoryIds=${value}`;
            });
        }
        if (options.isRestrictions) {
            res += `&isRestrictions=${options.isRestrictions}`;
        }
        return res;
    }

    public async incrementStatus(eventId: number, status: string): Promise<any> {
        const url: string = `${this.restUrl}/api/notifications/${eventId}/status/${status}`;
        return this.http.put<void>(url, null).toPromise();
    }

    public async getDefaultResponsibleByType(type: EventsWidgetCategoryCode): Promise<IUser> {
        return await this.http
            .post<IUser>(`${this.restUrl}/api/notifications/responsible?systemType=${type}`, null)
            .toPromise();
    }

    async getEventsFilter(
        unitNames?: string[],
        categoryIds?: number[],
        statusIds?: number[],
        description?: string
    ): Promise<IUnitEvents[]> {
        let searchString: string = '';
        if (this.filterEvent.unitNames) {
            this.filterEvent.unitNames.forEach((value) => {
                searchString += `UnitName=${value}`;
            });
        }
        if (categoryIds) {
            categoryIds.forEach((value) => {
                searchString += `CategoryIds=${value}`;
            });
        }
        if (statusIds) {
            statusIds.forEach((value) => {
                searchString += `StatusIds=${value}`;
            });
        }
        if (description) {
            searchString += `Description=${description}`;
        }
        try {
            return this.http
                .get<IUnitEvents[]>(this.restUrl + `/api/notifications/getbyfilter?${searchString}`)
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    setEventPriority(priority: string): void {
        this.filterEvent.priority = priority;
    }

    setEventUnit(units: string[]): void {
        this.filterEvent.unitNames = units;
    }

    public async getResponsibleUserId(unitId: number): Promise<IResponsibleUserId> {
        try {
            return this.http.get<IResponsibleUserId>(this.restUrl + `/api/reception-pass/Shift/unit/${unitId}/getresponsible`).toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    public async getResponsibleUser(responsibleUserId: number): Promise<IUser> {
        try {
            return this.http.get<IUser>(this.restUrl + `/api/user-management/user/${responsibleUserId}`).toPromise();
        } catch (error) {
            console.error(error);
        }
    }
}
