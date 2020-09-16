import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'evj-evj-event-filters',
    templateUrl: './evj-event-filters.component.html',
    styleUrls: ['./evj-event-filters.component.scss']
})
export class EvjEventFiltersComponent implements OnInit {

    public manufactureSelect: FormControl = new FormControl();

    searchControl: FormControl = new FormControl();

    @Output() search: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
        this.searchControl.valueChanges.subscribe(value => {
            this.search.emit(value);
        });
    }

    public onManufactureSelect(event: MatSelectChange): void {
        console.log(event);
    }

}
