import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ITankCard, ITankInformation, ITankFilter, ITankFilterTanks } from 'src/app/dashboard/models/tank-information';

@Component({
  selector: 'evj-tank-filter',
  templateUrl: './tank-filter.component.html',
  styleUrls: ['./tank-filter.component.scss']
})
export class TankFilterComponent implements OnInit, OnChanges {
  @Input() public data: ITankInformation[];
  @Output() public close: EventEmitter<boolean> = new EventEmitter<boolean>();

  public dataParam: ITankFilter[] = [
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
    for (const item of this.dataParam) {
      for (const i of item.tank) {
        for (const j of this.data) {
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

  itemOpen(item: ITankFilterTanks): void {
    item.open = !item.open;
  }

  changeSwap(i: ITankFilterTanks): void {
    i.isActive = !i.isActive;
  }

}
