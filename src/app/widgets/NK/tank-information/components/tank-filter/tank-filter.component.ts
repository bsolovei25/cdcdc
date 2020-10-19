import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ITankFilter, ITankFilterTanks, ITankResaultFilter } from 'src/app/dashboard/models/tank-information';

@Component({
  selector: 'evj-tank-filter',
  templateUrl: './tank-filter.component.html',
  styleUrls: ['./tank-filter.component.scss']
})
export class TankFilterComponent implements OnInit, OnChanges {
  @Input() public data: ITankFilter[];
  @Input() public filterData: ITankFilter[];
  @Output() public closeFilter: EventEmitter<ITankResaultFilter> = new EventEmitter<ITankResaultFilter>();

  type = {
    sug: 'СУГ',
    tsb: 'ТСБ',
    bitum: 'БИТУМЫ'
  };

  public dataParam: ITankFilter[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.dataMap(this.data);
  }

  dataMap(data: ITankFilter[]): void {
    this.dataParam = [];
    for (const item of data) {
      const arrayType = [];
      for (const i of item.tanks) {
        const obj = {
          name: i,
          active: true,
        };
        arrayType.push(obj);
      }
      const objType = {
        type: item.type,
        tanks: arrayType,
      };
      this.dataParam.push(objType);
    }
    if (this.filterData.length > 0) {
      this.useFilter(this.dataParam);
    }
  }

  useFilter(data: ITankFilter[]): void {
    for (const item of this.filterData) {
      const elem = data.find(el => item.type === el.type);
      if (!elem) { continue; }
      elem.open = item.open;
      for (const tankFilter of item.tanks) {
        for (const tankData of elem.tanks) {
          if (tankData.name === tankFilter.name) {
            tankData.active = tankFilter.active;
          }
        }
      }
    }
  }

  save(): void {
    const obj: ITankResaultFilter = {
      dataFilter: this.dataParam,
      filter: true,
      close: false,
    };
    this.closeFilter.emit(obj);
  }

  exit(): void {
    const obj: ITankResaultFilter = {
      dataFilter: this.dataParam,
      filter: false,
      close: false,
    };
    this.closeFilter.emit(obj);
  }

  itemOpen(item: ITankFilter): void {
    item.open = !item.open;
  }

  changeSwap(i: ITankFilterTanks): void {
    i.active = !i.active;
  }

}
