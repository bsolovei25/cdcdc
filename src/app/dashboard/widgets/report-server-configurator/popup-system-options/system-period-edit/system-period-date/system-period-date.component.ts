import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-system-period-date',
  templateUrl: './system-period-date.component.html',
  styleUrls: ['./system-period-date.component.scss']
})
export class SystemPeriodDateComponent implements OnInit {
  @ViewChild('picker') public picker: any;
  @Input() public timeCheck: string;
  @Output() public timeChoose: EventEmitter<any> = new EventEmitter<any>();

  public dateNow: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  setValue(event){
    const obj = {
      dateFormat: this.timeCheck,
      value: event,
    };
    this.timeChoose.emit(obj);
  }

}
