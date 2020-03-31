import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';

@Component({
    selector: 'evj-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
    @Input() public data;
    @Input() public dataWidget;
    @Input() isReport: boolean = false;

    @Output() searchReport = new EventEmitter<KeyboardEvent>();

    @Output() onCheck = new EventEmitter<boolean>();

    public checkClick: boolean = false;

    itemChoose: boolean = false;
    valueInput: string = '';

    constructor(public widgetService: WidgetService) {
        if (this.data) {
            this.itemChoose = true;
        }
    }

    ngOnInit() { }

    searchRecords(e: any) {
        this.onCheck.emit(this.checkClick);
        let type = 'input';
        this.widgetService.searchItems(e.currentTarget.value, type);
        if (!e.currentTarget.value) {
            this.widgetService.reEmitList();
        }
    }

    searchReports(event: KeyboardEvent) {
        this.searchReport.emit(event);
    }

    public openFilter(event: any) {
        if (event) {
            this.checkClick = !this.checkClick;
        }
        this.onCheck.emit(this.checkClick);
    }
}
