import { Component, Input, OnInit } from '@angular/core';
import { ISouBalance } from 'src/app/dashboard/models/SOU/sou-balance.model';

@Component({
  selector: 'evj-sou-balance-group',
  templateUrl: './sou-balance-group.component.html',
  styleUrls: ['./sou-balance-group.component.scss']
})
export class SouBalanceGroupComponent implements OnInit {
  @Input() data: ISouBalance;
  @Input() menu: number;

  constructor() { }

  ngOnInit(): void {
  }

}
