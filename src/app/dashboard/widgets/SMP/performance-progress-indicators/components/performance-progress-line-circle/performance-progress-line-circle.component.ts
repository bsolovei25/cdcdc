import { Component, OnInit } from '@angular/core';

export interface IPerfProgCircle {
  id: number;
  title: string;
  value: number;
  icon: string;
  gaugePercent: number;
  piePercent: number;
  isCritical: boolean;
}

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
    },
    {
      id: 2,
      title: 'Паспортизация',
      value: 2343234,
      icon: 'passportization',
      gaugePercent: 60,
      piePercent: 50,
      isCritical: true,
    },
    {
      id: 3,
      title: 'Отгрузка',
      value: 2343234,
      icon: 'shipment',
      gaugePercent: 60,
      piePercent: 30,
      isCritical: false,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
