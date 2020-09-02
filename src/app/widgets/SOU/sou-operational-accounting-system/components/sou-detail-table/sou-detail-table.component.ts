import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISOUIdent } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';

@Component({
    selector: 'evj-sou-detail-table',
    templateUrl: './sou-detail-table.component.html',
    styleUrls: ['./sou-detail-table.component.scss']
})
export class SouDetailTableComponent implements OnInit {

    @Input() data: ISOUIdent[];

    @Output() closeTable: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public buttonClick(): void {
        this.closeTable.emit();
    }
}
