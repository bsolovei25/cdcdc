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

  constructor() { }

  ngOnInit(): void {
    console.log('test');
  }

  itemOpen(item: IOilFilterTanks): void {
    item.open = !item.open;
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
