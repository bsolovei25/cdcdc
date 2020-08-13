import { Component, Input, OnChanges, OnInit } from '@angular/core';

export interface ISouProductionTable {
    rows: {
        title: string;
        sumValue: ISouProductionTableValue;
        perHourValue: ISouProductionTableValue;
    }[];
}

interface ISouProductionTableValue {
    value: number;
    percentageValue: number;
}

@Component({
    selector: 'evj-sou-production-table',
    templateUrl: './sou-production-table.component.html',
    styleUrls: ['./sou-production-table.component.scss']
})
export class SouProductionTableComponent implements OnInit {

    @Input() data: ISouProductionTable = {
        rows: [
            {
                title: 'Бензин',
                perHourValue: {
                    value: 5400,
                    percentageValue: 86,
                },
                sumValue: {
                    value: 55400,
                    percentageValue: 85,
                }
            },
            {
                title: 'ТС-1',
                perHourValue: {
                    value: 5400,
                    percentageValue: 86,
                },
                sumValue: {
                    value: 55400,
                    percentageValue: 85,
                }
            },
            {
                title: 'ДТЛ',
                perHourValue: {
                    value: 5400,
                    percentageValue: 86,
                },
                sumValue: {
                    value: 55400,
                    percentageValue: 85,
                }
            },
            {
                title: 'Всего светлых',
                perHourValue: {
                    value: 5400,
                    percentageValue: 86,
                },
                sumValue: {
                    value: 55400,
                    percentageValue: 85,
                }
            },
        ],
    };

    constructor() {
    }

    ngOnInit(): void {
    }
}
