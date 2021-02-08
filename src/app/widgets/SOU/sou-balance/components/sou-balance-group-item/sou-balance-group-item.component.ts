import { Component, Input, OnInit } from '@angular/core';
import { ISouBalanceProducts } from 'src/app/dashboard/models/SOU/sou-balance.model';

@Component({
    selector: 'evj-sou-balance-group-item',
    templateUrl: './sou-balance-group-item.component.html',
    styleUrls: ['./sou-balance-group-item.component.scss'],
})
export class SouBalanceGroupItemComponent implements OnInit {
    @Input() data: ISouBalanceProducts;
    @Input() menu: number;
    constructor() {}

    ngOnInit(): void {}
}
