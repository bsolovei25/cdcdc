import { IVolume } from './../../../../dashboard/models/NK/nk-tank-information.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-reservoir',
  templateUrl: './nk-tank-information-reservoir.component.html',
  styleUrls: ['./nk-tank-information-reservoir.component.scss']
})
export class NkTankInformationReservoirComponent implements OnInit, OnChanges {
  @Input() volume: IVolume;
  @Input() isFilling: boolean;

  reservoirCustomization: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }
}
