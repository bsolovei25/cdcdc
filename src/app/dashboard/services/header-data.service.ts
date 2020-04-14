import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { IHeaderDate } from '../models/i-header-date';

@Injectable({
    providedIn: 'root',
})
export class HeaderDataService {
    private localDate$: BehaviorSubject<IHeaderDate | null> = new BehaviorSubject<IHeaderDate | null>(
        null
    );

    public date$: Observable<IHeaderDate> = this.localDate$
        .asObservable()
        .pipe(filter((item) => item !== null));

    public startDate: any;
    public endDate: any;
    public statusButton;
    public monthStart;
    public monthEnd;
    public hoursStart;
    public hoursEnd;
    public otherMonth: string;

    public startDatetime: Date = new Date();
    public endDatetime: Date = new Date();

    // public dateToLine = {};

    constructor() {}

    public catchDefaultDate(start: Date, end: Date, status: boolean): void {
        let defaultTime = new Date();
        defaultTime = new Date(
            defaultTime.getFullYear(),
            defaultTime.getMonth(),
            defaultTime.getDate(),
            0,
            0,
            0
        );

        let datePipe = new DatePipe('en-Us');

        let defaultMonth = datePipe.transform(defaultTime, 'yyyyMM');
        this.startDate = datePipe.transform(start, 'dd');
        this.endDate = datePipe.transform(end, 'dd');
        this.monthStart = datePipe.transform(start, 'yyyyMM');
        this.monthEnd = datePipe.transform(end, 'yyyyMM');
        this.hoursStart = datePipe.transform(start, 'HH');
        this.hoursEnd = datePipe.transform(end, 'HH');

        this.monthStart !== defaultMonth && this.monthEnd !== defaultMonth
            ? ((this.startDate = '01'), (this.endDate = '31'), (this.otherMonth = 'all'))
            : this.monthStart !== defaultMonth
            ? ((this.startDate = '01'), (this.otherMonth = 'past'))
            : this.monthEnd !== defaultMonth
            ? ((this.endDate = '31'), (this.otherMonth = 'future'))
            : (this.otherMonth = '');

        this.startDatetime = new Date(start);
        this.endDatetime = new Date(end);
        this.statusButton = status;
        this.pushDate();
    }

    public catchStatusButton(status): void {
        this.statusButton = status;
        this.pushDate();
    }

    public pushDate(): void {
        const dateTo = {
            start: this.startDate,
            end: this.endDate,
            otherMonth: this.otherMonth,
            hoursStart: this.hoursStart,
            hoursEnd: this.hoursEnd,
            status: this.statusButton,
            startDatetime: this.startDatetime,
            endDatetime: this.endDatetime,
        };
        this.localDate$.next(dateTo);
    }
}
