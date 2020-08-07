import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'evj-sou-detail-table',
    templateUrl: './sou-detail-table.component.html',
    styleUrls: ['./sou-detail-table.component.scss']
})
export class SouDetailTableComponent implements OnInit {
    @Output() closeTable: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public buttonClick(): void {
        this.closeTable.emit();
    }
}
