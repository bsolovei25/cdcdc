import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IOilFilterTanks, IOilOperationsTank } from 'src/app/dashboard/models/oil-operations';
import {
    OilOperationsService
} from '../../../../../dashboard/services/widgets/oil-operations.service';
import { SnackBarService } from '../../../../../dashboard/services/snack-bar.service';

@Component({
    selector: 'evj-oil-operations-tank-filter',
    templateUrl: './oil-operations-tank-filter.component.html',
    styleUrls: ['./oil-operations-tank-filter.component.scss']
})
export class OilOperationsTankFilterComponent implements OnInit {

    public data: IOilFilterTanks[];

    @Output() public closeFilterTank: EventEmitter<boolean> = new EventEmitter<boolean>();

    public activeItemId: string;

    public accordionMap: Map<number, boolean> = new Map<number, boolean>();

    public readonly ROW_HEIGHT_PX: number = 41;

    public filteredTanks: IOilOperationsTank[] = [];

    constructor(
        private oilOperationService: OilOperationsService,
        public snackBar: SnackBarService,
    ) {
    }

    public ngOnInit(): void {
        this.getProducts();
    }

    public productOpen(itemIdParam: number, collapse: boolean = true): void {
        this.accordionMap.set(itemIdParam, collapse ? !this.accordionMap.get(itemIdParam) : this.accordionMap.get(itemIdParam));
        this.getTanksByProductId(itemIdParam).then(result => {
            const filteredResult = [];
            for (const item1 of result) {
                for (const item2 of this.filteredTanks) {
                    if (item1.id === item2.id) {
                        filteredResult.push(item1);
                    }
                }
            }
            const finalResult = this.filteredTanks.length ? filteredResult : result;

            this.data.map(item => {
                if (item.id === itemIdParam) {
                    item.data = finalResult;
                }
            });

            if (this.filteredTanks.length > 0) {
                this.accordionMap.clear();
                for (const item of this.data) {
                    if (item.data?.length) {
                        this.accordionMap.set(item.id, true);
                        item.quantity = item.data.length;
                    }
                }
            }
        });
    }

    public active(item: IOilOperationsTank): void {
        this.activeItemId = item.id;
    }

    public isProductOpen(itemParam: IOilFilterTanks): boolean {
        return this.accordionMap.get(itemParam.id);
    }

    close(): void {
        this.closeFilterTank.emit(false);
    }

    save(): void {
        this.closeFilterTank.emit(false);
    }

    public async changeSwap(itemParam: IOilOperationsTank): Promise<void> {
        const result = await this.oilOperationService.editTanksById<IOilOperationsTank>(itemParam.id, !itemParam.enabled);
        if (result) {
            this.replaceTank(result);
        }
    }

    public async update(itemParam: IOilOperationsTank): Promise<void> {
        const result = await this.oilOperationService.getTankById<IOilOperationsTank>(itemParam.id);
        if (result) {
            this.replaceTank(result);
        }
    }

    public async search(phrase: string): Promise<void> {
        const filteredTanks = await this.oilOperationService.getTanksByFilter<IOilOperationsTank[]>(phrase);
        this.filteredTanks = phrase ? filteredTanks : [];
        this.accordionMap.forEach((value, key) => {
            if (value) {
                this.productOpen(key, false);
            }
        });
    }

    private replaceTank(newTank: IOilOperationsTank): void {
        this.data.flatMap(item => item.data).filter(tank => tank.id === newTank.id).forEach(tank => {
            tank.enabled = newTank.enabled;
        });
        this.snackBar.openSnackBar('Действие выполнено');
    }

    private async getProducts(): Promise<void> {
        this.data = await this.oilOperationService.getGroupsOfTanks<IOilFilterTanks>();
    }

    private async getTanksByProductId(idParam: number): Promise<IOilOperationsTank[]> {
        return await this.oilOperationService.getTanksByGroup<IOilOperationsTank>(idParam);
    }
}
