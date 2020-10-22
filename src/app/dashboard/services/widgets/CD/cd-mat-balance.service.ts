import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEventsWidgetNotification } from '../../../models/EVJ/events-widget';
import { HttpClient } from '@angular/common/http';
import { IScheduleShiftDay } from '../../../models/ADMIN/admin-shift-schedule';
import { AppConfigService } from '@core/service/app-config.service';
import { IAllEstablishedFacts } from '../../../../widgets/CD/cd-mat-balance/cd-mat-balance.component';

@Injectable({
    providedIn: 'root'
})
export class CdMatBalanceService {
    private readonly restUrl: string;

    showDeviation: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    charts$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    isOpenEvent$: BehaviorSubject<IEventsWidgetNotification> =
        new BehaviorSubject<IEventsWidgetNotification>(null);

    public hc$: BehaviorSubject<8 | 24> = new BehaviorSubject<8 | 24>(8);
    public currentHour$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    async getEstablishedFactsArray(): Promise<IAllEstablishedFacts[]> {
        return this.http
            .get<IAllEstablishedFacts[]>(
                this.restUrl + `/api/notification-reference/establishedfacts`
            )
            .toPromise();
    }

}
