import { Component, OnInit, Input } from '@angular/core';
import { IOilShipment } from 'src/app/dashboard/models/oil-operations';

@Component({
  selector: 'evj-oil-operations-shipment-formation',
  templateUrl: './oil-operations-shipment-formation.component.html',
  styleUrls: ['./oil-operations-shipment-formation.component.scss']
})
export class OilOperationsShipmentFormationComponent implements OnInit {
  @Input() public data: IOilShipment[];
  public activeItemId: number;

  constructor() { }

  ngOnInit(): void {
  }

  active(item: IOilShipment): void {
    (this.activeItemId === item.id) ? this.activeItemId = null : this.activeItemId = item.id;
  }

}
