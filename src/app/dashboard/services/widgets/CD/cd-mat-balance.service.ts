import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventsWidgetNotification } from '../../../models/events-widget';
import { HttpClient } from '@angular/common/http';
import { IScheduleShiftDay } from '../../../models/admin-shift-schedule';
import { AppConfigService } from '../../../../services/appConfigService';

@Injectable({
    providedIn: 'root'
})
export class CdMatBalanceService {
    private readonly restUrl: string;

    showDeviation: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    charts$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    isOpenEvent$: BehaviorSubject<EventsWidgetNotification> =
        new BehaviorSubject<EventsWidgetNotification>(null);

    public hc$: BehaviorSubject<8 | 24> = new BehaviorSubject<8 | 24>(8);
    public currentHour$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    async getEstablishedFactsArray(): Promise<string[]> {
        return this.http
            .get<string[]>(
                this.restUrl + `/api/schedule-shifts/unit/`
            )
            .toPromise();
    }

}
