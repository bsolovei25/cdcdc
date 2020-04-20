import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ITankCard } from '../../tank-information.component';

@Component({
  selector: 'evj-tank-card',
  templateUrl: './tank-card.component.html',
  styleUrls: ['./tank-card.component.scss']
})
export class TankCardComponent implements OnInit, AfterViewInit {
  @Input() public data: ITankCard;
  @Input() public idLine: ITankCard;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.changeTooltip();
  }

  changeTooltip(): void {
    const tlink = document.getElementById('tooltip' + this.data.id + this.idLine);
    tlink.dataset.tooltip = this.data.operation;
  }

}
