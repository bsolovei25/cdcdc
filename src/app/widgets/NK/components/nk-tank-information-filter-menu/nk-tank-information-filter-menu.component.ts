import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-filter-menu',
  templateUrl: './nk-tank-information-filter-menu.component.html',
  styleUrls: ['./nk-tank-information-filter-menu.component.scss']
})
export class NkTankInformationFilterMenuComponent implements OnInit, OnChanges {
  @Input() filterList: string[];
  @Output() onFilter: EventEmitter<string> = new EventEmitter<string>();
  selectedFilter: string = 'Все резервуары';
  constructor() { }

  chooseFilter(e: { target: { innerText: string; }; }): void {
    this.selectedFilter = e.target.innerText;
    this.onFilter.emit(this.selectedFilter);
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    // console.log('Массив Фильтров '  + this.filterList);
  }

}
