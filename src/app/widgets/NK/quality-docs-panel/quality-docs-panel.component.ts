import {
    Component,
    OnInit,
    Inject,
    HostListener,
    OnDestroy,
    ViewChild,
    SimpleChanges,
    OnChanges,
    ElementRef,
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/@PLATFORM/widget-platform';
import { IDatesInterval, WidgetService } from '../../../dashboard/services/widget.service';
import { ITableGridFilter } from '../../../dashboard/components/table-grid/components/table-grid-filter/table-grid-filter.component';
import { IOilFilter } from '../../../dashboard/models/oil-operations';
import { OilOperationsService } from '../../../dashboard/services/widgets/oil-operations.service';
import {
    DocumentsScansService,
    IOilControlPassportOpts,
} from '../../../dashboard/services/oil-control-services/documents-scans.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DocumentCodingFilterComponent } from '../document-coding/components/document-coding-filter/document-coding-filter.component';
import { PopoverOverlayService } from '@shared/components/popover-overlay/popover-overlay.service';
import { FormControl } from '@angular/forms';
import { ArrayProperties } from '@shared/models/common.model';

export type IDocumentOilQualityPanelFilterType =
    | 'products-document-panel'
    | 'groups-document-panel'
    | 'tanks-document-panel';

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
        };
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
        };
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
    styleUrls: ['./quality-docs-panel.component.scss'],
})
export class QualityDocsPanelComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy, OnChanges {
    @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;

    @ViewChild('table') public table: ElementRef;

    public filters: ITableGridFilter<IOilFilter, IDocumentOilQualityPanelFilterType>[] = [
        {
            name: 'Продукты',
            type: 'products-document-panel',
            data: [],
        },
        {
            name: 'Группы',
            type: 'groups-document-panel',
            data: [],
        },
        {
            name: 'Резервуары',
            type: 'tanks-document-panel',
            data: [],
        },
    ];

    public filterByProductValue: any;

    public blockFilter: boolean = false;

    public data: IQualityDocsRecord[] = [];

    public passportValue: string | null = null;

    public isPasportInput: boolean = false;

    private currentDates: IDatesInterval;

    public isPopoverOpened: Map<IDocumentOilQualityPanelFilterType, boolean> = new Map();

    public activeFilters: Map<IDocumentOilQualityPanelFilterType, IOilFilter[]> = new Map();

    constructor(
        public widgetService: WidgetService,
        private oilOperationService: OilOperationsService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
        public oilDocumentService: DocumentsScansService,
        private popoverOverlayService: PopoverOverlayService
    ) {
        super(widgetService, id, uniqId);
        this.isRealtimeData = false;
        this.widgetIcon = 'reference';
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.getFilterList('products-document-panel');
        this.getFilterList('groups-document-panel');
        this.getFilterList('tanks-document-panel');
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.viewportCheck();
    }

    protected dataHandler(ref: any): void {}

    protected dataConnect(): void {
        super.dataConnect();
        this.subscriptions.push(this.widgetService.currentDates$.subscribe(this.onDatesChange.bind(this)));
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.setStyleScroll();
        this.viewportCheck();
    }

    public async rowBlockUnblock(params: { id: number; action: 'block' | 'unblock' }): Promise<void> {
        await this.oilDocumentService.passportBlockUnblock(params.id, params.action);
        this.getData();
    }

    public blockFilterToggle(): void {
        this.blockFilter = !this.blockFilter;
        this.getData();
    }

    private getData(): void {
        this.getList().then((ref) => {
            this.data = ref;
        });
    }

    private getOptions(): IOilControlPassportOpts {
        const options: IOilControlPassportOpts = {
            StartTime: this.currentDates.fromDateTime,
            EndTime: this.currentDates.toDateTime,
        };
        const products = this.getActiveFilterArrayByType('products-document-panel');
        const groups = this.getActiveFilterArrayByType('groups-document-panel');
        const tanks = this.getActiveFilterArrayByType('tanks-document-panel');

        function addFilters(arr: IOilFilter[], key: keyof ArrayProperties<IOilControlPassportOpts, number>): void {
            if (!arr.length) {
                return;
            }
            options[key] = [];
            arr.forEach((item) => {
                options[key].push(item.id);
            });
        }

        addFilters(products, 'ProductIds');
        addFilters(groups, 'GroupIds');
        addFilters(tanks, 'TankIds');

        if (this.passportValue) {
            options.PassportName = this.passportValue;
        }
        options.IsBlocked = this.blockFilter;
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

    public searchRecords(event: string): void {
        this.passportValue = event;
        this.getData();
    }

    public async scrollHandler(event: {
        target: { offsetHeight: number; scrollTop: number; scrollHeight: number };
    }): Promise<void> {
        if (event.target.offsetHeight + event.target.scrollTop + 100 >= event.target.scrollHeight && this.data.length) {
            await this.appendPassports(this.data[this.data.length - 1].id);
        }
    }

    public getFilterCountData(type: IDocumentOilQualityPanelFilterType): number {
        return this.activeFilters.get(type)?.length;
    }

    public openFilter(filter: ITableGridFilter<IOilFilter, IDocumentOilQualityPanelFilterType>): void {
        const element = document.getElementById(filter.type + '-qual-docs-panel');
        this.openPopover(element, filter);
    }

    private openPopover(
        origin: HTMLElement,
        filter: ITableGridFilter<IOilFilter, IDocumentOilQualityPanelFilterType>
    ): void {
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

        popoverRef.afterClosed$.subscribe((res) => {
            console.log(res);
            this.isPopoverOpened.set(res?.data?.type, false);
            if (res && res.data && res.type === 'close') {
                this.activeFilters.set(res?.data?.type, res.data.activeFilters);
                this.getData();
            }
        });
    }

    private getActiveFilterArrayByType(type: IDocumentOilQualityPanelFilterType): IOilFilter[] {
        return this.activeFilters.has(type) ? Array.from(this.activeFilters.get(type).values()) : [];
    }

    private viewportCheck(): void {
        if (this.data?.length > 0) {
            this.viewport?.checkViewportSize();
        }
    }

    private async getFilterList(filter: IDocumentOilQualityPanelFilterType): Promise<void> {
        let filterParam: 'products' | 'groups' | 'tanks';
        switch (filter) {
            case 'products-document-panel':
                filterParam = 'products';
                break;
            case 'groups-document-panel':
                filterParam = 'groups';
                break;
            case 'tanks-document-panel':
                filterParam = 'tanks';
                break;
        }
        const values = await this.oilOperationService.getFilterList<IOilFilter[]>(filterParam);
        const filterToReplace = this.filters.find((availableFilter) => availableFilter.type === filter);
        if (filterToReplace) {
            filterToReplace.data = values;
        }
    }

    private async onDatesChange(dates: IDatesInterval): Promise<void> {
        if (!dates) {
            dates = {
                fromDateTime: new Date(),
                toDateTime: new Date(),
            };
            dates.toDateTime.setHours(23, 59, 59);
            dates.fromDateTime.setHours(0, 0, 0);
        }
        this.currentDates = dates;

        const dataLoadQueue: Promise<void>[] = [];
        dataLoadQueue.push(
            this.getList().then((ref) => {
                this.data = ref;
            })
        );
        await Promise.all(dataLoadQueue);
    }
}
