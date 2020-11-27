import {Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef} from '@angular/core';
import {
    IOilShipment,
    IOilShipmentStatistics,
    IOilTransfer,
    OilOperationsShipmentType
} from '../../../../../dashboard/models/oil-operations';
import {
    IOilOperationsOptions,
    OilOperationsService
} from '../../../../../dashboard/services/widgets/oil-operations.service';
import { FormControl } from '@angular/forms';
import { SnackBarService } from '../../../../../dashboard/services/snack-bar.service';

@Component({
    selector: 'evj-oil-operations-manual-assign',
    templateUrl: './oil-operations-manual-assign.component.html',
    styleUrls: ['./oil-operations-manual-assign.component.scss']
})
export class OilOperationsManualAssignComponent implements OnInit {
    @Input() public selectedTransfer: IOilTransfer;

    @Output() public closeFree: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('tableLeft') public tableLeft: ElementRef;

    public data: { leftTable: IOilShipment[]; rightTable: IOilShipment[] } = { leftTable: [], rightTable: []};

    public activeItemId: number;

    public statistics: { leftTable: IOilShipmentStatistics | null; rightTable: IOilShipmentStatistics | null } = { leftTable: null, rightTable: null };

    public productFormControl: FormControl = new FormControl({value: '', disabled: false});

    public passportFormControl: FormControl = new FormControl({value: '', disabled: false});

    public tankFormControl: FormControl = new FormControl({value: '', disabled: false});

    public typeFiltersCheckboxFormControl: FormControl = new FormControl({value: true, disabled: false});

    public fieldFiltersCheckboxFormControl: FormControl = new FormControl({value: false, disabled: false});

    public typeFilters: {
        type: OilOperationsShipmentType;
        isActive: boolean;
    }[] = [
        {
            type: 'all',
            isActive: false,
        },
        {
            type: 'railway',
            isActive: false,
        },
        {
            type: 'tankTruck',
            isActive: false,
        },
        {
            type: 'pipeline',
            isActive: false,
        },
        {
            type: 'manual',
            isActive: false,
        },
    ];

    constructor(
        private oilOperationService: OilOperationsService,
        public snackBar: SnackBarService,
    ) {
    }

    public ngOnInit(): void {
        this.getLeftData();
        this.getRightData();
        this.fieldFiltersCheckboxFormControl.valueChanges.subscribe(change => this.getLeftData());
    }

    public async scrollHandler(event: { target: { offsetHeight: number, scrollTop: number, scrollHeight: number } }): Promise<void> {
        if (
            event.target.offsetHeight + event.target.scrollTop + 100 >= event.target.scrollHeight
            && this.data.leftTable.length
        ) {
            await this.appendLeftTable(this.data.leftTable[this.data?.leftTable?.length - 1]?.id);
        }
    }

    public getStatisticsWeightByTransferType(typeParam: OilOperationsShipmentType): number | 0 {
        const weight = this.statistics.rightTable?.transportTypeStatistics.find(item => item.type === typeParam)?.weight;
        return weight ? weight : 0;
    }

    public handleTypeFilter(type: OilOperationsShipmentType): void {
        this.typeFilters.find(item => {
            if (item.type === type) {
                item.isActive = !item.isActive;
            }
        });
        this.getLeftData();
    }

    public keyupHandler(): void {
        if (!this.fieldFiltersCheckboxFormControl.value) { return; }
        this.getLeftData();
    }

    public getDirectionCount(typeParam: OilOperationsShipmentType): number {
        const direction = this.statistics?.leftTable?.transportTypeStatistics.find(item => item.type === typeParam);
        return direction ? direction.quantity : 0;
    }

    public async massRelationRemove(): Promise<void> {
        const result = await this.oilOperationService.removeShipmentsRelationsByTransferId(this.selectedTransfer.id);
        if (result) {
            this.reCallData();
        }
    }

    public async massRelationAdd(): Promise<void> {
        const idList: number[] = [];
        this.data.leftTable.forEach(item => idList.push(item.id));
        const result = await this.oilOperationService.addShipmentsRelationsFromList(idList, this.selectedTransfer.id);
        if (result) {
            this.reCallData();
        }
    }

    private reCallData(): void {
        this.getLeftData();
        this.getRightData();
        this.snackBar.openSnackBar('Действие выполнено');
    }

    public async handleRelation(shipmentParam: IOilShipment, action: 'add-relation' | 'remove-relation' | 'recovery-relation'): Promise<void> {
        const transferId = action === 'recovery-relation' ? shipmentParam.transferPrevId : this.selectedTransfer.id;
        const shipment = await this.oilOperationService.handleRelation(shipmentParam.id, transferId, action);
        if (shipment) {
            this.reCallData();
        }
    }

    private getLeftData(): void {
        this.fillLeftTable().then((ref) => {
            this.data.leftTable = ref;
        });
    }

    private getRightData(): void {
        this.getShipmentsByTransferId().then((ref) => {
            this.data.rightTable = ref;
        });
    }

    private async appendLeftTable(lastId: number): Promise<void> {
        const data = await this.fillLeftTable(lastId);
        if (data.length) {
            this.data.leftTable = this.data.leftTable.concat(data);
        }
    }

    private async fillLeftTable(lastId: number = 0): Promise<IOilShipment[]> {
        const options = this.getOptions();
        this.statistics.leftTable = await this.getStatistics('leftTable');
        return await this.oilOperationService.getShipmentListByFilter(lastId, options);
    }

    private async getStatistics(source: 'leftTable' | 'rightTable'): Promise<IOilShipmentStatistics> {
        let options: IOilOperationsOptions = null;
        switch (source) {
            case 'leftTable':
                options = this.getOptions();
                break;
            case 'rightTable':
                options = {
                    TransferId: this.selectedTransfer.id,
                };
                break;
            default:
                break;
        }
        return await this.oilOperationService.getShipmentStatistic(options);
    }

    private async getShipmentsByTransferId(): Promise<IOilShipment[]> {
        this.statistics.rightTable = await this.getStatistics('rightTable');
        return await this.oilOperationService.getShipmentsByTransferId<IOilShipment[]>(this.selectedTransfer?.id);
    }

    private getOptions(): IOilOperationsOptions {
        const options: IOilOperationsOptions = {
            StartTime: new Date(this.selectedTransfer.startTime),
            EndTime: new Date(this.selectedTransfer.endTime),
            Directions: [],
        };
        if (this.productFormControl.value && this.fieldFiltersCheckboxFormControl.value) {
            options.ProductName = this.productFormControl.value;
        }
        if (this.passportFormControl.value && this.fieldFiltersCheckboxFormControl.value) {
            options.PassportName = this.passportFormControl.value;
        }
        if (this.tankFormControl.value && this.fieldFiltersCheckboxFormControl.value) {
            options.TankName = this.tankFormControl.value;
        }
        if (this.typeFiltersCheckboxFormControl) {
            this.typeFilters.forEach(item => {
                if (item.isActive) {
                    options.Directions.push(item.type);
                }
            });
        }
        return options;
    }

    close(): void {
        this.closeFree.emit(false);
    }

    save(): void {
        this.closeFree.emit(false);
    }
}
