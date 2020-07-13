import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { IReasonsDeviationsInfo } from 'src/app/dashboard/models/reasons-deviations';

@Component({
  selector: 'evj-reasons-deviations-info-content',
  templateUrl: './reasons-deviations-info-content.component.html',
  styleUrls: ['./reasons-deviations-info-content.component.scss'],
  providers: [{provide: LOCALE_ID, useValue: 'en-US' }]
})
export class ReasonsDeviationsInfoContentComponent implements OnInit {

  public data: IReasonsDeviationsInfo = {
    timeFrom: "02:03:04",
    timeTo: "04:08:34",
    shipped: {
      value: 23,
      percent: 20.754645,
    },
    dataShipped: {
      value: 23,
      percent: 20.113,
    },
    unbalance: {
      value: 23,
      percent: 20.2,
    },
    allowUnbalance: {
      value: 23,
      percent: 20,
    },
    deviation: {
      value: 23,
      percent: 20.32523,
    }
  };

  constructor() { }

  ngOnInit(): void {

  }

}
