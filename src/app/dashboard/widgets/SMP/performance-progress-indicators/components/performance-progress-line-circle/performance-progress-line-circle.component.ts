import { Component, OnInit } from '@angular/core';
import { IPerfProgCircle } from '../../performance-progress-indicators.component';


@Component({
  selector: 'evj-performance-progress-line-circle',
  templateUrl: './performance-progress-line-circle.component.html',
  styleUrls: ['./performance-progress-line-circle.component.scss']
})
export class PerformanceProgressLineCircleComponent implements OnInit {

  public data: IPerfProgCircle[] = [
    {
      id: 1,
      title: 'Выработка',
      value: 2343234,
      icon: 'production',
      gaugePercent: 60,
      piePercent: 50,
      isCritical: false,
      days: [
        {
          day: 1,
          state: 'normal',
        }
      ]
    },
    {
      id: 2,
      title: 'Паспортизация',
      value: 2343234,
      icon: 'passportization',
      gaugePercent: 60,
      piePercent: 50,
      isCritical: true,
      days: [
        {
          day: 1,
          state: 'normal',
        }
      ]
    },
    {
      id: 3,
      title: 'Отгрузка',
      value: 2343234,
      icon: 'shipment',
      gaugePercent: 60,
      piePercent: 30,
      isCritical: false,
      days: [
        {
          day: 1,
          state: 'normal',
        }
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
