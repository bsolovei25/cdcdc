import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface IFilterSetting {
    isUp: boolean;
    isDown: boolean;
    text: string;
}

@Component({
    selector: 'evj-filter-popup',
    templateUrl: './filter-popup.component.html',
    styleUrls: ['./filter-popup.component.scss'],
})
export class FilterPopupComponent {
    @Input() filterSetting: IFilterSetting;
    @Input() isSearch: boolean;
    @Output() public sortFilter: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public sortText: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    public setSort(isUp: boolean): void {
        if ((isUp && this.filterSetting?.isUp) || (!isUp && this.filterSetting?.isDown)) {
            this.sortFilter.emit(null);
        } else {
            this.sortFilter.emit(isUp);
        }
    }

    public setText(event: string): void {
        this.sortText.emit(event);
    }
}
