import { Component, Input, OnChanges, OnInit } from '@angular/core';

export type SouBalanceCardType = 'in' | 'out' | 'delta' | 'balance';

export interface ISouBalanceCard {
    title: string;
    type: SouBalanceCardType;
    sumValue: number;
    percentageValue?: number;
    perHourValue?: number;
    deviation?: boolean;
}

@Component({
    selector: 'evj-sou-balance-card',
    templateUrl: './sou-balance-card.component.html',
    styleUrls: ['./sou-balance-card.component.scss'],
})
export class SouBalanceCardComponent implements OnInit {
    @Input() data: ISouBalanceCard = null;

    constructor() {}

    ngOnInit(): void {}
}
