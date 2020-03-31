import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { ITime } from '../../models/time-data-picker';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'evj-time-data-picker',
    templateUrl: './time-data-picker.component.html',
    styleUrls: ['./time-data-picker.component.scss'],
})
export class TimeDataPickerComponent implements OnInit, OnChanges {
    @Input() data: Date;
    @Output() dateTimePicker = new EventEmitter<ITime>();

    public inputDate: Date;
    public inputTime: string;

    // TimePicker

    @ViewChild('picker') picker: any;

    public dates: moment.Moment;
    public disabled = false;
    public showSpinners = true;
    public showSeconds = true;
    public touchUi = false;
    public enableMeridian = false;
    public minDate: (moment.Moment | Date);
    public maxDate: (moment.Moment | Date);
    public stepHour = 1;
    public stepMinute = 10;
    public stepSecond = 1;
    public color: ThemePalette = 'primary';

    public stepHours = [1, 2, 3, 4, 5];
    public stepMinutes = [1, 5, 10, 15, 20, 25];
    public stepSeconds = [1, 5, 10, 15, 20, 25];

    public formGroup = new FormGroup({
        date: new FormControl(null, [Validators.required]),
        date2: new FormControl(null, [Validators.required])
      })
      public dateControl = new FormControl(new Date());

    //

    constructor() { }

    ngOnInit(): void {
         this.inputDate = new Date();
        // this.inputTime = '00:00:00';
        // if (this.data !== undefined) {
        //     this.inputDate = this.data;
        // }
    }

    ngOnChanges() {
    }


    acceptDate(): void {
        this.inputTime =
            this.inputTime.length === 5
                ? this.inputTime + ':00'
                : this.inputTime === ''
                    ? '00:00:00'
                    : this.inputTime;
        const object: ITime = { date: this.inputDate, time: this.inputTime, close: true };
        this.dateTimePicker.emit(object);
    }

    test(){
        console.log('click');
        const object: ITime = { date: this.inputDate, time: '00:00:00', close: true };
        this.dateTimePicker.emit(object);
    }
}
