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

    @Output() search: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    @Output() check: EventEmitter<boolean> = new EventEmitter<boolean>();

    public checkClick: boolean = false;

    itemChoose: boolean = false;
    valueInput: string = '';

    constructor(public widgetService: WidgetService) {
        if (this.data) {
            this.itemChoose = true;
        }
    }

    searchInput(event: KeyboardEvent): void {
        this.search.emit(event);
    }

    public openFilter(event: any): void {
        if (event) {
            this.checkClick = !this.checkClick;
        }
        this.check.emit(this.checkClick);
    }
}
