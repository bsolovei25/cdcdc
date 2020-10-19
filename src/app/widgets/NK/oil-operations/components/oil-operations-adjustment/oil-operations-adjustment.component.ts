import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'evj-oil-operations-adjustment',
  templateUrl: './oil-operations-adjustment.component.html',
  styleUrls: ['./oil-operations-adjustment.component.scss']
})
export class OilOperationsAdjustmentComponent implements OnInit {
  @Input() public data: any;
  @Output() public closeAdjust: EventEmitter<boolean> = new EventEmitter<boolean>();

  public isActive: string;

  constructor() { }

  ngOnInit(): void {
  }

  active(item: string): void {
    if (this.isActive === item) {
      this.isActive = null;
    } else {
      this.isActive = item;
    }
  }

  exit(): void {
    this.closeAdjust.emit(false);
  }

  save(): void {
    this.closeAdjust.emit(false);
  }

}
