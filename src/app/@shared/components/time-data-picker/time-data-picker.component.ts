import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import {
    NGX_MAT_DATE_FORMATS,
    NgxMatDateFormats,
} from '@angular-material-components/datetime-picker';

export const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
    parse: {
        dateInput: 'L | LTS',
    },
    display: {
        dateInput: 'L | LTS',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'evj-time-data-picker',
    templateUrl: './time-data-picker.component.html',
    styleUrls: ['./time-data-picker.component.scss'],
    providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }],
})
export class TimeDataPickerComponent implements OnInit, OnChanges {
    @Input() data: any;
    @Input() public disabled: boolean = false;
    @Output() dateTimePicker: EventEmitter<Date> = new EventEmitter<Date>();

    public inputDate: any;
    public inputTime: string;

    @ViewChild('picker') picker: any;

    public showSpinners: boolean = true;
    public showSeconds: boolean = true;
    public touchUi: boolean = false;
    public enableMeridian: boolean = false;
    public stepHour: number = 1;
    public stepMinute: number = 10;
    public stepSecond: number = 1;
    public color: ThemePalette = 'primary';

    public stepHours: number[] = [1, 2, 3, 4, 5];
    public stepMinutes: number[] = [1, 5, 10, 15, 20, 25];
    public stepSeconds: number[] = [1, 5, 10, 15, 20, 25];

    public dateControl: FormControl = new FormControl(new Date());

    constructor() {}

    ngOnInit(): void {}

    public ngOnChanges(): void {
        this.inputDate = new Date(this.data);
        this.dateControl = new FormControl(this.inputDate);
    }

    public buttonConfirm(date: any): void {
        this.dateTimePicker.emit(moment(date).toDate());
    }
}
