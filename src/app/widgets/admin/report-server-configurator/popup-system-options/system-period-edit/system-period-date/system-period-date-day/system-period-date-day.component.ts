import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import * as _moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { Moment } from 'moment';

const moment = _moment;

export const MY_FORMATS = {
    parse: {
        dateInput: 'DD',
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'DD',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'DD',
    },
};

@Component({
    selector: 'evj-system-period-date-day',
    templateUrl: './system-period-date-day.component.html',
    styleUrls: ['./system-period-date-day.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
})
export class SystemPeriodDateDayComponent implements OnInit {
    @ViewChild('picker') public picker: any;

    public date = new FormControl(moment());

    constructor() {}

    ngOnInit(): void {}

    chosenDayHandler(normalizedDay: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.date.value;
        ctrlValue.day(normalizedDay.day());
        this.date.setValue(ctrlValue);
    }

    clickDay(): void {
        const dataPicker = this.picker._overlay._overlayContainer.getContainerElement();
        dataPicker.classList.remove('month');
        dataPicker.classList.remove('year');
    }
}
