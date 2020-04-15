import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'evj-system-period-edit',
  templateUrl: './system-period-edit.component.html',
  styleUrls: ['./system-period-edit.component.scss']
})
export class SystemPeriodEditComponent implements OnInit {
  @Output() public result: EventEmitter<any> = new EventEmitter<any>();

  data: any = [
    {
      name: 'Годичный',
      isActive: false,
    },
    {
      name: 'Месячный',
      isActive: false,
    },
    {
      name: 'Суточный',
      isActive: false,
    },
    {
      name: 'Произвольное время',
      isActive: false,
    },
    {
      name: 'Точное время',
      isActive: false,
    },
    {
      name: 'Произвольная дата',
      isActive: false,
    },
    {
      name: 'Без запроса времени',
      isActive: false,
    },
    {
      name: 'Свой вариант',
      isActive: false,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    const obj = {
      close: false,
      type: 'periodEdit',
    }
    this.result.emit(obj);
  }

  save() {
    const obj = {
      close: true,
      type: 'periodEdit',
    }
    this.result.emit(obj);
  }

  changeSwap(item){
    item.isActive = !item.isActive;
  }

}
