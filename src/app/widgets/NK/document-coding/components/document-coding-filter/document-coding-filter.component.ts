import { Component, OnInit, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { PopoverRef } from '@shared/components/popover-overlay/popover-overlay.ref';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AsyncRender } from '@shared/functions/async-render.function';

export interface IDocumentCodingFilterSection {
    id: number;
    name: string;
}

@Component({
    selector: 'evj-document-coding-filter',
    templateUrl: './document-coding-filter.component.html',
    styleUrls: ['./document-coding-filter.component.scss']
})
export class DocumentCodingFilterComponent implements OnInit, OnChanges, AfterViewInit {
    public filterTitle: string;

    public filterData: IDocumentCodingFilterSection[] = [];

    public activeItems: Map<number, IDocumentCodingFilterSection> = new Map();

    @ViewChild(CdkVirtualScrollViewport)
    public viewPort: CdkVirtualScrollViewport;

    constructor(
        private popoverRef: PopoverRef,
    ) {
        this.popoverRef.overlay.backdropClick().subscribe(() => {
            this.close();
        });
        if (this.popoverRef.data) {
            this.filterTitle = this.popoverRef.data.title;
            this.filterData = this.popoverRef.data.data;
            this.popoverRef.data.activeFilters?.forEach(filter => {
                this.activeItems.set(filter.id, filter);
            });
        }
    }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
    }

    public ngAfterViewInit(): void {
        this.scrollToActive();
    }

    @AsyncRender
    private scrollToActive(): void {
        if (this.activeItems.size > 0) {
            const selectedIndex = this.filterData.findIndex(elem => this.activeItems.has(elem.id));
            if (selectedIndex > -1) {
                this.viewPort.scrollToIndex(selectedIndex, 'auto' );
            }
        }
    }

    public changeSwap(item: IDocumentCodingFilterSection): void {
        this.activeItems.has(item.id) ? this.activeItems.delete(item.id) : this.activeItems.set(item.id, item);
    }

    public close(): void {
        this.popoverRef.close('backdropClick', {
            type: this.popoverRef.data.type,
        });
    }

    public onSaveClick(): void {
        this.popoverRef.close('close', {
            type: this.popoverRef.data.type,
            activeFilters: Array.from(this.activeItems.values()),
        });
    }
}
