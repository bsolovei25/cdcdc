import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Widgets } from 'src/app/dashboard/models/widget.model';

@Component({
    selector: 'evj-search-filter',
    templateUrl: './search-filter.component.html',
    styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit {
    @Input() public data;


    itemId: number;
    clicked: boolean;

    arrayClick = [];

    @Output() onSearch = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit() {}

    public choosenType(type, i) {
        this.arrayClick.push(i);
        this.clicked = true;
        this.itemId = i;
        this.onSearch.emit(type);
    }
}
