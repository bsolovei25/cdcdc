import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { IDatesInterval, WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';
import {
    IOilFilter,
    IOilOperations,
    IOilOperationTransfer,
    IRightOilTable
} from '../../models/oil-operations';
import { IOilOperationsOptions, OilOperationsService } from '../../services/widgets/oil-operations.service';
import { ITableGridFilter } from '../../components/table-grid/components/table-grid-filter/table-grid-filter.component';

export interface IOilOperationsButton {
    isFilter: boolean;
    filter: boolean;
    line: boolean;
    adjust: boolean;
    free: boolean;
}

@Component({
    selector: 'evj-oil-operations',
    templateUrl: './oil-operations.component.html',
    styleUrls: ['./oil-operations.component.scss']
})
export class OilOperationsComponent extends WidgetPlatform implements OnInit, OnDestroy {
    public static itemCols: number = 64;
    public static itemRows: number = 16;
    public static minItemCols: number = 54;
    public static minItemRows: number = 16;

    public isOpenReceived: boolean = false;
    public isOpenShipment: boolean = false;

    private currentDates: IDatesInterval;

    public availableFilters: ITableGridFilter<IOilFilter>[] = [
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
                name: 'Отредактировать ёмкости для отгрузки',
                type: 'filter'
            },
            {
                id: 3,
                name: 'Список паспортов LIMS',
                type: 'reference'
            },
            {
                id: 4,
                name: 'Публикации в БЛПС',
                type: 'reference'
            }
        ],
        shipment: [
            {
                id: 1,
                name: 'Свободные отгрузки',
                value: 2352,
                type: 'free'
            },
            {
                id: 2,
                name: 'Привязать отгрузки автоматически',
                type: 'filter'
            },
            {
                id: 3,
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
        free: false
    };

    constructor(
        protected widgetService: WidgetService,
        private oilOperationService: OilOperationsService,
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

    private async getFilterList(filter: 'products' | 'groups'): Promise<any> {
        const values = await this.oilOperationService.getFilterList<any>(filter);
        this.availableFilters.map(availableFilter => {
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

    public async getLeftTable(lastId: number = 0): Promise<IOilOperationTransfer[]> {
        const options = this.getOptions();
        return await this.oilOperationService.getTransferList(lastId, options);
    }

    public async appendOperations(lastId: number): Promise<void> {
        const operations = await this.getLeftTable(lastId);
        if (operations.length) {
            this.data.tableLeft = this.data.tableLeft.concat(operations);
        }
    }

    public async getRightTable(): Promise<IRightOilTable[]> {
        const oilShipment = await this.oilOperationService.getShipmentList(this.currentDates);
        console.log(oilShipment);
        return oilShipment.map<IRightOilTable>((s) => {
            return {
                id: s.id,
                direction: s.direction,
                rRRiser: 0, // TODO
                dok: s.documentNumber, // TODO
                mass: s.mass,
                pasport: s.passport.id,
                shipment: 0, // TODO
                note: s.note,
            };
        });
    }

    private getOptions(): IOilOperationsOptions {
        return {
            dates: {
                startTime: this.currentDates.fromDateTime,
                endTime: this.currentDates.toDateTime,
            }
        };
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    openFilter(open: any): void {
        console.log(open, 'main component');
        this.active('isFilter');
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

    closeShipment(event: boolean): void {
        this.disabled();
        this.isOpenShipment = true;
    }

    closeReceived(event: boolean): void {
        this.disabled();
        this.isOpenReceived = true;
    }

    active(itemActive: string): void {
        Object.keys(this.filter).forEach(key => {
            this.filter[key] = key === itemActive;
        });
    }

    disabled(): void {
        Object.keys(this.filter).forEach(item => {
            this.filter[item] = false;
        });
    }
}
