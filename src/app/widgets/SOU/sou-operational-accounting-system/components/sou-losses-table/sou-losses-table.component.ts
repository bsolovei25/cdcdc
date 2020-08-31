import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ISOULosses } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';

export interface ISouLossesTable {
    rows: {
        title: string;
        value: number;
        percentageValue: number;
        isButton?: boolean, // not for back
    }[];
}

@Component({
    selector: 'evj-sou-losses-table',
    templateUrl: './sou-losses-table.component.html',
    styleUrls: ['./sou-losses-table.component.scss']
})
export class SouLossesTableComponent implements OnInit, OnChanges {

    @Input() set losses(data: ISOULosses) {
        if (data) {
            // this.data = data;
        }
    }

    @Input() data: ISouLossesTable = {
        rows: [
            {
                title: 'Суммарные потери',
                value: 110800,
                percentageValue: 3
            },
            {
                title: 'Идентефицированные потери',
                value: 110800,
                percentageValue: 3
            },
            {
                title: 'Неидентифицированные потери',
                value: 110800,
                percentageValue: 3
            }
        ]
    };

    @Output() openTable: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit(): void {
        this.dataHandler();
    }

    ngOnChanges(): void {
        this.dataHandler();
    }

    private dataHandler(): void {
        // this.data.rows.find((row) => row.title === 'Идентефицированные потери').isButton = true;
    }

    public buttonClick(): void {
        this.openTable.emit();
    }

}
