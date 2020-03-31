import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { ITime } from '../../models/time-data-picker';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { NGX_MAT_DATE_FORMATS, NgxMatDateFormats } from '@angular-material-components/datetime-picker';


const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
    parse: {
        dateInput: 'L | LTS'
    },
    display: {
        dateInput: 'L | LTS',
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: 'LL',
        monthYearA11yLabel: "MMMM YYYY"
    }
};


@Component({
    selector: 'evj-time-data-picker',
    templateUrl: './time-data-picker.component.html',
    styleUrls: ['./time-data-picker.component.scss'],
    providers: [
        { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    ]
})
export class TimeDataPickerComponent implements OnInit, OnChanges {
    @Input() data: any;
    @Output() dateTimePicker = new EventEmitter<ITime>();

    public inputDate: any;
    public inputTime: string;

    @ViewChild('picker') picker: any;

    public disabled = false;
    public showSpinners = true;
    public showSeconds = true;
    public touchUi = false;
    public enableMeridian = false;
    public stepHour = 1;
    public stepMinute = 10;
    public stepSecond = 1;
    public color: ThemePalette = 'primary';

    public stepHours = [1, 2, 3, 4, 5];
    public stepMinutes = [1, 5, 10, 15, 20, 25];
    public stepSeconds = [1, 5, 10, 15, 20, 25];

    public dateControl = new FormControl(new Date());

    //

    constructor() { }

    ngOnInit(): void {
        this.inputDate = new Date(this.data);
    }

    ngOnChanges() {
        // try {
        //     let const22 = new Date(this.data);
        //     this.inputDate = const22;
        // } catch (error) {

        // }
    }

    buttonConfirm() {
        this.inputDate = new Date(this.data);
        let timeInput = moment(this.inputDate).locale('ru').format('LTS');
        const object: ITime = { date: this.inputDate, time: timeInput };
        this.dateTimePicker.emit(object);
    }
}
