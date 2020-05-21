import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';

@Component({
    selector: 'evj-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
    @Input() public data;
    @Input() isReport: boolean = false;

    @Output() searchReport: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    @Output() check: EventEmitter<boolean> = new EventEmitter<boolean>();

    public checkClick: boolean = false;

    itemChoose: boolean = false;
    valueInput: string = '';

    constructor(public widgetService: WidgetService) {
        if (this.data) {
            this.itemChoose = true;
        }
    }

    searchRecords(e: KeyboardEvent): void {
        console.log((e?.target as HTMLInputElement)?.value.toLowerCase());
        // this.check.emit(this.checkClick);
        // let type = 'input';
        // this.widgetService.searchItems(e.currentTarget.value, type);
        // if (!e.currentTarget.value) {
        //     this.widgetService.reEmitList();
        // }

        this.widgetService.inputWidgets$.next((e?.target as HTMLInputElement)?.value.toLowerCase());
    }

    searchReports(event: KeyboardEvent): void {
        this.searchReport.emit(event);
    }

    public openFilter(event: any): void {
        if (event) {
            this.checkClick = !this.checkClick;
        }
        this.check.emit(this.checkClick);
    }
}
