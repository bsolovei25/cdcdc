import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { TankCalibrationTableService } from 'src/app/dashboard/services/widgets/tank-calibration-table.service';

export interface ICalibrationTable {
    uid: string;
    name: string;
    startDate?: Date;
    endDate?: Date;
    warningLevel?: 'none' | 'warning' | 'expired';
    parentUid?: string;
    parentName?: string;
    isGroup: boolean;
    isInvisible?: boolean;
}

interface IDataSource extends ICalibrationTable {
    childredTanks?: ICalibrationTable[];
    isInvisible?: boolean;
}

@Component({
    selector: 'evj-tanks-table',
    templateUrl: './tanks-table.component.html',
    styleUrls: ['./tanks-table.component.scss'],
})
export class TanksTableComponent implements OnInit {
    dataSource: IDataSource[] = [];
    dataSourceTanks: IDataSource[] = [];
    data: IDataSource[] = [];

    expandedElement: SelectionModel<IDataSource> = new SelectionModel(true);
    selectedElement: SelectionModel<IDataSource> = new SelectionModel();

    isRefInput: boolean = false;

    isLoading: boolean = true;

    constructor(
        public dialogRef: MatDialogRef<any>,
        private chDet: ChangeDetectorRef,
        private calibrationService: TankCalibrationTableService,
        @Inject(MAT_DIALOG_DATA) public dataRef: IDataSource[]
    ) {}

    ngOnInit(): void {
        this.loadItem();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addClick(): void {
        this.dialogRef.close(this.selectedElement.selected?.[0]?.uid);
    }

    doubleClick(element): void {
        this.dialogRef.close(element.uid);
    }

    getChildrenRows(element: ICalibrationTable): ICalibrationTable[] {
        return this.data.filter((val) => element?.uid === val?.parentUid);
    }

    searchInput(event): void {
        this.dataSource?.map((val) => {
            let isLenChild: boolean = false;
            val.childredTanks.map((element) => {
                if (element.name.toLowerCase().includes(event?.target?.value.toLowerCase())) {
                    element.isInvisible = false; // показывать
                    this.expandedElement.select(val);
                    isLenChild = true;
                } else {
                    element.isInvisible = true; // скрыть
                }
            });
            if (val.name.toLowerCase().includes(event?.target?.value.toLowerCase()) || isLenChild) {
                val.isInvisible = false;
            } else {
                val.isInvisible = true;
                this.expandedElement.deselect(val);
            }
        });
        this.dataSourceTanks = this.data?.filter(
            (val) =>
                val.name.toLowerCase().includes(event?.target?.value.toLowerCase()) && !val.parentUid && !val.isGroup
        );
        if (event?.target?.value.trim().toLowerCase() === '') {
            this.expandedElement.clear();
        }
    }

    private async loadItem(): Promise<void> {
        this.isLoading = true;
        const dataLoadQueue: Promise<void>[] = [];
        dataLoadQueue.push(
            this.calibrationService.getTankAvailable().then((data) => {
                this.data = data;
                this.dataSource = this.data.filter((val) => val.isGroup);
                this.dataSource.map((value) => {
                    value.childredTanks = this.getChildrenRows(value);
                });
                this.dataSourceTanks = [...this.data.filter((val) => !val.parentUid && !val.isGroup)];
                this.isLoading = false;
            })
        );
        dataLoadQueue.push();
        if (dataLoadQueue.length > 0) {
            try {
                await Promise.all(dataLoadQueue);
            } catch (err) {
                console.error(err);
                this.isLoading = false;
            }
        }
    }
}
