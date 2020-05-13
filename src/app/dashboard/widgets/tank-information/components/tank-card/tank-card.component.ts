import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ITankCard } from 'src/app/dashboard/models/tank-information';

@Component({
  selector: 'evj-tank-card',
  templateUrl: './tank-card.component.html',
  styleUrls: ['./tank-card.component.scss']
})
export class TankCardComponent implements OnInit, AfterViewInit {
  @Input() public data: ITankCard;
  @Input() public idLine: ITankCard;

  operation = {
    filling: "Заполнение",
    shipment: "Отгрузка",
    standart: "Без изменений",
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.changeTooltip();
  }

  changeTooltip(): void {
    const tlink = document.getElementById('tooltip' + this.data.id + this.idLine);
    // tlink.dataset.tooltip = this.operation[this.data.operation];
  }

}
