import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    OnChanges
} from '@angular/core';

export interface ITableGridFilter {
    name: string;
    type: string;
}

@Component({
    selector: 'evj-table-grid-filter',
    templateUrl: './table-grid-filter.component.html',
    styleUrls: ['./table-grid-filter.component.scss']
})

export class TableGridFilterComponent implements OnInit, OnChanges {

    @Output()
    public onFilterClick: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    public filter: ITableGridFilter;

    public isFilter: boolean = false;

    constructor() {
    }

    public ngOnInit(): void {
    }

    public ngOnChanges(): void {
        this.isFilter = !!this.filter;
    }

    public onClick(type: string): void {
        this.isFilter = true;
        this.onFilterClick.emit(type);
    }
}
