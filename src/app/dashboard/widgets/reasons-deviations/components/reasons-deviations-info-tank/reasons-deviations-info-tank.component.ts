import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evj-reasons-deviations-info-tank',
  templateUrl: './reasons-deviations-info-tank.component.html',
  styleUrls: ['./reasons-deviations-info-tank.component.scss']
})
export class ReasonsDeviationsInfoTankComponent implements OnInit {

  public dataTankers: any = [
    {
      id: 1,
      type: "Tug",
      value: 1532
    },
    {
      id: 2,
      type: "Tube",
      value: 2342
    },
    {
      id: 3,
      type: "Cistern",
      value: 212
    },
    {
      id: 4,
      type: "Cistern",
      value: 147
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
