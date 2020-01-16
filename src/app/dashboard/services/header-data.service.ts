import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeaderDate } from '../models/header-date';

@Injectable({
    providedIn: 'root',
})
export class HeaderDataService {
    private _date$: BehaviorSubject<HeaderDate> = new BehaviorSubject(null);

    public date$: Observable<HeaderDate> = this._date$
        .asObservable()
        .pipe(filter((item) => item !== null));

    public startDate;
    public endDate;
    public statusButton;
    public monthStart;
    public monthEnd;

    public dateToLine = {};

    constructor() {}

    public catchDefaultDate(start, end, status) {
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

        this.monthStart !== defaultMonth && this.monthEnd !== defaultMonth
            ? ((this.startDate = '01'), (this.endDate = '31'))
            : this.monthStart !== this.monthEnd &&
              this.monthStart < this.monthEnd &&
              this.monthEnd === defaultMonth
            ? (this.startDate = '01')
            : this.monthStart !== this.monthEnd &&
              this.monthStart < this.monthEnd &&
              this.monthEnd !== defaultMonth
            ? (this.endDate = '31')
            : this.startDate;
        this.statusButton = status;
        this.pushDate();
    }

    public catchStatusButton(status) {
        this.statusButton = status;
        this.pushDate();
    }

    public pushDate() {
        let dateTo = {
            start: this.startDate,
            end: this.endDate,
            status: this.statusButton,
        };
        this._date$.next(dateTo);
    }
}