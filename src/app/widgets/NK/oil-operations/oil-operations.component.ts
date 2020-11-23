import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { IDatesInterval, WidgetService } from 'src/app/dashboard/services/widget.service';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';
import {
    IOilFilter,
    IOilOperations,
    IOilTransfer,
    IOilShipment,
    operationTransferStatusNameMap,
    IOilOperationsPassport,
} from 'src/app/dashboard/models/oil-operations';
import {
    IOilOperationsOptions,
    OilOperationsService
} from 'src/app/dashboard/services/widgets/oil-operations.service';
import { ITableGridFilter } from 'src/app/dashboard/components/table-grid/components/table-grid-filter/table-grid-filter.component';
import { DocumentsScansService } from '../../../dashboard/services/oil-control-services/documents-scans.service';
import { SnackBarService } from '../../../dashboard/services/snack-bar.service';
import { IOilControlManualAdjEmitResponse } from './components/oil-operations-adjustment/oil-operations-adjustment.component';

export type IDocumentOilOperationsFilterType = 'products' | 'groups';

export interface IOilOperationsButton {
    isFilter: boolean;
    filter: boolean;
    line: boolean;
    adjust: boolean;
    blps: boolean;
    free: boolean;
    manualAssign: boolean;
}

@Component({
    selector: 'evj-oil-operations',
    templateUrl: './oil-operations.component.html',
    styleUrls: ['./oil-operations.component.scss']
})
export class OilOperationsComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy {

    public isOpenReceived: boolean = false;
    public isOpenShipment: boolean = false;

    private currentDates: IDatesInterval;

    public availableFilters: ITableGridFilter<IOilFilter, IDocumentOilOperationsFilterType>[] = [
        {
            name: 'Продукты',
            type: 'products',
            data: null,
        },
        {
            name: 'Группы',
            type: 'groups',
            data: null,
        },
    ];

    public data: IOilOperations = {
        tableLeft: [],
        received: [
            {
                id: 1,
                name: 'Открыть график',
                type: 'line'
            },
            {
                id: 2,
                name: 'Редактировать ёмкости',
                type: 'filter'
            },
            {
                id: 3,
                name: 'Список паспортов LIMS',
                type: 'reference'
            },
            {
                id: 4,
                name: 'Публикация в БЛПС',
                type: 'blps'
            }
        ],
        shipment: [
            {
                id: 1,
                name: 'Автоматическая привязка отгрузок',
                type: 'autoAssign'
            },
            {
                id: 2,
                name: 'Свободные отгрузки',
                value: 2352,
                type: 'free'
            },
            {
                id: 3,
                name: 'Привязать отгрузки',
                type: 'manualAssign'
            },
            {
                id: 4,
                name: 'Создать корректировку',
                type: 'adjust'
            }
        ],
        tableRight: [],
        filter: [],
        filterTanks: [
            {
                id: 1,
                name: 'Керосины',
                valuesTank: [
                    {
                        id: 1,
                        number: 1,
                        work: true,
                        limit: 60,
                        valueCap: 521
                    },
                    {
                        id: 2,
                        number: 1,
                        work: true,
                        limit: 60,
                        valueCap: 521
                    }
                ]
            }
        ]
    };

    filter: IOilOperationsButton = {
        isFilter: false,
        filter: false,
        line: false,
        adjust: false,
        blps: false,
        free: false,
        manualAssign: false,
    };

    public filterGroup: string | null = null;
    public filterProduct: string | null = null;
    public selectedTransfer: IOilTransfer = null;
    public selectedShipment: IOilShipment = null;

    constructor(
        protected widgetService: WidgetService,
        private oilOperationService: OilOperationsService,
        public documentsScansService: DocumentsScansService,
        public snackBar: SnackBarService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.isRealtimeData = false;
        this.widgetIcon = 'reference';
    }

    public ngOnInit(): void {
        super.widgetInit();
        this.getFilterList('products');
        this.getFilterList('groups');
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

    private async getFilterList(filter: 'products' | 'groups'): Promise<void> {
        const values = await this.oilOperationService.getFilterList<IOilFilter[]>(filter);
        console.log(values, filter);
        this.availableFilters.forEach(availableFilter => {
            if (availableFilter.type === filter) {
                availableFilter.data = values;
            }
        });
    }

    // TODO вынести проверку на null в сервис
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
            this.getLeftTable().then((ref) => {
                this.data.tableLeft = ref;
            }),
            this.getRightTable().then((ref) => {
                this.data.tableRight = ref;
            }),
        );
        await Promise.all(dataLoadQueue);
    }

    public async getLeftTable(lastId: number = 0): Promise<IOilTransfer[]> {
        const options = this.getOptions();
        return await this.oilOperationService.getTransferList(lastId, options);
    }

    public async appendOperations(lastId: number): Promise<void> {
        const operations = await this.getLeftTable(lastId);
        if (operations.length) {
            this.data.tableLeft = this.data.tableLeft.concat(operations);
        }
    }

    public async getRightTable(): Promise<IOilShipment[]> {
        return await this.oilOperationService.getShipments<IOilShipment[]>(this.currentDates);
    }

    public getStatusDescription(status: string): string {
        return operationTransferStatusNameMap[status];
    }

    public async selectTransfer(item: IOilTransfer): Promise<void> {
        this.selectedTransfer = item;
        const shipments = await this.oilOperationService.getShipmentsByTransferId<IOilShipment[]>(item.id);
        this.data.tableRight = shipments;
    }

    public selectShipment(item: IOilShipment): void {
        this.selectedShipment = item;
    }

    private getOptions(): IOilOperationsOptions {
        const options: IOilOperationsOptions = {
            dates: {
                startTime: this.currentDates.fromDateTime,
                endTime: this.currentDates.toDateTime,
            }
        };
        if (this.filterGroup) {
            options.group = this.filterGroup;
        }
        if (this.filterProduct) {
            options.product = this.filterProduct;
        }
        return options;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    public openFilter(open: any): void {
        const value = open.filter ? open.filter.name : null;
        switch (open.type) {
            case 'product':
                this.filterProduct = value;
                break;
            case 'group':
                this.filterGroup = value;
                break;
        }
        this.getLeftTable().then((result) => {
            this.data.tableLeft = result;
        });
        this.active('isFilter');
    }

    public async selectPassport(event: Event, passport: IOilOperationsPassport | null): Promise<void> {
        event.stopPropagation();
        const document = await this.documentsScansService.getDocumentInfo(passport.id);
        console.log(document, 'document');
        // this.documentsScansService.currentDocument$.next(file);
    }

    public async sendToBlps(): Promise<void> {
        let msg = 'Выберите Операцию из списка';
        if (this.selectedTransfer && this.selectedTransfer.published) {
            msg = 'Операция была опубликована прежде';
        }
        if (this.selectedTransfer && !this.selectedTransfer.published) {
            const result = await this.oilOperationService.operationToBlbs(this.selectedTransfer.id, this.selectedTransfer.originalId);
            msg = result ? 'Успешно' : 'Не отправлено';
            if (result) {
                this.data.tableLeft.forEach(item => {
                    if (item.id === this.selectedTransfer.id) {
                        item.published = true;
                    }
                });
            }
        }
        this.snackBar.openSnackBar(msg);
    }

    public async autoAssignShipments(): Promise<void> {
        let msg = 'Выберите Операцию из списка';
        if (this.selectedTransfer) {
            const result = await this.oilOperationService.autoAssignShipments(this.selectedTransfer.id);
            msg = result['message'];
            await this.selectTransfer(this.selectedTransfer);
        }
        this.snackBar.openSnackBar(msg);
    }

    public async handleManualAdjustment(data: IOilControlManualAdjEmitResponse): Promise<void> {
        const result = await this.oilOperationService.manualAdjustment<IOilShipment>(this.selectedTransfer.id, data);
        if (result) {
            await this.selectTransfer(this.selectedTransfer);
            this.snackBar.openSnackBar('Успешно');
        }
    }

    public manualAdjustment(): void {
        if (this.selectedTransfer) {
            this.filter.adjust = true;
        } else {
            this.snackBar.openSnackBar('Выберите Операцию из списка');
        }
    }

    public manualAssign(): void {
        if (this.selectedTransfer) {
            this.filter.manualAssign = true;
        } else {
            this.snackBar.openSnackBar('Выберите Операцию из списка');
        }
    }

    openShipment(name: string): void {
        this.isOpenShipment = false;
        this.isOpenReceived = true;
        this.active(name);
    }

    openReceived(name: string): void {
        this.isOpenReceived = false;
        this.isOpenShipment = true;
        this.active(name);
    }

    closeShipment(event: IOilControlManualAdjEmitResponse): void {
        this.disabled();
        this.isOpenShipment = true;
        if (event) {
            this.handleManualAdjustment(event);
        }
    }

    closeReceived(event: boolean): void {
        this.disabled();
        this.isOpenReceived = true;
    }

    active(itemActive: string): void {
        switch (itemActive) {
            case 'blps':
                this.sendToBlps();
                break;
            case 'autoAssign':
                this.autoAssignShipments();
                break;
            case 'adjust':
                this.manualAdjustment();
                break;
            case 'manualAssign':
                this.manualAssign();
                break;
            default:
                Object.keys(this.filter).forEach(key => {
                    this.filter[key] = key === itemActive;
                });
                break;
        }
    }

    disabled(): void {
        Object.keys(this.filter).forEach(item => {
            this.filter[item] = false;
        });
    }
}
