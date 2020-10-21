import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'evj-system-parameter-values-autogeneration',
  templateUrl: './system-parameter-values-autogeneration.component.html',
  styleUrls: ['./system-parameter-values-autogeneration.component.scss']
})
export class SystemParameterValuesAutogenerationComponent implements OnInit {
  @Output() public result: EventEmitter<any> = new EventEmitter<any>();

  public data: any = [
    {
      id: 1,
      name: "Новый набор значений",
      param: [
        {
          id: 1,
          name: 'Значение',
          value: "Смена 1",
        },
        {
          id: 2,
          name: 'Значение по умолчанию',
          value: "Смена 2",
        },
      ]
    },
    {
      id: 2,
      name: "Параметр №2",
      param: [
        {
          id: 3,
          name: 'Имя',
          value: "Смена 3",
        },
        {
          id: 4,
          name: 'Обязательный',
          value: "Нет",
        },
      ]
    },

  ];

  public dataSend: any = [];

  public userBlock: boolean = false;
  public itemChooseId: number;

  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    const obj = {
      close: false,
      type: 'parameterValuesAutogeneration',
    }
    this.result.emit(obj);
  }

  save(): void {
    const obj = {
      close: true,
      type: 'parameterValuesAutogeneration',
    };
    this.result.emit(obj);
  }

  blockItem(item) {

  }

  deleteItem(item) {

  }

  itemOpen(item) {
    item.open = !item.open;
  }

  onClickItem(item): void {
    this.itemChooseId = item.id;
  }

  openUserBlock(): void {
    if (this.itemChooseId) {
      this.userBlock = true;
      this.dataSend = this.data.find(e => e.id === this.itemChooseId).param;
    }
  }

  closeUserBlock(event): void {
    this.data.find(e => e.id === this.itemChooseId).param = event.data;
    this.userBlock = event.close;
  }

}
