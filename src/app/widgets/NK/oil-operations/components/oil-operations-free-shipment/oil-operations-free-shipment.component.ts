import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'evj-oil-operations-free-shipment',
  templateUrl: './oil-operations-free-shipment.component.html',
  styleUrls: ['./oil-operations-free-shipment.component.scss']
})
export class OilOperationsFreeShipmentComponent implements OnInit {
  @Input() public data: any;
  @Output() public closeFree: EventEmitter<boolean> = new EventEmitter<boolean>();

  public dataFree: any =
    {
      titleInfo: {
        name: "Количество свободных отгрузок",
        dateFrom: "20.03.2020",
        dateTo: "24.03.2020",
        value: 2352
      },
      content: [
        {
          id: 1,
          name: 'Газ сжижженный пропан-бутан авто. (ПБА)',
          value: 28.52,
          points: [
            {
              id: 1,
              pasport: 10,
              rR: null,
              mass: 1.52,
              point: 'Газовые весы для темных НП',
            },
            {
              id: 2,
              pasport: 10,
              rR: null,
              mass: 1.52,
              point: 'Газовые весы для темных НП',
            },
            {
              id: 3,
              pasport: 10,
              rR: null,
              mass: 1.52,
              point: 'Газовые весы для темных НП',
            },
          ]
        },
        {
          id: 2,
          name: 'Газ сжижженный пропан-бутан авто. (ПБА)',
          value: 28.52,
          points: [
            {
              id: 1,
              pasport: 10,
              rR: null,
              mass: 1.52,
              point: 'Газовые весы для темных НП',
            },
            {
              id: 2,
              pasport: 10,
              rR: null,
              mass: 1.52,
              point: 'Газовые весы для темных НП',
            },
            {
              id: 3,
              pasport: 10,
              rR: null,
              mass: 1.52,
              point: 'Газовые весы для темных НП',
            },
          ]
        }
      ]
    };


  public activeItemId: number;

  constructor() { }

  ngOnInit(): void {

  }

  itemOpen(item): void {
    item.open = !item.open;
  }

  active(item): void {
    this.activeItemId = item.id;
  }

  close(): void {
    this.closeFree.emit(false);
  }

  save(): void {
    this.closeFree.emit(false);
  }

  changeSwap(item): void {

  }
}
