import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-tank-filter',
  templateUrl: './tank-filter.component.html',
  styleUrls: ['./tank-filter.component.scss']
})
export class TankFilterComponent implements OnInit, OnChanges {
  @Input() public data;
  @Output() public close: EventEmitter<boolean> = new EventEmitter<boolean>();

  public dataParam: any = [
    {
      id: 1,
      name: 'ТСБ',
      tank: [
        {
          id: 1,
          name: "Бензины",
        },
        {
          id: 2,
          name: "Дизель",
        },
        {
          id: 3,
          name: "Мазут",
        },
        {
          id: 4,
          name: "Бензины",
        }
      ]
    },
    {
      id: 2,
      name: 'СУГ',
      tank: [
        {
          id: 1,
          name: "Дизель",
        },
        {
          id: 2,
          name: "Дизель",
        },
        {
          id: 3,
          name: "Мазут",
        },
        {
          id: 4,
          name: "Бензины",
        }
      ]
    },
    {
      id: 3,
      name: 'БИТУМЫ',
      tank: [
        {
          id: 1,
          name: "Бензины",
        },
        {
          id: 2,
          name: "Бензины",
        },
        {
          id: 3,
          name: "Мазут",
        },
        {
          id: 4,
          name: "Бензины",
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    for (let item of this.dataParam) {
      for (let i of item.tank) {
        for (let j of this.data) {
          if (i.name.toLocaleLowerCase() === j.name.toLocaleLowerCase()) {
            i.isActive = true;
          }
        }
      }
    }
  }

  save(): void {
    this.close.emit(false);
  }

  exit(): void {
    this.close.emit(false);
  }

  itemOpen(item): void {
    item.open = !item.open;
  }

  changeSwap(i): void {
    i.isActive = !i.isActive;
  }

}
