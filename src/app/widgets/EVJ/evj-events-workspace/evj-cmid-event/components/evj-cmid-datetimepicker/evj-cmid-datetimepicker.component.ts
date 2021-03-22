import {Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {FormControl} from '@angular/forms';
import {NGX_MAT_DATE_FORMATS, NgxMatDateFormats} from '@angular-material-components/datetime-picker';
import {combineLatest} from "rxjs";

export const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
    parse: {
        dateInput: 'L',
    },
    display: {
        dateInput: 'L',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'evj-cmid-datetimepicker',
    templateUrl: './evj-cmid-datetimepicker.component.html',
    styleUrls: ['./evj-cmid-datetimepicker.component.scss'],
    providers: [{provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS}],
})
export class EvjCmidDatetimepickerComponent implements OnInit, OnChanges {
    @Input()
    public date: string | Date;

    @Input()
    public disabled: boolean = false;

    @Input()
    public enableTime: boolean = true;

    @Output()
    public dateTimePicker: EventEmitter<Date> = new EventEmitter<Date>();

    public inputDate: Date;
    public inputTime: string;

    @ViewChild('picker') picker: any;

    public stepHour: number = 1;
    public stepMinute: number = 10;
    public stepSecond: number = 1;

    public stepHours: number[] = [1, 2, 3, 4, 5];
    public stepMinutes: number[] = [1, 5, 10, 15, 20, 25];
    public stepSeconds: number[] = [1, 5, 10, 15, 20, 25];

    public dateControlHidden: FormControl = new FormControl({value: new Date(), disabled: false});
    public dateControlDate: FormControl = new FormControl({value: '', disabled: false});
    public dateControlTime: FormControl = new FormControl({value: '', disabled: false});

    constructor() {
    }

    ngOnInit(): void {
        this.dateControlHidden.valueChanges.subscribe(value => {
            this.dateControlDate.setValue(moment(value).format('DD.MM.YYYY'));
            this.dateControlTime.setValue(moment(value).format('HH:mm'));
        })

        const dateSubs$ = this.dateControlDate.valueChanges;
        const timeSubs$ = this.dateControlTime.valueChanges;

        combineLatest([dateSubs$, timeSubs$]).subscribe(result => {
            const [day, month, year] = result[0].split('.');
            const [hour, minute] = result[1].split(':');
            this.inputDate = new Date(year, month - 1, day, hour, minute);
            this.inputTime = result[1];
            this.dateTimePicker.emit(this.inputDate);
        });
    }

    public ngOnChanges(): void {
        this.inputDate = new Date(this.date);
    }

    public openPicker(): void {
        this.picker.open();
    }
}
