import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'evj-oil-operations-manual-assign',
  templateUrl: './oil-operations-manual-assign.component.html',
  styleUrls: ['./oil-operations-manual-assign.component.scss']
})
export class OilOperationsManualAssignComponent implements OnInit {
  @Input() public data: any;
  @Output() public closeFree: EventEmitter<boolean> = new EventEmitter<boolean>();

  public dataFree: any;

  public activeItemId: number;

  constructor() { }

  public ngOnInit(): void {
  }

  close(): void {
    this.closeFree.emit(false);
  }

  save(): void {
    this.closeFree.emit(false);
  }
}
