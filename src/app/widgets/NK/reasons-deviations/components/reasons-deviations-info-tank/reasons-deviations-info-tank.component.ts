import { Component, OnInit } from '@angular/core';
import { IReasonsTankers } from 'src/app/dashboard/models/LCO/reasons-deviations';

@Component({
  selector: 'evj-reasons-deviations-info-tank',
  templateUrl: './reasons-deviations-info-tank.component.html',
  styleUrls: ['./reasons-deviations-info-tank.component.scss']
})
export class ReasonsDeviationsInfoTankComponent implements OnInit {

  public dataTankers: IReasonsTankers[] = [
    {
      id: 1,
      type: "Tug",
      value: '1 532'
    },
    {
      id: 2,
      type: "Tube",
      value: '2 342'
    },
    {
      id: 3,
      type: "Cistern",
      value: '212'
    },
    {
      id: 4,
      type: "Work",
      value: '147'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
