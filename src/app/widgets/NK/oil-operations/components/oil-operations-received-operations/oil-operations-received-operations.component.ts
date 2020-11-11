import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IOilRowActions } from 'src/app/dashboard/models/oil-operations';

@Component({
  selector: 'evj-oil-operations-received-operations',
  templateUrl: './oil-operations-received-operations.component.html',
  styleUrls: ['./oil-operations-received-operations.component.scss']
})
export class OilOperationsReceivedOperationsComponent implements OnInit, OnChanges {
  @Input() public data: IOilRowActions[];
  @Input() public isOpen: boolean;
  @Output() public openItem: EventEmitter<string> = new EventEmitter<string>();

  public activeItemId: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.isOpen) {
      this.activeItemId = null;
    }
  }

  active(item: IOilRowActions): void {
    this.activeItemId = item.id;
    this.openItem.emit(item.type);
  }

}
