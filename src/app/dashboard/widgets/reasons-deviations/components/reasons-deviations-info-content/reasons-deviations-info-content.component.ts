import { Component, OnInit } from '@angular/core';
import { IReasonsDeviationsInfo } from 'src/app/dashboard/models/reasons-deviations';

@Component({
  selector: 'evj-reasons-deviations-info-content',
  templateUrl: './reasons-deviations-info-content.component.html',
  styleUrls: ['./reasons-deviations-info-content.component.scss']
})
export class ReasonsDeviationsInfoContentComponent implements OnInit {

  public data: IReasonsDeviationsInfo = {
    timeFrom: "02:03:04",
    timeTo: "04:08:34",
    shipped: {
      value: 23,
      percent: 20,
    },
    dataShipped: {
      value: 23,
      percent: 20,
    },
    unbalance: {
      value: 23,
      percent: 20,
    },
    allowUnbalance: {
      value: 23,
      percent: 20,
    },
    deviation: {
      value: 23,
      percent: 20,
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
