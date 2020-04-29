import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { IOilShipment } from 'src/app/dashboard/models/oil-operations';

@Component({
  selector: 'evj-oil-operations-shipment-formation',
  templateUrl: './oil-operations-shipment-formation.component.html',
  styleUrls: ['./oil-operations-shipment-formation.component.scss']
})
export class OilOperationsShipmentFormationComponent implements OnInit, OnChanges {
  @Output() public openItem: EventEmitter<any> = new EventEmitter<any>();
  @Input() public isOpen: boolean;
  @Input() public data: IOilShipment[];
  public activeItemId: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.isOpen) {
      this.activeItemId = null;
    }
  }

  active(item: IOilShipment): void {
    this.activeItemId = item.id;
    this.openItem.emit(item.type);
  }

}
