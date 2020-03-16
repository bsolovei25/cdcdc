import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'evj-time-data-picker',
    templateUrl: './time-data-picker.component.html',
    styleUrls: ['./time-data-picker.component.scss'],
})
export class TimeDataPickerComponent implements OnInit {
    @Input() data: Date;
    @Output() dateTimePicker = new EventEmitter<ITime>();

    public inputDate: Date = new Date();
    public inputTime: Date = new Date();

    constructor() {}

    ngOnInit(): void {
        this.inputDate = this.data;
    }

    acceptDate(): void {
        const object: ITime = { date: this.inputDate, time: this.inputTime, close: true };
        this.dateTimePicker.emit(object);
    }
}
