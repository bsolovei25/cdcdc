import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'evj-table-grid-filter',
  templateUrl: './table-grid-filter.component.html',
  styleUrls: ['./table-grid-filter.component.scss']
})
export class TableGridFilterComponent implements OnInit, OnChanges {
  @Output() clickFilter: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() filter: boolean;

  public isFilter: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.isFilter = this.filter;
  }

  onFilter(): void {
    this.isFilter = true;
    this.clickFilter.emit(true);
  }

}
