import { Component, OnInit, Inject, HostListener, OnDestroy } from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { ITableGridFilter } from '../../../dashboard/components/table-grid/components/table-grid-filter/table-grid-filter.component';
import { IOilFilter } from '../../../dashboard/models/oil-operations';
import { OilOperationsService } from '../../../dashboard/services/widgets/oil-operations.service';
import { DocumentsScansService } from '../../../dashboard/services/oil-control-services/documents-scans.service';

export interface IQualityDocsRecord {
    id: number;
    name: string;
    fileUid: string;
    tank: {
        id: number;
        name: string;
        shortName: string;
        enabled: boolean;
        limitHours: number;
        group: {
            id: number;
            name: string;
        }
    };
    product: {
        id: number;
        name: string;
        sapCode: string;
        gost: string;
        okpd2Code: string;
        group: {
            id: number;
            name: string;
        }
    };
    customId: number;
    date: Date;
    armName: string;
    isBlocked: boolean;
    user: {
        id: number;
        name: string;
        positionName: string;
    };
}

@Component({
    selector: 'evj-quality-docs-panel',
    templateUrl: './quality-docs-panel.component.html',
    styleUrls: ['./quality-docs-panel.component.scss']
})
export class QualityDocsPanelComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

    public filterByProduct: ITableGridFilter<IOilFilter> =
        {
            name: 'Продукты',
            type: 'products-document-panel',
            data: [],
        };

    public filterByProductValue: any;

    public data: IQualityDocsRecord[] = [];

    public isFilter: boolean = false;

    public isTanksInput: boolean = false;
    public isPasportInput: boolean = false;
    public isProductInput: boolean = false;

    constructor(
        public widgetService: WidgetService,
        private oilOperationService: OilOperationsService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        public oilDocumentService: DocumentsScansService,
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
        this.widgetIcon = 'reference';
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.getFilterList();
    }

    protected dataHandler(ref: any): void {
        // this.data = ref;
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.setStyleScroll();
    }

    public setStyleScroll(): void {
        const scroll = document.getElementById('scrollQualityDocsPanel');
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

    public openFilter(open: any): void {
        console.log(open);
    }

    public searchRecords(event: Event): void {
    }

    public closeFilter(event: boolean): void {
        this.isFilter = event;
    }

    private async getFilterList(): Promise<void> {
        this.filterByProduct.data = await this.oilOperationService.getFilterList<IOilFilter[]>('products');
    }
}
