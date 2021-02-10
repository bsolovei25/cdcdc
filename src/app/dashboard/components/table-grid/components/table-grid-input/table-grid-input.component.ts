import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'evj-table-grid-input',
    templateUrl: './table-grid-input.component.html',
    styleUrls: ['./table-grid-input.component.scss'],
})
export class TableGridInputComponent implements OnInit {
    @Output() public search: EventEmitter<any> = new EventEmitter<any>();
    public isInput: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    searchRecord(event): void {
        this.search.emit(event);
    }
}
