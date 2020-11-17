import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { IOilRowActions } from 'src/app/dashboard/models/oil-operations';

@Component({
  selector: 'evj-oil-operations-shipment-formation',
  templateUrl: './oil-operations-shipment-formation.component.html',
  styleUrls: ['./oil-operations-shipment-formation.component.scss']
})
export class OilOperationsShipmentFormationComponent implements OnInit, OnChanges {
  @Output() public openItem: EventEmitter<string> = new EventEmitter<string>();
  @Input() public isOpen: boolean;
  @Input() public data: IOilRowActions[];
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
