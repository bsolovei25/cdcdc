import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { TankCalibrationTableService } from '../../../services/tank-calibration-table.service';

interface ITanksTable {
    uid: string;
    name: string;
    parentUid?: string;
    parentName?: string;
    isGroup: boolean;
}

@Component({
    selector: 'evj-tanks-table',
    templateUrl: './tanks-table.component.html',
    styleUrls: ['./tanks-table.component.scss'],
})
export class TanksTableComponent implements OnInit, OnDestroy {

    dataSource: ITanksTable[] = [];
    dataSourceTanks: ITanksTable[] = [];

    expandedElement: SelectionModel<ITanksTable[]> = new SelectionModel(true);
    selectedElement: SelectionModel<ITanksTable> = new SelectionModel();

    isRefInput: boolean = false;

    isLoading: boolean = true;

    constructor(
        public dialogRef: MatDialogRef<any>,
        private chDet: ChangeDetectorRef,
        private calibrationService: TankCalibrationTableService,
        @Inject(MAT_DIALOG_DATA) public data: ITanksTable[]
    ) {
    }

    ngOnInit(): void {
        this.loadItem();
    }

    ngOnDestroy(): void {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addClick(event: MouseEvent): void {
        this.dialogRef.close(this.selectedElement.selected?.[0]?.uid);
    }

    doubleClick(element): void {
        this.dialogRef.close(element.uid);
    }

    getChildrenRows(element: ITanksTable): ITanksTable[] {
        return this.data.filter(val => element?.uid === val?.parentUid);
    }

    searchInput(event): void {
        this.dataSource = this.data?.filter((val) => val.name.toLowerCase()
            .includes(event?.target?.value.toLowerCase()) && val.isGroup);
        this.dataSourceTanks = this.data?.filter((val) => val.name.toLowerCase()
            .includes(event?.target?.value.toLowerCase()) && !val.parentUid && !val.isGroup);
    }

    private async loadItem(): Promise<void> {
        this.isLoading = true;
        const dataLoadQueue: Promise<void>[] = [];
        dataLoadQueue.push(
            this.calibrationService.getTankAvailable().then((data) => {
                this.dataSource = [...data
                    .filter(val => val.isGroup)];
                this.dataSourceTanks = [...data
                    .filter(val => !val.parentUid && !val.isGroup)];
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
