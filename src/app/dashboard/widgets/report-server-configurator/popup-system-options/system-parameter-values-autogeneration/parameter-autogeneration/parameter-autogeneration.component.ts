import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-parameter-autogeneration',
  templateUrl: './parameter-autogeneration.component.html',
  styleUrls: ['./parameter-autogeneration.component.scss']
})
export class ParameterAutogenerationComponent implements OnInit {
  @Output() public close: EventEmitter<any> = new EventEmitter<any>();

  @Input() public data: any;

  public isRepInput: boolean = false;

  public dataParam: any = [
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
    {
      id: 2,
      name: "Параметр №2",
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

  datas: any = [];

  public saveData: any = [];

  constructor() { }

  ngOnInit(): void {
    this.datas = this.dataParam;
  }

  ngOnChanges(): void {
    if (this.data.length > 0) {
      this.saveData = this.data;
    }
  }

  itemOpen(item) {
    item.open = !item.open;
    for (let i of item.param) {
      for (let j of this.data) {
        if (i.id === j.id) {
          i.isActive = true;
        }
      }
    }
  }

  changeSwap(item) {
    item.isActive = !item.isActive;
  }

  exit(): void {
    const obj = {
      data: this.saveData,
      close: false,
    };
    this.close.emit(obj);
  }

  save(): void {
    let newParam = [];
    for (let item of this.dataParam) {
      for (let i of item.param) {
        if (i.isActive) {
          const obj = {
            id: i.id,
            name: i.name,
            value: i.value,
          };
          newParam.push(obj);
        }
      }
      item.param = newParam;
      newParam = [];
    }
    const objSend = {
      data: newParam,
      close: false,
    }
    this.close.emit(objSend);
  }

  search(event): void {
    if (event.key === "Backspace") {
      this.dataParam = this.datas;
    }
    const record = event.currentTarget.value.toLowerCase();
    const filterData = this.dataParam.filter(
      (e) =>
        e.mail.toLowerCase().indexOf(record.toLowerCase()) > -1

    );
    this.dataParam = filterData;
    if (!event.currentTarget.value) {
      this.dataParam = this.datas;
    }
  }
}
