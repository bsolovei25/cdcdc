import { Component, OnInit, Inject } from '@angular/core';
import { IOilFilter } from 'src/app/dashboard/models/oil-operations';
import { PopoverRef } from '@shared/components/popover-overlay/popover-overlay.ref';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IOilFilterInput {
    title: string;
    type: string;
    activeFilter?: IOilFilter;
    data: IOilFilter[];
}

export interface IOilFilterOutput {
    type: string;
    activeFilter: IOilFilter;
}

@Component({
    selector: 'evj-oil-operations-filter',
    templateUrl: './oil-operations-filter.component.html',
    styleUrls: ['./oil-operations-filter.component.scss']
})
export class OilOperationsFilterComponent implements OnInit {
    public activeItem: IOilFilter = {
        id: null,
        name: null,
    };

    public filterTitle: string;

    constructor(
        private popoverRef: PopoverRef,
        @Inject(MAT_DIALOG_DATA) public data: IOilFilterInput,
    ) {
        this.popoverRef.overlay.backdropClick().subscribe(() => {
            this.close();
        });
        if (this.popoverRef.data) {
            this.data = this.popoverRef.data.data;
            this.filterTitle = this.popoverRef.data.title;
            this.activeItem = this.popoverRef.data.activeFilter ? this.popoverRef.data.activeFilter : this.activeItem;
        }
    }

    public ngOnInit(): void {
    }

    public onOptionSelect(item: IOilFilter): void {
        this.activeItem = this.activeItem?.id === item.id ? null : item;
    }

    public close(): void {
        this.popoverRef.close('backdropClick', null);
    }

    public onSaveClick(): void {
        this.popoverRef.close('close', {
            type: this.popoverRef.data.type.slice(0, -1),
            activeFilter: this.activeItem,
        } as IOilFilterOutput);
    }
}
