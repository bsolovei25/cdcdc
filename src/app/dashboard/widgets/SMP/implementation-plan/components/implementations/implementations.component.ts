import { Component, OnInit, Input } from '@angular/core';
import { IImplementationPlan } from '../../implementation-plan.component';

@Component({
  selector: 'evj-implementations',
  templateUrl: './implementations.component.html',
  styleUrls: ['./implementations.component.scss']
})
export class ImplementationsComponent implements OnInit {
  @Input() data: IImplementationPlan;
  constructor() { }

  ngOnInit(): void {
  }

}
