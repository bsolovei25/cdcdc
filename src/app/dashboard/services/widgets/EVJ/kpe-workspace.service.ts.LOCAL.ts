import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import {
    IKpeWorkspaceParameter,
    IKpeAllDependentParameters,
    IKpeNotification,
} from '../../../models/EVJ/kpe-workspace.model';
import { BehaviorSubject } from 'rxjs';
import { IEventsWidgetNotification } from '../../../models/EVJ/events-widget';

@Injectable({
    providedIn: 'root',
})
export class KpeWorkspaceService {
    private readonly restUrl: string;
    selectParameter$: BehaviorSubject<IKpeWorkspaceParameter> = new BehaviorSubject<
        IKpeWorkspaceParameter
    >(null);
    showSelectParameters$: BehaviorSubject<IKpeAllDependentParameters[]> = new BehaviorSubject<
        IKpeAllDependentParameters[]
    >(null);

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    async getAllKpeParameters(): Promise<IKpeWorkspaceParameter[]> {
        return this.http
            .get<IKpeWorkspaceParameter[]>(this.restUrl + `/api/notification-kpe/parameters/all`)
            .toPromise();
    }

    async getKpeAllDependentParameters(parameterId: number): Promise<IKpeAllDependentParameters[]> {
        return this.http
            .get<IKpeAllDependentParameters[]>(
                this.restUrl +
                    `/api/notification-kpe/parameters/${parameterId}/dependent-parameters`
            )
            .toPromise();
    }

    async getKpeNotificationParameters(body: IEventsWidgetNotification): Promise<IKpeNotification> {
        return this.http
            .get<IKpeNotification>(
                this.restUrl + `/api/notification-kpe/notification/${body.id}/parameters`
            )
            .toPromise();
    }

    async postKpeNotificationParameters(
        body: IEventsWidgetNotification,
        notification: IKpeNotification
    ): Promise<IKpeNotification> {
        return this.http
            .post<IKpeNotification>(
                this.restUrl + `/api/notification-kpe/notification/${body.id}/parameters/save`,
                notification
            )
            .toPromise();
    }

    async deleteKpeNotificationParameters(
        body: IEventsWidgetNotification
    ): Promise<IKpeNotification> {
        return this.http
            .delete<IKpeNotification>(
                this.restUrl + `/api/notification-kpe/notification/${body.id}/parameters`
            )
            .toPromise();
    }
}
