import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evj-reasons-deviations-tank-level',
  templateUrl: './reasons-deviations-tank-level.component.html',
  styleUrls: ['./reasons-deviations-tank-level.component.scss']
})
export class ReasonsDeviationsTankLevelComponent implements OnInit {

  data = {
    name: "Резервуар №514",
    percent: 40,
    shipped: 1400,
    capacity: 2720,
    valueLevel: 520,
    type: "Бензин АИ-92-К2",
  }

  constructor() { }

  ngOnInit(): void {
  }

}
