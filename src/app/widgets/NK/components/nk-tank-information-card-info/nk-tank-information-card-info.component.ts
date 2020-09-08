import { IVolume } from './../../../../dashboard/models/NK/nk-tank-information.model';
import { SpaceNumber } from '@shared/pipes/number-space.pipe';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-card-info',
  templateUrl: './nk-tank-information-card-info.component.html',
  styleUrls: ['./nk-tank-information-card-info.component.scss']
})
export class NkTankInformationCardInfoComponent implements OnInit, OnChanges {

  @Input() volume: IVolume;
  activeIndicatorCount: number;

  nominal: string;
  fill: string;
  freeSpace: string;

  volumeCustomization: number[] = [1, 2, 3, 4, 5, 6];

  constructor(private spacePipe: SpaceNumber) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.nominal = this.spacePipe.transform(this.volume.nominal);
    this.fill = this.spacePipe.transform(this.volume.fill);
    this.freeSpace = this.spacePipe.transform(this.volume.freeSpace);

    this.activeIndicatorCount =
      Math.round(this.volume.fill / this.volume.nominal * this.volumeCustomization.length);
  }

}
