import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'evj-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit {
    @Input() public data;

    @Output() onFilter = new EventEmitter<boolean>();

    check: boolean;

    constructor() {}

    ngOnInit() {}

    public openFilter(event) {
        if (event) {
            this.check = !this.check;
        }
        this.onFilter.emit(this.check);
    }
}
