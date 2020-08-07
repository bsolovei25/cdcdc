import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'evj-sou-losses-table',
    templateUrl: './sou-losses-table.component.html',
    styleUrls: ['./sou-losses-table.component.scss']
})
export class SouLossesTableComponent implements OnInit {
    @Output() openTable: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public buttonClick(): void {
        this.openTable.emit();
    }

}
