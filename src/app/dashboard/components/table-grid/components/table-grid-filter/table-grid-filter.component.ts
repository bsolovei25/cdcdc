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

@Component({
    selector: 'evj-table-grid-filter',
    templateUrl: './table-grid-filter.component.html',
    styleUrls: ['./table-grid-filter.component.scss']
})

export class TableGridFilterComponent implements OnInit, OnChanges {

    @Output()
    public onFilterClick: EventEmitter<string> = new EventEmitter<string>();

    @Input()
    public filter: ITableGridFilter<IOilFilter>;

    public isPopoverOpened: boolean = false;

    constructor(
        private popoverOverlayService: PopoverOverlayService,
    ) {
    }

    public ngOnInit(): void {
    }

    public ngOnChanges(): void {
    }

    public onClick(type: string): void {
        // this.onFilterClick.emit(type);
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
            } as IOilFilterInput,
        });
        this.isPopoverOpened = true;

        popoverRef.afterClosed$.subscribe(res => {
            this.isPopoverOpened = false;
            if (res && res.data) {
            }
        });
    }
}
