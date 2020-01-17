import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NewWidgetService } from 'src/app/dashboard/services/new-widget.service';
import { ManualInputService } from 'src/app/dashboard/services/manual-input.service';

@Component({
    selector: 'evj-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
    @Input() public data;
    @Input() public dataWidget;

    @Output() onCheck = new EventEmitter<boolean>();

    public checkClick: boolean = false;

    itemChoose: boolean = false;

    constructor(public widgetService: NewWidgetService) {
        if (this.data) {
            this.itemChoose = true;
        }
    }

    ngOnInit() {}

    searchRecords(e: any) {
        this.onCheck.emit(this.checkClick);
        let type = "input";
        this.widgetService.searchItems(e.currentTarget.value, type);
        if (!e.currentTarget.value) {
            this.widgetService.reEmitList();
        }
    }

    public openFilter(event: any) {
        if (event) {
            this.checkClick = !this.checkClick;
        }
        this.onCheck.emit(this.checkClick);
    }
}
