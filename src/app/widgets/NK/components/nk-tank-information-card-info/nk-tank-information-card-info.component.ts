import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-card-info',
  templateUrl: './nk-tank-information-card-info.component.html',
  styleUrls: ['./nk-tank-information-card-info.component.scss']
})
export class NkTankInformationCardInfoComponent implements OnInit, OnChanges {

  @Input() set volumeMax(data: number) {
    this.nominal = data > 0 ? data : 0;
  }
  @Input() set volumeCurrent(data: number) {
    this.current = data > 0 ? data : 0;
  }
  @Input() set volumeFillPercentage(data: number) {
    // this.fill = data < 100
    // ? data
    // : 100; // На случай если бак переполнен
  }

  activeIndicatorCount: number;
  nominal: number;
  current: number;
  freeSpace: number;
  fill: number;

  volumeCustomization: number[] = new Array(6);

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.freeSpace = (this.nominal - this.current) > 0
      ? (this.nominal - this.current)
      : 0;

    this.fill = this.current / this.nominal * 100;

    this.activeIndicatorCount =
      Math.round(this.fill * this.volumeCustomization.length) / 100;
  }

}
