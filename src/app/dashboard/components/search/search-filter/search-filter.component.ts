import { Component, Input } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-search-filter',
    templateUrl: './search-filter.component.html',
    styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent {
    @Input() public data;
    @Input() public arrayClick;

    itemId: number;
    clicked: boolean = false;

    public massFilter = [];

    selectedFilters: SelectionModel<string> = new SelectionModel<string>(true);

    constructor(public widgetService: WidgetService) {}

    public choosenType(item: string): void {
        this.selectedFilters.isSelected(item)
            ? this.selectedFilters.deselect(item)
            : this.selectedFilters.select(item);

        this.widgetService.filterWidgets$.next(this.selectedFilters.selected);
        // let type = 'filter';
        // this.itemId = i;
        // if (this.arrayClick.indexOf(i) !== -1) {
        //     for (let check of this.arrayClick) {
        //         if (check === i) {
        //             this.arrayClick.splice(this.arrayClick.indexOf(i), 1);
        //             this.massFilter.splice(this.massFilter.indexOf(value), 1);
        //             this.widgetService.searchItems(this.massFilter, type);
        //         }
        //     }
        // } else {
        //     this.massFilter.push(value);
        //     this.arrayClick.push(i);
        //     this.clicked = true;
        //     this.widgetService.searchItems(this.massFilter, type);
        // }

        // if (this.arrayClick.length === 0) {
        //     this.widgetService.reEmitList();
        //     this.widgetService.searchItems('', 'input');
        // }

        // this.onFilterMass.emit(this.arrayClick);

        // this.onSearch.emit(type);
    }
}
