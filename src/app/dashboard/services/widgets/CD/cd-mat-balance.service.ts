import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventsWidgetNotification } from '../../../models/events-widget';

@Injectable({
    providedIn: 'root'
})
export class CdMatBalanceService {
    showDeviation: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    charts$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
    isOpenEvent$: BehaviorSubject<EventsWidgetNotification> = new BehaviorSubject<EventsWidgetNotification>(null);

    constructor() {
    }
}
