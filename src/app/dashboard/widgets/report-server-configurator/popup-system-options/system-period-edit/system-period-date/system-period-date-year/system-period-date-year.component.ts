import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import * as _moment from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {  Moment } from 'moment';

const moment =  _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'evj-system-period-date-year',
  templateUrl: './system-period-date-year.component.html',
  styleUrls: ['./system-period-date-year.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class SystemPeriodDateYearComponent implements OnInit {
  @ViewChild('picker') public picker: any;

  @Output() public year: EventEmitter<number> = new EventEmitter<number>();

  public date = new FormControl(moment());

  constructor() { }

  ngOnInit(): void {
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    this.year.emit(ctrlValue);
    datepicker.close();
  }

  clickYear(): void {
    const dataPicker = this.picker._overlay._overlayContainer.getContainerElement();
    dataPicker.classList.remove('day');
    dataPicker.classList.remove('month');
    dataPicker.classList.remove('year');
    dataPicker.classList.add('year');
  }

}
