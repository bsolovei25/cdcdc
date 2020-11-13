import {
    Component,
    OnInit,
    Inject,
    HostListener,
    OnDestroy,
    ViewChild,
    SimpleChanges,
    OnChanges, ElementRef
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { IDatesInterval, WidgetService } from '../../../dashboard/services/widget.service';
import { ITableGridFilter } from '../../../dashboard/components/table-grid/components/table-grid-filter/table-grid-filter.component';
import { IOilFilter } from '../../../dashboard/models/oil-operations';
import { OilOperationsService } from '../../../dashboard/services/widgets/oil-operations.service';
import {
    DocumentsScansService,
    IOilControlPassportOpts
} from '../../../dashboard/services/oil-control-services/documents-scans.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

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
export class QualityDocsPanelComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy, OnChanges {

    @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

    @ViewChild('table') public table: ElementRef;

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

    private currentDates: IDatesInterval;

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

    public ngOnChanges(changes: SimpleChanges): void {
        this.viewportCheck();
    }

    protected dataHandler(ref: any): void {
        // this.data = ref;
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(
            this.widgetService.currentDates$.subscribe(this.onDatesChange.bind(this))
        );
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.setStyleScroll();
        this.viewportCheck();
    }

    private getOptions(): IOilControlPassportOpts {
        const options: IOilControlPassportOpts = {
            StartTime: this.currentDates.fromDateTime,
            EndTime: this.currentDates.toDateTime,
        };
        /*if (this.filterGroup) {
            options.group = this.filterGroup;
        }
        if (this.filterProduct) {
            options.product = this.filterProduct;
        }*/
        return options;
    }

    public async getList(lastId: number = 0): Promise<IQualityDocsRecord[]> {
        const options = this.getOptions();
        return await this.oilDocumentService.getPassportsByFilter(lastId, options);
    }

    public async appendPassports(lastId: number): Promise<void> {
        const passports = await this.getList(lastId);
        if (passports.length) {
            this.data = this.data.concat(passports);
        }
    }

    public setStyleScroll(): void {
        const scroll = this.table.nativeElement;
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

    public async scrollHandler(event: { target: { offsetHeight: number, scrollTop: number, scrollHeight: number } }): Promise<void> {
        if (
            event.target.offsetHeight + event.target.scrollTop + 100 >= event.target.scrollHeight
            && this.data.length
        ) {
            await this.appendPassports(this.data[this.data.length - 1].id);
        }
    }

    private viewportCheck(): void {
        if (this.data?.length > 0) {
            this.viewport?.checkViewportSize();
        }
    }

    private async getFilterList(): Promise<void> {
        this.filterByProduct.data = await this.oilOperationService.getFilterList<IOilFilter[]>('products');
    }

    private async onDatesChange(dates: IDatesInterval): Promise<void> {
        if (!dates) {
            dates = {
                fromDateTime: new Date(),
                toDateTime: new Date()
            };
            dates.toDateTime.setHours(23, 59, 59);
            dates.fromDateTime.setHours(0, 0, 0);
        }
        this.currentDates = dates;

        const dataLoadQueue: Promise<void>[] = [];
        dataLoadQueue.push(
            this.getList().then((ref) => {
                this.data = ref;
            }),
        );
        await Promise.all(dataLoadQueue);
    }
}
