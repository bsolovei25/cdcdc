import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { IHeaderDate } from '../models/i-header-date';

@Injectable({
    providedIn: 'root',
})
export class HeaderDataService {
    private localDate$: BehaviorSubject<IHeaderDate | null> = new BehaviorSubject<IHeaderDate | null>(null);

    public date$: Observable<IHeaderDate> = this.localDate$.asObservable().pipe(filter((item) => item !== null));

    public statusButton: boolean;
    public startDatetime: Date = new Date();
    public endDatetime: Date = new Date();

    constructor() {}

    public catchDefaultDate(start: Date, end: Date, status: boolean): void {
        this.startDatetime = new Date(start);
        this.endDatetime = new Date(end);
        this.statusButton = status;
        this.pushDate();
    }

    public catchStatusButton(status: boolean): void {
        this.statusButton = status;
        this.pushDate();
    }

    public pushDate(): void {
        const dateTo = {
            status: this.statusButton,
            startDatetime: this.startDatetime,
            endDatetime: this.endDatetime,
        };
        this.localDate$.next(dateTo);
    }
}
