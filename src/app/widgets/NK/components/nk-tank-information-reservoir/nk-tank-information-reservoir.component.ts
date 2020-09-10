import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-reservoir',
  templateUrl: './nk-tank-information-reservoir.component.html',
  styleUrls: ['./nk-tank-information-reservoir.component.scss']
})
export class NkTankInformationReservoirComponent implements OnInit, OnChanges {
  @Input() volumeFillPercentage: number;
  @Input() status: string;

  fill: number;
  operation: object = {
    in: 'Заполнение',
    out: 'Отгрузка',
    inOut: 'Проток',
    hold: 'Отстой',
  };

  reservoirCustomization: number[] = [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.fill = this.volumeFillPercentage < 100
      ? this.volumeFillPercentage / 100
      : 1; // На случай если бак переполнен

    this.status = !!this.operation[this.status] ? this.operation[this.status] : 'Неизвестно';

    // console.log('статус ' + this.status);
    // console.log('cnfnec ', this.operation[this.status]);
  }
}
