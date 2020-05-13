import { Component, OnInit, Input, AfterViewInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ITankCardValue } from 'src/app/dashboard/models/tank-information';

@Component({
  selector: 'evj-tank-card',
  templateUrl: './tank-card.component.html',
  styleUrls: ['./tank-card.component.scss']
})
export class TankCardComponent implements OnInit, AfterViewInit {
  @Input() public data: ITankCardValue;
  @Input() public idLine: ITankCardValue;

  operation = {
    filling: "Заполнение",
    shipment: "Отгрузка",
    standart: "Без изменений",
    unknown: 'Неизвестно',
    in: 'Налив',
    out: 'Слив',
    repair: 'Ремонт',
    hold: 'Отстой',
    inOut: 'Проток',
    work: 'В работе'
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.changeTooltip();
  }

  changeTooltip(): void {
    const tlink = document.getElementById('tooltip' + this.data.tankTitle + this.idLine);
    if (tlink) {
      tlink.dataset.tooltip = this.operation[this.data?.objectStatus];
    }
  }
}
