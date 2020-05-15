import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ITankCardValue } from 'src/app/dashboard/models/tank-information';
import { TooltipService } from '@shared/components/tooltip/service/tooltip.service';

@Component({
  selector: 'evj-tank-card',
  templateUrl: './tank-card.component.html',
  styleUrls: ['./tank-card.component.scss']
})
export class TankCardComponent implements OnInit {
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

  constructor(private tooltipService: TooltipService) { }

  ngOnInit(): void {
    this.tooltipService.close();
  }

}
