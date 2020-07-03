import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { ITankInformation } from 'src/app/dashboard/models/tank-information';

@Component({
  selector: 'evj-tank-line',
  templateUrl: './tank-line.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./tank-line.component.scss']
})
export class TankLineComponent implements OnInit, OnChanges {
  @Input() public data: ITankInformation;

  public heightCard: number;
  public heightValue: number = 25;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    let maxValue: number;
    this.data.tank.forEach(e => {
      (maxValue > e.attributes.length) ? maxValue = maxValue : maxValue = e.attributes.length;
    });
    this.heightCard = maxValue * this.heightValue + 40;
  }

}
