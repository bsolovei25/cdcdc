import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';

@Component({
    selector: 'evj-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
    public isVisibleFilter: boolean = false;

    @Input() isReport: boolean = false;

    @Output() search: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
    @Output() visibleFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private widgetService: WidgetService) {}

    searchInput(event: KeyboardEvent): void {
        this.search.emit(event);
    }

    public openFilter(): void {
        this.isVisibleFilter = !this.isVisibleFilter;
        if (!this.isVisibleFilter) {
            this.widgetService.filterWidgets$.next([]);
        }
        this.visibleFilter.emit(this.isVisibleFilter);
    }
}
