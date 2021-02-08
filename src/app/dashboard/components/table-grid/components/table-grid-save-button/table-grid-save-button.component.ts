import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'evj-table-grid-save-button',
    templateUrl: './table-grid-save-button.component.html',
    styleUrls: ['./table-grid-save-button.component.scss'],
})
export class TableGridSaveButtonComponent implements OnInit {
    @Output() clickSave: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit(): void {}

    onSave(): void {
        this.clickSave.emit(true);
    }
}
