import { Component, OnInit, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { PopoverOverlayService } from '@shared/components/popover-overlay/popover-overlay.service';
import { DocumentCodingFilterComponent } from '../document-coding-filter/document-coding-filter.component';
import { DocumentCodingService } from '../../../../../dashboard/services/oil-control-services/document-coding.service';
import { IDocumentsLaboratory } from '../../../../../dashboard/models/oil-document.model';
import { IOilFilter, IOilOperationsProduct } from '../../../../../dashboard/models/oil-operations';
import { ITableGridFilter } from '../../../../../dashboard/components/table-grid/components/table-grid-filter/table-grid-filter.component';

export type IDocumentCodingFilterType = 'groups' | 'laboratories';

@Component({
    selector: 'evj-document-coding-table',
    templateUrl: './document-coding-table.component.html',
    styleUrls: ['./document-coding-table.component.scss'],
})
export class DocumentCodingTableComponent implements OnInit {
    @Output()
    public selectedProduct: EventEmitter<IOilOperationsProduct | null> = new EventEmitter<IOilOperationsProduct | null>();

    public isFilterGroup: boolean = false;

    public isFilterLab: boolean = false;

    public filterTitle: string;

    public activeRecordId: number;

    public isPopoverOpened: Map<IDocumentCodingFilterType, boolean> = new Map();

    public activeFilters: Map<IDocumentCodingFilterType, IOilFilter[]> = new Map();

    public filters: ITableGridFilter<IOilFilter, IDocumentCodingFilterType>[] = [
        {
            name: 'Лаборатория',
            type: 'laboratories',
            data: [],
        },
        {
            name: 'Группы продуктов',
            type: 'groups',
            data: [],
        },
    ];

    public data: IOilOperationsProduct[] = [];

    constructor(
        private popoverOverlayService: PopoverOverlayService,
        private documentCodingService: DocumentCodingService
    ) {}

    ngOnInit(): void {
        this.setStyleScroll();
        this.getFilterList('laboratories');
        this.getFilterList('groups');
        this.getProductList();
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.setStyleScroll();
    }

    setStyleScroll(): void {
        const scroll = document.getElementById('scrollDocCodingTable');
        if (scroll) {
            if (scroll.scrollHeight !== scroll.clientHeight) {
                scroll.classList.remove('scrollON');
                scroll.classList.add('scrollOFF');
            } else {
                scroll.classList.remove('scrollOFF');
                scroll.classList.add('scrollON');
            }
        }
    }

    public onClick(product: IOilOperationsProduct): void {
        this.activeRecordId = product.id === this.activeRecordId ? null : product.id;
        this.selectedProduct.emit(this.activeRecordId ? product : null);
    }

    private async getFilterList(filter: 'laboratories' | 'groups'): Promise<void> {
        const values = await this.documentCodingService.getFilterList<IDocumentsLaboratory>(filter);
        this.filters.forEach((availableFilter) => {
            if (availableFilter.type === filter) {
                availableFilter.data = values;
            }
        });
    }

    private async getProductList(): Promise<void> {
        const labs = this.getActiveFilterArrayByType('laboratories');
        const groups = this.getActiveFilterArrayByType('groups');
        this.data = await this.documentCodingService.getProductListByFilter<IOilOperationsProduct>(labs, groups);
    }

    public openFilter(filter: ITableGridFilter<IOilFilter, IDocumentCodingFilterType>): void {
        const element = document.getElementById(filter.type + '-doc-coding');
        this.openPopover(element, filter);
    }

    private openPopover(origin: HTMLElement, filter: ITableGridFilter<IOilFilter, IDocumentCodingFilterType>): void {
        const popoverRef = this.popoverOverlayService.open({
            content: DocumentCodingFilterComponent,
            origin,
            data: {
                title: filter.name,
                data: filter.data,
                type: filter.type,
                activeFilters: this.getActiveFilterArrayByType(filter.type),
            },
        });
        this.isPopoverOpened.set(filter.type, true);
        if (filter.type === 'laboratories') {
            this.isFilterLab = true;
        }
        if (filter.type === 'groups') {
            this.isFilterGroup = true;
        }

        popoverRef.afterClosed$.subscribe((res) => {
            console.log(res);
            this.isPopoverOpened.set(res?.data?.type, false);
            if (res && res.data && res.type === 'close') {
                this.activeFilters.set(res?.data?.type, res.data.activeFilters);
                this.getProductList();
            }
        });
    }

    public getFilterCountData(type: IDocumentCodingFilterType): number {
        return this.activeFilters.get(type)?.length;
    }

    private getActiveFilterArrayByType(type: IDocumentCodingFilterType): IOilFilter[] {
        return this.activeFilters.has(type) ? Array.from(this.activeFilters.get(type).values()) : [];
    }
}
