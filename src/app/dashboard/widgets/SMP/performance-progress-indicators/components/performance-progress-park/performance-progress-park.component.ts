import { Component, OnInit } from '@angular/core';

export interface IPerfProgPark {
  capacity: number;
  balance: number;
  certified: number;
  planLevel: number;
  factLevel: number;
}

@Component({
  selector: 'evj-performance-progress-park',
  templateUrl: './performance-progress-park.component.html',
  styleUrls: ['./performance-progress-park.component.scss']
})
export class PerformanceProgressParkComponent implements OnInit {

  public data: IPerfProgPark = {
    capacity: 627920,
    balance: 150000,
    certified: 150000,
    planLevel: 60,
    factLevel: 20,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
