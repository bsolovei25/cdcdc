import { SpaceNumber } from '@shared/pipes/number-space.pipe';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-card-info',
  templateUrl: './nk-tank-information-card-info.component.html',
  styleUrls: ['./nk-tank-information-card-info.component.scss']
})
export class NkTankInformationCardInfoComponent implements OnInit, OnChanges {

  @Input() volumeMax: number = 0;
  @Input() volumeCurrent: number = 0;
  @Input() volumeFillPercentage: number = 0;

  activeIndicatorCount: number;

  freeSpace: string;
  fill: number;

  volumeCustomization: number[] = new Array(6);

  constructor(private spacePipe: SpaceNumber) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.volumeMax = this.volumeMax > 0 ? this.volumeMax : 0;
    this.volumeCurrent = this.volumeCurrent > 0 ? this.volumeCurrent : 0;

    this.fill = this.volumeFillPercentage < 100
      ? this.volumeFillPercentage
      : 100; // На случай если бак переполнен

    this.freeSpace = (this.volumeMax - this.volumeCurrent) > 0
      ? this.spacePipe.transform(this.volumeMax - this.volumeCurrent, 3)
      : '0';

    this.activeIndicatorCount =
      Math.round(this.fill * this.volumeCustomization.length) / 100;
  }

}
