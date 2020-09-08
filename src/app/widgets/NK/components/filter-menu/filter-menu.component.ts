import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evj-app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent implements OnInit {
  filterMenu: string[] =
    ['АИ-92', 'ДТ ЛЕТНЕЕ', 'ДТ ЗИМНЕЕ', 'ТС-1', 'АИ-95', 'МАЗУТ', 'ГАЗОЙЛЬ', 'НЕФТЬ'];
  selectedFilter: string = this.filterMenu[0];
  constructor() { }

  chooseFilter(e: { target: { innerText: string; }; }): void {
    this.selectedFilter = e.target.innerText;
  }

  ngOnInit(): void {
  }

}
