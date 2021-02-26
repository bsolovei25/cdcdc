import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IKpeChartsAnalyticSharedStates } from '../../../models/KPE/kpe-charts-analytic.model';
import { IDatesInterval } from '../../widget.service';

@Injectable({
    providedIn: 'root',
})
export class KpeChartsAnalyticService {
    public isSyncEnabled$: BehaviorSubject<IKpeChartsAnalyticSharedStates> = new BehaviorSubject<IKpeChartsAnalyticSharedStates>({
        uniqueId: null,
        value: false,
        dateStart: null,
        dateEnd: null,
    });
    constructor() {}

    public getSync(): IKpeChartsAnalyticSharedStates {
        return this.isSyncEnabled$.getValue();
    }

    public setSync(widgetUniqueId: string, dates: IDatesInterval): void {
        this.isSyncEnabled$.next({
            uniqueId: widgetUniqueId,
            value: true,
            dateStart: dates.fromDateTime,
            dateEnd: dates.toDateTime,
        });
    }

    public cancelSync(): void {
        this.isSyncEnabled$.next({
            uniqueId: null,
            value: false,
            dateStart: null,
            dateEnd: null,
        });
    }
}
