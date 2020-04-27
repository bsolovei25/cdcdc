import { Component, OnInit, Input } from '@angular/core';
import { IOilShipment } from 'src/app/dashboard/models/oil-operations';

@Component({
  selector: 'evj-oil-operations-shipment-formation',
  templateUrl: './oil-operations-shipment-formation.component.html',
  styleUrls: ['./oil-operations-shipment-formation.component.scss']
})
export class OilOperationsShipmentFormationComponent implements OnInit {
  @Input() public data: IOilShipment[];

  constructor() { }

  ngOnInit(): void {
  }

}
