import { Component, OnInit, Input } from '@angular/core';
import { ITankCard } from '../../tank-information.component';

@Component({
  selector: 'evj-tank-card',
  templateUrl: './tank-card.component.html',
  styleUrls: ['./tank-card.component.scss']
})
export class TankCardComponent implements OnInit {
  @Input() public data: ITankCard;

  constructor() { }

  ngOnInit(): void {
  }

}
