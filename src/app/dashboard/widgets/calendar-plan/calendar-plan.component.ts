import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evj-calendar-plan',
  templateUrl: './calendar-plan.component.html',
  styleUrls: ['./calendar-plan.component.scss']
})
export class CalendarPlanComponent implements OnInit {

  array = [
    {
      name: 'Бензины',
      deviation: -0.4,
      isBetter: false
    },
    {
      name: 'Керосины',
      deviation: +11,
      isBetter: true
    },
    {
      name: 'Дизели',
      deviation: +6,
      isBetter: true
    },
    {
      name: 'Судовое топливо',
      deviation: -0.4,
      isBetter: true
    },
    {
      name: 'Битумы',
      deviation: -0.4,
      isBetter: true
    },
    {
      name: 'Мазуты',
      deviation: -0.4,
      isBetter: true
    },

  ]

  constructor() { }

  ngOnInit() {
  }

}
