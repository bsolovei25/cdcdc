import { IVolume } from './../../interfaces/interfaces';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'evj-app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit, OnChanges {

  @Input() volume: IVolume;
  activeIndicatorCount: number;

  volumeCustomization: number[] = [1, 2, 3, 4, 5, 6];

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.activeIndicatorCount =
      Math.round(this.volume.fill / this.volume.nominal * this.volumeCustomization.length);
  }

}
