import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'evj-evj-event-filters',
    templateUrl: './evj-event-filters.component.html',
    styleUrls: ['./evj-event-filters.component.scss']
})
export class EvjEventFiltersComponent implements OnInit {

    public manufactureSelect: FormControl = new FormControl();

    constructor() {
    }

    ngOnInit(): void {
    }

    public onManufactureSelect(event: MatSelectChange): void {
        console.log(event);
    }

}
