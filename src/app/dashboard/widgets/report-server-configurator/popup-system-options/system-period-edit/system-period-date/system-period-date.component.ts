import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'evj-system-period-date',
  templateUrl: './system-period-date.component.html',
  styleUrls: ['./system-period-date.component.scss']
})
export class SystemPeriodDateComponent implements OnInit {
  @ViewChild('picker') public picker: any;
  @Input() public timeCheck: string;

  public dateNow: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
