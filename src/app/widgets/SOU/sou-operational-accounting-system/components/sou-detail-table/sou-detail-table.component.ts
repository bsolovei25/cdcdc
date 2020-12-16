import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ISOUIdent } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'evj-sou-detail-table',
    templateUrl: './sou-detail-table.component.html',
    styleUrls: ['./sou-detail-table.component.scss'],
})
export class SouDetailTableComponent implements OnInit {
    data: ISOUIdent[] = [];
    @Output() closeTable: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: ISOUIdent) {}

    ngOnInit(): void {}

    public buttonClick(): void {
        this.closeTable.emit();
    }
}
