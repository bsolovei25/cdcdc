import { Component, Input, EventEmitter, Output } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-search-filter',
    templateUrl: './search-filter.component.html',
    styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent {
    @Input() public data: string;

    @Output() filter: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    selectedFilters: SelectionModel<string> = new SelectionModel<string>(true);

    constructor(public widgetService: WidgetService) {}

    public choosenType(item: string): void {
        this.selectedFilters.isSelected(item)
            ? this.selectedFilters.deselect(item)
            : this.selectedFilters.select(item);

        this.widgetService.filterWidgets$.next(this.selectedFilters.selected);
    }
}
