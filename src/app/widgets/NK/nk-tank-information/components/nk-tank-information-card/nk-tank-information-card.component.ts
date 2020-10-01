import { ITankCardValue } from '../../../../../dashboard/models/tank-information';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'evj-nk-tank-information-card',
  templateUrl: './nk-tank-information-card.component.html',
  styleUrls: ['./nk-tank-information-card.component.scss']
})

export class NkTankInformationCardComponent implements OnInit, OnChanges {

  @Input() cardData: ITankCardValue;

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(): void {}

}
