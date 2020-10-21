import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgxMatDateFormats, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';

export const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'L | LTS'
  },
  display: {
    dateInput: 'L | LTS',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'evj-system-period-date',
  templateUrl: './system-period-date.component.html',
  styleUrls: ['./system-period-date.component.scss'],
  providers: [
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
  ]
})
export class SystemPeriodDateComponent implements OnInit {

  @ViewChild('picker') public picker: any;
  @Input() public timeCheck: string;
  @Output() public timeChoose: EventEmitter<any> = new EventEmitter<any>();

  public dateNow: Date = new Date();

  public timePicker: any

  constructor() { }

  ngOnInit(): void {
  }

  setValue(event): void {
    const obj = {
      dateFormat: this.timeCheck,
      value: event,
    };
    this.timeChoose.emit(obj);
  }

  clickTimePicker(): void {
    this.timePicker = this.picker._overlay._overlayContainer.getContainerElement();
    this.timePicker.classList.remove('year');
    this.timePicker.classList.remove('month');
  }

}
