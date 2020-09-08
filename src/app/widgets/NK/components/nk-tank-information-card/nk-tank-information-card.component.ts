import { ICard } from './../../../../dashboard/models/NK/nk-tank-information.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-card',
  templateUrl: './nk-tank-information-card.component.html',
  styleUrls: ['./nk-tank-information-card.component.scss']
})

export class NkTankInformationCardComponent implements OnInit {

  @Input() cardData: ICard;

  constructor() { }

  ngOnInit(): void {
  }

}
