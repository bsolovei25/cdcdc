import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IOilFilter } from 'src/app/dashboard/models/oil-operations';

@Component({
  selector: 'evj-oil-operations-filter',
  templateUrl: './oil-operations-filter.component.html',
  styleUrls: ['./oil-operations-filter.component.scss']
})
export class OilOperationsFilterComponent implements OnInit {
  @Input() public data: IOilFilter[];
  @Output() public closeFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public activeItemId: number;

  constructor() { }

  ngOnInit(): void {
  }

  active(item: IOilFilter): void {
    if (this.activeItemId === item.id) {
      this.activeItemId = null;
    } else {
      this.activeItemId = item.id;
    }
  }

  exit(): void {
    this.closeFilter.emit(false);
  }

  save(): void {
    this.closeFilter.emit(false);
  }

}
