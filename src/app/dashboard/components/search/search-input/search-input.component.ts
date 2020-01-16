import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';

@Component({
    selector: 'evj-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
    @Input() public data;
    @Input() public dataWidget;

    @Output() onCheck = new EventEmitter<boolean>();

    public checkClick = false;

    itemChoose = false;

    constructor(public widgetService: NewWidgetService) {
        if (this.data) {
            this.itemChoose = true;
        }
    }

    ngOnInit() {}
    searchItem() {
        this.widgetService.searchItems(this.dataWidget, this.data);
    }

    public checkInput(event) {
        if (event) {
            this.checkClick = !this.checkClick;
        }
        this.onCheck.emit(this.checkClick);
    }

    public searchRecords(e: any) {
        /*this.httpService.goToSearch(e.currentTarget.value);
    if (!e.currentTarget.value){
      this.httpService.reEmitList();*/
    }
}
