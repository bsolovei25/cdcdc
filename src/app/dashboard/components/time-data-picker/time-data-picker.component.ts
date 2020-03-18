import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITime } from '../../models/time-data-picker';

@Component({
    selector: 'evj-time-data-picker',
    templateUrl: './time-data-picker.component.html',
    styleUrls: ['./time-data-picker.component.scss'],
})
export class TimeDataPickerComponent implements OnInit {
    @Input() data: Date;
    @Output() dateTimePicker = new EventEmitter<ITime>();

    public inputDate: Date;
    public inputTime: string;

    constructor() {}

    ngOnInit(): void {
        this.inputDate = new Date();
        this.inputDate = this.data;
    }

    acceptDate(): void {
        this.inputTime === '' ? '00:00:00' : this.inputTime;
        const object: ITime = { date: this.inputDate, time: this.inputTime, close: true };
        this.dateTimePicker.emit(object);
    }
}
