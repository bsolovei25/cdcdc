import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IPerfProgPark } from '../performance-progress-park/performance-progress-park.component';

@Component({
  selector: 'evj-performance-progress-bar',
  templateUrl: './performance-progress-bar.component.html',
  styleUrls: ['./performance-progress-bar.component.scss']
})
export class PerformanceProgressBarComponent implements OnInit, OnChanges {
  @Input() public data: IPerfProgPark;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.mapLevel();
  }

  mapLevel(): void {
    if (this.data.planLevel > 100) {
      this.data.planLevel = 100;
    } else if (this.data.planLevel < 0) {
      this.data.planLevel = 0;
    }

    if (this.data.factLevel > 100) {
      this.data.factLevel = 100;
    } else if (this.data.factLevel < 0) {
      this.data.factLevel = 0;
    }

    this.data.factLevel = this.percent(this.data.factLevel);
    this.data.planLevel = this.percent(this.data.planLevel);
  }

  percent(value: number): number {
    const levelBakPercent = 85;
    return (levelBakPercent * value) / 100;
  }

}
