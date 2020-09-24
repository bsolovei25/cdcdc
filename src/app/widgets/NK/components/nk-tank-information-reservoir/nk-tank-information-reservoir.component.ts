import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-reservoir',
  templateUrl: './nk-tank-information-reservoir.component.html',
  styleUrls: ['./nk-tank-information-reservoir.component.scss']
})
export class NkTankInformationReservoirComponent implements OnInit, OnChanges {
  @Input() set volumeFillPercentage(data: number) {
    this.fill = data < 100
      ? data / 100
      : 1; // На случай если бак переполнен
  }
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
    this.status = !!this.operation[this.status] ? this.operation[this.status] : 'Неизвестно';
  }
}
