import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-table-grid-filter',
  templateUrl: './table-grid-filter.component.html',
  styleUrls: ['./table-grid-filter.component.scss']
})
export class TableGridFilterComponent implements OnInit {
  @Output() clickFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isFilter: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onFilter(): void {
    this.clickFilter.emit(true);
  }

}
