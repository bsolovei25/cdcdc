import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'evj-nk-tank-information-filter-menu',
    templateUrl: './nk-tank-information-filter-menu.component.html',
    styleUrls: ['./nk-tank-information-filter-menu.component.scss'],
})
export class NkTankInformationFilterMenuComponent implements OnInit, OnChanges {
    @Input() filterList: string[];
    @Input() selectedFilter: string;
    @Output() onFilter: EventEmitter<string> = new EventEmitter<string>();

    selected: string = 'Все резервуары';
    constructor() {}

    chooseFilter(e: { target: { innerText: string } }): void {
        this.selected = e.target.innerText;
        this.onFilter.emit(this.selected);
    }

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.selected = this.selectedFilter;
    }
}
