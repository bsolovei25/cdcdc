import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { NGX_MAT_DATE_FORMATS, NgxMatDateFormats } from '@angular-material-components/datetime-picker';

export const CUSTOM_DATE_FORMAT: NgxMatDateFormats = {
    parse: {
        dateInput: 'L LT',
    },
    display: {
        dateInput: 'L LT',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

@Component({
    selector: 'evj-equipment-state-datetime-picker',
    templateUrl: './evj-equipment-state-datetime-picker.component.html',
    styleUrls: ['./evj-equipment-state-datetime-picker.component.scss'],
    providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMAT }],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentStateDatetimePickerComponent {
    @Input() dateValue: Date;
    @Input() isDisabled: boolean;

    @Output() dateTimePicker: EventEmitter<Date> = new EventEmitter();

    public inputDate: Date;
    public dateControl: FormControl = new FormControl({ value: new Date(), disabled: false });

    public buttonConfirm(date: Date): void {
        this.dateTimePicker.emit(moment(date).toDate());
    }
}

