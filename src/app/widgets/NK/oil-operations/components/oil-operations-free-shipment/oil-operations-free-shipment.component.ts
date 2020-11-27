import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {
    IOilOperationsOptions,
    OilOperationsService
} from '../../../../../dashboard/services/widgets/oil-operations.service';
import { IDatesInterval } from '../../../../../dashboard/services/widget.service';
import { IOilShipment } from '../../../../../dashboard/models/oil-operations';

export interface IOilControlFreeShipmentData {
    id: number;
    name: string;
    quantity: number;
    weight: number;
    data: IOilShipment[];
}

@Component({
    selector: 'evj-oil-operations-free-shipment',
    templateUrl: './oil-operations-free-shipment.component.html',
    styleUrls: ['./oil-operations-free-shipment.component.scss']
})
export class OilOperationsFreeShipmentComponent implements OnInit {

    @Input() public currentDates: IDatesInterval;

    @Input() public freeShipmentsNumber: number = 0;

    @Output() public closeFree: EventEmitter<boolean> = new EventEmitter<boolean>();

    public dataFree: IOilControlFreeShipmentData[] = [];

    public activeItemId: number;

    public accordionMap: Map<number, boolean> = new Map<number, boolean>();

    public readonly ROW_HEIGHT_PX: number = 41;

    constructor(
        private oilOperationService: OilOperationsService,
    ) {
    }

    public ngOnInit(): void {
        this.getProducts();
    }

    public productOpen(itemParam: IOilControlFreeShipmentData): void {
        this.accordionMap.set(itemParam.id, !this.accordionMap.get(itemParam.id));
        if (!this.dataFree.find(item => item.id === itemParam.id)?.data?.length && this.accordionMap.get(itemParam.id)) {
            this.getShipmentsByProductId(itemParam.id, 0, itemParam.quantity).then(result => {
                this.dataFree.map(item => {
                    if (item.id === itemParam.id) {
                        item.data = result;
                    }
                });
            });
        }
    }

    public isProductOpen(itemParam: IOilControlFreeShipmentData): boolean {
        return this.accordionMap.get(itemParam.id);
    }

    active(item): void {
        this.activeItemId = item.id;
    }

    close(): void {
        this.closeFree.emit(false);
    }

    save(): void {
        this.closeFree.emit(false);
    }

    changeSwap(item): void {

    }

    public async scrollHandler(event: { target: { offsetHeight: number, scrollTop: number, scrollHeight: number } }, idParam: number): Promise<void> {
        const data = this.dataFree.find(item => item.id === idParam)?.data;
        if (
            event.target.offsetHeight + event.target.scrollTop + 100 >= event.target.scrollHeight
            && data.length
        ) {
            await this.appendTable(data[data?.length - 1]?.id, idParam);
        }
    }

    private async appendTable(lastId: number, idParam: number): Promise<void> {
        const data = await this.getShipmentsByProductId(idParam, lastId);
        if (data.length) {
            this.dataFree.map(item => {
                if (item.id === idParam) {
                    item.data = item.data.concat(data);
                }
            });
        }
    }

    private async getProducts(): Promise<void> {
        const options: IOilOperationsOptions = {
            StartTime: this.currentDates.fromDateTime,
            EndTime: this.currentDates.toDateTime,
        };
        this.dataFree = await this.oilOperationService.getFreeShipmentsProducts(0, options, 0);
    }

    private async getShipmentsByProductId(idParam: number, lastId: number = 0, batchSize: number | null = null): Promise<IOilShipment[]> {
        const options: IOilOperationsOptions = {
            StartTime: this.currentDates.fromDateTime,
            EndTime: this.currentDates.toDateTime,
            ProductId: idParam,
        };
        return await this.oilOperationService.getShipmentListByFilter(lastId, options, batchSize);
    }
}

