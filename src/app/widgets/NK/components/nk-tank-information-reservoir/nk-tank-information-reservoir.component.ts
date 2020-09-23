import { newArray } from '@angular/compiler/src/util';
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

  reservoirCustomization: number[] = new Array(14);

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.fill = this.volumeFillPercentage < 100
      ? this.volumeFillPercentage / 100
      : 1; // На случай если бак переполнен

    this.status = !!this.operation[this.status] ? this.operation[this.status] : 'Неизвестно';
  }
}
