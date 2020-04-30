import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IOilFilterTanks, IOilValuesTank } from 'src/app/dashboard/models/oil-operations';

@Component({
  selector: 'evj-oil-operations-tank-filter',
  templateUrl: './oil-operations-tank-filter.component.html',
  styleUrls: ['./oil-operations-tank-filter.component.scss']
})
export class OilOperationsTankFilterComponent implements OnInit {
  @Input() public data: IOilFilterTanks[];
  @Output() public closeFilterTank: EventEmitter<boolean> = new EventEmitter<boolean>();

  public activeItemId: number;

  constructor() { }

  ngOnInit(): void {

  }

  itemOpen(item: IOilFilterTanks): void {
    item.open = !item.open;
  }

  active(item: IOilValuesTank): void {
    this.activeItemId = item.id;
  }

  close(): void {
    this.closeFilterTank.emit(false);
  }

  save(): void {
    this.closeFilterTank.emit(false);
  }

  changeSwap(item: IOilValuesTank): void {

  }

}
