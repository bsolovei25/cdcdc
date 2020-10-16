import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-temperature',
  templateUrl: './nk-tank-information-temperature.component.html',
  styleUrls: ['./nk-tank-information-temperature.component.scss']
})
export class NkTankInformationTemperatureComponent implements OnInit, OnChanges {
  @Input() temperature: number;
  @Input() maxTemperature: number;
  @Input() isRepair: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {}
}
