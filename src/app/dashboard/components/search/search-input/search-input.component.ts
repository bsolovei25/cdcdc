import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'evj-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnChanges {
    public isVisibleFilter: boolean = false;

    @Input() isReport: boolean = false;

    @Input()
    public panelActive: boolean = false;

    @Output() search: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
    @Output() visibleFilter: EventEmitter<boolean> = new EventEmitter<boolean>();

    public searchInputField: FormControl = new FormControl('');

    constructor(private widgetService: WidgetService) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (!changes.panelActive.currentValue) {
            this.closePanel();
        }
    }

    public searchInput(): void {
        this.search.emit(this.searchInputField.value);
    }

    public resetSearchInput(): void {
        this.searchInputField.setValue('');
        this.search.emit(this.searchInputField.value);
    }

    public toggleFilter(): void {
        this.isVisibleFilter = !this.isVisibleFilter;
        if (!this.isVisibleFilter) {
            this.widgetService.filterWidgets$.next([]);
        }
        this.visibleFilter.emit(this.isVisibleFilter);
    }

    private closePanel(): void {
        this.closeFilter();
        this.resetSearchInput();
    }

    private closeFilter(): void {
        this.isVisibleFilter = false;
        this.visibleFilter.emit(this.isVisibleFilter);
    }
}
