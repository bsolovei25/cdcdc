import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ISouIdent } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'evj-sou-detail-table',
    templateUrl: './sou-detail-table.component.html',
    styleUrls: ['./sou-detail-table.component.scss'],
})
export class SouDetailTableComponent implements OnInit {
    @Input() data: ISouIdent[] = [];
    @Output() closeTable: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: ISouIdent[]) {}

    ngOnInit(): void {
        this.classDefining(this.dataDialog);
    }

    public buttonClick(): void {
        this.closeTable.emit();
    }

    private classDefining(data: ISouIdent[]): void {
        data.forEach((x, i, arr) => {
            x.className = '';
            if (x.isHighlighted) {
                const isTop = arr[i - 1]?.isHighlighted;
                const isBottom = arr[i + 1]?.isHighlighted;
                x.className =
                    'row__active ' + (!isTop ? 'row__active-top ' : '') + (!isBottom ? 'row__active-bottom' : '');
            }
            console.log(x.className);
        });
    }
}
