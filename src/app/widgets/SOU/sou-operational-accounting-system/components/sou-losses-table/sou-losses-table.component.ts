import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ISOULosses } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';

export interface ISouLossesTable {
    rows: {
        title: string;
        value: number;
        percentageValue: number;
        isButton?: boolean; // not for back
    }[];
}

@Component({
    selector: 'evj-sou-losses-table',
    templateUrl: './sou-losses-table.component.html',
    styleUrls: ['./sou-losses-table.component.scss'],
})
export class SouLossesTableComponent implements OnInit, OnChanges {
    @Input() set losses(data: ISOULosses) {
        if (data) {
            this.data = data;
        }
    }
    @Input() data: ISOULosses;

    @Output() openTable: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit(): void {
        this.dataHandler();
    }

    ngOnChanges(): void {
        this.dataHandler();
    }

    private dataHandler(): void {
        this.data?.lossesType.map((row) => {
            if (row?.name === 'Идентефицированные потери') {
                row.isButton = true;
            }
        });
    }

    public buttonClick(): void {
        this.openTable.emit();
    }
}
