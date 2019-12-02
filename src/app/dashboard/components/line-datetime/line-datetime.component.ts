import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evj-line-datetime',
  templateUrl: './line-datetime.component.html',
  styleUrls: ['./line-datetime.component.scss']
})
export class LineDatetimeComponent implements OnInit {

  public currentData;
  public dates = [];

  constructor() {
    setInterval(() => {
      this.currentData = Date.now();
    }, 1000);
  }



  ngOnInit() {
    this.datesFill();
  }

  datesFill() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const daysCount = new Date(year, month, 0).getDate();
    for (let i = 0; i < daysCount; i++) {
      let active: boolean = false;
      let last: boolean = false;
      let future: boolean = false;
      if (i === day - 1) {
        active = true;
      } else if (i < day - 1) {
        last = true;
      } else {
        future = true;
      }
      const el = {
        day: i + 1,
        isActive: active,
        isLast: last,
        isFuture: future
      };
      this.dates.push(el);
    }
  }

}
