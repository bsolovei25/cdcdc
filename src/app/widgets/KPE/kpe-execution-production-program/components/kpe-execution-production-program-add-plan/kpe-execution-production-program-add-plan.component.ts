import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'evj-kpe-execution-production-program-add-plan',
  templateUrl: './kpe-execution-production-program-add-plan.component.html',
  styleUrls: ['./kpe-execution-production-program-add-plan.component.scss']
})
export class KpeExecutionProductionProgramAddPlanComponent implements OnInit {
  public dateControl: FormControl = new FormControl({value: new Date(), disabled: false});
  month: string[] = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
  choosenMonth: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  public next():void {
    this.choosenMonth = this.choosenMonth === 11 ? 0 : this.choosenMonth + 1;
  }

  public prev():void {
    this.choosenMonth = this.choosenMonth === 0 ? 11 : this.choosenMonth - 1;
  }
}
