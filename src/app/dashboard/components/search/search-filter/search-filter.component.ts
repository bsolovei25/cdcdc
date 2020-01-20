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

        if(this.arrayClick.indexOf(i) !== -1){
            for(let check of this.arrayClick){
                if(check === i){
                    this.clicked = false;
                    this.arrayClick.splice(this.arrayClick.indexOf(i), 1);
                }
            }
        }else{
            this.arrayClick.push(i);
            this.clicked = true;
        }
        this.itemId = i;
        let type = 'filter';

        if(this.arrayClick.length === 0){
                    this.widgetService.reEmitList();
        }else{
                    this.widgetService.searchItems(value, type);
        }
        
        // this.onSearch.emit(type);
    }
}
