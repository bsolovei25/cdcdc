import { Component, OnInit, Input } from '@angular/core';
import { IPerfProgPark } from '../../performance-progress-indicators.component';

@Component({
  selector: 'evj-performance-progress-park',
  templateUrl: './performance-progress-park.component.html',
  styleUrls: ['./performance-progress-park.component.scss']
})
export class PerformanceProgressParkComponent implements OnInit {
  @Input() title: string;

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
