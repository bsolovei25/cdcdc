import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ISOUProduct } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';

@Component({
    selector: 'evj-sou-production-table',
    templateUrl: './sou-production-table.component.html',
    styleUrls: ['./sou-production-table.component.scss']
})
export class SouProductionTableComponent implements OnInit {

    @Input() set products(data: ISOUProduct[]) {
        if (data) {
            this.data = data;
            this.getValuePercent(data);
        }
    }

    data: ISOUProduct[];

    constructor() {
    }

    ngOnInit(): void {
    }

    getValuePercent(data: ISOUProduct[]): void {
        let sumValueByHourPercent: number = 0;
        let sumValueTankPercent: number = 0;
        data.forEach(item => {
            sumValueByHourPercent += item.valueByHour;
            sumValueTankPercent += item.valueTank;
        });
        data.map(item => {
            item.percentByHour = +(item?.valueByHour / sumValueByHourPercent * 100).toFixed();
            item.percentTank = +(item?.valueTank / sumValueTankPercent * 100).toFixed();
        });
    }


}
