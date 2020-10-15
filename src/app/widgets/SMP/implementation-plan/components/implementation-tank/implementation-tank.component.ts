import { IImplementationPlan } from './../../../../../dashboard/models/SMP/implementation-plan.model';
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'evj-implementation-tank',
  templateUrl: './implementation-tank.component.html',
  styleUrls: ['./implementation-tank.component.scss']
})
export class ImplementationTankComponent implements OnInit {
  @Input() set data(data: IImplementationPlan) {
    (data.restPer < 0) ? this.planTankLevel = 0 : (data.restPer > 100) ? this.planTankLevel = 100 : this.planTankLevel = data.restPer;
    (data.freePer < 0) ? this.factTankLevel = 0 : (data.freePer > 100) ? this.factTankLevel = 100 : this.factTankLevel = data.freePer;
    this.title = data.title;
  }

  planTankLevel: number;
  factTankLevel: number;
  title: string;

  constructor() { }

  ngOnInit(): void {
  }
}
