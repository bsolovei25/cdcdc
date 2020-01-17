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
    clicked: boolean = false;

    arrayClick = [];

    @Output() onSearch = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit() {}

    public choosenType(type, i) {
        for(let check of this.arrayClick){
            if(check = i){
                this.clicked = !this.clicked;
                this.arrayClick.splice(i,1);
            }
            {
                this.arrayClick.push(i);
                this.clicked = !this.clicked;
            }
        }
        this.itemId = i;
        this.onSearch.emit(type);
    }
}
