import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    OnChanges
} from '@angular/core';
import {
    IOilFilterInput,
    OilOperationsFilterComponent
} from '../../../../widgets/oil-operations/components/oil-operations-filter/oil-operations-filter.component';
import { PopoverOverlayService } from '@shared/components/popover-overlay/popover-overlay.service';
import { IOilFilter } from '../../../../models/oil-operations';

export interface ITableGridFilter<T> {
    name: string;
    type: string;
    data?: T[];
}

export interface ITableGridActiveFilter {
    type: string;
    filter: IOilFilter;
}

@Component({
    selector: 'evj-table-grid-filter',
    templateUrl: './table-grid-filter.component.html',
    styleUrls: ['./table-grid-filter.component.scss']
})

export class TableGridFilterComponent implements OnInit, OnChanges {
    @Output()
    public filterSelect: EventEmitter<ITableGridActiveFilter> = new EventEmitter<ITableGridActiveFilter>();

    @Input()
    public filter: ITableGridFilter<IOilFilter>;

    public isPopoverOpened: boolean = false;

    public filterTitle: string;

    public activeFilter: IOilFilter;

    constructor(
        private popoverOverlayService: PopoverOverlayService,
    ) {
    }

    public ngOnInit(): void {
    }

    public ngOnChanges(): void {
        this.updateFilterTitle();
    }

    private updateFilterTitle(): void {
        this.filterTitle = this.activeFilter?.name ? this.activeFilter?.name : this.filter?.name;
    }

    public onClick(type: string): void {
        const element = document.getElementById(type);
        this.openPopover(element);
    }

    private openPopover(origin: HTMLElement): void {
        const popoverRef = this.popoverOverlayService.open({
            content: OilOperationsFilterComponent,
            origin,
            data: {
                title: this.filter.name,
                data: this.filter?.data,
                type: this.filter?.type,
                activeFilter: this.activeFilter,
            } as IOilFilterInput,
        });
        this.isPopoverOpened = true;

        popoverRef.afterClosed$.subscribe(res => {
            this.isPopoverOpened = false;
            if (res && res.data && res.type === 'close') {
                this.activeFilter = res.data.activeFilter;
                this.filterSelect.emit({
                    type: res.data.type,
                    filter: res.data.activeFilter,
                });
                this.updateFilterTitle();
            }
        });
    }
}
