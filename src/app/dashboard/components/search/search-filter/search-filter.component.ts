import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Widgets } from 'src/app/dashboard/models/widget.model';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';

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

    constructor(public widgetService: NewWidgetService) {}

    ngOnInit() {}

    public choosenType(value, i) {
        for (let check of this.arrayClick) {
            if ((check = i)) {
                this.clicked = !this.clicked;
                this.arrayClick.splice(i, 1);
            }
            {
                this.arrayClick.push(i);
                this.clicked = !this.clicked;
            }
        }
        this.itemId = i;
        let type = 'filter';
        this.widgetService.searchItems(value, type);
        // this.onSearch.emit(type);
    }
}
