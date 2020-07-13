import { Component, OnInit } from '@angular/core';
import { IReasonsTankerCard } from 'src/app/dashboard/models/reasons-deviations';

@Component({
  selector: 'evj-reasons-deviations-tank-level',
  templateUrl: './reasons-deviations-tank-level.component.html',
  styleUrls: ['./reasons-deviations-tank-level.component.scss']
})
export class ReasonsDeviationsTankLevelComponent implements OnInit {

  public data: IReasonsTankerCard = {
    name: "Резервуар №514",
    percent: 45,
    shipped: 1400,
    capacity: 2720,
    valueLevel: 720,
    type: "Бензин АИ-92-К2",
  }

  public textLevel: number;

  constructor() { }

  ngOnInit(): void {
    (this.data.percent > 70) ? this.textLevel = 50 :
    (this.data.percent < 20) ? this.textLevel = 20 :
    this.textLevel = this.data.percent - 5;
  }

}
