import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evj-period-selector',
  templateUrl: './period-selector.component.html',
  styleUrls: ['./period-selector.component.scss']
})
export class PeriodSelectorComponent implements OnInit {

  public toDate: Date;
  public fromDate: Date;
  public isCurrent: boolean;

  constructor() {
    this.setDefault();
  }

  ngOnInit() {
  }

  setDefault() {
    let defaultTime = new Date();
    defaultTime = new Date(defaultTime.getFullYear(), defaultTime.getMonth(), defaultTime.getDate(), 0, 0, 0);
    this.toDate = defaultTime;
    this.fromDate = defaultTime;

    this.isCurrent = true;
  }

  setDefaultTime(event, datetime) {
    let defaultTime = new Date();
    defaultTime = new Date(defaultTime.getFullYear(), defaultTime.getMonth(), defaultTime.getDate(), 0, 0, 0);
    if(datetime === 1) {
      if (event) {
        this.toDate = event;
      } else {
        this.toDate = defaultTime;
      }
    } else {
      if (event) {
        this.fromDate = event;
      } else {
        this.fromDate = defaultTime;
      }
    }
  }

  isCurrentChange(value: boolean) {
    this.isCurrent = value;
  }

}
