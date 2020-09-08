import { ITemperature } from './../../../../dashboard/models/NK/nk-tank-information.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-temperature',
  templateUrl: './nk-tank-information-temperature.component.html',
  styleUrls: ['./nk-tank-information-temperature.component.scss']
})
export class NkTankInformationTemperatureComponent implements OnInit {
  @Input() temperature: ITemperature;
  constructor() { }

  ngOnInit(): void {
  }

}
