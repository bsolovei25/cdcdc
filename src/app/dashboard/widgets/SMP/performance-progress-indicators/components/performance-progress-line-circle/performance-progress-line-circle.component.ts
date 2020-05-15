import { Component, OnInit, Input } from '@angular/core';
import { IPerfProgCircle, IPerfProgPark } from '../../performance-progress-indicators.component';


@Component({
  selector: 'evj-performance-progress-line-circle',
  templateUrl: './performance-progress-line-circle.component.html',
  styleUrls: ['./performance-progress-line-circle.component.scss']
})
export class PerformanceProgressLineCircleComponent implements OnInit {
  @Input() public data: IPerfProgCircle[];

  constructor() { }

  ngOnInit(): void {
  }

}
