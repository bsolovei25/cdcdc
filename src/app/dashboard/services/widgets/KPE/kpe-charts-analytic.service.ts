import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IKpeChartsAnalyticSharedStates } from '../../../models/KPE/kpe-charts-analytic.model';

@Injectable({
    providedIn: 'root',
})
export class KpeChartsAnalyticService {
    public syncStates$: Subject<IKpeChartsAnalyticSharedStates> = new Subject<IKpeChartsAnalyticSharedStates>();
    constructor() {}
}
