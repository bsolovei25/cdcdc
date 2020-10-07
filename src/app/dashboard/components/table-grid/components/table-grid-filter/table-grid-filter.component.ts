import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    OnChanges
} from '@angular/core';
import { OilOperationsFilterComponent } from '../../../../widgets/oil-operations/components/oil-operations-filter/oil-operations-filter.component';
import {PopoverOverlayService} from '@shared/components/popover-overlay/popover-overlay.service';

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

    constructor(
        private popoverOverlayService: PopoverOverlayService,
    ) {
    }

    public ngOnInit(): void {
    }

    public ngOnChanges(): void {
        this.isFilter = !!this.filter;
    }

    public onClick(type: string): void {
        this.isFilter = true;
        // this.onFilterClick.emit(type);
        const element = document.getElementById(type);
        this.openPopover(element);
    }

    private openPopover(origin): void {
        const popoverRef = this.popoverOverlayService.open({
            content: OilOperationsFilterComponent,
            origin,
            data: [
                {
                    id: 1,
                    name: 'Мазут'
                },
                {
                    id: 2,
                    name: 'Мазут'
                },
                {
                    id: 3,
                    name: 'Мазут'
                },
                {
                    id: 4,
                    name: 'Мазут'
                },
                {
                    id: 5,
                    name: 'Мазут'
                }
            ],
        });
        // this.isFilePopoverOpened = true;

        popoverRef.afterClosed$.subscribe(res => {
            // this.isFilePopoverOpened = false;
            if (res && res.data) {
            }
        });
    }
}
