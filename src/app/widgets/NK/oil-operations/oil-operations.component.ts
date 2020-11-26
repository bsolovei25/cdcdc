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

    public currentDates: IDatesInterval;

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
                value: 0,
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
    };

    public filter: IOilOperationsButton = {
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
    public freeShipmentsQuantity: number = 0;

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
        await this.getFreeShipmentsQuantity(this.currentDates);

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
        // return await this.oilOperationService.getTransferList(lastId, options);
        return JSON.parse('[ { "id":3546, "transferNumber":3546, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5802057" }, { "id":3555, "transferNumber":3555, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5804323" }, { "id":3564, "transferNumber":3564, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5805475" }, { "id":3573, "transferNumber":3573, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5806627" }, { "id":3582, "transferNumber":3582, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5807779" }, { "id":3591, "transferNumber":3591, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5808932" }, { "id":3602, "transferNumber":3602, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5811201" }, { "id":3611, "transferNumber":3611, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5812349" }, { "id":3620, "transferNumber":3620, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5813497" }, { "id":3629, "transferNumber":3629, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5814645" }, { "id":3638, "transferNumber":3638, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5815790" }, { "id":3653, "transferNumber":3653, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5818061" }, { "id":3662, "transferNumber":3662, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5819212" }, { "id":3671, "transferNumber":3671, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5820362" }, { "id":3679, "transferNumber":3679, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5821514" }, { "id":3688, "transferNumber":3688, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5822669" }, { "id":3703, "transferNumber":3703, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5824955" }, { "id":3711, "transferNumber":3711, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5826112" }, { "id":3720, "transferNumber":3720, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5827270" }, { "id":3729, "transferNumber":3729, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5828428" }, { "id":3738, "transferNumber":3738, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5829584" }, { "id":3754, "transferNumber":3754, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5831861" }, { "id":3763, "transferNumber":3763, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5833012" }, { "id":3772, "transferNumber":3772, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5834165" }, { "id":3781, "transferNumber":3781, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5835317" }, { "id":3790, "transferNumber":3790, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5836468" }, { "id":3806, "transferNumber":3806, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5838741" }, { "id":3815, "transferNumber":3815, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5839892" }, { "id":3824, "transferNumber":3824, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5841043" }, { "id":3833, "transferNumber":3833, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5842193" }, { "id":3842, "transferNumber":3842, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5843343" }, { "id":3858, "transferNumber":3858, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5845611" }, { "id":3867, "transferNumber":3867, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5846761" }, { "id":3876, "transferNumber":3876, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5847912" }, { "id":3885, "transferNumber":3885, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5849060" }, { "id":3894, "transferNumber":3894, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5850209" }, { "id":3903, "transferNumber":3903, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5851338" }, { "id":3911, "transferNumber":3911, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5852484" }, { "id":3920, "transferNumber":3920, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5853634" }, { "id":3929, "transferNumber":3929, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5854787" }, { "id":3938, "transferNumber":3938, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5855940" }, { "id":3947, "transferNumber":3947, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5857093" }, { "id":3955, "transferNumber":3955, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5858221" }, { "id":3963, "transferNumber":3963, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5859367" }, { "id":3972, "transferNumber":3972, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5860518" }, { "id":3981, "transferNumber":3981, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5861673" }, { "id":3985, "transferNumber":3985, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5862763" }, { "id":3995, "transferNumber":3995, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5863915" }, { "id":4004, "transferNumber":4004, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5865061" }, { "id":4012, "transferNumber":4012, "tank":{ "id":"19e662a2-d816-4362-9528-08d89203df61", "name":"Р-137", "enabled":false, "limitHours":0 }, "product":{ "id":6955, "name":"Фракция ДТ  г/о", "gost":"СТО 7.401203-2009", "isActual":true }, "startTime":"2020-11-24T18:52:00Z", "endTime":"2020-11-25T18:14:00Z", "mass":2251.9007, "deviation":0, "status":"opened", "published":false, "originalId":"5866184" } ]');
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
        if (!passport) return;
        const document = await this.documentsScansService.getDocumentInfo(passport.id);
        this.documentsScansService.currentDocument$.next(document);
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

    private async getFreeShipmentsQuantity(dates: IDatesInterval): Promise<void> {
        const options: IOilOperationsOptions = {
            StartTime: dates?.fromDateTime,
            EndTime: dates?.toDateTime,
        };
        const stat = await this.oilOperationService.getShipmentStatistic(options);
        this.data.shipment.filter(item => item.type === 'free').forEach(item => {
            item.value = stat.quantity;
            this.freeShipmentsQuantity = stat.quantity;
        });
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
