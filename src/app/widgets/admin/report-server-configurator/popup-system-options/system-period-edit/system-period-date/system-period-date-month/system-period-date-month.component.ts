import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import * as _moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { Moment } from 'moment';

const moment = _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'MM',
    },
    display: {
        dateInput: 'MMMM',
        monthYearLabel: 'MMMM',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM',
    },
};

@Component({
    selector: 'evj-system-period-date-month',
    templateUrl: './system-period-date-month.component.html',
    styleUrls: ['./system-period-date-month.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class SystemPeriodDateMonthComponent implements OnInit {
    @ViewChild('picker') public picker: any;

    public date = moment();
    public dataPicker: any;

    @Output() dateTimePicker: EventEmitter<Moment> = new EventEmitter<Moment>();

    constructor() {}

    ngOnInit(): void {}

    chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>): void {
        this.date = normalizedMonth;
        this.dateTimePicker.emit(this.date);
        datepicker.close();
        this.dataPicker.classList.remove('month');
    }

    openDatePicker(dp) {
        dp.open();
    }

    clickMonth(): void {
        this.dataPicker = this.picker._overlay._overlayContainer.getContainerElement();
        this.dataPicker.classList.remove('year');
        this.dataPicker.classList.add('month');
    }
}
